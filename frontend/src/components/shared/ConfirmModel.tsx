import React, { useEffect } from "react";
import { AlertCircle, X } from "lucide-react";

interface ConfirmModalProps {
    isOpen: boolean;
    title?: string;
    message?: string;
    onConfirm: () => void;
    onCancel: () => void;
    confirmText?: string;
    isDestructive?: boolean;
}

const ConfirmModal: React.FC<ConfirmModalProps> = ({
    isOpen,
    title = "Are you sure?",
    message = "This action cannot be undone and will permanently remove the data.",
    onConfirm,
    onCancel,
    confirmText = "Delete",
    isDestructive = true,
}) => {
    // Close on Escape key
    useEffect(() => {
        const handleEsc = (e: KeyboardEvent) => {
            if (e.key === "Escape") onCancel();
        };
        if (isOpen) window.addEventListener("keydown", handleEsc);
        return () => window.removeEventListener("keydown", handleEsc);
    }, [isOpen, onCancel]);

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-hidden">
            {/* Backdrop with Blur */}
            <div
                className="absolute inset-0 bg-gray-600/60  animate-in fade-in duration-300"
                onClick={onCancel}
            />

            {/* Modal Container */}
            <div className="relative bg-white rounded-xl shadow-2xl w-full max-w-md overflow-hidden animate-in zoom-in-95 duration-200">

                {/* Header with Icon */}
                <div className="flex items-start gap-4 p-6 pb-4">
                    <div className={`shrink-0 w-10 h-10 rounded-full flex items-center justify-center ${isDestructive ? 'bg-purple-100' : 'bg-purple-100'
                        }`}>
                        <AlertCircle className={`w-6 h-6 ${isDestructive ? 'text-purple-600' : 'text-purple-600'}`} />
                    </div>

                    <div className="flex-1">
                        <h2 className="text-xl font-semibold text-gray-900 leading-6">
                            {title}
                        </h2>
                        <p className="mt-2 text-sm text-gray-500">
                            {message}
                        </p>
                    </div>

                    <button
                        onClick={onCancel}
                        className="text-gray-400 hover:text-gray-600 transition-colors"
                    >
                        <X className="w-5 h-5" />
                    </button>
                </div>

                {/* Footer / Buttons */}
                <div className="bg-gray-50 px-6 py-4 flex  sm:flex-row justify-end gap-3">
                    <button
                        className="px-4 py-2 text-sm cursor-pointer font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-all focus:ring-2 focus:ring-gray-200"
                        onClick={onCancel}
                    >
                        Cancel
                    </button>
                    <button
                        className={`px-4 py-2 cursor-pointer text-sm font-medium text-white rounded-lg transition-all shadow-sm focus:ring-2 focus:ring-offset-2 ${isDestructive
                            ? 'bg-purple-600 hover:bg-purple-700 focus:ring-purple-500'
                            : 'bg-purple-600 hover:bg-purple-700 focus:ring-purple-500'
                            }`}
                        onClick={onConfirm}
                    >
                        {confirmText}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ConfirmModal;