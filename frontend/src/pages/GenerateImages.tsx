import React, { useState, useCallback } from "react";
import ImageGenerationForm from "../components/generateImage/ImageGenerationForm";
import ImageList from "../components/generateImage/ImageList";
import api from "../api/axiosInstance";
import ImagePreview from "../components/generateImage/ImagePreview";
import { imageStyles } from "../const/imageStyles";
import type { ImageStyle } from "../types";
const GenerateImages: React.FC = () => {
    const [prompt, setPrompt] = useState("A golden retriever wearing sunglasses on a neon city street");
    const [selectedStyle, setSelectedStyle] = useState<ImageStyle>(imageStyles[0]);
    const [publish, setPublish] = useState<boolean>(false);
    const [generatedImages, setGeneratedImages] = useState<string[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const handleSelectFromGallery = (imageUrl: string) => {
        setGeneratedImages([imageUrl]);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const handleGenerateImages = useCallback(async () => {
        if (!prompt.trim()) return;

        setIsLoading(true);
        setGeneratedImages([]);

        const fullPrompt = `${prompt.trim()} [Style: ${selectedStyle.name}]`;

        try {
            const { data } = await api.post("/image", {
                prompt: fullPrompt,
                publish,
            });

            if (data?.status === "success") {
                setGeneratedImages([data.data.content]);
            }
        } catch (error) {
            console.error("Image generation failed", error);
        } finally {
            setIsLoading(false);
        }
    }, [prompt, selectedStyle, publish]);

    return (
        <div className="min-h-screen  bg-gray-50">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-2 h-full max-w-[1600px] mx-auto">

                {/* LEFT SIDE: Controls & History */}
                <div className="col-span-1 md:col-span-1 lg:col-span-2 flex flex-col gap-2">
                    <ImageGenerationForm
                        prompt={prompt}
                        onPromptChange={setPrompt}
                        styles={imageStyles}
                        selectedStyle={selectedStyle}
                        onStyleChange={setSelectedStyle}
                        publish={publish}
                        onPublishChange={setPublish}
                        onGenerate={handleGenerateImages}
                        isLoading={isLoading}
                    />

                    <div className="flex-1 overflow-y-auto max-h-[calc(100vh-400px)] lg:max-h-none">
                        <ImageList onSelectImage={handleSelectFromGallery} />
                    </div>
                </div>

                {/* RIGHT SIDE: Big Preview */}
                <div className="col-span-1 md:col-span-1 lg:col-span-2 flex flex-col">
                    <div className="sticky top-2">
                        <ImagePreview
                            images={generatedImages}
                            isLoading={isLoading}
                        />
                    </div>
                </div>

            </div>
        </div>
    );
};

export default GenerateImages;