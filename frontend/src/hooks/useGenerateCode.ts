// src/hooks/useCodes.ts
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import api from "../api/axiosInstance";
import type { GeneratedCode, GenerateCodeBody } from "../types";

export const useGetCodes = () => {
    return useQuery<GeneratedCode[]>({
        queryKey: ["codes"],
        queryFn: async () => {
            const { data } = await api.get<{ status: string; data: GeneratedCode[] }>("/code-generator");
            if (data.status !== "success") throw new Error("Failed to load codes");
            return data.data;
        },
    });
};

export const useGenerateCode = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async ({ prompt, language }: GenerateCodeBody) => {
            const { data } = await api.post<{ status: string; data: string }>("/code-generator", { prompt, language });
            if (data.status !== "success") throw new Error("Generation failed");
            return data.data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["codes"] });
        },
    });
};

export const useDeleteCode = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (id: string) => {
            const { data } = await api.delete(`/code-generator/${id}`);
            if (data.status !== "success") throw new Error("Delete failed");
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["codes"] });
        },
    });
};