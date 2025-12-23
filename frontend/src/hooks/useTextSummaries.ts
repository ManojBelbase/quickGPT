// src/hooks/useTextSummaries.ts
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import api from "../api/axiosInstance";
import type { TextSummary, GenerateSummaryBody } from "../types";

export const useGetSummaries = () => {
    return useQuery<TextSummary[]>({
        queryKey: ["text-summaries"],
        queryFn: async () => {
            const { data } = await api.get<{ status: string; data: TextSummary[] }>("/text-summarizer");
            if (data.status !== "success") throw new Error("Failed to load summaries");
            return data.data;
        },
    });
};

export const useGenerateSummary = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async ({ text, length, style }: GenerateSummaryBody) => {
            const { data } = await api.post<{ status: string; data: string }>("/text-summarizer", {
                text,
                length,
                style,
            });
            if (data.status !== "success") throw new Error("Generation failed");
            return data.data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["text-summaries"] });
        },
    });
};

export const useDeleteSummary = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (id: string) => {
            const { data } = await api.delete(`/text-summarizer/${id}`);
            if (data.status !== "success") throw new Error("Delete failed");
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["text-summaries"] });
        },
    });
};