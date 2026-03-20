import { useRef, useLayoutEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function Manifesto() {
  const sectionRef = useRef<HTMLElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const bodyRef = useRef<HTMLParagraphElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const card = cardRef.current;
    const line = lineRef.current;
    const headline = headlineRef.current;
    const body = bodyRef.current;

    if (!section || !card || !line || !headline || !body) return;

    const ctx = gsap.context(() => {
      const scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: '+=130%',
          pin: true,
          scrub: 0.6,
        },
      });

      // ENTRANCE (0-30%)
      scrollTl
        .fromTo(card,
          { y: '40vh', opacity: 0, scale: 0.96 },
          { y: 0, opacity: 1, scale: 1, ease: 'none' },
          0
        )
        .fromTo(line,
          { scaleX: 0 },
          { scaleX: 1, ease: 'none' },
          0.05
        )
        .fromTo(headline,
          { y: 24, opacity: 0 },
          { y: 0, opacity: 1, ease: 'none' },
          0.1
        )
        .fromTo(body,
          { y: 18, opacity: 0 },
          { y: 0, opacity: 1, ease: 'none' },
          0.15
        );

      // SETTLE (30-70%): Hold position - no animation

      // EXIT (70-100%)
      scrollTl
        .fromTo(card,
          { y: 0, opacity: 1 },
          { y: '-30vh', opacity: 0.25, ease: 'power2.in' },
          0.7
        )
        .fromTo(line,
          { scaleX: 1, opacity: 1 },
          { scaleX: 0, opacity: 0, ease: 'power2.in' },
          0.7
        )
        .fromTo(headline,
          { y: 0, opacity: 1 },
          { y: -18, opacity: 0.2, ease: 'power2.in' },
          0.72
        )
        .fromTo(body,
          { y: 0, opacity: 1 },
          { y: -12, opacity: 0, ease: 'power2.in' },
          0.74
        );

      // Final fade at 95-99%
      scrollTl.to([card, headline], {
        opacity: 0,
        duration: 0.05,
      }, 0.95);

    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative w-full h-screen bg-midnight overflow-hidden z-20"
    >
      {/* Background vignette */}
      <div className="absolute inset-0 vignette pointer-events-none" />
      
      {/* Subtle gradient */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-lime/3 rounded-full blur-[150px] pointer-events-none" />

      {/* Center Statement Card */}
      <div
        ref={cardRef}
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[86vw] max-w-[1100px] p-[6vh_6vw] rounded-[36px] border border-white/[0.06] bg-midnight-light/50 backdrop-blur-sm"
      >
        {/* Accent line */}
        <div
          ref={lineRef}
          className="w-[72px] h-[2px] bg-lime mx-auto mb-6 origin-center"
        />

        {/* Headline */}
        <h2
          ref={headlineRef}
          className="font-display font-bold text-[clamp(2rem,5vw,4.5rem)] leading-[1.05] tracking-tight text-foreground uppercase text-center mb-8"
        >
          Ads Should Sell.<br className="hidden sm:block" /> Not Just Look Good.
        </h2>

        {/* Body */}
        <p
          ref={bodyRef}
          className="text-lg lg:text-xl text-coolgray leading-relaxed text-center max-w-[52ch] mx-auto"
        >
          We build native-first creatives that match platform behavior, 
          hook in 0–3 seconds, and drive measurable conversions.
        </p>
      </div>
    </section>
  );
}
