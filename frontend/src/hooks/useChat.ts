// src/hooks/useChat.ts
import { useMutation } from "@tanstack/react-query";
import api from "../api/axiosInstance";

export const useChat = () => {
    return useMutation({
        mutationFn: async (message: string) => {
            const { data } = await api.post<{ status: string; data: { reply: string } }>("/chat", { message });
            if (data.status !== "success") throw new Error("Chat failed");
            return data.data.reply;
        },
    });
};