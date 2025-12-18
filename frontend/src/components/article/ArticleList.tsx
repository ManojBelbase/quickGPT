import React from "react";
import { FileText, Trash2, Loader2 } from "lucide-react";
import { useGetArticles, useDeleteArticle } from "../../hooks/useArticles";
import type { ArticleListProps } from "../../types";
import toast from "react-hot-toast";

const ArticleList: React.FC<ArticleListProps> = ({ onSelectArticle }) => {
    const { data: articles = [], isLoading, isError } = useGetArticles();
    const { mutateAsync: deleteArticle } = useDeleteArticle();

    const [deletingId, setDeletingId] = React.useState<string | null>(null);

    const handleDelete = async (e: React.MouseEvent, id: string) => {
        e.stopPropagation();

        if (!confirm("Delete this article permanently?")) return;

        setDeletingId(id);

        try {
            await deleteArticle(id);
            toast.success("Article deleted successfully");
        } catch (error) {
            toast.error("Failed to delete article");
        } finally {
            setDeletingId(null);
        }
    };

    if (isError) {
        return (
            <div className="p-4 text-red-600 text-sm">
                Failed to load articles. Please try again later.
            </div>
        );
    }

    return (
        <div className="bg-white rounded-xs shadow-sm flex flex-col">
            <div className="px-4 pt-2 shrink-0">
                <h2 className="text-lg font-semibold">Your Articles</h2>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-2">
                {isLoading && (
                    <div className="flex items-center gap-2 text-sm text-gray-500">
                        <Loader2 className="w-4 h-4 animate-spin" />
                        Loading articles...
                    </div>
                )}

                {!isLoading && articles.length === 0 && (
                    <p className="text-sm text-gray-400">No articles found</p>
                )}

                {articles.map((article) => (
                    <div
                        key={article.id}
                        onClick={() => onSelectArticle(article.content)}
                        className="cursor-pointer border border-gray-200 p-2 rounded-sm hover:bg-gray-50 transition"
                    >
                        <div className="flex items-center justify-between gap-2">
                            <div className="flex items-center gap-1 min-w-0">
                                <FileText className="w-4 h-4 text-purple-600 shrink-0" />
                                <p className="font-medium text-sm truncate" title={article.prompt}>
                                    {article.prompt}
                                </p>
                            </div>

                            <button
                                onClick={(e) => handleDelete(e, article.id)}
                                disabled={deletingId === article.id}
                                className="text-red-500 hover:text-red-600 shrink-0 disabled:opacity-50 transition"
                            >
                                {deletingId === article.id ? (
                                    <Loader2 className="w-4 h-4 animate-spin" />
                                ) : (
                                    <Trash2 className="w-4 h-4" />
                                )}
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ArticleList;