import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import api from "../api/axiosInstance";
import type { GenerateImageBody, UserImage } from "../types";

export const useGetUserImages = () => {
    return useQuery<UserImage[]>({
        queryKey: ["user-images"],
        queryFn: async () => {
            const { data } = await api.get<{ status: string; data: UserImage[] }>("/image");
            if (data.status !== "success") throw new Error("Failed to load images");
            return data.data;
        },
    });
};

export const useGenerateImage = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async ({ prompt, publish }: GenerateImageBody) => {
            const { data } = await api.post<{ status: string; data: { content: string }, message: string }>("/image", {
                prompt,
                publish,
            });
            if (data.status !== "success") {
                throw new Error(data.message || "Failed to generate image");
            }
            return data.data.content;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["user-images"] });
        },
    });
};