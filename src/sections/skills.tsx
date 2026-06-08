import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  SiTensorflow,
  SiScikitlearn,
  SiOpencv,
  SiNumpy,
  SiPandas,
  SiPython,
  SiPytorch,
  SiKeras,
  SiHuggingface,
  SiStreamlit,
  SiAnthropic,
  SiGithubcopilot,
  SiMysql,
  SiMongodb,
  SiApachespark,
  SiGooglecolab,
} from 'react-icons/si';
import { FaJava, FaGitAlt, FaRobot, FaLock, FaNetworkWired, FaServer, FaCode, FaAws } from 'react-icons/fa';

// Skill definition format
interface SkillCategory {
  title: string;
  subtitle: string;
  video: string | null;
  chips: string[];
  hover: boolean;
}

const skillsData: SkillCategory[] = [
  {
    title: 'AI & ML Core',
    subtitle: 'Representation & Reasoning',
    video: '/videos/Ai and ML.mp4',
    chips: [
      'Deep Learning',
      'NLP',
      'Computer Vision',
      'Recommender Systems',
      'Explainable AI',
      'Scikit-learn',
      'TensorFlow',
      'Keras',
      'PyTorch',
      'OpenCV',
    ],
    hover: true,
  },
  {
    title: 'Languages & Frameworks',
    subtitle: 'Systems & Engineering',
    video: null,
    chips: ['Python', 'Java', 'Streamlit', 'PySpark', 'SQL', 'NoSQL', 'NumPy', 'Pandas'],
    hover: false,
  },
  {
    title: 'LLM & Generative AI',
    subtitle: 'RAG & Agentic Systems',
    video: '/videos/agentic AI.mp4',
    chips: [
      'RAG',
      'Transformers',
      'LangChain',
      'Hugging Face',
      'Claude',
      'GitHub Copilot',
      'Explainable AI',
    ],
    hover: true,
  },
  {
    title: 'Cloud & Database Pipelines',
    subtitle: 'AWS Serverless Architecture',
    video: '/videos/backend.mp4',
    chips: [
      'AWS SageMaker',
      'AWS Lambda',
      'AWS S3',
      'AWS Amplify',
      'AWS DynamoDB',
      'AWS API Gateway',
      'MySQL',
      'MongoDB',
    ],
    hover: true,
  },
  {
    title: 'Developer Workflows',
    subtitle: 'CI/CD & Benchmarking',
    video: null,
    chips: [
      'Git',
      'Google Colab GPU',
      'A/B Testing',
      'Hypothesis Testing',
      'Model Transparency',
      'Statistical Benchmarking',
    ],
    hover: false,
  },
];

// Map skill labels to React Icons components
const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  'Deep Learning': FaNetworkWired,
  NLP: FaRobot,
  'Computer Vision': SiOpencv,
  'Recommender Systems': FaServer,
  'Explainable AI': FaCode,
  'Scikit-learn': SiScikitlearn,
  TensorFlow: SiTensorflow,
  Keras: SiKeras,
  PyTorch: SiPytorch,
  OpenCV: SiOpencv,
  Python: SiPython,
  Java: FaJava,
  Streamlit: SiStreamlit,
  PySpark: SiApachespark,
  SQL: SiMysql,
  NoSQL: SiMongodb,
  NumPy: SiNumpy,
  Pandas: SiPandas,
  RAG: FaServer,
  Transformers: FaNetworkWired,
  LangChain: FaRobot,
  'Hugging Face': SiHuggingface,
  Claude: SiAnthropic,
  'GitHub Copilot': SiGithubcopilot,
  'AWS SageMaker': FaAws,
  'AWS Lambda': FaAws,
  'AWS S3': FaAws,
  'AWS Amplify': FaAws,
  'AWS DynamoDB': FaAws,
  'AWS API Gateway': FaAws,
  MySQL: SiMysql,
  MongoDB: SiMongodb,
  Git: FaGitAlt,
  'Google Colab GPU': SiGooglecolab,
  'A/B Testing': FaLock,
  'Hypothesis Testing': FaCode,
};

interface SkillChipProps {
  label: string;
}

const SkillChip: React.FC<SkillChipProps> = ({ label }) => {
  const Icon = iconMap[label];
  return (
    <span className="flex items-center gap-1.5 px-2.5 py-0.5 text-[11px] md:px-3 md:py-1 md:text-sm rounded-full bg-white/10 text-white border border-white/10 shadow-sm whitespace-nowrap">
      {Icon && <Icon className="w-3.5 h-3.5 flex-shrink-0" />}
      {label}
    </span>
  );
};



