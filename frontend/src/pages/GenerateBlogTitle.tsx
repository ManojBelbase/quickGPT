// src/pages/GenerateBlogTitle.tsx
import React, { useState } from 'react';
import BlogTitleForm from '../components/blog_title/BlogTitleForm';
import BlogTitleResult from '../components/blog_title/BlogTitleResult';

// Define the Category structure
export interface BlogCategory {
    name: string;
    value: string; // Used for API calls/unique identification
}

const blogCategories: BlogCategory[] = [
    { name: 'General', value: 'general' },
    { name: 'Technology', value: 'technology' },
    { name: 'Business', value: 'business' },
    { name: 'Health', value: 'health' },
    { name: 'Lifestyle', value: 'lifestyle' },
    { name: 'Education', value: 'education' },
    { name: 'Travel', value: 'travel' },
    { name: 'Food', value: 'food' },
];

const GenerateBlogTitle: React.FC = () => {
    const [keyword, setKeyword] = useState<string>('The future of artificial intelligence');
    const [selectedCategory, setSelectedCategory] = useState<BlogCategory>(blogCategories[0]); // Starts at 'General'
    const [generatedTitles, setGeneratedTitles] = useState<string[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const handleGenerateTitles = () => {
        const trimmedKeyword = keyword.trim();
        if (!trimmedKeyword) return;

        setIsLoading(true);
        setGeneratedTitles([]); // Clear previous results

        // ----------------------------------------------------
        // --- UPDATED CONSOLE LOG FOR API INTEGRATION PAYLOAD ---
        // ----------------------------------------------------
        const payload = {
            keyword: trimmedKeyword,
            categoryValue: selectedCategory.value, // The unique, lowercase API identifier
            categoryName: selectedCategory.name,   // The display name of the category
        };

        console.log('Full payload:', payload);
        // ----------------------------------------------------

        // Simulate API call delay
        setTimeout(() => {
            const titles = [
                `5 Ways AI Will Reshape ${selectedCategory.name} in the Next Decade`,
                `${trimmedKeyword}: The Ultimate Guide to Understanding the Basics`,
                `The Ethics of ${selectedCategory.name} AI: Where Do We Draw the Line?`,
                `Beyond the Buzzwords: Practical Applications of AI in ${selectedCategory.name}`
            ];

            setGeneratedTitles(titles);
            setIsLoading(false);
        }, 2000);
    };

    return (
        <div className=" flex flex-col lg:flex-row gap-8 min-h-full">

            {/* Left Panel: Controls */}
            <BlogTitleForm
                keyword={keyword}
                onKeywordChange={setKeyword}
                categories={blogCategories}
                selectedCategory={selectedCategory}
                onCategoryChange={setSelectedCategory}
                onGenerate={handleGenerateTitles}
                isLoading={isLoading}
            />

            {/* Right Panel: Results */}
            <BlogTitleResult
                titles={generatedTitles}
                isLoading={isLoading}
            />

        </div>
    );
};

export default GenerateBlogTitle;