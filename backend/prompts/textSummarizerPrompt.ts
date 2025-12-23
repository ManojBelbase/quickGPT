import { TextSummarizerPromptOptions } from "../types";

export const buildTextSummarizerPrompt = ({
    text,
    length = "medium", // "short" | "medium" | "long"
    style = "neutral", // "neutral" | "bullet-points" | "formal" | "concise"
}: TextSummarizerPromptOptions): string => {
    const lengthMap: Record<string, string> = {
        short: "Keep it very brief, 50–100 words max",
        medium: "Aim for 150–250 words",
        long: "Provide a detailed summary, up to 400 words",
    };

    const styleMap: Record<string, string> = {
        neutral: "Use clear, neutral language",
        "bullet-points": "Format as bullet points with key takeaways",
        formal: "Use formal, professional tone",
        concise: "Be extremely concise and to the point",
    };

    return `
You are an expert content summarizer.

TASK:
Create a high-quality summary of the following text.

TEXT TO SUMMARIZE:
"""
${text}
"""

STRICT RULES:
- Follow the requested length: ${lengthMap[length] || "medium"}
- Use the requested style: ${styleMap[style] || "neutral"}
- Capture the main ideas, key arguments, and conclusions
- Preserve important facts, names, dates, and numbers
- Do NOT add new information or personal opinions
- Write in complete sentences (unless bullet-points style is requested)
- Make it engaging and easy to read

OUTPUT FORMAT:
Just the summary itself — no introductions, no explanations, no extra comments.
`;
};