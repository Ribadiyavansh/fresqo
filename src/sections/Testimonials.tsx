import { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, ChevronLeft, ChevronRight, Quote } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const testimonials = [
  {
    id: 1,
    name: 'Priya Sharma',
    image: '/images/testimonial-1.jpg',
    rating: 5,
    text: 'Absolutely love these cocktail bombs! They make hosting so much easier. My guests are always impressed.',
  },
  {
    id: 2,
    name: 'Rahul Patel',
    image: '/images/testimonial-2.jpg',
    rating: 5,
    text: 'The flavors are amazing and so authentic. The Kala Khatta is my absolute favorite!',
  },
  {
    id: 3,
    name: 'Ananya Gupta',
    image: '/images/testimonial-3.jpg',
    rating: 5,
    text: 'Perfect for office parties and get-togethers. Quick, easy, and delicious every time.',
  },
  {
    id: 4,
    name: 'Meera Reddy',
    image: '/images/testimonial-4.jpg',
    rating: 5,
    text: 'I gifted these to my friends and they loved them! Beautiful packaging and amazing taste.',
  },
];

export default function Testimonials() {
  const sectionRef = useRef<HTMLElement>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  const goToPrev = () => {
    setIsAutoPlaying(false);
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const goToNext = () => {
    setIsAutoPlaying(false);
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  return (
    <section ref={sectionRef} className="section-padding bg-white">
      <div className="container-custom">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="inline-block text-sm font-medium text-fresqo-aqua uppercase tracking-wider mb-4">
            Customer Love
          </span>
          <h2 className="font-oswald text-4xl md:text-5xl font-bold text-fresqo-dark mb-4">
            What People Say
          </h2>
          <p className="text-fresqo-gray max-w-2xl mx-auto">
            Don't just take our word for it. Here's what our customers have to say about Fresqo.
          </p>
        </div>

        {/* Testimonials Carousel */}
        <div className="relative max-w-4xl mx-auto">
          {/* Quote Icon */}
          <div className="absolute -top-8 left-1/2 -translate-x-1/2 w-16 h-16 gradient-bg rounded-full flex items-center justify-center z-10">
            <Quote className="w-8 h-8 text-fresqo-charcoal" />
          </div>

          {/* Carousel Container */}
          <div className="bg-fresqo-cream rounded-3xl p-8 md:p-12 pt-16 relative overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.5 }}
                className="text-center"
              >
                {/* Rating */}
                <div className="flex items-center justify-center gap-1 mb-6">
                  {[...Array(testimonials[currentIndex].rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>

                {/* Quote */}
                <p className="text-xl md:text-2xl text-fresqo-dark font-medium mb-8 leading-relaxed">
                  "{testimonials[currentIndex].text}"
                </p>

                {/* Author */}
                <div className="flex items-center justify-center gap-4">
                  <div className="w-16 h-16 rounded-full overflow-hidden border-4 border-white shadow-soft">
                    <img
                      src={testimonials[currentIndex].image}
                      alt={testimonials[currentIndex].name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="text-left">
                    <p className="font-bold text-fresqo-dark">{testimonials[currentIndex].name}</p>
                    <p className="text-sm text-fresqo-gray">Verified Buyer</p>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Navigation Buttons */}
            <button
              onClick={goToPrev}
              className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white rounded-full shadow-soft flex items-center justify-center hover:bg-fresqo-lime/20 transition-colors"
              aria-label="Previous testimonial"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={goToNext}
              className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white rounded-full shadow-soft flex items-center justify-center hover:bg-fresqo-lime/20 transition-colors"
              aria-label="Next testimonial"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>

          {/* Dots Indicator */}
          <div className="flex items-center justify-center gap-2 mt-6">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  setIsAutoPlaying(false);
                  setCurrentIndex(index);
                }}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  index === currentIndex
                    ? 'w-8 gradient-bg'
                    : 'bg-fresqo-gray/30 hover:bg-fresqo-gray/50'
                }`}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
