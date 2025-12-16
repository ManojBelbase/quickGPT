import React, { useState, useCallback } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useAuth } from '@clerk/clerk-react';

import ArticleForm from '../components/article/ArticleForm';
import ArticleResult from '../components/article/ArticleResult';

// Create instance instead of mutating defaults
const api = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:5005',
});

const WriteArticle: React.FC = () => {
    const { getToken } = useAuth();

    const [prompt, setPrompt] = useState('The future of artificial intelligence');
    const [selectedLength, setSelectedLength] = useState(300);
    const [articleContent, setArticleContent] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleGenerateArticle = useCallback(async () => {
        if (!prompt.trim()) {
            toast.error('Please enter an article prompt');
            return;
        }

        setIsLoading(true);

        try {
            const token = await getToken();

            const promptText = `Write an article  "${prompt}" in  ${selectedLength}`;

            const { data } = await api.post(
                "/api/article",
                { prompt: promptText, length: selectedLength },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            if (data?.status !== "success") {
                toast.error(data?.message || "Failed to generate article");
                return;
            }

            setArticleContent(data.data);
        } catch (error) {
            console.error('❌ Error generating article:', error);
            toast.error('An error occurred while generating the article');
        } finally {
            setIsLoading(false);
        }
    }, [prompt, selectedLength, getToken]);

    return (
        <div className="flex flex-col lg:flex-row gap-4 min-h-full">
            <ArticleForm
                prompt={prompt}
                onpromptChange={setPrompt}
                selectedLenght={selectedLength}
                onLenghtChange={setSelectedLength}
                onGenerate={handleGenerateArticle}
                isLoading={isLoading}
            />

            <ArticleResult
                content={articleContent}
                isLoading={isLoading}
            />
        </div>
    );
};

export default WriteArticle;
