import React from 'react';
import { FileText, Loader2, CheckCircle, Lightbulb } from 'lucide-react';
import type { ResumeAnalysis } from '../../pages/ReviewResume';

interface AnalysisResultsProps {
    result: ResumeAnalysis | null;
    isLoading: boolean;
}

const AnalysisResults: React.FC<AnalysisResultsProps> = ({ result, isLoading }) => {
    const isInitialState = !result && !isLoading;

    return (
        <div className="w-full lg:w-2/3 p-6 bg-white rounded-xl shadow-md">
            <h2 className="text-xl font-bold text-gray-900 flex items-center mb-6">
                <FileText className="w-5 h-5 mr-2 text-green-500" />
                Analysis Results
            </h2>

            <div className="min-h-[400px] border border-gray-200 rounded-lg p-4 relative">

                {/* Displaying Results */}
                {result && (
                    <div className="space-y-6">
                        {/* Score Card */}
                        <div className="bg-green-50 p-4 rounded-lg flex items-center justify-between shadow-sm">
                            <h3 className="text-lg font-semibold text-green-700">Overall Score</h3>
                            <span className="text-4xl font-extrabold text-green-600">{result.score}%</span>
                        </div>

                        {/* Summary */}
                        <div>
                            <h3 className="text-lg font-semibold text-gray-800 flex items-center mb-2">
                                <CheckCircle className="w-5 h-5 mr-2 text-green-500" />
                                Summary Feedback
                            </h3>
                            <p className="text-gray-600 bg-gray-50 p-3 rounded-md border text-sm">
                                {result.summary}
                            </p>
                        </div>

                        {/* Suggestions */}
                        <div>
                            <h3 className="text-lg font-semibold text-gray-800 flex items-center mb-2">
                                <Lightbulb className="w-5 h-5 mr-2 text-yellow-500" />
                                Actionable Suggestions
                            </h3>
                            <ul className="list-disc pl-5 space-y-2 text-gray-700 text-sm">
                                {result.suggestions.map((s, index) => (
                                    <li key={index} className="pl-1">{s}</li>
                                ))}
                            </ul>
                        </div>
                    </div>
                )}

                {/* Loading State */}
                {isLoading && (
                    <div className="absolute inset-0 flex flex-col items-center justify-center bg-white/90">
                        <Loader2 className="h-8 w-8 text-green-500 animate-spin" />
                        <p className="mt-4 text-gray-600 font-medium">Scanning and analyzing resume...</p>
                    </div>
                )}

                {/* Initial/Empty State */}
                {isInitialState && (
                    <div className="flex flex-col items-center justify-center text-center h-full text-gray-500">
                        <FileText className="w-12 h-12 mb-3 text-gray-300" />
                        <p className="text-lg font-medium">Upload your resume and click "Review Resume" to get started</p>
                        <p className="text-sm mt-1">Detailed analysis and suggestions will appear here.</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default AnalysisResults;