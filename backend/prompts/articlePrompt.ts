import { ArticlePromptOptions } from "../types";


export const buildArticlePrompt = ({
    title,
    length,
}: ArticlePromptOptions): string => {
    return `
You are a professional article writer.

Write an article titled:
"${title}"

Rules:
- Target length: ~${length} words
- Start directly with the introduction (no title repetition)
- Use Markdown headings (##, ###)
- 4–8 sections maximum
- Short paragraphs, bullets where helpful
- Professional, clear, engaging tone
- End with a concise conclusion
- Output ONLY the article content
`;
};
