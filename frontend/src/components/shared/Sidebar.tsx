import { Link, useNavigate } from 'react-router-dom';
import { sidebarLinks } from '../../const/sidebarLinks';
import { useUser, UserButton } from '@clerk/clerk-react';
import { X } from 'lucide-react';
import { path } from '../../routes/paths';
import type { SidebarLink, SidebarProps } from '../../types';
const Sidebar: React.FC<SidebarProps> = ({ currentPath, isOpen, onClose }) => {
    const navigate = useNavigate();
    const { user } = useUser();

    const handleNavigation = (path: string) => {
        navigate(path);
        onClose();
    };

    const SidebarItem: React.FC<{ link: SidebarLink }> = ({ link }) => {
        const isActive = currentPath === link.path;
        const { Icon, name, path } = link;

        return (
            <div
                onClick={() => handleNavigation(path)}
                className={`flex items-center space-x-3 p-3 text-base rounded-xs cursor-pointer transition-colors
                    ${isActive
                        ? 'bg-purple-600 text-white font-medium'
                        : 'text-gray-600 hover:bg-gray-100'
                    }`}
            >
                <Icon className="w-5 h-5" />
                <span>{name}</span>
            </div>
        );
    };

    return (
        <div
            className={`flex flex-col w-64 h-full bg-white border-r border-gray-200
                transition-transform duration-300 ease-in-out
                fixed inset-y-0 left-0 z-50
                ${isOpen ? 'translate-x-0' : '-translate-x-full'}
                md:relative md:translate-x-0 md:flex`}
        >
            {/* User Profile Section (Top) */}
            <div className="flex items-center justify-between p-4 border-b border-gray-200">
                <div className="flex items-center">
                    <Link to={path.HOME} className="text-purple-600 font-bold text-lg sm:text-3xl">

                        QuickGPT
                    </Link>
                </div>
                {/* Close Button for Mobile */}
                <button
                    onClick={onClose}
                    className="md:hidden p-1 rounded-full text-gray-500 hover:bg-gray-100"
                    aria-label="Close menu"
                >
                    <X className="w-6 h-6" />
                </button>
            </div>

            {/* Navigation Links */}
            <nav className="flex-1 overflow-y-auto">
                {sidebarLinks.map((link) => (
                    <SidebarItem key={link.id} link={link} />
                ))}
            </nav>

            {/* Footer User Info (Bottom Left) */}
            <div className="p-4 border-t border-gray-200 flex items-center justify-between">
                <div className="flex items-center text-sm gap-2">

                    <UserButton />
                    <div>
                        <div className="font-medium">{user?.fullName || "Guest User"}</div>
                        <div className="text-xs text-gray-500">Premium Plan</div>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default Sidebar;