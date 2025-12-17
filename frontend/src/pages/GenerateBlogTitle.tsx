import React, { useState } from 'react';
import BlogTitleForm from '../components/blog_title/BlogTitleForm';
import BlogTitleResult from '../components/blog_title/BlogTitleResult';
import api from '../api/axiosInstance'; // Your Axios instance

// Define categories
const blogCategories = [
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
    const [keyword, setKeyword] = useState<string>('');
    const [selectedCategory, setSelectedCategory] = useState<any>(blogCategories[0]);
    const [generatedTitles, setGeneratedTitles] = useState<string[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const handleGenerateTitles = async (prompt: string) => {
        if (!prompt.trim()) return;

        setIsLoading(true);
        setGeneratedTitles([]); // Clear previous results

        try {
            // Send combined prompt to backend
            const { data } = await api.post('/blog-title', { prompt });

            if (data?.status === 'success' && data.data) {
                // If AI returns plain text with newlines, split into array
                const titles = data.data.split(/\r?\n/).filter(Boolean);
                setGeneratedTitles(titles);
            } else {
                console.error('Failed to generate titles', data);
            }
        } catch (err) {
            console.error('API error:', err);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="flex flex-col lg:flex-row gap-2 sm:gap-4 min-h-full">
            {/* Left Panel: Form */}
            <BlogTitleForm
                keyword={keyword}
                onKeywordChange={setKeyword}
                categories={blogCategories}
                selectedCategory={selectedCategory}
                onCategoryChange={setSelectedCategory}
                onGenerate={handleGenerateTitles} // receives full prompt now
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
