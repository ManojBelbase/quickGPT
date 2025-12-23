import {
    LayoutDashboard,
    FileText,
    ImagePlus,
    PenLine,
    Scissors,
    Layers,
    Users,
    Text
} from "lucide-react";
import { path } from "../routes/paths";
import type { SidebarLink } from "../types";

export const sidebarLinks: SidebarLink[] = [
    {
        id: 1,
        name: "Dashboard",
        path: path.DASHBOARD,
        Icon: LayoutDashboard,
    },
    {
        id: 9,
        name: "Summarize Text",
        path: path.TEXT_SUMMARIZER,
        Icon: Text
    },
    {
        id: 2,
        name: "Write Article",
        path: path.WRITE_ARTICLE,
        Icon: PenLine,
    },
    {
        id: 3,
        name: "Generate Blog Title",
        path: path.BLOG_TITLE,
        Icon: FileText,
    },
    {
        id: 4,
        name: "Generate Images",
        path: path.GENERATE_IMAGE,
        Icon: ImagePlus,
    },
    {
        id: 5,
        name: "Remove Background",
        path: path.REMOVE_BACKGROUND,
        Icon: Scissors,
    },
    {
        id: 6,
        name: "Replace Background",
        path: path.REPLACE_BACKGROUND,
        Icon: Layers,
    },
    {
        id: 8,
        name: "Community",
        path: path.COMMUNITY,
        Icon: Users,
    },

];
