import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Lightbox } from '../components/Lightbox';

export const Recognition: React.FC = () => {
  const [lightboxImg, setLightboxImg] = useState<string | null>(null);

  return (
    <>
      <section
        id="recognition"
        className="relative bg-bg rounded-t-[24px] sm:rounded-t-[40px] md:rounded-t-[60px] px-6 sm:px-12 md:px-16 lg:px-20 py-16 sm:py-24 border-t border-stroke/20"
      >
        <div className="max-w-[1200px] mx-auto">
          {/* Header */}
          <div className="mb-10 md:mb-16">
            <p className="text-xs uppercase tracking-[0.3em] text-muted mb-2 font-semibold">Honors</p>
            <h2 className="font-black text-[clamp(2.5rem,6vw,5.5rem)] leading-none uppercase tracking-tight text-text-primary">
              Recognition
            </h2>
          </div>

          {/* Grid Layout */}
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
        </div>
      </section>

      {/* Lightbox Zoom portal */}
      <Lightbox image={lightboxImg} onClose={() => setLightboxImg(null)} />
    </>
  );
};
