import { Request, Response } from "express";
import sql from "../config/db";
import { response } from "../utils/responseHandler";
import { openRouterForChatBot } from "../config/openRouter";
import { buildDashboardBotPrompt } from "../prompts/dashboardBotPrompt";
import { detectContentType, getContentTypeDisplayName } from "../utils/detectContentType";
import { generateGeminiEmbedding } from "../utils/geminiEmbedding";
import { RATE_LIMIT_WINDOW_MS, MAX_REQUESTS, getRandomRateLimitMessage } from "../config/chatRateLimiter";
import { generateGreetingResponse } from "../utils/dashboardBotUtils";

// Cosine similarity for embeddings
function cosineSimilarity(a: number[], b: number[]): number {
    if (!Array.isArray(a) || !Array.isArray(b) || a.length === 0 || b.length === 0) return 0;
    const dot = a.reduce((sum, val, i) => sum + val * (b[i] || 0), 0);
    const magA = Math.sqrt(a.reduce((sum, val) => sum + val * val, 0));
    const magB = Math.sqrt(b.reduce((sum, val) => sum + val * val, 0));
    return magA && magB ? dot / (magA * magB) : 0;
}

interface Creation {
    content: string;
    type: string;
    embedding: number[] | string | null;
}

export const generateDashboardBotResponse = async (req: any, res: Response): Promise<void> => {
    try {
        const userId = req.auth().userId;
        const displayName = req.body.userFullName || req.fullName || "User";
        const { message } = req.body;

        // 1️⃣ Validate message
        if (!message?.trim()) {
            response(res, 400, "Message is required");
            return;
        }

        // 2️⃣ Check for greetings / chit-chat
        const greetingReply = generateGreetingResponse(message, displayName);
        if (greetingReply) {
            response(res, 200, "Success", greetingReply);
            return;
        }

        // 3️⃣ Rate limiting per user
        if (!req.session) req.session = {};
        const now = Date.now();
        const recentRequests: number[] = req.session.dashboardRequests || [];
        const validRequests = recentRequests.filter(t => now - t < RATE_LIMIT_WINDOW_MS);

        if (validRequests.length >= MAX_REQUESTS) {
            response(res, 429, getRandomRateLimitMessage());
            return;
        }
        validRequests.push(now);
        req.session.dashboardRequests = validRequests;

        // 4️⃣ Detect content type
        const contentType = detectContentType(message); // e.g., blog-title, image, article
        const displayType = getContentTypeDisplayName(contentType);

        // 5️⃣ Fetch all creations for this user
        const userCreations: Creation[] = (await sql`
            SELECT content, type, embedding
            FROM creations
            WHERE user_id = ${userId}
            ORDER BY created_at DESC
        `) as Creation[];

        if (!userCreations.length) {
            response(res, 200, "Success",
                `I looked through your dashboard, ${displayName}, but I couldn't find any ${displayType} yet. Start creating and I'll be able to help!`
            );
            return;
        }

        // 6️⃣ Generate embedding for user's message
        const messageEmbedding = await generateGeminiEmbedding(message);

        // 7️⃣ Compute similarity for each creation & pick top 5
        const relevantCreations = userCreations
            .map(c => {
                let embeddingArray: number[] = [];

                if (Array.isArray(c.embedding)) embeddingArray = c.embedding;
                else if (typeof c.embedding === "string") {
                    try { embeddingArray = JSON.parse(c.embedding); }
                    catch { embeddingArray = []; }
                }

                return {
                    ...c,
                    similarity: embeddingArray.length ? cosineSimilarity(messageEmbedding as any, embeddingArray) : 0
                };
            })
            .sort((a, b) => b.similarity - a.similarity)
            .slice(0, 5);

        // 8️⃣ Shorten content to reduce tokens
        const userContent = relevantCreations.map(c => {
            const shortContent = c.content.length > 300 ? c.content.slice(0, 300) + "..." : c.content;
            return `[${c.type}]: ${shortContent}`;
        });

        // 9️⃣ Build AI prompt
        const formattedPrompt = buildDashboardBotPrompt({
            userContent,
            question: message,
            fullName: displayName
        });

        // 🔟 Call AI
        let aiResponse;
        try {
            aiResponse = await openRouterForChatBot.post("/chat/completions", {
                model: "nvidia/nemotron-3-nano-30b-a3b:free",
                messages: [{ role: "user", content: formattedPrompt }],
                temperature: 0.4,
                max_tokens: 300,
            });
        } catch (aiError: any) {
            console.error("AI API Error:", aiError?.response?.data || aiError.message);
            response(res, 500, "AI service error. Try again later.");
            return;
        }

        // 1️⃣1️⃣ Send AI reply
        const reply = aiResponse.data.choices?.[0]?.message?.content?.trim() ||
            `I processed your ${displayType} but couldn't generate a clear summary. Could you try rephrasing?`;

        response(res, 200, "Success", reply);

    } catch (error: any) {
        console.error("Dashboard Assistant Error:", error?.response?.data || error.message);
        if (!res.headersSent) response(res, 500, "Internal server error");
    }
};
