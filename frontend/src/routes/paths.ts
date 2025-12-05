export const path = {
    HOME: "/",
    DASHBOARD: "dashboard",
    WRITE_ARTICLE: "write-article",
    REVIEW_RESUME: "review-resume",
    COMMUNITY: "community",
    GENERATE_BLOG_TITLES: "generate-blog-titles",
    BACKGROUND_REMOVE: "/background-remove",
    GENERATE_IMAGES: "/generate-images"
} as const

export type PathType = typeof path[keyof typeof path]
