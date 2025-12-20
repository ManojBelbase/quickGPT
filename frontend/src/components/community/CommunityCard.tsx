import React, { useState } from "react";
import { Heart } from "lucide-react";
import type { CommunityCardProps } from "../../types";

const DOUBLE_TAP_DELAY = 300;

export const CommunityCard: React.FC<CommunityCardProps> = ({
    image,
    onLike,
    currentUserId,
}) => {
    const [lastTap, setLastTap] = useState(0);
    const [showHeartAnim, setShowHeartAnim] = useState(false);

    const isLiked = image.likes?.includes(currentUserId);

    /* ===========================
       DOUBLE TAP HANDLER (MOBILE)
    ============================ */
    const handleImageTouch = () => {
        const now = Date.now();

        if (now - lastTap < DOUBLE_TAP_DELAY) {
            if (!isLiked) {
                onLike();
                setShowHeartAnim(true);
                setTimeout(() => setShowHeartAnim(false), 700);
            }
        }

        setLastTap(now);
    };

    return (
        <div
            className="group relative bg-white rounded-lg overflow-hidden
            shadow-md hover:shadow-2xl transition-all duration-500
            border border-gray-100"
        >
            {/* IMAGE (DOUBLE TAP TARGET) */}
            <div
                className="relative overflow-hidden touch-manipulation"
                onTouchEnd={handleImageTouch}
            >
                <img
                    src={image.content}
                    alt={image.prompt}
                    loading="lazy"
                    className="w-full h-full object-cover
                    transition-transform duration-1000 group-hover:scale-110"
                />

                {/* HEART ANIMATION */}
                {showHeartAnim && (
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-30">
                        <Heart className="w-24 h-24 text-white fill-white opacity-80 animate-ping" />
                    </div>
                )}
            </div>

            {/* DESKTOP OVERLAY (HOVER) */}
            <div
                className="
                absolute inset-0 bg-linear-to-t from-black/90 via-black/20 to-transparent
                opacity-100 sm:opacity-0 sm:group-hover:opacity-100
                transition-opacity duration-300
                flex flex-col justify-end p-6 sm:p-8
                pointer-events-none sm:pointer-events-auto
            "
            >
                <p className="text-white text-sm font-medium mb-2 line-clamp-3">
                    {image.prompt}
                </p>

                <div className="flex justify-between items-center border-t border-white/10 pt-4">
                    <button
                        onClick={(e) => {
                            e.stopPropagation();
                            onLike();
                        }}
                        className={`pointer-events-auto cursor-pointer z-20
                        flex items-center gap-2 px-4 py-2 rounded-2xl
                        transition-all active:scale-90
                        ${isLiked
                                ? "bg-red-500 text-white hover:bg-red-600"
                                : "bg-white/10 backdrop-blur-md text-white border border-white/20 hover:bg-white/20"
                            }`}
                    >
                        <Heart
                            className={`w-5 h-5 ${isLiked ? "fill-white" : ""}`}
                        />
                        <span className="font-bold">
                            {image.likes?.length || 0}
                        </span>
                    </button>
                </div>
            </div>

            {/* MOBILE FOOTER (PRIMARY LIKE BUTTON) */}
            <div className="sm:hidden flex items-center justify-between p-4 bg-white">
                <p className="text-xs text-gray-500 truncate w-2/3">
                    {image.prompt}
                </p>

                <button
                    onClick={(e) => {
                        e.stopPropagation();
                        onLike();
                    }}
                    className="flex items-center gap-1 text-red-500 font-bold active:scale-95"
                >
                    <Heart
                        className={`w-4 h-4 ${isLiked ? "fill-red-500" : ""}`}
                    />
                    {image.likes?.length || 0}
                </button>
            </div>
        </div>
    );
};
