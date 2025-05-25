"use client";

import ProfileSection from "../components/section/profile/ProfileSection";
import ProjectsSection from "../components/section/projects/ProjectsSection";
import ExperienceSection from "../components/section/experience/ExperienceSection";
import TrainingSection from "../components/section/training/TrainingSection";

export default function Home() {
  return (
    <div className="centered-container" style={{ width: '100%', maxWidth: '100%' }}>
      <ProfileSection />
      <ProjectsSection />
      <ExperienceSection />
      <TrainingSection />
    </div>
  );
}