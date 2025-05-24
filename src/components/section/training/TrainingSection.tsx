"use client";
import React from "react";
import Section from "../Section";
import styles from "./TrainingSection.module.css";
import { useTranslation } from "../../../context/TranslationContext";
import Image from 'next/image';

interface Training {
  id: string;
  institution: string;
  course: string;
  period: string;
  location: string;
  description: string;
  technologies?: string[];
  imageUrl?: string;
  companyUrl?: string;
}

const TrainingSection: React.FC = () => {
  const { t } = useTranslation();

  const trainings: Training[] = [
    {
      id: "itb",
      institution: t("trainings.itb.institution"),
      course: t("trainings.itb.course"),
      period: t("trainings.itb.period"),
      location: t("trainings.itb.location"),
      description: t("trainings.itb.description"),
      technologies: t("trainings.itb.technologies") ? t("trainings.itb.technologies").split(",") : [],
      imageUrl: "/images/institutions/itb_logo.jpeg",
    },
    {
      id: "rb4",
      institution: t("trainings.rb4.institution"),
      course: t("trainings.rb4.course"),
      period: t("trainings.rb4.period"),
      location: t("trainings.rb4.location"),
      description: t("trainings.rb4.description"),
      technologies: t("trainings.rb4.technologies") ? t("trainings.rb4.technologies").split(",") : [],
      imageUrl: "/images/institutions/rb4_logo.png",
    },
  ];

  return (
    <Section
      id="experience"
      title={t("experience.title")}
      titleAlign="center"
    >
      <div className={styles.trainingList}>
        {trainings.map((exp) => (
          <div key={exp.id} className={styles.trainingItem}>
            <div className={styles.trainingHeader}>
              {exp.imageUrl && (
                <Image
                  src={exp.imageUrl}
                  alt={`${exp.institution} logo`}
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
                      {exp.institution}
                    </a>
                  ) : (
                    exp.institution
                  )}
                </h3>
                <h4 className={styles.position}>{exp.course}</h4>
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

export default TrainingSection;
