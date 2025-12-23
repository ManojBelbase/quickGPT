import { CodeGeneratorPromptOptions } from "../types";

export const buildCodeGeneratorPrompt = ({
    prompt,
}: CodeGeneratorPromptOptions): string => {
    return `
You are an expert software developer.

TASK:
Generate a clean, concise, and well-commented code snippet based on the user's request.

USER REQUEST:
"""
${prompt}
"""

STRICT RULES:
- Automatically choose the most appropriate programming language based on the request (common choices:JavaScript, PHP, Python, Java, C++, etc.).
- If the language is not obvious, default to JavaScript.
- Keep the code short and focused (no full web pages or projects unless explicitly asked).
- Include clear comments explaining key parts.
- Use best practices (proper indentation, meaningful variable names).
- If input/output is involved, include example usage.
- Output format:
  1. First line: Language: [Detected Language]
  2. Then the code block: \`\`\`[language-lowercase]
     [code]
     \`\`\`
  3. After the code block, add a short explanation (max 80 words).

Example output:
Language: PHP

\`\`\`php
<?php
// Code here...
?>
\`\`\`

Explanation: This code...
`;
};