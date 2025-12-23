import React, { useState } from "react";
import ImageGenerationForm from "../components/generateImage/ImageGenerationForm";
import ImageList from "../components/generateImage/ImageList";
import ImagePreview from "../components/generateImage/ImagePreview";
import { imageStyles } from "../const/imageStyles";
import type { ImageStyle } from "../types";
import { useGenerateImage } from "../hooks/useImages";
import toast from "react-hot-toast";

const GenerateImages: React.FC = () => {
    const [prompt, setPrompt] = useState("");
    const [selectedStyle, setSelectedStyle] = useState<ImageStyle>(imageStyles[0]);
    const [publish, setPublish] = useState<boolean>(true);
    const [generatedImages, setGeneratedImages] = useState<string[]>([]);
    const [isGenerating, setIsGenerating] = useState<boolean>(false);

    // mutateAsync pattern — exactly like your other features
    const { mutateAsync: generateImage } = useGenerateImage();

    const handleSelectFromGallery = (imageUrl: string) => {
        setGeneratedImages([imageUrl]);
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    const handleGenerateImages = async () => {
        if (!prompt.trim()) {
            toast.error("Please enter a prompt");
            return;
        }

        setIsGenerating(true);
        setGeneratedImages([]);

        const fullPrompt = `${prompt.trim()} [Style: ${selectedStyle.name}]`;

        try {
            const imageUrl = await generateImage({ prompt: fullPrompt, publish });
            setGeneratedImages([imageUrl]);
            toast.success("Image generated successfully!");
        } catch (error: any) {
            console.log(error, "er")
            toast.error(error?.response.data.message || "Failed to generate image");
        } finally {
            setIsGenerating(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-2 h-full max-w-[1600px] mx-auto">
                {/* LEFT SIDE: Controls & Gallery */}
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
                        isLoading={isGenerating}
                    />

                    <div className="flex-1 overflow-y-auto max-h-[calc(100vh-400px)] lg:max-h-none">
                        <ImageList onSelectImage={handleSelectFromGallery} />
                    </div>
                </div>

                {/* RIGHT SIDE: Big Preview */}
                <div className="col-span-1 md:col-span-1 lg:col-span-2 flex flex-col">
                    <div className="sticky ">
                        <ImagePreview images={generatedImages} isLoading={isGenerating} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default GenerateImages;