import { FileText, Loader2 } from "lucide-react";
import { AIResponseParser } from "ai-response-parser";
import { PreviewHeader } from "../ui/PreviewHeader";

interface TextSummaryPreviewProps {
    summary: string;
    isLoading: boolean;
}

const TextSummaryPreview: React.FC<TextSummaryPreviewProps> = ({ summary, isLoading }) => {
    const isInitialState = !summary && !isLoading;

    return (
        <div className="w-full p-2 sm:p-4 bg-white rounded-md shadow-md">
            <PreviewHeader
                title="Summary Preview"
                icon={<FileText className="w-5 h-5 mr-2 text-purple-600" />}
                isCopy={!!summary}
                copyText={summary}
            />

            <div className="min-h-[300px] sm:min-h-[600px] h-full border-t-2 border-gray-200 p-2 relative">
                {
                    summary && !isLoading && (

                        <AIResponseParser content={summary} themeName="light" textColor="#000000" />
                    )
                }

                {isLoading && (
                    <div className="absolute inset-0 flex flex-col items-center justify-center bg-white/90">
                        <Loader2 className="h-8 w-8 text-purple-600 animate-spin" />
                        <p className="mt-4 text-gray-600 font-medium">Summarizing your text...</p>
                    </div>
                )}

                {isInitialState && (
                    <div className="flex flex-col h-full   mx-auto items-center justify-center text-center  text-gray-500">
                        <FileText className="w-12 h-12 mb-3 text-gray-300" />
                        <p className="text-lg font-medium">Paste text and generate a summary</p>
                        <p className="text-sm mt-1">Your summary will appear here.</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default TextSummaryPreview;