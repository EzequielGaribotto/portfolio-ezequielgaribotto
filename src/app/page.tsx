"use client";

import ProfileSection from "../components/ProfileSection";
import ProjectsSection from "../components/ProjectsSection";

export default function Home() {
  return (
    <div className="container">
      <ProfileSection />
      <ProjectsSection />
    </div>
  );
}