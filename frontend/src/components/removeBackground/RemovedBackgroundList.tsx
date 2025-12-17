import React, { useEffect, useState } from "react";
import { Image, Loader2 } from "lucide-react";
import api from "../../api/axiosInstance";
import type { Props, RemovedImage } from "../../types";
const RemovedBackgroundList: React.FC<Props> = ({ onSelectImage }) => {
    const [images, setImages] = useState<RemovedImage[]>([]);
    const [loading, setLoading] = useState(false);


    useEffect(() => {
        const fetchImages = async () => {
            setLoading(true);
            try {
                const { data } = await api.get("/remove-background");
                if (data?.status === "success") {
                    setImages(data.data);
                }

            } catch (error) {
                console.error("Failed to load images", error);
            } finally {
                setLoading(false);
            }
        };

        fetchImages();
    }, []);
    return (
        <div className="bg-white p-4 rounded-xl shadow-sm border-gray-200 h-fit">

            <h2 className="text-xl font-bold text-gray-900 flex items-center mb-2 sm:mb-4">
                <Image className="w-5 h-5 mr-2 text-purple-600" />
                Recent Removels
            </h2>

            {loading && (
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

            {!loading && images.length === 0 && (
                <p className="text-sm text-gray-400 mt-2">
                    No processed images yet
                </p>
            )}
        </div>
    );
};

export default RemovedBackgroundList;
