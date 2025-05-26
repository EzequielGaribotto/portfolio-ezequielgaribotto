"use client";
import React from "react";
import Section from "../Section";
import { useTranslation } from "../../../context/TranslationContext";
import { Experience } from "../../../models/Experience";
import CardItem from "../../common/CardItem";
import CardList from "../../common/CardList";
import styles from "./ExperienceSection.module.css";

const ExperienceSection: React.FC = () => {
  const { t } = useTranslation();

  // Define the technologies as constants
  const telusTech = ["English", "JSON", "Data Analysis", "Data Classification", "Digital Competence"];
  const eulixTech = ["Android", "XML", "API Integration", "Gradle", "AI/ML Integration", "Front-End", "Data Binding", "Android Jetpack", "Retrofit", "Kotlin DSL", "LiveData", "Android SDK", "Git"];

  const experiences: Experience[] = [
    {
      id: "eulix",
      company: t("experiences.eulix.company"),
      position: t("experiences.eulix.position"),
      period: t("experiences.eulix.period"),
      location: t("experiences.eulix.location"),
      description: t("experiences.eulix.description"),
      technologies: eulixTech,
      imageUrl: "/images/companies/eulix_logo.webp",
      companyUrl:
        "https://play.google.com/store/apps/details?id=com.eulix.mobile.app&hl=en_US",
    },
    {
      id: "telus",
      company: t("experiences.telus.company"),
      position: t("experiences.telus.position"),
      period: t("experiences.telus.period"),
      location: t("experiences.telus.location"),
      description: t("experiences.telus.description"),
      technologies: telusTech,
      imageUrl: "/images/companies/telus_logo.webp",
      companyUrl: "https://www.telus.com/en/digital",
    },
  ];

  return (
    <Section id="experience" title={t("experiences.title")}>
      <CardList>
        {experiences.map((exp) => (
          <CardItem
            key={exp.id}
            id={exp.id}
            title={exp.company}
            subtitle={exp.position}
            period={exp.period}
            location={exp.location}
            description={exp.description}
            technologies={exp.technologies}
            imageUrl={exp.imageUrl}
            linkUrl={exp.companyUrl}
            className={styles.experienceItem}
          />
        ))}
      </CardList>
    </Section>
  );
};

export default ExperienceSection;
