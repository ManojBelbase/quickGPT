import { LayoutDashboard, FileText, Image, PenTool, Crop, User, Group } from "lucide-react";
import { path } from "../routes/paths";

export interface SidebarLink {
    id: number;
    name: string;
    path: string;
    Icon: React.ElementType;
}

export const sidebarLinks: SidebarLink[] = [
    {
        id: 1,
        name: "Dashboard",
        path: path.DASHBOARD,
        Icon: LayoutDashboard,
    },
    {
        id: 2,
        name: "Write Article",
        path: path.WRITE_ARTICLE,
        Icon: PenTool,
    },
    {
        id: 3,
        name: "Blog Titles",
        path: path.GENERATE_BLOG_TITLES,
        Icon: FileText,
    },
    {
        id: 4,
        name: "Generate Images",
        path: path.GENERATE_IMAGES,
        Icon: Image,
    },
    {
        id: 5,
        name: "Remove Background",
        path: path.REMOVE_BACKGROUND,
        Icon: Crop,
    },
    {
        id: 6,
        name: "Remove Object",
        path: path.REMOVE_OBJECT,
        Icon: PenTool,
    },
    {
        id: 7,
        name: "Review Resume",
        path: path.REVIEW_RESUME,
        Icon: User,
    },
    {
        id: 8,
        name: "Community",
        path: path.COMMUNITY,
        Icon: Group
    }
];