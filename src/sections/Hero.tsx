import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { CTAButtons } from '../components/CTAButtons';

const roleDefault = ['AI & ML Engineer', 'AWS Cloud Developer'];

interface HeroProps {
  isLoading: boolean;
}

export const Hero: React.FC<HeroProps> = ({ isLoading }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  // Entrance animations on loading complete
  useEffect(() => {
    if (isLoading) return;
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });
      tl.to('.hero-greeting', { opacity: 1, y: 0, duration: 1.2, delay: 0.1 });
      tl.to('.hero-fade', { opacity: 1, y: 0, filter: 'blur(0px)', duration: 1, stagger: 0.12 }, 0.3);
      tl.to('.hero-image', { opacity: 1, scale: 1, duration: 1.4, ease: 'power2.out' }, 0.1);
    }, containerRef);

    return () => ctx.revert();
  }, [isLoading]);

  const RoleHeader: React.FC<{ containerClass: string }> = ({ containerClass }) => {
    return (
      <h2 className={containerClass}>
        {roleDefault.map((text, idx) => (
          <span key={idx} className="block">
            {text}
          </span>
        ))}
      </h2>
    );
  };

  return (
    <section
      id="hero"
      ref={containerRef}
      className="relative w-full min-h-[100dvh] bg-bg overflow-hidden flex flex-col justify-between"
    >
      {/* Background soft glowing blur */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_70%_at_50%_40%,rgba(217,119,6,0.07)_0%,transparent_70%)] pointer-events-none" />

      <div className="relative z-10 flex flex-col flex-1 justify-center">
        {/* Hey, there Header */}
        <div className="relative h-[38vh] sm:h-[50vh] flex items-start justify-center pt-20 sm:pt-14 md:pt-24 select-none">
          <span className="hero-greeting opacity-0 translate-y-8 font-display italic text-[clamp(2.8rem,9vw,9.5rem)] leading-none text-text-primary z-0 whitespace-nowrap px-4 text-center">
            Hey,&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;there
          </span>

          {/* Photo Frame Container */}
          <div className="absolute top-[60px] sm:top-[80px] left-1/2 -translate-x-1/2 z-30 w-[clamp(160px,38vw,480px)] select-none">
            {/* Default Face */}
            <img
              src="/me/my_image_banner.png"
              alt="S.J. Pranaya"
              className="hero-image opacity-0 scale-95 w-full object-contain drop-shadow-2xl select-none"
            />
          </div>
        </div>

        {/* Lower Hero details */}
        <div className="relative z-40 mt-[-40px] sm:mt-[-50px] md:mt-[-70px] px-6 sm:px-12 pb-16 pt-4">
          {/* Mobile Layout */}
          <div className="flex flex-col gap-6 sm:hidden">
            <div className="hero-fade opacity-0 translate-y-4 blur-sm">
              <p className="text-[0.6rem] uppercase tracking-[0.25em] text-muted mb-1 font-semibold">I am</p>
              <h1 className="font-body font-black text-[clamp(1.8rem,10vw,3.5rem)] leading-[0.88] tracking-tight text-text-primary uppercase">
                S.J.
                <br />
                Pranaya
              </h1>
            </div>

            <div className="hero-fade opacity-0 translate-y-4 blur-sm">
              <CTAButtons
                primaryText="See Works"
                primaryHref="#projects"
                secondaryText="Reach out"
                secondaryHref="#contact"
              />
            </div>

            <div className="hero-fade opacity-0 translate-y-4 blur-sm flex flex-col items-end gap-2 text-right mt-1">
              <RoleHeader containerClass="font-body font-black text-[clamp(1.2rem,6vw,2.2rem)] leading-[1.0] tracking-tight text-text-primary uppercase text-right" />
            </div>
          </div>

          {/* Desktop Layout */}
          <div className="hidden sm:flex flex-row items-end justify-between gap-4">
            <div className="flex flex-col gap-4">
              <div className="hero-fade opacity-0 translate-y-4 blur-sm">
                <p className="text-[clamp(0.6rem,1.2vw,0.85rem)] uppercase tracking-[0.25em] text-muted mb-1 font-semibold">I am</p>
                <h1 className="font-body font-black text-[clamp(2rem,7vw,7rem)] leading-[0.88] tracking-tight text-text-primary uppercase">
                  S.J.
                  <br />
                  Pranaya
                </h1>
              </div>
              <div className="hero-fade opacity-0 translate-y-4 blur-sm">
                <CTAButtons
                  primaryText="See Works"
                  primaryHref="#projects"
                  secondaryText="Reach out"
                  secondaryHref="#contact"
                />
              </div>
            </div>

            <div className="flex flex-col items-end gap-4 text-right flex-shrink-0">
              <div className="hero-fade opacity-0 translate-y-4 blur-sm">
                <RoleHeader containerClass="font-body font-black text-[clamp(1.8rem,4.5vw,4rem)] leading-[1.0] tracking-tight text-text-primary uppercase text-right" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom soft gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-bg to-transparent z-30 pointer-events-none" />

      {/* Bottom Scroll Down indicator */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-40">
        <span className="text-xs text-muted uppercase tracking-[0.2em] font-semibold">Scroll</span>
        <div className="w-px h-8 bg-stroke overflow-hidden relative">
          <div className="absolute top-0 left-0 right-0 h-full bg-text-primary animate-scroll-down" />
        </div>
      </div>
    </section>
  );
};
