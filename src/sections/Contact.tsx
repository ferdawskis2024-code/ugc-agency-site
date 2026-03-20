import { useRef, useLayoutEffect, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Send, Mail, Instagram, Linkedin, ArrowUpRight } from 'lucide-react';
import { toast } from 'sonner';

gsap.registerPlugin(ScrollTrigger);

export default function Contact() {
  const sectionRef = useRef<HTMLElement>(null);
  const leftRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLDivElement>(null);
  const footerRef = useRef<HTMLElement>(null);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    brand: '',
    website: '',
    message: '',
  });

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const left = leftRef.current;
    const form = formRef.current;
    const footer = footerRef.current;

    if (!section || !left || !form || !footer) return;

    const ctx = gsap.context(() => {
      // Left content animation
      gsap.fromTo(left,
        { x: -40, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: left,
            start: 'top 75%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Form animation
      gsap.fromTo(form,
        { x: 40, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: form,
            start: 'top 70%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Footer animation
      gsap.fromTo(footer,
        { opacity: 0 },
        {
          opacity: 1,
          duration: 0.6,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: footer,
            start: 'top 90%',
            toggleActions: 'play none none reverse',
          },
        }
      );

    }, section);

    return () => ctx.revert();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success('Message sent! We\'ll get back to you within 24 hours.');
    setFormData({ name: '', email: '', brand: '', website: '', message: '' });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="relative w-full bg-midnight pt-[10vh] lg:pt-[12vh] z-[90]"
    >
      {/* Background vignette */}
      <div className="absolute inset-0 vignette pointer-events-none" />

      <div className="relative px-6 lg:px-[6vw]">
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-16 max-w-[1400px] mx-auto">
          {/* Left Column */}
          <div
            ref={leftRef}
            className="lg:w-[45%] lg:pr-8"
          >
            <h2 className="font-display font-bold text-[clamp(2rem,4vw,3.5rem)] leading-tight tracking-tight text-foreground uppercase mb-6">
              Ready to Scale Your Creative?
            </h2>
            <p className="text-lg text-coolgray leading-relaxed mb-10 max-w-lg">
              Tell us what you're launching. We'll reply with a plan, timeline, 
              and creator match—within 24 hours.
            </p>

            {/* Contact Info */}
            <div className="space-y-4">
              <a
                href="mailto:hello@ugclab.studio"
                className="flex items-center gap-3 text-foreground hover:text-lime transition-colors group"
              >
                <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center group-hover:border-lime/30 transition-colors">
                  <Mail size={18} />
                </div>
                <span className="font-medium">hello@ugclab.studio</span>
                <ArrowUpRight size={16} className="opacity-0 group-hover:opacity-100 transition-opacity" />
              </a>
            </div>
          </div>

          {/* Right Column - Form */}
          <div
            ref={formRef}
            className="lg:w-[55%]"
          >
            <form
              onSubmit={handleSubmit}
              className="p-6 lg:p-8 rounded-[32px] border border-white/[0.06] bg-midnight-light/50 backdrop-blur-sm"
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-medium text-coolgray mb-2">
                    Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-foreground placeholder:text-coolgray/50 focus:outline-none focus:border-lime/50 focus:ring-1 focus:ring-lime/50 transition-all"
                    placeholder="Your name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-coolgray mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-foreground placeholder:text-coolgray/50 focus:outline-none focus:border-lime/50 focus:ring-1 focus:ring-lime/50 transition-all"
                    placeholder="you@company.com"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-coolgray mb-2">
                    Brand
                  </label>
                  <input
                    type="text"
                    name="brand"
                    value={formData.brand}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-foreground placeholder:text-coolgray/50 focus:outline-none focus:border-lime/50 focus:ring-1 focus:ring-lime/50 transition-all"
                    placeholder="Brand name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-coolgray mb-2">
                    Website
                  </label>
                  <input
                    type="url"
                    name="website"
                    value={formData.website}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-foreground placeholder:text-coolgray/50 focus:outline-none focus:border-lime/50 focus:ring-1 focus:ring-lime/50 transition-all"
                    placeholder="https://..."
                  />
                </div>
              </div>
              <div className="mt-5">
                <label className="block text-sm font-medium text-coolgray mb-2">
                  Message
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={4}
                  className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-foreground placeholder:text-coolgray/50 focus:outline-none focus:border-lime/50 focus:ring-1 focus:ring-lime/50 transition-all resize-none"
                  placeholder="Tell us about your project, goals, and timeline..."
                />
              </div>
              <button
                type="submit"
                className="mt-6 w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-4 bg-lime text-midnight font-semibold rounded-full hover:shadow-glow transition-all duration-300 hover:-translate-y-0.5"
              >
                Send Inquiry
                <Send size={18} />
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer
        ref={footerRef}
        className="mt-[8vh] border-t border-white/[0.06]"
      >
        <div className="px-6 lg:px-[6vw] py-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            {/* Logo */}
            <a
              href="#"
              className="font-display font-bold text-xl text-foreground hover:text-lime transition-colors"
            >
              UGC LAB
            </a>

            {/* Links */}
            <nav className="flex items-center gap-6">
              <a href="#" className="text-sm text-coolgray hover:text-foreground transition-colors">
                Privacy
              </a>
              <a href="#" className="text-sm text-coolgray hover:text-foreground transition-colors">
                Terms
              </a>
            </nav>

            {/* Social */}
            <div className="flex items-center gap-4">
              <a
                href="#"
                className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-coolgray hover:text-foreground hover:border-white/20 transition-all"
              >
                <Instagram size={18} />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-coolgray hover:text-foreground hover:border-white/20 transition-all"
              >
                <Linkedin size={18} />
              </a>
            </div>
          </div>

          {/* Copyright */}
          <div className="mt-8 pt-6 border-t border-white/[0.04] text-center">
            <p className="text-sm text-coolgray/60">
              © {new Date().getFullYear()} UGC Lab. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </section>
  );
}
