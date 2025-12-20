import React from "react";
import { Image, Loader2, Wand2 } from "lucide-react";

interface Props {
    imageUrl: string | null;
    isLoading: boolean;
}

export const ProcessedImagePreview: React.FC<Props> = ({ imageUrl, isLoading }) => {
    const isInitialState = !imageUrl && !isLoading;

    return (
        <div className="w-full p-2 sm:p-4 bg-white rounded-xl shadow-sm">
            <h2 className="text-xl font-bold text-gray-900 flex items-center mb-2 sm:mb-4">
                <Image className="w-5 h-5 mr-2 text-purple-600" />
                Image Preview
            </h2>

            <div className="min-h-[300px] sm:min-h-[500px] flex items-center justify-center h-full border-t-2 border-gray-200 relative overflow-hidden">

                {/* Display Processed Image */}
                {imageUrl && !isLoading && (
                    <div className="h-full w-full flex items-center justify-center">
                        <img
                            src={imageUrl}
                            alt="Background removed"
                            className="max-w-full max-h-full object-contain rounded-lg border border-gray-200 transition-transform duration-300 hover:scale-[1.03]"
                        />
                    </div>
                )}

                {/* Loading State Overlay */}
                {isLoading && (
                    <div className="absolute inset-0 flex flex-col h-full items-center justify-center bg-white/90 backdrop-blur-sm rounded-lg">
                        <Loader2 className="h-10 w-10 text-purple-600 animate-spin" />
                        <p className="mt-4 text-gray-700 font-medium text-lg">
                            Removing background...
                        </p>
                        <p className="text-sm text-gray-500 mt-1">
                            This usually takes a few seconds
                        </p>
                    </div>
                )}

                {/* Initial Empty State */}
                {isInitialState && (
                    <div className="h-full flex flex-col  items-center justify-center text-center text-gray-500">
                        <Wand2 className="w-16 h-16 mb-4 text-gray-300" />
                        <p className="text-lg font-medium">
                            Upload an image to remove its background
                        </p>
                        <p className="text-sm mt-2 max-w-sm">
                            Your processed image with transparent background will appear here
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ProcessedImagePreview;