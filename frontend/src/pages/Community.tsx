import React, { useEffect, useState } from "react";
import api from "../api/axiosInstance";
import { Loader2 } from "lucide-react";
import type { UserImage } from "../types";
import { useAuth } from "@clerk/clerk-react";
import toast from "react-hot-toast";
import { CommunityCard } from "../components/community/CommunityCard";

const Community: React.FC = () => {
    const [images, setImages] = useState<UserImage[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const { userId } = useAuth()
    const currentUserId = userId as string;

    const fetchPublishedImages = async () => {
        try {
            const { data } = await api.get("/image/published");
            if (data?.status === "success") {
                setImages(data.data);
            }
        } catch (error) {
            console.error("Failed to fetch community images", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchPublishedImages();
    }, []);

    const handleToggleLike = async (imageId: string) => {
        try {
            const { data } = await api.post("/image/toggle-like", { id: imageId });

            if (data?.status === "success") {
                const isLikedNow = data.message === "Liked";
                toast.success(data.message, {
                    icon: isLikedNow ? '❤️' : '💔',
                    style: {
                        borderRadius: '12px',
                        background: '#333',
                        color: '#fff',
                    },
                });

                // 2. Update the local state with the new likes array
                setImages(prev => prev.map(img =>
                    img.id === imageId ? { ...img, likes: data.data.likes } : img
                ));
            }
        } catch (error: any) {
            toast.error(error.response?.data?.message || "Failed to update like");
        }
    };

    return (
        <div className=" bg-[#fafafa]">
            {/* Hero Header */}
            <div className="bg-white border-b border-gray-100 py-5 px-6 mb-6">
                <div className="max-w-4xl mx-auto text-center">

                    <h1 className="text-4xl font-black text-gray-900 mb-6 tracking-tight">
                        Community Art Gallery
                    </h1>
                    <p className="text-gray-500 text-base sm:text-lg max-w-xl mx-auto">
                        Discover the most liked and recently generated masterpieces from our community of creators.
                    </p>
                </div>
            </div>

            {loading ? (
                <div className="flex flex-col justify-center items-center h-64 gap-4">
                    <Loader2 className="w-12 h-12 animate-spin text-purple-600" />
                    <p className="text-gray-400 font-medium animate-pulse">Curating gallery...</p>
                </div>
            ) : (
                <div className="mx-auto px-6">
                    <div className="grid lg:grid-cols-3 grid-cols-2 gap-4">
                        {images.map((img) => (
                            <div key={img.id} className="">
                                <CommunityCard
                                    image={img}
                                    onLike={() => handleToggleLike(img.id)}
                                    currentUserId={currentUserId}
                                />
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default Community;