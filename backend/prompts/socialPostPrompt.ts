import { ALLOWED_TONES, SocialPostParams } from "../types";


export type Tone = keyof typeof ALLOWED_TONES;

export const buildSocialPostPrompt = ({
    prompt,
    platform,
    length = "medium",
    includeHashtags = true,
    tone = "professional", // default backend tone
}: SocialPostParams): string => {
    const staticTone = ALLOWED_TONES[tone as keyof typeof ALLOWED_TONES];

    const platformStyles = {
        linkedin:
            "professional, insightful, business-oriented, clear value-driven messaging, emojis allowed but minimal, optional line breaks",
        facebook:
            "conversational, friendly, community-focused, light storytelling",
        twitter:
            "concise, punchy, attention-grabbing, MUST fit within 280 characters",
        instagram:
            "engaging, visual-first, emoji-friendly but not excessive, inspirational",
    };

    const lengthRules = {
        short: "1–2 sentences (max 40 words)",
        medium: "3–5 sentences (40–80 words)",
        long: "6–10 sentences (80–140 words)",
    };

    return `
You are an expert social media copywriter.

Generate a ready-to-post caption for ${platform.toUpperCase()}.

User request:
"${prompt}"

Rules to follow strictly:
- Tone: ${staticTone}
- Length: ${lengthRules[length]}
- Platform style: ${platformStyles[platform as keyof typeof platformStyles]}
- ${includeHashtags
            ? "Add 3–5 relevant hashtags at the END only, separated by spaces"
            : "Do NOT include hashtags"
        }
- Emojis may be used if they fit the platform and tone; do NOT overuse them
- Output ONLY the final post text

The result must be clean, natural, and copy-paste ready.
`.trim();
};