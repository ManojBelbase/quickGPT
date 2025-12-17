import BackgroundRemove from "../pages/RemoveBackground"
import Community from "../pages/Community"
import Dashboard from "../pages/Dashboard"
import GenerateBlogTitle from "../pages/GenerateBlogTitle"
import ReviewResume from "../pages/ReviewResume"
import WriteArticle from "../pages/WriteArticle"
import type { RouteItem } from "../types"
import { path } from "./paths"
import GenerateImages from "../pages/GenerateImages"
import ReplaceBackground from "../pages/ReplaceBackground"

export const routesConfig: RouteItem[] = [
    { path: path.DASHBOARD, element: <Dashboard /> },
    { path: path.WRITE_ARTICLE, element: <WriteArticle /> },
    { path: path.REVIEW_RESUME, element: <ReviewResume /> },
    { path: path.COMMUNITY, element: <Community /> },
    { path: path.BLOG_TITLE, element: <GenerateBlogTitle /> },
    { path: path.GENERATE_IMAGE, element: <GenerateImages /> },
    { path: path.REMOVE_BACKGROUND, element: <BackgroundRemove /> },
    { path: path.REPLACE_BACKGROUND, element: <ReplaceBackground /> },
]
