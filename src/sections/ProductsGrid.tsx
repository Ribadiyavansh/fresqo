import { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SkeletonCard } from '@/components/ui/skeleton';
import { ShoppingBag, ChevronRight } from 'lucide-react';
import ImageSlider from '@/components/ImageSlider';

gsap.registerPlugin(ScrollTrigger);

import { products } from '@/data/products';
import { useNavigate } from 'react-router-dom';

export default function ProductsGrid() {
  const sectionRef = useRef<HTMLElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);


  useEffect(() => {
    const ctx = gsap.context(() => {
      const cards = gridRef.current?.querySelectorAll('.product-card');

      if (cards) {
        gsap.fromTo(
          cards,
          { opacity: 0, y: 50 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            stagger: 0.1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 80%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);


  return (
    <section ref={sectionRef} id="products" className="section-padding">
      <div className="container-custom">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="inline-block text-sm font-medium text-fresqo-aqua uppercase tracking-wider mb-4">
            Our Collection
          </span>
          <h2 className="font-oswald text-4xl md:text-5xl font-bold text-fresqo-dark mb-4">
            Featured Flavours
          </h2>
          <p className="text-fresqo-gray max-w-2xl mx-auto">
            Choose from our carefully crafted selection of cocktail balls, each designed to deliver a unique taste experience.
          </p>
        </div>

        {/* Products Grid */}
        <div ref={gridRef} className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {isLoading ? (
            Array.from({ length: 6 }).map((_, i) => (
              <SkeletonCard key={i} />
            ))
          ) : (
            products.map((product) => (
              <div
                key={product.id}
                className="product-card bg-white rounded-2xl overflow-hidden shadow-soft card-lift group cursor-pointer fade-in"
                onClick={() => {
                  navigate(`/product/${product.id}`);
                }}
              >
                {/* Product Image Slider */}
                <div className="relative aspect-square overflow-hidden bg-fresqo-cream rounded-t-2xl">
                  <ImageSlider images={product.images} productName={product.name} interval={3500 + (product.id * 500)} />
                </div>

                {/* Product Info */}
                <div className="p-6">
                  <h3 className="font-oswald text-xl font-bold text-fresqo-dark mb-1">
                    {product.name}
                  </h3>
                  <p className="text-sm text-fresqo-gray mb-4">{product.description}</p>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-2xl text-fresqo-dark">₹{product.price}</span>
                      <span className="text-sm text-fresqo-gray line-through">₹{product.originalPrice}</span>
                      <span className="text-xs font-bold text-green-600 bg-green-100 px-2 py-0.5 rounded-full">{product.discount}</span>
                    </div>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        navigate(`/product/${product.id}`);
                      }}
                      className="flex items-center gap-2 text-fresqo-aqua hover:text-fresqo-dark font-medium text-sm transition-colors"
                    >
                      View Details
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      navigate(`/product/${product.id}`);
                    }}
                    className="w-full mt-4 btn-primary flex items-center justify-center gap-2"
                  >
                    <ShoppingBag className="w-4 h-4" />
                    Pre-Order – COD
                  </button>
                </div>
              </div>
            )))}
        </div>
      </div>


    </section>
  );
}
