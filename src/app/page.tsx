"use client";

import ProfileSection from "../components/section/profile/ProfileSection";
import ProjectsSection from "../components/section/projects/ProjectsSection";
import ExperienceSection from "../components/section/experience/ExperienceSection";
import TrainingSection from "../components/section/training/TrainingSection";

export default function Home() {
  return (
    <div className="centered-container">
      <ProfileSection />
      <div style={{ width: '100%', maxWidth: '1200px' }}>
        <ProjectsSection />
      </div>
      <ExperienceSection />
      <TrainingSection />
    </div>
  );
}