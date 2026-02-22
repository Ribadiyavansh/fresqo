import { useState, useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, HelpCircle } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const faqs = [
  {
    question: 'What is a Fresqo Ball?',
    answer: 'A Fresqo Ball is a premium cocktail and mocktail mixer in solid form. Simply drop it into sparkling water or soda, watch it fizz and dissolve, and enjoy a delicious drink in seconds. Each ball is carefully crafted with natural fruit extracts and premium ingredients.',
  },
  {
    question: 'Is it alcoholic?',
    answer: 'No, Fresqo Balls are completely alcohol-free. They are designed to be versatile - enjoy them as refreshing mocktails, or add your favorite spirit to create cocktails. The choice is yours!',
  },
  {
    question: 'How long does delivery take?',
    answer: 'We deliver across Rajkot within 5-7 business days for metro cities and 7-10 business days for other locations. You will receive a tracking number once your order is dispatched.',
  },
  {
    question: 'What is the shelf life?',
    answer: 'Fresqo Balls have a shelf life of 6 months from the date of manufacture. Each pack has the expiry date clearly printed on it. Store them in a cool, dry place away from direct sunlight.',
  },
  {
    question: 'Is COD available everywhere?',
    answer: 'Cash on Delivery (COD) is available for most locations across Rajkot. Some remote areas may have limited COD availability. You can check the payment options available for your pincode during checkout.',
  },
];

export default function FAQ() {
  const sectionRef = useRef<HTMLElement>(null);
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.faq-item',
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section ref={sectionRef} id="faq" className="section-padding bg-fresqo-cream">
      <div className="container-custom">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Left - Header */}
          <div className="lg:sticky lg:top-32 lg:self-start">
            <span className="inline-block text-sm font-medium text-fresqo-aqua uppercase tracking-wider mb-4">
              Got Questions?
            </span>
            <h2 className="font-oswald text-4xl md:text-5xl font-bold text-fresqo-dark mb-6">
              Frequently Asked Questions
            </h2>
            <p className="text-fresqo-gray text-lg mb-8">
              Everything you need to know about Fresqo. Can't find what you're looking for? Feel free to reach out to us.
            </p>

            <div className="flex items-center gap-4 p-6 bg-white rounded-2xl shadow-soft">
              <div className="w-12 h-12 bg-fresqo-lime/20 rounded-xl flex items-center justify-center">
                <HelpCircle className="w-6 h-6 text-fresqo-lime" />
              </div>
              <div>
                <p className="font-semibold text-fresqo-dark">Still have questions?</p>
                <p className="text-sm text-fresqo-gray">We're here to help!</p>
              </div>
            </div>
          </div>

          {/* Right - FAQ Accordion */}
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="faq-item bg-white rounded-2xl shadow-soft overflow-hidden"
              >
                <button
                  onClick={() => toggleFAQ(index)}
                  className="w-full flex items-center justify-between p-6 text-left hover:bg-fresqo-cream/50 transition-colors"
                >
                  <span className="font-semibold text-fresqo-dark pr-4">{faq.question}</span>
                  <motion.div
                    animate={{ rotate: openIndex === index ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                    className="flex-shrink-0"
                  >
                    <ChevronDown className="w-5 h-5 text-fresqo-aqua" />
                  </motion.div>
                </button>

                <AnimatePresence>
                  {openIndex === index && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className="px-6 pb-6 text-fresqo-gray leading-relaxed">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
