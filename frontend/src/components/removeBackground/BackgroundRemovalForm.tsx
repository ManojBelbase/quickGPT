import { Sparkles, Trash2, Loader2 } from 'lucide-react';
import { Button } from '../ui/Button';
import type { BackgroundRemovalFormProps } from '../../types';
const BackgroundRemovalForm: React.FC<BackgroundRemovalFormProps> = ({
    selectedFile,
    onFileChange,
    onRemoveBackground,
    isLoading,
}) => {

    const fileName = selectedFile ? selectedFile.name : 'No file chosen';

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
                <Sparkles className="w-5 h-5 mr-2 text-red-500" />
                Background Removal
            </h2>

            <form onSubmit={handleSubmit} className="space-y-6">

                {/* File Upload Input */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Upload Image
                    </label>

                    {/* Custom File Input Styling */}
                    <div className="flex items-center space-x-2">
                        <label
                            htmlFor="file-upload"
                            className="cursor-pointer bg-purple-500 text-white py-2 px-4 rounded-md text-sm font-medium hover:bg-purple-600 transition-colors border border-purple-500"
                        >
                            Choose File
                        </label>
                        <span className="text-sm text-gray-600 truncate max-w-full">
                            {fileName}
                        </span>

                        <input
                            id="file-upload"
                            type="file"
                            accept="image/jpeg, image/png, image/webp"
                            onChange={handleFileInput}
                            className="hidden"
                            disabled={isLoading}
                        />
                    </div>
                </div>

                <p className="text-xs text-gray-500 mt-2">
                    Supports JPG, PNG, and other image formats
                </p>

                {/* Remove Background Button (Gradient Style) */}
                <Button
                    type="submit"
                    className={`w-full py-3 h-12 text-lg font-medium 
                        ${!selectedFile || isLoading
                            ? 'bg-gray-400 cursor-not-allowed'
                            : 'bg-linear-to-r from-orange-400 to-red-600 hover:from-orange-500 hover:to-red-700'
                        } 
                        transition-all flex items-center justify-center`}
                    disabled={!selectedFile || isLoading}
                >
                    {isLoading ? (
                        <>
                            <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                            Processing...
                        </>
                    ) : (
                        <>
                            <Trash2 className="mr-2 h-5 w-5" />
                            Remove background
                        </>
                    )}
                </Button>
            </form>
        </div>
    );
};

export default BackgroundRemovalForm;