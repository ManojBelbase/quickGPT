// src/Layout.tsx (Parent component managing state)
import { Outlet, useLocation } from "react-router-dom";
import React, { useState } from 'react';
import { Menu } from 'lucide-react'; // Import icons
import Sidebar from "../components/shared/Sidebar";

const Layout: React.FC = () => {
    const location = useLocation();
    const currentPath = location.pathname;
    // State to control sidebar visibility on mobile
    const [sidebarOpen, setSidebarOpen] = useState(false);

    return (
        <div className="flex h-screen bg-gray-50">

            {/* 1. Sidebar Component (Always Rendered) */}
            <Sidebar
                currentPath={currentPath}
                isOpen={sidebarOpen}
                onClose={() => setSidebarOpen(false)}
            />

            {/* 2. Mobile Backdrop Overlay (only visible when sidebar is open) */}
            {sidebarOpen && (
                <div
                    className="fixed inset-0 z-40 bg-black/40 md:hidden"
                    onClick={() => setSidebarOpen(false)}
                ></div>
            )}

            {/* Main Content Area */}
            <div className="flex flex-col flex-1 overflow-hidden md:ml-0">

                {/* Top Header/Navigation */}
                <header className="flex items-center justify-between h-16 px-6 bg-white border-b border-gray-200 shadow-sm">

                    {/* Mobile Menu Button (Hamburger) */}
                    <button
                        onClick={() => setSidebarOpen(true)}
                        className="md:hidden p-2 rounded-md text-gray-600 hover:bg-gray-100"
                        aria-label="Open menu"
                    >
                        <Menu className="w-6 h-6" />
                    </button>

                    {/* Logo (Visible on all screen sizes) */}
                    <div className="flex items-center justify-start">
                        {/* Replace with your actual logo component or image */}
                        <span className="text-xl font-bold text-gray-800">Quickai</span>
                    </div>

                    {/* Placeholder for other header content (e.g., notifications, actions) */}
                    <div>
                        {/* Add your right-side header elements here if needed */}
                    </div>
                </header>

                {/* Page Content (Outlet) */}
                <main className="flex-1 overflow-y-auto p-4 md:p-8">
                    <Outlet />
                </main>
            </div>
        </div>
    );
};

export default Layout;