import React from "react";
import { useUser } from "@clerk/clerk-react";
import { useNavigate } from "react-router-dom";
import { useDashboard } from "../hooks/useDashboard";
import { tools } from "../const/toolsData";
import {
    ArrowUpRight,
    BarChart,
    CheckCircle2,
    Sparkles,
    Zap,
    Loader2,
} from "lucide-react";

const Dashboard: React.FC = () => {
    const { user, isLoaded } = useUser();
    const navigate = useNavigate();

    const {
        data: dashboardData,
        isLoading: dashboardLoading,
        isError,
    } = useDashboard();

    if (!isLoaded || dashboardLoading) {
        return (
            <div className="min-h-screen bg-[#FDFDFF] flex items-center justify-center px-4">
                <div className="flex flex-col items-center gap-3">
                    <Loader2 className="w-8 h-8 sm:w-10 sm:h-10 animate-spin text-purple-600" />
                    <p className="text-sm sm:text-base text-slate-600 font-medium">
                        Loading your dashboard...
                    </p>
                </div>
            </div>
        );
    }

    if (isError || !dashboardData) {
        return (
            <div className="min-h-screen bg-[#FDFDFF] flex items-center justify-center px-4">
                <div className="text-center">
                    <p className="text-red-600 font-medium mb-2 text-sm sm:text-base">
                        Failed to load dashboard
                    </p>
                    <button
                        onClick={() => window.location.reload()}
                        className="text-indigo-600 underline text-xs sm:text-sm"
                    >
                        Try again
                    </button>
                </div>
            </div>
        );
    }

    const isPremium = dashboardData.plan === "premium";

    return (
        <div className="min-h-screen bg-[#FDFDFF] text-slate-900 font-sans px-3 sm:px-0">
            <div className="space-y-2 sm:space-y-2">

                {/* HEADER */}
                <header className="relative overflow-hidden bg-white border border-gray-200 
                p-5 sm:p-6 md:p-8 rounded-2xl shadow-lgq 
                flex flex-col md:flex-row justify-between items-center gap-3 sm:gap-6">

                    <div className="z-10 text-center md:text-left">
                        <h1 className="text-xl sm:text-3xl md:text-4xl font-black tracking-tight 
                        bg-linear-to-r from-slate-900 via-slate-700 to-slate-900 
                        bg-clip-text text-transparent">
                            Dashboard
                        </h1>
                        <p className="text-xs sm:text-sm text-slate-500 font-medium mt-1">
                            Ready to bring your ideas to life, {user?.firstName}?
                        </p>
                    </div>

                    <div className="z-10 flex items-center gap-3 sm:gap-4 bg-white/80 
                    p-3 sm:p-4 rounded-xl border border-slate-100 shadow-lg w-full sm:w-auto justify-between">
                        <div className="text-center">
                            <span className="text-[9px] sm:text-[10px] font-black text-indigo-400 uppercase tracking-widest block">
                                Total Creations
                            </span>
                            <span className="text-xl w-fit sm:text-3xl font-bold text-slate-900">
                                {dashboardData.total_creations}
                            </span>
                        </div>

                        <button
                            onClick={() => navigate("/#plans")}
                            className="bg-slate-900 w-fit text-white px-4 sm:px-6 py-2.5 sm:py-3 
                            rounded-xl font-bold text-xs sm:text-sm 
                            hover:scale-105 active:scale-95 transition-all 
                            flex items-center gap-2 shadow-lg  sm:w-auto justify-center"
                        >
                            {isPremium ? (
                                <>Pro Member</>
                            ) : (
                                <>
                                    <Sparkles size={14} className="text-amber-400" />
                                    Upgrade
                                </>
                            )}
                        </button>
                    </div>

                    <div className="absolute top-0 right-0 w-48 sm:w-64 h-48 sm:h-64 
                    bg-indigo-100 rounded-full blur-[80px] -mr-20 -mt-20 opacity-60" />
                </header>

                {/* TOOLS GRID */}
                <section className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2 sm:gap-4">
                    {tools.map((tool) => (
                        <button
                            key={tool.title}
                            onClick={() => navigate(tool.path)}
                            className="group relative bg-white border border-slate-200 
                            p-5 sm:p-6 md:p-8 rounded-2xl 
                            hover:shadow-2xl hover:shadow-indigo-200/40 
                            hover:-translate-y-2 transition-all duration-300 
                            flex flex-col items-center text-center"
                        >
                            <div
                                className={`${tool.color} text-white 
                                p-4 sm:p-5 rounded-2xl mb-3 sm:mb-4 
                                shadow-xl group-hover:rotate-12 transition-transform`}
                            >
                                {tool.icon}
                            </div>
                            <span className="text-xs sm:text-sm font-bold text-slate-700">
                                {tool.title}
                            </span>

                            {tool.pro && (
                                <div className="absolute top-2 sm:top-3 right-2 sm:right-3">
                                    <Zap size={12} className="text-amber-400 fill-amber-400" />
                                </div>
                            )}
                        </button>
                    ))}
                </section>

                {/* USAGE + UPGRADE */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-2 sm:gap-4">

                    {/* Usage Analysis */}
                    <div className="lg:col-span-7 bg-white border border-slate-200 
                    rounded-2xl p-6 sm:p-8 md:p-10 shadow-lg">

                        <div className="flex items-center justify-between mb-6 sm:mb-10">
                            <div className="flex items-center gap-3">
                                <div className="p-2.5 sm:p-3 bg-indigo-50 text-indigo-600 rounded-xl">
                                    <BarChart size={20} className="sm:w-6 sm:h-6" />
                                </div>
                                <h2 className="text-lg sm:text-xl md:text-2xl font-bold">
                                    Usage Analysis
                                </h2>
                            </div>
                            <span className="text-[10px] sm:text-xs font-bold text-slate-400 uppercase tracking-widest">
                                Total: {dashboardData.total_creations}
                            </span>
                        </div>

                        <div className="space-y-6 sm:space-y-8">
                            {dashboardData.creations_by_type.map((item) => (
                                <div key={item.type}>
                                    <div className="flex justify-between items-end mb-2">
                                        <span className="text-xs sm:text-sm font-bold text-slate-700 capitalize">
                                            {item.type.replace(/-/g, " ")}
                                        </span>
                                        <span className="text-xs sm:text-sm font-black text-indigo-600 bg-indigo-50 px-2 sm:px-3 py-1 rounded-full">
                                            {item.count}
                                        </span>
                                    </div>

                                    <div className="w-full bg-slate-100 h-3 sm:h-4 rounded-full overflow-hidden border border-slate-200">
                                        <div
                                            className="h-full bg-linear-to-r from-indigo-500 to-purple-600 rounded-full transition-all duration-1000"
                                            style={{
                                                width: `${(item.count / dashboardData.total_creations) * 100}%`,
                                            }}
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Upgrade Card */}
                    <div className="lg:col-span-5 relative group">
                        <div className="absolute inset-0 bg-linear-to-br from-indigo-600 to-violet-900 
                        rounded-2xl blur-xl opacity-30 group-hover:opacity-50 transition-opacity" />

                        <div className="relative h-full bg-slate-950 rounded-2xl 
                        p-6 sm:p-8 md:p-10 text-white flex flex-col justify-between 
                        border border-white/10">

                            <div>
                                <div className="w-12 sm:w-14 h-12 sm:h-14 bg-white/10 rounded-2xl 
                                flex items-center justify-center mb-5 sm:mb-6">
                                    <Sparkles className="text-amber-300 w-6 h-6 sm:w-8 sm:h-8" />
                                </div>

                                <h3 className="text-2xl sm:text-3xl font-black leading-tight mb-3 sm:mb-4">
                                    Unlock The <br />
                                    <span className="text-indigo-400">Full Potential</span>
                                </h3>

                                <p className="text-xs sm:text-sm text-slate-400 mb-5 sm:mb-6">
                                    Upgrade to Pro for high-fidelity AI generation, unlimited edits, and priority processing.
                                </p>

                                <ul className="space-y-3 sm:space-y-4">
                                    {[
                                        "Unlimited AI Image Generation",
                                        "Magic Background Removal & Replace",
                                        "Priority Processing & Support",
                                    ].map((feat) => (
                                        <li
                                            key={feat}
                                            className="flex items-center gap-3 text-xs sm:text-sm text-slate-300"
                                        >
                                            <div className="p-1 bg-indigo-500 rounded-full">
                                                <CheckCircle2 size={12} className="text-white" />
                                            </div>
                                            {feat}
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            <button
                                onClick={() => navigate("/#plans")}
                                className="w-full mt-8 py-3 sm:py-4 
                                bg-indigo-500 hover:bg-indigo-400 
                                rounded-xl font-black text-xs sm:text-sm 
                                transition-all shadow-2xl shadow-indigo-500/40 
                                flex items-center justify-center gap-2"
                            >
                                Go Premium Now <ArrowUpRight size={18} />
                            </button>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default Dashboard;
