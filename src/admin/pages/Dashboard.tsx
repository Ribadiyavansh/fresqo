
import { mockDashboardMetrics, mockRevenueData, mockOrders } from '@/admin/data/mockData';

export default function Dashboard() {
    // Calculate max revenue for chart scaling
    const maxRevenue = Math.max(...mockRevenueData.map(d => d.revenue));

    return (
        <div className="space-y-8">
            {/* Header Section */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h2 className="text-3xl font-oswald font-bold text-gray-900">Dashboard</h2>
                    <p className="text-gray-500 mt-1">Overview of your store's performance</p>
                </div>
                <div className="flex bg-white rounded-lg p-1 shadow-xs border border-gray-100 w-fit">
                    <button className="px-4 py-1.5 text-sm font-medium bg-fresqo-dark text-white rounded shadow-sm">Today</button>
                    <button className="px-4 py-1.5 text-sm font-medium text-gray-600 hover:bg-gray-50 rounded">Weekly</button>
                    <button className="px-4 py-1.5 text-sm font-medium text-gray-600 hover:bg-gray-50 rounded">Monthly</button>
                </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <StatCard
                    title="Total Revenue"
                    value={`₹${mockDashboardMetrics.totalRevenue.toLocaleString()}`}
                    trend={mockDashboardMetrics.revenueTrend}
                    icon={<CurrencyIcon />}
                    color="bg-fresqo-lime"
                />
                <StatCard
                    title="Total Orders"
                    value={mockDashboardMetrics.totalOrdersToday.toString()}
                    trend={mockDashboardMetrics.totalOrdersTrend}
                    icon={<ShoppingBagIcon />}
                    color="bg-fresqo-aqua"
                />
                <StatCard
                    title="Pending Orders"
                    value={mockDashboardMetrics.pendingOrders.toString()}
                    trend={mockDashboardMetrics.pendingTrend}
                    icon={<ClockIcon />}
                    color="bg-orange-200"
                    trendReverse
                />
                <StatCard
                    title="Cancelled"
                    value={mockDashboardMetrics.cancelledOrders.toString()}
                    trend={mockDashboardMetrics.cancelledTrend}
                    icon={<XCircleIcon />}
                    color="bg-red-200"
                    trendReverse
                />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Revenue Chart */}
                <div className="bg-white p-6 rounded-2xl shadow-soft border border-gray-100 lg:col-span-2">
                    <div className="flex justify-between items-center mb-6">
                        <h3 className="font-bold text-lg text-gray-800">Revenue Analytics</h3>
                        <button className="text-fresqo-aqua text-sm font-medium hover:underline">View Report</button>
                    </div>

                    <div className="h-64 flex items-end justify-between gap-2 md:gap-4 px-2">
                        {mockRevenueData.map((data, index) => (
                            <div key={index} className="flex flex-col items-center gap-2 group flex-1">
                                <div
                                    className="w-full bg-fresqo-dark/5 rounded-t-lg relative group-hover:bg-fresqo-aqua/20 transition-colors duration-300"
                                    style={{ height: '100%' }}
                                >
                                    <div
                                        className="absolute bottom-0 left-0 w-full bg-fresqo-dark rounded-t-lg transition-all duration-1000 ease-out group-hover:bg-fresqo-aqua"
                                        style={{ height: `${(data.revenue / maxRevenue) * 100}%` }}
                                    ></div>

                                    {/* Tooltip */}
                                    <div className="absolute -top-12 left-1/2 -translate-x-1/2 bg-gray-900 text-white text-xs py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-10 pointer-events-none">
                                        ₹{data.revenue}
                                        <div className="text-[10px] text-gray-400">{data.orders} orders</div>
                                    </div>
                                </div>
                                <span className="text-xs text-gray-400 font-medium rotate-0 md:rotate-0">{new Date(data.date).getDate()} Jan</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Recent Activity / Mini List */}
                <div className="bg-white p-6 rounded-2xl shadow-soft border border-gray-100 flex flex-col">
                    <h3 className="font-bold text-lg text-gray-800 mb-6">Recent Orders</h3>
                    <div className="flex-1 overflow-auto -mx-2 px-2 space-y-4 pr-1 scrollbar-thin">
                        {mockOrders.slice(0, 5).map(order => (
                            <div key={order.id} className="flex items-center justify-between p-3 rounded-xl hover:bg-gray-50 transition-colors border border-transparent hover:border-gray-100 group">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-lg">
                                        🥗
                                    </div>
                                    <div>
                                        <div className="font-medium text-gray-900 text-sm group-hover:text-fresqo-aqua transition-colors">{order.customerName}</div>
                                        <div className="text-xs text-gray-500">{order.totalQuantity} items • ₹{order.totalAmount}</div>
                                    </div>
                                </div>
                                <span className={`px-2 py-1 rounded-full text-[10px] font-bold uppercase ${order.status === 'DELIVERED' ? 'bg-green-100 text-green-700' :
                                    order.status === 'CANCELLED' ? 'bg-red-100 text-red-700' :
                                        'bg-blue-100 text-blue-700'
                                    }`}>
                                    {order.status}
                                </span>
                            </div>
                        ))}
                    </div>
                    <button className="w-full mt-4 py-2 text-sm text-gray-500 hover:text-gray-800 font-medium border-t border-gray-100 transition-colors">
                        View All Orders
                    </button>
                </div>
            </div>
        </div>
    );
}

function StatCard({ title, value, trend, icon, color, trendReverse = false }: any) {
    const isPositive = trend >= 0;
    const isGood = trendReverse ? !isPositive : isPositive;

    return (
        <div className="bg-white p-6 rounded-2xl shadow-soft border border-gray-100 card-lift group">
            <div className="flex justify-between items-start mb-4">
                <div className={`w-12 h-12 rounded-xl ${color} flex items-center justify-center text-fresqo-dark shadow-sm group-hover:scale-110 transition-transform duration-300`}>
                    {icon}
                </div>
                {trend !== 0 && (
                    <div className={`flex items-center text-xs font-bold px-2 py-1 rounded-full ${isGood ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                        {isPositive ? '+' : ''}{trend}%
                        <svg className={`w-3 h-3 ml-1 ${isPositive ? '' : 'rotate-180'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 10l7-7m0 0l7 7m-7-7v18" /></svg>
                    </div>
                )}
            </div>
            <h3 className="text-gray-500 text-sm font-medium">{title}</h3>
            <p className="text-3xl font-bold text-gray-900 mt-1 font-oswald tracking-tight">{value}</p>
        </div>
    );
}

const CurrencyIcon = () => <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>;
const ShoppingBagIcon = () => <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" /></svg>;
const ClockIcon = () => <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>;
const XCircleIcon = () => <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>;
