import React, { useState, useEffect, useRef } from "react";
import { Send, Bot, Sparkles, RotateCcw, X } from "lucide-react";
import { useChat } from "../../hooks/useChat";
import { Icon } from "@iconify/react";
import { AIResponseParser } from "ai-response-parser";

const ChatAssistant: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState<{ role: "user" | "assistant"; content: string }[]>([]);
    const [input, setInput] = useState("");
    const { mutateAsync: sendMessage, isPending } = useChat();
    const scrollRef = useRef<HTMLDivElement>(null);

    // Auto-scroll to latest message
    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [messages, isPending, isOpen]);

    const handleSend = async () => {
        if (!input.trim() || isPending) return;
        const userMessage = input.trim();
        setMessages((prev) => [...prev, { role: "user", content: userMessage }]);
        setInput("");

        try {
            const reply = await sendMessage(userMessage);
            console.log(reply, "reply")
            setMessages((prev) => [...prev, { role: "assistant", content: reply }]);
        } catch (error: any) {
            console.log(error, "ee")

            setMessages((prev) => [...prev, {
                role: "assistant", content: `${error.status === 429 ? error.response?.data?.message || "Rate limit exceeded. Please try again later."
                    : "Oops! Something went wrong 🥲. Try again later or [contact the developer](mailto:manojbelbase56@gmail.com)."}`
            }]
            );
        }
    };

    return (
        <div className="fixed bottom-4 right-4 md:bottom-6 md:right-6 z-9999 flex flex-col items-end">

            {/* CHAT WINDOW */}
            {isOpen && (
                <div className={`
                    mb-4 flex flex-col overflow-hidden bg-white border border-slate-200 shadow-2xl transition-all duration-300 animate-in slide-in-from-bottom-5
                    /* Mobile: Full width minus side margins, height limited to 70% of screen */
                    w-[calc(100vw-32px)] h-[500px] max-h-[75vh] rounded-2xl
                    /* Desktop: Fixed 400px width */
                    sm:w-[400px] sm:h-[600px]   max-height: none;
                `}>

                    {/* HEADER */}
                    <header className="flex items-center justify-between px-5 py-4 bg-purple-600 text-white shrink-0">
                        <div className="flex items-center gap-3">
                            <div className="relative w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center border border-purple-400">
                                <div className="bg-[#9810fa] p-1.5 rounded-md border border-purple-300">
                                    <Icon icon="lucide:zap" className="text-white text-xl" />
                                </div>
                            </div>
                            <div>
                                <h2 className="text-sm font-bold leading-tight">QuickGPT AI</h2>
                                <div className="flex items-center gap-1.5">
                                    <span className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse"></span>
                                    <p className="text-[10px] text-purple-100 uppercase tracking-wider font-medium">Online</p>
                                </div>
                            </div>
                        </div>
                        <div className="flex items-center gap-1">
                            <button
                                onClick={() => setMessages([])}
                                className="p-2 hover:bg-white/10 rounded-full transition-colors"
                            >
                                <RotateCcw className="w-4 h-4 text-purple-100" />
                            </button>
                            <button
                                onClick={() => setIsOpen(false)}
                                className="p-2 hover:bg-white/10 rounded-full transition-colors"
                            >
                                <X className="w-4 h-4 text-white" />
                            </button>
                        </div>
                    </header>

                    {/* CHAT MESSAGES */}
                    <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50">
                        {messages.length === 0 && (
                            <div className="h-full flex flex-col items-center justify-center p-6 space-y-6">
                                {/* Animated Logo / Icon Section */}
                                <div className="relative group">
                                    {/* Decorative background glow */}
                                    <div className="absolute -inset-4 bg-purple-100/50 rounded-full blur-2xl group-hover:bg-purple-200/50 transition-colors duration-500"></div>

                                    <div className="relative w-20 h-20 bg-white border border-purple-100 rounded-3xl flex items-center justify-center shadow-xl shadow-purple-100 rotate-3 group-hover:rotate-0 transition-transform duration-500">
                                        <Bot className="w-10 h-10 text-purple-600" />
                                        {/* Small sparkle overlay */}
                                        <Sparkles className="absolute -top-2 -right-2 w-6 h-6 text-yellow-400 animate-pulse" />
                                    </div>
                                </div>

                                {/* Text Context */}
                                <div className="text-center space-y-2">
                                    <h3 className="text-slate-800 font-bold text-lg tracking-tight">
                                        Meet <span className="text-purple-600">QuickGPT AI</span>
                                    </h3>
                                    <p className="text-slate-500 text-xs leading-relaxed max-w-[220px] mx-auto">
                                        Your creative partner for content, code, and smarter workflows.
                                    </p>
                                </div>

                                {/* Meaningful Quick Actions */}
                                <div className="w-full space-y-2 pt-2">
                                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest text-center mb-3">
                                        Suggested starts
                                    </p>

                                    {[
                                        { label: "How do I use AI tools?", icon: "🚀" },
                                        { label: "Generate social media captions", icon: "💬" },
                                        { label: "What can you do for me?", icon: "🤖" },
                                    ].map((action, idx) => (
                                        <button
                                            key={idx}
                                            onClick={() => {
                                                setInput(action.label);
                                                // Optional: auto-trigger handleSend() here if you want it instant
                                            }}
                                            className="w-full cursor-pointer flex items-center justify-between p-3 bg-white border border-slate-200 rounded-md text-left text-xs font-medium text-slate-600 hover:border-purple-400 hover:bg-purple-50 hover:text-purple-700 transition-all group"
                                        >
                                            <span className="flex items-center gap-3">
                                                <span className="text-sm">{action.icon}</span>
                                                {action.label}
                                            </span>
                                            <Send className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity text-purple-500" />
                                        </button>
                                    ))}
                                </div>
                            </div>
                        )}

                        {messages.map((msg, i) => (
                            <div key={i} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                                <div className={`
                                    max-w-[85%] px-3.5 py-2 text-sm shadow-sm
                                    ${msg.role === "user"
                                        ? "bg-purple-600 text-white rounded-2xl rounded-tr-none"
                                        : "  border text-black border-gray-200 rounded-2xl rounded-tl-none"
                                    }
                                `}>
                                    <AIResponseParser content={msg.content} textColor="" />
                                </div>
                            </div>
                        ))}

                        {isPending && (
                            <div className="flex justify-start animate-in fade-in slide-in-from-left-2 duration-300">
                                <div className="relative group">
                                    <div className="relative bg-white border border-slate-200 px-4 py-3 rounded-2xl rounded-tl-none flex items-center gap-3 shadow-sm">
                                        {/* Notion-style Rotating Sparkle */}
                                        <div className="relative flex h-4 w-4">
                                            <Sparkles className="w-4 h-4 text-purple-600 animate-[spin_3s_linear_infinite]" />
                                        </div>

                                        {/* Shimmering Text */}
                                        <span className="text-sm font-medium bg-linear-to-r from-slate-400 via-slate-700 to-slate-400 animate-[shimmer_2s_linear_infinite] bg-clip-text text-transparent">
                                            QuickGPT AI is thinking...
                                        </span>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* INPUT AREA */}
                    <div className="p-4 bg-white border-t border-slate-100 shrink-0">
                        <form
                            onSubmit={(e) => { e.preventDefault(); handleSend(); }}
                            className="relative flex items-center gap-2"
                        >
                            <input
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                placeholder="Type a message..."
                                className="w-full py-3 px-4 bg-slate-100 border-none rounded-xl  text-sm transition-all"
                            />
                            <button
                                type="submit"
                                disabled={!input.trim() || isPending}
                                className="shrink-0 p-3 cursor-pointer bg-purple-600 text-white rounded-xl hover:bg-purple-700 active:scale-90 transition-all disabled:opacity-30 shadow-lg"
                            >
                                <Send className="w-4 h-4" />
                            </button>
                        </form>
                    </div>
                </div>
            )}

            {/* FLOATING ACTION BUTTON */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className={`
                    flex items-center cursor-pointer justify-center w-14 h-14 rounded-full shadow-2xl transition-all duration-500 transform 
                    ${isOpen ? "bg-slate-900 rotate-360deg scale-90" : "bg-purple-600 hover:bg-purple-700 hover:scale-110 active:scale-95"}
                `}
            >
                {isOpen ? (
                    <X className="w-6 h-6 text-white" />
                ) : (
                    <div className="relative">
                        <Bot className="w-8 h-8 text-white text-xl" />
                        <span className="absolute -top-1 -right-1 flex h-3 w-3">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500 border-2 border-purple-600"></span>
                        </span>
                    </div>
                )}
            </button>
        </div>
    );
};

export default ChatAssistant;