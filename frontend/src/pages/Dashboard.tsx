import React from "react";
import { useUser } from "@clerk/clerk-react";
import { useNavigate } from "react-router-dom";
import { useDashboard } from "../hooks/useDashboard";
import { tools } from "../const/toolsData";
import { ArrowUpRight, BarChart, CheckCircle2, Sparkles, Zap, Loader2 } from "lucide-react";

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
            <div className="min-h-screen bg-[#FDFDFF] flex items-center justify-center">
                <div className="flex flex-col items-center gap-4">
                    <Loader2 className="w-10 h-10 animate-spin text-purple-600" />
                    <p className="text-slate-600 font-medium">Loading your dashboard...</p>
                </div>
            </div>
        );
    }

    if (isError || !dashboardData) {
        return (
            <div className="min-h-screen bg-[#FDFDFF] flex items-center justify-center">
                <div className="text-center">
                    <p className="text-red-600 font-medium mb-2">Failed to load dashboard</p>
                    <button
                        onClick={() => window.location.reload()}
                        className="text-indigo-600 underline text-sm"
                    >
                        Try again
                    </button>
                </div>
            </div>
        );
    }

    const isPremium = dashboardData.plan === "premium";

    return (
        <div className="min-h-screen bg-[#FDFDFF] text-slate-900 font-sans">
            <div className="space-y-4">
                {/* HEADER */}
                <header className="relative overflow-hidden bg-white backdrop-blur-xl border border-gray-200 p-8 rounded-2xl shadow-2xl shadow-indigo-100/50 flex flex-col md:flex-row justify-between items-center gap-6">
                    <div className="z-10 text-center md:text-left">
                        <h1 className="text-4xl font-black tracking-tight bg-linear-to-r from-slate-900 via-slate-700 to-slate-900 bg-clip-text text-transparent">
                            Dashboard
                        </h1>
                        <p className="text-slate-500 font-medium mt-1">
                            Ready to bring your ideas to life, {user?.firstName}?
                        </p>
                    </div>

                    <div className="z-10 flex items-center gap-4 bg-white/80 p-4 rounded-xl border border-slate-100 shadow-lg">
                        <div className="text-center">
                            <span className="text-[10px] font-black text-indigo-400 uppercase tracking-widest block">
                                Total Creations
                            </span>
                            <span className="text-3xl font-bold text-slate-900">
                                {dashboardData.total_creations}
                            </span>
                        </div>
                        <button
                            onClick={() => navigate("/#plans")}
                            className="bg-slate-900 cursor-pointer text-white px-6 py-3 rounded-xl font-bold text-sm hover:scale-105 active:scale-95 transition-all flex items-center gap-2 shadow-lg"
                        >
                            {isPremium ? (
                                <>Pro Member</>
                            ) : (
                                <>
                                    <Sparkles size={16} className="text-amber-400" />
                                    Upgrade
                                </>
                            )}
                        </button>
                    </div>

                    <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-100 rounded-full blur-[80px] -mr-20 -mt-20 opacity-60" />
                </header>

                {/* TOOLS GRID */}
                <section className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-6">
                    {tools.map((tool) => (
                        <button
                            key={tool.title}
                            onClick={() => navigate(tool.path)}
                            className="group relative bg-white cursor-pointer border border-slate-200 p-8 rounded-2xl hover:shadow-2xl hover:shadow-indigo-200/40 hover:-translate-y-2 transition-all duration-300 flex flex-col items-center text-center"
                        >
                            <div
                                className={`${tool.color} text-white p-5 rounded-2xl mb-4 shadow-xl group-hover:rotate-12 transition-transform duration-300`}
                            >
                                {tool.icon}
                            </div>
                            <span className="text-sm font-bold text-slate-700">{tool.title}</span>
                            {tool.pro && (
                                <div className="absolute top-3 right-3">
                                    <Zap size={14} className="text-amber-400 fill-amber-400" />
                                </div>
                            )}
                        </button>
                    ))}
                </section>

                {/* USAGE + UPGRADE */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                    {/* Usage Analysis */}
                    <div className="lg:col-span-7 bg-white border border-slate-200 rounded-2xl p-10 shadow-lg">
                        <div className="flex items-center justify-between mb-10">
                            <div className="flex items-center gap-3">
                                <div className="p-3 bg-indigo-50 text-indigo-600 rounded-xl">
                                    <BarChart size={24} />
                                </div>
                                <h2 className="text-2xl font-bold">Usage Analysis</h2>
                            </div>
                            <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">
                                Total: {dashboardData.total_creations} Items
                            </span>
                        </div>

                        <div className="space-y-8">
                            {dashboardData.creations_by_type.map((item) => (
                                <div key={item.type} className="group">
                                    <div className="flex justify-between items-end mb-2">
                                        <span className="text-sm font-bold text-slate-700 capitalize">
                                            {item.type.replace(/-/g, " ")}
                                        </span>
                                        <span className="text-sm font-black text-indigo-600 bg-indigo-50 px-3 py-1 rounded-full">
                                            {item.count}
                                        </span>
                                    </div>
                                    <div className="w-full bg-slate-100 h-4 rounded-full overflow-hidden border border-slate-200">
                                        <div
                                            className="h-full bg-linear-to-r from-indigo-500 to-purple-600 rounded-full transition-all duration-1000 ease-out group-hover:brightness-110"
                                            style={{
                                                width: `${(item.count / dashboardData.total_creations) * 100}%`,
                                            }}
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div
                        className="lg:col-span-5 relative group cursor-pointer"
                    >
                        <div className="absolute inset-0 bg-linear-to-br from-indigo-600 to-violet-900 rounded-2xl blur-xl opacity-30 group-hover:opacity-50 transition-opacity"></div>
                        <div className="relative h-full bg-slate-950 rounded-2xl p-10 text-white flex flex-col justify-between overflow-hidden border border-white/10">
                            <div>
                                <div className="w-14 h-14 bg-white/10 rounded-2xl flex items-center justify-center mb-6 backdrop-blur-md">
                                    <Sparkles className="text-amber-300 w-8 h-8" />
                                </div>
                                <h3 className="text-3xl font-black leading-tight mb-4">
                                    Unlock The <br />
                                    <span className="text-indigo-400">Full Potential</span>
                                </h3>
                                <p className="text-slate-400 text-sm leading-relaxed mb-6">
                                    Upgrade to Pro for high-fidelity AI generation, unlimited background edits, and prioritized rendering.
                                </p>
                                <ul className="space-y-4">
                                    {[
                                        "Unlimited AI Image Generation",
                                        "Magic Background Removal & Replace",
                                        "Priority Processing & Support",
                                    ].map((feat) => (
                                        <li key={feat} className="flex items-center gap-3 text-sm font-medium text-slate-300">
                                            <div className="p-1 bg-indigo-500 rounded-full">
                                                <CheckCircle2 size={14} className="text-white" />
                                            </div>
                                            {feat}
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            <div className="mt-10">
                                <button onClick={() => navigate("/#plans")}
                                    className="w-full py-4 bg-indigo-500 cursor-pointer hover:bg-indigo-400 text-white rounded-xl font-black text-sm transition-all shadow-2xl shadow-indigo-500/40 flex items-center justify-center gap-2">
                                    Go Premium Now <ArrowUpRight size={20} />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;