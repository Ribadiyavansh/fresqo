import { useState, useEffect } from 'react';
import { useParams, useNavigate, Navigate, useOutletContext } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Plus, Minus, ShoppingBag, ChevronRight } from 'lucide-react';

import ImageSlider from '@/components/ImageSlider';
import { products } from '@/data/products';
import type { MainLayoutContextType } from '@/layouts/MainLayout';

export default function ProductDetails() {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const { handleAddToCart } = useOutletContext<MainLayoutContextType>();
    const [quantity, setQuantity] = useState(1);

    useEffect(() => {
        if ((window as any).lenis) {
            (window as any).lenis.scrollTo(0, { immediate: true });
        } else {
            window.scrollTo(0, 0);
        }
    }, [id]);

    const product = products.find((p) => p.id === Number(id));

    if (!product) {
        return <Navigate to="/#products" replace />;
    }

    const suggestedProducts = products.filter((p) => p.id !== product.id).slice(0, 3);

    const onAddToCartClick = () => {
        handleAddToCart(product, quantity);
        setQuantity(1);
        // Optionally open cart or provide feedback
    };

    return (
        <div className="pt-32 pb-20 px-6 min-h-screen bg-fresqo-offwhite">
            <div className="container-custom">
                {/* Breadcrumb */}
                <div className="mb-8 flex items-center gap-2 text-sm text-fresqo-gray font-medium">
                    <button onClick={() => navigate('/')} className="hover:text-fresqo-dark transition-colors">Home</button>
                    <ChevronRight className="w-4 h-4" />
                    <button onClick={() => {
                        navigate('/#products');
                        setTimeout(() => {
                            const el = document.getElementById('products');
                            if (el) el.scrollIntoView({ behavior: 'smooth' });
                        }, 100);
                    }} className="hover:text-fresqo-dark transition-colors">Products</button>
                    <ChevronRight className="w-4 h-4" />
                    <span className="text-fresqo-dark">{product.name}</span>
                </div>

                <div className="bg-white rounded-3xl overflow-hidden shadow-soft mb-16">
                    <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
                        {/* Product Image Slider */}
                        <div className="aspect-square md:aspect-auto md:h-full bg-fresqo-cream relative">
                            <ImageSlider
                                images={product.images}
                                productName={product.name}
                                interval={4000}
                                showDots={true}
                                showArrows={true}
                            />
                        </div>

                        {/* Product Details Info */}
                        <div className="p-8 md:p-12 flex flex-col justify-center">
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5 }}
                            >
                                <h1 className="font-oswald text-4xl md:text-5xl font-bold text-fresqo-dark mb-4">
                                    {product.name}
                                </h1>
                                <p className="text-lg text-fresqo-gray mb-8">{product.description}</p>

                                {/* Price */}
                                <div className="flex items-center gap-4 mb-8">
                                    <div className="flex items-baseline gap-3">
                                        <span className="font-bold text-4xl text-fresqo-dark">₹{product.price}</span>
                                        <span className="text-xl text-fresqo-gray line-through">₹{product.originalPrice}</span>
                                        <span className="text-sm font-bold text-green-600 bg-green-100 px-3 py-1.5 rounded-full">{product.discount}</span>
                                    </div>
                                    <span className="text-sm text-fresqo-gray">per pack</span>
                                </div>

                                {/* Ingredients */}
                                <div className="mb-10">
                                    <h4 className="font-semibold text-fresqo-dark mb-4 text-lg">Ingredients</h4>
                                    <div className="flex flex-wrap gap-2">
                                        {product.ingredients.map((ingredient, idx) => (
                                            <span
                                                key={idx}
                                                className="px-4 py-2 bg-fresqo-cream rounded-full text-sm text-fresqo-dark font-medium border border-fresqo-border"
                                            >
                                                {ingredient}
                                            </span>
                                        ))}
                                    </div>
                                </div>

                                {/* Quantity Selector */}
                                <div className="mb-10">
                                    <div className="flex items-center gap-6 mb-2">
                                        <span className="font-semibold text-fresqo-dark text-lg">Quantity</span>
                                        <div className="flex items-center gap-4 bg-fresqo-cream rounded-2xl p-1.5 border border-fresqo-border">
                                            <button
                                                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                                                className="w-12 h-12 flex items-center justify-center hover:bg-white rounded-xl transition-all shadow-sm"
                                            >
                                                <Minus className="w-5 h-5" />
                                            </button>
                                            <span className="w-8 text-center font-bold text-lg">{quantity}</span>
                                            <button
                                                onClick={() => setQuantity(Math.min(4, quantity + 1))}
                                                className="w-12 h-12 flex items-center justify-center hover:bg-white rounded-xl transition-all shadow-sm disabled:opacity-50 disabled:cursor-not-allowed"
                                                disabled={quantity >= 4}
                                            >
                                                <Plus className="w-5 h-5" />
                                            </button>
                                        </div>
                                    </div>
                                    <p className="text-sm text-fresqo-gray">*maximum 4 per order</p>
                                </div>

                                {/* Add to Cart Button */}
                                <button
                                    onClick={onAddToCartClick}
                                    className="w-full btn-primary py-4 text-lg flex items-center justify-center gap-3 shadow-lg hover:shadow-xl transition-all"
                                >
                                    <ShoppingBag className="w-6 h-6" />
                                    Add to Pre-Order – ₹{product.price * quantity}
                                </button>
                            </motion.div>
                        </div>
                    </div>
                </div>

                {/* Suggested Products Section */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                >
                    <div className="text-center mb-10">
                        <h3 className="font-oswald text-3xl font-bold text-fresqo-dark mb-4">
                            You May Also Like
                        </h3>
                        <p className="text-fresqo-gray max-w-2xl mx-auto">
                            Explore more unique flavours from our collection.
                        </p>
                    </div>

                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                        {suggestedProducts.map((p) => (
                            <div
                                key={p.id}
                                className="product-card bg-white rounded-2xl overflow-hidden shadow-soft card-lift group cursor-pointer fade-in"
                                onClick={() => {
                                    navigate(`/product/${p.id}`);
                                }}
                            >
                                <div className="relative aspect-square overflow-hidden bg-fresqo-cream rounded-t-2xl">
                                    <ImageSlider images={p.images} productName={p.name} interval={3500 + (p.id * 500)} />
                                </div>
                                <div className="p-6">
                                    <h3 className="font-oswald text-xl font-bold text-fresqo-dark mb-1">
                                        {p.name}
                                    </h3>
                                    <p className="text-sm text-fresqo-gray mb-4">{p.description}</p>
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-2">
                                            <span className="font-bold text-2xl text-fresqo-dark">₹{p.price}</span>
                                            <span className="text-sm text-fresqo-gray line-through">₹{p.originalPrice}</span>
                                            <span className="text-xs font-bold text-green-600 bg-green-100 px-2 py-0.5 rounded-full">{p.discount}</span>
                                        </div>
                                    </div>
                                    <button
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            navigate(`/product/${p.id}`);
                                        }}
                                        className="w-full mt-4 btn-primary flex items-center justify-center gap-2"
                                    >
                                        <ShoppingBag className="w-4 h-4" />
                                        Pre-Order – COD
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </motion.div>
            </div>
        </div>
    );
}
