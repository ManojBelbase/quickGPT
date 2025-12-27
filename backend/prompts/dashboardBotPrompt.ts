interface DashboardPromptProps {
    userContent: string[]; // already shortened content
    question: string;
    fullName: string;
}

export function buildDashboardBotPrompt({ userContent, question, fullName }: DashboardPromptProps): string {
    // Only include top 5 relevant items (assume userContent is already sliced)
    const contentSection = userContent.length
        ? `Here are some of your recent creations:\n${userContent.join("\n")}`
        : "You have no recent creations.";

    return `
You are a helpful AI assistant for ${fullName}'s dashboard.
Analyze the user's recent creations and answer concisely.

${contentSection}

User's question: "${question}"

Provide a clear and brief response.
`;
}
