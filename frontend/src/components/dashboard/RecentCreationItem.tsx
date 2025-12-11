import React, { useState } from 'react';
import type { CreationItem } from '../../types';
import { AIResponseParser } from 'ai-response-parser';

interface RecentCreationItemProps {
    creation: CreationItem;
}


const RecentCreationItem: React.FC<RecentCreationItemProps> = ({ creation }) => {
    const [expanded, setExpanded] = useState(false)

    const date = new Date(creation.created_at).toLocaleDateString('en-US', {
        day: 'numeric',
        month: 'numeric',
        year: 'numeric',
    }).replace(/\//g, '/');


    const isImage = creation.type.includes('image') || creation.type.includes('background') || creation.type.includes('object');

    return (
        <div className="flex items-start justify-between p-4 bg-white rounded-lg border border-gray-200 hover:shadow-xs transition-shadow cursor-pointer" onClick={() => setExpanded(!expanded)}>
            <div className="flex flex-col" >
                {/* Display the prompt or a descriptive title */}
                <div className="text-base font-medium text-gray-800 truncate max-w-xl cursor-pointer" >
                    {creation.type === 'article' ? (
                        "Navigating the Technological Frontier: Trends Shaping Our Future"
                    ) : creation.type === 'blog-title' ? (
                        creation.prompt || "AI-Generated Blog Title"
                    ) : (
                        "Background removed from an image."
                    )}
                </div>

                <div className="text-sm text-gray-500 mt-0.5">
                    {isImage ? 'image' : 'article'} - {date}
                </div>
                {expanded && <span className='text-sm'>

                    <AIResponseParser content={creation.content} className='reset-tw' /></span>}
                {!expanded && <span className='text-sm truncate max-w-xl'>
                    {creation.content}</span>}
            </div>
            <span
                className={`px-3 py-1 text-xs font-semibold rounded-full
          ${isImage ? 'bg-blue-100 text-blue-800' : 'bg-purple-100 text-purple-800'}`}
            >
                {isImage ? 'Image' : 'Article'}
            </span>
        </div>
    );
};

export default RecentCreationItem;