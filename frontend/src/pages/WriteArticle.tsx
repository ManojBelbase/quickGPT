import React, { useState } from "react";
import ArticleForm from "../components/article/ArticleForm";
import ArticleList from "../components/article/ArticleList";
import { ArticlePreview } from "../components/article/ArticlePreview";
import { useGenerateArticle } from "../hooks/useArticles";
import toast from "react-hot-toast";

const WriteArticle: React.FC = () => {
    const [prompt, setPrompt] = useState("");
    const [selectedLength, setSelectedLength] = useState(300);
    const [articleContent, setArticleContent] = useState("");
    const [isGenerating, setIsGenerating] = useState(false);

    const { mutateAsync: generateArticle } = useGenerateArticle();

    const handleGenerateArticle = async () => {
        if (!prompt.trim()) {
            return;
        }

        setIsGenerating(true);

        try {
            const content = await generateArticle({
                prompt,
                length: selectedLength,
            });

            setArticleContent(content);
            setPrompt("");
            toast.success("Article generated successfully!");
        } catch (error: any) {
            toast.error(error?.response.data.message || "Failed to generate Article");
        } finally {
            setIsGenerating(false);
        }
    };

    return (
        <div className="min-h-screen">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-2 h-full">
                {/* LEFT SIDE */}
                <div className="col-span-1 md:col-span-1 lg:col-span-2 flex flex-col gap-2">
                    <ArticleForm
                        prompt={prompt}
                        onpromptChange={setPrompt}
                        selectedLenght={selectedLength}
                        onLenghtChange={setSelectedLength}
                        onGenerate={handleGenerateArticle}
                        isLoading={isGenerating}
                    />

                    <div className="flex-1 overflow-hidden">
                        <ArticleList onSelectArticle={setArticleContent} />
                    </div>
                </div>

                {/* RIGHT SIDE */}
                <div className="col-span-1 md:col-span-1 lg:col-span-3 flex flex-col">
                    <ArticlePreview
                        content={articleContent}
                        isLoading={isGenerating}
                    />
                </div>
            </div>
        </div>
    );
};

export default WriteArticle;