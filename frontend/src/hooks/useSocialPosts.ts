// src/hooks/useSocialPosts.ts
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import api from "../api/axiosInstance";
import type { SocialPostBody, UserSocialPost } from "../types"; // Update types accordingly

// Fetch all user's generated social posts (for the gallery/list)
export const useGetUserSocialPosts = () => {
    return useQuery<UserSocialPost[]>({
        queryKey: ["user-social-posts"],
        queryFn: async () => {
            const { data } = await api.get<{ status: string; data: UserSocialPost[] }>("/social-post");
            if (data.status !== "success") throw new Error("Failed to load social posts");
            return data.data;
        },
    });
};

// Generate a new social post
export const useGenerateSocialPost = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async ({
            prompt,
            platform,
            tone,
            length,
            includeHashtags,
        }: SocialPostBody) => {
            const { data } = await api.post<{
                status: string;
                data: string;
                message?: string;
            }>("/social-post", {
                prompt,
                platform,
                tone,
                length,
                includeHashtags,
            });

            if (data.status !== "success") {
                throw new Error(data.message || "Failed to generate social post");
            }

            return data.data; // return the generated content string
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["user-social-posts"] });
        },
        onError: (error: any) => {
            console.error("Generation error:", error);
        },
    });
};

// Optional: Delete a specific social post (if you have delete functionality)
export const useDeleteSocialPost = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (id: string) => {
            const { data } = await api.delete(`/social-post/${id}`);
            if (data.status !== "success") {
                throw new Error("Failed to delete social post");
            }
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["user-social-posts"] });
        },
    });
};