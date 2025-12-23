import React, { useState } from "react";
import { useGenerateCode } from "../hooks/useGenerateCode";
import toast from "react-hot-toast";
import GenerateCodeForm from "../components/generateCode/generateCodeForm";
import { CodePreview } from "../components/generateCode/CodePreview";
import GenerateCodeList from "../components/generateCode/GenerateCodeList";

const GenerateCode: React.FC = () => {
    const [prompt, setPrompt] = useState("");
    const [codeContent, setCodeContent] = useState("");
    const [isGenerating, setIsGenerating] = useState(false);

    const { mutateAsync: generateCode } = useGenerateCode();

    const handleGenerateCode = async () => {
        if (!prompt.trim()) {
            return;
        }

        setIsGenerating(true);

        try {
            const content = await generateCode({
                prompt,
            });

            setCodeContent(content);
            setPrompt("");
            toast.success("Code generated successfully!");
        } catch (error: any) {
            toast.error(error?.response?.data?.message || "Failed to generate code");
        } finally {
            setIsGenerating(false);
        }
    };

    return (
        <div className="min-h-screen">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-2 h-full">
                {/* LEFT SIDE */}
                <div className="col-span-1 md:col-span-1 lg:col-span-2 flex flex-col gap-2">
                    <GenerateCodeForm
                        prompt={prompt}
                        onPromptChange={setPrompt}

                        onGenerate={handleGenerateCode}
                        isLoading={isGenerating}
                    />

                    <div className="flex-1 overflow-hidden">
                        <GenerateCodeList onSelectCode={setCodeContent} />
                    </div>
                </div>

                {/* RIGHT SIDE */}
                <div className="col-span-1 md:col-span-1 lg:col-span-3 flex flex-col">
                    <CodePreview
                        content={codeContent}
                        isLoading={isGenerating}
                    />
                </div>
            </div>
        </div>
    );
};

export default GenerateCode;