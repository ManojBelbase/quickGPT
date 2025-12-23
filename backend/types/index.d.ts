
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