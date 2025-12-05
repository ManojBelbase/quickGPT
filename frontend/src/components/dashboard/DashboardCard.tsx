// src/components/DashboardCard.tsx
import React from 'react';
import { Sparkles, Zap } from 'lucide-react';

interface DashboardCardProps {
    title: string;
    value: string | number;
    iconType: 'creations' | 'plan';
}

const DashboardCard: React.FC<DashboardCardProps> = ({ title, value, iconType }) => {
    const icon = iconType === 'creations' ? <Sparkles className="w-6 h-6 text-blue-500" /> : <Zap className="w-6 h-6 text-purple-500" />;
    const iconBg = iconType === 'creations' ? 'bg-blue-50' : 'bg-purple-50';

    return (
        <div className="flex items-center justify-between p-6 bg-white rounded-md shadow-xs border border-gray-200 min-w-[200px]">
            <div>
                <div className="text-3xl font-bold text-gray-800">{value}</div>
                <div className="text-sm font-medium text-gray-500 mt-1">{title}</div>
            </div>
            <div className={`p-3 rounded-xl ${iconBg}`}>
                {icon}
            </div>
        </div>
    );
};

export default DashboardCard;