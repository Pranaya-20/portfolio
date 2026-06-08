import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Lightbox } from '../components/Lightbox';
import { cn } from '../utils/cn';

interface ExperienceCardData {
  type: 'experience' | 'achievement';
  role: string;
  company: string;
  period: string;
  tags: string[];
  image: string;
  description: string;
}

const experienceList: ExperienceCardData[] = [
  {
    type: 'experience',
    role: 'Vice Chair, ACM-W',
    company: 'KARE ACM-W Chapter',
    period: '2024 – 2025',
    tags: ['Leadership', 'Workshops', 'Outreach'],
    image: '/images/ACM_W.png',
    description: 'Led the ACM Women in Computing chapter. Organized technical workshops, Guest lectures, and community outreach. Managed event coordination and workload allocations.',
  },
  {
    type: 'experience',
    role: 'Published IEEE Researcher',
    company: 'IEEE AIMLA & ICCRTEE',
    period: '2025 – 2026',
    tags: ['IEEE', 'Publications', 'XAI'],
    image: '/images/IEEE.png',
    description: 'Published peer-reviewed research on high-fidelity carbon quantification (YOLOv8 + ZoE-Depth) and vehicle confirmation passing networks (Augmentations + Gradio) in IEEE proceedings.',
  },
  {
    type: 'achievement',
    role: 'Hackathon Runner-up',
    company: 'HACKARE 2.0',
    period: '2024',
    tags: ['ML', 'FastAPI', 'AWS Amplify'],
    image: '/images/hackathon.png',
    description: 'Co-built a personalized educational application for under-resourced schools within a highly competitive time limit. Implemented core ML features.',
  },
  {
    type: 'achievement',
    role: 'AWS & Google AI Certified',
    company: 'AWS / Coursera / HCL',
    period: '2024 – 2025',
    tags: ['AWS ML', 'Google AI', 'Figma'],
    image: '/images/AWS_Google.png',
    description: 'Certified in AWS ML Terminology & Process, Google AI Essentials (Coursera), and Figma Framework (GUVI/HCL) for UX layouts.',
  },
  {
    type: 'experience',
    role: 'Vision & ViT Researcher',
    company: 'Deep Learning Cluster',
    period: '2025',
    tags: ['PyTorch', 'ViT', 'Grad-CAM'],
    image: '/images/ham10000_architecture.png',
    description: 'Formulated skin lesion diagnosis overlays on 10,015 images using ViT-B/16 and Grad-CAM, addressing black-box healthcare opacity.',
  },
  {
    type: 'experience',
    role: 'Tree Metric Investigator',
    company: 'KARE CSE Labs',
    period: '2026',
    tags: ['YOLOv8', 'ZoE-Depth', 'SageMaker'],
    image: '/images/greencalc_workflow.png',
    description: 'Constructed an automated species classification and 3D Metric Depth estimation network, achieving sub-3s latency on serverless AWS structures.',
  },
];

const cardsDesktopOrder = [4, 3, 0, 2, 1, 5]; // Order of columns displayed on desktop
const sortedExperiences = cardsDesktopOrder.map((idx) => experienceList[idx]);

const cardsMetadata = [
  { heightRatio: 0.65 },
  { heightRatio: 0.8 },
  { heightRatio: 1.0 },
  { heightRatio: 1.0 },
  { heightRatio: 0.8 },
  { heightRatio: 0.65 },
];

const staggerRaiseStepsDown = [
  [2, 3], // Step 1: Raise middle cards (GDG/ACM-W & HACKARE)
  [1, 4], // Step 2: Raise intermediate cards (AWS & IEEE Publications)
  [0, 5], // Step 3: Raise outer cards (MAGIC Research & GreenCalc)
];

const staggerRaiseStepsUp = [
  [0, 5],
  [1, 4],
  [2, 3],
];

interface CardItemProps {
  card: ExperienceCardData;
  isCenter: boolean;
  onImageClick: (img: string) => void;
  active: boolean;
}

