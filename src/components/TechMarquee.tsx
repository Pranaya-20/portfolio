import React from 'react';
import { motion } from 'framer-motion';
import {
  SiPython,
  SiPytorch,
  SiTensorflow,
  SiKeras,
  SiScikitlearn,
  SiMongodb,
  SiMysql,
  SiOpencv,
  SiHuggingface,
  SiStreamlit,
  SiAnthropic,
  SiGithubcopilot,
} from 'react-icons/si';
import { FaJava, FaGitAlt, FaGithub, FaAws } from 'react-icons/fa';

const row1Icons = [
  SiPython,
  SiPytorch,
  SiTensorflow,
  SiKeras,
  SiScikitlearn,
  FaAws,
  SiOpencv,
  SiHuggingface,
];

const row2Icons = [
  FaJava,
  SiMongodb,
  SiMysql,
  FaGitAlt,
  SiStreamlit,
  SiAnthropic,
  SiGithubcopilot,
  FaGithub,
];

interface IconWrapperProps {
  Icon: React.ComponentType<{ className?: string }>;
}

const IconWrapper: React.FC<IconWrapperProps> = ({ Icon }) => {
  return (
    <span className="inline-flex items-center justify-center mx-6 sm:mx-10 md:mx-12 text-[#D7E2EA]/40 hover:text-[#D7E2EA]/80 transition-colors duration-200 select-none flex-shrink-0">
      <Icon className="w-8 h-8 sm:w-12 sm:h-12 md:w-16 md:h-16" />
    </span>
  );
};

export const TechMarquee: React.FC = () => {
  // Stagger duplicate array elements to ensure infinite seamless scrolling
  const list1 = [...row1Icons, ...row1Icons, ...row1Icons, ...row1Icons];
  const list2 = [...row2Icons, ...row2Icons, ...row2Icons, ...row2Icons];

  return (
    <div className="relative bg-bg py-10 sm:py-16 md:py-20 flex flex-col gap-10 sm:gap-14 overflow-hidden border-y border-stroke/30">
      {/* Left Gradient Overlay */}
      <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-20 sm:w-32 md:w-44 z-10 bg-gradient-to-r from-bg to-transparent" />
      {/* Right Gradient Overlay */}
      <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-20 sm:w-32 md:w-44 z-10 bg-gradient-to-l from-bg to-transparent" />

      {/* Row 1 - Scrolling Left */}
      <div className="overflow-hidden w-full flex">
        <motion.div
          animate={{ x: [0, -1000] }}
          transition={{
            x: {
              repeat: Infinity,
              repeatType: 'loop',
              duration: 35,
              ease: 'linear',
            },
          }}
          className="flex items-center whitespace-nowrap"
        >
          {list1.map((Icon, idx) => (
            <IconWrapper key={`row1-${idx}`} Icon={Icon} />
          ))}
        </motion.div>
      </div>

      {/* Row 2 - Scrolling Right */}
      <div className="overflow-hidden w-full flex">
        <motion.div
          animate={{ x: [-1000, 0] }}
          transition={{
            x: {
              repeat: Infinity,
              repeatType: 'loop',
              duration: 40,
              ease: 'linear',
            },
          }}
          className="flex items-center whitespace-nowrap"
        >
          {list2.map((Icon, idx) => (
            <IconWrapper key={`row2-${idx}`} Icon={Icon} />
          ))}
        </motion.div>
      </div>
    </div>
  );
};
