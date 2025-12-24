// PreviewHeader.tsx
import React from 'react';
import { Share2 } from 'lucide-react';
import { CopyButton } from '../ui/CopyButton';
import { DownloadButton } from '../ui/DownloadButton';
import type { PreviewHeaderProps } from '../../types';

interface ExtendedPreviewHeaderProps extends PreviewHeaderProps {
    onShare?: () => void;
}

export const PreviewHeader: React.FC<ExtendedPreviewHeaderProps> = ({
    title,
    icon,
    isCopy = false,
    copyText,
    copyTitle = "Copy",
    isDownload = false,
    downloadUrl,
    downloadFilename = "generated.png",
    actionButton,
    onShare,
    className = '',
}) => {
    let rightContent: React.ReactNode = null;

    if (isCopy && copyText) {
        rightContent = (
            <CopyButton
                text={copyText}
                size="md"
                title={copyTitle}
            />
        );
    } else if (isDownload && downloadUrl) {
        rightContent = (
            <DownloadButton
                url={downloadUrl}
                filename={downloadFilename}
                label="Download"
                size="sm"
            />
        );
    } else if (actionButton) {
        rightContent = actionButton;
    }

    return (
        <div className={`flex items-center justify-between mb-2 sm:mb-4 px-2 ${className}`}>
            <h2 className="text-lg sm:text-xl font-semibold text-gray-900 flex items-center">
                {icon}
                <span className="ml-2">{title}</span>
            </h2>

            <div className="flex items-center gap-2">
                {rightContent}
                {onShare && copyText && (
                    <button
                        onClick={onShare}
                        className="flex items-center cursor-pointer gap-1 px-3 py-1.5 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-md transition"
                        title="Share to social media"
                    >
                        <Share2 className="w-4 h-4" />
                        Share
                    </button>
                )}
            </div>
        </div>
    );
};