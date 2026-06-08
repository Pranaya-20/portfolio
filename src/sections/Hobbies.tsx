import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Lightbox } from '../components/Lightbox';

gsap.registerPlugin(ScrollTrigger);

interface Hobby {
  image: string;
  rotation: number;
  offsetX: string;
  name: string;
  description: string;
}

const hobbiesList: Hobby[] = [
  {
    image: "/images/reading.png",
    rotation: -4,
    offsetX: "8%",
    name: "Reading",
    description: "Philosophy, sci-fi, and technical papers. INTJ fuel — ideas that challenge how I think about systems and people."
  },
  {
    image: "/images/fitness.png",
    rotation: 3,
    offsetX: "-12%",
    name: "Fitness",
    description: "Home training and cardio mirror discipline in code. Consistency over intensity — steady progress in workouts and commits."
  },
  {
    image: "/images/random_research.png",
    rotation: -2,
    offsetX: "15%",
    name: "Random Research",
    description: "Falling down rabbit holes at 2am — papers, Wikipedia spirals, and half-baked theories that sometimes become real projects."
  },
  {
    image: "/images/binge_watching.png",
    rotation: 5,
    offsetX: "-8%",
    name: "Binge Watching",
    description: "Sci-fi, thrillers, and the occasional documentary. Storytelling is just another form of architecture."
  },
  {
    image: "/images/solitude.png",
    rotation: -3,
    offsetX: "10%",
    name: "Solitude",
    description: "Long walks, quiet rooms, and uninterrupted thinking. The best ideas arrive when the noise stops."
  }
];

interface HobbyCardProps {
  item: Hobby;
  onClick: () => void;
  mobileToggle?: boolean;
  scrollDir?: 'up' | 'down' | null;
  index: number;
  isActive: boolean;
  setNode: (idx: number) => (el: HTMLDivElement | null) => void;
}

const HobbyCard: React.FC<HobbyCardProps> = ({
  item,
  onClick,
  mobileToggle = false,
  scrollDir = null,
  index,
  isActive,
  setNode,
}) => {
  const [hovered, setHovered] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  const yVariants = {
    hidden: (dir: 'up' | 'down' | null) => ({
      opacity: 0,
      y: dir === 'down' ? 24 : -24,
    }),
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.55,
        ease: [0.25, 0.1, 0.25, 1] as const,
      },
    },
  };

  const handleClick = () => {
    if (mobileToggle) {
      setHovered((prev) => !prev);
    } else {
      onClick();
    }
  };

  useEffect(() => {
    const register = setNode(index);
    register(cardRef.current);
    return () => register(null);
  }, [index, setNode]);

  useEffect(() => {
    setHovered(isActive);
  }, [isActive]);

  const activeOrHovered = isActive || hovered;

  return (
    <motion.div
      ref={cardRef}
      custom={scrollDir}
      variants={yVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: false, amount: 0.35, margin: "-100px" }}
      className="w-[85vw] h-[85vw] sm:w-[clamp(200px,28vw,420px)] sm:h-[clamp(200px,28vw,420px)] rounded-2xl sm:rounded-3xl overflow-hidden bg-surface border border-stroke relative pointer-events-auto cursor-pointer"
      onHoverStart={() => !mobileToggle && setHovered(true)}
      onHoverEnd={() => !mobileToggle && setHovered(false)}
      onClick={handleClick}
      style={{
        transform: `translateX(${item.offsetX}) rotate(${item.rotation}deg)`,
        transformOrigin: item.rotation > 0 ? 'bottom right' : 'bottom left',
      }}
    >
      <motion.img
        src={item.image}
        alt={item.name}
        animate={{
          scale: activeOrHovered ? 1.08 : 1,
          filter: activeOrHovered ? 'brightness(0.25)' : 'brightness(1)',
          opacity: 1,
        }}
        transition={{ duration: 0.35 }}
        className="w-full h-full object-cover"
      />
      <motion.div
        className="absolute bottom-0 left-0 right-0 px-4 pb-3 pt-12 bg-gradient-to-t from-black/80 to-transparent pointer-events-none"
        animate={{ opacity: activeOrHovered ? 0 : 1 }}
        transition={{ duration: 0.25 }}
      >
        <p className="font-display italic text-lg sm:text-xl text-white">{item.name}</p>
      </motion.div>
      <motion.div
        className="absolute inset-0 flex flex-col items-center justify-center px-5 text-center pointer-events-none"
        animate={{ opacity: activeOrHovered ? 1 : 0 }}
        transition={{ duration: 0.25 }}
      >
        <p className="font-display italic text-xl sm:text-2xl text-white mb-2">{item.name}</p>
        <p className="text-xs sm:text-sm text-white/75 leading-relaxed font-body">{item.description}</p>
      </motion.div>
    </motion.div>
  );
};

