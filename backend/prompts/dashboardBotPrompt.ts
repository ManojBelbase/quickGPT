import { DashboardBotPromptOptions } from "../types";

export const buildDashboardBotPrompt = ({
    userContent,
    question,
}: DashboardBotPromptOptions): string => {
    return `
You are a helpful AI assistant for a QuickGPT user.

Use ONLY the following user-generated content to answer the question:
${userContent.join("\n\n")}

Question:
"${question}"

Guidelines:
- Answer concisely and clearly
- Include bullets if needed
- Do NOT hallucinate; answer only based on provided content
- Maintain a friendly, professional tone
- Output only the final answer
`;
};
