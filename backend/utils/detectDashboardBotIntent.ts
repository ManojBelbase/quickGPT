// helpers/detectDashboardBotIntent.ts
import { DashboardBotIntent, GREETING_KEYWORDS } from "../const/conts";

export function detectDashboardBotIntent(message: string): DashboardBotIntent {
    const text = message.toLowerCase().trim();

    // 👋 Greeting (exact match)
    if (GREETING_KEYWORDS.includes(text)) return DashboardBotIntent.GREETING;

    // 🤖 Identity
    if (["who are you", "your name", "what are you", "my identify"].includes(text)) {
        return DashboardBotIntent.IDENTITY;
    }

    // 👤 User info
    if (["my name", "who am i"].includes(text)) return DashboardBotIntent.USER_INFO;

    // 🙏 Thanks
    if (["thanks", "thank you", "thx"].includes(text)) return DashboardBotIntent.THANKS;

    // 🛠 Capability queries
    if (/(what can you do|what tasks can you do|how can you help|your capabilities)/i.test(text)) {
        return DashboardBotIntent.CAPABILITY;
    }

    // 📊 Stats queries
    if (/(how many|total|count|breakdown|types)/i.test(text)) {
        return DashboardBotIntent.STATS;
    }

    // 📄 Content queries (default AI work)
    if (text.length > 0) return DashboardBotIntent.CONTENT;

    return DashboardBotIntent.UNKNOWN;
}
