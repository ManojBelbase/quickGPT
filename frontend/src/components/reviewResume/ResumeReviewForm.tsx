// src/components/resume_review/ResumeReviewForm.tsx
import React from 'react';
import { FileText, Award, Loader2 } from 'lucide-react';
import { Button } from '../ui/Button';

interface ResumeReviewFormProps {
    selectedFile: File | null;
    onFileChange: (file: File | null) => void;
    onReviewResume: () => void;
    isLoading: boolean;
}

const ResumeReviewForm: React.FC<ResumeReviewFormProps> = ({
    selectedFile,
    onFileChange,
    onReviewResume,
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

        onReviewResume();
    };

    return (
        <div className="w-full lg:w-1/3 p-6 bg-white rounded-xl shadow-md h-fit">
            <h2 className="text-xl font-bold text-gray-900 flex items-center mb-6">
                <Award className="w-5 h-5 mr-2 text-purple-500" />
                Resume Review
            </h2>

            <form onSubmit={handleSubmit} className="space-y-6">

                {/* File Upload Input */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Upload Resume
                    </label>
                    <div className="flex items-center space-x-2">
                        <label
                            htmlFor="resume-file-upload"
                            className="cursor-pointer bg-purple-500 text-white py-2 px-4 rounded-md text-sm font-medium hover:bg-purple-600 transition-colors border border-purple-500"
                        >
                            Choose File
                        </label>
                        <span className="text-sm text-gray-600 truncate max-w-full">
                            {fileName}
                        </span>

                        <input
                            id="resume-file-upload"
                            type="file"
                            accept=".pdf,.doc,.docx,image/jpeg,image/png"
                            onChange={handleFileInput}
                            className="hidden"
                            disabled={isLoading}
                        />
                    </div>
                </div>

                <p className="text-xs text-gray-500 mt-2">
                    Supports PDF, DOCX, PNG, JPG formats
                </p>

                {/* Review Resume Button (purple/Cyan Gradient) */}
                <Button
                    type="submit"
                    className={`w-full py-3 h-12 text-lg font-medium 
                        ${!selectedFile || isLoading
                            ? 'bg-gray-400 cursor-not-allowed'
                            : 'bg-linear-to-r from-purple-400 to-cyan-500 hover:from-purple-500 hover:to-cyan-600'
                        } 
                        transition-all flex items-center justify-center`}
                    disabled={!selectedFile || isLoading}
                >
                    {isLoading ? (
                        <>
                            <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                            Analyzing...
                        </>
                    ) : (
                        <>
                            <FileText className="mr-2 h-5 w-5" />
                            Review Resume
                        </>
                    )}
                </Button>
            </form>
        </div>
    );
};

export default ResumeReviewForm;