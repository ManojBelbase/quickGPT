// src/types/index.ts
import { ReactNode } from "react";

export interface RouteItem {
    path: string | "";   // allow index
    element: ReactNode;
}
