import { ReactNode } from "react";

export interface RouteItem {
    path: string | "";
    element: ReactNode;
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