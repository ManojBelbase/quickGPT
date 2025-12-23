import React from 'react';
import { FileText, Loader2, PenSquare } from 'lucide-react';
import { AIResponseParser, parseAiResponseToPlainText } from 'ai-response-parser';
import type { GeneratedArticleResultProps } from '../../types';
import { PreviewHeader } from '../ui/PreviewHeader';

export const ArticlePreview: React.FC<GeneratedArticleResultProps> = ({ content, isLoading }) => {
    const plainText = React.useMemo(() => content ? parseAiResponseToPlainText(content) : '', [content]);
    return (
        <div className="w-full p-2 sm:p-4 bg-white rounded-md shadow-sm">

            <PreviewHeader
                title="Article Preview"
                icon={<FileText className="w-5 h-5 mr-2 text-purple-600" />}
                isCopy={true}
                copyText={plainText}
            />

            <div className="min-h-[600px] h-full overflow-y-scroll border-t-2  border-gray-200 p-2 sm:p-4 relative">
                {content ? (
                    <AIResponseParser
                        content={content}
                        themeName="light"
                        textColor="#000000"
                    />
                ) : isLoading ? (
                    <div className="absolute inset-0 flex flex-col items-center justify-center bg-white/90">
                        <Loader2 className="h-8 w-8 text-purple-600 animate-spin" />
                        <p className="mt-4 text-gray-600 font-medium">
                            Please wait... AI is writing your masterpiece...
                        </p>
                    </div>
                ) : (
                    <div className="flex flex-col items-center justify-center mx-auto text-center h-full text-gray-500">
                        <PenSquare className="w-12 h-12 mb-3 text-gray-300" />
                        <p className="text-lg font-medium">Enter a topic and click "Generate article" to get started</p>
                        <p className="text-sm mt-1">Your generated content will appear here.</p>
                    </div>
                )}
            </div>
        </div>
    );
};