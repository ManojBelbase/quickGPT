import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import api from "../api/axiosInstance";
import toast from "react-hot-toast";
import type { UserImage } from "../types";

export const usePublishedImages = () => {
    return useQuery<UserImage[]>({
        queryKey: ["community-images"],
        queryFn: async () => {
            const { data } = await api.get<{ status: string; data: UserImage[] }>("/image/published");
            if (data.status !== "success") throw new Error("Failed to load community gallery");
            return data.data;
        },
        staleTime: 1000 * 60 * 2,
    });
};

export const useToggleLike = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (imageId: string) => {
            const { data } = await api.post("/image/toggle-like", { id: imageId });
            if (data.status !== "success") throw new Error(data.message || "Failed to toggle like");
            return data;
        },
        onMutate: async (imageId) => {
            await queryClient.cancelQueries({ queryKey: ["community-images"] });

            const previousImages = queryClient.getQueryData<UserImage[]>(["community-images"]);

            queryClient.setQueryData<UserImage[]>(["community-images"], (old = []) =>
                old.map((img) =>
                    img.id === imageId
                        ? {
                            ...img,
                            likes: img.likes.includes(currentUserId)
                                ? img.likes.filter((id: any) => id !== currentUserId)
                                : [...img.likes, currentUserId],
                        }
                        : img
                )
            );

            return { previousImages };
        },
        onError: (context: any) => {
            queryClient.setQueryData(["community-images"], context?.previousImages);
            toast.error("Failed to update like");
        },
        onSettled: () => {
            queryClient.invalidateQueries({ queryKey: ["community-images"] });
        },
        onSuccess: (data) => {
            const isLiked = data.message === "Liked";
            toast.success(data.message, {
                icon: isLiked ? "❤️" : "💔",
                style: {
                    borderRadius: "12px",
                    background: "#333",
                    color: "#fff",
                },
            });
        },
    });
};

let currentUserId = "";
export const setCurrentUserIdForLike = (id: string) => {
    currentUserId = id;
};