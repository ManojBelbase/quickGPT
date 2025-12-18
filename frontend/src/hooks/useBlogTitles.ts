// src/hooks/useBlogTitles.ts
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import api from "../api/axiosInstance";
import type { BlogTitle, GenerateBlogTitleBody } from "../types";

export const useGetBlogTitles = () => {
    return useQuery<BlogTitle[]>({
        queryKey: ["blog-titles"],
        queryFn: async () => {
            const { data } = await api.get<{ status: string; data: BlogTitle[] }>("/blog-title");
            if (data.status !== "success") throw new Error("Failed to load titles");
            return data.data;
        },
    });
};

export const useGenerateBlogTitle = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async ({ prompt }: GenerateBlogTitleBody) => {
            const { data } = await api.post<{ status: string; data: string }>("/blog-title", { prompt });
            if (data.status !== "success") throw new Error("Generation failed");
            return data.data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["blog-titles"] });
        },
    });
};

export const useDeleteBlogTitle = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (id: string) => {
            const { data } = await api.delete(`/blog-title/${id}`);
            if (data.status !== "success") throw new Error("Delete failed");
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["blog-titles"] });
        },
    });
};