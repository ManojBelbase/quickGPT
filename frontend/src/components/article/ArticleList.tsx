import React, { useEffect, useState } from "react";
import { FileText, Trash2 } from "lucide-react";
import api from "../../api/axiosInstance";
import type { Article, ArticleListProps } from "../../types";
import toast from "react-hot-toast";

const ArticleList: React.FC<ArticleListProps> = ({ onSelectArticle }) => {
    const [articles, setArticles] = useState<Article[]>([]);
    const [loading, setLoading] = useState(true);
    const [deletingId, setDeletingId] = useState<string | null>(null);

    useEffect(() => {
        const fetchArticles = async () => {
            try {
                const { data } = await api.get("/article");
                if (data?.status === "success") {
                    setArticles(data.data);
                }
            } catch (error) {
                toast.error("Failed to load articles");
            } finally {
                setLoading(false);
            }
        };

        fetchArticles();
    }, []);

    const handleDelete = async (id: string) => {
        if (!confirm("Delete this article permanently?")) return;

        setDeletingId(id);

        try {
            const { data } = await api.delete(`/article/${id}`);

            if (data?.status === "success") {
                setArticles((prev) => prev.filter((a) => a.id !== id));
                toast.success("Article deleted");
            } else {
                toast.error(data?.message || "Delete failed");
            }
        } catch {
            toast.error("Failed to delete article");
        } finally {
            setDeletingId(null);
        }
    };

    return (
        <div className="bg-white rounded-xs shadow-sm flex flex-col">
            {/* HEADER (STICKY) */}
            <div className="px-4 pt-2 shrink-0">
                <h2 className="text-lg font-semibold">Your Articles</h2>
            </div>

            {/* CONTENT (SCROLLABLE) */}
            <div className="flex-1 overflow-y-auto p-4 space-y-2">
                {loading && (
                    <p className="text-sm text-gray-500">Loading articles...</p>
                )}

                {!loading && articles.length === 0 && (
                    <p className="text-sm text-gray-400">No articles found</p>
                )}

                {articles.map((article) => (
                    <div
                        key={article.id}
                        onClick={() => onSelectArticle(article.content)}
                        className="cursor-pointer border border-gray-200 p-2 rounded-sm hover:bg-gray-50 transition"
                    >
                        <div className="flex items-center justify-between gap-2">
                            {/* LEFT */}
                            <div className="flex items-center gap-1 min-w-0">
                                <FileText className="w-4 h-4 text-blue-600 shrink-0" />
                                <p className="font-medium text-sm truncate" title={article.prompt}>
                                    {article.prompt}
                                </p>
                            </div>

                            {/* RIGHT */}
                            <button
                                disabled={deletingId === article.id}
                                onClick={(e) => {
                                    e.stopPropagation();
                                    handleDelete(article.id);
                                }}
                                className="text-red-500 cursor-pointer hover:text-red-600 shrink-0 disabled:opacity-50"
                            >
                                {deletingId === article.id ? "…" : <Trash2 className="w-4 h-4" />}
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ArticleList;
