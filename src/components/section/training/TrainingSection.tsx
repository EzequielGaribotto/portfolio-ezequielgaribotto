"use client";
import React from "react";
import Section from "../Section";
import { useTranslation } from "../../../context/TranslationContext";
import { Training } from "../../../models/Training";
import CardItem from "../../common/CardItem";
import CardList from "../../common/CardList";
import styles from "./TrainingSection.module.css";

const TrainingSection: React.FC = () => {
  const { t } = useTranslation();

  // Define the technologies directly from the translations file
  const itbTech = ["Java", "Kotlin", "Python", "Android", "AWS", "Cloud", "SQL", "NoSQL", "Git", "Docker", "CI/CD", "Agile", "Scrum", "Retrofit", "Ktor", "Machine Learning", "Web Scraping", "scikit-learn", "Pandas", "Numpy", "Scipy", "Keras", "TensorFlow", "PostgreSQL", "MongoDB", "Firebase", "React", "Node.js"];
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
    >
      <CardList>
        {trainings.map((training) => (
          <CardItem
            key={training.id}
            id={training.id}
            title={training.institution}
            subtitle={training.course}
            period={training.period}
            location={training.location}
            description={training.description}
            technologies={training.technologies}
            imageUrl={training.imageUrl}
            linkUrl={training.institutionUrl}
            className={styles.trainingItem}
          />
        ))}
      </CardList>
    </Section>
  );
};

export default TrainingSection;
