import { useState } from 'react';
import ObjectRemovalForm from '../components/remove_object/ObjectRemovalForm';

const RemoveObject: React.FC = () => {
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [objectDescription, setObjectDescription] = useState<string>('car in background, tree from the image');
    const [processedImageUrl, setProcessedImageUrl] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const handleFileChange = (file: File | null) => {
        setSelectedFile(file);
        setProcessedImageUrl(null); // Clear previous result when a new file is chosen
    };

    const handleObjectRemoval = () => {
        const trimmedDescription = objectDescription.trim();
        if (!selectedFile || !trimmedDescription) return;

        setIsLoading(true);
        setProcessedImageUrl(null);

        // Prepare payload for API integration
        // Note: In a real app, you would use FormData to send the file.
        const payload = {
            fileName: selectedFile.name,
            fileType: selectedFile.type,
            fileSize: selectedFile.size,
            objectDescription: trimmedDescription,
            action: 'remove_object',
        };

        // Log the submission payload
        console.log('Object Removal Payload (Ready for API):', payload);

        // Simulate API call delay and successful processing
        setTimeout(() => {
            // Simulate receiving the processed image URL
            const dummyProcessedImage = '/path/to/processed/image_no_object.png';

            setProcessedImageUrl(dummyProcessedImage);
            setIsLoading(false);
        }, 3500);
    };

    return (
        <div className="flex flex-col lg:flex-row gap-2 sm:gap-4 min-h-full">

            {/* Left Panel: Controls */}
            <ObjectRemovalForm
                onFileChange={handleFileChange}
                onObjectRemoval={handleObjectRemoval}
                selectedFile={selectedFile}
                objectDescription={objectDescription}
                onDescriptionChange={setObjectDescription}
                isLoading={isLoading}
            />

            {/* Right Panel: Results */}
            {/* <ProcessedImageResult
                imageUrl={processedImageUrl}
                isLoading={isLoading}
            /> */}

        </div>
    );
};

export default RemoveObject;