"use client";
import LazyProjectCard from "../card/LazyProjectCard";
import { useTranslation } from "../../context/TranslationContext";
import { Project } from "../../models/Project";

const projects: Project[] = [
  {
    id: "neutral-news",
    shortName: "neutral-news",
    image: "/images/projects/neutral-news-homeview.jpg",
    titleKey: "projectTitles.neutral-news",
    descriptionKey: "projectDescriptions.neutral-news",
    startDateKey: "dates.dec2024",
    endDateKey: null,
    repoLink: "https://github.com/EzequielGaribotto/neutral-news-android"
  },
  {
    id: "eulix",
    shortName: "eulix-app",
    image: "/images/projects/eulix.jpg",
    titleKey: "projectTitles.eulix",
    descriptionKey: "projectDescriptions.eulix",
    startDateKey: "dates.oct2024",
    endDateKey: "dates.apr2025",
    playStoreLink: "https://play.google.com/store/apps/details?id=com.eulix.mobile.app&hl=en_US",
  },
  {
    id: "competitive-programming",
    shortName: "competitive",
    image: "/images/projects/competitive.jpeg",
    titleKey: "projectTitles.competitive-programming",
    descriptionKey: "projectDescriptions.competitive-programming",
    startDateKey: "dates.jan2023",
    endDateKey: "dates.jan2025",
    repoLink: "https://github.com/EzequielGaribotto/CompetitiveProgramming",
    programameLink: "https://programame.com/2024/nac/",
  },

  {
    id: "rick-and-morty-api-list",
    shortName: "api-list",
    image: "/images/projects/api-list.jpg",
    titleKey: "projectTitles.rick-and-morty-api-list",
    descriptionKey: "projectDescriptions.rick-and-morty-api-list",
    startDateKey: "dates.apr2025",
    endDateKey: "dates.apr2025",
    repoLink: "https://github.com/EzequielGaribotto/Ricky-and-Morty-API",
  },


];

export default function ProjectsSection() {
  const { t } = useTranslation();

  return (
    <section className="projects-section mx-auto px-4">
      <h2 className="section-title text-foreground">{t("projects.myprojects")}</h2>
      <div className="masonry-grid">
        {projects.map((project) => (
          <div key={project.id} className="masonry-item">
            <LazyProjectCard project={project} />
          </div>
        ))}
      </div>
    </section>
  );
}
