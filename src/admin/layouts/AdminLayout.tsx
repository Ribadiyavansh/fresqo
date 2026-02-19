import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '@/admin/components/Sidebar';
import Header from '@/admin/components/Header';

export default function AdminLayout() {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [isCollapsed, setIsCollapsed] = useState(false);

    const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);
    const toggleCollapse = () => setIsCollapsed(!isCollapsed);

    return (
        <div className="flex h-screen bg-fresqo-offwhite font-roboto overflow-hidden">
            {/* Mobile Sidebar Overlay */}
            {isSidebarOpen && (
                <div
                    className="fixed inset-0 bg-black/50 z-20 lg:hidden glass"
                    onClick={() => setIsSidebarOpen(false)}
                />
            )}

            {/* Sidebar */}
            <div className={`
                fixed lg:static inset-y-0 left-0 z-30
                transform ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
                lg:translate-x-0 transition-transform duration-300 ease-expo-out
                ${isCollapsed ? 'lg:w-20' : 'lg:w-64'}
            `}>
                <Sidebar
                    isCollapsed={isCollapsed}
                    onToggle={toggleCollapse}
                    className="h-full border-r border-gray-200"
                />
            </div>

            {/* Main Content */}
            <div className="flex-1 flex flex-col min-w-0">
                <Header onMenuToggle={toggleSidebar} />

                <main className="flex-1 overflow-auto p-4 md:p-6 lg:p-8 scroll-smooth">
                    <div className="max-w-7xl mx-auto space-y-6 animate-fade-in">
                        <Outlet />
                    </div>
                </main>
            </div>
        </div>
    );
}
