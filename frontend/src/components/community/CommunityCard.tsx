import React, { useState } from 'react';
import { Heart } from 'lucide-react';
import type { CommunityCardProps } from '../../types';


export const CommunityCard: React.FC<CommunityCardProps> = ({ image, onLike, currentUserId }) => {
    const [lastTap, setLastTap] = useState<number>(0);
    const [showHeartAnim, setShowHeartAnim] = useState(false);
    const isLiked = image.likes?.includes(currentUserId);

    const handleDoubleTap = () => {
        const now = Date.now();
        if (now - lastTap < 300) {
            if (!isLiked) {
                onLike()
                setShowHeartAnim(true);
                setTimeout(() => setShowHeartAnim(false), 800);
            }
        }
        setLastTap(now);
    };


    return (
        <div
            onClick={handleDoubleTap}
            className="group relative bg-white rounded-lg overflow-hidden shadow-md hover:shadow-2xl transition-all duration-500 border border-gray-100  cursor-pointer"
        >
            {/* Image Section */}
            <div className="relative overflow-hidden aspect-auto">
                <img
                    src={image.content}
                    alt={image.prompt}
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                />

                {/* Visual Feedback for Double Tap */}
                {showHeartAnim && (
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-30">
                        <Heart className="w-24 h-24 text-white fill-white animate-bounce opacity-80" />
                    </div>
                )}


            </div>

            {/* Bottom Content Overlay */}
            <div className="absolute inset-0 bg-linear-to-t from-black/90 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-8">
                <p className="text-white text-sm font-medium leading-snug mb-2 line-clamp-3">
                    {image.prompt}
                </p>

                <div className="flex items-center justify-between border-t border-white/10 pt-6">


                    <button
                        onClick={(e) => {
                            e.stopPropagation();
                            onLike();
                        }}
                        className={`flex cursor-pointer items-center gap-2 px-5 py-2 rounded-2xl transition-all active:scale-90 ${isLiked
                            ? 'bg-red-500 text-white hover:bg-red-600'
                            : 'bg-white/10 backdrop-blur-md text-white border border-white/20 hover:bg-white/20'
                            }`}
                    >
                        <Heart
                            className={`w-5 h-5 transition-colors
            ${isLiked ? 'fill-white text-white' : 'text-white'}
        `}
                        />
                        <span className="font-bold">
                            {image.likes?.length || 0}
                        </span>
                    </button>

                </div>
            </div>

            {/* Mobile Footer (Visible when not hovering) */}
            <div className="sm:hidden p-4 flex justify-between items-center bg-white">
                <p className="text-xs text-gray-500 truncate w-2/3">{image.prompt}</p>
                <div className="flex items-center gap-1 text-red-500 font-bold">
                    <Heart className={`w-4 h-4 ${isLiked ? 'fill-red-500' : ''}`} />
                    {image.likes?.length || 0}
                </div>
            </div>
        </div>
    );
};