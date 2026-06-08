import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const words = ['Code', 'Create', 'Inspire'];

interface LoadingScreenProps {
  onComplete: () => void;
}

export const LoadingScreen: React.FC<LoadingScreenProps> = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const startRef = useRef<number | null>(null);
  const requestRef = useRef<number | null>(null);
  const onCompleteCalled = useRef(false);

  const duration = 2500; // 2.5 seconds loading screen

  const animate = (timestamp: number) => {
    if (!startRef.current) startRef.current = timestamp;
    const elapsed = timestamp - startRef.current;
    const progressFraction = Math.min(elapsed / duration, 1);
    const progressPercent = Math.floor(progressFraction * 100);

    setProgress(progressPercent);

    if (progressFraction < 1) {
      requestRef.current = requestAnimationFrame(animate);
    } else if (!onCompleteCalled.current) {
      onCompleteCalled.current = true;
      setTimeout(() => {
        onComplete();
      }, 400); // Small pause at 100%
    }
  };

  useEffect(() => {
    requestRef.current = requestAnimationFrame(animate);
    return () => {
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
    };
  }, [onComplete]);

  // Determine current word index based on progress percent
  const currentWordIdx = Math.min(
    Math.floor((progress / 100) * words.length),
    words.length - 1
  );

  return (
    <motion.div
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="fixed inset-0 z-[9999] bg-bg flex flex-col justify-between p-8 md:p-16"
    >
      {/* Top Left Label */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="text-xs text-muted uppercase tracking-[0.3em] font-semibold"
      >
        Portfolio
      </motion.div>

      {/* Center Word Indicator */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-md">
        <AnimatePresence mode="wait">
          <motion.span
            key={currentWordIdx}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="text-4xl md:text-6xl lg:text-7xl font-display italic text-text-primary/80 block text-center select-none"
          >
            {words[currentWordIdx]}
          </motion.span>
        </AnimatePresence>
      </div>

      {/* Bottom Counter & Progress Bar */}
      <div className="flex flex-col gap-4 mt-auto">
        <div className="flex items-end justify-between">
          <div className="text-6xl md:text-8xl lg:text-9xl font-display text-text-primary tabular-nums tracking-tighter select-none">
            {String(progress).padStart(3, '0')}
          </div>
          <div className="text-xs text-muted uppercase tracking-wider mb-2 font-mono">
            Loading...
          </div>
        </div>

        {/* Custom Progress Bar */}
        <div className="w-full h-[3px] bg-stroke/30 rounded-full overflow-hidden relative">
          <div
            className="h-full accent-gradient transition-transform duration-100 ease-linear rounded-full"
            style={{
              transform: `scaleX(${progress / 100})`,
              transformOrigin: 'left',
              boxShadow: '0 0 8px rgba(217, 119, 6, 0.4)',
            }}
          />
        </div>
      </div>
    </motion.div>
  );
};
