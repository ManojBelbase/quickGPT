// src/pages/RemoveBackground.tsx
import React, { useState } from 'react';
import BackgroundRemovalForm from '../components/remove_background/BackgroundRemovalForm';
import ProcessedImageResult from '../components/remove_background/ProcessedImageResult';

const RemoveBackground: React.FC = () => {
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [processedImageUrl, setProcessedImageUrl] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const handleFileChange = (file: File | null) => {
        setSelectedFile(file);
        setProcessedImageUrl(null); // Clear previous result when a new file is chosen
    };

    const handleRemoveBackground = () => {
        if (!selectedFile) return;

        setIsLoading(true);
        setProcessedImageUrl(null);

        // Prepare payload for API integration
        // Note: In a real app, you would use FormData to send the file to the API.
        const payload = {
            fileName: selectedFile.name,
            fileType: selectedFile.type,
            fileSize: selectedFile.size,
            action: 'remove_background',
        };

        // Log the submission payload
        console.log('Background Removal Payload (Ready for API):', payload);

        // Simulate API call delay and successful processing
        setTimeout(() => {
            // Simulate receiving the processed image URL
            // In a real application, this would be the URL of the processed transparent image.
            const dummyProcessedImage = '/path/to/processed/image_transparent.png';

            setProcessedImageUrl(dummyProcessedImage);
            setIsLoading(false);
        }, 3000);
    };

    return (
        <div className=" flex flex-col lg:flex-row gap-2 sm:gap-4 min-h-full">

            {/* Left Panel: Controls */}
            <BackgroundRemovalForm
                onFileChange={handleFileChange}
                onRemoveBackground={handleRemoveBackground}
                selectedFile={selectedFile}
                isLoading={isLoading}
            />

            {/* Right Panel: Results */}
            <ProcessedImageResult
                imageUrl={processedImageUrl}
                isLoading={isLoading}
            />

        </div>
    );
};

export default RemoveBackground;