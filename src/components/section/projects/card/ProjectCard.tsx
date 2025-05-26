"use client";

import { FaExpand, FaCompress, FaTrophy, FaGooglePlay, FaNewspaper, FaFilm, FaCode, FaListAlt } from "../../../../utils/icons";
import { useState, useRef, useEffect } from "react";
import { useTranslation } from "../../../../context/TranslationContext";
import { Project } from "../../../../models/Project";
import ClickableButton from "../../../button/ClickableButton";
import OptimizedImage from '../../../OptimizedImage';

interface ProjectCardProps {
  project: Project;
}

export default function ProjectCard({ project }: ProjectCardProps) {
  const { t, theme } = useTranslation();
  const fallbackImage = "/images/projects/fallback.webp";
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
      // Hide header when image is expanded
      const header = document.querySelector('header');
      if (header) header.style.display = 'none';
      
      window.addEventListener('keydown', handleEscape);
    } else {
      document.body.style.overflow = '';
      // Show header when image is closed
      const header = document.querySelector('header');
      if (header) header.style.display = '';
    }
    
    return () => {
      document.body.style.overflow = '';
      // Ensure header is visible when component unmounts
      const header = document.querySelector('header');
      if (header) header.style.display = '';
      
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

  // Prevent navigation when clicking on text content
  const handleTextClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
  };

  // Function to get the appropriate icon based on project ID
  const getProjectIcon = () => {
    switch (project.id) {
      case 'neutral-news':
        return <FaNewspaper className="mr-2 text-primary" />;
      case 'eulix':
        return <FaFilm className="mr-2 text-primary" />;
      case 'competitive-programming':
        return <FaCode className="mr-2 text-primary" />;
      case 'rick-and-morty-api-list':
        return <FaListAlt className="mr-2 text-primary" />;
      default:
        return null;
    }
  };

  return (
    <>
      <div 
        ref={cardRef} 
        className="project-card bg-secondary text-foreground border border-secondary-hover rounded-lg shadow-md p-4 hover:shadow-lg"
        style={{ 
          opacity: 0.9, 
          // Use CSS variables for consistent transition timing
          transition: "opacity var(--theme-transition-duration) var(--theme-transition-timing), box-shadow var(--theme-transition-duration) var(--theme-transition-timing), border-color var(--theme-transition-duration) var(--theme-transition-timing)",
        }}
        onMouseOver={(e) => { 
          e.currentTarget.style.opacity = "1";
          // Removed transform scale
          e.currentTarget.style.boxShadow = "0 10px 25px rgba(0, 0, 0, 0.25)"; // Enhanced shadow
          e.currentTarget.style.borderColor = "var(--primary)";
        }}
        onMouseOut={(e) => { 
          e.currentTarget.style.opacity = "0.9";
          // Removed transform scale reset
          e.currentTarget.style.boxShadow = "";
          e.currentTarget.style.borderColor = "";
        }}
      >
        <div onClick={handleTextClick}>
          <h3 className="project-title text-lg font-bold flex items-center" 
              style={{ 
                color: 'var(--project-title)', 
                textAlign: 'left',
                justifyContent: 'flex-start'
              }}>
            {getProjectIcon()}
            {project.title}
          </h3>
          <p className="project-description text-sm mt-2 text-foreground">
            {project.description}
          </p>

          {project.startDate && (
            <div className="project-date text-xs text-foreground/70 mb-2">
              {project.startDate} {project.endDate ? 
                `- ${project.endDate}` : 
                `- ${t("projects.current")}`}
            </div>
          )}
        </div>
        
        <div className="project-image-container mt-3">
          <div className="project-image-wrapper">
            <button 
              className="expand-control" 
              onClick={toggleExpand} 
              aria-label={t("tooltips.expandImage")}
            >
              <FaExpand size={16} />
            </button>
            <OptimizedImage
              src={project.image || fallbackImage}
              alt={project.title || "Project image"}
              width={600}
              height={400}
              className="rounded-lg cursor-pointer"
              loading="lazy"
              sizes="(max-width: 640px) 95vw, (max-width: 768px) 45vw, 600px"
              quality={75}
              onClick={toggleExpand}
            />
          </div>
          
          {/* Project footer - added below image */}
          {project.footer && (
            <div className="project-footer text-xs mt-2 text-foreground/80 italic">
              {project.footer}
            </div>
          )}
        </div>

        {/* Technologies */}
        {project.technologies && project.technologies.length > 0 && (
          <div className="technologies mt-3 flex flex-wrap gap-1">
            {project.technologies.map((tech, index) => (
              <span key={index} className="tech bg-tech-bg border border-tech-border text-tech-text text-xs px-2 py-1 rounded-full">
                {tech}
              </span>
            ))}
          </div>
        )}

        <div className="project-links flex mt-4 space-x-2">
          {project.programameLink && (
            <ClickableButton
              href={project.programameLink}
              className={`social-icon ${theme === 'dark' ? 'bg-gray-800 hover:bg-gray-700' : 'bg-blue-400 hover:bg-blue-300'} rounded-full transition-all duration-400`}
              tooltipKey="tooltips.competition"
            >
              <FaTrophy 
                size={20} 
                className="text-white hover:text-primary transition-colors duration-400" 
              />
            </ClickableButton>
          )}
          {project.playStoreLink && (
            <ClickableButton
              href={project.playStoreLink}
              className={`social-icon ${theme === 'dark' ? 'bg-gray-800 hover:bg-gray-700' : 'bg-blue-400 hover:bg-blue-300'} rounded-full transition-all duration-400`}
              tooltipKey="tooltips.playStore"
            >
              <FaGooglePlay 
                size={20} 
                className="text-white hover:text-primary transition-colors duration-400" 
              />
            </ClickableButton>
          )}
          {project.repoLink && (
            <ClickableButton
              href={project.repoLink}
              className={`social-icon ${theme === 'dark' ? 'bg-gray-800 hover:bg-gray-700' : 'bg-blue-400 hover:bg-blue-300'} rounded-full flex items-center justify-center transition-all duration-400`}
              tooltipKey={project.id === "competitive-programming" ? "tooltips.solvedProblems" : "tooltips.sourceCode"}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 16 16"
                fill="currentColor"
                className="w-5 h-5 text-white hover:text-primary transition-colors duration-400"
              >
                <path d="M2 2.5A2.5 2.5 0 0 1 4.5 0h8.75a.75.75 0 0 1 .75.75v12.5a.75.75 0 0 1-.75.75h-2.5a.75.75 0 0 1 0-1.5h1.75v-2h-8a1 1 0 0 0-.714 1.7.75.75 0 1 1-1.072 1.05A2.495 2.495 0 0 1 2 11.5Zm10.5-1h-8a1 1 0 0 0-1 1v6.708A2.486 2.486 0 0 1 4.5 9h8ZM5 12.25a.25.25 0 0 1 .25-.25h3.5a.25.25 0 0 1 .25.25v3.25a.25.25 0 0 1-.4.2l-1.45-1.087a.249.249 0 0 0-.3 0L5.4 15.7a.25.25 0 0 1-.4-.2Z"></path>
              </svg>
            </ClickableButton>
          )}
        </div>
      </div>
      
      {/* Modal-like expanded image overlay */}
      <div className={`expanded-backdrop ${isExpanded ? 'active' : ''}`} onClick={() => setIsExpanded(false)}></div>
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
          aria-label={t("tooltips.closeImage")}
          style={{ position: 'absolute', top: '10px', right: '10px', zIndex: 101 }}
        >
          <FaCompress size={16} />
        </button>
        {isExpanded && (
          <div className="w-full flex justify-center items-center">
            <OptimizedImage
              src={project.image || fallbackImage}
              alt={project.title || "Project image"}
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