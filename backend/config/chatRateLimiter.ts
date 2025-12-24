import rateLimit from "express-rate-limit";

// Limit: 3 requests per minute per IP
export const chatRateLimiter = rateLimit({
    windowMs: 1 * 60 * 1000, // 1 minute
    max: 3,
    message: {
        status: 429,
        message: "Even AI needs a breather! You can send your next message in 1 minute."
    },
    standardHeaders: true,
    legacyHeaders: false,
});
