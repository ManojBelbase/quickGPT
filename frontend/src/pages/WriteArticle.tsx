import React, { useState, useCallback } from "react";
import toast from "react-hot-toast";

import ArticleForm from "../components/article/ArticleForm";
import ArticleResult from "../components/article/ArticleResult";
import api from "../api/axiosInstance";

const WriteArticle: React.FC = () => {
    const [prompt, setPrompt] = useState("The future of artificial intelligence");
    const [selectedLength, setSelectedLength] = useState(300);
    const [articleContent, setArticleContent] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const handleGenerateArticle = useCallback(async () => {
        if (!prompt.trim()) {
            toast.error("Please enter an article prompt");
            return;
        }

        setIsLoading(true);

        try {

            const { data } = await api.post("/article", {
                prompt: prompt,
                length: selectedLength,
            });

            if (data?.status !== "success") {
                toast.error(data?.message || "Failed to generate article");
                return;
            }

            setArticleContent(data.data);
        } catch (error) {
            console.error(error);
            toast.error("An error occurred while generating the article");
        } finally {
            setIsLoading(false);
        }
    }, [prompt, selectedLength]);

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

            <ArticleResult content={articleContent} isLoading={isLoading} />
        </div>
    );
};

export default WriteArticle;
