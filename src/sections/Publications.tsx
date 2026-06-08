import React from 'react';
import { motion } from 'framer-motion';

interface Publication {
  title: string;
  description: string;
  venue: string;
  doi: string;
}

const publicationList: Publication[] = [
  {
    title: "High-Fidelity Carbon Footprint Quantification from a Single Image...",
    description: "Deployed end-to-end Computer Vision pipeline integrating YOLOv8 and ZoE-Depth to compute carbon sequestration from single 2D images. Published in IEEE proceedings.",
    venue: "IEEE AIMLA 2026",
    doi: "https://doi.org/10.1109/AIMLA67915.2026.11522305"
  },
  {
    title: "Vehicle Confirmation Passing Detection Using Data Augmentation and Gradio",
    description: "Engineered deep learning-based vehicle verification detection network leveraging heavy data augmentation policies and interactive Gradio inference portals.",
    venue: "IEEE ICCRTEE 2025",
    doi: "https://doi.org/10.1109/ICCRTEE64519.2025.11053115"
  }
];

export const Publications: React.FC = () => {
  return (
    <section id="publications" className="bg-bg py-16 md:py-24">
      <div className="max-w-[1200px] mx-auto px-6 md:px-10 lg:px-16">
        <div className="mb-10 md:mb-14">
          <p className="text-xs uppercase tracking-[0.3em] text-muted mb-3 font-semibold">Research</p>
          <h2 className="font-black text-[clamp(2.5rem,6vw,5.5rem)] leading-none uppercase tracking-tight text-text-primary animate-fade-in">
            Publications
          </h2>
        </div>

        <div className="flex flex-col gap-4">
          {publicationList.map((pub, idx) => (
            <motion.a
              key={pub.title}
              href={pub.doi}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: idx * 0.1, ease: [0.25, 0.1, 0.25, 1] }}
              viewport={{ once: false, margin: "-100px" }}
              className="flex items-center gap-3 sm:gap-6 p-3 sm:p-4 bg-surface/30 hover:bg-surface border border-stroke rounded-2xl sm:rounded-[40px] md:rounded-full transition-colors duration-300 cursor-pointer group"
            >
              <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-surface border border-stroke flex-shrink-0 flex flex-col items-center justify-center text-center px-1">
                <span className="text-[8px] sm:text-[9px] uppercase tracking-wider text-muted font-body font-bold leading-tight">
                  {pub.venue}
                </span>
              </div>

              <div className="flex-1 min-w-0 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 sm:gap-4">
                <div className="min-w-0">
                  <h3 className="font-display italic text-base sm:text-lg text-text-primary line-clamp-2 sm:truncate">
                    {pub.title}
                  </h3>
                  <p className="text-xs text-muted mt-0.5 line-clamp-1 hidden sm:block font-body">
                    {pub.description}
                  </p>
                </div>
              </div>

              <div className="hidden sm:flex flex-shrink-0 w-8 h-8 items-center justify-center rounded-full border border-stroke text-muted group-hover:bg-white group-hover:border-white group-hover:text-black transition-all duration-200">
                ↗
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
};
