import { motion } from 'framer-motion';
import { 
  Instagram, 
  Twitter, 
  Facebook, 
  Youtube,
  Mail,
  Phone,
  MapPin,
  ArrowUp,
  Sparkles
} from 'lucide-react';

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-fresqo-charcoal text-white">
      {/* Main Footer */}
      <div className="container-custom py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand Column */}
          <div className="lg:col-span-1">
            <a href="#home" className="inline-flex items-center gap-2 mb-6">
              <span className="font-oswald text-3xl font-bold gradient-text">Fresqo</span>
              <Sparkles className="w-5 h-5 text-fresqo-lime" />
            </a>
            <p className="text-gray-400 mb-6 leading-relaxed">
              Premium cocktail & mocktail bombs. Drop, fizz, and celebrate with the perfect drink every time.
            </p>
            <div className="flex items-center gap-4">
              <a
                href="#"
                className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-fresqo-lime hover:text-fresqo-charcoal transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-fresqo-lime hover:text-fresqo-charcoal transition-colors"
                aria-label="Twitter"
              >
                <Twitter className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-fresqo-lime hover:text-fresqo-charcoal transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-fresqo-lime hover:text-fresqo-charcoal transition-colors"
                aria-label="YouTube"
              >
                <Youtube className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-oswald text-lg font-bold mb-6">Quick Links</h4>
            <ul className="space-y-3">
              <li>
                <a href="#home" className="text-gray-400 hover:text-fresqo-lime transition-colors">
                  Home
                </a>
              </li>
              <li>
                <a href="#products" className="text-gray-400 hover:text-fresqo-lime transition-colors">
                  Our Flavours
                </a>
              </li>
              <li>
                <a href="#how-it-works" className="text-gray-400 hover:text-fresqo-lime transition-colors">
                  How It Works
                </a>
              </li>
              <li>
                <a href="#faq" className="text-gray-400 hover:text-fresqo-lime transition-colors">
                  FAQs
                </a>
              </li>
              <li>
                <a href="#pre-order" className="text-gray-400 hover:text-fresqo-lime transition-colors">
                  Pre-Order
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-oswald text-lg font-bold mb-6">Contact Us</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <Mail className="w-5 h-5 text-fresqo-lime flex-shrink-0 mt-0.5" />
                <span className="text-gray-400">hello@fresqo.in</span>
              </li>
              <li className="flex items-start gap-3">
                <Phone className="w-5 h-5 text-fresqo-lime flex-shrink-0 mt-0.5" />
                <span className="text-gray-400">+91 98765 43210</span>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-fresqo-lime flex-shrink-0 mt-0.5" />
                <span className="text-gray-400">
                  123, Innovation Hub,<br />
                  Bangalore, Karnataka 560001
                </span>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="font-oswald text-lg font-bold mb-6">Stay Updated</h4>
            <p className="text-gray-400 mb-4">
              Subscribe for exclusive offers and new flavour announcements.
            </p>
            <form className="flex gap-2" onSubmit={(e) => e.preventDefault()}>
              <input
                type="email"
                placeholder="Your email"
                className="flex-1 px-4 py-3 bg-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-fresqo-lime"
              />
              <button
                type="submit"
                className="px-4 py-3 gradient-bg text-fresqo-charcoal font-semibold rounded-xl hover:opacity-90 transition-opacity"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10">
        <div className="container-custom py-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-gray-400 text-sm text-center md:text-left">
            © {currentYear} Fresqo. All Rights Reserved. Made with 💚 in India
          </p>
          
          <div className="flex items-center gap-6">
            <a href="#" className="text-gray-400 hover:text-white text-sm transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="text-gray-400 hover:text-white text-sm transition-colors">
              Terms of Service
            </a>
          </div>

          {/* Back to Top */}
          <motion.button
            onClick={scrollToTop}
            whileHover={{ y: -3 }}
            className="w-10 h-10 bg-fresqo-lime rounded-full flex items-center justify-center text-fresqo-charcoal hover:bg-fresqo-aqua transition-colors"
            aria-label="Back to top"
          >
            <ArrowUp className="w-5 h-5" />
          </motion.button>
        </div>
      </div>
    </footer>
  );
}
