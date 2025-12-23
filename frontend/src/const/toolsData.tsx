import {
    FileText, Type, Image as ImageIcon, Eraser,
    Layers,
} from 'lucide-react';
import { path } from '../routes/paths';
export const tools = [
    { title: 'Article', icon: <FileText size={20} />, path: path.WRITE_ARTICLE, color: 'bg-purple-500' },
    { title: 'Blog Title', icon: <Type size={20} />, path: path.BLOG_TITLE, color: 'bg-emerald-500' },
    { title: 'AI Image', icon: <ImageIcon size={20} />, path: path.GENERATE_IMAGE, color: 'bg-violet-500', pro: true },
    { title: 'Remove BG', icon: <Eraser size={20} />, path: path.REMOVE_BACKGROUND, color: 'bg-rose-500', pro: true },
    { title: 'Replace BG', icon: <Layers size={20} />, path: path.REPLACE_BACKGROUND, color: 'bg-amber-500', pro: true },
];