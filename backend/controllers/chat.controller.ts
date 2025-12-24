import { Request, Response } from "express";
import { buildChatPrompt } from "../prompts/chatPrompt";
import { response } from "../utils/responseHandler";
import { openRouterForChatBot } from "../config/openRouter";

export const generateChatResponse = async (req: Request, res: Response): Promise<void> => {
    try {
        const { message } = req.body;

        if (!message || typeof message !== "string") {
            response(res, 400, "Message is required");
        }

        const formattedPrompt = buildChatPrompt(message);

        const aiResponse = await openRouterForChatBot.post("/chat/completions", {
            model: "deepseek/deepseek-chat-v3.1",
            messages: [{ role: "user", content: formattedPrompt }],
            temperature: 0.7,
            max_tokens: 800,
            stream: false,
        });

        const content = aiResponse.data.choices?.[0]?.message?.content?.trim() ?? "";

        response(res, 200, "Success", { reply: content });
    } catch (error: any) {
        console.error(error.response?.data || error.message);
        response(res, 500, error);
    }
};