import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Leaf, Zap, PartyPopper } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const features = [
  {
    icon: Leaf,
    title: 'Real Flavours',
    description: 'Premium fruit extracts. No artificial bitterness. Just pure, natural taste in every sip.',
    color: 'bg-fresqo-lime/20',
    iconColor: 'text-fresqo-lime',
  },
  {
    icon: Zap,
    title: 'Instant Mix',
    description: 'Ready in 30 seconds. Just drop the bomb, watch it fizz, and enjoy your drink.',
    color: 'bg-fresqo-aqua/20',
    iconColor: 'text-fresqo-aqua',
  },
  {
    icon: PartyPopper,
    title: 'Party Ready',
    description: 'Perfect for celebrations, gatherings, and gifting. Elevate any occasion instantly.',
    color: 'bg-fresqo-lime/20',
    iconColor: 'text-fresqo-lime',
  },
];

export default function ValueProposition() {
  const sectionRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const cards = cardsRef.current?.querySelectorAll('.feature-card');
      
      if (cards) {
        gsap.fromTo(
          cards,
          { opacity: 0, y: 50 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            stagger: 0.15,
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

  return (
    <section ref={sectionRef} className="section-padding bg-fresqo-cream">
      <div className="container-custom">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="inline-block text-sm font-medium text-fresqo-aqua uppercase tracking-wider mb-4">
            Why Choose Fresqo
          </span>
          <h2 className="font-oswald text-4xl md:text-5xl font-bold text-fresqo-dark mb-4">
            The Fresqo Difference
          </h2>
          <p className="text-fresqo-gray max-w-2xl mx-auto">
            We craft every bomb with premium ingredients and love, ensuring you get the perfect drink every single time.
          </p>
        </div>

        {/* Feature Cards */}
        <div ref={cardsRef} className="grid md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="feature-card bg-white rounded-2xl p-8 card-lift shadow-soft"
            >
              <div className={`w-16 h-16 ${feature.color} rounded-2xl flex items-center justify-center mb-6`}>
                <feature.icon className={`w-8 h-8 ${feature.iconColor}`} />
              </div>
              <h3 className="font-oswald text-2xl font-bold text-fresqo-dark mb-3">
                {feature.title}
              </h3>
              <p className="text-fresqo-gray leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
