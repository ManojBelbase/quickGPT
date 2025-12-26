import { useMutation, useQueryClient } from "@tanstack/react-query";
import api from "../api/axiosInstance";

export const useDashboardBot = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async ({ message, userFullName }: { message: string; userFullName: string }) => {
            const { data } = await api.post<{
                status: number;
                message: string;
                data: string;
            }>("/dashboard-bot", { message, userFullName });

            return data.data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["dashboard-content"] });
        },
    });
};
