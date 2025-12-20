// src/components/replaceBackground/ReplaceBackgroundList.tsx
import React from "react";
import { Image, Loader2 } from "lucide-react";
import { useGetReplacedBackgrounds } from "../../hooks/useReplaceBackground";

interface ReplaceBackgroundListProps {
    onSelectImage?: (url: string) => void;
}

const ReplaceBackgroundList: React.FC<ReplaceBackgroundListProps> = ({ onSelectImage }) => {
    const { data: images = [], isLoading, isError } = useGetReplacedBackgrounds();

    const extractImageUrl = (content: string): string => {
        const match = content.match(/https:\/\/res\.cloudinary\.com\/[^\s"]+/);
        return match ? match[0] : "/placeholder.png";
    };

    if (isError) {
        return <p className="text-red-600 text-sm p-4">Failed to load history</p>;
    }

    return (
        <div className="bg-white p-2 sm:p-4 rounded-xl shadow-sm border border-gray-200 h-fit">
            <h2 className="text-xl font-bold text-gray-900 flex items-center mb-4">
                <Image className="w-5 h-5 mr-2 text-indigo-600" />
                Recent Replacements
            </h2>

            {isLoading && (
                <div className="flex items-center gap-2 text-gray-500 text-sm py-4">
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Loading history...
                </div>
            )}

            {!isLoading && images.length > 0 && (
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    {images.map((img) => {
                        const imageUrl = extractImageUrl(img.content);

                        return (
                            <button
                                key={img.id}
                                onClick={() => onSelectImage?.(imageUrl)}
                                className="aspect-square cursor-pointer rounded-lg overflow-hidden border border-gray-200 hover:ring-2 hover:ring-indigo-400 transition-all duration-200"
                                title={`Background: ${img.prompt}`}
                            >
                                <img
                                    src={imageUrl}
                                    alt={`Background: ${img.prompt}`}
                                    className="w-full h-full object-cover"
                                    loading="lazy"
                                />
                            </button>
                        );
                    })}
                </div>
            )}

            {!isLoading && images.length === 0 && (
                <p className="text-sm text-gray-400 py-4 text-center">
                    No background replacements yet
                </p>
            )}
        </div>
    );
};

export default ReplaceBackgroundList;