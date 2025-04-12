"use client";

import ProfileSection from "./../components/section/ProfileSection";
import ProjectsSection from "./../components/section/ProjectsSection";
import ExperienceSection from "./../components/section/ExperienceSection";

export default function Home() {
  return (
    <div className="container centered-container">
      <ProfileSection />
      <ProjectsSection />
      <ExperienceSection />
    </div>
  );
}