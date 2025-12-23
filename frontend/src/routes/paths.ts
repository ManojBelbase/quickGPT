export const path = {
    HOME: "/",
    DASHBOARD: "/dashboard",
    WRITE_ARTICLE: "/write-article",
    REVIEW_RESUME: "/review-resume",
    COMMUNITY: "/community",
    BLOG_TITLE: "/blog-title",
    TEXT_SUMMARIZER: '/summarize-text',
    REMOVE_BACKGROUND: "/remove-background",
    GENERATE_IMAGE: "/generate-image",
    REPLACE_BACKGROUND: "/replace-background"
} as const

export type PathType = typeof path[keyof typeof path]
