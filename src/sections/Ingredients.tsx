import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Check, Award } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const features = [
  'Real fruit extracts',
  'Low sugar content',
  'Alcohol-free base',
  'Travel-friendly packaging',
  'No artificial preservatives',
  'Vegan-friendly',
];

export default function Ingredients() {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        contentRef.current,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
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

  return (
    <section ref={sectionRef} className="section-padding bg-fresqo-cream overflow-hidden">
      <div className="container-custom">
        <div ref={contentRef} className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left - Image */}
          <div className="relative">
            <div className="relative rounded-3xl overflow-hidden shadow-lift">
              <img
                src="/images/ingredients.jpg"
                alt="Fresh natural ingredients"
                className="w-full h-auto object-cover"
              />
            </div>
            
            {/* Floating badge */}
            <div className="absolute -bottom-6 -right-6 bg-white rounded-2xl shadow-soft p-6">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 gradient-bg rounded-xl flex items-center justify-center">
                  <Award className="w-7 h-7 text-fresqo-charcoal" />
                </div>
                <div>
                  <p className="font-bold text-fresqo-dark text-lg">Made in India</p>
                  <p className="text-sm text-fresqo-gray">With love & care</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right - Content */}
          <div>
            <span className="inline-block text-sm font-medium text-fresqo-aqua uppercase tracking-wider mb-4">
              Quality First
            </span>
            <h2 className="font-oswald text-4xl md:text-5xl font-bold text-fresqo-dark mb-6">
              Only the Best Ingredients
            </h2>
            <p className="text-fresqo-gray text-lg mb-8">
              We believe in transparency and quality. Every Fresqo bomb is crafted with carefully sourced, premium ingredients that you can trust.
            </p>

            {/* Features Grid */}
            <div className="grid sm:grid-cols-2 gap-4">
              {features.map((feature, index) => (
                <div
                  key={index}
                  className="flex items-center gap-3 p-4 bg-white rounded-xl shadow-xs"
                >
                  <div className="w-8 h-8 bg-fresqo-lime/20 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Check className="w-4 h-4 text-fresqo-lime" />
                  </div>
                  <span className="text-fresqo-dark font-medium text-sm">{feature}</span>
                </div>
              ))}
            </div>

            {/* Stats */}
            <div className="mt-10 flex flex-wrap gap-8">
              <div>
                <p className="font-oswald text-4xl font-bold gradient-text">100%</p>
                <p className="text-fresqo-gray text-sm">Natural</p>
              </div>
              <div>
                <p className="font-oswald text-4xl font-bold gradient-text">0</p>
                <p className="text-fresqo-gray text-sm">Artificial Colors</p>
              </div>
              <div>
                <p className="font-oswald text-4xl font-bold gradient-text">6mo</p>
                <p className="text-fresqo-gray text-sm">Shelf Life</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
