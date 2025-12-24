import toast from "react-hot-toast";
import { QUICKGPT_COPYRIGHT } from "../const/copyright";

interface SharePostOptions {
    caption: string;
    imageUrl?: string | null;
}

export const sharePost = async ({ caption, imageUrl }: SharePostOptions) => {
    const finalCaption =
        (caption?.trim() || "Check out this QuickGPT AI-generated post ✨") +
        QUICKGPT_COPYRIGHT;

    if (navigator.share) {
        try {
            if (imageUrl) {
                await safeCopy(finalCaption);

                // 2. Prepare the file
                const response = await fetch(imageUrl);
                const blob = await response.blob();
                const file = new File([blob], "quickgpt-ai-post.png", { type: blob.type });

                // 3. Share
                await navigator.share({
                    files: [file],
                    title: "AI Generated Post ✨",
                    text: finalCaption,
                });

                toast.success("Image shared. Caption copied to clipboard! ✨");
                return;
            }


            await navigator.share({
                title: "AI Generated Post ✨",
                text: finalCaption,
            });
            return;

        } catch (err) {
            if ((err as Error).name !== 'AbortError') {
                console.warn("Native share failed:", err);
            }
            return;
        }
    }

    // --- DESKTOP FALLBACK ---
    if (imageUrl) {
        await safeCopy(finalCaption);
        downloadImage(imageUrl);
        toast.success("Image downloaded and caption copied!");
    } else {
        await safeCopy(finalCaption);
        toast.success("Caption copied!");
    }
};

/* ------------------ helpers ------------------ */

const safeCopy = async (text: string) => {
    // Modern clipboard
    if (navigator.clipboard?.writeText && window.isSecureContext) {
        await navigator.clipboard.writeText(text);
        return;
    }

    // Old-school fallback (Safari safe)
    const textarea = document.createElement("textarea");
    textarea.value = text;
    textarea.style.position = "fixed";
    textarea.style.opacity = "0";
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand("copy");
    document.body.removeChild(textarea);
};

const downloadImage = (url: string) => {
    const link = document.createElement("a");
    link.href = url;
    link.download = "quickgpt-ai-post.png";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
};

