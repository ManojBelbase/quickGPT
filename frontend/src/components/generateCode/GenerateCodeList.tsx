import React from "react";
import { Code, Trash2, Loader2 } from "lucide-react";
import toast from "react-hot-toast";
import ConfirmModal from "../shared/ConfirmModel";
import { useDeleteCode, useGetCodes } from "../../hooks/useGenerateCode";

interface CodeListProps {
    onSelectCode?: (code: string) => void;
}

const GenerateCodeList: React.FC<CodeListProps> = ({ onSelectCode }) => {
    const { data: codes = [], isLoading, isError } = useGetCodes();
    const { mutateAsync: deleteCode } = useDeleteCode();
    const [deletingId, setDeletingId] = React.useState<string | null>(null);
    const [confirmId, setConfirmId] = React.useState<string | null>(null);

    const handleDelete = async (id: string) => {
        setDeletingId(id);
        try {
            await deleteCode(id);
            toast.success("Code deleted");
        } catch {
            toast.error("Failed to delete");
        } finally {
            setDeletingId(null);
            setConfirmId(null);
        }
    };

    if (isError) return <p className="text-red-600 text-sm p-4">Failed to load codes</p>;

    return (
        <div className="bg-white p-2 sm:p-4 rounded-sm sm:rounded-sm shadow-sm overflow-y-auto">
            <h2 className="text-lg font-semibold mb-4">Your Generated Codes</h2>

            {isLoading && <p className="text-gray-500">Loading...</p>}
            {!isLoading && codes.length === 0 && <p className="text-gray-400 text-sm">No codes found</p>}

            <div className="space-y-2">
                {codes.map((code) => (
                    <div
                        key={code.id}
                        className="flex items-center justify-between cursor-pointer border border-gray-200 p-2 rounded-md hover:bg-gray-50 transition"
                        onClick={() => onSelectCode?.(code.content)}
                    >
                        <div className="flex items-center gap-2 min-w-0">
                            <Code className="w-4 h-4 text-purple-600 shrink-0" />
                            <p className="text-sm font-medium truncate" title={code.prompt}>
                                {code.prompt}
                            </p>
                        </div>

                        <button
                            onClick={(e) => {
                                e.stopPropagation();
                                setConfirmId(code.id);
                            }}
                            disabled={deletingId === code.id}
                            className="text-red-500 hover:text-red-600 transition"
                        >
                            {deletingId === code.id ? (
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
                title="Delete this code?"
                message="This action is permanent. Are you sure?"
                onConfirm={() => confirmId && handleDelete(confirmId)}
                onCancel={() => setConfirmId(null)}
            />
        </div>
    );
};

export default GenerateCodeList;