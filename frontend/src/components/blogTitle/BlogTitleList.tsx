import React from "react";
import { FileText, Trash2, Loader2 } from "lucide-react";
import toast from "react-hot-toast";
import { useDeleteBlogTitle, useGetBlogTitles } from "../../hooks/useBlogTitles";
import ConfirmModal from "../shared/ConfirmModel";

interface BlogTitleListProps {
    onSelectTitle?: (title: string) => void;
}

const BlogTitleList: React.FC<BlogTitleListProps> = ({ onSelectTitle }) => {
    const { data: titles = [], isLoading, isError } = useGetBlogTitles();
    const { mutateAsync: deleteTitle } = useDeleteBlogTitle();
    const [deletingId, setDeletingId] = React.useState<string | null>(null);
    const [confirmId, setConfirmId] = React.useState<string | null>(null);

    const handleDelete = async (id: string) => {
        setDeletingId(id);
        try {
            await deleteTitle(id);
            toast.success("Blog title deleted");
        } catch {
            toast.error("Failed to delete");
        } finally {
            setDeletingId(null);
            setConfirmId(null);
        }
    };

    if (isError) return <p className="text-red-600 text-sm p-4">Failed to load titles</p>;

    return (
        <div className="bg-white p-2 sm:p-4 rounded-sm sm:rounded-sm shadow-sm overflow-y-auto">
            <h2 className="text-lg font-semibold mb-4">Your Blog Titles</h2>

            {isLoading && <p className="text-gray-500">Loading...</p>}
            {!isLoading && titles.length === 0 && <p className="text-gray-400 text-sm">No blog titles found</p>}

            <div className="space-y-2">
                {titles.map((title) => (
                    <div
                        key={title.id}
                        className="flex items-center justify-between cursor-pointer border border-gray-200 p-2 rounded-md hover:bg-gray-50 transition"
                        onClick={() => onSelectTitle?.(title.content)}
                    >
                        <div className="flex items-center gap-2 min-w-0">
                            <FileText className="w-4 h-4 text-purple-600 shrink-0" />
                            <p className="text-sm font-medium truncate" title={title.prompt}>
                                {title.prompt}
                            </p>
                        </div>

                        <button
                            onClick={(e) => {
                                e.stopPropagation();
                                setConfirmId(title.id); // open modal
                            }}
                            disabled={deletingId === title.id}
                            className="text-red-500 hover:text-red-600 transition"
                        >
                            {deletingId === title.id ? (
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
                title="Delete this blog title?"
                message="This action is permanent. Are you sure?"
                onConfirm={() => confirmId && handleDelete(confirmId)}
                onCancel={() => setConfirmId(null)}
            />
        </div>
    );
};

export default BlogTitleList;
