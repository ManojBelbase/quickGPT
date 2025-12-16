import { Request, Response } from "express";
import { openRouter } from "../config/openRouter";
import sql from "../config/db";
import { response } from "../utils/responseHandler";
import { clerkClient } from "@clerk/express";

export const generateArticle = async (req: Request, res: Response): Promise<void> => {
    try {
        const userId: string = req.auth().userId;
        const { prompt, length } = req.body;
        const plan: string | undefined = req.plan;
        const free_usage: number | undefined = req.free_usage;

        // Free users limit
        if (plan !== "premium" && (free_usage ?? 0) >= 10) {
            response(res, 403, "Limit Reached. Upgrade to continue.");
            return;
        }

        // 🔥 OpenRouter AI call
        const aiResponse = await openRouter.post("/chat/completions", {
            model: "tngtech/deepseek-r1t-chimera:free",
            messages: [{ role: "user", content: prompt }],
            temperature: 0.7,
            max_tokens: length,
            length: length
        });

        const content: string =
            aiResponse.data.choices?.[0]?.message?.content ?? "";

        // Save to DB (assuming sql is tagged template with proper typing, e.g., sql-tagged from 'pgsql')
        await sql`
            INSERT INTO creations (user_id, prompt, content, type)
            VALUES (${userId}, ${prompt}, ${content}, 'article')
        `;

        // Update free usage for non-premium users
        if (plan !== "premium") {
            await clerkClient.users.updateUserMetadata(userId, {
                privateMetadata: {
                    free_usage: (free_usage ?? 0) + 1,
                },
            });
        }

        response(res, 200, "Success", content);
    } catch (error: any) {
        console.error(error.response?.data || error.message);
        response(res, 500, "Something went wrong", error.response?.data ?? error.message);
    }
};