import React, { useState, useCallback } from "react";
import api from "../api/axiosInstance";
import { toast } from "react-hot-toast";
import ReplaceBackgroundForm from "../components/replaceBackground/ReplaceBackgroundForm";
import ReplaceBackgroundList from "../components/replaceBackground/ReplaceBackgroundList";
import { ReplaceBackgroundPreview } from "../components/replaceBackground/ReplaceBackgroundPreview";

const ReplaceBackground: React.FC = () => {
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [objectDescription, setObjectDescription] = useState<string>("");
    const [processedImageUrl, setProcessedImageUrl] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const handleObjectRemoval = useCallback(async () => {
        const trimmedDesc = objectDescription.trim();
        if (!selectedFile || !trimmedDesc) {
            toast.error("Please select an image and describe what to remove");
            return;
        }

        setIsLoading(true);
        setProcessedImageUrl(null);

        const formData = new FormData();
        formData.append("image", selectedFile);
        formData.append("prompt", trimmedDesc);

        try {
            const { data } = await api.post("/remove-object", formData, {
                headers: { "Content-Type": "multipart/form-data" },
                timeout: 90000,
            });

            if (data?.status === "success") {
                const url = data.data.content;
                setProcessedImageUrl(url);
                toast.success("Object removed successfully!");
            }
        } catch (error: any) {

            toast.error(error?.response?.data?.message)


        } finally {
            setIsLoading(false);
        }
    }, [selectedFile, objectDescription]);

    return (
        <div className="min-h-screen  bg-white">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-2 max-w-screen-2xl mx-auto">
                {/* LEFT SIDE: Form + History List */}
                <div className="col-span-1 lg:col-span-2 flex flex-col gap-2">
                    {/* Form */}
                    <ReplaceBackgroundForm
                        selectedFile={selectedFile}
                        onFileChange={setSelectedFile}
                        objectDescription={objectDescription}
                        onDescriptionChange={setObjectDescription}
                        onObjectRemoval={handleObjectRemoval}
                        isLoading={isLoading}
                    />

                    {/* History List (scrollable) */}
                    <div className="flex-1 min-h-0">
                        <ReplaceBackgroundList
                            onSelectImage={setProcessedImageUrl}
                        />
                    </div>
                </div>

                {/* RIGHT SIDE: Large Preview */}
                <div className="col-span-1 lg:col-span-2">
                    <ReplaceBackgroundPreview
                        imageUrl={processedImageUrl}
                        isLoading={isLoading}
                    />
                </div>
            </div>
        </div>
    );
};

export default ReplaceBackground;