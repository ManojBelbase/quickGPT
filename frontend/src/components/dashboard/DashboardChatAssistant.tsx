import React, { useState, useRef, useEffect } from "react";
import { Bot, X, Trash2, LayoutDashboard, MessageSquarePlus, ChevronRight } from "lucide-react";
import { AIResponseParser } from "ai-response-parser";
import { useUser } from "@clerk/clerk-react";
import { useDashboardBot } from "../../hooks/useDashboardBot";
import { DashboardBotForm } from "./DashboardBotForm";

const DashboardAssistant: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [isTyping, setIsTyping] = useState(false);
    const [messages, setMessages] = useState<{ role: "user" | "assistant"; content: string }[]>([]);

    const scrollRef = useRef<HTMLDivElement>(null);
    const { user } = useUser();
    const { mutateAsync: sendMessage } = useDashboardBot();

    const suggestions = [
        { label: "Check Usage", q: "How many creations have I made?", icon: "📊" },
        { label: "Get Insights", q: "Give me insights on my dashboard", icon: "💡" },
        { label: "Summarize", q: "Summarize my last blog", icon: "📝" },
        { label: "Capabilities", q: "What can you do?", icon: "🤖" },
    ];

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
        }
    }, [messages, isTyping]);

    const handleAction = async (text: string) => {
        if (!text.trim() || isTyping) return;
        setMessages((prev) => [...prev, { role: "user", content: text }]);
        setIsTyping(true);

        try {
            const reply = await sendMessage({
                message: text,
                userFullName: user?.fullName || "User",
            });
            setMessages((prev) => [...prev, { role: "assistant", content: reply }]);
        } catch (error) {
            setMessages((prev) => [...prev, { role: "assistant", content: "Error processing request." }]);
        } finally {
            setIsTyping(false);
        }
    };

    return (
        <div className="fixed bottom-6 right-6 z-50">
            {!isOpen && (
                <button
                    onClick={() => setIsOpen(true)}
                    className="group flex items-center cursor-pointer gap-3 px-6 py-3.5 bg-slate-900 text-white rounded-full shadow-2xl hover:bg-black transition-all hover:scale-105 border border-slate-700"
                >
                    <div className="relative">
                        <LayoutDashboard className="w-5 h-5 text-indigo-400" />
                        <span className="absolute -top-1 -right-1 w-2 h-2 bg-indigo-500 rounded-full animate-ping"></span>
                    </div>
                    <span className="font-semibold text-sm tracking-wide">Assistant(Beta)</span>
                </button>
            )}

            <div className={`
                fixed top-0 right-0 h-full bg-slate-50 border-l border-slate-200 shadow-2xl transition-all duration-500 ease-in-out flex flex-col
                ${isOpen ? "w-full md:w-[420px]" : "translate-x-full"}
            `}>
                {/* Header - Glassmorphism style */}
                <div className="px-5 py-4 border-b border-gray-200 flex justify-between items-center bg-white/80 backdrop-blur-md sticky top-0 z-10">
                    <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center shadow-lg shadow-indigo-200">
                            <Bot className="w-5 h-5 text-white" />
                        </div>
                        <div>
                            <h3 className="text-sm font-bold text-slate-900 leading-none">Assistant(Beta)</h3>
                            <span className="text-[10px] text-green-600 font-bold uppercase tracking-widest flex items-center gap-1 mt-1">
                                <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></span>
                                Online Context
                            </span>
                        </div>
                    </div>
                    <div className="flex gap-x-2">
                        <button onClick={() => setMessages([])} className="p-2 hover:bg-slate-100 rounded-lg transition-colors group" title="Clear Chat">
                            <Trash2 className="w-4 h-4 text-slate-400 group-hover:text-red-500" />
                        </button>
                        <button onClick={() => setIsOpen(false)} className="p-2 hover:bg-slate-100 rounded-lg transition-colors group">
                            <X className="w-4 h-4 text-slate-500 group-hover:text-slate-900" />
                        </button>
                    </div>
                </div>

                {/* Chat Area */}
                <div ref={scrollRef} className="flex-1 overflow-y-auto p-5 scrollbar-hide">
                    {messages.length === 0 ? (
                        <div className="h-full flex flex-col justify-center">
                            <div className="mb-8">
                                <h4 className="text-2xl font-extrabold text-slate-900 mb-2">
                                    Hello, {user?.firstName || "there"}
                                </h4>
                                <p className="text-slate-500 text-sm">How can I help you manage your dashboard today?</p>
                            </div>

                            <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-4">Quick Actions</p>
                            <div className="grid grid-cols-1 gap-3">
                                {suggestions.map((item, i) => (
                                    <button
                                        key={i}
                                        onClick={() => handleAction(item.q)}
                                        className="flex cursor-pointer items-center justify-between p-3 bg-white border border-slate-200 rounded-lg text-left hover:border-indigo-500 hover:shadow-md hover:shadow-indigo-50 transition-all group"
                                    >
                                        <div className="flex items-center gap-3">
                                            <span className="text-base">{item.icon}</span>
                                            <div>
                                                <p className="text-sm font-semibold text-slate-800">{item.label}</p>
                                                <p className="text-xs text-slate-500">{item.q.substring(0, 30)}...</p>
                                            </div>
                                        </div>
                                        <ChevronRight className="w-4 h-4 text-slate-300 group-hover:text-indigo-500 group-hover:translate-x-1 transition-all" />
                                    </button>
                                ))}
                            </div>
                        </div>
                    ) : (
                        <div className="space-y-6">
                            {messages.map((m, i) => (
                                <div key={i} className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}>
                                    <div className={`max-w-[88%] rounded-lg px-4 py-3 ${m.role === "user"
                                        ? "bg-purple-600 text-white shadow-lg shadow-slate-200 rounded-tr-none"
                                        : "bg-white border border-slate-200 text-black shadow-sm rounded-tl-none"
                                        }`}>
                                        <AIResponseParser content={m.content} textColor={m.role === "user" ? "text-slate-100" : "text-slate-800"} />
                                    </div>
                                </div>
                            ))}

                            {isTyping && (
                                <div className="flex justify-start">
                                    <div className="bg-white border border-slate-200 text-slate-500 rounded-2xl rounded-tl-none p-4 shadow-sm flex items-center gap-3">
                                        <div className="flex gap-1">
                                            <span className="w-1.5 h-1.5 bg-indigo-500 rounded-full animate-bounce"></span>
                                            <span className="w-1.5 h-1.5 bg-indigo-500 rounded-full animate-bounce [animation-delay:0.2s]"></span>
                                            <span className="w-1.5 h-1.5 bg-indigo-500 rounded-full animate-bounce [animation-delay:0.4s]"></span>
                                        </div>
                                        <span className="text-xs font-normal text-slate-400">Analyzing your content...</span>
                                    </div>
                                </div>
                            )}
                        </div>
                    )}
                </div>

                {/* Bottom Bar: Horizontal scrollable suggestions only when messages exist */}
                {messages.length > 0 && !isTyping && (
                    <div className="px-5 py-2 flex gap-1.5 overflow-x-auto no-scrollbar whitespace-nowrap">
                        {suggestions.map((item, i) => (
                            <button
                                key={i}
                                onClick={() => handleAction(item.q)}
                                className="inline-flex cursor-pointer items-center gap-2 px-2 py-1.5 bg-white border border-slate-200 rounded-full text-[11px] font-semibold hover:border-indigo-400 hover:text-indigo-600 transition-all"
                            >
                                <MessageSquarePlus className="w-3 h-3" />
                                {item.label}
                            </button>
                        ))}
                    </div>
                )}

                <DashboardBotForm onSend={handleAction} isPending={isTyping} />
            </div>
        </div>
    );
};

export default DashboardAssistant;