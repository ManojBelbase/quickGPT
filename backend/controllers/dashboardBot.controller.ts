import { Request, Response } from "express";
import sql from "../config/db";
import { response } from "../utils/responseHandler";
import { openRouterForChatBot } from "../config/openRouter";
import { buildDashboardBotPrompt } from "../prompts/dashboardBotPrompt";
import { detectContentType } from "../utils/detectContentType";

export const generateDashboardBotResponse = async (
    req: Request,
    res: Response
): Promise<void> => {
    try {
        const userId = req.auth().userId;
        const { message } = req.body;

        if (!message || typeof message !== "string") {
            response(res, 400, "Message is required");
            return;
        }

        // 1️⃣ Detect relevant content type
        const contentType = detectContentType(message);

        // 2️⃣ Retrieve only relevant user creations from DB
        const userCreations =
            contentType === "all"
                ? await sql`
            SELECT content, prompt, type, created_at
            FROM creations
            WHERE user_id = ${userId}
            ORDER BY created_at DESC
            LIMIT 50
          `
                : await sql`
            SELECT content, prompt, type, created_at
            FROM creations
            WHERE user_id = ${userId} AND type = ${contentType}
            ORDER BY created_at DESC
            LIMIT 50
          `;

        if (!userCreations.length) {
            response(
                res,
                200,
                "No user content found",
                "You have not generated any content of this type yet."
            );
            return;
        }

        const userContent = userCreations.map((c) => c.content);

        // 3️⃣ Build prompt with user content
        const formattedPrompt = buildDashboardBotPrompt({
            userContent,
            question: message,
        });

        // 4️⃣ Call AI
        const aiResponse = await openRouterForChatBot.post("/chat/completions", {
            model: "meta-llama/llama-3.3-70b-instruct:free",
            messages: [{ role: "user", content: formattedPrompt }],
            temperature: 0.7,
            max_tokens: 800,
        });

        const reply =
            aiResponse.data.choices?.[0]?.message?.content?.trim() || "";

        response(res, 200, "Success", reply);
    } catch (error: any) {
        console.error(error?.response?.data || error.message);
        response(res, 500, "Internal server error");
    }
};
