"use client";
import LazyProjectCard from "./card/LazyProjectCard";
import { useTranslation } from "../../../context/TranslationContext";
import { Project } from "../../../models/Project";
import styles from './ProjectsSection.module.css';

const projects: Project[] = [
  {
    id: "neutral-news",
    shortName: "neutral-news",
    image: "/images/projects/neutral-news-homeview.jpg",
    titleKey: "projectTitles.neutral-news",
    footerKey: "projectFooters.neutral-news",
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
    footerKey: "projectFooters.eulix",
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
    footerKey: "projectFooters.competitive-programming",
    descriptionKey: "projectDescriptions.competitive-programming",
    startDateKey: "dates.sep2023",
    endDateKey: null,
    repoLink: "https://github.com/EzequielGaribotto/CompetitiveProgramming",
    programameLink: "https://programame.com/2024/nac/",
  },

  {
    id: "rick-and-morty-api-list",
    shortName: "api-list",
    image: "/images/projects/api-list.jpg",
    titleKey: "projectTitles.rick-and-morty-api-list",
    footerKey: "projectFooters.rick-and-morty-api-list",
    descriptionKey: "projectDescriptions.rick-and-morty-api-list",
    startDateKey: "dates.apr2025",
    endDateKey: "dates.apr2025",
    repoLink: "https://github.com/EzequielGaribotto/Ricky-and-Morty-API",
  },


];

export default function ProjectsSection() {
  const { t } = useTranslation();

  return (
    <section id="projects" className={styles.projectsSection}>
      <h2 className={styles.sectionTitle}>{t("projects.myprojects")}</h2>
      <div className={styles.masonryGrid}>
        {projects.map((project) => (
          <div key={project.id} className={styles.masonryItem}>
            <LazyProjectCard project={project} />
          </div>
        ))}
      </div>
    </section>
  );
}
