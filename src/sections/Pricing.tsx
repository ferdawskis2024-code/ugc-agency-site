import { useRef, useLayoutEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Check, Zap } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const pricingPlans = [
  {
    name: 'Starter',
    description: 'For small brands testing creative',
    price: '$1,497',
    features: [
      '3 UGC videos',
      '3 hook variations',
      '1 creator match',
      'Script + editing',
      '7-day delivery',
    ],
    cta: 'Get Started',
    highlighted: false,
  },
  {
    name: 'Growth',
    description: 'For brands actively testing ads',
    price: '$2,997',
    features: [
      '6 UGC videos',
      'Multiple hook variations',
      '2–3 creators',
      'Script + edit + thumbnails',
      '5–7 day delivery',
    ],
    cta: 'Book a Call',
    highlighted: true,
  },
  {
    name: 'Scale',
    description: 'For aggressive paid media brands',
    price: 'Custom',
    features: [
      '10+ creatives',
      'Multiple creators',
      'Hook library + variations',
      'Priority delivery',
      'Monthly scaling support',
    ],
    cta: 'Contact Us',
    highlighted: false,
  },
];

export default function Pricing() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const header = headerRef.current;
    const cards = cardsRef.current;

    if (!section || !header || !cards) return;

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

      // Cards animation
      const cardElements = cards.querySelectorAll('.pricing-card');
      gsap.fromTo(cardElements,
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.7,
          stagger: 0.1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: cards,
            start: 'top 70%',
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
      id="pricing"
      className="relative w-full bg-midnight py-[10vh] lg:py-[12vh] z-[80]"
    >
      {/* Background vignette */}
      <div className="absolute inset-0 vignette pointer-events-none" />

      <div className="relative px-6 lg:px-[6vw]">
        {/* Header */}
        <div
          ref={headerRef}
          className="text-center max-w-[680px] mx-auto mb-10 lg:mb-14"
        >
          <span className="text-xs font-semibold tracking-[0.12em] uppercase text-lime mb-4 block">
            Pricing
          </span>
          <h2 className="font-display font-bold text-[clamp(2rem,4vw,3.5rem)] leading-tight tracking-tight text-foreground uppercase mb-4">
            Choose Your Creative Engine.
          </h2>
          <p className="text-lg text-coolgray leading-relaxed">
            Flat packages. No hidden fees. Fast turnaround.
          </p>
        </div>

        {/* Pricing Cards */}
        <div
          ref={cardsRef}
          className="grid grid-cols-1 md:grid-cols-3 gap-5 max-w-[1200px] mx-auto"
        >
          {pricingPlans.map((plan) => (
            <div
              key={plan.name}
              className={`pricing-card relative p-6 lg:p-8 rounded-[32px] border transition-all duration-300 hover:-translate-y-1.5 ${
                plan.highlighted
                  ? 'border-lime/50 bg-midnight-light/80 shadow-glow'
                  : 'border-white/[0.06] bg-midnight-light/50 hover:border-white/10'
              }`}
            >
              {/* Badge */}
              {plan.highlighted && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <div className="flex items-center gap-1.5 px-3 py-1.5 bg-lime text-midnight text-xs font-bold rounded-full">
                    <Zap size={12} />
                    MOST POPULAR
                  </div>
                </div>
              )}

              {/* Plan Header */}
              <div className="mb-6">
                <h3 className="font-display font-bold text-xl text-foreground mb-1">
                  {plan.name}
                </h3>
                <p className="text-sm text-coolgray">{plan.description}</p>
              </div>

              {/* Price */}
              <div className="mb-6">
                <span className="font-display font-bold text-4xl lg:text-5xl text-foreground">
                  {plan.price}
                </span>
                {plan.price !== 'Custom' && (
                  <span className="text-coolgray text-sm ml-1">/project</span>
                )}
              </div>

              {/* Features */}
              <ul className="space-y-3 mb-8">
                {plan.features.map((feature, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <div className={`flex items-center justify-center w-5 h-5 rounded-full flex-shrink-0 mt-0.5 ${
                      plan.highlighted ? 'bg-lime/20' : 'bg-white/5'
                    }`}>
                      <Check size={12} className={plan.highlighted ? 'text-lime' : 'text-coolgray'} />
                    </div>
                    <span className="text-sm text-foreground">{feature}</span>
                  </li>
                ))}
              </ul>

              {/* CTA */}
              <button
                onClick={scrollToContact}
                className={`w-full py-3.5 rounded-full font-semibold text-sm transition-all duration-300 ${
                  plan.highlighted
                    ? 'bg-lime text-midnight hover:shadow-glow hover:-translate-y-0.5'
                    : 'border border-white/10 text-foreground hover:bg-white/5 hover:border-white/20'
                }`}
              >
                {plan.cta}
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
