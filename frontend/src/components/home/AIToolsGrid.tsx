import { useNavigate } from "react-router-dom";
import { toolsData } from "../../const/toolsData";
import { useUser } from "@clerk/clerk-react";

export const AITools = () => {
    const navigate = useNavigate()
    const { user } = useUser()
    return (
        <section className="py-24 bg-white px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                {/* Header Section (Kept structure and text) */}
                <div className="text-center mb-16">
                    <h2 className="text-4xl font-bold text-gray-900 mb-4">
                        Powerful AI Tools
                    </h2>
                    <p className="text-gray-600 max-w-xl mx-auto">
                        Everything you need to create, enhance, and optimize your content with
                        cutting-edge AI technology.
                    </p>
                </div>

                {/* Grid Container */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {toolsData.map(({ id, title, description, Icon, colorClass, path }) => (
                        <div
                            onClick={() => user && navigate(path)}
                            key={id}
                            className="bg-white p-8 rounded-2xl border border-gray-200 transition-all duration-200 hover:border-blue-500/50"
                        >
                            {/* Icon Wrapper */}
                            <div className={`w-12 h-12 flex items-center justify-center rounded-xl mb-4 ${colorClass}`}>
                                <Icon className="w-6 h-6 stroke-2" />
                            </div>

                            {/* Title (Updated for better hierarchy) */}
                            <h3 className="text-xl font-bold text-gray-900 mb-2">
                                {title}
                            </h3>

                            {/* Description */}
                            <p className="text-sm text-gray-500">
                                {description}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};