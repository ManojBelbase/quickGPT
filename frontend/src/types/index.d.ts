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