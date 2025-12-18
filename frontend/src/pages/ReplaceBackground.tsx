import React, { useState } from "react";
import ReplaceBackgroundForm from "../components/replaceBackground/ReplaceBackgroundForm";
import ReplaceBackgroundList from "../components/replaceBackground/ReplaceBackgroundList";
import { ReplaceBackgroundPreview } from "../components/replaceBackground/ReplaceBackgroundPreview";
import { useReplaceBackground } from "../hooks/useReplaceBackground";
import toast from "react-hot-toast";

const ReplaceBackground: React.FC = () => {
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [backgroundPrompt, setBackgroundPrompt] = useState<string>("");
    const [processedImageUrl, setProcessedImageUrl] = useState<string | null>(null);
    const [isProcessing, setIsProcessing] = useState<boolean>(false);

    const { mutateAsync: replaceBackground } = useReplaceBackground();

    const handleReplaceBackground = async () => {
        const prompt = backgroundPrompt.trim();
        if (!selectedFile || !prompt) {
            toast.error("Please select an image and describe the new background");
            return;
        }

        setIsProcessing(true);
        setProcessedImageUrl(null);

        try {
            const rawContent = await replaceBackground({ file: selectedFile, prompt });
            const match = rawContent.match(/https:\/\/res\.cloudinary\.com\/[^\s"]+/);
            const cleanUrl = match ? match[0] : rawContent;
            setProcessedImageUrl(cleanUrl);
            toast.success("Background replaced successfully!");
        } catch (error: any) {
            toast.error(error?.message || "Failed to replace background");
        } finally {
            setIsProcessing(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 max-w-screen-2xl mx-auto ">
                {/* LEFT: Form + History */}
                <div className="col-span-1 lg:col-span-2 flex flex-col gap-4">
                    <ReplaceBackgroundForm
                        selectedFile={selectedFile}
                        onFileChange={setSelectedFile}
                        backgroundPrompt={backgroundPrompt}
                        onPromptChange={setBackgroundPrompt}
                        onReplaceBackground={handleReplaceBackground}
                        isLoading={isProcessing}
                    />

                    <div className="flex-1 min-h-0">
                        <ReplaceBackgroundList onSelectImage={setProcessedImageUrl} />
                    </div>
                </div>

                {/* RIGHT: Preview */}
                <div className="col-span-1 lg:col-span-2">
                    <ReplaceBackgroundPreview
                        imageUrl={processedImageUrl}
                        isLoading={isProcessing}
                    />
                </div>
            </div>
        </div>
    );
};

export default ReplaceBackground;