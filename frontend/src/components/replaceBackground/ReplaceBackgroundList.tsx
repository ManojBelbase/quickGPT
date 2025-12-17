import React, { useEffect, useState } from "react";
import { Scissors, Loader2 } from "lucide-react";
import api from "../../api/axiosInstance";
import type { RemovedObjectImage } from "../../types";


interface Props {
    onSelectImage?: (imageUrl: string) => void;
}

const ReplaceBackgroundList: React.FC<Props> = ({ onSelectImage }) => {
    const [images, setImages] = useState<RemovedObjectImage[]>([]);
    const [loading, setLoading] = useState(true);

    // Helper to extract actual Cloudinary URL from the saved content string
    const extractImageUrl = (content: string): string => {
        const match = content.match(/https:\/\/res\.cloudinary\.com\/[^\s]+/);
        return match ? match[0] : "/placeholder.png";
    };

    useEffect(() => {
        const fetchImages = async () => {
            setLoading(true);
            try {
                const { data } = await api.get("/remove-object");

                if (data?.status === "success") {
                    setImages(data.data);
                }
            } catch (error) {
                console.error("Failed to load remove-object history", error);
            } finally {
                setLoading(false);
            }
        };

        fetchImages();
    }, []);

    return (
        <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-200 h-fit">
            <h2 className="text-xl font-bold text-gray-900 flex items-center mb-2 sm:mb-4">
                <Scissors className="w-5 h-5 mr-2 text-indigo-600" />
                Recent Replaced Images
            </h2>

            {loading && (
                <div className="flex items-center gap-2 text-gray-500 text-sm py-4">
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Loading history...
                </div>
            )}

            {!loading && images.length > 0 && (
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    {images.map((img) => {
                        const imageUrl = extractImageUrl(img.content);

                        return (
                            <button
                                key={img.id}
                                onClick={() => onSelectImage?.(imageUrl)}
                                className="aspect-square cursor-pointer rounded-lg overflow-hidden border border-gray-200 hover:ring-2 hover:ring-indigo-400 hover:border-indigo-400 transition-all duration-200"
                                title={`Removed: ${img.prompt}`}
                            >
                                <img
                                    src={imageUrl}
                                    alt={`Removed object: ${img.prompt}`}
                                    className="w-full h-full object-cover"
                                    loading="lazy"
                                />
                            </button>
                        );
                    })}
                </div>
            )}

            {!loading && images.length === 0 && (
                <p className="text-sm text-gray-400 py-4 text-center">
                    No object removals yet
                </p>
            )}
        </div>
    );
};

export default ReplaceBackgroundList;