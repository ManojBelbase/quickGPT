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
    likes?: any

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

// src/types/article.types.ts
export interface Article {
    id: string;
    prompt: string;
    content: string;
    createdAt?: string;
    [key: string]: any;
}

export interface GenerateArticleBody {
    prompt: string;
    length: number;
}

export interface GenerateArticleResponse {
    status: string;
    message?: string;
    data: string; // generated article content
}

export interface BlogTitle {
    id: string;
    prompt: string;
    content: string; // the generated titles (maybe as string or array)
    createdAt?: string;
}

export interface GenerateBlogTitleBody {
    prompt: string;
}


export interface UserImage {
    id: string;
    content: string;
    prompt: string;
    publish: boolean;
    likes?: any;   // ← MUST BE string[], not string!
    userId: string;
    createdAt?: string;
}

export interface GenerateImageBody {
    prompt: string;
    publish: boolean;
}

export interface RemovedImage {
    id: string;
    content: string;
    originalPrompt?: string;
    createdAt?: string;
}


export interface ReplacedBackgroundImage {
    id: string;
    content: string;
    prompt: string;
    createdAt?: string;
}

export interface CopyButtonProps {
    text: string;
    className?: string;
    title?: string;
    size?: 'sm' | 'md' | 'lg';
}

export
    interface PreviewHeaderProps {
    title: string;
    icon: React.ReactNode;

    isCopy?: boolean;
    copyText?: string;
    copyTitle?: string;

    isDownload?: boolean;
    downloadUrl?: string;
    downloadFilename?: string;

    actionButton?: React.ReactNode;

    className?: string;
}

export interface TextSummary {
    id: string;
    prompt: string; // the original text
    content: string; // the generated summary
    created_at: string;
}

export interface GenerateSummaryBody {
    text: string;
    length?: "short" | "medium" | "long";
    style?: "neutral" | "bullet-points" | "formal" | "concise";
}

export interface TextSummarizerFormProps {
    text: string;
    onTextChange: (value: string) => void;
    length: "short" | "medium" | "long";
    onLengthChange: (value: "short" | "medium" | "long") => void;
    style: "neutral" | "bullet-points" | "formal" | "concise";
    onStyleChange: (value: "neutral" | "bullet-points" | "formal" | "concise") => void;
    onGenerate: () => void;
    isLoading: boolean;
}


export type ToolTag = 'New' | 'Popular' | 'Upcoming';

export interface Tool {
    title: string;
    icon: LucideIcon;
    path: string;
    color: string;
    tag?: ToolTag;
    pro?: boolean;
}

export interface GeneratedCode {
    id: string;
    prompt: string;
    content: string;
    created_at: string;
}

export interface GenerateCodeBody {
    prompt: string;
    language?: string;
}

export interface GeneratedCodeResultProps {
    content: string;
    isLoading: boolean;
}

export interface CodeFormProps {
    prompt: string;
    onPromptChange: (value: string) => void;
    onGenerate: () => void;
    isLoading: boolean;
}

export interface ImageGenerationFormProps {
    prompt: string;
    onPromptChange: (value: string) => void;
    styles: ImageStyle[];
    selectedStyle: ImageStyle;
    onStyleChange: (style: ImageStyle) => void;
    publish: boolean;
    onPublishChange: (value: boolean) => void;
    onGenerate: () => void;
    isLoading: boolean;
}