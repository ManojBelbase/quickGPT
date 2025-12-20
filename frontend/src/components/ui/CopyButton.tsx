import React, { useState } from 'react';
import { Copy, Check } from 'lucide-react';
import type { CopyButtonProps } from '../../types';

export const CopyButton: React.FC<CopyButtonProps> = ({
    text,
    className = '',
    title = 'Copy text',
    size = 'sm',
}) => {
    const [copied, setCopied] = useState(false);

    const handleCopy = async () => {
        if (!text?.trim()) {
            console.warn('No text to copy');
            return;
        }

        try {
            await navigator.clipboard.writeText(text);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch (err) {
            console.error('Clipboard copy failed:', err);
        }
    };

    const sizeClasses = {
        sm: 'px-2 py-1 text-xs gap-1',
        md: 'px-3 py-1.5 text-sm gap-2',
        lg: 'px-4 py-2 text-base gap-2',
    }[size];

    return (
        <button
            onClick={handleCopy}
            title={title}
            disabled={!text}
            className={`
                flex items-center cursor-pointer rounded-md font-medium
                text-gray-700 bg-gray-100 hover:bg-gray-200
                transition-colors focus:outline-none focus:ring-2
                focus:ring-purple-500 disabled:opacity-50
                ${sizeClasses} ${className}
            `}
        >
            {copied ? (
                <>
                    <Check className="w-4 h-4 text-purple-600" />
                    <span>Copied!</span>
                </>
            ) : (
                <>
                    <Copy className="w-4 h-4" />
                    <span>Copy</span>
                </>
            )}
        </button>
    );
};
