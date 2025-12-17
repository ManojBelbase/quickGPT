import React, { useEffect, useState } from "react";
import api from "../../api/axiosInstance";
import { Image, Loader2, CheckCircle2 } from "lucide-react";
import type { UserImage } from "../../types";

interface ImageListProps {
    onSelectImage: (url: string) => void;
}

const ImageList: React.FC<ImageListProps> = ({ onSelectImage }) => {
    const [images, setImages] = useState<UserImage[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [activeId, setActiveId] = useState<string | null>(null);

    useEffect(() => {
        const fetchImages = async () => {
            setLoading(true);
            try {
                const { data } = await api.get("/image");
                if (data?.status === "success") setImages(data.data);
            } catch (error) {
                console.error("Failed to load images", error);
            } finally {
                setLoading(false);
            }
        };
        fetchImages();
    }, []);

    return (
        <div className="w-full p-4 bg-white  border border-gray-200  rounded-xl shadow-md">
            <h2 className="text-xl font-bold text-gray-900 flex items-center mb-6">
                <Image className="w-5 h-5 mr-2 text-purple-600" />
                My Gallery
            </h2>

            {loading && (
                <div className="flex justify-center items-center h-64">
                    <Loader2 className="h-8 w-8 animate-spin text-purple-600" />
                </div>
            )}

            {!loading && images.length === 0 && (
                <div className="text-center text-gray-400 py-20 bg-white rounded-xl border-2 border-dashed border-gray-100">
                    <Image className="w-12 h-12 mx-auto mb-3 opacity-20" />
                    <p className="font-medium">No creations yet</p>
                </div>
            )}

            <div className="grid grid-cols-2 gap-4">
                {images.map((img) => (
                    <div
                        key={img.id}
                        onClick={() => {
                            onSelectImage(img.content);
                            setActiveId(img.id);
                        }}
                        className={`relative group cursor-pointer rounded-xl overflow-hidden bg-white border-2 transition-all duration-300 ${activeId === img.id ? 'border-purple-500 ring-2 ring-purple-100' : 'border-transparent hover:border-gray-200 shadow-sm'
                            }`}
                    >
                        {/* Status Badge - Top Right */}
                        {img.publish && (
                            <div className="absolute top-2 right-2 z-10 flex items-center gap-1 bg-purple-500/90 backdrop-blur-sm text-white text-[10px] font-bold px-2 py-1 rounded-full shadow-sm">
                                <CheckCircle2 className="w-3 h-3" />
                                PUBLISHED
                            </div>
                        )}

                        {/* Image Container */}
                        <div className="aspect-square overflow-hidden bg-gray-100">
                            <img
                                src={img.content}
                                alt={img.prompt}
                                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                            />
                        </div>

                        {/* Prompt Overlay on Hover */}
                        <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-3">
                            <p className="text-white text-[11px] line-clamp-2 leading-tight">
                                {img.prompt}
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ImageList;