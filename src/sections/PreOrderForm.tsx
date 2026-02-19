import { useState, useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ShoppingBag, 
  Check, 
  ChevronDown, 
  Plus, 
  Minus,
  Truck,
  Phone,
  MapPin,
  User,
  CreditCard,
  Share2,
  CheckCircle2
} from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface CartItem {
  product: {
    id: number;
    name: string;
    price: number;
    image: string;
  };
  quantity: number;
}

interface PreOrderFormProps {
  cart: CartItem[];
  onClearCart: () => void;
}

const products = [
  { id: 1, name: 'Variety Pack', price: 350, image: '/images/product-variety.jpg' },
  { id: 2, name: 'Cosmopolitan Bomb', price: 350, image: '/images/product-cosmopolitan.jpg' },
  { id: 3, name: 'Sex on the Beach', price: 350, image: '/images/product-sexonthebeach.jpg' },
  { id: 4, name: 'Kala Khatta Bomb', price: 350, image: '/images/product-kalakhatta.jpg' },
  { id: 5, name: 'Watermelon Mint', price: 350, image: '/images/product-watermelon.jpg' },
];

const states = [
  'Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar', 'Chhattisgarh', 'Goa', 'Gujarat', 
  'Haryana', 'Himachal Pradesh', 'Jharkhand', 'Karnataka', 'Kerala', 'Madhya Pradesh', 
  'Maharashtra', 'Manipur', 'Meghalaya', 'Mizoram', 'Nagaland', 'Odisha', 'Punjab', 
  'Rajasthan', 'Sikkim', 'Tamil Nadu', 'Telangana', 'Tripura', 'Uttar Pradesh', 
  'Uttarakhand', 'West Bengal', 'Delhi', 'Jammu & Kashmir', 'Ladakh', 'Puducherry'
];

