"use client";

import ProjectCard from "./ProjectCard";
import { useTranslation } from "../context/TranslationContext";
import { Project } from "../models/Project";

const projects: Project[] = [
  {
    id: "neutral-news",
    shortName: "neutral-news",
    image: "/images/projects/neutral-news.jpg",
    titleKey: "projectTitles.neutral-news",
    descriptionKey: "projectDescriptions.neutral-news",
    playStoreLink: "https://play.google.com/store/apps/details?id=com.eulix.mobile.app&hl=en_US",
  },
  {
    id: "eulix",
    shortName: "eulix-app",
    image: "/images/projects/eulix.jpg",
    titleKey: "projectTitles.eulix",
    descriptionKey: "projectDescriptions.eulix",
    playStoreLink: "https://play.google.com/store/apps/details?id=com.eulix.mobile.app&hl=en_US",
  },
  {
    id: "zomb",
    shortName: "zomb-game",
    image: "/images/projects/zomb-game.jpg",
    titleKey: "projectTitles.zomb",
    descriptionKey: "projectDescriptions.zomb",
    repoLink: "https://github.com/EzequielGaribotto/zomb",
  },
  {
    id: "competitive-programming",
    shortName: "competitive",
    image: "/images/projects/competitive.jpg",
    titleKey: "projectTitles.competitive-programming",
    descriptionKey: "projectDescriptions.competitive-programming",
    repoLink: "https://github.com/EzequielGaribotto/CompetitiveProgramming",
  },
  {
    id: "m08-p4-maps-app",
    shortName: "maps-app",
    image: "/images/projects/maps-app.jpg",
    titleKey: "projectTitles.m08-p4-maps-app",
    descriptionKey: "projectDescriptions.m08-p4-maps-app",
    repoLink: "https://github.com/EzequielGaribotto/M08-P4-MapsApp",
  },
  {
    id: "trivial-app-jetpack-compose",
    shortName: "trivial-app",
    image: "/images/projects/trivial-app.jpg",
    titleKey: "projectTitles.trivial-app-jetpack-compose",
    descriptionKey: "projectDescriptions.trivial-app-jetpack-compose",
    repoLink: "https://github.com/EzequielGaribotto/TrivialApp-Jetpack-Compose-Kotlin",
  },
];

export default function ProjectsSection() {
  const { t } = useTranslation();

  return (
    <section className="projects-section">
      <h2 className="section-title text-foreground">{t("projects.myprojects")}</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
        {projects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
    </section>
  );
}
