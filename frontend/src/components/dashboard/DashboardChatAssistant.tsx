import React, { useState, useRef, useEffect } from "react";
import { Bot, Sparkles, X, Trash2, LayoutDashboard, Loader2 } from "lucide-react";
import { AIResponseParser } from "ai-response-parser";
import { useUser } from "@clerk/clerk-react";
import { DashboardBotForm } from "./DashboardBotForm";

const DashboardAssistant: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [isTyping, setIsTyping] = useState(false); // New Loading State
    const [messages, setMessages] = useState<{ role: "user" | "assistant"; content: string }[]>([]);
    const scrollRef = useRef<HTMLDivElement>(null);
    const { user } = useUser();

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
        }
    }, [messages, isTyping]); // Scroll when typing starts

    const handleSendMessage = (message: { role: "user" | "assistant"; content: string }) => {
        setMessages((prev) => [...prev, message]);
    };

    return (
        <div className="fixed bottom-6 right-6 z-50">
            {!isOpen && (
                <button
                    onClick={() => setIsOpen(true)}
                    className="flex items-center gap-2 px-5 py-3 bg-slate-900 text-white rounded-full shadow-2xl hover:bg-black transition-all hover:scale-105 border border-slate-700"
                >
                    <LayoutDashboard className="w-5 h-5 text-indigo-400" />
                    <span className="font-semibold text-sm">Personal Assistant</span>
                </button>

            )}

            <div className={`
                fixed top-0 right-0 h-full bg-white border-l border-slate-200 shadow-2xl transition-all duration-300 ease-in-out flex flex-col
                ${isOpen ? "w-full md:w-[450px]" : "translate-x-full"}
            `}>
                {/* Header */}
                <div className="p-4 border-b flex justify-between items-center bg-white">
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-indigo-600 rounded-lg">
                            <Bot className="w-5 h-5 text-white" />
                        </div>
                        <div>
                            <h3 className="text-sm font-bold text-slate-900">Account Assistant(Beta)</h3>
                            <div className="flex items-center gap-1.5">
                                <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                                <p className="text-[10px] text-slate-500 font-bold uppercase tracking-tight">Live Context</p>
                            </div>
                        </div>
                    </div>
                    <div className="flex gap-1">
                        <button onClick={() => setMessages([])} className="p-2 hover:bg-slate-100 rounded-md transition-colors">
                            <Trash2 className="w-4 h-4 text-slate-400" />
                        </button>
                        <button onClick={() => setIsOpen(false)} className="p-2 hover:bg-slate-100 rounded-md transition-colors">
                            <X className="w-5 h-5 text-slate-600" />
                        </button>
                    </div>
                </div>

                {/* Chat Area */}
                <div ref={scrollRef} className="flex-1 overflow-y-auto bg-slate-50/50 scrollbar-hide">
                    {messages.length === 0 ? (
                        <div className="h-full flex flex-col items-center justify-center p-8 text-center">
                            <div className="w-16 h-16 bg-indigo-50 rounded-2xl flex items-center justify-center mb-4 animate-bounce-slow">
                                <Sparkles className="w-8 h-8 text-indigo-500" />
                            </div>
                            <h4 className="text-xl font-bold text-slate-900">
                                Hi, {user?.firstName || "there"}! 👋
                            </h4>
                            <p className="text-slate-500 text-sm mt-2 max-w-[280px]">
                                Ask me anything about your recent activity or dashboard metrics.
                            </p>

                        </div>
                    ) : (
                        <div className="p-4 space-y-4">
                            {messages.map((m, i) => (
                                <div key={i} className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}>
                                    <div className={`max-w-[85%] rounded-2xl p-3 shadow-sm ${m.role === "user"
                                        ? "bg-indigo-600 text-white rounded-tr-none"
                                        : "bg-white border border-slate-200 text-slate-800 rounded-tl-none"
                                        }`}>
                                        <AIResponseParser content={m.content} textColor={m.role === "user" ? "text-white" : "text-slate-800"} />
                                    </div>
                                </div>
                            ))}

                            {/* ANALYZING STATE */}
                            {isTyping && (
                                <div className="flex justify-start">
                                    <div className="bg-white border border-slate-200 text-slate-500 rounded-2xl rounded-tl-none p-3 shadow-sm flex items-center gap-3">
                                        <Loader2 className="w-4 h-4 animate-spin text-indigo-500" />
                                        <span className="text-xs font-medium animate-pulse">Analyzing your database...</span>
                                    </div>
                                </div>
                            )}
                        </div>
                    )}
                </div>

                <DashboardBotForm
                    handleSendMessage={handleSendMessage}
                    setIsTyping={setIsTyping}
                />
            </div>
        </div>
    );
};



export default DashboardAssistant;