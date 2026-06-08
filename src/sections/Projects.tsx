import React, { useState, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '../components/ui/tooltip';
import { LiveProjectButton } from '../components/LiveProjectButton';
import { Lightbox } from '../components/Lightbox';

import {
  SiPython,
  SiStreamlit,
  SiPytorch,
  SiHuggingface,
  SiScikitlearn,
  SiOpencv,
} from 'react-icons/si';
import { FaRobot, FaNetworkWired, FaCode, FaAws } from 'react-icons/fa';

export interface ProjectBlock {
  label: string;
  text: string;
}

export interface ProjectData {
  number: string;
  category: string;
  name: string;
  href: string;
  featured: boolean;
  flipLayout?: boolean;
  tech: string[];
  col1: string[];
  col2: string;
  blocks: ProjectBlock[];
}

export const projectsList: ProjectData[] = [
  {
    number: '01',
    category: 'Research & AWS',
    name: 'GreenCalc',
    href: 'https://us-east-1pj9j4cyqm.auth.us-east-1.amazoncognito.com/login?client_id=380osptgvpcvs5jka7hhigkik6&response_type=code&scope=email+openid+phone&redirect_uri=https%3A%2F%2Fstaging.dofc1rnoatrbn.amplifyapp.com',
    featured: true,
    flipLayout: true,
    tech: ['python', 'yolo', 'aws', 'sagemaker', 'streamlit'],
    col1: ['/images/greencalc1.png', '/images/greencalc2.png'],
    col2: '/images/greencalc_workflow.png',
    blocks: [
      {
        label: 'Why I Built It',
        text: 'Forest carbon footprint calculations currently require tedious manual tools (calipers, tapes) which are labor-intensive. I wanted to build a serverless ML system where a single 2D smartphone image could compute crown width, tree height, and carbon sequestration within 3 seconds.',
      },
      {
        label: 'How It Works',
        text: 'Serverless AWS pipeline. YOLOv8 locates the tree species, and ZoE-Depth estimates depth map coordinates. Species-level allometric equations compute carbon sequestration metrics. Results are saved in DynamoDB and verified via PlantNet API.',
      },
      {
        label: 'What It Achieves',
        text: 'Non-invasive real-time carbon sequestration mapping. Outperformed MiDaS baseline on crown-width RMSE by ~18%. Rigorous statistical validation published at IEEE AIMLA 2026, establishing model trust in uncontrolled outdoor conditions.',
      },
    ],
  },
  {
    number: '02',
    category: 'NLP & GenAI',
    name: 'Insight Engine',
    href: 'https://github.com/pranaya-20/Article-Insight-Engine',
    featured: true,
    tech: ['langchain', 'huggingface', 'pytorch', 'streamlit', 'python'],
    col1: ['/images/insight1.png', '/images/insight1.png'],
    col2: '/images/insight2.png',
    blocks: [
      {
        label: 'Why I Built It',
        text: 'Reading dense technical documents is time-consuming. Generic LLM summarization often loses boundary entity relations or hallucinates source information. I wanted to build a RAG pipeline that delivers factual, cited QA summaries with cross-turn conversation history.',
      },
      {
        label: 'How It Works',
        text: 'Documents are parsed into overlapping chunks to preserve boundary context. Extractive summarization is combined with abstractive synthesis using Hugging Face transformer models. LangChain tracks the QA history in a Streamlit UI.',
      },
      {
        label: 'What It Achieves',
        text: 'Reduces document review times by ~70%. Retains coherent cross-turn chat context across 10+ turns. Precision-recall evaluations of the chunk overlap strategies show significant reductions in hallucinated claims.',
      },
    ],
  },
  {
    number: '03',
    category: 'Explainable AI',
    name: 'HAM10000 XAI',
    href: 'https://colab.research.google.com/drive/1IEQSvbyVycGQ-WoUzU4Yi9JdSp22y-bv?usp=sharing',
    featured: true,
    flipLayout: true,
    tech: ['pytorch', 'vit', 'gradcam', 'scikitlearn', 'python'],
    col1: ['/images/xai1.png', '/images/xai1.png'],
    col2: '/images/ham10000_architecture.png',
    blocks: [
      {
        label: 'Why I Built It',
        text: 'Deep learning models in medicine function as black boxes, limiting clinical adoption. Vision Transformers (ViTs) capture global attention relationships but lack transparent explanation paths. I built this to couple ViT diagnostics with visual patch activation heatmaps.',
      },
      {
        label: 'How It Works',
        text: 'Fine-tuned a ViT-B/16 on 10,015 dermatoscopic images. Integrated a Grad-CAM explainability layer over the ViT patch tokens to overlay attention heatmaps. Deployed the end-to-end pipeline on GPU T4 via Colab.',
      },
      {
        label: 'What It Achieves',
        text: 'Outperformed ResNet-50 CNN baselines. Attention heatmaps provide clinicians with visual reasoning verification. Addressed severe clinical class imbalances using precision-recall and F1 metric benchmarking.',
      },
    ],
  },
];

const iconComponentMap: Record<string, React.ComponentType<{ className?: string; style?: React.CSSProperties }>> = {
  python: SiPython,
  aws: FaAws,
  sagemaker: FaAws,
  streamlit: SiStreamlit,
  pytorch: SiPytorch,
  huggingface: SiHuggingface,
  scikitlearn: SiScikitlearn,
  opencv: SiOpencv,
  langchain: FaRobot,
  vit: FaNetworkWired,
  gradcam: FaCode,
  yolo: FaNetworkWired,
};

const iconColorMap: Record<string, string> = {
  python: '#3776AB',
  aws: '#FF9900',
  sagemaker: '#FF9900',
  streamlit: '#FF4B4B',
  pytorch: '#EE4C2C',
  huggingface: '#FFD21E',
  scikitlearn: '#F7931E',
  opencv: '#5C3EE8',
  langchain: '#00FFFF',
  vit: '#41B883',
  gradcam: '#61DAFB',
  yolo: '#00FFFF',
};

interface ProjectCardProps {
  project: ProjectData;
  index: number;
  onImageClick: (image: string) => void;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project, index, onImageClick }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [activeBlock, setActiveBlock] = useState<string | null>(null);

  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ['start start', 'end start'],
  });

  const targetScale = 1 - (projectsList.length - 1 - index) * 0.03;
  const scale = useTransform(scrollYProgress, [0, 1], [1, targetScale]);

  return (
    <div
      ref={cardRef}
      className="h-[60vh] sm:h-[85vh] flex items-start justify-center sticky"
      style={{ top: `calc(5rem + ${index * 20}px)` }}
    >
      <motion.div
        style={{ scale }}
        onClick={() => window.open(project.href, '_blank', 'noopener,noreferrer')}
        className="w-full rounded-[24px] sm:rounded-[40px] md:rounded-[60px] border border-stroke bg-surface p-4 sm:p-6 md:p-8 flex flex-col gap-3 sm:gap-5 origin-top h-full cursor-pointer sm:cursor-default"
      >
        {/* Card Header */}
        <div className="flex items-start sm:items-center justify-between gap-2 flex-wrap flex-shrink-0">
          <div className="flex items-center gap-2 sm:gap-4 flex-wrap w-full sm:w-auto">
            <span className="font-black text-[clamp(1.8rem,5vw,5rem)] leading-none text-text-primary/10 select-none">
              {project.number}
            </span>
            <span className="text-[10px] sm:text-xs uppercase tracking-widest text-muted border border-white/40 rounded-full px-2 sm:px-3 py-0.5 sm:py-1">
              {project.category}
            </span>
            <h3 className="font-display italic text-[clamp(1.2rem,2.5vw,3rem)] text-text-primary leading-none">
              {project.name}
            </h3>
            <a
              href={project.href}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="sm:hidden ml-auto w-9 h-9 rounded-full border-2 border-[#D7E2EA]/60 flex items-center justify-center text-[#D7E2EA] text-base font-bold flex-shrink-0"
            >
              ↗
            </a>
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto justify-center sm:justify-end">
            <TooltipProvider>
              <div className="flex items-center gap-2">
                {project.tech.map((techName) => {
                  const key = techName.toLowerCase();
                  const IconComponent = iconComponentMap[key];
                  const iconColor = iconColorMap[key] || '#fff';

                  return (
                    <Tooltip key={techName}>
                      <TooltipTrigger asChild>
                        <div
                          onClick={(e) => e.stopPropagation()}
                          className="rounded-full border border-white/20 p-1.5 flex items-center justify-center bg-white/5 hover:border-white/50 transition-colors"
                        >
                          {IconComponent ? (
                            <IconComponent
                              className="h-5 w-5 md:h-7 md:w-7 select-none"
                              style={{ color: iconColor }}
                            />
                          ) : (
                            <img
                              src={`/icons/${key}.svg`}
                              alt={techName}
                              className="h-5 md:h-7 w-auto select-none"
                            />
                          )}
                        </div>
                      </TooltipTrigger>
                      <TooltipContent side="top">{techName}</TooltipContent>
                    </Tooltip>
                  );
                })}
              </div>
            </TooltipProvider>

            <div className="hidden sm:block">
              <LiveProjectButton href={project.href} />
            </div>
          </div>
        </div>

        {/* Card Body Grid */}
        <div className="flex-1 min-h-0">
          {/* Mobile Text Blocks Accordion */}
          <div className="flex flex-col gap-2 h-full sm:hidden">
            <div
              className="rounded-[12px] overflow-hidden bg-bg border-2 border-[#D7E2EA]/10 flex-1 cursor-pointer min-h-0"
              onClick={(e) => {
                e.stopPropagation();
                onImageClick(project.col2);
              }}
            >
              <img
                src={project.col2}
                alt={project.name}
                loading="lazy"
                className="w-full h-full object-contain p-2 bg-surface/30"
              />
            </div>
            <div className="flex flex-col gap-1.5 flex-shrink-0">
              {project.blocks.slice(0, 2).map((block) => {
                const firstDotIdx = block.text.indexOf('. ');
                const headerText = firstDotIdx > -1 ? block.text.slice(0, firstDotIdx + 1) : block.text;
                const restText = firstDotIdx > -1 ? block.text.slice(firstDotIdx + 2) : '';
                const isBlockOpen = activeBlock === block.label;

                return (
                  <div
                    key={block.label}
                    className="rounded-[10px] bg-bg border-2 border-[#D7E2EA]/10 p-2 cursor-pointer"
                    onClick={(e) => {
                      e.stopPropagation();
                      setActiveBlock(isBlockOpen ? null : block.label);
                    }}
                  >
                    <div className="flex items-center justify-between gap-1.5 mb-1">
                      <div className="flex items-center gap-1.5">
                        <span className="w-3 h-px bg-muted/50" />
                        <p className="text-[8px] uppercase tracking-[0.2em] text-muted">{block.label}</p>
                      </div>
                      <span className="text-[8px] text-muted/60">{isBlockOpen ? '▲' : '▼'}</span>
                    </div>
                    <p className="font-body font-semibold text-[10px] text-text-primary leading-snug mb-0.5">
                      {headerText}
                    </p>
                    {restText && isBlockOpen && (
                      <p className="text-[9px] text-muted leading-relaxed transition-all duration-200">
                        {restText}
                      </p>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Desktop Split Image-Details View */}
          <div className={`hidden sm:flex gap-6 h-full ${project.flipLayout ? 'flex-row-reverse' : ''}`}>
            {/* Project Details Columns */}
            <div className="flex flex-col gap-4 flex-1 justify-between py-2">
              {project.blocks.map((block) => {
                const firstDotIdx = block.text.indexOf('. ');
                const headerText = firstDotIdx > -1 ? block.text.slice(0, firstDotIdx + 1) : block.text;
                const restText = firstDotIdx > -1 ? block.text.slice(firstDotIdx + 2) : '';

                return (
                  <div
                    key={block.label}
                    className="rounded-[20px] bg-bg border border-[#D7E2EA]/10 hover:border-white/20 p-4.5 flex-1 flex flex-col justify-center transition-colors duration-300"
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <span className="w-4 h-px bg-muted/50" />
                      <p className="text-[9px] uppercase tracking-[0.2em] text-muted font-body font-semibold">
                        {block.label}
                      </p>
                    </div>
                    <p className="font-body font-bold text-[14px] text-text-primary leading-snug mb-1">
                      {headerText}
                    </p>
                    {restText && (
                      <p className="text-[11px] text-muted leading-relaxed font-body">
                        {restText}
                      </p>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Project Cover Photo Box */}
            <div
              className="flex-1 rounded-[30px] overflow-hidden bg-bg border border-[#D7E2EA]/10 relative cursor-zoom-in"
              onClick={(e) => {
                e.stopPropagation();
                onImageClick(project.col2);
              }}
            >
              <img
                src={project.col2}
                alt={project.name}
                loading="lazy"
                className="w-full h-full object-contain p-4 bg-surface/30 hover:scale-102 transition-transform duration-700 select-none"
              />
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export const Projects: React.FC = () => {
  const [lightboxImg, setLightboxImg] = useState<string | null>(null);

  return (
    <>
      <section
        id="projects"
        className="relative bg-bg rounded-t-[24px] sm:rounded-t-[40px] md:rounded-t-[60px] px-6 sm:px-12 md:px-16 lg:px-20 py-16 sm:py-24"
      >
        {/* Title */}
        <div className="max-w-[1200px] mx-auto mb-10 md:mb-16">
          <p className="text-xs uppercase tracking-[0.3em] text-muted mb-2 font-semibold">Portfolio</p>
          <h2 className="font-black text-[clamp(2.5rem,6vw,5.5rem)] leading-none uppercase tracking-tight text-text-primary">
            Projects
          </h2>
        </div>

        {/* Scrolling Sticky Deck */}
        <div className="max-w-[1200px] mx-auto flex flex-col gap-16 md:gap-24 relative">
          {projectsList.map((project, idx) => (
            <ProjectCard
              key={project.number}
              project={project}
              index={idx}
              onImageClick={setLightboxImg}
            />
          ))}
        </div>
      </section>

      {/* Lightbox Zoom Portal */}
      <Lightbox image={lightboxImg} onClose={() => setLightboxImg(null)} />
    </>
  );
};