export default function PreOrderForm({ cart, onClearCart }: PreOrderFormProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const [step, setStep] = useState(1);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [orderId, setOrderId] = useState('');
  
  // Form state
  const [selectedProduct, setSelectedProduct] = useState(products[0]);
  const [quantity, setQuantity] = useState(1);
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    address1: '',
    address2: '',
    city: '',
    state: '',
    pincode: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Update selected product based on cart
  useEffect(() => {
    if (cart.length > 0) {
      const cartProduct = products.find(p => p.id === cart[0].product.id);
      if (cartProduct) {
        setSelectedProduct(cartProduct);
        setQuantity(cart[0].quantity);
      }
    }
  }, [cart]);

  const validateStep2 = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Full name is required';
    }
    
    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    } else if (!/^\d{10}$/.test(formData.phone)) {
      newErrors.phone = 'Please enter a valid 10-digit phone number';
    }
    
    if (!formData.address1.trim()) {
      newErrors.address1 = 'Address is required';
    }
    
    if (!formData.city.trim()) {
      newErrors.city = 'City is required';
    }
    
    if (!formData.state) {
      newErrors.state = 'State is required';
    }
    
    if (!formData.pincode.trim()) {
      newErrors.pincode = 'PIN code is required';
    } else if (!/^\d{6}$/.test(formData.pincode)) {
      newErrors.pincode = 'Please enter a valid 6-digit PIN code';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (validateStep2()) {
      // Generate order ID
      const newOrderId = 'FQ' + Date.now().toString().slice(-8);
      setOrderId(newOrderId);
      setIsSubmitted(true);
      onClearCart();
    }
  };

  const totalAmount = selectedProduct.price * quantity;

  const shareOnWhatsApp = () => {
    const message = `I just ordered Fresqo cocktail bombs! Order ID: ${orderId}. Can't wait to try them! 🍹`;
    const url = `https://wa.me/?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
  };

  if (isSubmitted) {
    return (
      <section ref={sectionRef} id="pre-order" className="section-padding gradient-bg">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="max-w-xl mx-auto bg-white rounded-3xl p-8 md:p-12 text-center shadow-lift"
          >
            <div className="w-20 h-20 bg-fresqo-lime/20 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle2 className="w-10 h-10 text-fresqo-lime" />
            </div>
            
            <h2 className="font-oswald text-3xl md:text-4xl font-bold text-fresqo-dark mb-4">
              Your Fresqo is Coming!
            </h2>
            
            <p className="text-fresqo-gray mb-8">
              Thank you for your pre-order. We've received your order and will process it shortly.
            </p>
            
            <div className="bg-fresqo-cream rounded-2xl p-6 mb-8">
              <p className="text-sm text-fresqo-gray mb-2">Order ID</p>
              <p className="font-oswald text-2xl font-bold text-fresqo-dark">{orderId}</p>
              <div className="mt-4 pt-4 border-t border-fresqo-border">
                <div className="flex items-center justify-center gap-2 text-fresqo-gray">
                  <Truck className="w-4 h-4" />
                  <span className="text-sm">Estimated delivery: 5-7 days</span>
                </div>
              </div>
            </div>
            
            <button
              onClick={shareOnWhatsApp}
              className="w-full flex items-center justify-center gap-2 bg-green-500 text-white font-semibold px-6 py-3 rounded-xl hover:bg-green-600 transition-colors"
            >
              <Share2 className="w-5 h-5" />
              Share on WhatsApp
            </button>
          </motion.div>
        </div>
      </section>
    );
  }

  return (
    <section ref={sectionRef} id="pre-order" className="section-padding gradient-bg">
      <div className="container-custom">
        <div className="max-w-2xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-10">
            <span className="inline-block text-sm font-medium text-fresqo-charcoal/70 uppercase tracking-wider mb-4">
              Limited Time Offer
            </span>
            <h2 className="font-oswald text-4xl md:text-5xl font-bold text-fresqo-charcoal mb-4">
              Pre-Order Now
            </h2>
            <p className="text-fresqo-charcoal/70">
              Cash on Delivery available across India
            </p>
          </div>

          {/* Form Card */}
          <div className="bg-white rounded-3xl shadow-lift overflow-hidden">
            {/* Progress Steps */}
            <div className="flex items-center justify-center gap-4 p-6 border-b border-fresqo-border">
              <div className={`flex items-center gap-2 ${step >= 1 ? 'text-fresqo-lime' : 'text-fresqo-gray'}`}>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${
                  step >= 1 ? 'gradient-bg text-fresqo-charcoal' : 'bg-fresqo-cream text-fresqo-gray'
                }`}>
                  1
                </div>
                <span className="hidden sm:inline text-sm font-medium">Product</span>
              </div>
              <div className="w-8 h-0.5 bg-fresqo-border" />
              <div className={`flex items-center gap-2 ${step >= 2 ? 'text-fresqo-lime' : 'text-fresqo-gray'}`}>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${
                  step >= 2 ? 'gradient-bg text-fresqo-charcoal' : 'bg-fresqo-cream text-fresqo-gray'
                }`}>
                  2
                </div>
                <span className="hidden sm:inline text-sm font-medium">Details</span>
              </div>
              <div className="w-8 h-0.5 bg-fresqo-border" />
              <div className={`flex items-center gap-2 ${step >= 3 ? 'text-fresqo-lime' : 'text-fresqo-gray'}`}>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${
                  step >= 3 ? 'gradient-bg text-fresqo-charcoal' : 'bg-fresqo-cream text-fresqo-gray'
                }`}>
                  3
                </div>
                <span className="hidden sm:inline text-sm font-medium">Payment</span>
              </div>
            </div>

            {/* Form Content */}
            <div className="p-6 md:p-8">
              <AnimatePresence mode="wait">
                {/* Step 1: Product Selection */}
                {step === 1 && (
                  <motion.div
                    key="step1"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                  >
                    <h3 className="font-oswald text-xl font-bold text-fresqo-dark mb-6">
                      Select Your Flavour
                    </h3>

                    {/* Product Dropdown */}
                    <div className="mb-6">
                      <label className="block text-sm font-medium text-fresqo-dark mb-2">
                        Product
                      </label>
                      <div className="relative">
                        <select
                          value={selectedProduct.id}
                          onChange={(e) => {
                            const product = products.find(p => p.id === Number(e.target.value));
                            if (product) setSelectedProduct(product);
                          }}
                          className="w-full p-4 bg-fresqo-cream rounded-xl appearance-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-fresqo-lime"
                        >
                          {products.map((product) => (
                            <option key={product.id} value={product.id}>
                              {product.name} - ₹{product.price}
                            </option>
                          ))}
                        </select>
                        <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-fresqo-gray pointer-events-none" />
                      </div>
                    </div>

                    {/* Selected Product Preview */}
                    <div className="flex items-center gap-4 p-4 bg-fresqo-cream rounded-xl mb-6">
                      <img
                        src={selectedProduct.image}
                        alt={selectedProduct.name}
                        className="w-16 h-16 object-cover rounded-lg"
                      />
                      <div>
                        <p className="font-semibold text-fresqo-dark">{selectedProduct.name}</p>
                        <p className="text-fresqo-gray">₹{selectedProduct.price}</p>
                      </div>
                    </div>

                    {/* Quantity Selector */}
                    <div className="mb-8">
                      <label className="block text-sm font-medium text-fresqo-dark mb-2">
                        Quantity
                      </label>
                      <div className="flex items-center gap-4">
                        <div className="flex items-center gap-3 bg-fresqo-cream rounded-xl p-1">
                          <button
                            onClick={() => setQuantity(Math.max(1, quantity - 1))}
                            className="w-10 h-10 flex items-center justify-center hover:bg-white rounded-lg transition-colors"
                          >
                            <Minus className="w-4 h-4" />
                          </button>
                          <span className="w-12 text-center font-semibold">{quantity}</span>
                          <button
                            onClick={() => setQuantity(quantity + 1)}
                            className="w-10 h-10 flex items-center justify-center hover:bg-white rounded-lg transition-colors"
                          >
                            <Plus className="w-4 h-4" />
                          </button>
                        </div>
                        <span className="text-fresqo-gray">
                          Total: <span className="font-bold text-fresqo-dark">₹{totalAmount}</span>
                        </span>
                      </div>
                    </div>

                    <button
                      onClick={() => setStep(2)}
                      className="w-full btn-primary"
                    >
                      Continue
                    </button>
                  </motion.div>
                )}

                {/* Step 2: Customer Details */}
                {step === 2 && (
                  <motion.div
                    key="step2"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                  >
                    <h3 className="font-oswald text-xl font-bold text-fresqo-dark mb-6">
                      Delivery Details
                    </h3>

                    <div className="space-y-4 mb-6">
                      {/* Full Name */}
                      <div>
                        <label className="block text-sm font-medium text-fresqo-dark mb-2">
                          Full Name *
                        </label>
                        <div className="relative">
                          <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-fresqo-gray" />
                          <input
                            type="text"
                            value={formData.fullName}
                            onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                            placeholder="Enter your full name"
                            className="w-full pl-12 pr-4 py-3 bg-fresqo-cream rounded-xl focus:outline-none focus:ring-2 focus:ring-fresqo-lime"
                          />
                        </div>
                        {errors.fullName && (
                          <p className="text-red-500 text-sm mt-1">{errors.fullName}</p>
                        )}
                      </div>

                      {/* Phone */}
                      <div>
                        <label className="block text-sm font-medium text-fresqo-dark mb-2">
                          Phone Number *
                        </label>
                        <div className="relative">
                          <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-fresqo-gray" />
                          <input
                            type="tel"
                            value={formData.phone}
                            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                            placeholder="10-digit mobile number"
                            maxLength={10}
                            className="w-full pl-12 pr-4 py-3 bg-fresqo-cream rounded-xl focus:outline-none focus:ring-2 focus:ring-fresqo-lime"
                          />
                        </div>
                        {errors.phone && (
                          <p className="text-red-500 text-sm mt-1">{errors.phone}</p>
                        )}
                      </div>

                      {/* Address */}
                      <div>
                        <label className="block text-sm font-medium text-fresqo-dark mb-2">
                          Address Line 1 *
                        </label>
                        <div className="relative">
                          <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-fresqo-gray" />
                          <input
                            type="text"
                            value={formData.address1}
                            onChange={(e) => setFormData({ ...formData, address1: e.target.value })}
                            placeholder="House number, street, area"
                            className="w-full pl-12 pr-4 py-3 bg-fresqo-cream rounded-xl focus:outline-none focus:ring-2 focus:ring-fresqo-lime"
                          />
                        </div>
                        {errors.address1 && (
                          <p className="text-red-500 text-sm mt-1">{errors.address1}</p>
                        )}
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-fresqo-dark mb-2">
                          Address Line 2
                        </label>
                        <input
                          type="text"
                          value={formData.address2}
                          onChange={(e) => setFormData({ ...formData, address2: e.target.value })}
                          placeholder="Apartment, landmark (optional)"
                          className="w-full px-4 py-3 bg-fresqo-cream rounded-xl focus:outline-none focus:ring-2 focus:ring-fresqo-lime"
                        />
                      </div>

                      {/* City & State */}
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-fresqo-dark mb-2">
                            City *
                          </label>
                          <input
                            type="text"
                            value={formData.city}
                            onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                            placeholder="City"
                            className="w-full px-4 py-3 bg-fresqo-cream rounded-xl focus:outline-none focus:ring-2 focus:ring-fresqo-lime"
                          />
                          {errors.city && (
                            <p className="text-red-500 text-sm mt-1">{errors.city}</p>
                          )}
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-fresqo-dark mb-2">
                            State *
                          </label>
                          <div className="relative">
                            <select
                              value={formData.state}
                              onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                              className="w-full px-4 py-3 bg-fresqo-cream rounded-xl appearance-none focus:outline-none focus:ring-2 focus:ring-fresqo-lime"
                            >
                              <option value="">Select State</option>
                              {states.map((state) => (
                                <option key={state} value={state}>{state}</option>
                              ))}
                            </select>
                            <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-fresqo-gray pointer-events-none" />
                          </div>
                          {errors.state && (
                            <p className="text-red-500 text-sm mt-1">{errors.state}</p>
                          )}
                        </div>
                      </div>

                      {/* PIN Code */}
                      <div>
                        <label className="block text-sm font-medium text-fresqo-dark mb-2">
                          PIN Code *
                        </label>
                        <input
                          type="text"
                          value={formData.pincode}
                          onChange={(e) => setFormData({ ...formData, pincode: e.target.value })}
                          placeholder="6-digit PIN code"
                          maxLength={6}
                          className="w-full px-4 py-3 bg-fresqo-cream rounded-xl focus:outline-none focus:ring-2 focus:ring-fresqo-lime"
                        />
                        {errors.pincode && (
                          <p className="text-red-500 text-sm mt-1">{errors.pincode}</p>
                        )}
                      </div>
                    </div>

                    <div className="flex gap-4">
                      <button
                        onClick={() => setStep(1)}
                        className="flex-1 px-6 py-3 border-2 border-fresqo-dark text-fresqo-dark font-semibold rounded-xl hover:bg-fresqo-dark hover:text-white transition-all duration-300"
                      >
                        Back
                      </button>
                      <button
                        onClick={() => {
                          if (validateStep2()) {
                            setStep(3);
                          }
                        }}
                        className="flex-1 btn-primary"
                      >
                        Continue
                      </button>
                    </div>
                  </motion.div>
                )}

                {/* Step 3: Payment */}
                {step === 3 && (
                  <motion.div
                    key="step3"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                  >
                    <h3 className="font-oswald text-xl font-bold text-fresqo-dark mb-6">
                      Payment Method
                    </h3>

                    {/* Order Summary */}
                    <div className="bg-fresqo-cream rounded-xl p-4 mb-6">
                      <h4 className="font-semibold text-fresqo-dark mb-3">Order Summary</h4>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-fresqo-gray">{selectedProduct.name} x {quantity}</span>
                        <span className="font-medium">₹{totalAmount}</span>
                      </div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-fresqo-gray">Shipping</span>
                        <span className="text-fresqo-lime font-medium">Free</span>
                      </div>
                      <div className="border-t border-fresqo-border mt-3 pt-3 flex items-center justify-between">
                        <span className="font-semibold text-fresqo-dark">Total</span>
                        <span className="font-oswald text-xl font-bold text-fresqo-dark">₹{totalAmount}</span>
                      </div>
                    </div>

                    {/* COD Option */}
                    <div className="mb-6">
                      <label className="block text-sm font-medium text-fresqo-dark mb-2">
                        Select Payment Method
                      </label>
                      <div className="flex items-center gap-4 p-4 bg-fresqo-lime/20 border-2 border-fresqo-lime rounded-xl">
                        <div className="w-6 h-6 rounded-full border-2 border-fresqo-lime bg-fresqo-lime flex items-center justify-center">
                          <Check className="w-4 h-4 text-fresqo-charcoal" />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2">
                            <CreditCard className="w-5 h-5 text-fresqo-dark" />
                            <span className="font-semibold text-fresqo-dark">Cash on Delivery</span>
                          </div>
                          <p className="text-sm text-fresqo-gray mt-1">
                            Pay in cash when your order arrives
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="flex gap-4">
                      <button
                        onClick={() => setStep(2)}
                        className="flex-1 px-6 py-3 border-2 border-fresqo-dark text-fresqo-dark font-semibold rounded-xl hover:bg-fresqo-dark hover:text-white transition-all duration-300"
                      >
                        Back
                      </button>
                      <button
                        onClick={handleSubmit}
                        className="flex-1 btn-primary flex items-center justify-center gap-2"
                      >
                        <ShoppingBag className="w-5 h-5" />
                        Complete Pre-Order
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
