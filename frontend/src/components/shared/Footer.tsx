import { Link } from 'react-router-dom';
import { path } from '../../routes/paths';
import { Icon } from '@iconify/react';


const companyLinks = [
    { name: "Home", href: "#" },
    { name: "About us", href: "#" },
    { name: "Contact us", href: "#" },
    { name: "Privacy policy", href: "#" },
];

export const FooterSection = () => {
    return (
        <footer className="bg-white border-t border-gray-100 mt-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">

                {/* Main Content Grid */}
                <div className="grid grid-cols-1 gap-12 md:grid-cols-4 lg:grid-cols-5">

                    {/* Column 1: Logo and Description */}
                    <div className="md:col-span-2">
                        {/* Logo - Matching the style and name from the image */}
                        <Link to={path.HOME} className="flex items-center gap-2 group">
                            <div className="bg-[#9810fa] p-1.5 rounded-md">
                                <Icon icon="lucide:zap" className="text-white text-xl" />
                            </div>
                            <span className="text-gray-900 font-bold text-2xl tracking-tight">
                                Quick<span className="text-[#9810fa]">GPT</span>
                            </span>
                        </Link>

                        {/* Description Text */}
                        <p className="mt-4 text-sm text-gray-600 max-w-sm">
                            Experience the power of AI with QuickGPT. Transform your content creation with our suite of premium AI tools. Write articles, generate images, and enhance your workflow.
                        </p>
                    </div>

                    {/* Column 2: Company Links */}
                    <div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-4">
                            Company
                        </h3>
                        <ul className="space-y-3">
                            {companyLinks.map((link) => (
                                <li key={link.name}>
                                    <a
                                        href={link.href}
                                        className="text-gray-600 hover:text-purple-600 transition-colors text-sm"
                                    >
                                        {link.name}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Column 3 & 4: Newsletter Subscription */}
                    <div className="lg:col-span-2">
                        <h3 className="text-lg font-semibold text-gray-900 mb-4">
                            Subscribe to our newsletter
                        </h3>
                        <p className="text-sm text-gray-600 mb-4">
                            The latest news, articles, and resources, sent to your inbox weekly.
                        </p>

                        {/* Subscription Form */}
                        <form className="flex flex-col sm:flex-row gap-2">
                            <input
                                type="email"
                                placeholder="Enter your email"
                                className="w-full sm:flex-1 px-4 py-2 border border-gray-300 rounded-md focus:ring-purple-500 focus:border-purple-500 text-sm"
                                aria-label="Email address for subscription"
                            />
                            <button
                                type="submit"
                                className="w-full sm:w-auto px-6 py-2 bg-purple-600 text-white font-medium rounded-md hover:bg-purple-700 transition-colors text-sm shadow-md"
                            >
                                Subscribe
                            </button>
                        </form>
                    </div>

                </div>

                {/* Bottom Bar: Copyright */}
                <div className="mt-12 pt-6 border-t border-gray-100 text-center">
                    <p className="text-sm text-gray-500">
                        Copyright © 2025 QuickGPT.  All Right Reserved. | Desing & Develop by Manoj Belbase
                    </p>
                </div>
            </div>
        </footer>
    );
};