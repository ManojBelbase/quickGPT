import Community from "../pages/Community"
import Dashboard from "../pages/Dashboard"
import GenerateBlogTitle from "../pages/GenerateBlogTitle"
import ReviewResume from "../pages/ReviewResume"
import WriteArticle from "../pages/WriteArticle"
import type { RouteItem } from "../types"
import { path } from "./paths"

export const routesConfig: RouteItem[] = [
    { path: path.DASHBOARD, element: <Dashboard /> },
    { path: path.WRITE_ARTICLE, element: <WriteArticle /> },
    { path: path.REVIEW_RESUME, element: <ReviewResume /> },
    { path: path.COMMUNITY, element: <Community /> },
    { path: path.GENERATE_BLOG_TITLES, element: <GenerateBlogTitle /> },
]
