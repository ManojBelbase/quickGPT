import React from 'react';
import { Loader2, Wand2, Image } from 'lucide-react';
import type { ProcessedImageResultProps } from '../../types';
import { PreviewHeader } from '../ui/PreviewHeader';

export const ReplaceBackgroundPreview: React.FC<ProcessedImageResultProps> = ({ imageUrl, isLoading }) => {
    const isInitialState = !imageUrl && !isLoading;

    return (
        <div className="w-full p-2 sm:p-4 bg-white rounded-xl shadow-md">
            {/* Header */}

            <PreviewHeader
                title="Image Preview"
                icon={<Image className="w-5 h-5 mr-2 text-purple-600" />}
                isDownload={true}
                downloadUrl={imageUrl || ""}
                downloadFilename="quickgpt-background-replace.png"
            />


            {/* Container Box */}
            <div className="min-h-[300px] sm:min-h-[600px] h-full border-t-2 border-gray-200  p-2 relative flex flex-col items-center justify-center overflow-hidden">

                {/* Displaying Result */}
                {imageUrl && !isLoading && (
                    <div className="w-full h-full flex flex-col items-center justify-center p-2">
                        <div className="w-full rounded-lg overflow-hidden border border-gray-100 shadow-sm bg-gray-50">
                            <img
                                src={imageUrl}
                                alt="Object Removed Result"
                                className="w-full h-full max-h-[500px] object-contain block transition-transform hover:scale-[1.01]"
                            />
                        </div>

                    </div>
                )}

                {/* Loading State */}
                {isLoading && (
                    <div className="absolute inset-0 flex flex-col items-center justify-center bg-white/90 z-10">
                        <Loader2 className="h-10 w-10 text-purple-600 animate-spin" />
                        <p className="mt-4 text-gray-600 font-medium">Replacing Object, please wait...</p>
                        <p className="text-xs text-gray-400 mt-1">Our AI is cleaning up your image</p>
                    </div>
                )}

                {/* Initial/Empty State */}
                {isInitialState && (
                    <div className="flex flex-col items-center justify-center text-center h-full text-gray-500 animate-in fade-in duration-500">
                        <div className="bg-gray-50 p-6 rounded-full mb-4">
                            <Wand2 className="w-12 h-12 text-gray-300" />
                        </div>
                        <p className="text-lg font-medium text-gray-800 px-6">
                            Upload an image and describe what to remove
                        </p>
                        <p className="text-sm mt-2 text-gray-400 max-w-[280px]">
                            The processed image with your requested changes will appear here instantly.
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ReplaceBackgroundPreview;