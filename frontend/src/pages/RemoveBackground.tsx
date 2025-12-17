import React, { useState, useCallback } from "react";
import BackgroundRemovalForm from "../components/removeBackground/BackgroundRemovalForm";
import api from "../api/axiosInstance";
import RemovedBackgroundList from "../components/removeBackground/RemovedBackgroundList";
import { ProcessedImagePreview } from "../components/removeBackground/ProcessedImagePreview";

const RemoveBackground: React.FC = () => {
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [processedImageUrl, setProcessedImageUrl] = useState<string | null>(null);

    const [isLoading, setIsLoading] = useState<boolean>(false);

    const handleRemoveBackground = useCallback(async () => {
        if (!selectedFile) return;

        setIsLoading(true);
        setProcessedImageUrl(null);

        try {
            const formData = new FormData();
            formData.append("image", selectedFile);

            const { data } = await api.post(
                "/remove-background",
                formData,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                }
            );

            if (data?.status === "success") {
                setProcessedImageUrl(data.data.content);
            }
        } catch (error) {
            console.error("Background removal failed", error);
        } finally {
            setIsLoading(false);
        }
    }, [selectedFile]);

    return (
        <div className="min-h-screen">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-2"
            >
                {/* LEFT */}
                <div className="col-span-1 lg:col-span-2 flex flex-col gap-2">
                    <BackgroundRemovalForm
                        selectedFile={selectedFile}
                        onFileChange={setSelectedFile}
                        onRemoveBackground={handleRemoveBackground}
                        isLoading={isLoading}
                    />

                    {/* LIST */}
                    <div className="flex-1 overflow-hidden">
                        <RemovedBackgroundList
                            onSelectImage={setProcessedImageUrl}
                        />
                    </div>
                </div>

                {/* RIGHT */}
                <div className="col-span-1 lg:col-span-2">
                    <ProcessedImagePreview
                        imageUrl={processedImageUrl}
                        isLoading={isLoading}
                    />
                </div>
            </div>
        </div>

    );
};

export default RemoveBackground;
