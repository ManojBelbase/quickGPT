import BackgroundRemove from "../pages/RemoveBackground"
import Community from "../pages/Community"
import Dashboard from "../pages/Dashboard"
import GenerateBlogTitle from "../pages/GenerateBlogTitle"
import RemoveObject from "../pages/RemoveObject"
import ReviewResume from "../pages/ReviewResume"
import WriteArticle from "../pages/WriteArticle"
import type { RouteItem } from "../types"
import { path } from "./paths"
import GenerateImages from "../pages/GenerateImages"

export const routesConfig: RouteItem[] = [
    { path: path.DASHBOARD, element: <Dashboard /> },
    { path: path.WRITE_ARTICLE, element: <WriteArticle /> },
    { path: path.REVIEW_RESUME, element: <ReviewResume /> },
    { path: path.COMMUNITY, element: <Community /> },
    { path: path.GENERATE_BLOG_TITLES, element: <GenerateBlogTitle /> },
    { path: path.GENERATE_IMAGES, element: <GenerateImages /> },
    { path: path.REMOVE_BACKGROUND, element: <BackgroundRemove /> },
    { path: path.REMOVE_OBJECT, element: <RemoveObject /> },
]
