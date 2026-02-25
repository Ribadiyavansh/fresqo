import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Calendar, Package } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function MyOrders() {
    const [orders, setOrders] = useState<any[]>([]);

    useEffect(() => {
        // Scroll to top
        if ((window as any).lenis) {
            (window as any).lenis.scrollTo(0, { immediate: true });
        } else {
            window.scrollTo(0, 0);
        }
        // Fetch orders from localStorage
        const savedOrders = JSON.parse(localStorage.getItem('fresqo_orders') || '[]');
        setOrders(savedOrders);
    }, []);

    return (
        <div className="min-h-screen bg-fresqo-cream pt-24 pb-12">
            <div className="container-custom max-w-4xl mx-auto">


                {orders.length === 0 ? (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="bg-white rounded-3xl p-12 text-center shadow-lift"
                    >
                        <div className="w-24 h-24 bg-fresqo-cream rounded-full flex items-center justify-center mx-auto mb-6">
                            <Package className="w-12 h-12 text-fresqo-gray" />
                        </div>
                        <h2 className="text-2xl font-bold text-fresqo-dark mb-4">No orders yet</h2>
                        <p className="text-fresqo-gray mb-8 max-w-md mx-auto">
                            Looks like you haven't placed any orders yet. Discover our amazing flavours and place your first order!
                        </p>
                        <Link to="/#products" className="btn-primary inline-flex">
                            Explore Flavours
                        </Link>
                    </motion.div>
                ) : (
                    <div className="space-y-6">
                        {orders.map((order, index) => (
                            <motion.div
                                key={order.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1 }}
                                className="bg-white rounded-2xl p-6 shadow-lift overflow-hidden"
                            >
                                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6 pb-6 border-b border-fresqo-border">
                                    <div>
                                        <p className="text-sm text-fresqo-gray mb-1">
                                            Order ID: <span className="font-bold text-fresqo-dark">{order.id}</span>
                                        </p>
                                        <div className="flex items-center gap-2 text-sm text-fresqo-gray">
                                            <Calendar className="w-4 h-4" />
                                            {new Date(order.date).toLocaleDateString('en-US', {
                                                year: 'numeric',
                                                month: 'long',
                                                day: 'numeric'
                                            })}
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-4">
                                        <span className="px-4 py-1.5 rounded-full text-sm font-medium bg-fresqo-lime/20 text-fresqo-dark">
                                            {order.status}
                                        </span>
                                        <p className="font-oswald text-2xl font-bold text-fresqo-dark">
                                            ₹{order.totalAmount}
                                        </p>
                                    </div>
                                </div>

                                <div className="space-y-4">
                                    {order.items.map((item: any, i: number) => (
                                        <div key={i} className="flex items-center gap-4">
                                            {item.product.images && item.product.images.length > 0 ? (
                                                <div className="w-16 h-16 rounded-xl bg-fresqo-cream overflow-hidden flex-shrink-0">
                                                    <img
                                                        src={item.product.images[0]}
                                                        alt={item.product.name}
                                                        className="w-full h-full object-cover"
                                                    />
                                                </div>
                                            ) : (
                                                <div className="w-16 h-16 rounded-xl bg-fresqo-cream flex items-center justify-center flex-shrink-0">
                                                    <Package className="w-8 h-8 text-fresqo-gray" />
                                                </div>
                                            )}

                                            <div className="flex-1">
                                                <h4 className="font-semibold text-fresqo-dark">{item.product.name}</h4>
                                                <p className="text-sm text-fresqo-gray">Qty: {item.quantity}</p>
                                            </div>
                                            <div className="font-medium text-fresqo-dark">
                                                ₹{item.product.price * item.quantity}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </motion.div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
