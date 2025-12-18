import React, { useState } from "react";
import BackgroundRemovalForm from "../components/removeBackground/BackgroundRemovalForm";
import RemovedBackgroundList from "../components/removeBackground/RemovedBackgroundList";
import { ProcessedImagePreview } from "../components/removeBackground/ProcessedImagePreview";
import { useRemoveBackground } from "../hooks/useRemoveBackground";
import toast from "react-hot-toast";

const RemoveBackground: React.FC = () => {
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [processedImageUrl, setProcessedImageUrl] = useState<string | null>(null);
    const [isProcessing, setIsProcessing] = useState<boolean>(false);

    const { mutateAsync: removeBackground } = useRemoveBackground();

    const handleRemoveBackground = async () => {
        if (!selectedFile) {
            toast.error("Please select an image first");
            return;
        }

        setIsProcessing(true);
        setProcessedImageUrl(null);

        try {
            const resultUrl = await removeBackground(selectedFile);
            setProcessedImageUrl(resultUrl);
            toast.success("Background removed successfully!");
        } catch (error: any) {
            toast.error(error?.response.data.message || "Failed to generate image");
        } finally {
            setIsProcessing(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 max-w-screen-2xl mx-auto ">
                {/* LEFT: Form + History */}
                <div className="col-span-1 lg:col-span-2 flex flex-col gap-4">
                    <BackgroundRemovalForm
                        selectedFile={selectedFile}
                        onFileChange={setSelectedFile}
                        onRemoveBackground={handleRemoveBackground}
                        isLoading={isProcessing}
                    />

                    <div className="flex-1 min-h-0">
                        <RemovedBackgroundList onSelectImage={setProcessedImageUrl} />
                    </div>
                </div>

                {/* RIGHT: Preview */}
                <div className="col-span-1 lg:col-span-2">
                    <ProcessedImagePreview
                        imageUrl={processedImageUrl}
                        isLoading={isProcessing}
                    />
                </div>
            </div>
        </div>
    );
};

export default RemoveBackground;