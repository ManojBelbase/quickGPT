// src/components/removeBackground/RemovedBackgroundList.tsx
import React from "react";
import { Image, Loader2 } from "lucide-react";
import { useGetRemovedImages } from "../../hooks/useRemoveBackground";

interface RemovedBackgroundListProps {
    onSelectImage?: (url: string) => void;
}

const RemovedBackgroundList: React.FC<RemovedBackgroundListProps> = ({ onSelectImage }) => {
    const { data: images = [], isLoading, isError } = useGetRemovedImages();

    if (isError) {
        return (
            <div className="text-center text-red-600 text-sm p-4">
                Failed to load processed images
            </div>
        );
    }

    return (
        <div className="bg-white p-4 rounded-xl shadow-sm border-gray-200 h-fit">
            <h2 className="text-xl font-bold text-gray-900 flex items-center mb-2 sm:mb-4">
                <Image className="w-5 h-5 mr-2 text-purple-600" />
                Recent Removals
            </h2>

            {isLoading && (
                <div className="flex items-center gap-2 text-gray-500 text-sm">
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Loading...
                </div>
            )}

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {images.map((img) => (
                    <button
                        key={img.id}
                        onClick={() => onSelectImage?.(img.content)}
                        className="aspect-square cursor-pointer rounded-lg overflow-hidden border border-gray-200 hover:ring-2 hover:ring-purple-400 transition"
                    >
                        <img
                            src={img.content}
                            alt="Removed background"
                            className="w-full h-full object-cover"
                        />
                    </button>
                ))}
            </div>

            {!isLoading && images.length === 0 && (
                <p className="text-sm text-gray-400 mt-2">
                    No processed images yet
                </p>
            )}
        </div>
    );
};

export default RemovedBackgroundList;