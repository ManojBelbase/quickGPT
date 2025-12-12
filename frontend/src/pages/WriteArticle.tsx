// src/pages/WriteArticle.tsx
import React, { useState } from 'react';
import ArticleForm from '../components/article/ArticleForm';
import ArticleResult from '../components/article/ArticleResult';

const WriteArticle: React.FC = () => {
    const [topic, setTopic] = useState<string>('The future of artificial intelligence');
    const [selectedWordCount, setSelectedWordCount] = useState<number>(800);
    const [articleContent, setArticleContent] = useState<string>('');
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const handleGenerateArticle = () => {
        if (!topic.trim()) {
            console.warn('Topic is empty – generation blocked');
            return;
        }

        // THIS IS THE DATA THAT WOULD GO TO YOUR BACKEND
        console.log('🚀 GENERATE ARTICLE REQUEST');
        console.log('Topic:', topic.trim());
        console.log('Target word count:', selectedWordCount);

        // Map number to readable label
        const lengthLabel = selectedWordCount === 800 ? 'Short' :
            selectedWordCount === 1200 ? 'Medium' : 'Long';
        console.log('Length:', `${lengthLabel} (${selectedWordCount} words)`);
        console.log('Full payload:', {
            topic: topic.trim(),
            wordCount: selectedWordCount,
            length: lengthLabel
        });

        // Start loading
        setIsLoading(true);
        setArticleContent('');

        // Simulate generation delay
        setTimeout(() => {
            console.log('✅ Simulated article generated successfully!');

            const simulatedContent = `
# ${topic.trim()}

**Target length:** ~${selectedWordCount} words (${lengthLabel})

This is a simulated article generated for testing.

Artificial Intelligence continues to evolve rapidly. With your selected length of **${lengthLabel}** (~${selectedWordCount} words), 
here would be the full AI-generated content based on the topic.

(Replace this simulation with real API response later)

Generated on: ${new Date().toLocaleString()}
            `.trim();

            setArticleContent(simulatedContent);
            setIsLoading(false);
        }, 2500);
    };

    return (
        <div className="flex flex-col lg:flex-row gap-4 min-h-full">
            {/* Left Panel: Form */}
            <ArticleForm
                topic={topic}
                onTopicChange={setTopic}
                selectedWordCount={selectedWordCount}
                onWordCountChange={setSelectedWordCount}
                onGenerate={handleGenerateArticle}
                isLoading={isLoading}
            />

            {/* Right Panel: Result */}
            <ArticleResult
                content={articleContent}
                isLoading={isLoading}
            />
        </div>
    );
};

export default WriteArticle;