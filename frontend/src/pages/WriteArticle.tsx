import React, { useState, useCallback } from "react";
import toast from "react-hot-toast";

import ArticleForm from "../components/article/ArticleForm";
import ArticleResult from "../components/article/ArticleResult";
import ArticleList from "../components/article/ArticleList";
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
                prompt,
                length: selectedLength,
            });

            if (data?.status !== "success") {
                toast.error(data?.message || "Failed to generate article");
                return;
            }

            setArticleContent(data.data);
        } catch (error) {
            toast.error("An error occurred while generating the article");
        } finally {
            setIsLoading(false);
        }
    }, [prompt, selectedLength]);

    return (
        <div className="min-h-screen p-2">
            <div className="
                grid
                grid-cols-1
                md:grid-cols-2
                lg:grid-cols-5
                gap-2
                h-full
            ">
                {/* LEFT SIDE */}
                <div className="
                    col-span-1
                    md:col-span-1
                    lg:col-span-2
                    flex
                    flex-col
                    gap-2
                ">
                    <ArticleForm
                        prompt={prompt}
                        onpromptChange={setPrompt}
                        selectedLenght={selectedLength}
                        onLenghtChange={setSelectedLength}
                        onGenerate={handleGenerateArticle}
                        isLoading={isLoading}
                    />

                    {/* Scroll-safe container */}
                    <div className="flex-1 overflow-hidden">
                        <ArticleList onSelectArticle={setArticleContent} />
                    </div>
                </div>

                {/* RIGHT SIDE */}
                <div className="
                    col-span-1
                    md:col-span-1
                    lg:col-span-3
                    flex
                    flex-col
                ">
                    <ArticleResult
                        content={articleContent}
                        isLoading={isLoading}
                    />
                </div>
            </div>
        </div>
    );
};

export default WriteArticle;


