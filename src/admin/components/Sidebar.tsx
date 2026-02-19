import { NavLink } from 'react-router-dom';

interface SidebarProps {
    isCollapsed: boolean;
    onToggle: () => void;
    className?: string;
}

export default function Sidebar({ isCollapsed, onToggle, className = '' }: SidebarProps) {
    return (
        <div className={`bg-fresqo-dark text-white shadow-xl transition-all duration-300 flex flex-col ${className}`}>
            <div className={`h-16 flex items-center ${isCollapsed ? 'justify-center' : 'justify-between px-6'} border-b border-gray-800`}>
                <h1 className="font-oswald font-bold text-2xl tracking-wider">
                    <span className="text-fresqo-lime">F</span>
                    {!isCollapsed && <span>RESQO</span>}
                </h1>
                {!isCollapsed && (
                    <button onClick={onToggle} className="text-gray-400 hover:text-white transition-colors">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
                    </button>
                )}
            </div>

            <nav className="flex-1 p-3 space-y-1 overflow-y-auto py-6">
                <div className="mb-2 px-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    {!isCollapsed && 'Overview'}
                </div>
                <NavItem to="/admin/dashboard" label="Dashboard" collapsed={isCollapsed} icon={<HomeIcon />} />
                <NavItem to="/admin/analytics" label="Analytics" collapsed={isCollapsed} icon={<ChartIcon />} />

                <div className="mt-6 mb-2 px-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    {!isCollapsed && 'Management'}
                </div>
                <NavItem to="/admin/orders" label="Orders" collapsed={isCollapsed} icon={<ShoppingBagIcon />} />
                <NavItem to="/admin/products" label="Products" collapsed={isCollapsed} icon={<BoxIcon />} />
                <NavItem to="/admin/customers" label="Customers" collapsed={isCollapsed} icon={<UsersIcon />} />

                <div className="mt-6 mb-2 px-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    {!isCollapsed && 'System'}
                </div>
                <NavItem to="/admin/admin-management" label="Admins" collapsed={isCollapsed} icon={<ShieldIcon />} />
                <NavItem to="/admin/settings" label="Settings" collapsed={isCollapsed} icon={<CogIcon />} />
            </nav>

            <div className="p-4 border-t border-gray-800">
                {isCollapsed && (
                    <button onClick={onToggle} className="w-full flex justify-center text-gray-400 hover:text-white">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                    </button>
                )}
                {!isCollapsed && (
                    <div className="flex items-center gap-3 px-2">
                        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-fresqo-lime to-fresqo-aqua flex items-center justify-center text-fresqo-dark font-bold text-xs">A</div>
                        <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-white truncate">Admin User</p>
                            <p className="text-xs text-gray-400 truncate">admin@fresqo.com</p>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

const NavItem = ({ to, label, collapsed, icon }: { to: string; label: string; collapsed: boolean; icon: React.ReactNode }) => (
    <NavLink
        to={to}
        end={to === '/admin/dashboard'}
        className={({ isActive }) =>
            `flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200 group relative
            ${isActive
                ? 'bg-fresqo-lime text-fresqo-dark font-medium shadow-glow'
                : 'text-gray-400 hover:bg-gray-800 hover:text-white'
            }`
        }
    >
        <span className="flex-shrink-0 w-6 h-6 flex items-center justify-center transition-colors">
            {icon}
        </span>
        {!collapsed && <span>{label}</span>}
        {collapsed && (
            <div className="absolute left-full ml-2 px-2 py-1 bg-gray-900 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-50">
                {label}
            </div>
        )}
    </NavLink>
);

// Simple Icons
const HomeIcon = () => <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg>;
const ShoppingBagIcon = () => <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" /></svg>;
const BoxIcon = () => <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" /></svg>;
const UsersIcon = () => <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" /></svg>;
const ChartIcon = () => <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>;
const CogIcon = () => <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg>;
const ShieldIcon = () => <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>;
