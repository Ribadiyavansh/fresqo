import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const steps = [
  {
    number: '01',
    title: 'Drop',
    description: 'Drop the bomb into 200ml of soda or sparkling water.',
    image: '/images/step-drop.jpg',
  },
  {
    number: '02',
    title: 'Fizz',
    description: 'Watch it dissolve completely, creating a beautiful fizz.',
    image: '/images/step-fizz.jpg',
  },
  {
    number: '03',
    title: 'Add Ice',
    description: 'Cool it down with fresh ice cubes.',
    image: '/images/step-ice.jpg',
  },
  {
    number: '04',
    title: 'Enjoy',
    description: 'Add your favorite spirit or enjoy as a mocktail.',
    image: '/images/step-enjoy.jpg',
  },
];

export default function HowItWorks() {
  const sectionRef = useRef<HTMLElement>(null);
  const stepsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const stepElements = stepsRef.current?.querySelectorAll('.step-item');
      
      if (stepElements) {
        gsap.fromTo(
          stepElements,
          { opacity: 0, x: -30 },
          {
            opacity: 1,
            x: 0,
            duration: 0.8,
            stagger: 0.2,
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
    <section ref={sectionRef} id="how-it-works" className="section-padding bg-fresqo-charcoal">
      <div className="container-custom">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="inline-block text-sm font-medium text-fresqo-lime uppercase tracking-wider mb-4">
            Simple Steps
          </span>
          <h2 className="font-oswald text-4xl md:text-5xl font-bold text-white mb-4">
            How It Works
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Making the perfect cocktail has never been easier. Just follow these simple steps.
          </p>
        </div>

        {/* Steps */}
        <div ref={stepsRef} className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <div key={index} className="step-item relative">
              {/* Connector line */}
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-16 left-full w-full h-0.5 bg-gradient-to-r from-fresqo-lime/50 to-fresqo-aqua/50" />
              )}

              <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10 hover:border-fresqo-lime/50 transition-colors">
                {/* Step Number */}
                <div className="flex items-center justify-between mb-4">
                  <span className="text-4xl font-oswald font-bold text-fresqo-lime/30">
                    {step.number}
                  </span>
                  <div className="w-12 h-12 gradient-bg rounded-xl flex items-center justify-center">
                    <span className="text-xl font-bold text-fresqo-charcoal">{index + 1}</span>
                  </div>
                </div>

                {/* Step Image */}
                <div className="aspect-square rounded-xl overflow-hidden mb-4">
                  <img
                    src={step.image}
                    alt={step.title}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                  />
                </div>

                {/* Step Content */}
                <h3 className="font-oswald text-xl font-bold text-white mb-2">
                  {step.title}
                </h3>
                <p className="text-gray-400 text-sm">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-16 text-center">
          <a
            href="#pre-order"
            onClick={(e) => {
              e.preventDefault();
              document.querySelector('#pre-order')?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="inline-flex items-center gap-2 btn-primary"
          >
            Start Your Order
          </a>
        </div>
      </div>
    </section>
  );
}
