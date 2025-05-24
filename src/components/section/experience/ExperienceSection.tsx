"use client";
import React from "react";
import Section from "../Section";
import styles from "./ExperienceSection.module.css";
import { useTranslation } from "../../../context/TranslationContext";
import Image from 'next/image';

interface Experience {
  id: string;
  company: string;
  position: string;
  period: string;
  location: string;
  description: string;
  technologies?: string[];
  imageUrl?: string;
  companyUrl?: string;
}

const ExperienceSection: React.FC = () => {
  const { t } = useTranslation();

  const experiences: Experience[] = [
    {
      id: "eulix",
      company: t("experiences.eulix.company"),
      position: t("experiences.eulix.position"),
      period: t("experiences.eulix.period"),
      location: t("experiences.eulix.location"),
      description: t("experiences.eulix.description"),
      technologies: t("experiences.eulix.technologies") as unknown as string[], // Explicitly cast to array
      imageUrl: "/images/companies/eulix_logo.jpeg",
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
      technologies: t("experiences.telus.technologies") as unknown as string[], // Explicitly cast to array
      imageUrl: "/images/companies/telus_logo.png",
    },
  ];

  return (
    <Section
      id="experience"
      title={t("experience.title")}
      titleAlign="center"
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
              <div>
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
          </div>
        ))}
      </div>
    </Section>
  );
};

export default ExperienceSection;
