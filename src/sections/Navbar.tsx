import { useState, useEffect } from 'react';
import { Menu, X, ShoppingBag } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface NavbarProps {
  cartCount: number;
  onCartClick: () => void;
  isAnnouncementVisible: boolean;
}

export default function Navbar({ cartCount, onCartClick, isAnnouncementVisible }: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Home', href: '#home' },
    { label: 'Flavours', href: '#products' },
    { label: 'How It Works', href: '#how-it-works' },
    { label: 'FAQs', href: '#faq' },
  ];

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className={`fixed left-0 right-0 z-40 transition-all duration-300 ${isScrolled ? 'glass shadow-soft border-b border-fresqo-border bg-white/80' : 'bg-transparent border-b border-transparent'
          }`}
        style={{ top: isAnnouncementVisible && !isScrolled ? '40px' : '0px' }}
      >
        <div className="container-custom">
          <div className="flex items-center justify-between h-16 md:h-20">
            {/* Logo */}
            <a
              href="#home"
              onClick={(e) => { e.preventDefault(); scrollToSection('#home'); }}
              className="font-oswald text-2xl md:text-3xl font-bold text-fresqo-dark"
            >
              <span className="gradient-text">Fresqo</span>
            </a>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-8">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={(e) => { e.preventDefault(); scrollToSection(link.href); }}
                  className="text-fresqo-dark hover:text-fresqo-aqua transition-colors liquid-underline text-sm font-medium"
                >
                  {link.label}
                </a>
              ))}
            </div>

            {/* Right Side */}
            <div className="flex items-center gap-4">
              {/* Cart Button */}
              <button
                onClick={onCartClick}
                className="relative p-2 hover:bg-fresqo-lime/20 rounded-full transition-colors"
                aria-label="View cart"
              >
                <ShoppingBag className="w-5 h-5 text-fresqo-dark" />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 bg-fresqo-lime text-fresqo-charcoal text-xs font-bold rounded-full flex items-center justify-center">
                    {cartCount}
                  </span>
                )}
              </button>

              {/* Pre-Order Button - Desktop */}
              <a
                href="#pre-order"
                onClick={(e) => { e.preventDefault(); scrollToSection('#pre-order'); }}
                className="hidden md:block btn-primary text-sm"
              >
                Pre-Order Now
              </a>

              {/* Mobile Menu Button */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="md:hidden p-2 hover:bg-fresqo-lime/20 rounded-full transition-colors"
                aria-label="Toggle menu"
              >
                {isMobileMenuOpen ? (
                  <X className="w-6 h-6" />
                ) : (
                  <Menu className="w-6 h-6" />
                )}
              </button>
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-x-0 top-16 z-30 glass shadow-lift md:hidden"
          >
            <div className="p-6 flex flex-col gap-4">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={(e) => { e.preventDefault(); scrollToSection(link.href); }}
                  className="text-fresqo-dark hover:text-fresqo-aqua transition-colors text-lg font-medium py-2"
                >
                  {link.label}
                </a>
              ))}
              <a
                href="#pre-order"
                onClick={(e) => { e.preventDefault(); scrollToSection('#pre-order'); }}
                className="btn-primary text-center mt-4"
              >
                Pre-Order Now
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
