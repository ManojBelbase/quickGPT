import React, { useState } from 'react';
import ImageGenerationForm from '../components/generate_image/ImageGenerationForm';
import GeneratedImageResult from '../components/generate_image/GeneratedImageResult';
import api from '../api/axiosInstance';

// Define the Style structure
export interface ImageStyle {
    name: string;
    value: string;
}

const imageStyles: ImageStyle[] = [
    { name: 'Realistic', value: 'realistic' },
    { name: 'Anime', value: 'anime' },
    { name: 'Concept Art', value: 'concept_art' },
    { name: 'Watercolor', value: 'watercolor' },
    { name: 'Digital Painting', value: 'digital_painting' },
    { name: '3D Render', value: '3d_render' },
];

const GenerateImages: React.FC = () => {
    const [prompt, setPrompt] = useState<string>('A golden retriever wearing sunglasses on a neon city street');
    const [selectedStyle, setSelectedStyle] = useState<ImageStyle>(imageStyles[0]);
    const [publish, setPublish] = useState<boolean>(false)
    const [generatedImages, setGeneratedImages] = useState<string[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const handleGenerateImages = async () => {
        const trimmedPrompt = prompt.trim();
        if (!trimmedPrompt) return;

        setIsLoading(true);
        setGeneratedImages([]); // clear previous

        const fullPrompt = `${trimmedPrompt} [Style: ${selectedStyle.name}]`;

        try {
            const { data } = await api.post('/image', {
                prompt: fullPrompt,
                publish,
            });

            if (data?.status === 'success') {
                const imageUrl = data.data.content;

                // Option A: Set as array (best for your current grid layout)
                setGeneratedImages([imageUrl]);

                // Option B: Set as single string (if you change state type)
                // setGeneratedImage(imageUrl);
            } else {
                console.error('Failed to generate images', data);
            }
        } catch (err) {
            console.error('API error:', err);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="flex flex-col lg:flex-row gap-2 sm:gap-4 min-h-full">

            {/* Left Panel: Controls */}
            <ImageGenerationForm
                prompt={prompt}
                onPromptChange={setPrompt}
                styles={imageStyles}
                selectedStyle={selectedStyle}
                onStyleChange={setSelectedStyle}
                publish={publish}                    // ✅ Pass publish
                onPublishChange={setPublish}         // ✅ Pass handler
                onGenerate={handleGenerateImages}
                isLoading={isLoading}
            />

            {/* Right Panel: Results */}
            <GeneratedImageResult
                images={generatedImages}
                isLoading={isLoading}
            />
        </div>
    );
};

export default GenerateImages;
