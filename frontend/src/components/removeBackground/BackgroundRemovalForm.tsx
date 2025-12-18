// src/components/removeBackground/BackgroundRemovalForm.tsx
import React from "react";
import { Sparkles, Loader2 } from "lucide-react";
import { Button } from "../ui/Button";
import type { BackgroundRemovalFormProps } from "../../types";

const BackgroundRemovalForm: React.FC<BackgroundRemovalFormProps> = ({
    selectedFile,
    onFileChange,
    onRemoveBackground,
    isLoading,
}) => {
    const fileName = selectedFile ? selectedFile.name : "No file chosen";

    const handleFileInput = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0] || null;
        onFileChange(file);
    };

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        if (!selectedFile || isLoading) return;
        onRemoveBackground();
    };

    return (
        <div className="w-full p-4 bg-white rounded-xl shadow-md h-fit">
            <h2 className="text-xl font-bold text-gray-900 flex items-center mb-6">
                <Sparkles className="w-5 h-5 mr-2 text-purple-600" />
                Background Removal
            </h2>

            <form onSubmit={handleSubmit} className="space-y-6">
                {/* File Upload Input */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Upload Image
                    </label>

                    <div className="flex items-center space-x-2">
                        <label
                            htmlFor="bg-removal-file-upload"
                            className="cursor-pointer bg-purple-600 text-white py-2 px-4 rounded-md text-sm font-medium hover:bg-purple-700 transition-colors"
                        >
                            Choose File
                        </label>
                        <span className="text-sm text-gray-600 truncate max-w-[200px]">
                            {fileName}
                        </span>

                        <input
                            id="bg-removal-file-upload"
                            type="file"
                            accept="image/jpeg, image/png, image/webp, image/jpg"
                            onChange={handleFileInput}
                            className="hidden"
                            disabled={isLoading}
                        />
                    </div>

                    <p className="text-xs text-gray-500 mt-2">
                        Supports JPG, PNG, WEBP (max 10MB recommended)
                    </p>
                </div>

                {/* Remove Background Button */}
                <Button
                    type="submit"
                    disabled={!selectedFile || isLoading}
                    className={`w-full py-3 h-12 text-lg font-medium transition-all flex items-center justify-center ${!selectedFile || isLoading
                        ? "bg-gray-400 cursor-not-allowed text-gray-700"
                        : "bg-linear-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white shadow-lg"
                        }`}
                >
                    {isLoading ? (
                        <>
                            <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                            Removing background...
                        </>
                    ) : (
                        <>
                            <Sparkles className="mr-2 h-5 w-5" />
                            Remove Background
                        </>
                    )}
                </Button>
            </form>
        </div>
    );
};

export default BackgroundRemovalForm;