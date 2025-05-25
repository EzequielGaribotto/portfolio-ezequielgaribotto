"use client";
import React from "react";
import Section from "../Section";
import styles from "./ExperienceSection.module.css";
import { useTranslation } from "../../../context/TranslationContext";
import Image from 'next/image';
import { Experience } from "../../../models/Experience";

const ExperienceSection: React.FC = () => {
  const { t } = useTranslation();

  // Define the technologies as constants, similar to TrainingSection
  const telusTech = ["English", "JSON", "Data Analysis", "Data Classification", "Digital Competence"];
  const eulixTech = ["Android", "XML", "API Integration", "Gradle", "AI/ML Integration", "Front-End", "Data Binding", "Android Jetpack", "Retrofit", "Kotlin DSL", "LiveData", "Android SDK", "Git"]; // Ensure this is an array

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
    <Section
      id="experience"
      title={t("experiences.title")}
      titleAlign="center"
      maxWidth="1200px" // Match projects section width
    >
      <div className={styles.experienceList}>
        {experiences.map((exp) => (
          <div key={exp.id} className={styles.experienceItem}>
            <div className={styles.experienceHeader}>
              {exp.imageUrl && (
                <Image
                  src={exp.imageUrl}
                  alt={`${exp.company} logo`}
                  width={500}
                  height={300}
                  className={styles.companyLogo}
                />
              )}
              <div style={{ textAlign: 'left', width: '100%' }}>
                <h3 className={styles.company}>
                  {exp.companyUrl ? (
                    <a
                      href={exp.companyUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {exp.company}
                    </a>
                  ) : (
                    exp.company
                  )}
                </h3>
                <h4 className={styles.position}>{exp.position}</h4>
              </div>
            </div>
            <div className={styles.metaInfo}>
              <p className={styles.period}>{exp.period}</p>
              <p className={styles.location}>{exp.location}</p>
            </div>
          <div style={{ textAlign: 'left', whiteSpace: 'pre-line' }}>
            {exp.description}
          </div>
          
          <div className={styles.technologies}>
              {exp.technologies.map((tech, index) => (
                <span key={index} className={styles.tech}>
                  {tech}
                </span>
              ))}
            </div>
        </div>
        ))}
      </div>
    </Section>
  );
};

export default ExperienceSection;
