"use client";

import ProfileSection from "../components/section/profile/ProfileSection";
import ProjectsSection from "../components/section/projects/ProjectsSection";
import ExperienceSection from "../components/section/experience/ExperienceSection";
import TrainingSection from "../components/section/training/TrainingSection";

export default function Home() {
  return (
    <div className="centered-container" style={{ 
      width: '100%', 
      maxWidth: '100%',
      padding: window.innerWidth <= 768 ? '0.5rem 0' : '2rem' // Reduced from 1rem to 0.5rem
    }}>
      <ProfileSection />
      <ProjectsSection />
      <ExperienceSection />
      <TrainingSection />
    </div>
  );
}