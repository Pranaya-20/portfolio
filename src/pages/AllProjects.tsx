import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { projectsList } from '../sections/Projects';
import type { ProjectData } from '../sections/Projects';

interface ProjectCardProps {
  project: ProjectData;
  index: number;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, delay: index * 0.08, ease: [0.25, 0.1, 0.25, 1] }}
      viewport={{ once: true, margin: "-50px" }}
      className="group relative bg-[#0C0C0C] border-2 border-[#D7E2EA]/20 hover:border-[#D7E2EA]/60 rounded-[30px] sm:rounded-[40px] overflow-hidden transition-colors duration-300 cursor-pointer"
      onClick={() => window.open(project.href, '_blank', 'noopener,noreferrer')}
    >
      <div className="aspect-[4/3] overflow-hidden">
        <img
          src={project.col2}
          alt={project.name}
          loading="lazy"
          className="w-full h-full object-contain object-center bg-[#0C0C0C] rounded-[30px] sm:rounded-[40px] transition-transform duration-700 group-hover:scale-105"
        />
      </div>
      <div className="p-5 md:p-6 flex items-center justify-between gap-4">
        <div className="flex items-center gap-3 min-w-0">
          <span className="font-black text-2xl text-[#D7E2EA]/20 select-none flex-shrink-0">
            {project.number}
          </span>
          <div className="min-w-0">
            <p className="text-[10px] uppercase tracking-widest text-[#D7E2EA]/40 mb-0.5 font-body font-semibold">
              {project.category}
            </p>
            <h3 className="font-display italic text-lg sm:text-xl text-[#D7E2EA] leading-tight truncate">
              {project.name}
            </h3>
          </div>
        </div>
        <a
          href={project.href}
          target="_blank"
          rel="noopener noreferrer"
          onClick={(e) => e.stopPropagation()}
          className="flex-shrink-0 w-9 h-9 rounded-full border border-[#D7E2EA]/30 flex items-center justify-center text-[#D7E2EA]/50 hover:border-[#D7E2EA] hover:text-[#D7E2EA] transition-colors duration-200 text-sm font-body font-bold"
          aria-label={`Open ${project.name}`}
        >
          ↗
        </a>
      </div>
    </motion.div>
  );
};

export const AllProjects: React.FC = () => {
  const navigate = useNavigate();
  const [selectedFilter, setSelectedFilter] = useState("All");

  const filters = ["All", "Research", "NLP & GenAI", "Explainable AI"];

  const filteredProjects = projectsList.filter((project) => {
    if (selectedFilter === "All") return true;
    if (selectedFilter === "Research") {
      return project.category.toLowerCase().includes("research");
    }
    if (selectedFilter === "NLP & GenAI") {
      return project.category.toLowerCase().includes("nlp");
    }
    if (selectedFilter === "Explainable AI") {
      return project.category.toLowerCase().includes("explainable") || project.category.toLowerCase().includes("xai");
    }
    return true;
  });

  return (
    <div className="min-h-screen bg-[#0C0C0C]">
      {/* Sticky Top Header */}
      <div className="sticky top-0 z-50 bg-[#0C0C0C]/80 backdrop-blur-md border-b border-[#D7E2EA]/10">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 md:px-10 h-16 flex items-center justify-between">
          <button
            onClick={() => navigate("/")}
            className="inline-flex items-center gap-2 text-[#D7E2EA]/50 hover:text-[#D7E2EA] transition-colors duration-200 text-sm uppercase tracking-widest font-semibold font-body cursor-pointer"
          >
            <span>←</span> Back
          </button>
          <span className="font-display italic text-[#D7E2EA]/40 text-sm">All Projects</span>
        </div>
      </div>

      {/* Main Body Container */}
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 md:px-10 pt-16 pb-32">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
          className="mb-16 md:mb-20"
        >
          <p className="text-xs uppercase tracking-[0.3em] text-[#D7E2EA]/40 mb-4 font-semibold font-body">
            Portfolio
          </p>
          <h1 className="font-black text-[clamp(3rem,9vw,8rem)] leading-none uppercase tracking-tight text-[#D7E2EA]">
            All<br />Projects
          </h1>
          <p className="mt-6 text-[#D7E2EA]/40 text-sm max-w-md font-body leading-relaxed">
            Every project I've worked on — ML pipelines, RAG engines, computer vision systems, and published research.
          </p>
        </motion.div>

        {/* Filter Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex items-center gap-2 flex-wrap mb-12 font-body"
        >
          {filters.map((filter) => (
            <button
              key={filter}
              onClick={() => setSelectedFilter(filter)}
              className={`rounded-full border px-4 py-1.5 text-xs uppercase tracking-widest transition-colors duration-200 cursor-pointer ${
                selectedFilter === filter
                  ? 'border-[#D7E2EA] text-[#D7E2EA] bg-white/5'
                  : 'border-[#D7E2EA]/20 text-[#D7E2EA]/50 hover:border-[#D7E2EA]/60 hover:text-[#D7E2EA]'
              }`}
            >
              {filter}
            </button>
          ))}
        </motion.div>

        {/* Project Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
          {filteredProjects.map((project, idx) => (
            <ProjectCard
              key={project.number}
              project={project}
              index={idx}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
export default AllProjects;
