import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import api from "../api/axiosInstance";
import toast from "react-hot-toast";
import type { Article, GenerateArticleBody } from "../types";

export const useGetArticles = () => {
    return useQuery<Article[]>({
        queryKey: ["articles"],
        queryFn: async () => {
            const { data } = await api.get<{ status: string; data: Article[] }>("/article");
            if (data.status !== "success") throw new Error("Failed to load articles");
            return data.data;
        },
    });
};

export const useGenerateArticle = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async ({ prompt, length }: GenerateArticleBody) => {
            const { data } = await api.post<{ status: string; data: string, message: string }>("/article", {
                prompt,
                length,
            });
            if (data.status !== "success") throw new Error(data.message || "Generation failed");
            return data.data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["articles"] });
        },

    });
};

export const useDeleteArticle = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (id: string) => {
            const { data } = await api.delete(`/article/${id}`);
            if (data.status !== "success") throw new Error("Delete failed");
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["articles"] });
            toast.success("Article deleted");
        },
        onError: () => {
            toast.error("Failed to delete article");
        },
    });
};