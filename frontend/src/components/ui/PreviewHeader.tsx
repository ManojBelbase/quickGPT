import React from 'react';
import { CopyButton } from '../ui/CopyButton';
import { DownloadButton } from '../ui/DownloadButton';
import type { PreviewHeaderProps } from '../../types';


export const PreviewHeader: React.FC<PreviewHeaderProps> = ({
    title,
    icon,
    isCopy = false,
    copyText,
    copyTitle = "Copy",
    isDownload = false,
    downloadUrl,
    downloadFilename = "generated.png",
    actionButton,
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

            {rightContent && <div className="flex items-center gap-2">{rightContent}</div>}
        </div>
    );
};