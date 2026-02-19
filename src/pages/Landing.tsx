import { useOutletContext } from 'react-router-dom';
import HeroSection from '@/sections/HeroSection';
import ValueProposition from '@/sections/ValueProposition';
import ProductsGrid from '@/sections/ProductsGrid';
import HowItWorks from '@/sections/HowItWorks';
import Ingredients from '@/sections/Ingredients';
import Testimonials from '@/sections/Testimonials';
import FAQ from '@/sections/FAQ';
import PreOrderForm from '@/sections/PreOrderForm';
import type { MainLayoutContextType } from '@/layouts/MainLayout';

export default function Landing() {
    const { cart, handleAddToCart, handleClearCart } = useOutletContext<MainLayoutContextType>();

    return (
        <>
            {/* Hero Section */}
            <HeroSection />

            {/* Value Proposition */}
            <ValueProposition />

            {/* Products Grid */}
            <ProductsGrid onAddToCart={handleAddToCart} />

            {/* How It Works */}
            <HowItWorks />

            {/* Ingredients */}
            <Ingredients />

            {/* Testimonials */}
            <Testimonials />

            {/* FAQ */}
            <FAQ />

            {/* Pre-Order Form */}
            <PreOrderForm cart={cart} onClearCart={handleClearCart} />
        </>
    );
}
