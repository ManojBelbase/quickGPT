import React, { useEffect, useState } from 'react';
import { useUser } from '@clerk/clerk-react';
import { useNavigate } from 'react-router-dom';

import api from '../api/axiosInstance';
import type { DashboardData } from '../types';
import { tools } from '../const/toolsData';
import { ArrowUpRight, BarChart, CheckCircle2, Sparkles, Zap } from 'lucide-react';



const Dashboard: React.FC = () => {
    const { user, isLoaded } = useUser();
    const navigate = useNavigate();
    const [data, setData] = useState<DashboardData | null>(null);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        const fetchDashboard = async () => {
            try {
                const { data } = await api.get("/dashboard");
                if (data?.status === "success") {
                    setData(data.data);
                }
            } catch (error) {
                console.error("Failed to fetch dashboard data", error);
            } finally {
                setLoading(false);
            }
        };

        fetchDashboard();
    }, []);




    if (!isLoaded || loading) return <div>Loading...</div>;
    if (!data) return <div>No data available</div>;

    const isPremium = data.plan === 'premium';

    return (
        <div className="min-h-screen bg-[#FDFDFF] text-slate-900 font-sans">
            <div className="mx-auto space-y-5">

                <header className="relative overflow-hidden bg-white backdrop-blur-xl border border-gray-200 p-8 rounded-sm shadow-2xl shadow-indigo-100/50 flex flex-col md:flex-row justify-between items-center gap-6">
                    <div className="z-10 text-center md:text-left">
                        <h1 className="text-4xl font-black tracking-tight bg-linear-to-r from-slate-900 via-slate-700 to-slate-900 bg-clip-text text-transparent">
                            Dashboard
                        </h1>
                        <p className="text-slate-500 font-medium mt-1">
                            Ready to bring your ideas to life, {user?.firstName}?
                        </p>
                    </div>

                    <div className="z-10 flex items-center gap-4 bg-white/80 p-2 rounded-lg border border-slate-100 shadow-sm">
                        <div className="px-5">
                            <span className="text-[10px] font-black text-indigo-400 uppercase tracking-widest block">Total Creations</span>
                            <span className="text-2xl font-bold">{data.total_creations}</span>
                        </div>
                        <button
                            onClick={() => navigate('/pricing')}
                            className="bg-slate-900 text-white px-6 py-3 rounded-xl font-bold text-sm hover:scale-[1.02] active:scale-95 transition-all flex items-center gap-2"
                        >
                            {isPremium ? 'Pro Member' : <><Sparkles size={16} className="text-amber-400" /> Upgrade</>}
                        </button>
                    </div>
                    <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-100 rounded-full blur-[80px] -mr-20 -mt-20 opacity-60"></div>
                </header>

                {/* --- TOOLS --- */}
                <section className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
                    {tools.map(tool => (
                        <button
                            key={tool.title}
                            onClick={() => navigate(tool.path)}
                            className="group relative bg-white border border-slate-200 p-6 rounded-lg hover:shadow-2xl hover:shadow-indigo-200/40 hover:-translate-y-1 transition-all flex flex-col items-center text-center"
                        >
                            <div className={`${tool.color} text-white p-4 rounded-2xl mb-4 shadow-lg shadow-indigo-200 group-hover:rotate-6 transition-transform`}>
                                {tool.icon}
                            </div>
                            <span className="text-sm font-bold text-slate-700">{tool.title}</span>
                            {tool.pro && (
                                <div className="absolute top-3 right-3">
                                    <Zap size={12} className="text-amber-400 fill-amber-400" />
                                </div>
                            )}
                        </button>
                    ))}
                </section>

                {/* --- USAGE ANALYSIS --- */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                    <div className="lg:col-span-7 bg-white border border-slate-200 rounded-lg p-10 shadow-sm">
                        <div className="flex items-center justify-between mb-10">
                            <div className="flex items-center gap-2">
                                <div className="p-2 bg-indigo-50 text-indigo-600 rounded-lg"><BarChart size={20} /></div>
                                <h2 className="text-xl font-bold">Usage Analysis</h2>
                            </div>
                            <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Total: {data.total_creations} Items</span>
                        </div>

                        <div className="space-y-8">
                            {data.creations_by_type.map(item => (
                                <div key={item.type} className="group cursor-default">
                                    <div className="flex justify-between items-end mb-2">
                                        <span className="text-sm font-bold text-slate-700 capitalize">{item.type.replace(/-/g, ' ')}</span>
                                        <span className="text-sm font-black text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded-md">{item.count}</span>
                                    </div>
                                    <div className="w-full bg-slate-50 h-3 rounded-full overflow-hidden border border-slate-100">
                                        <div
                                            className="h-full bg-linear-to-r from-indigo-500 to-purple-500 rounded-full transition-all duration-1000 ease-out group-hover:brightness-110"
                                            style={{ width: `${(item.count / data.total_creations) * 100}%` }}
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* RIGHT: UPGRADE CARD */}
                    <div className="lg:col-span-5 relative group cursor-pointer" onClick={() => navigate('/pricing')}>
                        <div className="absolute inset-0 bg-linear-to-br from-indigo-600 to-violet-900 rounded-lg blur-xl opacity-20 group-hover:opacity-40 transition-opacity"></div>
                        <div className="relative h-full bg-slate-950 rounded-lg p-10 text-white flex flex-col justify-between overflow-hidden border border-white/10">

                            <div className="z-10">
                                <div className="w-12 h-12 bg-white/10 rounded-lg flex items-center justify-center mb-6 backdrop-blur-md">
                                    <Sparkles className="text-amber-300" />
                                </div>
                                <h3 className="text-3xl font-black leading-tight mb-4">
                                    Unlock The <br /> <span className="text-indigo-400 font-black">Full Potential</span>
                                </h3>
                                <p className="text-slate-400 text-sm leading-relaxed mb-6">
                                    Upgrade to Pro for high-fidelity AI generation, unlimited background edits, and prioritized rendering.
                                </p>
                                <ul className="space-y-3">
                                    {['AI Image Generation', 'Magic Background Removal', '24/7 Priority Support'].map(feat => (
                                        <li key={feat} className="flex items-center gap-3 text-[13px] font-medium text-slate-300">
                                            <div className="p-0.5 bg-indigo-500 rounded-full"><CheckCircle2 size={12} className="text-white" /></div>
                                            {feat}
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            <div className="z-10 mt-10">
                                <button className="w-full py-4 bg-indigo-500 hover:bg-indigo-400 text-white rounded-lg font-black text-sm transition-all shadow-xl shadow-indigo-500/20 flex items-center justify-center gap-2">
                                    Go Premium Now <ArrowUpRight size={18} />
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
