import { ArticlePromptOptions } from "../types";

export const buildArticlePrompt = ({
    title,
    length,
}: ArticlePromptOptions): string => {
    return `
You are an expert content writer specializing in clear, well-structured articles.

Task:
Write a high-quality article on the topic below.

Topic:
"${title}"

Content Guidelines:
- Target length: approximately ${length} words
- Begin directly with the introduction (do NOT repeat the title)
- Use Markdown headings only (## for sections, ### for sub-sections)
- Include 4–8 logical sections
- Keep paragraphs concise (2–4 lines max)
- Use bullet points where they improve clarity
- Maintain a professional, engaging, and informative tone
- Ensure smooth flow between sections
- Avoid fluff, repetition, and generic statements

Conclusion:
- End with a short, impactful conclusion (2–4 sentences)

Output Rules:
- Return ONLY the article content
- Do NOT include explanations, metadata, or extra text
`;
};
