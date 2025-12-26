// Map all relevant user keywords to exact DB types
export const TYPE_KEYWORDS: { [keyword: string]: string } = {
    // Articles & Blogs
    article: "article",
    articles: "article",
    blog: "blog-title",
    "blog title": "blog-title",
    "blog titles": "blog-title",

    // Text Summaries
    summary: "text-summary",
    "text summary": "text-summary",

    // Social Posts
    social: "social-post",
    "social post": "social-post",

    // Objects
    "remove object": "remove-object",

    // Code Generation
    code: "code-generation",
    coding: "code-generation",
    "code generation": "code-generation",
    "coding question": "code-generation",
    "code question": "code-generation",
};

/**
 * Detects the relevant DB content type based on a user message.
 * Returns exact DB type if matched, otherwise "all".
 */
export const detectContentType = (message: string): string | "all" => {
    const msgLower = message.toLowerCase();
    for (const [keyword, type] of Object.entries(TYPE_KEYWORDS)) {
        if (msgLower.includes(keyword)) return type; // return exact DB type
    }
    return "all";
};
