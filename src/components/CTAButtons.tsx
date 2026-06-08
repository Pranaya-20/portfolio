import React from 'react';

interface CTAButtonsProps {
  primaryText: string;
  primaryHref: string;
  secondaryText: string;
  secondaryHref: string;
}

export const CTAButtons: React.FC<CTAButtonsProps> = ({
  primaryText,
  primaryHref,
  secondaryText,
  secondaryHref,
}) => {
  const handleScroll = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const targetElement = document.querySelector(href);
    if (targetElement) {
      window.dispatchEvent(new CustomEvent('nav-scroll-start'));
      targetElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="flex gap-3 sm:gap-4 w-full sm:w-auto">
      {/* Primary Filled Button */}
      <a
        href={primaryHref}
        onClick={(e) => handleScroll(e, primaryHref)}
        className="group relative rounded-full text-xs sm:text-sm px-5 sm:px-8 py-3 sm:py-3.5 bg-text-primary text-bg hover:bg-bg hover:text-text-primary transition-all duration-300 hover:scale-105 flex-1 sm:flex-none text-center font-bold"
      >
        <span className="absolute inset-[-2px] rounded-full opacity-0 group-hover:opacity-100 accent-gradient transition-opacity duration-300 z-[-1]" />
        {primaryText}
      </a>

      {/* Secondary Bordered Button */}
      <a
        href={secondaryHref}
        onClick={(e) => handleScroll(e, secondaryHref)}
        className="group relative rounded-full text-xs sm:text-sm px-5 sm:px-8 py-3 sm:py-3.5 border-2 border-stroke bg-bg text-text-primary hover:border-transparent transition-all duration-300 hover:scale-105 flex-1 sm:flex-none text-center font-bold"
      >
        <span className="absolute inset-[-2px] rounded-full opacity-0 group-hover:opacity-100 accent-gradient transition-opacity duration-300 z-[-1]" />
        {secondaryText}
      </a>
    </div>
  );
};
