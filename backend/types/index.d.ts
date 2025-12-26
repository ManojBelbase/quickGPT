
import 'express'; // Ensure Express types are loaded

declare global {
    namespace Express {
        interface Request {
            auth: () => { userId: string, has: any };
            plan?: string;
            free_usage?: number;
            has: (params: { plan: string }) => Promise<boolean> | boolean;

        }
    }
}

export interface ArticlePromptOptions {
    title: string;
    length: number;
}

export interface BlogTitlePromptOptions {
    prompt: string
}

export interface TextSummarizerPromptOptions {
    text: string;
    length?: "short" | "medium" | "long";
    style?: "neutral" | "bullet-points" | "formal" | "concise";
}

export interface CodeGeneratorPromptOptions {
    prompt: string

}

export interface SocialPostParams {
    prompt: string;              // user input: "promote my new coffee shop"
    platform: string;            // 'linkedin' | 'facebook' | 'twitter' | 'instagram'
    tone?: string;               // 'professional' | 'casual' | 'funny'
    length?: 'short' | 'medium' | 'long';
    includeHashtags?: boolean;
    tone?: Tone; // optional backend-controlled tone

}
export type Tone = keyof typeof ALLOWED_TONES;

export interface SocialPostFormProps {
    prompt: string;
    onPromptChange: (value: string) => void;
    platform: SocialPlatform;
    onPlatformChange: (value: SocialPlatform) => void;
    tone: Tone;
    onToneChange: (value: Tone) => void;
    length: "short" | "medium" | "long";
    onLengthChange: (value: "short" | "medium" | "long") => void;
    includeHashtags: boolean;
    onIncludeHashtagsChange: (value: boolean) => void;
    onGenerate: () => void;
    isLoading: boolean;
}

export interface DashboardBotPromptOptions {
    userContent: any,
    question: string

}
