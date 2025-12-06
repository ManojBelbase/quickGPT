import { dummyCreationData } from '../assets/assets';
import DashboardCard from '../components/dashboard/DashboardCard';
import RecentCreationItem from '../components/dashboard/RecentCreationItem';

const Dashboard: React.FC = () => {
    const recentCreations = dummyCreationData
        .filter(item => item.type === 'article' || item.type === 'image' || item.type === 'blog-title')
        .slice(0, 4)
        .reverse()

    return (
        <div className="space-y-6">
            <h1 className="text-2xl font-bold text-gray-900">Dashboard Overview</h1>

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


            {/* 2. Recent Creations Section */}
            <section>
                <h2 className="text-xl font-semibold text-gray-800 mb-4">Recent Creations</h2>
                <div className="space-y-3">
                    {recentCreations.map((creation) => (
                        <RecentCreationItem key={creation.id} creation={{
                            ...creation,
                            prompt: creation.type === 'article'
                                ? "Navigating the Technological Frontier: Trends Shaping Our Future"
                                : "Background removed from an image.",
                            type: creation.type === 'article' ? 'article' : 'image',
                            created_at: "2025-06-11T00:00:00.000Z"
                        }} />
                    ))}
                </div>
            </section>


        </div>
    );
};

export default Dashboard;