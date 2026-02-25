import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import HeroSection from '@/sections/HeroSection';
import ValueProposition from '@/sections/ValueProposition';
import ProductsGrid from '@/sections/ProductsGrid';
import HowItWorks from '@/sections/HowItWorks';
import Ingredients from '@/sections/Ingredients';
import Testimonials from '@/sections/Testimonials';
import FAQ from '@/sections/FAQ';
import BlogSection from '@/sections/BlogSection';

export default function Landing() {
    const location = useLocation();

    useEffect(() => {
        if (location.hash) {
            const element = document.querySelector(location.hash);
            if (element) {
                setTimeout(() => {
                    element.scrollIntoView({ behavior: 'smooth' });
                }, 100);
            }
        } else {
            window.scrollTo(0, 0);
        }
    }, [location]);

    return (
        <>
            {/* Hero Section */}
            <HeroSection />

            {/* Value Proposition */}
            <ValueProposition />

            {/* Products Grid */}
            <ProductsGrid />

            {/* How It Works */}
            <HowItWorks />

            {/* Ingredients */}
            <Ingredients />

            {/* Testimonials */}
            <Testimonials />

            {/* Blog */}
            <BlogSection />

            {/* FAQ */}
            <FAQ />
        </>
    );
}
