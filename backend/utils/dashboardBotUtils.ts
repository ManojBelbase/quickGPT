// helpers/dashboardBotHelpers.ts
import { GREETING_KEYWORDS } from "../const/conts";

export const generateGreetingResponse = (message: string, displayName: string): string | null => {
    const lower = message.toLowerCase().trim();

    // Explicit queries
    if (["who are you", "your name", "what are you"].includes(lower)) {
        return "I'm your Dashboard AI Assistant. I help you analyze, summarize, and explore your creations.";
    }
    if (["my name", "who am i"].includes(lower)) {
        return `Your name is ${displayName}! 😊`;
    }
    if (["thanks", "thank you", "thx"].includes(lower)) {
        return `You're very welcome, ${displayName}! 🙌`;
    }
    // Greeting
    if (GREETING_KEYWORDS.includes(lower)) {
        return `Hey ${displayName}! 👋 How can I help you today?`;
    }

    return null;
};
