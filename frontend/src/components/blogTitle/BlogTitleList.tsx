import React, { useEffect, useState } from "react";
import { FileText } from "lucide-react";
import api from "../../api/axiosInstance";
import toast from "react-hot-toast";
import type { BlogTitle } from "../../types";

interface BlogTitleListProps {
    onSelectTitle?: (title: string) => void;
}

const BlogTitleList: React.FC<BlogTitleListProps> = ({ onSelectTitle }) => {
    const [titles, setTitles] = useState<BlogTitle[]>([]);
    const [loading, setLoading] = useState(false);

    const fetchTitles = async () => {
        setLoading(true);
        try {
            const { data } = await api.get("/blog-title");
            if (data?.status === "success") {
                setTitles(data.data);
            }
        } catch (err) {
            console.error(err);
            toast.error("Failed to fetch blog titles");
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id: string) => {
        try {
            const { data } = await api.delete(`/blog-title/${id}`);
            if (data?.status === "success") {
                toast.success("Blog title deleted");
                setTitles((prev) => prev.filter((t) => t.id !== id));
            } else {
                toast.error(data?.message || "Failed to delete");
            }
        } catch (err) {
            console.error(err);
            toast.error("Failed to delete blog title");
        }
    };

    useEffect(() => {
        fetchTitles();
    }, []);

    return (
        <div className="bg-white p-4 rounded-xl shadow-sm h-[500px] overflow-y-auto">
            <h2 className="text-lg font-semibold mb-4">Your Blog Titles</h2>

            {loading && <p className="text-gray-500">Loading...</p>}

            {!loading && titles.length === 0 && (
                <p className="text-gray-400 text-sm">No blog titles found</p>
            )}

            <div className="space-y-3">
                {titles.map((title) => (
                    <div
                        key={title.id}
                        className="flex items-center justify-between cursor-pointer border p-3 rounded-md hover:bg-gray-50 transition"
                        onClick={() => onSelectTitle?.(title.content)}
                    >
                        <div className="flex items-center gap-2 min-w-0">
                            <FileText className="w-4 h-4 text-purple-600 shrink-0" />
                            <p className="text-sm font-medium truncate">{title.prompt}</p>
                        </div>

                        <button
                            onClick={(e) => {
                                e.stopPropagation();
                                handleDelete(title.id);
                            }}
                            className="text-red-500 hover:text-red-600 transition text-sm"
                        >
                            🗑
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default BlogTitleList;
