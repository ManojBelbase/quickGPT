import React from 'react';
import { Sparkles, PenSquare, Loader2 } from 'lucide-react';
import { Input } from '../ui/Input';
import { Button } from '../ui/Button';

interface ArticleLengthOption {
    length: number;
    text: string;
}

const articleLengths: ArticleLengthOption[] = [
    { length: 300, text: 'Short (250-300 words)' },
    { length: 600, text: 'Medium (550-600 words)' },
];

interface ArticleFormProps {
    prompt: string;
    onpromptChange: (value: string) => void;
    selectedLenght: number;
    onLenghtChange: (count: number) => void;
    onGenerate: () => void;
    isLoading: boolean;
}

const ArticleForm: React.FC<ArticleFormProps> = ({
    prompt,
    onpromptChange,
    selectedLenght,
    onLenghtChange,
    onGenerate,
    isLoading,
}) => {
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!prompt.trim()) return;

        onGenerate();
    };

    return (
        <div className="w-full  p-4 bg-white rounded-sm shadow-sm h-fit">
            <h2 className="text-xl font-bold text-gray-900 flex items-center mb-6">
                <Sparkles className="w-5 h-5 mr-2 text-purple-600" />
                AI Article Writer
            </h2>

            <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                    <label htmlFor="article-prompt" className="block text-sm font-medium text-gray-700 mb-2">
                        Article Topic
                    </label>
                    <Input
                        id="article-prompt"
                        placeholder="The future of artificial intelligence"
                        value={prompt}
                        onChange={(e) => onpromptChange(e.target.value)}
                        className="w-full h-10 border-gray-300 focus:border-purple-500 focus:ring-purple-500"
                        disabled={isLoading}
                        required
                    />
                </div>

                {/* Article Length Selection */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Article Length
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {articleLengths.map((option) => (
                            <button
                                key={option.length}
                                type="button" // Important: button inside form should be type="button" to avoid submitting
                                onClick={() => onLenghtChange(option.length)}
                                disabled={isLoading}
                                className={`py-3 px-4 cursor-pointer text-sm font-medium rounded-md transition-colors border ${selectedLenght === option.length
                                    ? 'bg-purple-600 text-white border-purple-600 shadow-md'
                                    : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
                                    }`}
                            >
                                {option.text}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Generate Button - now type="submit" */}
                <Button
                    type="submit"
                    disabled={!prompt.trim() || isLoading}
                    className="w-full py-2 h-12 text-lg cursor-pointer font-medium bg-blue-600 hover:bg-blue-700 transition-colors flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
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
            </form>
        </div>
    );
};

export default ArticleForm;