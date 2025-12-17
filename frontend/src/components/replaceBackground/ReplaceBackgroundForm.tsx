import React from 'react';
import { Sparkles, Scissors, Loader2 } from 'lucide-react';
import { Input } from '../ui/Input';
import { Button } from '../ui/Button';
import type { ObjectRemovalFormProps } from '../../types';
const ReplaceBackgroundForm: React.FC<ObjectRemovalFormProps> = ({
    selectedFile,
    onFileChange,
    objectDescription,
    onDescriptionChange,
    onObjectRemoval,
    isLoading,
}) => {

    const fileName = selectedFile ? selectedFile.name : 'No file chosen';

    const handleFileInput = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0] || null;
        onFileChange(file);
    };

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        if (!selectedFile || !objectDescription.trim() || isLoading) return;

        onObjectRemoval();
    };

    return (
        <div className="w-full p-4 bg-white rounded-xl shadow-md h-fit">
            <h2 className="text-xl font-bold text-gray-900 flex items-center mb-6">
                <Sparkles className="w-5 h-5 mr-2 text-indigo-500" />
                Object Removal
            </h2>

            <form onSubmit={handleSubmit} className="space-y-6">

                {/* File Upload Input */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Upload Image
                    </label>
                    <div className="flex items-center space-x-2">
                        <label
                            htmlFor="object-file-upload"
                            className="cursor-pointer bg-blue-500 text-white py-2 px-4 rounded-md text-sm font-medium hover:bg-blue-600 transition-colors border border-blue-500"
                        >
                            Choose File
                        </label>
                        <span className="text-sm text-gray-600 truncate max-w-full">
                            {fileName}
                        </span>

                        <input
                            id="object-file-upload"
                            type="file"
                            accept="image/jpeg, image/png, image/webp"
                            onChange={handleFileInput}
                            className="hidden"
                            disabled={isLoading}
                        />
                    </div>
                </div>

                {/* Object Description Input */}
                <div>
                    <label htmlFor="object-description" className="block text-sm font-medium text-gray-700 mb-2">
                        Describe object to remove
                    </label>
                    <Input
                        id="object-description"
                        placeholder="e.g., car in background, tree from the image"
                        value={objectDescription}
                        onChange={(e) => onDescriptionChange(e.target.value)}
                        className="w-full h-10 border-gray-300 focus:border-indigo-500 focus:ring-indigo-500"
                        disabled={isLoading}
                    />
                    <p className="text-xs text-gray-500 mt-2">
                        Be specific about what you want to remove
                    </p>
                </div>

                {/* Remove Object Button (Purple Gradient) */}
                <Button
                    type="submit"
                    className={`w-full py-3 h-12 text-lg font-medium 
                        ${!selectedFile || !objectDescription.trim() || isLoading
                            ? 'bg-gray-400 cursor-not-allowed'
                            : 'bg-linear-to-r from-purple-500 to-indigo-600 hover:from-purple-600 hover:to-indigo-700'
                        } 
                        transition-all flex items-center justify-center`}
                    disabled={!selectedFile || !objectDescription.trim() || isLoading}
                >
                    {isLoading ? (
                        <>
                            <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                            Processing...
                        </>
                    ) : (
                        <>
                            <Scissors className="mr-2 h-5 w-5" />
                            Replace object
                        </>
                    )}
                </Button>
            </form>
        </div>
    );
};

export default ReplaceBackgroundForm;