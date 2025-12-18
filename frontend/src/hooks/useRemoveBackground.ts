import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import api from "../api/axiosInstance";
import type { RemovedImage } from "../types";

export const useGetRemovedImages = () => {
    return useQuery<RemovedImage[]>({
        queryKey: ["removed-background-images"],
        queryFn: async () => {
            const { data } = await api.get<{ status: string; data: RemovedImage[] }>("/remove-background");
            if (data.status !== "success") throw new Error("Failed to load processed images");
            return data.data;
        },
    });
};

export const useRemoveBackground = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (file: File) => {
            const formData = new FormData();
            formData.append("image", file);

            const { data } = await api.post<{ status: string; data: { content: string }, message: string }>("/remove-background", formData, {
                headers: { "Content-Type": "multipart/form-data" },
            });

            if (data.status !== "success") {
                throw new Error(data.message || "Failed to remove background");
            }
            return data.data.content;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["removed-background-images"] });
        },
    });
};