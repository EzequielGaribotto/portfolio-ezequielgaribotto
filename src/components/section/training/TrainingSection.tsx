"use client";
import React from "react";
import Section from "../Section";
import styles from "./TrainingSection.module.css";
import { useTranslation } from "../../../context/TranslationContext";
import Image from 'next/image';
import { Training } from "../../../models/Training";

const TrainingSection: React.FC = () => {
  const { t } = useTranslation();

  // Define the technologies directly from the translations file
  const itbTech = ["Java", "Kotlin", "Python", "Android", "React", "Node.js", "AWS", "Cloud", "SQL", "NoSQL", "Git", "Docker", "CI/CD", "Agile", "Scrum"];
  const upfTech = ["Python", "C++", "MatLab", "Processing", "Collab", "OOP", "Cisco Packet Tracer", "Assembly"];
  const rb4Tech = ["Excel", "Python", "Scratch"];

  const trainings: Training[] = [
    {
      id: "itb",
      institution: t("training.itb.institution"),
      course: t("training.itb.course"),
      period: t("training.itb.period"),
      location: t("training.itb.location"),
      description: t("training.itb.description"),
      technologies: itbTech,
      imageUrl: "/images/institutions/itb_logo.webp",
      institutionUrl: "https://www.itb.cat/",
    },
    {
      id: "upf",
      institution: t("training.upf.institution"),
      course: t("training.upf.course"),
      period: t("training.upf.period"),
      location: t("training.upf.location"),
      description: t("training.upf.description"),
      technologies: upfTech,
      imageUrl: "/images/institutions/upf_logo.webp",
      institutionUrl: "https://www.upf.edu/",
    },
    {
      id: "rb4",
      institution: t("training.rb4.institution"),
      course: t("training.rb4.course"),
      period: t("training.rb4.period"),
      location: t("training.rb4.location"),
      description: t("training.rb4.description"),
      technologies: rb4Tech,
      imageUrl: "/images/institutions/rb4_logo.webp",
      institutionUrl: "https://agora.xtec.cat/iesramonberenguer4/",
    },
  ];

  return (
    <Section
      id="training"
      title={t("training.title")}
      titleAlign="center"
    >
      <div className={styles.trainingList}>
        {trainings.map((training) => (
          <div key={training.id} className={styles.trainingItem}>
            <div className={styles.trainingHeader}>
              {training.imageUrl && (
                <Image
                  src={training.imageUrl}
                  alt={`${training.institution} logo`}
                  width={60}
                  height={60}
                  className={styles.companyLogo}
                />
              )}
              <div>
                <h3 className={styles.company}>
                  {training.institutionUrl ? (
                    <a
                      href={training.institutionUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {training.institution}
                    </a>
                  ) : (
                    training.institution
                  )}
                </h3>
                <h4 className={styles.position}>{training.course}</h4>
              </div>
            </div>
            <div className={styles.metaInfo}>
              <p className={styles.period}>{training.period}</p>
              <p className={styles.location}>{training.location}</p>
            </div>
            <div className={styles.description}>
              {training.description}
            </div>
            
            <div className={styles.technologies}>
              {training.technologies.map((tech, index) => (
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

export default TrainingSection;
