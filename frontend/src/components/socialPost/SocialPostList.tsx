// src/components/socialPost/SocialPostList.tsx
import React from "react";
import { Trash2, Loader2, Sparkles } from "lucide-react";
import toast from "react-hot-toast";
import { useDeleteSocialPost, useGetUserSocialPosts } from "../../hooks/useSocialPosts";
import ConfirmModal from "../shared/ConfirmModel";

interface SocialPostListProps {
    onSelectPost?: (post: string) => void;
}

const SocialPostList: React.FC<SocialPostListProps> = ({ onSelectPost }) => {
    const { data: posts = [], isLoading, isError } = useGetUserSocialPosts();
    const { mutateAsync: deletePost } = useDeleteSocialPost();
    const [deletingId, setDeletingId] = React.useState<string | null>(null);
    const [confirmId, setConfirmId] = React.useState<string | null>(null);
    console.log(posts, "o")

    const handleDelete = async (id: string) => {
        setDeletingId(id);
        try {
            await deletePost(id);
            toast.success("Social post deleted");
        } catch {
            toast.error("Failed to delete");
        } finally {
            setDeletingId(null);
            setConfirmId(null);
        }
    };

    if (isError) return <p className="text-red-600 text-sm p-4">Failed to load posts</p>;

    return (
        <div className="bg-white p-2 sm:p-4 rounded-sm sm:rounded-sm shadow-sm overflow-y-auto">
            <h2 className="text-lg font-semibold mb-4">Your Generated Posts</h2>

            {isLoading && <p className="text-gray-500">Loading...</p>}
            {!isLoading && posts.length === 0 && <p className="text-gray-400 text-sm">No posts found</p>}

            <div className="space-y-2">
                {posts.map((post) => (
                    <div
                        key={post.id}
                        className="flex items-center justify-between cursor-pointer border border-gray-200 p-2 rounded-md hover:bg-gray-50 transition"
                        onClick={() => onSelectPost?.(post.content)}
                    >
                        <div className="flex items-center gap-2 min-w-0">
                            <Sparkles className="w-4 h-4 text-purple-600 shrink-0" />
                            <p className="text-sm font-medium truncate" title={post.prompt}>
                                {post.prompt}
                            </p>
                        </div>

                        <button
                            onClick={(e) => {
                                e.stopPropagation();
                                setConfirmId(post.id); // open modal
                            }}
                            disabled={deletingId === post.id}
                            className="text-red-500 hover:text-red-600 transition"
                        >
                            {deletingId === post.id ? (
                                <Loader2 className="w-4 h-4 animate-spin" />
                            ) : (
                                <Trash2 className="w-4 h-4" />
                            )}
                        </button>
                    </div>
                ))}
            </div>

            {/* Confirm Modal */}
            <ConfirmModal
                isOpen={!!confirmId}
                title="Delete this social post?"
                message="This action is permanent. Are you sure?"
                onConfirm={() => confirmId && handleDelete(confirmId)}
                onCancel={() => setConfirmId(null)}
            />
        </div>
    );
};

export default SocialPostList;