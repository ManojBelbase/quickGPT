// src/components/ArticleControlPanel.tsx
import React from 'react';
import { Sparkles, PenSquare, Loader2 } from 'lucide-react';
import { Input } from '../ui/Input';
import { Button } from '../ui/Button';

interface ArticleControlPanelProps {
    topic: string;
    onTopicChange: (value: string) => void;
    length: 'short' | 'long';
    onLengthChange: (value: 'short' | 'long') => void;
    onGenerate: () => void;
    isLoading: boolean;
}

const getLengthRange = (type: 'short' | 'long') => {
    return type === 'short' ? 'Short (200 - 400 word)' : 'Long (400 - 800 word)';
}

const ArticleForm: React.FC<ArticleControlPanelProps> = ({
    topic,
    onTopicChange,
    length,
    onLengthChange,
    onGenerate,
    isLoading,
}) => {
    return (
        <div className="w-full lg:w-1/3 p-6 bg-white rounded-sm shadow-sm h-fit">
            <h2 className="text-xl font-bold text-gray-900 flex items-center mb-6">
                <Sparkles className="w-5 h-5 mr-2 text-purple-600" />
                AI Article Writer
            </h2>

            <div className="space-y-6">
                {/* Article Topic Input */}
                <div>
                    <label htmlFor="article-topic" className="block text-sm font-medium text-gray-700 mb-2">
                        Article Topic
                    </label>
                    <Input
                        id="article-topic"
                        placeholder="The future of artificial intelligence"
                        value={topic}
                        onChange={(e) => onTopicChange(e.target.value)}
                        className="w-full h-10 border-gray-300 focus:border-purple-500 focus:ring-purple-500"
                        disabled={isLoading}
                    />
                </div>

                {/* Article Length Selection */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Article Length
                    </label>
                    <div className="flex bg-gray-100 rounded-lg p-1 space-x-1">
                        {/* Short Button */}
                        <button
                            onClick={() => onLengthChange('short')}
                            className={`flex-1 py-2 px-3 text-sm font-medium rounded-md transition-colors ${length === 'short'
                                ? 'bg-purple-600 text-white shadow-md'
                                : 'text-gray-600 hover:bg-white'
                                }`}
                            disabled={isLoading}
                        >
                            {getLengthRange('short')}
                        </button>
                        {/* Long Button */}
                        <button
                            onClick={() => onLengthChange('long')}
                            className={`flex-1 py-2 px-3 text-sm font-medium rounded-md transition-colors ${length === 'long'
                                ? 'bg-purple-600 text-white shadow-md'
                                : 'text-gray-600 hover:bg-white'
                                }`}
                            disabled={isLoading}
                        >
                            {getLengthRange('long')}
                        </button>
                    </div>
                </div>

                {/* Generate Button */}
                <Button
                    onClick={onGenerate}
                    className="w-full py-2 h-12 text-lg font-medium bg-blue-600 hover:bg-blue-700 transition-colors flex items-center justify-center"
                    disabled={!topic.trim() || isLoading}
                >
                    {isLoading ? (
                        <>
                            <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                            Generating...
                        </>
                    ) : (
                        <>
                            <PenSquare className="mr-2 h-5 w-5" />
                            Generate article
                        </>
                    )}
                </Button>
            </div>
        </div>
    );
};

export default ArticleForm;