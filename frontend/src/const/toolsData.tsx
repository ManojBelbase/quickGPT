import {
    FileText,
    Type,
    Image as ImageIcon,
    Eraser,
    Text,
    MoreHorizontal,
    FileSearch2,
    Layers,
    Code,
    Sparkles, // ← added for social post (matches your Article/Code form icons)
} from 'lucide-react';
import { path } from '../routes/paths';
import type { Tool } from '../types';

export const tools: Tool[] = [
    {
        title: 'Text Summarizer',
        icon: Text,
        path: path.TEXT_SUMMARIZER,
        color: 'bg-blue-500',
        tag: 'New',
    },
    {
        title: 'Code Generator',
        icon: Code,
        path: path.CODE_GENERATOR,
        color: 'bg-cyan-500',
    },
    {
        title: 'Article Writer',
        icon: FileText,
        path: path.WRITE_ARTICLE,
        color: 'bg-purple-500',
    },
    {
        title: 'Blog Title Generator',
        icon: Type,
        path: path.BLOG_TITLE,
        color: 'bg-emerald-500',
    },
    // NEW: Social Media Post Generator
    {
        title: 'Social Post Generator',
        icon: Sparkles,
        path: path.SOCIAL_POST_GENERATOR,
        color: 'bg-indigo-500',
        tag: 'Popular',
        pro: true,
    },
    {
        title: 'AI Image Generator',
        icon: ImageIcon,
        path: path.GENERATE_IMAGE,
        color: 'bg-violet-500',
        tag: 'Popular',
        pro: true,
    },
    {
        title: 'Remove Background',
        icon: Eraser,
        path: path.REMOVE_BACKGROUND,
        color: 'bg-rose-500',
        pro: true,
    },
    {
        title: 'Replace Background',
        icon: Layers,
        path: path.REPLACE_BACKGROUND,
        color: 'bg-amber-500',
        pro: true,
    },
    {
        title: 'Resume Reviewer',
        icon: FileSearch2,
        path: path.REVIEW_RESUME,
        color: 'bg-teal-500',
        tag: 'Upcoming',
    },
    {
        title: 'More Coming Soon...',
        icon: MoreHorizontal,
        path: '#',
        color: 'bg-slate-400',
    },
];