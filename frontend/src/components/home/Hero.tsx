import { useNavigate } from 'react-router-dom';
import gradientBackground from '../../assets/gradientBackground.png';
import { path } from '../../routes/paths';
import { useUser } from '@clerk/clerk-react';

export const Hero = () => {
    const navigate = useNavigate()
    const { user } = useUser()
    return (
        <div
            className="relative flex flex-col w-full items-center justify-center px-4 sm:px-20 xl:px-32 h-screen bg-cover bg-no-repeat min-h-screen"
            style={{ backgroundImage: `url(${gradientBackground})` }}
        >
            {/* Main Headline - Changed "Create Content" to "Scale Workflow" context */}
            <h1 className="text-gray-900 text-4xl md:text-6xl font-extrabold text-center tracking-tight leading-tight max-w-5xl">
                Supercharge your workflow <br className="hidden md:block" />
                using <span className="text-indigo-600">Next-Gen AI</span>
            </h1>

            {/* Subheading - Changed "Transform creation" to "Eliminate busywork" context */}
            <p className="text-gray-600 mt-6 text-center text-lg max-w-2xl leading-relaxed">
                Stop staring at a blank page. Unlock a suite of intelligent assistants that
                automate your writing, design, and research tasks in seconds.
            </p>

            {/* Buttons Container - Changed labels to be more action-oriented */}
            <div className="mt-10 flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
                <button onClick={() => user && navigate(path.DASHBOARD)} className="px-8 py-3.5 rounded-lg bg-indigo-600 text-white font-semibold hover:bg-indigo-700 transition-all transform hover:scale-105 shadow-lg shadow-indigo-600/20">
                    Get started for free
                </button>
                <button className="px-8 py-3.5 rounded-lg bg-white text-gray-700 border border-gray-200 font-semibold hover:bg-gray-50 transition-colors hover:border-indigo-200">
                    See how it works
                </button>
            </div>

            {/* Social Proof - Changed "Trusted by people" to "Teams/Innovators" */}
            <div className="mt-12 flex flex-col items-center gap-4">
                <div className="flex items-center -space-x-3">
                    {/* Placeholder Avatars */}
                    {[1, 2, 3, 4].map((i) => (
                        <img
                            key={i}
                            className="h-10 w-10 rounded-full border-2 border-white object-cover shadow-sm"
                            // Using a different placeholder range so faces look different too
                            src={`https://i.pravatar.cc/100?img=${i + 20}`}
                            alt={`Member ${i}`}
                        />
                    ))}
                </div>
                <p className="text-gray-500 text-sm font-medium">
                    Joined by <span className="text-indigo-600 font-bold">12,000+</span> innovators
                </p>
            </div>
        </div>
    )
}