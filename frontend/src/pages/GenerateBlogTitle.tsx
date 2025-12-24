// src/pages/GenerateBlogTitle.tsx
import React, { useState } from "react";
import BlogTitleForm from "../components/blogTitle/BlogTitleForm";
import BlogTitleList from "../components/blogTitle/BlogTitleList";
import { BlogTitlePreview } from "../components/blogTitle/BlogTitlePreview";
import { blogCategories } from "../const/blogCategories";
import toast from "react-hot-toast";
import { useGenerateBlogTitle } from "../hooks/useBlogTitles";

const GenerateBlogTitle: React.FC = () => {
    const [keyword, setKeyword] = useState<string>("");
    const [selectedCategory, setSelectedCategory] = useState<any>(blogCategories[0]);
    const [generatedTitles, setGeneratedTitles] = useState<string[]>([]);
    const [selectedTitle, setSelectedTitle] = useState<string>("");
    const [isGenerating, setIsGenerating] = useState<boolean>(false);
    const { mutateAsync: generateTitles } = useGenerateBlogTitle();

    const handleGenerateTitles = async () => {
        const prompt = `${keyword} ${selectedCategory?.value || ""}`.trim();
        if (!prompt) {
            toast.error("Please enter a keyword");
            return;
        }
        setIsGenerating(true);
        setGeneratedTitles([]);
        setSelectedTitle("");

        try {
            const rawTitles = await generateTitles({ prompt });
            const titles = rawTitles.split(/\r?\n/).filter(Boolean);
            setGeneratedTitles(titles);
            toast.success("Blog titles generated!");
        } catch (err: any) {
            toast.error(err?.response.data.message || "Failed to generate Title");

        } finally {
            setIsGenerating(false);
        }
    };

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-2 ">
            {/* Left: Form + List */}
            <div className="col-span-1 md:col-span-1 lg:col-span-2 flex flex-col gap-2">
                <BlogTitleForm
                    keyword={keyword}
                    onKeywordChange={setKeyword}
                    categories={blogCategories}
                    selectedCategory={selectedCategory}
                    onCategoryChange={setSelectedCategory}
                    onGenerate={handleGenerateTitles}
                    isLoading={isGenerating}
                />

                <div className="flex-1 overflow-hidden">
                    <BlogTitleList onSelectTitle={setSelectedTitle} />
                </div>
            </div>

            {/* Right: Preview */}
            <div className="col-span-1 md:col-span-1 lg:col-span-3 flex flex-col">
                <BlogTitlePreview
                    titles={selectedTitle ? [selectedTitle] : generatedTitles}
                    isLoading={isGenerating}
                />
            </div>
        </div>
    );
};

export default GenerateBlogTitle;