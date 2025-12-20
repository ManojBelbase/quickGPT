import { FileText, Hash, Loader2 } from 'lucide-react';
import { AIResponseParser } from 'ai-response-parser';
import type { BlogTitleResultProps } from '../../types';
import React from 'react';
import { CopyButton } from '../ui/CopyButton';
export const BlogTitlePreview: React.FC<BlogTitleResultProps> = ({ titles, isLoading }) => {
    const isInitialState = !titles.length && !isLoading;
    const plainText = React.useMemo(() => {
        if (!titles || titles.length === 0) return '';
        return titles.join('\n');
    }, [titles]);


    return (
        <div className="w-full  p-2 bg-white rounded-md shadow-md">
            <div className="flex items-center justify-between mb-4 ">
                <h2 className="text-xl px-2 py-0.5 font-bold text-black flex items-center">
                    <FileText className="w-5 h-5 mr-2 text-purple" />
                    Blog Preview
                </h2>

                {plainText && !isLoading && (
                    <div className="flex items-center gap-2">
                        {/* Copy Rendered (as displayed) */}
                        <CopyButton
                            text={plainText}
                            size="sm"
                            title="Copy blog titles"
                        />

                    </div>
                )}
            </div>
            <div className="min-h-[200px] h-full sm:min-h-[600px] border-t-2 border-gray-200 p-2 sm:p-4 relative">

                {/* Displaying Results */}
                {titles.length > 0 && (
                    <div className="space-y-1.5 sm:space-y-3">
                        {titles.map((title, index) => (
                            <div key={index} className=" hover:bg-white transition-colors">
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

