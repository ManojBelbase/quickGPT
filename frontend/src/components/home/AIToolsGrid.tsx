import { useNavigate } from "react-router-dom";
import { useUser } from "@clerk/clerk-react";
import { AiToolsData } from "../../assets/assets";
import { ArrowUpRight } from "lucide-react";
import { useClerk } from "@clerk/clerk-react"
export const AITools = () => {
    const navigate = useNavigate();
    const { user } = useUser();
    const { openSignIn } = useClerk()

    const handleSubmit = (path: string) => {
        if (user) {
            navigate(path)
        } else {
            openSignIn()
        }
    }

    return (
        <section className="relative py-24 bg-[#F8FAFC] overflow-hidden">
            {/* 1. Subtle Background Accents */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full pointer-events-none">
                <div className="absolute top-24 left-10 w-72 h-72 bg-indigo-100/50 rounded-full blur-[100px]" />
                <div className="absolute bottom-24 right-10 w-72 h-72 bg-purple-100/50 rounded-full blur-[100px]" />
            </div>

            <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
                {/* 2. Section Header with Badge */}
                <div className="text-center mb-20">
                    <span className="inline-block px-4 py-1.5 mb-4 text-xs font-bold tracking-widest text-indigo-600 uppercase bg-indigo-50 rounded-full">
                        The Toolbox
                    </span>
                    <h2 className="text-4xl md:text-5xl font-black text-slate-900 mb-6 tracking-tight">
                        POWERED BY <span className="text-transparent bg-clip-text bg-linear-to-r from-indigo-600 to-purple-600">  AI</span>
                    </h2>
                    <p className="text-slate-500 max-w-2xl mx-auto text-lg leading-relaxed">
                        Stop switching between different apps. Use our one-click tools to generate blog posts, design visuals, and polish your images instantly.
                    </p>
                </div>

                {/* 3. The Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {AiToolsData.map(({ title, description, Icon, path = "bg-indigo-50 text-indigo-600", tag }) => (
                        <div
                            key={title}
                            onClick={() => handleSubmit(path)}
                            className="group relative cursor-pointer"
                        >
                            {/* Card Background & Border */}
                            <div className="absolute -inset-0.5 bg-linear-to-r from-indigo-100 to-purple-100 rounded-3xl opacity-0 group-hover:opacity-100 transition duration-500 blur-sm"></div>

                            <div className="relative h-full bg-white p-8 rounded-[1.4rem] border border-slate-200/60 shadow-sm transition-all duration-300 group-hover:-translate-y-2 group-hover:shadow-xl overflow-hidden">

                                {/* Decorative Pattern inside card */}
                                <div className="absolute top-0 right-0 -mr-4 -mt-4 w-24 h-24 bg-slate-50 rounded-full opacity-50 group-hover:scale-150 transition-transform duration-500" />

                                <div className="relative flex flex-col h-full">
                                    {/* Icon Wrapper */}
                                    <div className={`w-14 h-14 flex items-center justify-center rounded-2xl mb-6 transition-transform duration-500 group-hover:scale-110 group-hover:rotate-3 shadow-inner`}>
                                        <Icon className="w-7 h-7 stroke-[1.5]" />
                                    </div>
                                    {
                                        tag && <p className="border text-xs absolute right-0 px-2 py-1 bg-purple-600 text-white rounded-full">

                                            {tag}
                                        </p>
                                    }


                                    {/* Title & Arrow */}
                                    <div className="flex items-start justify-between mb-3">
                                        <h3 className="text-xl font-bold text-slate-900 group-hover:text-indigo-600 transition-colors">
                                            {title}
                                        </h3>
                                        <div className="p-1 rounded-full bg-slate-50 text-slate-400 group-hover:bg-indigo-600 group-hover:text-white transition-all duration-300 transform translate-x-4 opacity-0 group-hover:translate-x-0 group-hover:opacity-100">
                                            <ArrowUpRight size={18} />
                                        </div>
                                    </div>

                                    {/* Description */}
                                    <p className="text-slate-500 leading-relaxed text-[0.95rem]">
                                        {description}
                                    </p>

                                    {/* Feature "Pills" (Optional detail) */}
                                    <div className="mt-auto pt-6 flex gap-2">
                                        <div className="h-1 w-12 bg-slate-100 rounded-full overflow-hidden">
                                            <div className="h-full bg-indigo-500 w-0 group-hover:w-full transition-all duration-700 delay-100" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* 4. Bottom CTA (Optional) */}
                <div className="mt-20 text-center">
                    <p className="text-slate-400 text-sm font-medium italic">
                        More tools being added every week...
                    </p>
                </div>
            </div>
        </section>
    );
};