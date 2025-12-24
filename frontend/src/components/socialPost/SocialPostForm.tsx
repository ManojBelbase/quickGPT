import { Wand2, Loader2 } from "lucide-react";
import { Button } from "../ui/Button";
import { Switch } from "../ui/Switch";
import type { SocialPostFormProps } from "../../types";
import { ALLOWED_TONES, lengths, platforms } from "../../const/const";

const SocialPostForm: React.FC<SocialPostFormProps> = ({
    prompt,
    onPromptChange,
    platform,
    onPlatformChange,
    tone,
    onToneChange,
    length,
    onLengthChange,
    includeHashtags,
    generateImage,
    onGenerateImageChange,
    onIncludeHashtagsChange,
    onGenerate,
    isLoading,
}) => {
    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        if (!prompt.trim() || isLoading) return;
        onGenerate();
    };

    return (
        <div className="w-full p-2 sm:p-4 bg-white rounded-xl shadow-sm h-fit">
            <h2 className="text-xl font-bold text-gray-900 flex items-center mb-6">
                <Wand2 className="w-5 h-5 mr-2 text-purple-600" />
                Social Post Generator
            </h2>

            <form onSubmit={handleSubmit} className="space-y-6">
                {/* Prompt Input */}
                <div>
                    <label htmlFor="post-prompt" className="block text-sm font-medium text-gray-700 mb-2">
                        What do you want to post about?
                    </label>
                    <textarea
                        id="post-prompt"
                        placeholder="e.g., Announce the launch of our new eco-friendly product line..."
                        value={prompt}
                        onChange={(e) => onPromptChange(e.target.value)}
                        rows={2}
                        className="w-full rounded-md border border-gray-300 bg-white p-3 text-sm text-gray-800 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 disabled:opacity-50"
                        disabled={isLoading}
                        required
                    />
                </div>

                {/* Platform Selection */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Platform</label>
                    <div className="flex flex-wrap gap-2">
                        {platforms.map((p) => (
                            <button
                                key={p}
                                type="button"
                                onClick={() => onPlatformChange(p)}
                                className={`py-2 px-4 cursor-pointer text-sm font-medium rounded-md transition-colors border ${platform === p
                                    ? "bg-purple-600 text-white border-purple-600 shadow-sm"
                                    : "bg-white text-gray-700 border-gray-300 hover:bg-gray-50"
                                    }`}
                                disabled={isLoading}
                            >
                                {p.charAt(0).toUpperCase() + p.slice(1)}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Tone Selection */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Tone</label>
                    <div className="flex flex-wrap gap-2">
                        {(Object.keys(ALLOWED_TONES) as string[]).map((t) => (
                            <button
                                key={t}
                                type="button"
                                onClick={() => onToneChange(t)}
                                className={`py-2 px-4 cursor-pointer text-sm font-medium rounded-md transition-colors border ${tone === t
                                    ? "bg-purple-600 text-white border-purple-600"
                                    : "bg-white text-gray-700 border-gray-300 hover:bg-gray-50"
                                    }`}
                                disabled={isLoading}
                            >
                                {t.charAt(0).toUpperCase() + t.slice(1)}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Length Selection */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Length</label>
                    <div className="flex flex-wrap gap-2">
                        {lengths.map((l) => (
                            <button
                                key={l.value}
                                type="button"
                                onClick={() => onLengthChange(l.value)}
                                className={`py-2 cursor-pointer px-4 text-sm font-medium rounded-md transition-colors border ${length === l.value
                                    ? "bg-purple-600 text-white border-purple-600"
                                    : "bg-white text-gray-700 border-gray-300 hover:bg-gray-50"
                                    }`}
                                disabled={isLoading}
                            >
                                {l.label}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Hashtags Toggle */}
                <div className="flex items-start gap-4 sm:items-center flex-col sm:flex-row justify-between">
                    <div className="flex items-center gap-3">
                        <Switch
                            checked={includeHashtags}
                            onCheckedChange={onIncludeHashtagsChange}
                            disabled={isLoading}
                        />
                        <span className="text-sm font-medium text-gray-700">Include hashtags</span>
                    </div>
                    <div className="flex items-center gap-3">
                        <Switch
                            checked={generateImage}
                            onCheckedChange={onGenerateImageChange}
                            disabled={isLoading}
                        />
                        <span className="text-sm font-medium text-gray-700">Generate image with caption</span>
                    </div>

                </div>


                {/* Generate Button */}
                <Button
                    type="submit"
                    className="w-full py-3 h-12 text-lg font-medium bg-purple-600 hover:bg-purple-700 transition-colors flex items-center justify-center"
                    disabled={!prompt.trim() || isLoading}
                >
                    {isLoading ? (
                        <>
                            <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                            Generating...
                        </>
                    ) : (
                        <>
                            <Wand2 className="mr-2 h-5 w-5" />
                            Generate Post
                        </>
                    )}
                </Button>
            </form>
        </div>
    );
};

export default SocialPostForm;