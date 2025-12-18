import { ReactNode } from "react";

export interface RouteItem {
    path: string | "";
    element: any;
    protected: boolean
}

export interface SidebarProps {
    currentPath: string;
    isOpen: boolean;
    onClose: () => void;
}


export interface DashboardCardProps {
    title: string;
    value: string | number;
    iconType: 'creations' | 'plan';
}
export interface CreationItem {
    id: number;
    prompt: string;
    type: string;
    created_at: string;
    content: string,
}

export interface Article {
    id: string;
    prompt: string;
    content: string;
}
export interface ArticleListProps {
    onSelectArticle: (content: string) => void;
}

export interface BlogTitleFormProps {
    keyword: string;
    onKeywordChange: (value: string) => void;
    categories: any[];
    selectedCategory: any;
    onCategoryChange: (category: any) => void;
    onGenerate: (prompt: string) => void;
    isLoading: boolean;
}
export export interface BlogTitle {
    id: string;
    prompt: string;
    content: string;
    created_at: string;
}

export interface UserImage {
    id: string;
    prompt: string;
    content: string;
    publish: boolean;
    created_at: string;
    likes: string

}

export export interface ImageStyle {
    name: string;
    value: string;
}
export interface GeneratedImageResultProps {
    images: string[];
    isLoading: boolean;
}
export
    interface GeneratedArticleResultProps {
    content: string;
    isLoading: boolean;
}

export interface BlogTitleResultProps {
    titles: string[];
    isLoading: boolean;
}

export interface BackgroundRemovalFormProps {
    selectedFile: File | null;
    onFileChange: (file: File | null) => void;
    onRemoveBackground: () => void;
    isLoading: boolean;
}

export interface RemovedImage {
    id: string;
    content: string;
    created_at: string;
}

export interface Props {
    onSelectImage?: (url: string) => void;
}

export interface CommunityCardProps {
    image: UserImage;
    onLike: () => void;
    currentUserId: string;
}

export export interface SidebarLink {
    id: number;
    name: string;
    path: string;
    Icon: React.ElementType;
}

export interface ObjectRemovalFormProps {
    selectedFile: File | null;
    onFileChange: (file: File | null) => void;
    objectDescription: string;
    onDescriptionChange: (description: string) => void;
    onObjectRemoval: () => void;
    isLoading: boolean;
}

export
    interface ProcessedImageResultProps {
    imageUrl: string | null;
    isLoading: boolean;
}

export interface RemovedObjectImage {
    id: number;
    prompt: string;
    content: string;
    type: string;
    created_at: string;
}

export interface DashboardData {
    plan: string;
    free_remaining: number | string;
    total_creations: number;
    creations_by_type: { type: string; count: number }[];
}