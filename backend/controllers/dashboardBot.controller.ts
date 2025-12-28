import { Request, Response } from "express";
import sql from "../config/db";
import { response } from "../utils/responseHandler";
import { openRouterForChatBot } from "../config/openRouter";
import { buildDashboardBotPrompt } from "../prompts/dashboardBotPrompt";
import { detectContentType, getContentTypeDisplayName } from "../utils/detectContentType";
import { generateGeminiEmbedding } from "../utils/geminiEmbedding";
import { RATE_LIMIT_WINDOW_MS, MAX_REQUESTS, getRandomRateLimitMessage } from "../config/chatRateLimiter";
import { generateGreetingResponse } from "../utils/dashboardBotUtils";
import { cosineSimilarity } from "../utils/cosineSimilarity";
import { Creation } from "../types";

/* -------------------------- INTENT DETECTION -------------------------- */
function isStatsQuery(message: string) {
    return /(how many|total|count|breakdown|types)/i.test(message);
}

/* ---------------------- MAIN CONTROLLER ---------------------- */
export const generateDashboardBotResponse = async (
    req: any,
    res: Response
): Promise<void> => {
    try {
        const userId = req.auth().userId;
        const displayName = req.body.userFullName || "User";
        const { message } = req.body;

        /* 1️⃣ Validation */
        if (!message?.trim()) {
            response(res, 400, "Message is required");
            return;
        }

        /* 2️⃣ Greeting / small talk */
        const greeting = generateGreetingResponse(message, displayName);
        if (greeting) {
            response(res, 200, "Success", greeting);
            return;
        }

        /* 3️⃣ Rate limiting */
        if (!req.session) req.session = {};
        const now = Date.now();

        const requests = (req.session.dashboardRequests || []).filter(
            (t: number) => now - t < RATE_LIMIT_WINDOW_MS
        );

        if (requests.length >= MAX_REQUESTS) {
            response(res, 429, getRandomRateLimitMessage());
            return;
        }

        requests.push(now);
        req.session.dashboardRequests = requests;

        /* -------------------- 4️⃣ STATS MODE (NO AI) -------------------- */
        if (isStatsQuery(message)) {
            const stats = await sql`
        SELECT type, COUNT(*)::int AS count
        FROM creations
        WHERE user_id = ${userId}
        GROUP BY type
        ORDER BY count DESC
      `;

            if (!stats.length) {
                response(res, 200, "Success", "You haven’t created anything yet.");
                return;
            }

            const total = stats.reduce((s, r) => s + r.count, 0);
            const breakdown = stats
                .map((r: any) => `• ${r.type}: ${r.count}`)
                .join("\n");

            response(
                res,
                200,
                "Success",
                `You’ve created **${total} items** in total.\n\nBreakdown by type:\n${breakdown}`
            );
            return;
        }

        /* -------------------- 5️⃣ EMBEDDING SEARCH MODE -------------------- */
        const contentType = detectContentType(message);
        const displayType = getContentTypeDisplayName(contentType);
        const creations: Creation[] = await sql`
      SELECT content, type, embedding
      FROM creations
      WHERE user_id = ${userId}
      ORDER BY created_at DESC
    ` as Creation[];

        if (!creations.length) {
            response(
                res,
                200,
                "Success",
                `I couldn’t find any ${displayType} yet, ${displayName}.`
            );
            return;
        }

        /* 6️⃣ Message embedding */
        const messageEmbedding = await generateGeminiEmbedding(message);

        /* 7️⃣ Similarity ranking */
        const ranked = creations
            .map(c => {
                let vector: number[] = [];

                if (Array.isArray(c.embedding)) vector = c.embedding;
                else if (typeof c.embedding === "string") {
                    try { vector = JSON.parse(c.embedding); } catch { }
                }

                return {
                    ...c,
                    similarity: vector.length && messageEmbedding
                        ? cosineSimilarity(messageEmbedding, vector)
                        : 0
                };
            })
            .sort((a, b) => b.similarity - a.similarity)
            .slice(0, 5);

        /* 8️⃣ Token reduction */
        const context = ranked.map(c => {
            const short = c.content.length > 300
                ? c.content.slice(0, 300) + "..."
                : c.content;
            return `[${c.type}]: ${short}`;
        });

        /* 9️⃣ Prompt */
        const prompt = buildDashboardBotPrompt({
            userContent: context,
            question: message,
            fullName: displayName
        });

        /* 🔟 AI call */
        const ai = await openRouterForChatBot.post("/chat/completions", {
            model: "nvidia/nemotron-3-nano-30b-a3b:free",
            messages: [{ role: "user", content: prompt }],
            temperature: 0.4,
            max_tokens: 300
        });

        const reply =
            ai.data.choices?.[0]?.message?.content?.trim() ||
            "I couldn’t generate a clear response. Please rephrase.";

        response(res, 200, "Success", reply);

    } catch (err: any) {
        console.error("Dashboard Assistant Error:", err.message);
        if (!res.headersSent) response(res, 500, "Internal server error");
    }
};