export const Hobbies: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const stickyTitleRef = useRef<HTMLDivElement>(null);
  const leftColRef = useRef<HTMLDivElement>(null);
  const rightColRef = useRef<HTMLDivElement>(null);

  const [lightboxImg, setLightboxImg] = useState<string | null>(null);
  const [isMobile, setIsMobile] = useState(() => window.innerWidth < 768);
  const [scrollDir, setScrollDir] = useState<'up' | 'down' | null>(null);
  const lastScrollY = useRef(window.scrollY || 0);

  // Monitor scroll direction on mobile
  useEffect(() => {
    if (!isMobile) return;
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const currentY = window.scrollY || 0;
          if (currentY > lastScrollY.current + 2) {
            setScrollDir("down");
          } else if (currentY < lastScrollY.current - 2) {
            setScrollDir("up");
          }
          lastScrollY.current = currentY;
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isMobile]);

  const leftHobbies = hobbiesList.filter((_, idx) => idx % 2 === 0);
  const rightHobbies = hobbiesList.filter((_, idx) => idx % 2 === 1);

  const nodesMap = useRef<Map<number, HTMLDivElement>>(new Map());
  const observer = useRef<IntersectionObserver | null>(null);
  const [activeCardIdx, setActiveCardIdx] = useState<number | null>(null);

  const setNode = (index: number) => (el: HTMLDivElement | null) => {
    if (el) {
      nodesMap.current.set(index, el);
      if (observer.current) observer.current.observe(el);
    } else {
      const node = nodesMap.current.get(index);
      if (node && observer.current) observer.current.unobserve(node);
      nodesMap.current.delete(index);
    }
  };

  // Mobile Intersection Observer setup
  useEffect(() => {
    if (!isMobile) return;
    const callback = (entries: IntersectionObserverEntry[]) => {
      const intersectionMap = new Map<number, number>();
      for (const entry of entries) {
        for (const [idx, node] of nodesMap.current.entries()) {
          if (node === entry.target) {
            intersectionMap.set(idx, entry.intersectionRatio);
            break;
          }
        }
      }
      let maxIdx: number | null = null;
      let maxRatio = 0;
      for (const [idx, ratio] of intersectionMap.entries()) {
        if (ratio > maxRatio) {
          maxRatio = ratio;
          maxIdx = idx;
        }
      }
      if (maxIdx !== null && maxRatio > 0.25) {
        setActiveCardIdx(maxIdx);
      } else {
        setActiveCardIdx(null);
      }
    };

    observer.current = new IntersectionObserver(callback, {
      threshold: [0, 0.25, 0.5, 0.75, 1],
    });

    for (const node of nodesMap.current.values()) {
      if (node) observer.current.observe(node);
    }

    return () => observer.current?.disconnect();
  }, [isMobile]);

  // Window resize handler
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // GSAP desktop parallax effect
  useEffect(() => {
    if (isMobile || !containerRef.current || !stickyTitleRef.current) return;
    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: containerRef.current,
        start: "top top",
        end: "bottom bottom",
        pin: stickyTitleRef.current,
        pinSpacing: false,
      });

      if (leftColRef.current) {
        gsap.to(leftColRef.current, {
          y: -200,
          ease: "none",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: 1,
          },
        });
      }

      if (rightColRef.current) {
        gsap.to(rightColRef.current, {
          y: 100,
          ease: "none",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: 1,
          },
        });
      }
    }, containerRef);

    return () => ctx.revert();
  }, [isMobile]);

  if (isMobile) {
    return (
      <>
        <section id="hobbies" className="relative bg-bg py-16 px-5">
          <div className="mb-10 text-center">
            <span className="text-xs text-muted uppercase tracking-[0.3em] mb-3 block font-semibold">Hobbies</span>
            <h2 className="text-3xl font-display italic text-text-primary mb-2">
              Beyond <span className="font-display italic">the code</span>
            </h2>
            <p className="text-sm text-muted font-body">
              Things I explore when I'm not training models or shipping features.
            </p>
          </div>

          <div className="flex flex-col gap-10 items-center">
            {hobbiesList.map((item, idx) => (
              <HobbyCard
                key={idx}
                index={idx}
                isActive={activeCardIdx === idx}
                setNode={setNode}
                item={{
                  ...item,
                  offsetX: idx % 2 === 0 ? "4%" : "-4%",
                  rotation: idx % 2 === 0 ? -2 : 2,
                }}
                mobileToggle={true}
                scrollDir={scrollDir}
                onClick={() => setLightboxImg(item.image)}
              />
            ))}
          </div>
        </section>
        <Lightbox image={lightboxImg} onClose={() => setLightboxImg(null)} />
      </>
    );
  }

  return (
    <>
      <section ref={containerRef} id="hobbies" className="relative bg-bg min-h-[500vh]">
        {/* Sticky Background Image */}
        <div className="sticky top-0 h-screen w-full overflow-hidden pointer-events-none" style={{ zIndex: 0 }}>
          <img
            src="/me/my_image.jpg"
            alt=""
            aria-hidden="true"
            className="absolute bottom-0 left-[62%] -translate-x-1/2 h-full object-contain object-bottom select-none opacity-45"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-bg via-bg/60 to-transparent" />
        </div>

        {/* Sticky Title */}
        <div
          ref={stickyTitleRef}
          className="h-screen flex flex-col items-center justify-center text-center px-6 z-10 relative pointer-events-none"
          style={{ marginTop: "-100vh" }}
        >
          <span className="text-xs text-muted uppercase tracking-[0.3em] mb-4 font-semibold">Hobbies</span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-display italic text-text-primary mb-4">
            Beyond <span className="font-display italic">the code</span>
          </h2>
          <p className="text-muted max-w-md font-body">
            Things I explore when I'm not training models or shipping features.
          </p>
        </div>

        {/* Floating Scroll Columns */}
        <div className="absolute inset-0 z-20 pointer-events-none" style={{ top: "100vh" }}>
          <div className="w-full px-6 md:px-16 pt-0 grid grid-cols-2">
            <div ref={leftColRef} className="flex flex-col gap-24 md:gap-40 items-start">
              {leftHobbies.map((item) => {
                const globalIdx = hobbiesList.findIndex((h) => h.name === item.name);
                return (
                  <HobbyCard
                    key={`left-${globalIdx}`}
                    index={globalIdx}
                    isActive={activeCardIdx === globalIdx}
                    setNode={setNode}
                    item={item}
                    onClick={() => setLightboxImg(item.image)}
                  />
                );
              })}
            </div>
            <div ref={rightColRef} className="flex flex-col gap-24 md:gap-40 pt-24 md:pt-40 items-end">
              {rightHobbies.map((item) => {
                const globalIdx = hobbiesList.findIndex((h) => h.name === item.name);
                return (
                  <HobbyCard
                    key={`right-${globalIdx}`}
                    index={globalIdx}
                    isActive={activeCardIdx === globalIdx}
                    setNode={setNode}
                    item={item}
                    onClick={() => setLightboxImg(item.image)}
                  />
                );
              })}
            </div>
          </div>
        </div>
      </section>
      <Lightbox image={lightboxImg} onClose={() => setLightboxImg(null)} />
    </>
  );
};
