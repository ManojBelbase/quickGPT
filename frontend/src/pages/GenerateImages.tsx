// src/pages/GenerateImages.tsx
import React, { useState } from 'react';
import { dummyPublishedCreationData } from '../assets/assets';
import ImageGenerationForm from '../components/generate_image/ImageGenerationForm';
import GeneratedImageResult from '../components/generate_image/GeneratedImageResult';

// Define the Style structure
export interface ImageStyle {
    name: string;
    value: string; // Used for API calls/unique identification
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
    const [selectedStyle, setSelectedStyle] = useState<ImageStyle>(imageStyles[0]); // Starts at 'Realistic'
    const [generatedImages, setGeneratedImages] = useState<string[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const handleGenerateImages = () => {
        const trimmedPrompt = prompt.trim();
        if (!trimmedPrompt) return;

        setIsLoading(true);
        setGeneratedImages([]); // Clear previous results

        // Prepare payload for API integration
        const payload = {
            prompt: trimmedPrompt,
            styleValue: selectedStyle.value, // The unique API identifier (e.g., 'anime')
            styleName: selectedStyle.name,   // The display name (e.g., 'Anime')
            count: 4, // Assuming we generate 4 images per request
        };

        // Log the submission payload
        console.log('Image Generation Payload:', payload);

        // Simulate API call delay
        setTimeout(() => {
            // Simulate receiving image URLs (using placeholders from dummy data)
            const simulatedImages = dummyPublishedCreationData
                .filter(item => item.type === 'image')
                .map(item => item.content as string) // Assuming 'content' holds the image URL
                .slice(0, 4);

            setGeneratedImages(simulatedImages);
            setIsLoading(false);
        }, 3000);
    };

    return (
        <div className=" flex flex-col lg:flex-row gap-8 min-h-full">

            {/* Left Panel: Controls */}
            <ImageGenerationForm
                prompt={prompt}
                onPromptChange={setPrompt}
                styles={imageStyles}
                selectedStyle={selectedStyle}
                onStyleChange={setSelectedStyle}
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