import { Link, Outlet, useLocation } from "react-router-dom";
import React, { useState } from 'react';
import { Menu } from 'lucide-react';
import Sidebar from "../components/shared/Sidebar";
import { path } from "../routes/paths";
import { Icon } from "@iconify/react";

const Layout: React.FC = () => {
    const location = useLocation();
    const currentPath = location.pathname;
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
            <div className="flex flex-col flex-1 overflow-hidden md:ml-0 ">

                {/* Top Header/Navigation */}
                <header className="flex items-center justify-between h-16 px-4 bg-white border-b border-gray-200 shadow-sm">
                    {/* mobile logo */}
                    <Link to={path.HOME} className="flex sm:hidden items-center gap-2 group">
                        <div className="bg-[#9810fa] p-1.5 rounded-md">
                            <Icon icon="lucide:zap" className="text-white text-lg" />
                        </div>
                        <span className="text-gray-900 font-bold text-lg tracking-tight">
                            Quick<span className="text-[#9810fa]">GPT</span>
                        </span>
                    </Link>

                    {/* Mobile Menu Button (Hamburger) */}
                    <button
                        onClick={() => setSidebarOpen(true)}
                        className="md:hidden  rounded-md text-gray-600 hover:bg-gray-100"
                        aria-label="Open menu"
                    >
                        <Menu className="w-5 h-5" />
                    </button>
                </header>

                <main className="flex-1 overflow-y-auto p-1 md:p-2 max-w-[1800px] mx-auto w-full">
                    <Outlet />
                </main>
            </div>
        </div>
    );
};

export default Layout;