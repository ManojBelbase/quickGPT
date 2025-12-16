import React from 'react';
import { FileText, Loader2, PenSquare } from 'lucide-react';
import { AIResponseParser } from 'ai-response-parser';

interface GeneratedArticleResultProps {
    content: string;
    isLoading: boolean;
}

const ArticleResult: React.FC<GeneratedArticleResultProps> = ({ content, isLoading }) => {
    return (
        <div className="w-full lg:w-2/3 p-6 bg-white rounded-xs shadow-sm">
            <h2 className="text-xl font-bold text-black flex items-center mb-4">
                <FileText className="w-5 h-5 mr-2 text-blue" />
                Generated Article
            </h2>

            <div className="min-h-[400px] border border-gray-200 rounded-sm p-2 relative">
                {content ? (
                    // Display generated content
                    <AIResponseParser content={content} themeName='light' textColor='#000000' />
                ) : isLoading ? (
                    // Loading state overlay
                    <div className="absolute inset-0 flex flex-col items-center justify-center bg-white/90">
                        <Loader2 className="h-8 w-8 text-blue-600 animate-spin" />
                        <p className="mt-4 text-gray-600 font-medium"> Please wait... , AI is writing your masterpiece...</p>
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