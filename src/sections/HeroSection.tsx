import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion } from 'framer-motion';
import { ArrowRight, Sparkles } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Title animation
      gsap.fromTo(
        titleRef.current,
        { opacity: 0, y: 50 },
        { 
          opacity: 1, 
          y: 0, 
          duration: 1, 
          ease: 'power3.out',
          delay: 0.2 
        }
      );

      // Subtitle animation
      gsap.fromTo(
        subtitleRef.current,
        { opacity: 0, y: 30 },
        { 
          opacity: 1, 
          y: 0, 
          duration: 0.8, 
          ease: 'power3.out',
          delay: 0.4 
        }
      );

      // CTA animation
      gsap.fromTo(
        ctaRef.current,
        { opacity: 0, y: 30 },
        { 
          opacity: 1, 
          y: 0, 
          duration: 0.8, 
          ease: 'power3.out',
          delay: 0.6 
        }
      );

      // Image animation
      gsap.fromTo(
        imageRef.current,
        { opacity: 0, scale: 0.9 },
        { 
          opacity: 1, 
          scale: 1, 
          duration: 1.2, 
          ease: 'power3.out',
          delay: 0.3 
        }
      );

      // Scroll-triggered parallax
      gsap.to(imageRef.current, {
        y: -50,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: 1,
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      ref={sectionRef}
      id="home"
      className="relative min-h-screen flex items-center pt-20 overflow-hidden"
    >
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-1/4 -right-1/4 w-[600px] h-[600px] bg-fresqo-lime/20 rounded-full blur-3xl" />
        <div className="absolute -bottom-1/4 -left-1/4 w-[500px] h-[500px] bg-fresqo-aqua/20 rounded-full blur-3xl" />
      </div>

      <div className="container-custom relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-8 items-center">
          {/* Left Content */}
          <div className="order-2 lg:order-1 text-center lg:text-left">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 bg-fresqo-lime/20 px-4 py-2 rounded-full mb-6"
            >
              <Sparkles className="w-4 h-4 text-fresqo-lime" />
              <span className="text-sm font-medium text-fresqo-dark">Premium Cocktail Bombs</span>
            </motion.div>

            <h1
              ref={titleRef}
              className="font-oswald text-5xl md:text-6xl lg:text-7xl font-bold text-fresqo-dark leading-tight mb-6"
            >
              Drop.{' '}
              <span className="gradient-text">Fizz.</span>{' '}
              Celebrate.
            </h1>

            <p
              ref={subtitleRef}
              className="text-lg md:text-xl text-fresqo-gray max-w-lg mx-auto lg:mx-0 mb-8"
            >
              Premium cocktail & mocktail bombs. Instant party magic in every sphere. 
              Just drop, fizz, and enjoy!
            </p>

            <div ref={ctaRef} className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <button
                onClick={() => scrollToSection('#pre-order')}
                className="btn-primary flex items-center justify-center gap-2 group"
              >
                Pre-Order Now – COD
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
              <button
                onClick={() => scrollToSection('#products')}
                className="px-6 py-3 border-2 border-fresqo-dark text-fresqo-dark font-semibold rounded-xl hover:bg-fresqo-dark hover:text-white transition-all duration-300"
              >
                Explore Flavours
              </button>
            </div>

            {/* Trust badges */}
            <div className="mt-12 flex flex-wrap items-center justify-center lg:justify-start gap-6">
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 bg-fresqo-lime/20 rounded-full flex items-center justify-center">
                  <span className="text-lg">🌿</span>
                </div>
                <span className="text-sm text-fresqo-gray">Natural</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 bg-fresqo-aqua/20 rounded-full flex items-center justify-center">
                  <span className="text-lg">⚡</span>
                </div>
                <span className="text-sm text-fresqo-gray">30 Sec Prep</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 bg-fresqo-lime/20 rounded-full flex items-center justify-center">
                  <span className="text-lg">🇮🇳</span>
                </div>
                <span className="text-sm text-fresqo-gray">Made in India</span>
              </div>
            </div>
          </div>

          {/* Right Content - Hero Image */}
          <div className="order-1 lg:order-2 flex justify-center">
            <div
              ref={imageRef}
              className="relative w-full max-w-md lg:max-w-lg"
            >
              {/* Glow effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-fresqo-lime/30 to-fresqo-aqua/30 rounded-full blur-3xl scale-110" />
              
              {/* Main image */}
              <div className="relative rounded-3xl overflow-hidden shadow-lift">
                <img
                  src="/images/hero-bomb.jpg"
                  alt="Fresqo Cocktail Bomb fizzing in a glass"
                  className="w-full h-auto object-cover"
                />
              </div>

              {/* Floating badge */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8, duration: 0.5 }}
                className="absolute -bottom-4 -left-4 bg-white rounded-2xl shadow-soft p-4"
              >
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 gradient-bg rounded-xl flex items-center justify-center">
                    <span className="text-2xl">🍹</span>
                  </div>
                  <div>
                    <p className="font-bold text-fresqo-dark">₹350</p>
                    <p className="text-sm text-fresqo-gray">per pack</p>
                  </div>
                </div>
              </motion.div>

              {/* Another floating element */}
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1, duration: 0.5 }}
                className="absolute -top-4 -right-4 bg-white rounded-2xl shadow-soft px-4 py-2"
              >
                <div className="flex items-center gap-2">
                  <span className="text-yellow-500">★★★★★</span>
                  <span className="text-sm font-medium">4.9/5</span>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
