import { useState } from "react";
import { Send } from "lucide-react";

interface DashboardBotFormProps {
    onSend: (message: string) => void;
    isPending: boolean;
}

export const DashboardBotForm: React.FC<DashboardBotFormProps> = ({ onSend, isPending }) => {
    const [input, setInput] = useState("");

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const text = input.trim();
        if (!text || isPending) return;

        onSend(text);
        setInput(""); // Clear the input field after sending
    };

    return (
        <div className="p-4 bg-white border-t">
            <form onSubmit={handleSubmit} className="relative">
                <input
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Ask AI about your data..."
                    disabled={isPending}
                    className="w-full pl-4 pr-12 py-3.5 bg-slate-100 rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white transition-all disabled:opacity-50"
                />
                <button
                    type="submit"
                    disabled={isPending || !input.trim()}
                    className="absolute right-1.5 top-1.5 p-2 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 disabled:opacity-40 transition-colors"
                >
                    <Send className="w-4 h-4" />
                </button>
            </form>
        </div>
    );
};