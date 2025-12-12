// src/pages/ReviewResume.tsx
import React, { useState } from 'react';
import ResumeReviewForm from '../components/review_resume/ResumeReviewForm';
import AnalysisResults from '../components/review_resume/AnalysisResults';

// Define a structure for the analysis result
export interface ResumeAnalysis {
    score: number;
    summary: string;
    suggestions: string[];
}

const ReviewResume: React.FC = () => {
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [analysisResult, setAnalysisResult] = useState<ResumeAnalysis | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const handleFileChange = (file: File | null) => {
        setSelectedFile(file);
        setAnalysisResult(null); // Clear previous result when a new file is chosen
    };

    const handleReviewResume = () => {
        if (!selectedFile) return;

        setIsLoading(true);
        setAnalysisResult(null);

        // Note: In a real app, you would use FormData to send the file to the API.
        const payload = {
            fileName: selectedFile.name,
            fileType: selectedFile.type,
            fileSize: selectedFile.size,
            action: 'review_resume',
        };

        // Log the submission payload
        console.log('Resume Review Payload (Ready for API):', payload);

        // Simulate API call delay and analysis
        setTimeout(() => {
            const simulatedAnalysis: ResumeAnalysis = {
                score: 85,
                summary: "The resume shows strong experience in React and Node.js, but the formatting could be improved for better ATS compatibility. Good use of action verbs.",
                suggestions: [
                    "Quantify achievements with metrics (e.g., 'increased speed by 20%').",
                    "Ensure keywords from target job descriptions are present.",
                    "Shorten the summary to a maximum of 3 impactful lines.",
                ],
            };

            setAnalysisResult(simulatedAnalysis);
            setIsLoading(false);
        }, 4000);
    };

    return (
        <div className=" flex flex-col lg:flex-row gap-2 sm:gap-4 min-h-full">

            {/* Left Panel: Controls */}
            <ResumeReviewForm
                onFileChange={handleFileChange}
                onReviewResume={handleReviewResume}
                selectedFile={selectedFile}
                isLoading={isLoading}
            />

            {/* Right Panel: Results */}
            <AnalysisResults
                result={analysisResult}
                isLoading={isLoading}
            />

        </div>
    );
};

export default ReviewResume;