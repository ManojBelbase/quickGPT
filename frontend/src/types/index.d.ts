// src/types/index.ts
import { ReactNode } from "react";

export interface RouteItem {
    path: string | "";   // allow index
    element: ReactNode;
}

export interface SidebarProps {
    currentPath: string;
    // New props for responsiveness
    isOpen: boolean;
    onClose: () => void;
}