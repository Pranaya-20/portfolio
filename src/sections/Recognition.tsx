import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Lightbox } from '../components/Lightbox';

const figmaImages = [
  '/images/figma_workshop1.jpg',
  '/images/figma_workshop2.jpg',
  '/images/figma_workshop3.jpg',
];

export const Recognition: React.FC = () => {
  const [lightboxImg, setLightboxImg] = useState<string | null>(null);
  const [figmaIdx, setFigmaIdx] = useState(0);

  const nextSlide = (e: React.MouseEvent) => {
    e.stopPropagation();
    setFigmaIdx((prev) => (prev + 1) % figmaImages.length);
  };

  const prevSlide = (e: React.MouseEvent) => {
    e.stopPropagation();
    setFigmaIdx((prev) => (prev - 1 + figmaImages.length) % figmaImages.length);
  };

  return (
    <>
      <section
        id="recognition"
        className="relative bg-bg rounded-t-[24px] sm:rounded-t-[40px] md:rounded-t-[60px] px-6 sm:px-12 md:px-16 lg:px-20 py-16 sm:py-24 border-t border-stroke/20"
      >
        <div className="max-w-[1200px] mx-auto flex flex-col gap-16 md:gap-24">
          {/* Header */}
          <div className="mb-2">
            <p className="text-xs uppercase tracking-[0.3em] text-muted mb-2 font-semibold">Honors & Activities</p>
            <h2 className="font-black text-[clamp(2.5rem,6vw,5.5rem)] leading-none uppercase tracking-tight text-text-primary">
              Recognition
            </h2>
          </div>

          {/* Block 1: Best Paper Award */}
          <div className="flex flex-col md:flex-row gap-8 md:gap-16 items-center">
            {/* Left Column: Premium Certificate Showcase */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.6 }}
              className="w-full md:w-1/2 flex justify-center"
            >
              <div
                onClick={() => setLightboxImg('/images/ieee_best_paper.png')}
                className="w-full max-w-[480px] rounded-[24px] sm:rounded-[36px] overflow-hidden bg-surface border border-stroke p-3 cursor-zoom-in group shadow-2xl hover:border-amber-500/30 transition-colors duration-500"
              >
                <div className="relative aspect-[3/4] w-full rounded-[16px] sm:rounded-[26px] overflow-hidden bg-white flex items-center justify-center">
                  <img
                    src="/images/ieee_best_paper.png"
                    alt="Best Paper Award Certificate"
                    className="w-full h-full object-contain p-2 select-none pointer-events-none group-hover:scale-103 transition-transform duration-700"
                  />
                  {/* Subtle hover glow layer */}
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-300 pointer-events-none" />
                </div>
              </div>
            </motion.div>

            {/* Right Column: Narrative Details */}
            <motion.div
              initial={{ opacity: 0, x: 35 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="w-full md:w-1/2 flex flex-col justify-center"
            >
              <div className="rounded-[24px] sm:rounded-[40px] bg-surface/50 border border-stroke p-6 sm:p-10 flex flex-col gap-6 backdrop-blur-md relative overflow-hidden">
                {/* Accent Amber Background Glow */}
                <div className="absolute -right-20 -top-20 w-48 h-48 rounded-full bg-amber-500/10 blur-[80px] pointer-events-none" />

                <div className="flex items-center gap-2">
                  <span className="w-6 h-px bg-amber-500" />
                  <p className="text-[10px] sm:text-xs uppercase tracking-[0.25em] text-amber-400 font-semibold">
                    Best Paper Award
                  </p>
                </div>

                <h3 className="font-display italic text-[clamp(1.6rem,3vw,2.8rem)] text-text-primary leading-tight">
                  IEEE Recognition for Best Paper &amp; Research Project
                </h3>

                <p className="font-body text-sm sm:text-base text-text-secondary leading-relaxed">
                  Honored with the **Best Paper Award** and recognition for an outstanding research project through the **R&amp;D Centre of Kalasalingam Academy of Research and Education**.
                </p>

                <div className="h-px bg-stroke/50 my-1" />

                <p className="font-body text-xs sm:text-sm text-muted leading-relaxed">
                  Given by **Krishhortus**, an eco-friendly startup incubated under **IIT Madras**, recognizing high-impact advancements in species-level carbon sequestration modeling and AI deployment.
                </p>
              </div>
            </motion.div>
          </div>

          {/* Block 2: Figma Peer Learning Session */}
          <div className="flex flex-col md:flex-row-reverse gap-8 md:gap-16 items-center">
            {/* Left Column: Figma Workshop Images Carousel */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.6 }}
              className="w-full md:w-1/2 flex justify-center"
            >
              <div
                onClick={() => setLightboxImg(figmaImages[figmaIdx])}
                className="w-full max-w-[480px] rounded-[24px] sm:rounded-[36px] overflow-hidden bg-surface border border-stroke p-3 cursor-zoom-in group shadow-2xl hover:border-amber-500/30 transition-colors duration-500 relative"
              >
                <div className="relative aspect-[4/3] w-full rounded-[16px] sm:rounded-[26px] overflow-hidden bg-black flex items-center justify-center">
                  <img
                    src={figmaImages[figmaIdx]}
                    alt={`Figma Learning Session image ${figmaIdx + 1}`}
                    className="w-full h-full object-cover select-none pointer-events-none group-hover:scale-102 transition-transform duration-700"
                  />

                  {/* Navigation Arrows */}
                  <button
                    onClick={prevSlide}
                    className="absolute left-4 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-black/60 hover:bg-black/90 border border-white/10 flex items-center justify-center text-white text-xs cursor-pointer z-30 transition-colors"
                    aria-label="Previous Slide"
                  >
                    ◀
                  </button>
                  <button
                    onClick={nextSlide}
                    className="absolute right-4 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-black/60 hover:bg-black/90 border border-white/10 flex items-center justify-center text-white text-xs cursor-pointer z-30 transition-colors"
                    aria-label="Next Slide"
                  >
                    ▶
                  </button>

                  {/* Dots indicator */}
                  <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-1.5 z-30">
                    {figmaImages.map((_, idx) => (
                      <button
                        key={idx}
                        onClick={(e) => {
                          e.stopPropagation();
                          setFigmaIdx(idx);
                        }}
                        className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
                          idx === figmaIdx ? 'bg-amber-400 w-4' : 'bg-white/40'
                        }`}
                        aria-label={`Go to slide ${idx + 1}`}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Right Column: Narrative Details */}
            <motion.div
              initial={{ opacity: 0, x: -35 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="w-full md:w-1/2 flex flex-col justify-center"
            >
              <div className="rounded-[24px] sm:rounded-[40px] bg-surface/50 border border-stroke p-6 sm:p-10 flex flex-col gap-5 backdrop-blur-md relative overflow-hidden">
                {/* Accent Amber Background Glow */}
                <div className="absolute -left-20 -top-20 w-48 h-48 rounded-full bg-amber-500/10 blur-[80px] pointer-events-none" />

                <div className="flex items-center gap-2">
                  <span className="w-6 h-px bg-amber-500" />
                  <p className="text-[10px] sm:text-xs uppercase tracking-[0.25em] text-amber-400 font-semibold">
                    Mentorship &amp; Workshops
                  </p>
                </div>

                <h3 className="font-display italic text-[clamp(1.6rem,3vw,2.8rem)] text-text-primary leading-tight">
                  Figma App Design Learning Session
                </h3>

                <p className="font-body text-sm sm:text-base text-text-secondary leading-relaxed">
                  Successfully conducted a **Peer-to-Peer Learning Session** on app design using the Figma platform on September 4th, 2024, hosting around **80+ highly engaged students**.
                </p>

                <div className="flex flex-col gap-2.5 my-1 text-xs sm:text-sm text-muted font-body">
                  <div className="flex items-start gap-2">
                    <span className="mt-1 flex-shrink-0">✏️</span>
                    <p>**Morning Session**: Recap of core UX design fundamentals, component patterns, and viewport frame layout design.</p>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="mt-1 flex-shrink-0">✏️</span>
                    <p>**Evening Session**: Hands-on interactive prototyping, defining user flows, transitions, and connection layouts.</p>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="mt-1 flex-shrink-0">✏️</span>
                    <p>**Hands-on Practice**: Provided students with 5 distinct app concept tracks to choose from and build their own live prototypes.</p>
                  </div>
                </div>

                <div className="h-px bg-stroke/50" />

                <p className="font-body text-xs sm:text-sm text-muted leading-relaxed italic">
                  &ldquo;Sharing knowledge is a way of caring.&rdquo; Co-hosted with a mentoring team of 6 members, under the complete support of the **KARE ACM-W Student Chapter**.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Lightbox Zoom portal */}
      <Lightbox image={lightboxImg} onClose={() => setLightboxImg(null)} />
    </>
  );
};
