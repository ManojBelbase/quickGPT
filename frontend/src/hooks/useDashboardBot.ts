import { useMutation, useQueryClient } from "@tanstack/react-query";
import api from "../api/axiosInstance";

export const useDashboardBot = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (message: string) => {
            // Pointing to your new dashboard bot controller
            const { data } = await api.post<{
                status: number;
                message: string;
                data: string;
            }>("/dashboard-bot", { message });

            return data.data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["dashboard-content"] });
        },
    });
};