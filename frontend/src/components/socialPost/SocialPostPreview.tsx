import React from 'react';
import { Loader2, Sparkles } from 'lucide-react';
import { AIResponseParser } from 'ai-response-parser';
import { PreviewHeader } from '../ui/PreviewHeader';

interface SocialPostPreviewProps {
    posts: string[];
    isLoading: boolean;
}

export const SocialPostPreview: React.FC<SocialPostPreviewProps> = ({ posts, isLoading }) => {
    const isInitialState = posts.length === 0 && !isLoading;


    return (
        <div className="w-full p-2 bg-white rounded-md shadow-md">
            <PreviewHeader
                title="Post Preview"
                icon={<Sparkles className="w-5 h-5 mr-2 text-purple-600" />}
                isCopy={true}
                copyText={posts.join('\n')}
            />

            <div className="min-h-[300px] h-full sm:min-h-[600px] border-t-2 border-gray-200 p-2 sm:p-4 relative">
                {/* Displaying Results */}
                {posts.length > 0 && (
                    <div className="space-y-4">
                        {posts.map((post, index) => (
                            <div
                                key={index}
                                className="bg-gray-50/50 p-4 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors"
                            >
                                <AIResponseParser
                                    content={post}
                                    themeName="light"
                                    textColor="#000000"
                                />
                            </div>
                        ))}
                    </div>
                )}

                {/* Loading State */}
                {isLoading && (
                    <div className="absolute inset-0 flex flex-col items-center justify-center bg-white/90">
                        <Loader2 className="h-8 w-8 text-purple-600 animate-spin" />
                        <p className="mt-4 text-gray-600 font-medium">
                            Generating your perfect post...
                        </p>
                    </div>
                )}

                {/* Initial/Empty State */}
                {isInitialState && (
                    <div className="flex flex-col items-center justify-center text-center h-full text-gray-500">
                        <Sparkles className="w-12 h-12 mb-3 text-gray-300" />
                        <p className="text-lg font-medium">
                            Enter your prompt and click "Generate Post" to get started
                        </p>
                        <p className="text-sm mt-1">
                            Your generated social media post will appear here.
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
};