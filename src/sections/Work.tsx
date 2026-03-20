import { useRef, useLayoutEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, ExternalLink } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const portfolioItems = [
  {
    id: 1,
    image: '/mosaic_creator_01.jpg',
    title: 'Product Review Series',
    category: 'Tech',
    stats: '2.8x ROAS',
  },
  {
    id: 2,
    image: '/mosaic_creator_02.jpg',
    title: 'Founder Story',
    category: 'Wellness',
    stats: '38% CTR',
  },
  {
    id: 3,
    image: '/mosaic_creator_03.jpg',
    title: 'Unboxing Experience',
    category: 'Beauty',
    stats: '1.2M Views',
  },
  {
    id: 4,
    image: '/mosaic_creator_04.jpg',
    title: 'Behind The Scenes',
    category: 'Fashion',
    stats: '24% CPA ↓',
  },
];

export default function Work() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const header = headerRef.current;
    const grid = gridRef.current;
    const cta = ctaRef.current;

    if (!section || !header || !grid || !cta) return;

    const ctx = gsap.context(() => {
      // Header animation
      gsap.fromTo(header,
        { y: 24, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: header,
            start: 'top 75%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Grid tiles animation
      const tiles = grid.querySelectorAll('.portfolio-tile');
      gsap.fromTo(tiles,
        { y: 40, opacity: 0, scale: 0.98 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.7,
          stagger: 0.08,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: grid,
            start: 'top 70%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // CTA animation
      gsap.fromTo(cta,
        { y: 20, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: cta,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        }
      );

    }, section);

    return () => ctx.revert();
  }, []);

  const scrollToContact = () => {
    const element = document.querySelector('#contact');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      ref={sectionRef}
      id="work"
      className="relative w-full bg-midnight py-[8vh] lg:py-[10vh] z-[70]"
    >
      {/* Background vignette */}
      <div className="absolute inset-0 vignette pointer-events-none" />

      <div className="relative">
        {/* Header */}
        <div
          ref={headerRef}
          className="px-6 lg:px-[6vw] mb-8 lg:mb-12"
        >
          <span className="text-xs font-semibold tracking-[0.12em] uppercase text-lime mb-4 block">
            Selected Work
          </span>
          <h2 className="font-display font-bold text-[clamp(2rem,4vw,3.5rem)] leading-tight tracking-tight text-foreground uppercase mb-4">
            Creatives That Perform.
          </h2>
          <p className="text-lg text-coolgray leading-relaxed max-w-xl">
            A few recent campaigns—native style, real creators, real results.
          </p>
        </div>

        {/* Mosaic Grid */}
        <div
          ref={gridRef}
          className="px-6 lg:px-[6vw]"
        >
          <div className="grid grid-cols-1 md:grid-cols-3 md:grid-rows-2 gap-4 lg:gap-5">
            {/* Large left tile */}
            <div className="portfolio-tile md:row-span-2 md:col-span-1 group relative aspect-[3/4] md:aspect-auto rounded-[28px] lg:rounded-[32px] overflow-hidden card-shadow cursor-pointer">
              <img
                src={portfolioItems[0].image}
                alt={portfolioItems[0].title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-midnight/90 via-midnight/20 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-5 lg:p-6">
                <div className="flex items-center gap-2 mb-2">
                  <span className="px-2.5 py-1 text-xs font-medium bg-lime/20 text-lime rounded-full">
                    {portfolioItems[0].stats}
                  </span>
                  <span className="text-xs text-coolgray">{portfolioItems[0].category}</span>
                </div>
                <h3 className="font-display font-semibold text-xl text-foreground group-hover:text-lime transition-colors">
                  {portfolioItems[0].title}
                </h3>
              </div>
              <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                <div className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center">
                  <ExternalLink size={18} className="text-foreground" />
                </div>
              </div>
            </div>

            {/* Top right wide tile */}
            <div className="portfolio-tile md:col-span-2 group relative aspect-video rounded-[28px] lg:rounded-[32px] overflow-hidden card-shadow cursor-pointer">
              <img
                src={portfolioItems[1].image}
                alt={portfolioItems[1].title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-midnight/90 via-midnight/20 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-5 lg:p-6">
                <div className="flex items-center gap-2 mb-2">
                  <span className="px-2.5 py-1 text-xs font-medium bg-lime/20 text-lime rounded-full">
                    {portfolioItems[1].stats}
                  </span>
                  <span className="text-xs text-coolgray">{portfolioItems[1].category}</span>
                </div>
                <h3 className="font-display font-semibold text-xl text-foreground group-hover:text-lime transition-colors">
                  {portfolioItems[1].title}
                </h3>
              </div>
            </div>

            {/* Bottom right tiles */}
            <div className="portfolio-tile group relative aspect-[4/5] rounded-[28px] lg:rounded-[32px] overflow-hidden card-shadow cursor-pointer">
              <img
                src={portfolioItems[2].image}
                alt={portfolioItems[2].title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-midnight/90 via-midnight/20 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-5">
                <div className="flex items-center gap-2 mb-2">
                  <span className="px-2.5 py-1 text-xs font-medium bg-lime/20 text-lime rounded-full">
                    {portfolioItems[2].stats}
                  </span>
                </div>
                <h3 className="font-display font-semibold text-lg text-foreground group-hover:text-lime transition-colors">
                  {portfolioItems[2].title}
                </h3>
              </div>
            </div>

            <div className="portfolio-tile group relative aspect-[4/5] rounded-[28px] lg:rounded-[32px] overflow-hidden card-shadow cursor-pointer">
              <img
                src={portfolioItems[3].image}
                alt={portfolioItems[3].title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-midnight/90 via-midnight/20 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-5">
                <div className="flex items-center gap-2 mb-2">
                  <span className="px-2.5 py-1 text-xs font-medium bg-lime/20 text-lime rounded-full">
                    {portfolioItems[3].stats}
                  </span>
                </div>
                <h3 className="font-display font-semibold text-lg text-foreground group-hover:text-lime transition-colors">
                  {portfolioItems[3].title}
                </h3>
              </div>
            </div>
          </div>
        </div>

        {/* CTA Block */}
        <div
          ref={ctaRef}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-10 lg:mt-14 px-6"
        >
          <button
            onClick={scrollToContact}
            className="group flex items-center gap-2 px-6 py-3.5 bg-lime text-midnight font-semibold rounded-full hover:shadow-glow transition-all duration-300 hover:-translate-y-0.5"
          >
            Book a Call
            <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
          </button>
          <button className="text-coolgray hover:text-foreground transition-colors font-medium">
            Request More Examples
          </button>
        </div>
      </div>
    </section>
  );
}
