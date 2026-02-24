import { useEffect, useRef, useState } from 'react';
import { Skeleton, SkeletonText, SkeletonButton, SkeletonImage } from '@/components/ui/skeleton';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (isLoading) return;

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

      // Scroll-triggered parallax (Removed imageRef scrub to prevent conflicting transforms with framer-motion floating)
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
      className="relative min-h-screen flex items-center pt-32 lg:pt-40 pb-20 overflow-hidden"
    >
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-1/4 -right-1/4 w-[600px] h-[600px] bg-fresqo-lime/20 rounded-full blur-3xl" />
        <div className="absolute -bottom-1/4 -left-1/4 w-[500px] h-[500px] bg-fresqo-aqua/20 rounded-full blur-3xl" />
      </div>

      <div className="container-custom relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-8 items-center">
          {/* Left Content */}
          <div className="order-2 lg:order-1 text-center lg:text-left min-h-[400px]">
            {isLoading ? (
              <div className="flex flex-col items-center lg:items-start space-y-6">
                <Skeleton className="w-48 h-8 rounded-full mb-2" />
                <SkeletonText lines={3} className="max-w-lg mb-2 h-16" />
                <SkeletonText lines={2} className="max-w-md mb-2" />
              </div>
            ) : (
              <div className="fade-in">
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5 }}
                  className="inline-flex items-center gap-2 bg-fresqo-lime/20 px-4 py-2 rounded-full mb-6"
                >
                  <Sparkles className="w-4 h-4 text-fresqo-lime" />
                  <span className="text-sm font-medium text-fresqo-dark">Premium Cocktail Balls</span>
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
                  Premium cocktail & mocktail balls. Instant party magic in every sphere.
                  Just drop, fizz, and enjoy!
                </p>
              </div>
            )}

            <div ref={ctaRef} className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              {isLoading ? (
                <SkeletonButton className="mx-auto lg:mx-0 w-44" />
              ) : (
                <button
                  onClick={() => scrollToSection('#products')}
                  className="px-6 py-3 border-2 border-fresqo-dark text-fresqo-dark font-semibold rounded-xl hover:bg-fresqo-dark hover:text-white transition-all duration-300 fade-in"
                >
                  Explore Flavours
                </button>
              )}
            </div>

            {/* Trust badges */}
            <div className="mt-12 flex flex-wrap items-center justify-center lg:justify-start gap-6">
              {isLoading ? (
                <>
                  <Skeleton className="w-24 h-10 rounded-full" />
                  <Skeleton className="w-28 h-10 rounded-full" />
                  <Skeleton className="w-32 h-10 rounded-full" />
                </>
              ) : (
                <div className="flex flex-wrap items-center justify-center lg:justify-start gap-6 fade-in">
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
              )}
            </div>
          </div>

          {/* Right Content - Hero Image */}
          <div className="order-1 lg:order-2 flex justify-center">
            <div
              ref={imageRef}
              className="relative w-full max-w-md lg:max-w-lg min-h-[400px] flex items-center"
            >
              {isLoading ? (
                <SkeletonImage className="w-full aspect-[4/5] lg:aspect-square" />
              ) : (
                <div className="relative w-full fade-in">
                  {/* Glow effect */}
                  <div className="absolute inset-0 bg-gradient-to-br from-fresqo-lime/30 to-fresqo-aqua/30 rounded-full blur-3xl scale-110" />

                  {/* Main image with infinite floating animation */}
                  <motion.div
                    className="relative rounded-3xl overflow-hidden shadow-lift"
                    animate={{
                      y: [-15, 15, -15],
                    }}
                    transition={{
                      duration: 6,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  >
                    <img
                      src="/images/hero-cocktail.png"
                      alt="Fresqo Cocktail Ball fizzing in a glass"
                      className="w-full h-auto object-cover"
                    />
                  </motion.div>

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
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
