// src/pages/WriteArticle.tsx (Main container)
import React, { useState } from 'react';
import ArticleForm from '../components/article/ArticleForm';
import ArticleResult from '../components/article/ArticleResult';

const WriteArticle: React.FC = () => {
    // State management remains in the parent container
    const [topic, setTopic] = useState<string>('The future of artificial intelligence');
    const [length, setLength] = useState<'short' | 'long'>('short');
    const [articleContent, setArticleContent] = useState<string>('');
    const [isLoading, setIsLoading] = useState<boolean>(false);

    // Function to simulate the AI generation process
    const handleGenerateArticle = () => {
        if (!topic.trim()) return;

        setIsLoading(true);
        setArticleContent(''); // Clear previous content

        setTimeout(() => {
            const simulatedContent = `
## The Future of Artificial Intelligence: A Double-Edged Sword

(Content for a ${length} article on "${topic}" goes here.)

Artificial Intelligence (AI) is no longer a concept confined to science fiction; it is rapidly becoming the defining technology of the 21st century. The continued advancement of deep learning and neural networks suggests AGI could be achievable within decades.

This breakthrough will lead to hyper-automation, where AI handles routine, complex, and creative tasks, leading to unprecedented gains in productivity and the creation of entirely new industries.

The two primary concerns are: Job Displacement and Bias and Ethics. Establishing robust, transparent, and ethical guidelines for AI development is paramount to ensuring its benefits are shared equitably.

In conclusion, the future of AI is bright with innovation, offering solutions to global challenges. Our success hinges on our ability to govern its development wisely.
            `;

            setArticleContent(simulatedContent);
            setIsLoading(false);
        }, 2500);
    };

    return (
        <div className=" flex flex-col lg:flex-row gap-4 min-h-full">

            {/* Left Panel: Controls */}
            <ArticleForm
                topic={topic}
                onTopicChange={setTopic}
                length={length}
                onLengthChange={setLength}
                onGenerate={handleGenerateArticle}
                isLoading={isLoading}
            />

            {/* Right Panel: Results */}
            <ArticleResult
                content={articleContent}
                isLoading={isLoading}
            />

        </div>
    );
};

export default WriteArticle;