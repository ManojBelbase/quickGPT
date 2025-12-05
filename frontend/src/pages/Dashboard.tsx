// src/pages/Dashboard.tsx
import React from 'react';
import { dummyCreationData } from '../assets/assets';
import DashboardCard from '../components/dashboard/DashboardCard';
import RecentCreationItem from '../components/dashboard/RecentCreationItem';


const Dashboard: React.FC = () => {
    // Filter dummy data to simulate the items shown in the image
    const recentCreations = dummyCreationData
        .filter(item => item.type === 'article' || item.type === 'image' || item.type === 'blog-title')
        .slice(0, 2)
        .reverse()

    return (
        <div className="space-y-6">
            <h1 className="text-2xl font-bold text-gray-900">Dashboard Overview</h1>

            {/* 1. Stats Cards Section */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <DashboardCard
                    title="Total Creations"
                    value={1}
                    iconType="creations"
                />
                <DashboardCard
                    title="Plan Status"
                    value="Premium"
                    iconType="plan"
                />
            </div>

            {/* --- */}

            {/* 2. Recent Creations Section */}
            <section>
                <h2 className="text-xl font-semibold text-gray-800 mb-4">Recent Creations</h2>
                <div className="space-y-3">
                    {/* Manually mapping the dummy data to match the image content */}
                    {recentCreations.map((creation) => (
                        <RecentCreationItem key={creation.id} creation={{
                            ...creation,
                            // Ensure the prompt matches the specific text in the image
                            prompt: creation.type === 'article'
                                ? "Navigating the Technological Frontier: Trends Shaping Our Future"
                                : "Background removed from an image.",
                            type: creation.type === 'article' ? 'article' : 'image',
                            created_at: "2025-06-11T00:00:00.000Z" // Hardcoded date to match image
                        }} />
                    ))}
                    {/* If you had a full list, you might add a 'View All' button here */}
                </div>
            </section>


        </div>
    );
};

export default Dashboard;