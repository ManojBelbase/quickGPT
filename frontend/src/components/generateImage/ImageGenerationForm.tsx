import React from 'react';
import { Image, Wand2, Loader2 } from 'lucide-react';
import { Button } from '../ui/Button';
import { Switch } from '../ui/Switch';
import type { ImageGenerationFormProps } from '../../types';



const ImageGenerationForm: React.FC<ImageGenerationFormProps> = ({
    prompt,
    onPromptChange,
    styles,
    selectedStyle,
    onStyleChange,
    publish,
    onPublishChange,
    onGenerate,
    isLoading,
}) => {
    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        if (!prompt.trim() || isLoading) return;
        onGenerate();
    };

    return (
        <div className="w-full p-2 sm:p-4 bg-white rounded-xl shadow-md h-fit">
            <h2 className="text-xl font-bold text-gray-900 flex items-center mb-6">
                <Wand2 className="w-5 h-5 mr-2 text-purple-600" />
                AI Image Generation
            </h2>

            <form onSubmit={handleSubmit} className="space-y-6">
                {/* Prompt Input */}
                <div>
                    <label htmlFor="image-prompt" className="block text-sm font-medium text-gray-700 mb-2">
                        Image Prompt
                    </label>
                    <textarea
                        id="image-prompt"
                        placeholder="Describe your image..."
                        value={prompt}
                        onChange={(e) => onPromptChange(e.target.value)}
                        rows={4}
                        className="w-full rounded-md border border-gray-300 bg-white p-3 text-sm text-gray-800 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 disabled:opacity-50"
                        disabled={isLoading}
                    />
                </div>

                {/* Style Selection */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Style</label>
                    <div className="flex flex-wrap gap-2">
                        {styles.map((style) => (
                            <button
                                type="button"
                                key={style.value}
                                onClick={() => onStyleChange(style)}
                                className={`py-2 px-4 text-sm cursor-pointer font-medium rounded-md transition-colors border
                  ${selectedStyle.value === style.value
                                        ? 'bg-purple-500 text-white border-purple-500 shadow-sm'
                                        : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
                                    }`}
                                disabled={isLoading}
                            >
                                {style.name}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Publish Switch */}
                <div className="flex items-center gap-3">
                    <Switch
                        checked={publish}
                        onCheckedChange={onPublishChange}
                        disabled={isLoading}
                    />
                    <span className="text-sm font-medium text-gray-700">Publish to community</span>
                </div>

                {/* Generate Button */}
                <Button
                    type="submit"
                    className="w-full py-3 h-12 text-lg font-medium bg-purple-600 hover:bg-purple-700 transition-colors flex items-center justify-center"
                    disabled={!prompt.trim() || isLoading}
                >
                    {isLoading ? (
                        <>
                            <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                            Generating...
                        </>
                    ) : (
                        <>
                            <Image className="mr-2 h-5 w-5" />
                            Generate Images
                        </>
                    )}
                </Button>
            </form>
        </div>
    );
};

export default ImageGenerationForm;
