import React from 'react';
import { Loader2, Sparkles, Image as ImageIcon } from 'lucide-react';
import { AIResponseParser } from 'ai-response-parser';
import { PreviewHeader } from '../ui/PreviewHeader';
import { sharePost } from '../../utils/sharePost';

interface SocialPostPreviewProps {
    posts: string[];
    isLoading: boolean;
}

export const SocialPostPreview: React.FC<SocialPostPreviewProps> = ({ posts, isLoading }) => {
    const isInitialState = posts.length === 0 && !isLoading;

    const parseContent = (fullText: string) => {
        const urlRegex = /(https?:\/\/[^\s]+)/g;
        const urls = fullText.match(urlRegex);
        const imageUrl = urls ? urls[urls.length - 1] : null;
        const cleanText = imageUrl ? fullText.replace(imageUrl, '').trim() : fullText;
        return { cleanText, imageUrl };
    };

    const allCleanTexts = posts
        .map(post => parseContent(post).cleanText)
        .filter(Boolean);

    const shareText = allCleanTexts.join('\n\n\n');

    const getFirstImageUrl = () => {
        for (const post of posts) {
            const { imageUrl } = parseContent(post);
            if (imageUrl) return imageUrl;
        }
        return null;
    };

    const handleShare = () => {
        sharePost({
            caption: shareText,
            imageUrl: getFirstImageUrl(),
        });
    };

    return (
        <div className="w-full p-2 h-full bg-white rounded-md shadow-md">
            <PreviewHeader
                title="Post Preview"
                icon={<Sparkles className="w-5 h-5 mr-2 text-purple-600" />}
                isCopy={posts.length > 0}
                copyText={shareText}
                onShare={handleShare}
            />

            <div className="min-h-[300px] h-full sm:min-h-[600px] border-t-2 border-gray-200 p-2 sm:p-4 relative">
                {posts.length > 0 && (
                    <div className="space-y-6">
                        {posts.map((post, index) => {
                            const { cleanText, imageUrl } = parseContent(post);
                            return (
                                <div key={index} className="space-y-4">
                                    <AIResponseParser
                                        content={cleanText}
                                        themeName="light"
                                        textColor="#000000"
                                    />

                                    {imageUrl && (
                                        <div className="relative rounded-xl overflow-hidden border border-gray-200 shadow-sm">
                                            <div className="absolute top-2 left-2 z-10 bg-black/50 text-white px-2 py-1 rounded text-[10px] flex items-center backdrop-blur-sm">
                                                <ImageIcon className="w-3 h-3 mr-1" />
                                                AI Generated Image
                                            </div>
                                            <img
                                                src={imageUrl}
                                                alt="Post attachment"
                                                className="w-full h-auto object-cover max-h-[400px]"
                                            />
                                        </div>
                                    )}
                                </div>
                            );
                        })}
                    </div>
                )}

                {isLoading && (
                    <div className="absolute inset-0 flex flex-col items-center justify-center bg-white/90 z-20">
                        <Loader2 className="h-8 w-8 text-purple-600 animate-spin" />
                        <p className="mt-4 text-gray-600 font-medium text-center">
                            Creating something amazing for you…
                        </p>
                    </div>
                )}

                {isInitialState && (
                    <div className="flex flex-col h-full items-center justify-center text-center text-gray-500">
                        <Sparkles className="w-12 h-12 mb-3 text-gray-300" />
                        <p className="text-lg font-medium">Ready to generate</p>
                    </div>
                )}
            </div>
        </div>
    );
};