// Accordion Card for Mobile
interface MobileCardProps {
  skill: SkillCategory;
  index: number;
  isOpen: boolean;
  onTap: (index: number) => void;
}

const MobileSkillCard: React.FC<MobileCardProps> = ({ skill, index, isOpen, onTap }) => {
  return (
    <motion.div
      data-mobile-card={index}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.3, delay: index * 0.04 }}
      className="rounded-2xl bg-[#111] relative overflow-hidden cursor-pointer"
      onClick={() => onTap(index)}
    >
      <div className="relative z-10 p-5">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-base font-extrabold leading-tight text-white">{skill.title}</h3>
            <p className="mt-0.5 text-white/70 text-[10px] uppercase tracking-[0.2em]">{skill.subtitle}</p>
          </div>
          <svg
            className={`h-4 w-4 text-white/50 flex-shrink-0 transition-transform duration-300 ${
              isOpen ? 'rotate-90' : ''
            }`}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
          </svg>
        </div>

        <AnimatePresence initial={false}>
          {isOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0, marginTop: 0 }}
              animate={{ height: 'auto', opacity: 1, marginTop: 12 }}
              exit={{ height: 0, opacity: 0, marginTop: 0 }}
              transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
              className="overflow-hidden"
            >
              <div className="rounded-xl bg-white/5 border border-white/10 p-3">
                <div className="flex flex-wrap gap-1.5">
                  {skill.chips.map((chip) => (
                    <SkillChip key={chip} label={chip} />
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

export const Skills: React.FC = () => {
  const [openCardIdx, setOpenCardIdx] = useState<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const isScrollingRef = useRef(false);

  useEffect(() => {
    const handleNavScrollStart = () => {
      isScrollingRef.current = true;
    };
    window.addEventListener('nav-scroll-start', handleNavScrollStart);
    return () => window.removeEventListener('nav-scroll-start', handleNavScrollStart);
  }, []);

  const handleCardTap = useCallback((idx: number) => {
    setOpenCardIdx((prev) => (prev === idx ? null : idx));
  }, []);

  const cardVariants = {
    hidden: { opacity: 0, x: 40, scale: 0.97 },
    visible: (customDelay: number) => ({
      opacity: 1,
      x: 0,
      scale: 1,
      transition: { duration: 0.55, delay: customDelay * 0.08, ease: [0.25, 0.1, 0.25, 1] as const },
    }),
  };

  return (
    <section
      ref={containerRef}
      id="features"
      className="bg-bg text-white antialiased font-body px-6 sm:px-12 md:px-16 lg:px-20 py-16 sm:py-24"
    >
      <div className="max-w-[1200px] mx-auto mb-10 md:mb-14">
        <p className="text-xs uppercase tracking-[0.3em] text-muted mb-2 font-semibold">Know</p>
        <h2 className="font-black text-[clamp(2.5rem,6vw,5.5rem)] leading-none uppercase tracking-tight text-text-primary">
          My skillset
        </h2>
      </div>

      {/* Mobile Accordion View */}
      <div className="md:hidden flex flex-col gap-3">
        {skillsData.map((skill, idx) => (
          <MobileSkillCard
            key={skill.title}
            skill={skill}
            index={idx}
            isOpen={openCardIdx === idx}
            onTap={handleCardTap}
          />
        ))}
      </div>

      {/* Desktop Grid Layout */}
      <div className="hidden md:flex flex-row gap-5 items-start max-w-[1200px] mx-auto">
        {/* Column 1: AI & ML Core */}
        <motion.div
          custom={0}
          variants={cardVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          className="group rounded-2xl bg-black relative overflow-hidden flex-shrink-0 w-[30%] h-[520px] border border-stroke/50"
          style={{ clipPath: 'inset(0 round 1rem)', WebkitClipPath: 'inset(0 round 1rem)' }}
        >
          {skillsData[0].video && (
            <video
              src={skillsData[0].video}
              autoPlay
              loop
              muted
              playsInline
              className="absolute inset-0 w-full h-full object-cover opacity-20"
            />
          )}
          <div className="absolute top-6 left-6 z-30 pointer-events-none">
            <h3 className="text-3xl font-extrabold leading-tight drop-shadow-lg text-white">
              AI & ML
              <br />
              Core
            </h3>
            <p className="mt-2 text-white/80 uppercase tracking-[0.22em] text-[10px] font-semibold">
              {skillsData[0].subtitle}
            </p>
          </div>

          {/* Expanded Skill Chips box */}
          <div className="absolute inset-x-0 bottom-0 z-20 p-5">
            <div className="rounded-2xl liquid-glass bg-white/10 backdrop-blur-sm border border-white/10 p-4 shadow-sm">
              <div className="flex flex-wrap gap-2">
                {skillsData[0].chips.map((chip) => (
                  <SkillChip key={chip} label={chip} />
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Column 2: Languages & GenAI */}
        <div className="flex flex-col gap-4 flex-shrink-0 w-[34%]">
          {/* Card 1: Languages & Frameworks (Static display - no hover needed) */}
          <motion.div
            custom={1}
            variants={cardVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
            className="group rounded-2xl bg-surface border border-stroke/50 relative overflow-hidden h-[240px] p-5 flex flex-col justify-between"
          >
            <div>
              <h3 className="text-xl sm:text-2xl font-extrabold text-white leading-tight drop-shadow-lg">
                {skillsData[1].title}
              </h3>
              <p className="mt-1 text-white/70 text-[10px] uppercase tracking-[0.22em] font-semibold">
                {skillsData[1].subtitle}
              </p>
            </div>
            <div className="mt-4">
              <div className="flex flex-wrap gap-2">
                {skillsData[1].chips.map((chip) => (
                  <SkillChip key={chip} label={chip} />
                ))}
              </div>
            </div>
          </motion.div>

          {/* Card 2: Generative AI */}
          <motion.div
            custom={2}
            variants={cardVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
            className="group rounded-2xl bg-black relative overflow-hidden h-[264px] border border-stroke/50"
          >
            {skillsData[2].video && (
              <video
                src={skillsData[2].video}
                autoPlay
                loop
                muted
                playsInline
                className="absolute inset-0 w-full h-full object-cover opacity-20"
              />
            )}
            <div className="absolute top-5 left-5 z-30 pointer-events-none">
              <h3 className="text-xl sm:text-2xl font-extrabold text-white drop-shadow-lg">
                {skillsData[2].title}
              </h3>
              <p className="mt-1 text-white/80 text-[10px] uppercase tracking-[0.22em] font-semibold">
                {skillsData[2].subtitle}
              </p>
            </div>

            <div className="absolute inset-x-0 bottom-0 z-20 p-4">
              <div className="w-full rounded-2xl liquid-glass bg-white/10 backdrop-blur-sm border border-white/10 p-4 shadow-sm">
                <div className="flex flex-wrap gap-2">
                  {skillsData[2].chips.map((chip) => (
                    <SkillChip key={chip} label={chip} />
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Column 3: Cloud & Backend / Developer Workflows */}
        <div className="flex flex-col gap-4 flex-1">
          {/* Card 1: Cloud & Database Pipelines */}
          <motion.div
            custom={3}
            variants={cardVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
            className="group rounded-2xl bg-black relative overflow-hidden h-[256px] border border-stroke/50"
          >
            {skillsData[3].video && (
              <video
                src={skillsData[3].video}
                autoPlay
                loop
                muted
                playsInline
                className="absolute inset-0 w-full h-full object-cover opacity-20"
              />
            )}
            <div className="absolute top-5 left-5 z-30 pointer-events-none">
              <h3 className="text-xl sm:text-2xl font-extrabold text-white drop-shadow-lg">
                {skillsData[3].title}
              </h3>
              <p className="mt-1 text-white/80 text-[10px] uppercase tracking-[0.22em] font-semibold">
                {skillsData[3].subtitle}
              </p>
            </div>

            <div className="absolute inset-x-0 bottom-0 z-20 p-4">
              <div className="rounded-2xl liquid-glass bg-white/10 backdrop-blur-sm border border-white/10 p-3 shadow-sm">
                <div className="flex flex-wrap gap-2">
                  {skillsData[3].chips.map((chip) => (
                    <SkillChip key={chip} label={chip} />
                  ))}
                </div>
              </div>
            </div>
          </motion.div>

          {/* Card 2: Developer Workflows */}
          <motion.div
            custom={4}
            variants={cardVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
            className="group rounded-2xl bg-surface border border-stroke/50 relative overflow-hidden h-[248px] p-5 flex flex-col justify-between"
          >
            <div>
              <h3 className="text-xl font-extrabold text-white drop-shadow-lg">
                {skillsData[4].title}
              </h3>
              <p className="mt-0.5 text-white/70 text-[10px] uppercase tracking-[0.22em] font-semibold">
                {skillsData[4].subtitle}
              </p>
            </div>
            <div className="mt-4">
              <div className="flex flex-wrap gap-2">
                {skillsData[4].chips.map((chip) => (
                  <SkillChip key={chip} label={chip} />
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
