
import { useState } from 'react';
import { mockOrders, statusConfig } from '@/admin/data/mockData';
import type { OrderStatus } from '@/admin/types';

export default function Orders() {
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState<OrderStatus | 'ALL'>('ALL');

    const filteredOrders = mockOrders.filter(order => {
        const matchesSearch =
            order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
            order.customerName.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesStatus = statusFilter === 'ALL' || order.status === statusFilter;
        return matchesSearch && matchesStatus;
    });

    return (
        <div className="space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <h2 className="text-3xl font-oswald font-bold text-gray-900">Orders</h2>
                <div className="flex flex-col sm:flex-row gap-3">
                    <div className="relative">
                        <input
                            type="text"
                            placeholder="Search orders..."
                            className="pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-fresqo-lime w-full sm:w-64 transition-shadow shadow-sm"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                        <svg className="w-5 h-5 text-gray-400 absolute left-3 top-2.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
                    </div>
                    <select
                        className="px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-fresqo-lime bg-white shadow-sm cursor-pointer hover:border-gray-300 transition-colors"
                        value={statusFilter}
                        onChange={(e) => setStatusFilter(e.target.value as OrderStatus | 'ALL')}
                    >
                        <option value="ALL">All Status</option>
                        {Object.keys(statusConfig).map(status => (
                            <option key={status} value={status}>{statusConfig[status as OrderStatus].label}</option>
                        ))}
                    </select>
                </div>
            </div>

            <div className="bg-white rounded-2xl shadow-soft border border-gray-100 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead className="bg-gray-50/50 border-b border-gray-100">
                            <tr>
                                <th className="p-4 pl-6 font-semibold text-gray-600 text-sm tracking-wide">Order ID</th>
                                <th className="p-4 font-semibold text-gray-600 text-sm tracking-wide">Customer</th>
                                <th className="p-4 font-semibold text-gray-600 text-sm tracking-wide">Date</th>
                                <th className="p-4 font-semibold text-gray-600 text-sm tracking-wide">Total</th>
                                <th className="p-4 font-semibold text-gray-600 text-sm tracking-wide">Status</th>
                                <th className="p-4 pr-6 font-semibold text-gray-600 text-sm tracking-wide text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-50">
                            {filteredOrders.length > 0 ? (
                                filteredOrders.map(order => (
                                    <tr key={order.id} className="hover:bg-fresqo-offwhite/50 transition-colors group">
                                        <td className="p-4 pl-6 font-medium text-gray-900 group-hover:text-fresqo-aqua transition-colors">{order.id}</td>
                                        <td className="p-4">
                                            <div className="font-medium text-gray-800">{order.customerName}</div>
                                            <div className="text-xs text-gray-400">{order.city}</div>
                                        </td>
                                        <td className="p-4 text-gray-500 text-sm">
                                            {new Date(order.createdAt).toLocaleDateString()}
                                        </td>
                                        <td className="p-4 font-medium text-gray-900">₹{order.totalAmount}</td>
                                        <td className="p-4">
                                            <span className={`px-2.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${statusConfig[order.status].bgLight} ${statusConfig[order.status].textColor}`}>
                                                {statusConfig[order.status].label}
                                            </span>
                                        </td>
                                        <td className="p-4 pr-6 text-right">
                                            <button className="text-gray-400 hover:text-fresqo-dark hover:bg-gray-100 p-2 rounded-lg transition-all">
                                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={6} className="p-12 text-center text-gray-400">
                                        No orders found matching your criteria.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
                {/* Pagination Placeholder */}
                <div className="p-4 border-t border-gray-100 bg-gray-50/30 flex justify-between items-center text-sm text-gray-500">
                    <div>Showing {filteredOrders.length} results</div>
                    <div className="flex gap-2">
                        <button className="px-3 py-1 border border-gray-200 rounded hover:bg-white disabled:opacity-50" disabled>Prev</button>
                        <button className="px-3 py-1 border border-gray-200 rounded hover:bg-white bg-white text-fresqo-dark font-medium shadow-sm">1</button>
                        <button className="px-3 py-1 border border-gray-200 rounded hover:bg-white">2</button>
                        <button className="px-3 py-1 border border-gray-200 rounded hover:bg-white">Next</button>
                    </div>
                </div>
            </div>
        </div>
    );
}
