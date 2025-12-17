import React from 'react';
import { Sparkles, Hash, Loader2 } from 'lucide-react';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import type { BlogTitleFormProps } from '../../types';


const BlogTitleForm: React.FC<BlogTitleFormProps> = ({
    keyword,
    onKeywordChange,
    categories,
    selectedCategory,
    onCategoryChange,
    onGenerate,
    isLoading,
}) => {

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        if (!keyword.trim() || isLoading) return;

        const prompt = selectedCategory
            ? `${keyword} Category ${selectedCategory.name})`
            : keyword;

        onGenerate(prompt);
    };

    return (
        <div className="w-full  p-4 bg-white rounded-xl shadow-md h-fit">
            <h2 className="text-xl font-bold text-gray-900 flex items-center mb-6">
                <Sparkles className="w-5 h-5 mr-2 text-purple-600" />
                AI Title Generator
            </h2>

            <form onSubmit={handleSubmit} className="space-y-6">

                {/* Keyword Input */}
                <div>
                    <label htmlFor="blog-keyword" className="block text-sm font-medium text-gray-700 mb-2">
                        Keyword
                    </label>
                    <Input
                        id="blog-keyword"
                        placeholder="The future of artificial intelligence"
                        value={keyword}
                        onChange={(e) => onKeywordChange(e.target.value)}
                        className="w-full h-10 border-gray-300 focus:border-purple-500 focus:ring-purple-500"
                        disabled={isLoading}
                    />
                </div>

                {/* Category Selection */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Category
                    </label>
                    <div className="flex flex-wrap gap-2">
                        {categories.map((category) => (
                            <button
                                type="button"
                                key={category.value}
                                onClick={() => onCategoryChange(category)}
                                className={`py-2 px-4 text-sm font-medium rounded-md transition-colors border
                                    ${selectedCategory.value === category.value
                                        ? 'bg-blue-500 text-white border-blue-500 shadow-sm'
                                        : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
                                    }`}
                                disabled={isLoading}
                            >
                                {category.name}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Generate Button */}
                <Button
                    type="submit"
                    className="w-full py-3 h-12 text-lg font-medium bg-purple-600 hover:bg-purple-700 transition-colors flex items-center justify-center"
                    disabled={!keyword.trim() || isLoading}
                >
                    {isLoading ? (
                        <>
                            <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                            Generating...
                        </>
                    ) : (
                        <>
                            <Hash className="mr-2 h-5 w-5" />
                            Generate title
                        </>
                    )}
                </Button>
            </form>
        </div>
    );
};

export default BlogTitleForm;
