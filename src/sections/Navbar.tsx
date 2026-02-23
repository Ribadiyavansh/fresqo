import { useState, useEffect } from 'react';
import { Menu, X, ShoppingBag, User } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
interface NavbarProps {
  cartCount: number;
  onCartClick: () => void;
  isAnnouncementVisible: boolean;
}

export default function Navbar({ cartCount, onCartClick, isAnnouncementVisible }: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const { user, isLoggedIn, logout, openAuthModal } = useAuth();
  const navigate = useNavigate();

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
    { label: 'Blog', href: '#blog' },
  ];

  const scrollToSection = (href: string) => {
    if (window.location.pathname !== '/') {
      navigate(`/${href}`);
      setIsMobileMenuOpen(false);
      return;
    }
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
        className={`fixed left-0 right-0 z-40 transition-all duration-300 ${isScrolled ? 'bg-white shadow-soft border-b border-fresqo-border' : 'bg-white border-b border-fresqo-border lg:border-transparent'
          }`}
        style={{ top: isAnnouncementVisible && !isScrolled ? '40px' : '0px' }}
      >
        <div className="container-custom">
          <div className="flex items-center justify-between h-16 md:h-20">
            {/* Logo */}
            <a
              href="/"
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

              {/* Auth Button - Desktop */}
              {isLoggedIn ? (
                <div className="hidden md:block relative">
                  <button
                    onClick={() => setIsProfileOpen(!isProfileOpen)}
                    className="flex items-center justify-center w-10 h-10 rounded-full bg-fresqo-cream hover:bg-fresqo-lime/20 text-fresqo-dark transition-colors"
                    aria-label="User profile"
                  >
                    <User className="w-5 h-5" />
                  </button>

                  <AnimatePresence>
                    {isProfileOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                        transition={{ duration: 0.2 }}
                        className="absolute right-0 mt-3 w-56 bg-white rounded-2xl shadow-lift border border-fresqo-border overflow-hidden z-50 flex flex-col"
                      >
                        <div className="p-4 border-b border-fresqo-border bg-fresqo-cream/50">
                          <p className="font-semibold text-fresqo-dark truncate">{user?.name}</p>
                          <p className="text-sm text-fresqo-gray truncate mt-0.5">{user?.email}</p>
                        </div>
                        <button
                          onClick={() => {
                            logout();
                            setIsProfileOpen(false);
                            navigate('/');
                          }}
                          className="w-full text-left px-5 py-3.5 text-sm text-red-500 hover:bg-fresqo-cream transition-colors font-medium flex items-center justify-between"
                        >
                          Logout
                        </button>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ) : (
                <button
                  onClick={() => openAuthModal('login')}
                  className="hidden md:block text-sm font-medium text-fresqo-dark hover:text-fresqo-aqua transition-colors"
                >
                  Sign In
                </button>
              )}

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
              {isLoggedIn ? (
                <button
                  onClick={() => {
                    logout();
                    setIsMobileMenuOpen(false);
                    navigate('/');
                  }}
                  className="text-fresqo-dark hover:text-fresqo-aqua transition-colors text-lg font-medium py-2 text-left"
                >
                  Logout ({user?.name})
                </button>
              ) : (
                <button
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    openAuthModal('login');
                  }}
                  className="text-fresqo-dark hover:text-fresqo-aqua transition-colors text-lg font-medium py-2 text-left"
                >
                  Sign In
                </button>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
