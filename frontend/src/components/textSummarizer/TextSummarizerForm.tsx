// src/components/textSummarizer/TextSummarizerForm.tsx
import React from "react";
import { FileText, Loader2 } from "lucide-react";
import { Button } from "../ui/Button";

interface TextSummarizerFormProps {
    text: string;
    onTextChange: (value: string) => void;
    length: "short" | "medium" | "long";
    onLengthChange: (value: "short" | "medium" | "long") => void;
    style: "neutral" | "bullet-points" | "formal" | "concise";
    onStyleChange: (value: "neutral" | "bullet-points" | "formal" | "concise") => void;
    onGenerate: () => void;
    isLoading: boolean;
}

const TextSummarizerForm: React.FC<TextSummarizerFormProps> = ({
    text,
    onTextChange,
    length,
    onLengthChange,
    style,
    onStyleChange,
    onGenerate,
    isLoading,
}) => {
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!text.trim() || isLoading) return;
        onGenerate();
    };

    return (
        <div className="w-full p-4 rounded-xl shadow-md bg-white">
            <h2 className="text-xl font-bold text-gray-900 flex items-center mb-6">
                <FileText className="w-5 h-5 mr-2 text-purple-600" />
                AI Text Summarizer
            </h2>

            <form onSubmit={handleSubmit} className="space-y-6">
                {/* Text Input */}
                <div>
                    <label htmlFor="text-input" className="block text-sm font-medium text-gray-700 mb-2">
                        Text to Summarize
                    </label>
                    <textarea
                        id="text-input"
                        placeholder="Paste your article, essay, or long text here..."
                        value={text}
                        onChange={(e) => onTextChange(e.target.value)}
                        rows={6}
                        className="w-full border-gray-300 focus:border-purple-500 focus:ring-purple-500"
                        disabled={isLoading}
                    />
                </div>

                {/* Length Options */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Summary Length</label>
                    <div className="flex flex-wrap gap-2">
                        {(["short", "medium", "long"] as const).map((opt) => (
                            <button
                                type="button"
                                key={opt}
                                onClick={() => onLengthChange(opt)}
                                className={`py-2 px-4 text-sm font-medium rounded-md transition-colors border
                  ${length === opt ? "bg-purple-500 text-white border-purple-500" : "bg-white text-gray-700 border-gray-300 hover:bg-gray-50"}`}
                                disabled={isLoading}
                            >
                                {opt.charAt(0).toUpperCase() + opt.slice(1)}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Style Options */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Style</label>
                    <div className="flex flex-wrap gap-2">
                        {(["neutral", "bullet-points", "formal", "concise"] as const).map((opt) => (
                            <button
                                type="button"
                                key={opt}
                                onClick={() => onStyleChange(opt)}
                                className={`py-2 px-4 text-sm font-medium rounded-md transition-colors border
                  ${style === opt ? "bg-purple-500 text-white border-purple-500" : "bg-white text-gray-700 border-gray-300 hover:bg-gray-50"}`}
                                disabled={isLoading}
                            >
                                {opt === "bullet-points" ? "Bullet Points" : opt.charAt(0).toUpperCase() + opt.slice(1)}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Generate Button */}
                <Button
                    type="submit"
                    className="w-full py-3 h-12 text-lg font-medium bg-purple-600 hover:bg-purple-700 text-white flex items-center justify-center"
                    disabled={!text.trim() || isLoading}
                >
                    {isLoading ? (
                        <>
                            <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                            Summarizing...
                        </>
                    ) : (
                        <>
                            <FileText className="mr-2 h-5 w-5" />
                            Generate Summary
                        </>
                    )}
                </Button>
            </form>
        </div>
    );
};

export default TextSummarizerForm;