import React from "react";
import { CheckCircle2 } from "lucide-react";

interface SocialPostListProps {
    posts: string[];
}

const SocialPostList: React.FC<SocialPostListProps> = ({ posts }) => {
    if (!posts.length) {
        return (
            <div className="text-center text-gray-400 py-20 bg-white rounded-xl border-2 border-dashed border-gray-100">
                <p className="font-medium">No posts yet</p>
            </div>
        );
    }

    return (
        <div className="grid grid-cols-1 gap-4">
            {posts.map((post, idx) => (
                <div key={idx} className="relative rounded-xl bg-white border p-4 shadow-sm cursor-pointer hover:shadow-md transition">
                    <p className="text-gray-800 text-sm">{post}</p>
                    <div className="absolute top-2 right-2 flex items-center gap-1 bg-purple-500/90 text-white text-[10px] font-bold px-2 py-1 rounded-full shadow-sm">
                        <CheckCircle2 className="w-3 h-3" />
                        GENERATED
                    </div>
                </div>
            ))}
        </div>
    );
};

export default SocialPostList;
