
import { useState } from 'react';
import { mockCustomers } from '@/admin/data/mockData';

export default function Customers() {
    const [searchTerm, setSearchTerm] = useState('');

    const filteredCustomers = mockCustomers.filter(customer =>
        customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        customer.phone.includes(searchTerm) ||
        (customer.city && customer.city.toLowerCase().includes(searchTerm.toLowerCase()))
    );

    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <h2 className="text-3xl font-oswald font-bold text-gray-900">Customers</h2>
                <div className="relative">
                    <input
                        type="text"
                        placeholder="Search customers..."
                        className="pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-fresqo-lime w-full sm:w-64 shadow-sm"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <svg className="w-5 h-5 text-gray-400 absolute left-3 top-2.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {filteredCustomers.map(customer => (
                    <div key={customer.id} className="bg-white rounded-2xl shadow-soft border border-gray-100 p-6 hover:shadow-lift transition-all duration-300 card-lift">
                        <div className="flex items-start justify-between mb-4">
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-fresqo-lime to-fresqo-aqua flex items-center justify-center text-fresqo-dark font-bold text-lg shadow-sm">
                                    {customer.name.charAt(0)}
                                </div>
                                <div>
                                    <h3 className="font-bold text-gray-900">{customer.name}</h3>
                                    <p className="text-xs text-gray-500 flex items-center gap-1">
                                        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                                        {customer.city || 'Unknown'}
                                    </p>
                                </div>
                            </div>
                            <button className="text-gray-400 hover:text-fresqo-aqua transition-colors p-1">
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" /></svg>
                            </button>
                        </div>

                        <div className="space-y-3 mb-6">
                            <div className="flex items-center gap-3 text-sm text-gray-600">
                                <span className="w-8 h-8 rounded-full bg-gray-50 flex items-center justify-center text-gray-400">
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
                                </span>
                                {customer.phone}
                            </div>
                            <div className="flex items-center gap-3 text-sm text-gray-600">
                                <span className="w-8 h-8 rounded-full bg-gray-50 flex items-center justify-center text-gray-400">
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                                </span>
                                {customer.email || 'No email provided'}
                            </div>
                        </div>

                        <div className="flex items-center justify-between pt-4 border-t border-gray-50">
                            <div className="text-center">
                                <div className="text-lg font-bold text-gray-900 font-oswald">{customer.totalOrders}</div>
                                <div className="text-[10px] uppercase font-bold text-gray-400 tracking-wider">Orders</div>
                            </div>
                            <div className="w-px h-8 bg-gray-100"></div>
                            <div className="text-center">
                                <div className="text-lg font-bold text-gray-900 font-oswald">₹{customer.totalSpend.toLocaleString()}</div>
                                <div className="text-[10px] uppercase font-bold text-gray-400 tracking-wider">Spent</div>
                            </div>
                            <div className="w-px h-8 bg-gray-100"></div>
                            <div className="text-center">
                                <div className="text-lg font-bold text-gray-900 font-oswald text-green-600">Active</div>
                                <div className="text-[10px] uppercase font-bold text-gray-400 tracking-wider">Status</div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
