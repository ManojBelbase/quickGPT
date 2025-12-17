import {
    SquarePen,
    Hash,
    Image,
    Palette,
    Focus,
    FileText
} from 'lucide-react';
import { path } from '../routes/paths';
export const toolsData = [
    {
        id: 1,
        title: "AI Article Writer",
        description: "Generate high-quality, engaging articles on any topic with our AI writing technology.",
        Icon: SquarePen,
        colorClass: "bg-blue-100 text-blue-500",
        path: path.WRITE_ARTICLE
    },
    {
        id: 2,
        title: "Blog Title Generator",
        description: "Generate high-quality, engaging articles on any topic with our AI writing technology.",
        Icon: Hash,
        colorClass: "bg-purple-100 text-purple-500",
        path: path.GENERATE_BLOG_TITLES

    },
    {
        id: 3,
        title: "AI Image Generation",
        description: "Generate high-quality, engaging articles on any topic with our AI writing technology.",
        Icon: Image,
        colorClass: "bg-green-100 text-green-500",
        path: path.GENERATE_IMAGES

    },
    {
        id: 4,
        title: "Background Removal",
        description: "Generate high-quality, engaging articles on any topic with our AI writing technology.",
        Icon: Palette,
        colorClass: "bg-orange-100 text-orange-500",
        path: path.REMOVE_BACKGROUND

    },
    {
        id: 5,
        title: "Object Removal",
        description: "Generate high-quality, engaging articles on any topic with our AI writing technology.",
        Icon: Focus,
        colorClass: "bg-indigo-100 text-indigo-500",
        path: path.REMOVE_BACKGROUND

    },
    {
        id: 6,
        title: "Resume Review",
        description: "Generate high-quality, engaging articles on any topic with our AI writing technology.",
        Icon: FileText,
        colorClass: "bg-teal-100 text-teal-500",
        path: path.REVIEW_RESUME

    },
];
