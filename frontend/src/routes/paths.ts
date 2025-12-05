export const path = {
    HOME: "/",
    DASHBOARD: "dashboard",
    WRITE_ARTICLE: "write-article",
    REVIEW_RESUME: "review-resume",
    COMMUNITY: "community",
    GENERATE_BLOG_TITLES: "generate-blog-titles",
    REMOVE_BACKGROUND: "/remove-background",
    GENERATE_IMAGES: "/generate-images",
    REMOVE_OBJECT: "/remove-object"
} as const

export type PathType = typeof path[keyof typeof path]
