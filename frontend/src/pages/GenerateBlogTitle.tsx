import React, { useState } from 'react';
import BlogTitleForm from '../components/blog_title/BlogTitleForm';
import BlogTitleList from '../components/blog_title/BlogTitleList';
import api from '../api/axiosInstance';
import { blogCategories } from '../const/blogCategories';
import { BlogTitlePreview } from '../components/blog_title/BlogTitlePreview';

const GenerateBlogTitle: React.FC = () => {
    const [keyword, setKeyword] = useState<string>('');
    const [selectedCategory, setSelectedCategory] = useState<any>(blogCategories[0]);
    const [generatedTitles, setGeneratedTitles] = useState<string[]>([]);
    const [selectedTitle, setSelectedTitle] = useState<string>('');
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const handleGenerateTitles = async (prompt: string) => {
        if (!prompt.trim()) return;

        setIsLoading(true);
        setGeneratedTitles([]);
        setSelectedTitle('');

        try {
            const { data } = await api.post('/blog-title', { prompt });

            if (data?.status === 'success' && data.data) {
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
        <div className=" grid grid-cols-1  md:grid-cols-2 lg:grid-cols-5 gap-2 h-full min-h-full">
            {/* Left: Form */}
            <div className='col-span-1 md:col-span-1 lg:col-span-2 flex flex-col  gap-2'>
                <BlogTitleForm
                    keyword={keyword}
                    onKeywordChange={setKeyword}
                    categories={blogCategories}
                    selectedCategory={selectedCategory}
                    onCategoryChange={setSelectedCategory}
                    onGenerate={handleGenerateTitles}
                    isLoading={isLoading}
                />
                <div className='flex-1 overflow-hidden'>
                    <BlogTitleList onSelectTitle={setSelectedTitle} />
                </div>
            </div>


            {/* Right: Generated / Selected Title */}
            <div className="col-span-1 md:col-span-1 lg:col-span-3 flex flex-col">
                <BlogTitlePreview
                    titles={selectedTitle ? [selectedTitle] : generatedTitles}
                    isLoading={isLoading}
                />
            </div>
        </div>
    );
};

export default GenerateBlogTitle;
