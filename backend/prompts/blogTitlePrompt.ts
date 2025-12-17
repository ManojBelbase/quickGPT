import { BlogTitlePromptOptions } from "../types";

export const buildBlogTitlePrompt = ({
    prompt,
}: BlogTitlePromptOptions): string => {
    return `
You are a professional copywriter.

Based on the topic below, generate 3–5 catchy, engaging blog title ideas:

Topic: "${prompt}"

Rules:
- Each title should be short, clear, and attention-grabbing
- Use proper capitalization
- Do NOT write anything else except the titles
- Return titles as a list or separated by new lines
`;
};
