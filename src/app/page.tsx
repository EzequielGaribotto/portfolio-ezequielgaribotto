"use client";

import ProfileSection from "../components/section/profile/ProfileSection";
import ProjectsSection from "../components/section/projects/ProjectsSection";
import ExperienceSection from "../components/section/experience/ExperienceSection";
import TrainingSection from "../components/section/training/TrainingSection";
import ContactSection from "../components/section/contact/ContactSection";
// import GamingSection from "../components/section/gaming/GamingSection";
import { useTranslation } from "../context/TranslationContext";

export default function Home() {
  const { isHydrated } = useTranslation();

  // Add minimal opacity during hydration to avoid flicker
  const style = {
    width: '100%', 
    maxWidth: '100%',
    opacity: isHydrated ? 1 : 0.98,
    transition: 'opacity 300ms ease-in'
  };

  return (
    <div className="centered-container" style={style}>
      <ProfileSection />
      <ProjectsSection />
      <ExperienceSection />
      <TrainingSection />
      <ContactSection />
      {/* <GamingSection /> */}
    </div>
  );
}