import { useRef, useLayoutEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Check } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function WhyUs() {
  const sectionRef = useRef<HTMLElement>(null);
  const topCardRef = useRef<HTMLDivElement>(null);
  const bottomCardRef = useRef<HTMLDivElement>(null);
  const topCheckRef = useRef<HTMLDivElement>(null);
  const bottomCheckRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const topCard = topCardRef.current;
    const bottomCard = bottomCardRef.current;
    const topCheck = topCheckRef.current;
    const bottomCheck = bottomCheckRef.current;

    if (!section || !topCard || !bottomCard || !topCheck || !bottomCheck) return;

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
          { y: '-60vh', opacity: 0 },
          { y: 0, opacity: 1, ease: 'none' },
          0
        )
        .fromTo(bottomCard,
          { y: '60vh', opacity: 0 },
          { y: 0, opacity: 1, ease: 'none' },
          0.08
        )
        .fromTo([topCheck, bottomCheck],
          { scale: 0 },
          { scale: 1, ease: 'none' },
          0.15
        );

      // SETTLE (30-70%): Hold position

      // EXIT (70-100%)
      scrollTl
        .fromTo(topCard,
          { scale: 1, opacity: 1 },
          { scale: 0.98, opacity: 0.25, ease: 'power2.in' },
          0.7
        )
        .fromTo(bottomCard,
          { scale: 1, opacity: 1 },
          { scale: 0.98, opacity: 0.25, ease: 'power2.in' },
          0.7
        )
        .fromTo([topCheck, bottomCheck],
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
      className="relative w-full h-screen bg-midnight overflow-hidden z-[60]"
    >
      {/* Background vignette */}
      <div className="absolute inset-0 vignette pointer-events-none" />

      {/* Top Card */}
      <div
        ref={topCardRef}
        className="absolute left-1/2 -translate-x-1/2 top-[14vh] w-[86vw] max-w-[1100px] p-[5vh_5vw] rounded-[36px] border border-white/[0.06] bg-midnight-light/50 backdrop-blur-sm"
      >
        <div className="flex items-start gap-4">
          <div
            ref={topCheckRef}
            className="flex items-center justify-center w-8 h-8 rounded-full bg-lime/20 flex-shrink-0 mt-1"
          >
            <Check size={16} className="text-lime" />
          </div>
          <div>
            <h3 className="font-display font-bold text-[clamp(1.75rem,4vw,3.5rem)] leading-tight tracking-tight text-foreground uppercase mb-4">
              Creators + Strategists.
            </h3>
            <p className="text-lg text-coolgray leading-relaxed max-w-2xl">
              We don't just hand over footage. We plan angles, hooks, and offers that convert.
            </p>
          </div>
        </div>
      </div>

      {/* Bottom Card */}
      <div
        ref={bottomCardRef}
        className="absolute left-1/2 -translate-x-1/2 top-[54vh] w-[86vw] max-w-[1100px] p-[5vh_5vw] rounded-[36px] border border-white/[0.06] bg-midnight-light/50 backdrop-blur-sm"
      >
        <div className="flex items-start gap-4">
          <div
            ref={bottomCheckRef}
            className="flex items-center justify-center w-8 h-8 rounded-full bg-lime/20 flex-shrink-0 mt-1"
          >
            <Check size={16} className="text-lime" />
          </div>
          <div>
            <h3 className="font-display font-bold text-[clamp(1.75rem,4vw,3.5rem)] leading-tight tracking-tight text-foreground uppercase mb-4">
              Quality At Speed.
            </h3>
            <p className="text-lg text-coolgray leading-relaxed max-w-2xl">
              Tight feedback loops. Fast reshoots. A system designed for scale.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
