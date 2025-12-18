import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import api from "../api/axiosInstance";
import type { ReplacedBackgroundImage } from "../types";

export const useGetReplacedBackgrounds = () => {
    return useQuery<ReplacedBackgroundImage[]>({
        queryKey: ["replaced-backgrounds"],
        queryFn: async () => {
            const { data } = await api.get<{ status: string; data: ReplacedBackgroundImage[] }>("/replace-background");
            if (data.status !== "success") throw new Error("Failed to load replaced backgrounds");
            return data.data;
        },
    });
};

export const useReplaceBackground = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async ({ file, prompt }: { file: File; prompt: string }) => {
            const formData = new FormData();
            formData.append("image", file);
            formData.append("prompt", prompt);

            const { data } = await api.post<{ status: string; data: { content: string }, message: string }>("/replace-background", formData, {
                headers: { "Content-Type": "multipart/form-data" },
                timeout: 90000,
            });

            if (data.status !== "success") {
                throw new Error(data.message || "Failed to replace background");
            }
            return data.data.content;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["replaced-backgrounds"] });
        },
    });
};