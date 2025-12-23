import {
    SquarePen,
    Hash,
    Image,
    Eraser,
    FileText,
    Text,
    MoreHorizontal,
    Layers,
    type LucideIcon,
    Code2,
} from 'lucide-react';
import { path } from '../routes/paths';


type ToolTag = 'New' | 'Upcoming' | "Popular";

interface AiToolData {
    title: string;
    description?: string;
    Icon: LucideIcon;
    bg: { from: string; to: string };
    path: string;
    tag?: ToolTag;
    pro?: Boolean
}


export const AiToolsData: AiToolData[] = [
    {
        title: 'Text Summarizer',
        description:
            'Summarize long texts into clear, concise, and meaningful summaries using AI-powered analysis.',
        Icon: Text,
        bg: { from: '#7C3AED', to: '#4F46E5' },
        path: path.TEXT_SUMMARIZER,
        tag: 'New',
        pro: false,
    },

    {
        title: 'Blog Title Generator',
        description:
            'Find the perfect, catchy title for your blog posts with our AI-powered generator.',
        Icon: Hash,
        bg: { from: '#B153EA', to: '#E549A3' },
        path: path.BLOG_TITLE,
    },

    {
        title: 'Article Writer',
        description:
            'Generate high-quality, engaging articles on any topic with our AI writing technology.',
        Icon: SquarePen,
        bg: { from: '#3588F2', to: '#0BB0D7' },
        path: path.WRITE_ARTICLE,
        tag: "Popular"
    },
    {
        title: 'Code Generator',
        description:
            'Generate clean, efficient, and production-ready code snippets using AI for faster development.',
        Icon: Code2,
        bg: { from: '#0EA5E9', to: '#2563EB' },
        path: "#",
        tag: "Upcoming"
    },

    {
        title: 'Image Generation',
        description: 'Create stunning visuals with our AI image generation tool and experience the power of AI.',
        Icon: Image,
        bg: { from: '#20C363', to: '#11B97E' },
        path: path.GENERATE_IMAGE,
        pro: true
    },
    {
        title: 'Background Removal',
        description:
            'Effortlessly remove backgrounds from your images with our AI-driven tool.',
        Icon: Eraser,
        bg: { from: '#F76C1C', to: '#F04A3C' },
        path: path.REMOVE_BACKGROUND,
        pro: true,
    },
    {
        title: 'Replace Background',
        description:
            'Replace your image background seamlessly using AI for fast and professional results.',
        Icon: Layers,
        bg: { from: '#5C6AF1', to: '#427DF5' },
        path: path.REPLACE_BACKGROUND,
        pro: true
    },
    {
        title: 'Resume Reviewer',
        description:
            'Get your resume reviewed by AI to improve your chances of landing your dream job.',
        Icon: FileText,
        bg: { from: '#12B7AC', to: '#08B6CE' },
        path: path.REVIEW_RESUME,
        tag: 'Upcoming',
        pro: true
    },
    {
        title: 'More Coming Soon...',
        Icon: MoreHorizontal,
        description: "More tools being added every week...",
        bg: { from: '#CBD5E1', to: '#94A3B8' },
        path: '#',
    },
];
