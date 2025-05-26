"use client";

import { useState, useEffect } from "react";
import ProfileSection from "../components/section/profile/ProfileSection";
import ProjectsSection from "../components/section/projects/ProjectsSection";
import ExperienceSection from "../components/section/experience/ExperienceSection";
import TrainingSection from "../components/section/training/TrainingSection";

export default function Home() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    // Initial check
    checkMobile();
    
    // Add resize listener
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return (
    <div className="centered-container" style={{ 
      width: '100%', 
      maxWidth: '100%',
      padding: isMobile ? '0.5rem 0' : '2rem'
    }}>
      <ProfileSection />
      <ProjectsSection />
      <ExperienceSection />
      <TrainingSection />
    </div>
  );
}