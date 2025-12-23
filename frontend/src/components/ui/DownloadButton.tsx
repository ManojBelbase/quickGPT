import React from 'react';
import { Download } from 'lucide-react';

interface DownloadButtonProps {
    url: string;
    filename?: string;
    label?: string;
    size?: 'sm' | 'md';
    className?: string;
}

export const DownloadButton: React.FC<DownloadButtonProps> = ({
    url,
    filename = 'download',
    label = 'Download',
    size = 'sm',
    className = '',
}) => {
    const handleDownload = async () => {
        try {
            const response = await fetch(url, { mode: 'cors' });
            const blob = await response.blob();

            const blobUrl = window.URL.createObjectURL(blob);
            const link = document.createElement('a');

            link.href = blobUrl;
            link.download = filename;

            document.body.appendChild(link);
            link.click();

            document.body.removeChild(link);
            window.URL.revokeObjectURL(blobUrl);
        } catch (error) {
            console.error('Download failed', error);
        }
    };

    const sizeClasses =
        size === 'sm'
            ? 'px-3 py-1 text-sm'
            : 'px-4 py-2 text-base';

    return (
        <button
            onClick={handleDownload}
            className={`
                flex items-center text-xs sm:text-base gap-2 cursor-pointer
                bg-purple-600 text-white rounded-md
                hover:bg-purple-700 transition
                ${sizeClasses}
                ${className}
            `}
        >
            <Download className="w-4 h-4" />
            {label}
        </button>
    );
};
