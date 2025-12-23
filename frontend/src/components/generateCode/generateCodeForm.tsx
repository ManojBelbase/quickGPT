import React from 'react';
import { Sparkles, Terminal, Loader2 } from 'lucide-react';
import { Input } from '../ui/Input';
import { Button } from '../ui/Button';
import type { CodeFormProps } from '../../types';

const GenerateCodeForm: React.FC<CodeFormProps> = ({
    prompt,
    onPromptChange,

    onGenerate,
    isLoading,
}) => {
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!prompt.trim()) return;

        onGenerate();
    };

    return (
        <div className="w-full p-2 sm:p-4 bg-white rounded-sm shadow-sm h-fit">
            <h2 className="text-xl font-bold text-gray-900 flex items-center mb-6">
                <Sparkles className="w-5 h-5 mr-2 text-purple-600" />
                AI Code Generator
            </h2>

            <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                    <label htmlFor="code-prompt" className="block text-sm font-medium text-gray-700 mb-2">
                        Code Prompt
                    </label>
                    <Input
                        id="code-prompt"
                        placeholder="Create a React hook for fetching user data with caching"
                        value={prompt}
                        onChange={(e) => onPromptChange(e.target.value)}
                        className="w-full h-10 border-gray-300 focus:border-purple-500 focus:ring-purple-500"
                        disabled={isLoading}
                        required
                    />
                </div>

                {/* Generate Button */}
                <Button
                    type="submit"
                    disabled={!prompt.trim() || isLoading}
                    className="w-full py-2 h-12 text-lg cursor-pointer font-medium bg-purple-600 hover:bg-purple-700 transition-colors flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    {isLoading ? (
                        <>
                            <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                            Generating...
                        </>
                    ) : (
                        <>
                            <Terminal className="mr-2 h-5 w-5" />
                            Generate code
                        </>
                    )}
                </Button>
            </form>
        </div>
    );
};

export default GenerateCodeForm;