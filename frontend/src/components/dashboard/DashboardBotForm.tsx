import { useState } from "react";
import { useDashboardBot } from "../../hooks/useDashboardBot";
import { useUser } from "@clerk/clerk-react";
import { Send } from "lucide-react";

interface DashboardBotFormProps {
    handleSendMessage: (message: { role: "user" | "assistant"; content: string }) => void;
    setIsTyping: (val: boolean) => void; // Added this prop
}

export const DashboardBotForm: React.FC<DashboardBotFormProps> = ({ handleSendMessage, setIsTyping }) => {
    const [input, setInput] = useState("");
    const { mutateAsync: sendMessage, isPending } = useDashboardBot();
    const { user } = useUser();

    const handleSend = async () => {
        const text = input.trim();
        if (!text || isPending) return;

        handleSendMessage({ role: "user", content: text });
        setInput("");
        setIsTyping(true);

        try {
            const reply = await sendMessage({
                message: text,
                userFullName: user?.fullName || "User",
            });
            handleSendMessage({ role: "assistant", content: reply });
        } catch (error: any) {
            handleSendMessage({
                role: "assistant",
                content: "Sorry, there was an error processing your request. Please try again later.",
            });
        } finally {
            setIsTyping(false);
        }
    };

    return (
        <div className="p-4 bg-white border-t">
            <form onSubmit={(e) => { e.preventDefault(); handleSend(); }} className="relative">
                <input
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Ask AI about your data..."
                    className="w-full pl-4 pr-12 py-3.5 bg-slate-100 rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white transition-all"
                />
                <button
                    disabled={isPending || !input.trim()}
                    className="absolute right-1.5 top-1.5 p-2 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 disabled:opacity-40 transition-colors"
                >
                    <Send className="w-4 h-4" />
                </button>
            </form>
        </div>
    );
};