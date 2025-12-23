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
import TextSummarizer from "../pages/TextSummarizer"

export const routesConfig: RouteItem[] = [
    { path: path.DASHBOARD, element: <Dashboard />, protected: true },
    { path: path.TEXT_SUMMARIZER, element: <TextSummarizer />, protected: true },
    { path: path.WRITE_ARTICLE, element: <WriteArticle />, protected: true },
    { path: path.REVIEW_RESUME, element: <ReviewResume />, protected: true },
    { path: path.COMMUNITY, element: <Community />, protected: true },
    { path: path.BLOG_TITLE, element: <GenerateBlogTitle />, protected: true },
    { path: path.GENERATE_IMAGE, element: <GenerateImages />, protected: true },
    { path: path.REMOVE_BACKGROUND, element: <BackgroundRemove />, protected: true },
    { path: path.REPLACE_BACKGROUND, element: <ReplaceBackground />, protected: true },
]

