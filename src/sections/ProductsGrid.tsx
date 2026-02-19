import { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Minus, X, ShoppingBag, ChevronRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
  ingredients: string[];
}

interface ProductsGridProps {
  onAddToCart: (product: Product, quantity: number) => void;
}

const products: Product[] = [
  {
    id: 1,
    name: 'Variety Pack',
    description: '4 unique flavors in one pack',
    price: 350,
    image: '/images/product-variety.jpg',
    ingredients: ['Natural fruit extracts', 'Citric acid', 'Sodium bicarbonate', 'Natural colors'],
  },
  {
    id: 2,
    name: 'Cosmopolitan Bomb',
    description: 'Classic cranberry-citrus blend',
    price: 350,
    image: '/images/product-cosmopolitan.jpg',
    ingredients: ['Cranberry extract', 'Lime extract', 'Orange peel', 'Natural pink color'],
  },
  {
    id: 3,
    name: 'Sex on the Beach',
    description: 'Tropical peach-orange delight',
    price: 350,
    image: '/images/product-sexonthebeach.jpg',
    ingredients: ['Peach extract', 'Orange extract', 'Cranberry', 'Natural orange color'],
  },
  {
    id: 4,
    name: 'Kala Khatta Bomb',
    description: 'Authentic Indian flavor',
    price: 350,
    image: '/images/product-kalakhatta.jpg',
    ingredients: ['Kala khatta extract', 'Black salt', 'Lime', 'Natural purple color'],
  },
  {
    id: 5,
    name: 'Watermelon Mint',
    description: 'Refreshing summer favorite',
    price: 350,
    image: '/images/product-watermelon.jpg',
    ingredients: ['Watermelon extract', 'Mint extract', 'Lime', 'Natural green-pink color'],
  },
];

export default function ProductsGrid({ onAddToCart }: ProductsGridProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [quantity, setQuantity] = useState(1);
  const gridRef = useRef<HTMLDivElement>(null);

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

  const handleAddToCart = () => {
    if (selectedProduct) {
      onAddToCart(selectedProduct, quantity);
      setSelectedProduct(null);
      setQuantity(1);
    }
  };

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
            Choose from our carefully crafted selection of cocktail bombs, each designed to deliver a unique taste experience.
          </p>
        </div>

        {/* Products Grid */}
        <div ref={gridRef} className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {products.map((product) => (
            <div
              key={product.id}
              className="product-card bg-white rounded-2xl overflow-hidden shadow-soft card-lift group"
            >
              {/* Product Image */}
              <div className="relative aspect-square overflow-hidden bg-fresqo-cream">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>

              {/* Product Info */}
              <div className="p-6">
                <h3 className="font-oswald text-xl font-bold text-fresqo-dark mb-1">
                  {product.name}
                </h3>
                <p className="text-sm text-fresqo-gray mb-4">{product.description}</p>
                
                <div className="flex items-center justify-between">
                  <span className="font-bold text-2xl text-fresqo-dark">₹{product.price}</span>
                  <button
                    onClick={() => {
                      setSelectedProduct(product);
                      setQuantity(1);
                    }}
                    className="flex items-center gap-2 text-fresqo-aqua hover:text-fresqo-dark font-medium text-sm transition-colors"
                  >
                    View Details
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>

                <button
                  onClick={() => {
                    setSelectedProduct(product);
                    setQuantity(1);
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
      </div>

      {/* Product Detail Modal */}
      <AnimatePresence>
        {selectedProduct && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
            onClick={() => setSelectedProduct(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
              onClick={(e: React.MouseEvent) => e.stopPropagation()}
            >
              <div className="relative">
                {/* Close button */}
                <button
                  onClick={() => setSelectedProduct(null)}
                  className="absolute top-4 right-4 z-10 w-10 h-10 bg-white/90 rounded-full flex items-center justify-center hover:bg-white transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>

                {/* Product Image */}
                <div className="aspect-video overflow-hidden">
                  <img
                    src={selectedProduct.image}
                    alt={selectedProduct.name}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Product Details */}
                <div className="p-8">
                  <h2 className="font-oswald text-3xl font-bold text-fresqo-dark mb-2">
                    {selectedProduct.name}
                  </h2>
                  <p className="text-fresqo-gray mb-6">{selectedProduct.description}</p>

                  {/* Price */}
                  <div className="flex items-center gap-4 mb-6">
                    <span className="font-bold text-3xl text-fresqo-dark">₹{selectedProduct.price}</span>
                    <span className="text-sm text-fresqo-gray">per pack</span>
                  </div>

                  {/* Ingredients */}
                  <div className="mb-8">
                    <h4 className="font-semibold text-fresqo-dark mb-3">Ingredients</h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedProduct.ingredients.map((ingredient, idx) => (
                        <span
                          key={idx}
                          className="px-3 py-1 bg-fresqo-cream rounded-full text-sm text-fresqo-gray"
                        >
                          {ingredient}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Quantity Selector */}
                  <div className="flex items-center gap-4 mb-8">
                    <span className="font-semibold text-fresqo-dark">Quantity</span>
                    <div className="flex items-center gap-3 bg-fresqo-cream rounded-xl p-1">
                      <button
                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                        className="w-10 h-10 flex items-center justify-center hover:bg-white rounded-lg transition-colors"
                      >
                        <Minus className="w-4 h-4" />
                      </button>
                      <span className="w-8 text-center font-semibold">{quantity}</span>
                      <button
                        onClick={() => setQuantity(quantity + 1)}
                        className="w-10 h-10 flex items-center justify-center hover:bg-white rounded-lg transition-colors"
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  {/* Add to Cart Button */}
                  <button
                    onClick={handleAddToCart}
                    className="w-full btn-primary flex items-center justify-center gap-2"
                  >
                    <ShoppingBag className="w-5 h-5" />
                    Add to Pre-Order – ₹{selectedProduct.price * quantity}
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
