import React from 'react';

interface CreationItem {
    id: number;
    prompt: string;
    type: string;
    created_at: string;
}

interface RecentCreationItemProps {
    creation: CreationItem;
}

const RecentCreationItem: React.FC<RecentCreationItemProps> = ({ creation }) => {
    const date = new Date(creation.created_at).toLocaleDateString('en-US', {
        day: 'numeric',
        month: 'numeric',
        year: 'numeric',
    }).replace(/\//g, '/');


    const isImage = creation.type.includes('image') || creation.type.includes('background') || creation.type.includes('object');

    return (
        <div className="flex items-center justify-between p-4 bg-white rounded-lg border border-gray-200 hover:shadow-xs transition-shadow">
            <div className="flex flex-col">
                {/* Display the prompt or a descriptive title */}
                <div className="text-base font-medium text-gray-800 truncate max-w-xl">
                    {creation.type === 'article' ? (
                        // Use a part of the content as title for articles (or a specific title field if available)
                        // For simplicity, we'll use a hardcoded title matching the image for now
                        "Navigating the Technological Frontier: Trends Shaping Our Future"
                    ) : creation.type === 'blog-title' ? (
                        creation.prompt // Use the prompt for blog titles
                    ) : (
                        "Background removed from an image." // Use a generic description for image types
                    )}
                </div>
                <div className="text-sm text-gray-500 mt-0.5">
                    {isImage ? 'image' : 'article'} - {date}
                </div>
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