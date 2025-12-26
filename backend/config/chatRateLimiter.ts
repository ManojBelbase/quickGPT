export const RATE_LIMIT_WINDOW_MS = 60 * 1000;
export const MAX_REQUESTS = 3;

export const rateLimitMessages = [
    "Whoa! Let's take a short pause. Try again in 1 minute.",
    "Slow down there! A short break before the next message, please.",
    "Hold on! AI is catching its breath. Your next message is ready in 60 seconds.",
    "Slow down there! Please wait a minute before sending another message.",
    "Patience is a virtue! Your next AI reply will be available in 1 minute.",
    "AI is recharging its brain cells. Come back in 60 seconds.",
    "Time-out! The AI needs a power nap. Come back in 1 minute.",
    "Message limit reached. Your next request will be available shortly.",
    "You've sent too many messages in a short time. Please wait a minute.",
    "Too fast! Please give us a minute before sending another message."
];
export function getRandomRateLimitMessage(): string {
    const randomIndex = Math.floor(Math.random() * rateLimitMessages.length);
    return rateLimitMessages[randomIndex];
}