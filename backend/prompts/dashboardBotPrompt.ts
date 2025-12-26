import { DashboardBotPromptOptions } from "../types";

export const buildDashboardBotPrompt = ({
    userContent,
    question,
    fullName
}: DashboardBotPromptOptions): string => {
    const context = userContent.length > 0
        ? userContent.join("\n\n")
        : "NO RECENT CREATIONS FOUND IN DATABASE.";

    return `
You are "QuickGPT Assistant", a personal data analyst for ${fullName}.

CONTEXT FROM USER DATABASE:
${context}

USER'S QUESTION:
"${question}"

CONSTRAINTS:
1. If the context is "NO RECENT CREATIONS FOUND", politely tell the user you don't see any recent history yet.
2. Use ONLY the context provided. Do not use outside knowledge.
3. Use markdown for better readability (bolding, lists).
4. If the answer isn't in the context, say: "I couldn't find specific details about that in your recent dashboard history."

RESPONSE:`;
};