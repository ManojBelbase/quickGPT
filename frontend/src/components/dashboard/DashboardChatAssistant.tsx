import React, { useState, useRef } from "react";
import { Send, Bot, Sparkles, X, Trash2, LayoutDashboard } from "lucide-react";
import { useDashboardBot } from "../../hooks/useDashboardBot"; // New Hook
import { AIResponseParser } from "ai-response-parser";

const DashboardAssistant: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState<{ role: "user" | "assistant"; content: string }[]>([]);
    const [input, setInput] = useState("");

    // Using the specific Dashboard Bot hook
    const { mutateAsync: sendMessage, isPending } = useDashboardBot();
    const scrollRef = useRef<HTMLDivElement>(null);

    const handleSend = async (customMessage?: string) => {
        const text = customMessage || input.trim();
        if (!text || isPending) return;

        setMessages((prev) => [...prev, { role: "user", content: text }]);
        setInput("");

        try {
            const reply = await sendMessage(text);
            // The hook now returns the string directly from data.data
            setMessages((prev) => [...prev, { role: "assistant", content: reply }]);
        } catch (error: any) {
            setMessages((prev) => [...prev, {
                role: "assistant",
                content: "I couldn't access your dashboard data right now. Please try again."
            }]);
        }
    };

    return (
        <div className="fixed bottom-6 right-6 z-50">
            {/* Toggle Button */}
            {!isOpen && (
                <button
                    onClick={() => setIsOpen(true)}
                    className="flex items-center gap-2 px-5 py-3 bg-slate-900 text-white rounded-full shadow-2xl hover:bg-black transition-all hover:scale-105 border border-slate-700"
                >
                    <LayoutDashboard className="w-5 h-5 text-indigo-400" />
                    <span className="font-semibold text-sm">Dashboard AI</span>
                </button>
            )}

            {/* Sidebar UI */}
            <div className={`
                fixed top-0 right-0 h-full bg-white border-l border-slate-200 shadow-2xl transition-all duration-300 ease-in-out flex flex-col
                ${isOpen ? 'w-full md:w-[450px]' : 'translate-x-full'}
            `}>
                {/* Header */}
                <div className="p-4 border-b flex justify-between items-center bg-slate-50">
                    <div className="flex items-center gap-2">
                        <div className="p-2 bg-indigo-600 rounded-lg">
                            <Bot className="w-5 h-5 text-white" />
                        </div>
                        <div>
                            <h3 className="text-sm font-bold text-slate-800">Account Assistant(Beta)</h3>
                            <p className="text-[10px] text-green-600 font-bold uppercase tracking-widest">Live Context</p>
                        </div>
                    </div>
                    <div className="flex gap-2">
                        <button onClick={() => setMessages([])} className="p-2 hover:bg-slate-200 rounded-md"><Trash2 className="w-4 h-4 text-slate-400" /></button>
                        <button onClick={() => setIsOpen(false)} className="p-2 hover:bg-slate-200 rounded-md"><X className="w-5 h-5" /></button>
                    </div>
                </div>

                {/* Chat Area */}
                <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-4">
                    {messages.length === 0 && (
                        <div className="mt-10 text-center px-6">
                            <Sparkles className="w-10 h-10 text-indigo-500 mx-auto mb-4" />
                            <h4 className="text-slate-800 font-semibold text-lg">Analyze your creations</h4>
                            <p className="text-slate-500 text-sm mt-2">
                                I have access to your last 50 generations. Ask me to summarize your style, find specific content, or suggest improvements.
                            </p>
                            <div className="mt-8 space-y-2">
                                <button onClick={() => handleSend("What have I been working on lately?")} className="w-full p-3 text-xs text-left border rounded-xl hover:bg-slate-50">"What have I been working on lately?"</button>
                                <button onClick={() => handleSend("Summarize my writing style based on my history")} className="w-full p-3 text-xs text-left border rounded-xl hover:bg-slate-50">"Summarize my writing style"</button>
                            </div>
                        </div>
                    )}

                    {messages.map((m, i) => (
                        <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                            <div className={`max-w-[85%] p-3 rounded-2xl text-sm ${m.role === 'user' ? 'bg-indigo-600 text-white' : 'bg-slate-100 border text-slate-800'}`}>
                                <AIResponseParser content={m.content} />
                            </div>
                        </div>
                    ))}

                    {isPending && (
                        <div className="flex justify-start">
                            <div className="bg-slate-100 p-3 rounded-2xl animate-pulse text-xs font-medium text-slate-500">
                                Reading your database...
                            </div>
                        </div>
                    )}
                </div>

                {/* Input */}
                <div className="p-4 border-t bg-white">
                    <form onSubmit={(e) => { e.preventDefault(); handleSend(); }} className="flex gap-2">
                        <input
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            placeholder="Ask about your content..."
                            className="flex-1 p-3 bg-slate-100 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        />
                        <button disabled={isPending || !input.trim()} className="p-3 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 disabled:opacity-50">
                            <Send className="w-4 h-4" />
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default DashboardAssistant;