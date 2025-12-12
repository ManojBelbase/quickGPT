// src/components/image_editor/ProcessedImageResult.tsx
import React from 'react';
import { Wand2, Loader2, Eraser } from 'lucide-react';

interface ProcessedImageResultProps {
    imageUrl: string | null;
    isLoading: boolean;
}

const ProcessedImageResult: React.FC<ProcessedImageResultProps> = ({ imageUrl, isLoading }) => {
    const isInitialState = !imageUrl && !isLoading;

    return (
        <div className="w-full lg:w-2/3 p-6 bg-white rounded-xl shadow-md">
            <h2 className="text-xl font-bold text-gray-900 flex items-center mb-6">
                <Wand2 className="w-5 h-5 mr-2 text-red-500" />
                Processed Image
            </h2>

            <div className="min-h-[400px] border border-gray-200 rounded-lg p-4 relative flex items-center justify-center">

                {/* Displaying Result */}
                {imageUrl && (
                    <div className="max-w-full max-h-full p-6 bg-gray-100/50 rounded-lg shadow-inner">
                        <img
                            src={imageUrl}
                            alt="Background Removed"
                            className="max-w-full max-h-[350px] object-contain block"
                        />
                        <p className="mt-4 text-center text-sm text-green-600 font-medium">Processing Complete!</p>
                    </div>
                )}

                {/* Loading State */}
                {isLoading && (
                    <div className="absolute inset-0 flex flex-col items-center justify-center bg-white/90">
                        <Loader2 className="h-8 w-8 text-red-500 animate-spin" />
                        <p className="mt-4 text-gray-600 font-medium">Removing background, please wait...</p>
                    </div>
                )}

                {/* Initial/Empty State */}
                {isInitialState && (
                    <div className="flex flex-col items-center justify-center text-center h-full text-gray-500">
                        <Eraser className="w-12 h-12 mb-3 text-gray-300" />
                        <p className="text-lg font-medium">Upload an image and click "Remove Background" to get started</p>
                        <p className="text-sm mt-1">The processed image (with transparent background) will appear here.</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ProcessedImageResult;