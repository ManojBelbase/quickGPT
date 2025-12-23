import React from "react";
import { Loader2, Wand2 } from "lucide-react";

interface SocialPostPreviewProps {
    posts: string[];
    isLoading: boolean;
}

const SocialPostPreview: React.FC<SocialPostPreviewProps> = ({ posts, isLoading }) => {
    const isInitialState = !posts.length && !isLoading;

    return (
        <div className="w-full p-2 sm:p-4 bg-white rounded-xl shadow-md">
            <h2 className="text-xl font-bold text-gray-900 flex items-center mb-6">
                <Wand2 className="w-5 h-5 mr-2 text-purple-600" />
                Post Preview
            </h2>

            <div className="min-h-[300px] sm:min-h-[600px] h-full mx-auto flex items-center justify-center border-t-2 border-gray-200 p-2 relative">
                {posts.length > 0 && (
                    <div className="w-full space-y-4">
                        {posts.map((post, idx) => (
                            <div key={idx} className="bg-gray-50 p-4 rounded-md border border-gray-200 shadow-sm">
                                <p className="text-gray-800 text-sm">{post}</p>
                            </div>
                        ))}
                    </div>
                )}

                {isLoading && (
                    <div className="absolute inset-0 flex flex-col items-center justify-center bg-white/90">
                        <Loader2 className="h-8 w-8 text-purple-600 animate-spin" />
                        <p className="mt-4 text-gray-600 font-medium">
                            Generating social post...
                        </p>
                    </div>
                )}

                {isInitialState && (
                    <div className="flex flex-col items-center h-full justify-center text-center text-gray-500">
                        <Wand2 className="w-12 h-12 mb-3 text-gray-300" />
                        <p className="text-lg font-medium">
                            Describe your post and click "Generate Post"
                        </p>
                        <p className="text-sm mt-1">
                            Your AI-generated social post will appear here.
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default SocialPostPreview;
