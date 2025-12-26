// utils/contentTypeHelper.ts

// 1️⃣ Mapping of keywords to internal type IDs
const contentTypeMap: Record<string, string> = {
    "blog": "blog-title",
    "blog title": "blog-title",
    "blog titles": "blog-title",
    "article": "blog-title",
    "social": "social-post",
    "social post": "social-post",
    "social posts": "social-post",
    "code": "code-snippet",
    "code snippet": "code-snippet",
    "code snippets": "code-snippet",
    "all": "all",
};

// 2️⃣ Mapping of type IDs to friendly display names
const contentTypeDisplayNames: Record<string, string> = {
    "all": "creations",
    "blog-title": "blog titles",
    "social-post": "social posts",
    "code-snippet": "code snippets",
};


// 3️⃣ Function to detect content type from user message
export function detectContentType(message: string): string {
    const lower = message.toLowerCase();

    for (const key in contentTypeMap) {
        if (lower.includes(key)) {
            return contentTypeMap[key]; // internal type ID
        }
    }

    return "all"; // default
}

// 4️⃣ Function to get friendly display name from type ID
export function getContentTypeDisplayName(type: string): string {
    return contentTypeDisplayNames[type] || "creations";
}
