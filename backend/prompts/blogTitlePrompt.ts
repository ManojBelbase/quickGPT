import { BlogTitlePromptOptions } from "../types";

export const buildBlogTitlePrompt = ({
    prompt,
}: BlogTitlePromptOptions): string => {
    return `
You are an expert SEO blog copywriter.

TASK:
Generate 3 LONG, DETAILED, SEO-OPTIMIZED blog titles for the topic below.

TOPIC:
"${prompt}"

STRICT RULES (VERY IMPORTANT):
- Each title MUST be 12–30 words long
- Each title MUST be descriptive and informative
- Include context, scope, or benefit in every title
- Use a subtitle after a colon (:) when appropriate
- Do NOT use markdown, bullets, or numbering
- Do NOT add explanations or extra text
- Each title must be on its own line
- Use proper capitalization

OUTPUT FORMAT (example):
Title one with detailed explanation and clear scope
Title two explaining benefits, trends, or future impact
...
`;
};
