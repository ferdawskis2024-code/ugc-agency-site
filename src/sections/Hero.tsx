import { useRef, useLayoutEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, Play } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const portraitRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const eyebrowRef = useRef<HTMLSpanElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const subheadlineRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const portrait = portraitRef.current;
    const content = contentRef.current;
    const eyebrow = eyebrowRef.current;
    const headline = headlineRef.current;
    const subheadline = subheadlineRef.current;
    const cta = ctaRef.current;

    if (!section || !portrait || !content || !eyebrow || !headline || !subheadline || !cta) return;

    const ctx = gsap.context(() => {
      // Initial state - hidden
      gsap.set([portrait, eyebrow, headline, subheadline, cta], { opacity: 0 });
      gsap.set(portrait, { x: '-18vw', scale: 0.98 });
      gsap.set(eyebrow, { y: -12 });
      gsap.set(headline, { y: 28 });
      gsap.set(subheadline, { y: 18 });
      gsap.set(cta, { y: 18 });

      // Auto-play entrance animation
      const entranceTl = gsap.timeline({ delay: 0.2 });
      
      entranceTl
        .to(portrait, {
          x: 0,
          opacity: 1,
          scale: 1,
          duration: 1,
          ease: 'power2.out',
        })
        .to(eyebrow, {
          y: 0,
          opacity: 1,
          duration: 0.6,
          ease: 'power2.out',
        }, 0.15)
        .to(headline, {
          y: 0,
          opacity: 1,
          duration: 0.7,
          ease: 'power2.out',
        }, 0.25)
        .to(subheadline, {
          y: 0,
          opacity: 1,
          duration: 0.6,
          ease: 'power2.out',
        }, 0.4)
        .to(cta, {
          y: 0,
          opacity: 1,
          duration: 0.6,
          ease: 'power2.out',
        }, 0.5);

      // Scroll-driven exit animation
      const scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: '+=130%',
          pin: true,
          scrub: 0.6,
          onLeaveBack: () => {
            // Reset to visible when scrolling back
            gsap.to([portrait, eyebrow, headline, subheadline, cta], {
              opacity: 1,
              x: 0,
              y: 0,
              scale: 1,
              duration: 0.3,
            });
          },
        },
      });

      // ENTRANCE (0-30%): Keep settled (no animation - matches load end state)
      // SETTLE (30-70%): Hold position
      
      // EXIT (70-100%): Elements exit
      scrollTl
        .fromTo(headline,
          { x: 0, opacity: 1 },
          { x: '18vw', opacity: 0.25, ease: 'power2.in' },
          0.7
        )
        .fromTo([eyebrow, subheadline],
          { x: 0, opacity: 1 },
          { x: '14vw', opacity: 0.2, ease: 'power2.in' },
          0.72
        )
        .fromTo(portrait,
          { x: 0, opacity: 1, scale: 1 },
          { x: '-18vw', opacity: 0.35, scale: 0.98, ease: 'power2.in' },
          0.7
        )
        .fromTo(cta,
          { y: 0, opacity: 1 },
          { y: '10vh', opacity: 0, ease: 'power2.in' },
          0.75
        );

      // Final fade out at 95-99%
      scrollTl
        .to([headline, eyebrow, subheadline, portrait], {
          opacity: 0,
          duration: 0.05,
        }, 0.95);

    }, section);

    return () => ctx.revert();
  }, []);

  const scrollToWork = () => {
    const element = document.querySelector('#work');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToContact = () => {
    const element = document.querySelector('#contact');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      ref={sectionRef}
      className="relative w-full h-screen bg-midnight overflow-hidden z-10"
    >
      {/* Background vignette */}
      <div className="absolute inset-0 vignette pointer-events-none" />
      
      {/* Subtle gradient glow */}
      <div className="absolute top-1/4 right-1/4 w-[600px] h-[600px] bg-lime/5 rounded-full blur-[150px] pointer-events-none" />

      {/* Portrait Card */}
      <div
        ref={portraitRef}
        className="absolute left-[4vw] top-[10vh] w-[46vw] h-[80vh] rounded-[36px] overflow-hidden card-shadow"
      >
        <img
          src="/hero_creator_portrait.jpg"
          alt="UGC Creator"
          className="w-full h-full object-cover"
        />
        {/* Portrait vignette overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-midnight/40 via-transparent to-transparent" />
      </div>

      {/* Content Stack */}
      <div
        ref={contentRef}
        className="absolute left-[54vw] top-[18vh] w-[40vw]"
      >
        {/* Eyebrow */}
        <span
          ref={eyebrowRef}
          className="inline-block text-xs font-semibold tracking-[0.12em] uppercase text-lime mb-6"
        >
          Performance Creative Studio
        </span>

        {/* Headline */}
        <h1
          ref={headlineRef}
          className="font-display font-bold text-[clamp(2.5rem,5vw,5.25rem)] leading-[0.95] tracking-tight text-foreground uppercase mb-8"
        >
          UGC Ads That Actually Convert.
        </h1>

        {/* Subheadline */}
        <p
          ref={subheadlineRef}
          className="text-lg lg:text-xl text-coolgray leading-relaxed max-w-lg mb-10"
        >
          Short-form creatives built for TikTok, Reels, and paid social. 
          Fast delivery. Real creators. Performance-first.
        </p>

        {/* CTAs */}
        <div ref={ctaRef} className="flex flex-wrap gap-4">
          <button
            onClick={scrollToContact}
            className="group flex items-center gap-2 px-6 py-3.5 bg-lime text-midnight font-semibold rounded-full hover:shadow-glow transition-all duration-300 hover:-translate-y-0.5"
          >
            Book a Free Strategy Call
            <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
          </button>
          <button
            onClick={scrollToWork}
            className="group flex items-center gap-2 px-6 py-3.5 border border-white/10 text-foreground font-medium rounded-full hover:bg-white/5 hover:border-white/20 transition-all duration-300"
          >
            <Play size={18} className="text-lime" />
            View Work
          </button>
        </div>

        {/* Trust line */}
        <p className="mt-8 text-sm text-coolgray/70">
          Trusted by DTC brands in beauty, wellness, and tech.
        </p>
      </div>

      {/* Mobile Layout - Only visible on small screens */}
      <div className="md:hidden absolute inset-0 flex flex-col p-6 pt-24">
        <div className="relative w-full h-[45vh] rounded-3xl overflow-hidden card-shadow mb-6">
          <img
            src="/hero_creator_portrait.jpg"
            alt="UGC Creator"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-midnight/60 via-transparent to-transparent" />
        </div>
        <div className="flex-1">
          <span className="text-xs font-semibold tracking-[0.12em] uppercase text-lime mb-4 block">
            Performance Creative Studio
          </span>
          <h1 className="font-display font-bold text-3xl leading-tight tracking-tight text-foreground uppercase mb-4">
            UGC Ads That Actually Convert.
          </h1>
          <p className="text-base text-coolgray leading-relaxed mb-6">
            Short-form creatives built for TikTok, Reels, and paid social. 
            Fast delivery. Real creators. Performance-first.
          </p>
          <div className="flex flex-col gap-3">
            <button
              onClick={scrollToContact}
              className="w-full py-3.5 bg-lime text-midnight font-semibold rounded-full"
            >
              Book a Free Strategy Call
            </button>
            <button
              onClick={scrollToWork}
              className="w-full py-3.5 border border-white/10 text-foreground font-medium rounded-full"
            >
              View Work
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
