// src/components/BlogTitleResult.tsx
import React from 'react';
import { Hash, Loader2 } from 'lucide-react';
import { AIResponseParser } from 'ai-response-parser';

interface BlogTitleResultProps {
    titles: string[];
    isLoading: boolean;
}

const BlogTitleResult: React.FC<BlogTitleResultProps> = ({ titles, isLoading }) => {
    const isInitialState = !titles.length && !isLoading;

    return (
        <div className="w-full  p-2 bg-white rounded-xl shadow-md">
            <h2 className="text-xl font-bold text-gray-900 flex items-center mb-6">
                <Hash className="w-5 h-5 mr-2 text-purple-600" />
                Generated Titles
            </h2>

            <div className="min-h-[400px] border border-gray-200 rounded-lg p-4 relative">

                {/* Displaying Results */}
                {titles.length > 0 && (
                    <div className="space-y-3">
                        {titles.map((title, index) => (
                            <div key={index} className="p-3 border border-gray-100 rounded-md bg-gray-50 hover:bg-white transition-colors">
                                <AIResponseParser content={title} themeName='light' textColor='#000000' />
                            </div>
                        ))}
                    </div>
                )}

                {/* Loading State */}
                {isLoading && (
                    <div className="absolute inset-0 flex flex-col items-center justify-center bg-white/90">
                        <Loader2 className="h-8 w-8 text-purple-600 animate-spin" />
                        <p className="mt-4 text-gray-600 font-medium">Generating awesome titles...</p>
                    </div>
                )}

                {/* Initial/Empty State */}
                {isInitialState && (
                    <div className="flex flex-col items-center justify-center text-center h-full text-gray-500">
                        <Hash className="w-12 h-12 mb-3 text-gray-300" />
                        <p className="text-lg font-medium">Enter keywords and click "Generate Titles" to get started</p>
                        <p className="text-sm mt-1">Your generated blog title options will appear here.</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default BlogTitleResult;