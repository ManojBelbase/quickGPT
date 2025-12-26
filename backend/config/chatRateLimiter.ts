export const RATE_LIMIT_WINDOW_MS = 2 * 60 * 1000; // 2 minutes
export const MAX_REQUESTS = 3;

export const rateLimitMessages = [
    "Whoa! Let's take a short pause. Try again in 2 minutes.",
    "Slow down there! A short break before the next message, please.",
    "Hold on! AI is catching its breath. Your next message is ready in 2 minutes.",
    "Slow down there! Please wait 2 minutes before sending another message.",
    "Patience is a virtue! Your next AI reply will be available in 2 minutes.",
    "AI is recharging its brain cells. Come back in 2 minutes.",
    "Time-out! The AI needs a power nap. Come back in 2 minutes.",
    "Message limit reached. Your next request will be available shortly.",
    "You've sent too many messages in a short time. Please wait 2 minutes.",
    "Too fast! Please give us 2 minutes before sending another message."
];

export function getRandomRateLimitMessage(): string {
    const randomIndex = Math.floor(Math.random() * rateLimitMessages.length);
    return rateLimitMessages[randomIndex];
}
