import React, { useEffect, useRef } from 'react';
import Hls from 'hls.js';

function useHlsPlayer(streamUrl: string) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const hlsRef = useRef<Hls | null>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    if (Hls.isSupported()) {
      const hls = new Hls({ autoStartLoad: true, maxBufferLength: 30 });
      hls.loadSource(streamUrl);
      hls.attachMedia(video);
      hlsRef.current = hls;
      hls.on(Hls.Events.MANIFEST_PARSED, () => {
        video.play().catch(() => {});
      });
    } else if (video.canPlayType('application/vnd.apple.mpegurl')) {
      video.src = streamUrl;
      video.play().catch(() => {});
    }

    return () => {
      if (hlsRef.current) {
        hlsRef.current.destroy();
        hlsRef.current = null;
      }
    };
  }, [streamUrl]);

  return videoRef;
}

const streamUrl = "https://stream.mux.com/Aa02T7oM1wH5Mk5EEVDYhbZ1ChcdhRsS2m1NYyx4Ua1g.m3u8";

const socialLinks = [
  { name: "GitHub", href: "https://github.com/pranaya-20" },
  { name: "LinkedIn", href: "https://linkedin.com/in/pranaya-subramani" },
  { name: "Resume", href: "/resume.pdf" } // Local PDF placeholder, easily swappable
];

export const ContactFooter: React.FC = () => {
  const videoRef = useHlsPlayer(streamUrl);

  return (
    <footer id="contact" className="relative bg-bg min-h-[100dvh] flex flex-col pt-16 md:pt-20 pb-8 md:pb-12 overflow-hidden">
      {/* Background Video Layer */}
      <div className="absolute inset-0 z-0 scale-y-[-1]">
        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          aria-hidden="true"
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 min-w-full min-h-full object-cover opacity-50"
        />
        <div className="absolute inset-0 bg-black/60" />
      </div>

      {/* Surface Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-bg via-surface/80 to-bg -z-[1]" />

      {/* Main CTA Section */}
      <div className="relative z-10 flex flex-col items-center text-center py-12 sm:py-16 md:py-24 px-5 sm:px-6 flex-1 justify-center">
        <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-display italic text-text-primary mb-4 sm:mb-6 leading-tight">
          Let's create something <span className="font-display italic">together</span>
        </h2>
        <p className="text-sm sm:text-base text-muted max-w-lg mb-8 sm:mb-10 font-body">
          Open to NLP, Computer Vision, and Generative AI collaborations or full-time opportunities.
        </p>
        <a
          href="mailto:pranayadanya@gmail.com"
          className="group relative rounded-full text-xs sm:text-sm px-5 sm:px-7 py-3 sm:py-3.5 bg-text-primary text-bg hover:bg-bg hover:text-text-primary transition-all duration-300 hover:scale-105 break-all text-center font-semibold"
        >
          <span className="absolute inset-[-2px] rounded-full opacity-0 group-hover:opacity-100 accent-gradient transition-opacity duration-300 z-[-1]" />
          pranayadanya@gmail.com
        </a>
      </div>

      {/* Footer Links & Status Bar */}
      <div className="relative z-10 max-w-[1200px] mx-auto w-full px-5 sm:px-6 md:px-10 lg:px-16 pt-6 sm:pt-8 mt-auto border-t border-stroke/20">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-4 pb-2">
          {/* Social Profiles */}
          <div className="flex items-center gap-4 sm:gap-6 flex-wrap justify-center font-body">
            {socialLinks.map(({ name, href }) => (
              <a
                key={name}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs sm:text-sm text-muted hover:text-text-primary transition-colors duration-200"
              >
                {name}
              </a>
            ))}
          </div>

          {/* Availability Status */}
          <div className="flex items-center gap-2">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500" />
            </span>
            <span className="text-xs sm:text-sm text-muted font-body">Available for projects</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
