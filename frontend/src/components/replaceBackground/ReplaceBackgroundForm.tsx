// src/components/replaceBackground/ReplaceBackgroundForm.tsx
import React from "react";
import { Sparkles, Loader2 } from "lucide-react";
import { Input } from "../ui/Input";
import { Button } from "../ui/Button";

interface ReplaceBackgroundFormProps {
    selectedFile: File | null;
    onFileChange: (file: File | null) => void;
    backgroundPrompt: string;
    onPromptChange: (prompt: string) => void;
    onReplaceBackground: () => void;
    isLoading: boolean;
}

const ReplaceBackgroundForm: React.FC<ReplaceBackgroundFormProps> = ({
    selectedFile,
    onFileChange,
    backgroundPrompt,
    onPromptChange,
    onReplaceBackground,
    isLoading,
}) => {
    const fileName = selectedFile ? selectedFile.name : "No file chosen";

    const handleFileInput = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0] || null;
        onFileChange(file);
    };

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        if (!selectedFile || !backgroundPrompt.trim() || isLoading) return;
        onReplaceBackground();
    };

    return (
        <div className="w-full p-2 sm:p-4 bg-white rounded-xl shadow-md h-fit">
            <h2 className="text-xl font-bold text-gray-900 flex items-center mb-6">
                <Sparkles className="w-5 h-5 mr-2 text-indigo-600" />
                Replace Background
            </h2>

            <form onSubmit={handleSubmit} className="space-y-6">
                {/* File Upload */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Upload Image
                    </label>
                    <div className="flex items-center space-x-2">
                        <label
                            htmlFor="bg-replace-file-upload"
                            className="cursor-pointer bg-purple-600 text-white py-2 px-4 rounded-md text-sm font-medium hover:bg-purple-700 transition-colors"
                        >
                            Choose File
                        </label>
                        <span className="text-sm text-gray-600 truncate max-w-[200px]">
                            {fileName}
                        </span>

                        <input
                            id="bg-replace-file-upload"
                            type="file"
                            accept="image/jpeg, image/png, image/webp, image/jpg"
                            onChange={handleFileInput}
                            className="hidden"
                            disabled={isLoading}
                        />
                    </div>
                    <p className="text-xs text-gray-500 mt-2">
                        Supports JPG, PNG, WEBP
                    </p>
                </div>

                {/* Background Prompt */}
                <div>
                    <label htmlFor="bg-prompt" className="block text-sm font-medium text-gray-700 mb-2">
                        Describe new background
                    </label>
                    <Input
                        id="bg-prompt"
                        placeholder="e.g., tropical beach at sunset, modern office, starry night sky"
                        value={backgroundPrompt}
                        onChange={(e) => onPromptChange(e.target.value)}
                        className="w-full h-10 border-gray-300 focus:border-indigo-500 focus:ring-indigo-500"
                        disabled={isLoading}
                    />
                    <p className="text-xs text-gray-500 mt-2">
                        Be descriptive for best results
                    </p>
                </div>

                {/* Submit Button */}
                <Button
                    type="submit"
                    disabled={!selectedFile || !backgroundPrompt.trim() || isLoading}
                    className={`w-full py-3 h-12 text-lg font-medium transition-all flex items-center justify-center ${!selectedFile || !backgroundPrompt.trim() || isLoading
                        ? "bg-gray-400 cursor-not-allowed text-gray-700"
                        : "bg-linear-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white shadow-lg"
                        }`}
                >
                    {isLoading ? (
                        <>
                            <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                            Replacing background...
                        </>
                    ) : (
                        <>
                            <Sparkles className="mr-2 h-5 w-5" />
                            Replace Background
                        </>
                    )}
                </Button>
            </form>
        </div>
    );
};

export default ReplaceBackgroundForm;