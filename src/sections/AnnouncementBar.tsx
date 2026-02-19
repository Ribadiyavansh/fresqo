import { useState } from 'react';
import { X, Flame } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function AnnouncementBar() {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ y: -40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: -40, opacity: 0 }}
        className="relative z-50 h-10 gradient-bg flex items-center justify-center"
      >
        <div className="flex items-center gap-2 text-fresqo-charcoal text-sm font-medium">
          <Flame className="w-4 h-4" />
          <span>Pre-Orders Open | Cash on Delivery Available Across India</span>
        </div>
        <button
          onClick={() => setIsVisible(false)}
          className="absolute right-4 p-1 hover:bg-black/10 rounded-full transition-colors"
          aria-label="Close announcement"
        >
          <X className="w-4 h-4" />
        </button>
      </motion.div>
    </AnimatePresence>
  );
}
