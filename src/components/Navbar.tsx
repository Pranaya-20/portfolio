import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const navLinks = [
  { label: 'Home', href: '#hero' },
  { label: 'Skillset', href: '#features' },
  { label: 'Projects', href: '#projects' },
  { label: 'Experience', href: '#experience' },
  { label: 'Publications', href: '#publications' },
  { label: 'Hobbies', href: '#hobbies' },
  {
    label: 'Resume',
    href: 'https://linkedin.com/in/pranaya-subramani', // Fallback to LinkedIn or custom link
  },
];

interface NavbarProps {
  visible: boolean;
}

export const Navbar: React.FC<NavbarProps> = ({ visible }) => {
  const [activeTab, setActiveTab] = useState('Home');
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);

      // Simple active tab updating based on scroll
      const sections = ['hero', 'features', 'projects', 'experience', 'publications', 'hobbies'];
      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 120 && rect.bottom >= 120) {
            const matchedLink = navLinks.find((link) => link.href === `#${sectionId}`);
            if (matchedLink) {
              setActiveTab(matchedLink.label);
            }
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (label: string, href: string) => {
    setIsMenuOpen(false);
    if (href.startsWith('http')) {
      window.open(href, '_blank', 'noopener,noreferrer');
      return;
    }
    setActiveTab(label);
    const targetElement = document.querySelector(href);
    if (targetElement) {
      // Trigger scroll event to let skills and experience cards pause
      window.dispatchEvent(new CustomEvent('nav-scroll-start'));
      targetElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  if (!visible) return null;

  return (
    <>
      {/* Floating Desktop Menu & Mobile Header Bar */}
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled ? 'bg-bg/85 backdrop-blur-md border-b border-stroke py-3' : 'bg-transparent py-5'
        }`}
      >
        <div className="max-w-[1200px] mx-auto px-6 md:px-12 flex items-center justify-between">
          <a
            href="#hero"
            onClick={(e) => {
              e.preventDefault();
              handleNavClick('Home', '#hero');
            }}
            className="font-display italic text-lg sm:text-xl text-text-primary tracking-wide cursor-pointer select-none"
          >
            S.J. Pranaya
          </a>

          {/* Desktop Nav Items */}
          <nav className="hidden md:flex items-center gap-1.5 rounded-full bg-surface/50 border border-stroke p-1.5 backdrop-blur-sm">
            {navLinks.map(({ label, href }) => {
              const isActive = activeTab === label;
              return (
                <button
                  key={label}
                  onClick={() => handleNavClick(label, href)}
                  className={`relative px-4 py-2 text-xs uppercase tracking-widest font-semibold rounded-full transition-colors duration-300 ${
                    isActive ? 'text-bg' : 'text-muted hover:text-text-primary'
                  }`}
                >
                  {isActive && (
                    <motion.span
                      layoutId="activePill"
                      className="absolute inset-0 bg-text-primary rounded-full -z-10"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                  {label}
                </button>
              );
            })}
          </nav>

          {/* Mobile Menu Toggle Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden flex flex-col gap-1.5 items-end justify-center w-8 h-8 rounded-full border border-stroke bg-surface hover:bg-stroke/50 transition-colors z-50 cursor-pointer"
            aria-label="Toggle Menu"
          >
            <span
              className={`w-5 h-[2px] bg-text-primary transition-all duration-300 origin-center ${
                isMenuOpen ? 'rotate-45 translate-y-[4px]' : ''
              }`}
            />
            <span
              className={`w-3 h-[2px] bg-text-primary transition-all duration-300 origin-center ${
                isMenuOpen ? '-rotate-45 -translate-y-[4px] w-5' : ''
              }`}
            />
          </button>
        </div>
      </motion.header>

      {/* Mobile Menu Drawer Overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40 md:hidden bg-bg/95 backdrop-blur-md flex flex-col"
          >
            <div
              className="absolute inset-0 bg-transparent"
              onClick={() => setIsMenuOpen(false)}
            />
            <motion.div
              initial={{ y: -40, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -40, opacity: 0 }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
              className="absolute top-24 left-6 right-6 bg-surface border border-stroke rounded-3xl p-6 flex flex-col gap-2 shadow-2xl"
            >
              {navLinks.map(({ label, href }) => (
                <button
                  key={label}
                  onClick={() => handleNavClick(label, href)}
                  className={`text-left text-base rounded-2xl px-5 py-3.5 transition-all duration-200 ${
                    activeTab === label
                      ? 'text-text-primary bg-stroke/50 font-bold'
                      : 'text-muted hover:text-text-primary hover:bg-stroke/30'
                  }`}
                >
                  {label}
                </button>
              ))}
              <div className="h-px bg-stroke my-2" />
              <button
                onClick={() => handleNavClick('Contact', '#contact')}
                className="text-left text-base rounded-2xl px-5 py-3.5 text-muted hover:text-text-primary hover:bg-stroke/30 transition-all duration-200"
              >
                Say hi ↗
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
