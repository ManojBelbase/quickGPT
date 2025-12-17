import React from 'react';
import { Image, Loader2, Wand2 } from 'lucide-react';
import type { GeneratedImageResultProps } from '../../types';

const ImagePreview: React.FC<GeneratedImageResultProps> = ({ images, isLoading }) => {
    const isInitialState = !images.length && !isLoading;
    console.log(images, "hdh")

    return (
        <div className="w-full  p-4 bg-white rounded-xl shadow-md">
            <h2 className="text-xl font-bold text-gray-900 flex items-center mb-2 sm:mb-4">
                <Image className="w-5 h-5 mr-2 text-green-600" />
                Image Preview
            </h2>

            <div className="min-h-[600px] h-full border border-gray-200 rounded-lg p-2 relative">

                {/* Displaying Results Grid */}
                {images.length > 0 && (
                    <div className="grid grid-cols-1 gap-4">
                        {images.map((imgSrc, index) => (
                            <div
                                key={index}
                                className=" w-full rounded-lg overflow-hidden border border-gray-100 shadow-sm"
                            >
                                <img
                                    src={imgSrc}
                                    alt={`AI Generated Image ${index + 1}`}
                                    className="w-full h-full object-cover transition-transform hover:scale-[1.03]"
                                />
                            </div>
                        ))}
                    </div>
                )}

                {/* Loading State */}
                {isLoading && (
                    <div className="absolute inset-0 flex flex-col items-center justify-center bg-white/90">
                        <Loader2 className="h-8 w-8 text-green-600 animate-spin" />
                        <p className="mt-4 text-gray-600 font-medium">Creating stunning visuals...</p>
                    </div>
                )}

                {/* Initial/Empty State */}
                {isInitialState && (
                    <div className="flex flex-col items-center justify-center text-center h-full text-gray-500">
                        <Wand2 className="w-12 h-12 mb-3 text-gray-300" />
                        <p className="text-lg font-medium">Describe your image and click "Generate Images" to get started</p>
                        <p className="text-sm mt-1">Your AI-generated artwork will appear here in a grid.</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ImagePreview;