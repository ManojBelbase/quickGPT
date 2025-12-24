import type { SocialPlatform } from "../types";

export const ALLOWED_TONES = {
    professional: "professional",
    casual: "casual",
    friendly: "friendly",
    persuasive: "persuasive",
    inspirational: "inspirational",
} as const;

export const platforms: SocialPlatform[] = [
    "linkedin",
    "facebook",
    "twitter",
    "instagram",
] as const;

export const lengths = [
    { label: "Short(max 40 words) ", value: "short" },
    { label: "Medium(40-80 words)", value: "medium" },
    { label: "Long(80+ words)", value: "long" },
] as const;
