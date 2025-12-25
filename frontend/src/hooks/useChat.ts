// src/hooks/useChat.ts
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import api from "../api/axiosInstance";

const getSessionId = () => {
    let sessionId = localStorage.getItem("chat_session_id");
    if (!sessionId) {
        sessionId = crypto.randomUUID();
        localStorage.setItem("chat_session_id", sessionId);
    }
    return sessionId;
};

export const useChat = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (message: string) => {
            const sessionId = getSessionId();

            const { data } = await api.post<{
                status: string;
                data: { reply: string; sessionId: string };
            }>("/chat", {
                message,
                sessionId,
            });


            if (data.status !== "success") {
                throw new Error("Chat failed");
            }

            // Keep backend session in sync (important)
            if (data.data.sessionId) {
                localStorage.setItem(
                    "chat_session_id",
                    data.data.sessionId
                );
            }


            return data.data.reply;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["chat"] });
        },
    });
};

export const useChatHistory = (sessionId: string) => {
    return useQuery({
        queryKey: ["chat", sessionId],
        queryFn: async () => {
            const { data } = await api.get(`/chat${sessionId}`);
            return data.data;
        },
        enabled: !!sessionId,
    });
};
