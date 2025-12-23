// src/pages/TextSummarizer.tsx
import React, { useState } from "react";
import toast from "react-hot-toast";
import { useGenerateSummary } from "../hooks/useTextSummaries";
import TextSummaryPreview from "../components/textSummarizer/TextSummaryPreview";
import TextSummarizerForm from "../components/textSummarizer/TextSummarizerForm";
import TextSummaryList from "../components/textSummarizer/TextSummaryList";

const TextSummarizer: React.FC = () => {
    const [text, setText] = useState<string>("");
    const [length, setLength] = useState<"short" | "medium" | "long">("medium");
    const [style, setStyle] = useState<"neutral" | "bullet-points" | "formal" | "concise">("neutral");
    const [generatedSummary, setGeneratedSummary] = useState<string>("");
    const [isGenerating, setIsGenerating] = useState<boolean>(false);

    const { mutateAsync: generateSummary } = useGenerateSummary();

    const handleGenerateSummary = async () => {
        if (!text.trim()) {
            toast.error("Please enter some text to summarize");
            return;
        }

        setIsGenerating(true);
        setGeneratedSummary("");

        try {
            const summary = await generateSummary({ text, length, style });
            setGeneratedSummary(summary);
            toast.success("Summary generated!");
        } catch (err: any) {
            toast.error(err?.response?.data?.message || "Failed to generate summary");
        } finally {
            setIsGenerating(false);
        }
    };

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 p-4">
            {/* Left: Form + History List */}
            <div className="col-span-1 md:col-span-1 lg:col-span-2 flex flex-col gap-4">
                <TextSummarizerForm
                    text={text}
                    onTextChange={setText}
                    length={length}
                    onLengthChange={setLength}
                    style={style}
                    onStyleChange={setStyle}
                    onGenerate={handleGenerateSummary}
                    isLoading={isGenerating}
                />

                <div className="flex-1 overflow-hidden">
                    <TextSummaryList onSelectSummary={setGeneratedSummary} />
                </div>
            </div>

            {/* Right: Preview */}
            <div className="col-span-1 md:col-span-1 lg:col-span-3 flex flex-col">
                <TextSummaryPreview summary={generatedSummary} isLoading={isGenerating} />
            </div>
        </div>
    );
};

export default TextSummarizer;