const CardItem: React.FC<CardItemProps> = ({ card, isCenter, onImageClick, active }) => {
  const imageSizePercent = active ? 35 : 72;
  const contentSizePercent = active ? 65 : 28;

  return (
    <div className="relative w-full h-full flex flex-col">
      {/* Card Cover Image */}
      <div
        className="bg-white w-full flex items-center justify-center flex-shrink-0 overflow-hidden cursor-zoom-in rounded-t-xl"
        style={{
          height: `${imageSizePercent}%`,
          transition: 'height 0.45s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
        }}
        onClick={() => onImageClick(card.image)}
      >
        <img
          src={card.image}
          alt={card.role}
          draggable={false}
          className="w-full h-full object-contain p-3 select-none pointer-events-none"
        />
      </div>

      {/* Description Content Box */}
      <div
        className="bg-surface w-full flex flex-col justify-between rounded-tl-2xl rounded-tr-2xl -mt-4"
        style={{
          height: `${contentSizePercent}%`,
          transition: 'height 0.45s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
          padding: '14px 12px 10px',
          position: 'relative',
          zIndex: 1,
        }}
      >
        <span
          className={cn(
            'self-start font-body font-semibold uppercase tracking-[0.15em] rounded-full border px-2 py-0.5 mb-1 whitespace-nowrap flex-shrink-0',
            isCenter ? 'text-[8px]' : 'text-[7px]',
            card.type === 'achievement'
              ? 'bg-amber-400/15 border-amber-400/35 text-amber-300'
              : 'bg-white/10 border-white/20 text-white/60'
          )}
        >
          {card.type === 'achievement' ? '✦ Achievement' : '● Experience'}
        </span>

        <div className="flex-shrink-0">
          <h3
            className="font-display italic text-white leading-[0.95] mb-0.5"
            style={{ fontSize: isCenter ? 'clamp(13px, 1.6vw, 22px)' : 'clamp(11px, 1.2vw, 17px)' }}
          >
            {card.role}
          </h3>
          <p
            className="font-body text-white/50 tracking-wide leading-tight truncate"
            style={{ fontSize: isCenter ? '10px' : '8px' }}
          >
            {card.company}
          </p>
        </div>

        {/* Transition revealed block elements */}
        <div
          className="flex flex-col gap-1.5 overflow-hidden"
          style={{
            opacity: active ? 1 : 0,
            transform: active ? 'translateY(0)' : 'translateY(8px)',
            transition: 'opacity 0.3s ease 0.1s, transform 0.3s ease 0.1s',
            flexShrink: 0,
          }}
        >
          <p
            className="font-body text-white/60 leading-relaxed"
            style={{ fontSize: isCenter ? '10px' : '9px' }}
          >
            {card.description}
          </p>
          <div className="flex items-center gap-1.5">
            <span className="w-1 h-1 rounded-full bg-emerald-400 flex-shrink-0" />
            <span className="font-body text-[9px] text-white/40">{card.period}</span>
          </div>
          <div className="flex flex-wrap gap-1">
            {card.tags.map((tag) => (
              <span
                key={tag}
                className="font-body text-[7px] uppercase tracking-wider text-white/40 border border-white/10 rounded-full px-1.5 py-0.5 bg-white/5"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

// Desktop view component: raises cards stagger-by-stagger on scroll wheel
const ExperienceDesktop: React.FC<{ onImageClick: (img: string) => void }> = ({ onImageClick }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [raisedCardIndices, setRaisedCardIndices] = useState<number[]>([]);
  const scrollTracker = useRef({
    step: -1,
    locked: false,
    cooldown: false,
    seenAll: false,
    dir: 'down',
  });

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const handleWheel = (e: WheelEvent) => {
      const rect = el.getBoundingClientRect();
      const state = scrollTracker.current;

      // Reset states if scrolling far away
      if (rect.top > window.innerHeight) {
        state.locked = false;
        state.seenAll = false;
        state.step = -1;
        setRaisedCardIndices([]);
        return;
      }
      if (rect.bottom < 0) {
        state.locked = false;
        state.step = -1;
        setRaisedCardIndices([]);
        return;
      }

      // Check if section is centered in viewport
      const isCentered = rect.top < window.innerHeight * 0.5 && rect.bottom > window.innerHeight * 0.5;

      if (!state.locked && e.deltaY > 0 && isCentered && !state.seenAll) {
        state.locked = true;
        state.dir = 'down';
        state.step = 0;
        state.cooldown = true;
        setTimeout(() => {
          state.cooldown = false;
        }, 700);

        setRaisedCardIndices(staggerRaiseStepsDown[0]);
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        e.preventDefault();
        return;
      }

      if (!state.locked && e.deltaY < 0 && isCentered && state.seenAll) {
        state.locked = true;
        state.dir = 'up';
        state.step = 0;
        state.cooldown = true;
        setTimeout(() => {
          state.cooldown = false;
        }, 700);

        setRaisedCardIndices(staggerRaiseStepsUp[0]);
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        e.preventDefault();
        return;
      }

      if (!state.locked) return;

      e.preventDefault();
      if (state.cooldown) return;

      state.cooldown = true;
      setTimeout(() => {
        state.cooldown = false;
      }, 700);

      const targetStepsList = state.dir === 'down' ? staggerRaiseStepsDown : staggerRaiseStepsUp;
      const nextStepIdx = state.step + 1;

      if (nextStepIdx < targetStepsList.length) {
        state.step = nextStepIdx;
        setRaisedCardIndices(targetStepsList[nextStepIdx]);
      } else {
        state.locked = false;
        state.seenAll = state.dir === 'down';
        setRaisedCardIndices([]);
      }
    };

    window.addEventListener('wheel', handleWheel, { passive: false });
    return () => window.removeEventListener('wheel', handleWheel);
  }, []);

  return (
    <div ref={containerRef}>
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 pb-14">
        <p className="text-xs uppercase tracking-[0.3em] text-muted mb-2 font-semibold">Career & Wins</p>
        <h2 className="font-black text-[clamp(2rem,6vw,5rem)] leading-none uppercase tracking-tight text-text-primary">
          Experience &{' '}
          <span className="font-display italic font-normal normal-case">Achievements</span>
        </h2>
      </div>

      <div className="w-screen relative left-1/2 -translate-x-1/2 flex items-end px-[10%] select-none">
        {sortedExperiences.map((card, idx) => {
          const isCenterCard = idx === 2 || idx === 3;
          const isCardRaised = raisedCardIndices.includes(idx);
          const ratio = cardsMetadata[idx];

          return (
            <div
              key={idx}
              className={cn(
                'relative flex-shrink-0 flex flex-col transition-transform duration-500',
                isCardRaised ? '-translate-y-4 z-20' : isCenterCard ? 'z-10' : 'z-0'
              )}
              style={{
                width: isCenterCard ? '18%' : '16%',
                height: `calc(42vw * ${ratio.heightRatio})`,
                maxHeight: `calc(520px * ${ratio.heightRatio})`,
              }}
            >
              <CardItem
                card={card}
                isCenter={isCenterCard}
                onImageClick={onImageClick}
                active={isCardRaised}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};

// Mobile slider view: renders experiences in Swipe-able deck cards
const ExperienceMobile: React.FC<{ onImageClick: (img: string) => void }> = ({ onImageClick }) => {
  const [activeCardIdx, setActiveCardIdx] = useState(0);
  const [sliderOpen, setSliderOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const activeIdxRef = useRef(0);
  const blockTouchRef = useRef(false);

  const totalCards = sortedExperiences.length;

  const navigateToCard = useCallback(
    (idx: number) => {
      const clampedIdx = Math.max(0, Math.min(totalCards - 1, idx));
      activeIdxRef.current = clampedIdx;
      setActiveCardIdx(clampedIdx);
    },
    [totalCards]
  );

  const closeSlider = useCallback(
    (direction?: 'up' | 'down') => {
      setSliderOpen(false);
      document.body.style.overflow = '';

      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        const yOffset = direction === 'down' ? rect.bottom + window.scrollY : rect.top + window.scrollY;
        window.scrollTo({
          top: direction === 'down' ? yOffset + 10 : yOffset - 10,
          behavior: 'smooth',
        });
      }
    },
    []
  );

  // Swipe touch controller
  const touchInfo = useRef({ x: 0, y: 0, axis: '' });

  useEffect(() => {
    if (!sliderOpen) return;

    const onTouchStart = (e: TouchEvent) => {
      touchInfo.current = {
        x: e.touches[0].clientX,
        y: e.touches[0].clientY,
        axis: '',
      };
    };

    const onTouchMove = (e: TouchEvent) => {
      const diffX = e.touches[0].clientX - touchInfo.current.x;
      const diffY = e.touches[0].clientY - touchInfo.current.y;
      if (!touchInfo.current.axis && (Math.abs(diffX) > 6 || Math.abs(diffY) > 6)) {
        touchInfo.current.axis = Math.abs(diffX) >= Math.abs(diffY) ? 'h' : 'v';
      }
      if (touchInfo.current.axis === 'h') {
        e.preventDefault();
      }
    };

    const onTouchEnd = (e: TouchEvent) => {
      const diffX = e.changedTouches[0].clientX - touchInfo.current.x;
      const diffY = e.changedTouches[0].clientY - touchInfo.current.y;
      const absX = Math.abs(diffX);
      const absY = Math.abs(diffY);

      if (absX < 15 && absY < 15) return;

      if (touchInfo.current.axis === 'h' && absX > 30) {
        navigateToCard(activeIdxRef.current + (diffX < 0 ? 1 : -1));
        return;
      }

      if (touchInfo.current.axis === 'v' && absY > 30) {
        if (blockTouchRef.current) return;
        const scrollDir = diffY < 0 ? 'down' : 'up';
        if (scrollDir === 'down') {
          if (activeIdxRef.current < totalCards - 1) {
            blockTouchRef.current = true;
            setTimeout(() => {
              blockTouchRef.current = false;
            }, 400);
            navigateToCard(activeIdxRef.current + 1);
          } else {
            closeSlider('down');
          }
        } else {
          if (activeIdxRef.current > 0) {
            blockTouchRef.current = true;
            setTimeout(() => {
              blockTouchRef.current = false;
            }, 400);
            navigateToCard(activeIdxRef.current - 1);
          } else {
            closeSlider('up');
          }
        }
      }
    };

    document.addEventListener('touchstart', onTouchStart, { passive: true });
    document.addEventListener('touchmove', onTouchMove, { passive: false });
    document.addEventListener('touchend', onTouchEnd, { passive: true });

    return () => {
      document.removeEventListener('touchstart', onTouchStart);
      document.removeEventListener('touchmove', onTouchMove);
      document.removeEventListener('touchend', onTouchEnd);
    };
  }, [sliderOpen, navigateToCard, closeSlider, totalCards]);

  // Calculations for 3D card deck transforms
  const computeCardStyles = (relativeIdx: number) => {
    const absIdx = Math.abs(relativeIdx);
    const sign = Math.sign(relativeIdx);

    return {
      scale: Math.max(0.55, 1 - absIdx * 0.15),
      rotateY: sign * absIdx * 22,
      translateX: sign * absIdx * 68,
      translateZ: Math.max(0, 80 - absIdx * 40),
      opacity: Math.max(0.55, 1 - absIdx * 0.15),
      zIndex: 10 - absIdx,
    };
  };

  const activeCard = sortedExperiences[activeCardIdx];

  return (
    <>
      <div ref={containerRef} className="px-6 py-12 flex flex-col items-center gap-4">
        <div className="w-full">
          <p className="text-[10px] uppercase tracking-[0.3em] text-muted mb-1 font-semibold">Career & Wins</p>
          <h2 className="font-black text-[clamp(1.7rem,8vw,2.6rem)] leading-none uppercase tracking-tight text-text-primary">
            Experience &{' '}
            <span className="font-display italic font-normal normal-case">Achievements</span>
          </h2>
        </div>
        <button
          onClick={() => {
            setSliderOpen(true);
            document.body.style.overflow = 'hidden';
          }}
          className="mt-2 px-5 py-2.5 rounded-full border border-white/20 bg-surface text-text-primary font-body text-sm hover:bg-stroke transition-colors cursor-pointer"
        >
          Explore →
        </button>
      </div>

      {sliderOpen && (
        <div className="fixed inset-0 bg-bg z-[60] flex flex-col" style={{ touchAction: 'none' }}>
          {/* Header */}
          <div className="px-5 pt-10 pb-2 flex items-start justify-between flex-shrink-0">
            <div>
              <p className="text-[10px] uppercase tracking-[0.3em] text-muted mb-1 font-semibold">Career & Wins</p>
              <h2 className="font-black text-[clamp(1.4rem,6vw,2.2rem)] leading-none uppercase tracking-tight text-text-primary">
                Experience &{' '}
                <span className="font-display italic font-normal normal-case">Achievements</span>
              </h2>
            </div>
            <button
              onClick={() => closeSlider()}
              className="w-8 h-8 rounded-full border border-white/20 bg-surface flex items-center justify-center text-muted flex-shrink-0 mt-1 cursor-pointer"
              aria-label="Close"
            >
              <svg width="12" height="12" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* 3D Stack Slider Viewport */}
          <div
            className="relative flex-1 flex items-end justify-center min-h-0"
            style={{ perspective: '900px', perspectiveOrigin: '50% 100%' }}
          >
            {sortedExperiences.map((card, idx) => {
              const diff = idx - activeCardIdx;
              const transformStyles = computeCardStyles(diff);
              const isActive = idx === activeCardIdx;
              const cardHeight = Math.round(250 * (isActive ? 1 : Math.max(0.58, 1 - Math.abs(diff) * 0.14)));

              return (
                <div
                  key={idx}
                  onClick={() => !isActive && navigateToCard(idx)}
                  style={{
                    position: 'absolute',
                    bottom: 0,
                    width: '165px',
                    height: `${cardHeight}px`,
                    transform: `translateX(${transformStyles.translateX}px) translateZ(${transformStyles.translateZ}px) rotateY(${transformStyles.rotateY}deg) scale(${transformStyles.scale})`,
                    transformOrigin: 'bottom center',
                    opacity: transformStyles.opacity,
                    zIndex: transformStyles.zIndex,
                    transition: 'all 0.45s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
                    cursor: isActive ? 'default' : 'pointer',
                  }}
                >
                  <div
                    className={cn(
                      'relative w-full h-full rounded-[6px] overflow-hidden flex flex-col',
                      isActive ? 'shadow-[0_20px_50px_rgba(0,0,0,0.8)]' : 'shadow-[0_6px_20px_rgba(0,0,0,0.5)]'
                    )}
                  >
                    {/* Cover image part */}
                    <div
                      className="bg-white w-full flex items-center justify-center flex-shrink-0"
                      style={{ height: '62%' }}
                      onClick={(e) => {
                        e.stopPropagation();
                        if (isActive) onImageClick(card.image);
                      }}
                    >
                      <img
                        src={card.image}
                        alt={card.role}
                        draggable={false}
                        className="w-full h-full object-contain p-3 select-none pointer-events-none"
                      />
                    </div>
                    {/* Card Detail part */}
                    <div className="bg-surface flex-1 flex flex-col justify-between p-2.5 rounded-tl-2xl rounded-tr-2xl -mt-3 relative z-10">
                      <span
                        className={cn(
                          'self-start text-[7px] uppercase tracking-[0.15em] font-body font-semibold px-2 py-0.5 rounded-full border whitespace-nowrap',
                          card.type === 'achievement'
                            ? 'bg-amber-400/15 border-amber-400/35 text-amber-300'
                            : 'bg-white/10 border-white/20 text-white/60'
                        )}
                      >
                        {card.type === 'achievement' ? '✦ Achievement' : '● Experience'}
                      </span>
                      <div>
                        <h3 className="font-display italic text-white text-sm leading-tight mb-0.5">{card.role}</h3>
                        <p className="font-body text-[9px] text-white/50 truncate">{card.company}</p>
                        {isActive && (
                          <div className="flex items-center gap-1 mt-1">
                            <span className="w-1 h-1 rounded-full bg-emerald-400 flex-shrink-0" />
                            <span className="font-body text-[8px] text-white/40">{card.period}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Description details at bottom */}
          <div className="px-5 py-3 flex-shrink-0">
            <p className="font-body text-[11px] text-text-primary leading-relaxed bg-surface border border-white/10 rounded-xl px-4 py-3 min-h-[64px] flex items-center justify-center text-center">
              {activeCard.description}
            </p>
          </div>

          {/* Buttons Navigation Indicators */}
          <div className="flex flex-col items-center gap-2 pb-6 flex-shrink-0">
            <div className="flex gap-1.5">
              {sortedExperiences.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => navigateToCard(idx)}
                  className={cn(
                    'h-1.5 rounded-full transition-all duration-300 cursor-pointer',
                    idx === activeCardIdx ? 'bg-text-primary w-5' : 'bg-muted/35 w-1.5'
                  )}
                  aria-label={`Card ${idx + 1}`}
                />
              ))}
            </div>
            <p className="text-[9px] uppercase tracking-[0.15em] text-muted/50 select-none">
              Swipe up/down · left/right to navigate
            </p>
          </div>
        </div>
      )}
    </>
  );
};

export const Experience: React.FC = () => {
  const [lightboxImg, setLightboxImg] = useState<string | null>(null);

  return (
    <section id="experience" className="bg-bg sm:py-24 overflow-hidden border-t border-stroke/20">
      {/* Desktop view */}
      <div className="hidden md:block">
        <ExperienceDesktop onImageClick={setLightboxImg} />
      </div>

      {/* Mobile view */}
      <div className="md:hidden">
        <ExperienceMobile onImageClick={setLightboxImg} />
      </div>

      {/* Lightbox zoomed details */}
      <Lightbox image={lightboxImg} onClose={() => setLightboxImg(null)} />
    </section>
  );
};
