import { useState, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import { useLenis } from '@/hooks/useLenis';
import CustomCursor from '@/components/CustomCursor';
import NoiseOverlay from '@/components/NoiseOverlay';
import AnnouncementBar from '@/sections/AnnouncementBar';
import Navbar from '@/sections/Navbar';
import CartDrawer from '@/sections/CartDrawer';
import Footer from '@/sections/Footer';

gsap.registerPlugin(ScrollTrigger);

export interface CartItem {
    product: {
        id: number;
        name: string;
        price: number;
        image: string;
    };
    quantity: number;
}

export interface MainLayoutContextType {
    cart: CartItem[];
    handleAddToCart: (product: { id: number; name: string; price: number; image: string }, quantity: number) => void;
    handleClearCart: () => void;
}

export default function MainLayout() {
    // Initialize Lenis smooth scroll
    useLenis();

    // Cart state
    const [cart, setCart] = useState<CartItem[]>([]);
    const [isCartOpen, setIsCartOpen] = useState(false);

    // Add to cart
    const handleAddToCart = (product: { id: number; name: string; price: number; image: string }, quantity: number) => {
        setCart((prevCart) => {
            const existingItem = prevCart.find((item) => item.product.id === product.id);
            if (existingItem) {
                return prevCart.map((item) =>
                    item.product.id === product.id
                        ? { ...item, quantity: item.quantity + quantity }
                        : item
                );
            }
            return [...prevCart, { product, quantity }];
        });
        setIsCartOpen(true);
    };

    // Update quantity
    const handleUpdateQuantity = (productId: number, quantity: number) => {
        if (quantity === 0) {
            handleRemoveItem(productId);
            return;
        }
        setCart((prevCart) =>
            prevCart.map((item) =>
                item.product.id === productId ? { ...item, quantity } : item
            )
        );
    };

    // Remove item
    const handleRemoveItem = (productId: number) => {
        setCart((prevCart) => prevCart.filter((item) => item.product.id !== productId));
    };

    // Clear cart
    const handleClearCart = () => {
        setCart([]);
    };

    // Handle checkout - scroll to pre-order section
    // Note: Since Landing is separate, scrolling to #pre-order requires it to exist on the current page.
    // We'll keep this check.
    const handleCheckout = () => {
        setIsCartOpen(false);
        setTimeout(() => {
            const preOrderSection = document.querySelector('#pre-order');
            if (preOrderSection) {
                preOrderSection.scrollIntoView({ behavior: 'smooth' });
            } else {
                // Fallback or navigate to home#pre-order if not found?
                // For now, assume we are on a page with it, or do nothing.
                // Or if we are not on home, we might want to navigate('MVC approach').
                // Let's keep it simple for now as per minimal change strategy.
                window.location.hash = 'pre-order';
            }
        }, 300);
    };

    // Calculate cart count
    const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

    useEffect(() => {
        // Set document title
        document.title = 'Fresqo - Premium Cocktail Bombs | Drop. Fizz. Celebrate.';
        document.documentElement.lang = 'en';

        const metaDesc = document.querySelector('meta[name="description"]');
        if (metaDesc) {
            metaDesc.setAttribute('content', 'Premium cocktail & mocktail bombs. Instant party magic in every sphere. Just drop, fizz, and enjoy! COD available across India.');
        }
    }, []);

    useEffect(() => {
        // Refresh ScrollTrigger on load
        const handleLoad = () => {
            ScrollTrigger.refresh();
        };

        window.addEventListener('load', handleLoad);

        // Handle resize
        let resizeTimeout: ReturnType<typeof setTimeout>;
        const handleResize = () => {
            clearTimeout(resizeTimeout);
            resizeTimeout = setTimeout(() => {
                ScrollTrigger.refresh();
            }, 200);
        };

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('load', handleLoad);
            window.removeEventListener('resize', handleResize);
            clearTimeout(resizeTimeout);
        };
    }, []);

    return (
        <div className="relative min-h-screen bg-fresqo-offwhite cursor-custom">
            {/* Noise texture overlay */}
            <NoiseOverlay />

            {/* Custom cursor */}
            <CustomCursor />

            {/* Announcement Bar */}
            <AnnouncementBar />

            {/* Navigation */}
            <Navbar cartCount={cartCount} onCartClick={() => setIsCartOpen(true)} />

            {/* Cart Drawer */}
            <CartDrawer
                isOpen={isCartOpen}
                onClose={() => setIsCartOpen(false)}
                cart={cart}
                onUpdateQuantity={handleUpdateQuantity}
                onRemoveItem={handleRemoveItem}
                onCheckout={handleCheckout}
            />

            {/* Main content */}
            <main>
                <Outlet context={{ cart, handleAddToCart, handleClearCart }} />
            </main>

            {/* Footer */}
            <Footer />
        </div>
    );
}
