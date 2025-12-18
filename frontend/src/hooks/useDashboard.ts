import { useQuery } from "@tanstack/react-query";
import api from "../api/axiosInstance";
import type { DashboardData } from "../types";

export const useDashboard = () => {
    return useQuery<DashboardData>({
        queryKey: ["dashboard"],
        queryFn: async () => {
            const { data } = await api.get<{ status: string; data: DashboardData }>("/dashboard");
            if (data.status !== "success") throw new Error("Failed to load dashboard");
            return data.data;
        },
        staleTime: 1000 * 60 * 5,
        retry: 1,
    });
};