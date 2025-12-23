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
`;
};