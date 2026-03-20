import { useRef, useLayoutEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Building2, Target } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function WhoItsFor() {
  const sectionRef = useRef<HTMLElement>(null);
  const topCardRef = useRef<HTMLDivElement>(null);
  const bottomCardRef = useRef<HTMLDivElement>(null);
  const topIconRef = useRef<HTMLDivElement>(null);
  const bottomIconRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const topCard = topCardRef.current;
    const bottomCard = bottomCardRef.current;
    const topIcon = topIconRef.current;
    const bottomIcon = bottomIconRef.current;

    if (!section || !topCard || !bottomCard || !topIcon || !bottomIcon) return;

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
          { x: '60vw', opacity: 0 },
          { x: 0, opacity: 1, ease: 'none' },
          0
        )
        .fromTo(bottomCard,
          { x: '-60vw', opacity: 0 },
          { x: 0, opacity: 1, ease: 'none' },
          0.08
        )
        .fromTo([topIcon, bottomIcon],
          { rotate: -10, opacity: 0 },
          { rotate: 0, opacity: 1, ease: 'none' },
          0.18
        );

      // SETTLE (30-70%): Hold position

      // EXIT (70-100%)
      scrollTl
        .fromTo(topCard,
          { x: 0, opacity: 1 },
          { x: '-18vw', opacity: 0.25, ease: 'power2.in' },
          0.7
        )
        .fromTo(bottomCard,
          { x: 0, opacity: 1 },
          { x: '18vw', opacity: 0.25, ease: 'power2.in' },
          0.7
        )
        .fromTo([topIcon, bottomIcon],
          { opacity: 1 },
          { opacity: 0, ease: 'power2.in' },
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
      className="relative w-full h-screen bg-midnight overflow-hidden z-50"
    >
      {/* Background vignette */}
      <div className="absolute inset-0 vignette pointer-events-none" />

      {/* Top Card */}
      <div
        ref={topCardRef}
        className="absolute left-1/2 -translate-x-1/2 top-[14vh] w-[86vw] max-w-[1100px] p-[5vh_5vw] rounded-[36px] border border-white/[0.06] bg-midnight-light/50 backdrop-blur-sm"
      >
        <div className="flex items-start justify-between">
          <div>
            <h3 className="font-display font-bold text-[clamp(1.75rem,4vw,3.5rem)] leading-tight tracking-tight text-foreground uppercase mb-4">
              Built For DTC Brands.
            </h3>
            <p className="text-lg text-coolgray leading-relaxed max-w-2xl">
              Beauty. Wellness. Tech. Fashion. Problem-solving products that need scroll-stopping proof.
            </p>
          </div>
          <div
            ref={topIconRef}
            className="hidden md:flex items-center justify-center w-14 h-14 rounded-2xl bg-white/5 border border-white/10"
          >
            <Building2 size={24} className="text-coolgray" />
          </div>
        </div>
      </div>

      {/* Bottom Card */}
      <div
        ref={bottomCardRef}
        className="absolute left-1/2 -translate-x-1/2 top-[54vh] w-[86vw] max-w-[1100px] p-[5vh_5vw] rounded-[36px] border border-white/[0.06] bg-midnight-light/50 backdrop-blur-sm"
      >
        <div className="flex items-start justify-between">
          <div>
            <h3 className="font-display font-bold text-[clamp(1.75rem,4vw,3.5rem)] leading-tight tracking-tight text-foreground uppercase mb-4">
              Made For Media Buyers.
            </h3>
            <p className="text-lg text-coolgray leading-relaxed max-w-2xl">
              Clear hooks. Strong CTAs. Variations for testing. Creative that respects your spend.
            </p>
          </div>
          <div
            ref={bottomIconRef}
            className="hidden md:flex items-center justify-center w-14 h-14 rounded-2xl bg-white/5 border border-white/10"
          >
            <Target size={24} className="text-coolgray" />
          </div>
        </div>
      </div>
    </section>
  );
}
