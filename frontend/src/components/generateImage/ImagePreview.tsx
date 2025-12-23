import React from 'react';
import { Loader2, LucideImage, Wand2 } from 'lucide-react';
import type { GeneratedImageResultProps } from '../../types';
import { PreviewHeader } from '../ui/PreviewHeader';

const ImagePreview: React.FC<GeneratedImageResultProps> = ({ images, isLoading }) => {
    const isInitialState = !images.length && !isLoading;
    return (
        <div className="w-full p-2 sm:p-4 bg-white rounded-xl shadow-md">
            <PreviewHeader
                title="Image Preview"
                icon={<LucideImage className="w-5 h-5 mr-2 text-purple-600" />}
                isDownload={true}
                downloadUrl={images[0]}
                downloadFilename="ai-generated-image.png"
            />


            <div className="min-h-[300px] sm:min-h-[600px] h-full mx-auto flex items-center justify-center border-t-2 border-gray-200 p-2 relative">

                {/* Images Grid */}
                {images.length > 0 && (
                    <div className="grid grid-cols-1 gap-4 w-full">
                        {images.map((imgSrc, index) => (
                            <div
                                key={index}
                                className="relative w-full rounded-lg overflow-hidden border border-gray-100 shadow-sm group"
                            >
                                <img
                                    src={imgSrc}
                                    alt={`AI Generated Image ${index + 1}`}
                                    className="w-full h-full object-cover transition-transform group-hover:scale-[1.03]"
                                />

                                {/* Download Button */}

                            </div>
                        ))}
                    </div>
                )}

                {/* Loading State */}
                {isLoading && (
                    <div className="absolute inset-0 flex flex-col items-center justify-center bg-white/90">
                        <Loader2 className="h-8 w-8 text-purple-600 animate-spin" />
                        <p className="mt-4 text-gray-600 font-medium">
                            Creating stunning visuals...
                        </p>
                    </div>
                )}

                {/* Empty State */}
                {isInitialState && (
                    <div className="flex flex-col items-center h-full justify-center text-center text-gray-500">
                        <Wand2 className="w-12 h-12 mb-3 text-gray-300" />
                        <p className="text-lg font-medium">
                            Describe your image and click "Generate Images"
                        </p>
                        <p className="text-sm mt-1">
                            Your AI-generated artwork will appear here.
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ImagePreview;
