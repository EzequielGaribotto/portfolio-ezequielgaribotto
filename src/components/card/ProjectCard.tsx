"use client";

import Link from "next/link";
import { FaExpand, FaCompress, FaTrophy, FaGooglePlay, FaGamepad } from "../../utils/icons";import { useState, useRef } from "react";
import { useTranslation } from "../../context/TranslationContext";
import { Project } from "../../models/Project";
import ClickableButton from "../button/ClickableButton";
import OptimizedImage from '../OptimizedImage';

interface ProjectCardProps {
  project: Project;
}

export default function ProjectCard({ project }: ProjectCardProps) {
  const { t } = useTranslation();
  const fallbackImage = "/images/projects/fallback.jpg";
  const [isExpanded, setIsExpanded] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  const toggleExpand = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsExpanded(!isExpanded);
  };

  return (
    <div 
      ref={cardRef} 
      className={`project-card bg-secondary text-foreground border border-secondary-hover rounded-lg shadow-md p-4 hover:shadow-lg transition-all duration-500 ease-in-out ${isExpanded ? 'project-expanded' : ''}`}
    >
      <Link href={`/projects/${project.shortName}`} className="project-link">
        <h3 className="project-title text-lg font-bold mt-4 text-foreground">
          {t(project.titleKey)}
        </h3>
        
        {/* Project date display */}
        {project.startDateKey && (
          <div className="project-date text-xs text-foreground/70 font-semibold uppercase mb-2">
            {t(project.startDateKey)} {project.endDateKey ? `- ${t(project.endDateKey)}` : `- ${t("projects.current")}`}
          </div>
        )}
        
        <p className="project-description text-sm mt-2 text-foreground">
          {t(project.descriptionKey)}
        </p>
      </Link>
      
      <div className="project-image-container">
        <button 
          className="expand-control" 
          onClick={toggleExpand} 
          aria-label={isExpanded ? "Collapse image" : "Expand image"}
        >
          {isExpanded ? <FaCompress size={16} /> : <FaExpand size={16} />}
        </button>
        <div 
          className={`project-image-wrapper transform ${isExpanded ? 'expanded scale-100' : 'scale-95'}`}
          style={{ 
            height: isExpanded ? 'auto' : '200px',
            maxHeight: isExpanded ? '2000px' : '200px',
            transition: 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)'
          }}
        >
          <OptimizedImage
            src={project.image || fallbackImage}
            alt={t(project.titleKey) || "Project image"}
            width={600}
            height={isExpanded ? 800 : 400}
            className={`rounded-lg cursor-pointer transition-all duration-500 ease-in-out transform ${
              isExpanded ? 'object-contain h-auto w-full scale-100' : 'object-cover h-[200px] scale-95'
            }`}
            loading={isExpanded ? "eager" : "lazy"}
            sizes={isExpanded 
              ? "(max-width: 640px) 95vw, (max-width: 768px) 90vw, 800px" 
              : "(max-width: 640px) 95vw, (max-width: 768px) 45vw, 400px"}
            quality={isExpanded ? 90 : 75}
          />
        </div>
      </div>

      <div className="project-links flex justify-start mt-4 space-x-2">
        {project.programameLink && (
          <ClickableButton
            href={project.programameLink}
            className="social-icon github bg-blue-600 text-white hover:bg-blue-500 transition-all duration-300 ease-in-out"
          >
            <FaTrophy size={20} />
          </ClickableButton>
        )}
        {project.arcadeLink && (
          <ClickableButton
            href={project.arcadeLink}
            className="social-icon github bg-orange-500 text-white hover:bg-orange-400 transition-all duration-300 ease-in-out"
          >
            <FaGamepad size={20} />
          </ClickableButton>
        )}
        {project.playStoreLink && (
          <ClickableButton
            href={project.playStoreLink}
            className="social-icon github bg-black text-white hover:bg-gray-800 transition-all duration-300 ease-in-out"
          >
            <FaGooglePlay size={20} />
          </ClickableButton>
        )}
        {project.repoLink && (
          <ClickableButton
            href={project.repoLink}
            className="social-icon github bg-gray-800 text-white hover:bg-gray-700 flex items-center justify-center transform hover:scale-110 transition-all duration-300 ease-in-out"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
              fill="currentColor"
              className="w-5 h-5"
            >
              <path d="M2 2.5A2.5 2.5 0 0 1 4.5 0h8.75a.75.75 0 0 1 .75.75v12.5a.75.75 0 0 1-.75.75h-2.5a.75.75 0 0 1 0-1.5h1.75v-2h-8a1 1 0 0 0-.714 1.7.75.75 0 1 1-1.072 1.05A2.495 2.495 0 0 1 2 11.5Zm10.5-1h-8a1 1 0 0 0-1 1v6.708A2.486 2.486 0 0 1 4.5 9h8ZM5 12.25a.25.25 0 0 1 .25-.25h3.5a.25.25 0 0 1 .25.25v3.25a.25.25 0 0 1-.4.2l-1.45-1.087a.249.249 0 0 0-.3 0L5.4 15.7a.25.25 0 0 1-.4-.2Z"></path>
            </svg>
          </ClickableButton>
        )}
      </div>
    </div>
  );
}