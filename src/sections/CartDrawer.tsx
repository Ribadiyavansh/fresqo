import { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Plus, Minus, ShoppingBag, ArrowRight } from 'lucide-react';

interface CartItem {
  product: {
    id: number;
    name: string;
    price: number;
    image: string;
  };
  quantity: number;
}

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cart: CartItem[];
  onUpdateQuantity: (productId: number, quantity: number) => void;
  onRemoveItem: (productId: number) => void;
  onCheckout: () => void;
}

export default function CartDrawer({
  isOpen,
  onClose,
  cart,
  onUpdateQuantity,
  onRemoveItem,
  onCheckout
}: CartDrawerProps) {
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  const totalAmount = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);

  // Prevent background scroll when cart is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      document.documentElement.style.overflow = 'hidden';
      if ((window as any).lenis) (window as any).lenis.stop();
    } else {
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
      if ((window as any).lenis) (window as any).lenis.start();
    }
    return () => {
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
      if ((window as any).lenis) (window as any).lenis.start();
    };
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed right-0 top-0 h-full w-full max-w-md bg-white shadow-2xl z-50 flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-fresqo-border">
              <div className="flex items-center gap-3">
                <ShoppingBag className="w-6 h-6 text-fresqo-dark" />
                <h2 className="font-oswald text-xl font-bold text-fresqo-dark">
                  Your Cart ({totalItems})
                </h2>
              </div>
              <button
                onClick={onClose}
                className="w-10 h-10 hover:bg-fresqo-cream rounded-full flex items-center justify-center transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Cart Items */}
            <div className="flex-1 overflow-y-auto p-6" data-lenis-prevent="true">
              {cart.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-center">
                  <div className="w-20 h-20 bg-fresqo-cream rounded-full flex items-center justify-center mb-4">
                    <ShoppingBag className="w-10 h-10 text-fresqo-gray" />
                  </div>
                  <h3 className="font-oswald text-xl font-bold text-fresqo-dark mb-2">
                    Your cart is empty
                  </h3>
                  <p className="text-fresqo-gray mb-6">
                    Add some delicious cocktail bombs to get started!
                  </p>
                  <button
                    onClick={onClose}
                    className="btn-primary"
                  >
                    Browse Products
                  </button>
                </div>
              ) : (
                <div className="space-y-4">
                  {cart.map((item) => (
                    <div
                      key={item.product.id}
                      className="flex gap-4 p-4 bg-fresqo-cream rounded-xl"
                    >
                      {/* Product Image */}
                      <div className="w-20 h-20 rounded-lg overflow-hidden flex-shrink-0">
                        <img
                          src={item.product.image}
                          alt={item.product.name}
                          className="w-full h-full object-cover"
                        />
                      </div>

                      {/* Product Details */}
                      <div className="flex-1">
                        <div className="flex items-start justify-between mb-2">
                          <h4 className="font-semibold text-fresqo-dark text-sm">
                            {item.product.name}
                          </h4>
                          <button
                            onClick={() => onRemoveItem(item.product.id)}
                            className="text-fresqo-gray hover:text-red-500 transition-colors"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </div>

                        <p className="text-fresqo-aqua font-bold mb-3">
                          ₹{item.product.price}
                        </p>

                        {/* Quantity Controls */}
                        <div>
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => onUpdateQuantity(item.product.id, Math.max(0, item.quantity - 1))}
                              className="w-7 h-7 bg-white rounded-lg flex items-center justify-center hover:bg-fresqo-lime/20 transition-colors"
                            >
                              <Minus className="w-3 h-3" />
                            </button>
                            <span className="w-8 text-center font-semibold text-sm">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => onUpdateQuantity(item.product.id, Math.min(4, item.quantity + 1))}
                              className="w-7 h-7 bg-white rounded-lg flex items-center justify-center hover:bg-fresqo-lime/20 focus:outline-none transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                              disabled={item.quantity >= 4}
                            >
                              <Plus className="w-3 h-3" />
                            </button>
                          </div>
                          <p className="text-[10px] text-fresqo-gray mt-1">*maximum 4 per order</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Footer */}
            {cart.length > 0 && (
              <div className="p-6 border-t border-fresqo-border bg-white">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-fresqo-gray">Subtotal</span>
                  <span className="font-oswald text-xl font-bold text-fresqo-dark">
                    ₹{totalAmount}
                  </span>
                </div>
                <p className="text-sm text-fresqo-gray mb-4">
                  Shipping calculated at checkout. COD available.
                </p>
                <button
                  onClick={onCheckout}
                  className="w-full btn-primary flex items-center justify-center gap-2"
                >
                  Proceed to Checkout
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
