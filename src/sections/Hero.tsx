import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { CTAButtons } from '../components/CTAButtons';

const audioUrl = '/audio/spiderman-meme-song.mp3';
const circleRadius = 160;
const maskFadeInSpeed = 0.65;
const maskFadeOutSpeed = 0.4;
const maskEase = 'power2.out';

const roleDefault = ['AI & ML', 'Engineer'];
const roleSecret = ['The', 'Spiderman'];

interface HeroProps {
  isLoading: boolean;
}

export const Hero: React.FC<HeroProps> = ({ isLoading }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const imageFrameRef = useRef<HTMLDivElement>(null);
  const spidermanImgRef = useRef<HTMLImageElement>(null);
  const [isRevealed, setIsRevealed] = useState(false);

  const audioContextRef = useRef<AudioContext | null>(null);
  const audioBufferRef = useRef<AudioBuffer | null>(null);
  const audioSourceRef = useRef<AudioBufferSourceNode | null>(null);
  const audioPrefetchRef = useRef<ArrayBuffer | null>(null);
  const isPlayingRef = useRef<boolean>(false);

  // Prefetch audio
  useEffect(() => {
    fetch(audioUrl)
      .then((res) => res.arrayBuffer())
      .then((buf) => {
        audioPrefetchRef.current = buf;
        const ctx = audioContextRef.current ?? new (window.AudioContext || (window as any).webkitAudioContext)();
        audioContextRef.current = ctx;
        ctx.decodeAudioData(buf.slice(0)).then((decoded) => {
          audioBufferRef.current = decoded;
        }).catch(() => {});
      })
      .catch((err) => console.warn('Audio prefetch failed:', err));
  }, []);

  const playSecretSong = () => {
    try {
      const ctx = audioContextRef.current ?? new (window.AudioContext || (window as any).webkitAudioContext)();
      audioContextRef.current = ctx;

      const triggerPlay = (buffer: AudioBuffer) => {
        if (isPlayingRef.current) return;
        isPlayingRef.current = true;

        const gainNode = ctx.createGain();
        gainNode.gain.value = 1;
        gainNode.connect(ctx.destination);

        const source = ctx.createBufferSource();
        source.buffer = buffer;
        source.connect(gainNode);
        source.start(0);
        audioSourceRef.current = source;

        // Fade out at end of 6s
        gainNode.gain.setValueAtTime(1, ctx.currentTime + 6);
        gainNode.gain.linearRampToValueAtTime(0, ctx.currentTime + 7);

        setTimeout(() => {
          try {
            source.stop();
          } catch {}
          gainNode.disconnect();
          isPlayingRef.current = false;
        }, 7100);
      };

      if (audioBufferRef.current) {
        triggerPlay(audioBufferRef.current);
      } else if (audioPrefetchRef.current) {
        ctx.decodeAudioData(audioPrefetchRef.current.slice(0)).then((decoded) => {
          audioBufferRef.current = decoded;
          triggerPlay(decoded);
        }).catch((err) => console.warn('Audio decode failed:', err));
      }
    } catch (err) {
      console.warn('Audio playback failed:', err);
    }
  };

  // Text scrambling scramble effect
  const animateTextScramble = (targetText: string[], originalText: string[], prefix: string) => {
    targetText.forEach((word, lineIdx) => {
      const maxLength = Math.max(word.length, (originalText[lineIdx] ?? '').length);
      for (let charIdx = 0; charIdx < maxLength; charIdx++) {
        const spanSelector = `[data-inner="${prefix}-${lineIdx}-${charIdx}"]`;
        const spanEl = document.querySelector(spanSelector);
        if (!spanEl) continue;

        const newChar = word[charIdx] ?? '';
        const delay = (lineIdx * 10 + charIdx) * 0.045;

        gsap.to(spanEl, {
          y: '110%',
          opacity: 0,
          duration: 0.18,
          delay: delay,
          ease: 'power2.in',
          onComplete: () => {
            spanEl.textContent = newChar === ' ' || newChar === '' ? '\u00A0' : newChar;
            gsap.fromTo(
              spanEl,
              { y: '-110%', opacity: 0 },
              { y: '0%', opacity: 1, duration: 0.22, ease: 'back.out(1.7)' }
            );
          },
        });
      }
    });
  };

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

  // Hover Interactions for Desktop Reveal
  useEffect(() => {
    const spiderman = spidermanImgRef.current;
    const frame = imageFrameRef.current;
    if (!spiderman || !frame || !window.matchMedia('(hover: hover)').matches) return;

    let hoverActive = false;

    const onMouseEnter = () => {
      if (hoverActive) return;
      hoverActive = true;
      setIsRevealed(false); // remove "click me" hint
      playSecretSong();
      animateTextScramble(roleSecret, roleDefault, 'dsk');
      animateTextScramble(roleSecret, roleDefault, 'mob');

      setTimeout(() => {
        // Roll back text after 7 seconds
        animateTextScramble(roleDefault, roleSecret, 'dsk');
        animateTextScramble(roleDefault, roleSecret, 'mob');
      }, 7000);
    };

    const onMouseMove = (e: MouseEvent) => {
      const rect = frame.getBoundingClientRect();
      const mouseX = e.clientX - rect.left;
      const mouseY = e.clientY - rect.top;

      if (mouseX >= 0 && mouseY >= 0 && mouseX <= rect.width && mouseY <= rect.height) {
        onMouseEnter();
        const maskStyles = `radial-gradient(circle ${circleRadius}px at ${mouseX}px ${mouseY}px, black ${Math.round(
          maskFadeInSpeed * 100
        )}%, transparent 100%)`;

        gsap.set(spiderman, {
          webkitMaskImage: maskStyles,
          maskImage: maskStyles,
          opacity: 1,
        });
      } else {
        gsap.to(spiderman, {
          opacity: 0,
          duration: maskFadeOutSpeed,
          ease: maskEase,
        });
        hoverActive = false;
      }
    };

    window.addEventListener('mousemove', onMouseMove);
    return () => {
      window.removeEventListener('mousemove', onMouseMove);
    };
  }, []);

  // Touch Interactions for Mobile Reveal
  useEffect(() => {
    const spiderman = spidermanImgRef.current;
    const frame = imageFrameRef.current;
    if (!spiderman || !frame || window.matchMedia('(hover: hover)').matches) return;

    let touchActive = false;

    const triggerMobileReveal = () => {
      if (touchActive) return;
      touchActive = true;
      setIsRevealed(false);
      playSecretSong();

      const rect = spiderman.getBoundingClientRect();
      const radiusMax = Math.sqrt(rect.width ** 2 + rect.height ** 2);
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      // Stagger circle size
      gsap.to(
        {},
        {
          duration: 0.6,
          ease: 'power2.out',
          onUpdate: function () {
            const progress = this.progress();
            const maskStyles = `radial-gradient(circle ${
              radiusMax * progress
            }px at ${centerX}px ${centerY}px, black 65%, transparent 100%)`;
            gsap.set(spiderman, {
              webkitMaskImage: maskStyles,
              maskImage: maskStyles,
              opacity: 1,
            });
          },
          onComplete: () => {
            setTimeout(() => {
              gsap.to(
                {},
                {
                  duration: 0.5,
                  ease: 'power2.in',
                  onUpdate: function () {
                    const progress = this.progress();
                    const maskStyles = `radial-gradient(circle ${
                      radiusMax * (1 - progress)
                    }px at ${centerX}px ${centerY}px, black 65%, transparent 100%)`;
                    gsap.set(spiderman, {
                      webkitMaskImage: maskStyles,
                      maskImage: maskStyles,
                      opacity: 1,
                    });
                  },
                  onComplete: () => {
                    gsap.set(spiderman, { opacity: 0 });
                    touchActive = false;
                  },
                }
              );
            }, 5600);
          },
        }
      );

      animateTextScramble(roleSecret, roleDefault, 'mob');
      animateTextScramble(roleSecret, roleDefault, 'dsk');
      setTimeout(() => {
        animateTextScramble(roleDefault, roleSecret, 'mob');
        animateTextScramble(roleDefault, roleSecret, 'dsk');
      }, 7000);
    };

    const onTouchStart = (e: TouchEvent) => {
      if (touchActive) return;
      const touch = e.touches[0];
      const img = frame.querySelector('img');
      if (img) {
        const rect = img.getBoundingClientRect();
        const clientX = touch.clientX;
        const clientY = touch.clientY;
        if (
          clientX < rect.left ||
          clientX > rect.right ||
          clientY < rect.top ||
          clientY > rect.bottom
        ) {
          return;
        }
      }
      triggerMobileReveal();
    };

    setIsRevealed(true);
    frame.addEventListener('touchstart', onTouchStart, { passive: true });
    return () => {
      frame.removeEventListener('touchstart', onTouchStart);
    };
  }, []);

  // Inner span helper for scrambled letter-by-letter animations
  const WordScrambler: React.FC<{ text: string; lineIdx: number; prefix: string }> = ({
    text,
    lineIdx,
    prefix,
  }) => {
    const normalWord = roleDefault[lineIdx] ?? '';
    const secretWord = roleSecret[lineIdx] ?? '';
    const maxLength = Math.max(normalWord.length, secretWord.length);
    const paddedText = text.padEnd(maxLength, ' ');

    return (
      <span className="block">
        {paddedText.split('').map((char, charIdx) => (
          <span
            key={charIdx}
            className="inline-block overflow-hidden align-bottom"
          >
            <span
              data-inner={`${prefix}-${lineIdx}-${charIdx}`}
              className="inline-block"
            >
              {char === ' ' ? '\u00A0' : char}
            </span>
          </span>
        ))}
      </span>
    );
  };

  const RoleHeader: React.FC<{ containerClass: string; prefix: string }> = ({
    containerClass,
    prefix,
  }) => {
    return (
      <h2 className={containerClass}>
        {roleDefault.map((text, idx) => (
          <WordScrambler
            key={idx}
            text={text}
            lineIdx={idx}
            prefix={prefix}
          />
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
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_70%_at_50%_40%,rgba(137,170,204,0.07)_0%,transparent_70%)] pointer-events-none" />

      <div className="relative z-10 flex flex-col flex-1 justify-center">
        {/* Hey, there Header */}
        <div className="relative h-[38vh] sm:h-[50vh] flex items-start justify-center pt-20 sm:pt-14 md:pt-24 select-none">
          <span className="hero-greeting opacity-0 translate-y-8 font-display italic text-[clamp(2.8rem,9vw,9.5rem)] leading-none text-text-primary z-0 whitespace-nowrap px-4 text-center">
            Hey,&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;there
          </span>

          {/* Photo Frame Container */}
          <div
            ref={imageFrameRef}
            className="absolute top-[60px] sm:top-[80px] left-1/2 -translate-x-1/2 z-30 w-[clamp(160px,38vw,480px)] sm:cursor-pointer touch-manipulation"
          >
            {/* Default Face */}
            <img
              src="/me/my_image.png"
              alt="S.J. Pranaya"
              className="hero-image opacity-0 scale-95 w-full object-contain drop-shadow-2xl select-none"
            />
            {/* Secret Spiderman Reveal Overlay */}
            <img
              ref={spidermanImgRef}
              src="/images/me spiderman.png"
              alt=""
              aria-hidden="true"
              className="absolute top-0 left-50% -translate-x-1/2 w-[140%] h-full object-contain object-center opacity-0 pointer-events-none select-none"
              style={{
                willChange: 'mask-image, opacity',
                transform: 'translateX(-50%)',
                WebkitMaskImage: 'radial-gradient(circle 0px at 50% 50%, black 65%, transparent 100%)',
                maskImage: 'radial-gradient(circle 0px at 50% 50%, black 65%, transparent 100%)',
              }}
            />

            {/* Tap/Click Hint */}
            {isRevealed && (
              <div className="absolute top-1 sm:top-6 left-1/2 -translate-x-1/2 -translate-y-1/2 sm:translate-y-0 flex flex-col items-center gap-1.5 pointer-events-none z-20">
                <span
                  className="text-[11px] sm:text-[12px] uppercase tracking-[0.25em] whitespace-nowrap font-semibold"
                  style={{
                    color: '#fff',
                    textShadow: '0 0 8px rgba(137,170,204,0.9), 0 0 20px rgba(137,170,204,0.6), 0 0 40px rgba(137,170,204,0.3)',
                    animation: 'hint-pulse 1.4s ease-in-out infinite',
                  }}
                >
                  <span className="sm:hidden">tap here</span>
                  <span className="hidden sm:inline">click me</span>
                </span>
                <svg
                  className="w-4 h-4 animate-bounce"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                  style={{
                    color: '#fff',
                    filter: 'drop-shadow(0 0 6px rgba(137,170,204,0.8))',
                  }}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                </svg>
              </div>
            )}
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
              <RoleHeader
                containerClass="font-body font-black text-[clamp(1.8rem,10vw,3.5rem)] leading-[0.88] tracking-tight text-text-primary uppercase text-right whitespace-nowrap"
                prefix="mob"
              />
              <div className="flex items-center gap-2 text-right">
                <span className="font-mono tracking-[0.5em] text-emerald-300 font-semibold text-sm">INTJ</span>
                <span className="text-text-primary text-sm">— The Architect</span>
              </div>
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
                <RoleHeader
                  containerClass="font-body font-black text-[clamp(2rem,7vw,7rem)] leading-[0.88] tracking-tight text-text-primary uppercase text-right whitespace-nowrap"
                  prefix="dsk"
                />
              </div>
              <div className="hero-fade opacity-0 translate-y-4 blur-sm flex items-end gap-3 text-right">
                <div className="flex flex-col items-end">
                  <span className="font-mono text-[0.9rem] tracking-[0.5em] text-emerald-300 font-semibold">INTJ</span>
                  <span className="text-text-primary text-sm mt-1">The Architect</span>
                </div>
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
