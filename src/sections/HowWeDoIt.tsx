import { useRef, useLayoutEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function HowWeDoIt() {
  const sectionRef = useRef<HTMLElement>(null);
  const topCardRef = useRef<HTMLDivElement>(null);
  const bottomCardRef = useRef<HTMLDivElement>(null);
  const connectorRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const topCard = topCardRef.current;
    const bottomCard = bottomCardRef.current;
    const connector = connectorRef.current;

    if (!section || !topCard || !bottomCard || !connector) return;

    const ctx = gsap.context(() => {
      const scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: '+=140%',
          pin: true,
          scrub: 0.6,
        },
      });

      // ENTRANCE (0-30%)
      scrollTl
        .fromTo(topCard,
          { x: '-60vw', opacity: 0 },
          { x: 0, opacity: 1, ease: 'none' },
          0
        )
        .fromTo(bottomCard,
          { x: '60vw', opacity: 0 },
          { x: 0, opacity: 1, ease: 'none' },
          0.08
        )
        .fromTo(connector,
          { scaleY: 0 },
          { scaleY: 1, ease: 'none' },
          0.12
        );

      // SETTLE (30-70%): Hold position

      // EXIT (70-100%)
      scrollTl
        .fromTo(topCard,
          { y: 0, opacity: 1 },
          { y: '-18vh', opacity: 0.25, ease: 'power2.in' },
          0.7
        )
        .fromTo(bottomCard,
          { y: 0, opacity: 1 },
          { y: '18vh', opacity: 0.25, ease: 'power2.in' },
          0.7
        )
        .fromTo(connector,
          { scaleY: 1, opacity: 1 },
          { scaleY: 0, opacity: 0, ease: 'power2.in' },
          0.72
        );

      // Final fade at 95-99%
      scrollTl.to([topCard, bottomCard], {
        opacity: 0,
        duration: 0.05,
      }, 0.95);

    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative w-full h-screen bg-midnight overflow-hidden z-40"
    >
      {/* Background vignette */}
      <div className="absolute inset-0 vignette pointer-events-none" />

      {/* Top Card */}
      <div
        ref={topCardRef}
        className="absolute left-1/2 -translate-x-1/2 top-[14vh] w-[86vw] max-w-[1100px] p-[5vh_5vw] rounded-[36px] border border-white/[0.06] bg-midnight-light/50 backdrop-blur-sm"
      >
        <h3 className="font-display font-bold text-[clamp(1.75rem,4vw,3.5rem)] leading-tight tracking-tight text-foreground uppercase mb-4">
          Concept → Creator → Cut.
        </h3>
        <p className="text-lg text-coolgray leading-relaxed max-w-2xl">
          We script, cast, shoot, and edit—so you can launch faster.
        </p>
      </div>

      {/* Connector Line */}
      <div
        ref={connectorRef}
        className="absolute left-1/2 -translate-x-1/2 top-[46vh] w-[2px] h-[8vh] bg-lime origin-top"
      />

      {/* Bottom Card */}
      <div
        ref={bottomCardRef}
        className="absolute left-1/2 -translate-x-1/2 top-[54vh] w-[86vw] max-w-[1100px] p-[5vh_5vw] rounded-[36px] border border-white/[0.06] bg-midnight-light/50 backdrop-blur-sm"
      >
        <h3 className="font-display font-bold text-[clamp(1.75rem,4vw,3.5rem)] leading-tight tracking-tight text-foreground uppercase mb-4">
          Delivered in Days. Not Weeks.
        </h3>
        <p className="text-lg text-coolgray leading-relaxed max-w-2xl">
          Rapid iterations. Multiple hooks. Clear naming. Ready to upload.
        </p>
      </div>
    </section>
  );
}
