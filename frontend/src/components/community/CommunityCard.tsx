import React, { useRef, useState } from 'react';
import { Heart } from 'lucide-react';
import type { CommunityCardProps } from '../../types';

export const CommunityCard: React.FC<CommunityCardProps> = ({
    image,
    onLike,
    currentUserId,
}) => {
    const lastTapRef = useRef<number>(0);
    const [showHeartAnim, setShowHeartAnim] = useState(false);

    const isLiked = image.likes?.some((like: any) => like.userId === currentUserId);
    const isLikedByCurrentUser = image.likes?.includes(currentUserId);

    const handleInteraction = (e: React.MouseEvent | React.TouchEvent) => {
        if (e.type === 'touchend') {
            e.preventDefault();
        }

        const now = Date.now();
        const delta = now - lastTapRef.current;

        if (delta < 300 && delta > 50) {
            if (!isLiked) {
                onLike();
                setShowHeartAnim(true);
                setTimeout(() => setShowHeartAnim(false), 800);
            }
        }

        lastTapRef.current = now;
    };

    return (
        <div
            onClick={handleInteraction}
            onTouchEnd={handleInteraction}
            className="group relative bg-white rounded-lg overflow-hidden shadow-md hover:shadow-2xl transition-all duration-500 border border-gray-100 cursor-pointer"
        >
            {/* Image Section */}
            <div className="relative overflow-hidden aspect-square">
                <img
                    src={image.content}
                    alt={image.prompt}
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                />

                {/* Big heart animation */}
                {showHeartAnim && (
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-30">
                        <Heart className="w-32 h-32 text-red-500 fill-red-500 animate-ping-once" />
                    </div>
                )}
            </div>

            {/* Bottom overlay on hover */}
            <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-2 sm:p-6">
                <p className="text-white text-sm font-medium leading-snug mb-4 line-clamp-3">
                    {image.prompt}
                </p>

                <div className="flex items-center justify-between border-t border-white/10 pt-4">
                    <button
                        onClick={(e) => {
                            e.stopPropagation();
                            onLike();
                        }}
                        className={`flex cursor-pointer  items-center gap-2 px-5 py-2 rounded-2xl transition-all active:scale-90 ${isLikedByCurrentUser
                            ? 'bg-red-500 text-white hover:bg-red-600'
                            : 'bg-white/10 backdrop-blur-md text-white border border-white/20 hover:bg-white/20'
                            }`}
                    >
                        <Heart
                            className={`w-5 h-5 transition-colors
            ${isLikedByCurrentUser ? 'text-white fill-red-500' : 'text-white'} `}
                        />
                        <span className="font-bold">
                            {image.likes?.length || 0}
                        </span>
                    </button>
                </div>
            </div>

            {/* Mobile footer */}
            <div className="sm:hidden p-4 flex justify-between items-center bg-white">
                <p className="text-xs text-gray-700  w-2/3">{image.prompt}</p>
                <div className="flex items-center gap-1 text-red-500 font-bold">
                    <Heart className={`w-4 h-4 ${isLikedByCurrentUser ? 'fill-red-500' : ''}`} />
                    {image.likes?.length || 0}
                </div>
            </div>
        </div>
    );
};