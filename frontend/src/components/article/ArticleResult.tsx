// src/components/GeneratedArticleResult.tsx
import React from 'react';
import { FileText, Loader2, PenSquare } from 'lucide-react';

interface GeneratedArticleResultProps {
    content: string;
    isLoading: boolean;
}

const ArticleResult: React.FC<GeneratedArticleResultProps> = ({ content, isLoading }) => {
    return (
        <div className="w-full lg:w-2/3 p-6 bg-white rounded-sm shadow-sm">
            <h2 className="text-xl font-bold text-gray-900 flex items-center mb-6">
                <FileText className="w-5 h-5 mr-2 text-blue-600" />
                Generated Article
            </h2>

            <div className="min-h-[400px] border border-gray-200 rounded-lg p-4 relative">
                {content ? (
                    // Display generated content
                    <pre className="text-gray-800 font-sans whitespace-pre-wrap text-sm leading-relaxed">
                        {content}
                    </pre>
                ) : isLoading ? (
                    // Loading state overlay
                    <div className="absolute inset-0 flex flex-col items-center justify-center bg-white/90">
                        <Loader2 className="h-8 w-8 text-blue-600 animate-spin" />
                        <p className="mt-4 text-gray-600 font-medium">AI is writing your masterpiece...</p>
                    </div>
                ) : (
                    // Initial state / Placeholder
                    <div className="flex flex-col items-center justify-center text-center h-full text-gray-500">
                        <PenSquare className="w-12 h-12 mb-3 text-gray-300" />
                        <p className="text-lg font-medium">Enter a topic and click "Generate article" to get started</p>
                        <p className="text-sm mt-1">Your generated content will appear here.</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ArticleResult;