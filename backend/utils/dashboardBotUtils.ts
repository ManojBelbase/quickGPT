// helpers/dashboardBotHelpers.ts
import { GREETING_KEYWORDS } from "../const/conts";

export const generateGreetingResponse = (message: string, displayName: string): string | null => {
    const lowerMessage = message.toLowerCase().trim();

    const isGreeting = GREETING_KEYWORDS.some(k => lowerMessage.includes(k));
    const isIdentityQuery = lowerMessage.includes("your name") || lowerMessage.includes("who are you");
    const isUserQuery = lowerMessage.includes("my name") || lowerMessage.includes("who am i");

    if (isGreeting || isIdentityQuery || isUserQuery || lowerMessage.length < 10) {
        if (isUserQuery) return `Your name is ${displayName}! 😊`;
        if (isIdentityQuery) return "I'm your Dashboard AI Assistant! I analyze your creations to give you insights.";
        if (lowerMessage.includes("thank")) return `You're very welcome, ${displayName}!`;

        // default greeting
        return `Hey ${displayName}! How can I help you today?`;
    }

    return null; // not a greeting
};
