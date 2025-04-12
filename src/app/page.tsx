"use client";

import ProfileSection from "../components/section/ProfileSection";
import ProjectsSection from "../components/section/ProjectsSection";

export default function Home() {
  return (
    <div className="container">
      <ProfileSection />
      <ProjectsSection />
    </div>
  );
}