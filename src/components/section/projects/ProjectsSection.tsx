"use client";
import LazyProjectCard from "./card/LazyProjectCard";
import { useTranslation } from "../../../context/TranslationContext";
import { Project } from "../../../models/Project";
import styles from './ProjectsSection.module.css';
import Section from "../Section";

export default function ProjectsSection() {
  const { t } = useTranslation();

  const eulixTech = ["Android", "Retrofit", "DataBinding", "MVVM", "XML", "Kotlin DSL", "LiveData", "Git"];
  const neutralNewsTech = ["Python", "ETL", "PNL", "AI/ML", "Web Scraping", "Cloud", "Docker", "Pandas", "NoSQL"];
  const compTech = ["Java", "Algorithms", "Data Structures", "Problem Solving"];
  const apiListTech = ["Java", "Caching", "Coroutines", "Android SDK"];

  const projects: Project[] = [
    {
      id: "neutral-news",
      title: t("projects.neutralNews.title"),
      description: t("projects.neutralNews.description"),
      footer: t("projects.neutralNews.footer"),
      startDate: t("projects.neutralNews.startDate"),
      endDate: null,
      image: "/images/projects/neutral-news-homeview.webp",
      technologies: neutralNewsTech,
      repoLink: "https://github.com/EzequielGaribotto/neutral-news-android"
    },
    {
      id: "eulix",
      title: t("projects.eulix.title"),
      description: t("projects.eulix.description"),
      footer: t("projects.eulix.footer"),
      startDate: t("projects.eulix.startDate"),
      endDate: t("projects.eulix.endDate"),
      image: "/images/projects/eulix.webp",
      technologies: eulixTech,
      playStoreLink: "https://play.google.com/store/apps/details?id=com.eulix.mobile.app&hl=en_US",
    },
    {
      id: "competitive-programming",
      title: t("projects.competitiveProgramming.title"),
      description: t("projects.competitiveProgramming.description"),
      footer: t("projects.competitiveProgramming.footer"),
      startDate: t("projects.competitiveProgramming.startDate"),
      endDate: null,
      image: "/images/projects/competitive.webp",
      technologies: compTech,
      repoLink: "https://github.com/EzequielGaribotto/CompetitiveProgramming",
      programameLink: "https://programame.com/2024/nac/",
    },
    {
      id: "rick-and-morty-api-list",
      title: t("projects.rickAndMorty.title"),
      description: t("projects.rickAndMorty.description"),
      footer: t("projects.rickAndMorty.footer"),
      startDate: t("projects.rickAndMorty.startDate"),
      endDate: t("projects.rickAndMorty.endDate"),
      image: "/images/projects/api-list.webp",
      technologies: apiListTech,
      repoLink: "https://github.com/EzequielGaribotto/Ricky-and-Morty-API",
    },
  ];

  return (
    <Section
      id="projects"
      title={t("projects.title")}
    >
      <div style={{ width: '100%' }}>
        <div className={styles.masonryGrid}>
          {projects.map((project) => (
            <div key={project.id} className={styles.masonryItem}>
              <LazyProjectCard project={project} />
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
}
