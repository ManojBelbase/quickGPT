export const path = {

    DASHBOARD: "dashboard",
    WRITE_ARTICLE: "write-article",
    REVIEW_RESUME: "review-resume",
    COMMUNITY: "community",
    GENERATE_BLOG_TITLES: "generate-blog-titles",
} as const

export type PathType = typeof path[keyof typeof path]
