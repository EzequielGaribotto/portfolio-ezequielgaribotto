"use client";
import LazyProjectCard from "../card/LazyProjectCard";
import { useTranslation } from "../../context/TranslationContext";
import { Project } from "../../models/Project";

const projects: Project[] = [
  {
    id: "neutral-news",
    shortName: "neutral-news",
    image: "/images/projects/neutral-news.jpg",
    titleKey: "projectTitles.neutral-news",
    descriptionKey: "projectDescriptions.neutral-news",
    startDateKey: "dates.sep2024",
    endDateKey: null,
    playStoreLink: "https://play.google.com/store/apps/details?id=com.eulix.mobile.app&hl=en_US",
  },
  {
    id: "eulix",
    shortName: "eulix-app",
    image: "/images/projects/eulix.jpg",
    titleKey: "projectTitles.eulix",
    descriptionKey: "projectDescriptions.eulix",
    startDateKey: "dates.oct2024",
    endDateKey: null, // Ongoing project
    playStoreLink: "https://play.google.com/store/apps/details?id=com.eulix.mobile.app&hl=en_US",
  },
  {
    id: "zomb",
    shortName: "zomb-game",
    image: "/images/projects/zomb-game.png",
    titleKey: "projectTitles.zomb",
    descriptionKey: "projectDescriptions.zomb",
    startDateKey: "dates.oct2024",
    endDateKey: "dates.nov2024",
    repoLink: "https://github.com/EzequielGaribotto/zomb",
    arcadeLink: "https://ezequielgaribotto.github.io/zomb/",
  },
  {
    id: "competitive-programming",
    shortName: "competitive",
    image: "/images/projects/competitive.jpeg",
    titleKey: "projectTitles.competitive-programming",
    descriptionKey: "projectDescriptions.competitive-programming",
    startDateKey: "dates.jan2023",
    endDateKey: null, // Ongoing project
    repoLink: "https://github.com/EzequielGaribotto/CompetitiveProgramming",
    programameLink: "https://programame.com/2024/nac/",
  },
  {
    id: "m08-p4-maps-app",
    shortName: "maps-app",
    image: "/images/projects/maps-app.jpg",
    titleKey: "projectTitles.m08-p4-maps-app",
    descriptionKey: "projectDescriptions.m08-p4-maps-app",
    startDateKey: "dates.mar2024",
    endDateKey: "dates.jun2024",
    repoLink: "https://github.com/EzequielGaribotto/M08-P4-MapsApp",
  },
  {
    id: "trivial-app-jetpack-compose",
    shortName: "trivial-app",
    image: "/images/projects/trivial-app.jpg",
    titleKey: "projectTitles.trivial-app-jetpack-compose",
    descriptionKey: "projectDescriptions.trivial-app-jetpack-compose",
    startDateKey: "dates.jan2024",
    endDateKey: "dates.feb2024",
    repoLink: "https://github.com/EzequielGaribotto/TrivialApp-Jetpack-Compose-Kotlin",
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
