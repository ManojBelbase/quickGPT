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
- Each title MUST be descriptive and informative, capitalization
- Include context, scope, or benefit in every title
- Use Markdown headings (##, ###)
- Return titles as a list or separated by new lines

OUTPUT FORMAT (example):
Title one with detailed explanation and clear scope
Title two explaining benefits, trends, or future impact
...
`;
};
