import { GREETING_KEYWORDS } from "../const/conts";

export const generateGreetingResponse = (
    message: string,
    displayName: string
): string | null => {

    const lower = message.toLowerCase().trim();

    /* ------------------ Explicit queries ------------------ */
    const isIdentityQuery =
        lower === "who are you" ||
        lower === "your name" ||
        lower === "what are you";

    const isUserQuery =
        lower === "my name" ||
        lower === "who am i";

    const isThanks =
        lower === "thanks" ||
        lower === "thank you" ||
        lower === "thx";

    /* ------------------ Greeting detection ------------------ */
    const isGreeting =
        GREETING_KEYWORDS.includes(lower);

    /* ------------------ RESPONSES ------------------ */
    if (isUserQuery) {
        return `Your name is ${displayName}! 😊`;
    }

    if (isIdentityQuery) {
        return "I'm your Dashboard AI Assistant. I help you analyze, summarize, and explore your creations.";
    }

    if (isThanks) {
        return `You're very welcome, ${displayName}! 🙌`;
    }

    if (isGreeting) {
        return `Hey ${displayName}! 👋 How can I help you today?`;
    }

    return null; // ✅ NOT a greeting
};
