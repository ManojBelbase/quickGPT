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

        // 🚫 Free users limit
        if (plan !== "premium" && (free_usage ?? 0) >= 10) {
            response(res, 403, "Limit Reached. Upgrade to continue.");
            return;
        }

        const formattedPrompt = `
You are an expert article writer. Write a complete, well-structured article with the following title:

Title: ${prompt}

Requirements:
- Length: Approximately ${length} words (aim for engaging content that naturally reaches this length).
- Structure: 
  - Start with an engaging introduction (hook the reader and outline the main idea).
  - Use 4-8 main sections with clear, bold Markdown headings (## Heading).
  - Include subheadings (### Subheading) where appropriate.
  - Use bullet points, numbered lists, or short paragraphs for readability.
  - End with a strong conclusion that summarizes key points and includes a call to action or final thought.
- Style: Professional, informative, and engaging. Use natural language, vary sentence length, and make it easy to read.
- Formatting: Use Markdown for headings, lists, bold/italic text, and any quotes.
- Do not add extra commentary outside the article. Output only the full article content.

Write the article now:
        `;

        // 🔥 OpenRouter AI call
        const aiResponse = await openRouter.post("/chat/completions", {
            model: "meta-llama/llama-3.3-70b-instruct:free",
            messages: [{ role: "user", content: formattedPrompt }],
            temperature: 0.7,
            max_tokens: length,
        });

        const content: string = aiResponse.data.choices?.[0]?.message?.content ?? "";

        // 💾 Save article to DB
        await sql`
      INSERT INTO creations(user_id, prompt, content, type)
        VALUES(${userId}, ${prompt}, ${content}, 'article')
            `;

        // 🔼 Update free usage for non-premium users
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
        response(
            res,
            500,
            "Something went wrong",
            error.response?.data ?? error.message
        );
    }
};




export const getArticles = async (req: Request, res: Response): Promise<void> => {
    try {
        const userId = req.auth().userId;

        const articles = await sql`
            SELECT id, prompt, content, created_at FROM creations WHERE user_id = ${userId} AND type = 'article'
            ORDER BY created_at DESC
            `;

        response(res, 200, "Articles fetched successfully", articles);
    } catch (error: any) {
        console.error(error.message);
        response(res, 500, "Failed to fetch articles");
    }
};
