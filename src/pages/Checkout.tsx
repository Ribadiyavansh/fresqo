import { useEffect } from 'react';
import { useOutletContext } from 'react-router-dom';
import PreOrderForm from '@/sections/PreOrderForm';
import type { MainLayoutContextType } from '@/layouts/MainLayout';
export default function Checkout() {
    const { cart, handleClearCart } = useOutletContext<MainLayoutContextType>();
    useEffect(() => {
        if ((window as any).lenis) {
            (window as any).lenis.scrollTo(0, { immediate: true });
        } else {
            window.scrollTo(0, 0);
        }
    }, []);

    return (
        <div className="min-h-screen bg-fresqo-cream flex flex-col pt-16">
            <PreOrderForm cart={cart} onClearCart={handleClearCart} />
        </div>
    );
}
