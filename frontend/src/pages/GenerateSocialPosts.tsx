import React, { useState } from "react";
import toast from "react-hot-toast";
import { useGenerateSocialPost } from "../hooks/useSocialPosts";
import SocialPostForm from "../components/socialPost/SocialPostForm";
import SocialPostList from "../components/socialPost/SocialPostList";
import { SocialPostPreview } from "../components/socialPost/SocialPostPreview";

const GenerateSocialPosts: React.FC = () => {
    const [prompt, setPrompt] = useState("");
    const [platform, setPlatform] = useState<"linkedin" | "facebook" | "twitter" | "instagram">("linkedin");
    const [tone, setTone] = useState<"professional" | "casual" | "friendly" | "humorous">("professional");
    const [length, setLength] = useState<"short" | "medium" | "long">("medium");
    const [includeHashtags, setIncludeHashtags] = useState(true);
    const [generatedPost, setGeneratedPost] = useState<string>("");
    const [isGenerating, setIsGenerating] = useState(false);

    const { mutateAsync: generatePost } = useGenerateSocialPost();

    const handleGeneratePost = async () => {
        if (!prompt.trim()) {
            toast.error("Please enter a prompt");
            return;
        }

        setIsGenerating(true);

        try {
            const post = await generatePost({
                prompt,
                platform,
                tone,
                length,
                includeHashtags,
            });
            setGeneratedPost(post);
            toast.success("Post generated successfully!");
        } catch (error: any) {
            toast.error(error?.response?.data?.message || "Failed to generate post");
        } finally {
            setIsGenerating(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-2 h-full max-w-[1600px] mx-auto">
                {/* LEFT SIDE: Form + List */}
                <div className="col-span-1 md:col-span-1 lg:col-span-2 flex flex-col gap-2">
                    <SocialPostForm
                        prompt={prompt}
                        onPromptChange={setPrompt}
                        platform={platform}
                        onPlatformChange={setPlatform}
                        tone={tone}
                        onToneChange={(value) => setTone(value as "professional" | "casual" | "friendly" | "humorous")}
                        length={length}
                        onLengthChange={(value) => setLength(value as "short" | "medium" | "long")}
                        includeHashtags={includeHashtags}
                        onIncludeHashtagsChange={setIncludeHashtags}
                        onGenerate={handleGeneratePost}
                        isLoading={isGenerating}
                    />

                    <div className="flex-1 overflow-y-auto">
                        <SocialPostList onSelectPost={setGeneratedPost} />
                    </div>
                </div>

                {/* RIGHT SIDE: Preview */}
                <div className="col-span-1 md:col-span-1 lg:col-span-2 flex flex-col">
                    <div className="sticky top-0">
                        <SocialPostPreview posts={[generatedPost].filter(Boolean)} isLoading={isGenerating} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default GenerateSocialPosts;