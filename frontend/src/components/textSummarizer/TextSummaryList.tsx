import { FileText, Trash2, Loader2 } from "lucide-react";
import toast from "react-hot-toast";
import { useDeleteSummary, useGetSummaries } from "../../hooks/useTextSummaries";
import React from "react";

interface TextSummaryListProps {
    onSelectSummary?: (summary: string) => void;
}

const TextSummaryList: React.FC<TextSummaryListProps> = ({ onSelectSummary }) => {
    const { data: summaries = [], isLoading, isError } = useGetSummaries();
    const { mutateAsync: deleteSummary } = useDeleteSummary();
    const [deletingId, setDeletingId] = React.useState<string | null>(null);

    const handleDelete = async (e: React.MouseEvent, id: string) => {
        e.stopPropagation();
        if (!confirm("Delete this summary permanently?")) return;

        setDeletingId(id);
        try {
            await deleteSummary(id);
            toast.success("Summary deleted");
        } catch {
            toast.error("Failed to delete");
        } finally {
            setDeletingId(null);
        }
    };

    if (isError) return <p className="text-red-600 text-sm p-4">Failed to load summaries</p>;

    return (
        <div className="bg-white tp-2 sm:p-4 rounded-xl shadow-sm overflow-y-auto">
            <h2 className="text-lg font-semibold mb-4">Your Summaries</h2>

            {isLoading && <p className="text-gray-500">Loading...</p>}

            {!isLoading && summaries.length === 0 && (
                <p className="text-gray-400 text-sm">No summaries found</p>
            )}

            <div className="space-y-2">
                {summaries.map((item) => (
                    <div
                        key={item.id}
                        className="flex items-center justify-between cursor-pointer border border-gray-200 p-2 sm:rounded-md rounded-sm hover:bg-gray-50 transition"
                        onClick={() => onSelectSummary?.(item.content)}
                    >
                        <div className="flex items-center gap-2 min-w-0">
                            <FileText className="w-4 h-4 text-purple-600 shrink-0" />
                            <p className="text-sm font-medium truncate" title={item.prompt}>
                                {item?.prompt?.substring(0, 60)}...
                            </p>
                        </div>

                        <button
                            onClick={(e) => handleDelete(e, item.id)}
                            disabled={deletingId === item.id}
                            className="text-red-500 hover:text-red-600 transition"
                        >
                            {deletingId === item.id ? (
                                <Loader2 className="w-4 h-4 animate-spin" />
                            ) : (
                                <Trash2 className="w-4 h-4" />
                            )}
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default TextSummaryList;