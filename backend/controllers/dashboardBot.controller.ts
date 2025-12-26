// controllers/dashboardBot.controller.ts
import { Request, Response } from "express";
import sql from "../config/db";
import { response } from "../utils/responseHandler";
import { openRouterForChatBot } from "../config/openRouter";
import { buildDashboardBotPrompt } from "../prompts/dashboardBotPrompt";
import { detectContentType, getContentTypeDisplayName } from "../utils/detectContentType";
import { RATE_LIMIT_WINDOW_MS } from "../config/chatRateLimiter";
import { generateGreetingResponse } from "../utils/dashboardBotUtils";


// Main function
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

        // 3️⃣ Detect content type and prepare rate-limit timestamp
        const contentType = detectContentType(message); // e.g., "blog-title" or "all"
        const displayType = getContentTypeDisplayName(contentType);
        const twoMinutesAgo = new Date(Date.now() - RATE_LIMIT_WINDOW_MS);

        // 4️⃣ Fetch user creations from DB
        const userCreations = await sql`
            SELECT content, prompt, type, created_at
            FROM creations
            WHERE user_id = ${userId}
            ${contentType !== "all" ? sql`AND type = ${contentType}` : sql``}
            AND created_at >= ${twoMinutesAgo}
            ORDER BY created_at DESC
            LIMIT 50
        `;

        // 5️⃣ Handle no creations
        if (userCreations.length === 0) {
            response(res, 200, "Success",
                `I looked through your dashboard, ${displayName}, but I couldn't find any ${displayType} yet. Start creating and I'll be able to help!`
            );
            return;
        }

        // 6️⃣ Build AI prompt
        const userContent = userCreations.map((c) => `[${c.type}]: ${c.content}`);
        const formattedPrompt = buildDashboardBotPrompt({
            userContent,
            question: message,
            fullName: displayName
        });

        // 7️⃣ Call AI
        let aiResponse;
        try {
            aiResponse = await openRouterForChatBot.post("/chat/completions", {
                model: "arcee-ai/trinity-mini:free",
                messages: [{ role: "user", content: formattedPrompt }],
                temperature: 0.4,
                max_tokens: 500,
            });
        } catch (aiError: any) {
            console.error("AI API Error:", aiError?.response?.data || aiError.message);
            if (!res.headersSent) {
                response(res, 500, "AI service error. Try again later.");
            }
            return;
        }

        // 8️⃣ Send AI reply
        const reply = aiResponse.data.choices?.[0]?.message?.content?.trim() ||
            `I processed your ${displayType} but couldn't generate a clear summary. Could you try rephrasing?`;

        response(res, 200, "Success", reply);

    } catch (error: any) {
        console.error("Dashboard Assistant Error:", error?.response?.data || error.message);
        if (!res.headersSent) {
            response(res, 500, "Internal server error");
        }
    }
};
