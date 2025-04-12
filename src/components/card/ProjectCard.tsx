"use client";

import Link from "next/link";
import { FaExpand, FaCompress, FaTrophy, FaGooglePlay, FaGamepad } from "../../utils/icons";
import { useState, useRef, useEffect } from "react";
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
  const overlayRef = useRef<HTMLDivElement>(null);
  
  // Handle escape key to close expanded image
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isExpanded) {
        setIsExpanded(false);
      }
    };
    
    if (isExpanded) {
      document.body.style.overflow = 'hidden'; // Prevent scrolling when expanded
      window.addEventListener('keydown', handleEscape);
    } else {
      document.body.style.overflow = '';
    }
    
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleEscape);
    };
  }, [isExpanded]);
  
  // Handle clicks outside the expanded image to close it
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (overlayRef.current && !overlayRef.current.contains(e.target as Node) && isExpanded) {
        setIsExpanded(false);
      }
    };
    
    if (isExpanded) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isExpanded]);

  const toggleExpand = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    setIsExpanded(!isExpanded);
  };

  return (
    <>
      <div 
        ref={cardRef} 
        className="project-card bg-secondary text-foreground border border-secondary-hover rounded-lg shadow-md p-4 hover:shadow-lg transition-all duration-500 ease-in-out"
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
        
        <div className="project-image-container mt-3">
          <div className="project-image-wrapper">
            <button 
              className="expand-control" 
              onClick={toggleExpand} 
              aria-label="Expand image"
            >
              <FaExpand size={16} />
            </button>
            <OptimizedImage
              src={project.image || fallbackImage}
              alt={t(project.titleKey) || "Project image"}
              width={600}
              height={400}
              className="rounded-lg cursor-pointer"
              loading="lazy"
              sizes="(max-width: 640px) 95vw, (max-width: 768px) 45vw, 600px"
              quality={75}
              onClick={toggleExpand}
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
      
      {/* Modal-like expanded image overlay */}
      <div className={`expanded-backdrop ${isExpanded ? 'active' : ''}`}></div>
      <div 
        ref={overlayRef}
        className={`expanded-image-overlay ${isExpanded ? 'active' : ''}`}
        style={{ 
          overflow: 'hidden',
          boxSizing: 'border-box'
        }}
      >
        <button 
          className="expand-control" 
          onClick={() => setIsExpanded(false)} 
          aria-label="Close expanded image"
          style={{ position: 'absolute', top: '10px', right: '10px', zIndex: 101 }}
        >
          <FaCompress size={16} />
        </button>
        {isExpanded && (
          <div className="w-full flex justify-center items-center">
            <OptimizedImage
              src={project.image || fallbackImage}
              alt={t(project.titleKey) || "Project image"}
              width={1920}
              height={1080}
              className="rounded-lg object-contain"
              style={{ 
                maxWidth: '100%', 
                width: 'auto', 
                maxHeight: '75vh', 
                height: 'auto',
                margin: '0 auto',
                display: 'block'
              }}
              loading="eager"
              sizes="(max-width: 1200px) 90vw, 1080px"
              quality={100}
              priority
            />
          </div>
        )}
      </div>
    </>
  );
}