"use client";
import React from "react";
import Section from "../Section";
import { useTranslation } from "../../../context/TranslationContext";
import { Experience } from "../../../models/Experience";
import { formatExperiencePeriod } from "../../../utils/dateHelpers";
import CardItem from "../../common/CardItem";
import CardList from "../../common/CardList";
import styles from "./ExperienceSection.module.css";

const ExperienceSection: React.FC = () => {
  const { t, locale } = useTranslation();

  const experiences: Experience[] = [
    {
      id: "prostring",
      company: t("experiences.prostring.company"),
      position: t("experiences.prostring.position"),
      startDate: new Date(2026, 4),
      endDate: null,
      location: t("experiences.prostring.location"),
      description: t("experiences.prostring.description"),
      technologies: [
        "Applied AI",
        "Agentic AI",
        "Agentic Development",
        "Data Engineering",
        "Agent Harness",
        "MCP",
        "Claude Code",
        "Subagents",
        "Vue 3",
        "TypeScript",
        "Back-end",
        "Front-end",
        "Supabase",
        "PostgreSQL",
        "PL/pgSQL",
        "Edge Functions",
        "Deno",
        "Serverless",
        "RPC",
        "Row Level Security",
        "RBAC",
        "MFA",
        "Multi-tenant",
        "SaaS",
        "Stripe",
        "Invoicing",
        "pg_cron",
        "Realtime",
        "Pinia",
        "Vite",
        "Playwright",
        "Vitest",
        "GitHub Actions",
        "CI/CD",
        "Zod",
        "ECharts",
        "ESC/POS",
        "QZ Tray",
        "i18n",
        "UX",
        "UI",
        "CSS",
        "SQL",
        "Data Processing",
        "Git",
      ],
      imageUrl: "/images/companies/prostring_logo.webp",
      companyUrl: "https://prostringmanage.com/",
    },
    {
      id: "seidor",
      company: t("experiences.seidor.company"),
      position: t("experiences.seidor.position"),
      startDate: new Date(2025, 7),
      endDate: new Date(2025, 9),
      location: t("experiences.seidor.location"),
      description: t("experiences.seidor.description"),
      technologies: [
        "Apex",
        "Postman",
        "Lightning Web Components",
        "Salesforce.com",
        "CRM",
      ],
      imageUrl: "/images/companies/seidor_logo.webp",
      companyUrl: "https://www.seidor.com/en-es",
    },
    {
      id: "eulix",
      company: t("experiences.eulix.company"),
      position: t("experiences.eulix.position"),
      startDate: new Date(2024, 9),
      endDate: new Date(2025, 3),
      location: t("experiences.eulix.location"),
      description: t("experiences.eulix.description"),
      technologies: [
        "Android",
        "XML",
        "API Integration",
        "Gradle",
        "AI/ML Integration",
        "Front-End",
        "Data Binding",
        "Android Jetpack",
        "Retrofit",
        "Kotlin DSL",
        "LiveData",
        "Android SDK",
        "Git",
        "Agile",
        "Scrum",
        "UI/UX Design",
      ],
      imageUrl: "/images/companies/eulix_logo.webp",
      companyUrl:
        "https://play.google.com/store/apps/details?id=com.eulix.mobile.app&hl=en_US",
    },
    {
      id: "telus",
      company: t("experiences.telus.company"),
      position: t("experiences.telus.position"),
      startDate: new Date(2023, 6),
      endDate: new Date(2025, 0),
      location: t("experiences.telus.location"),
      description: t("experiences.telus.description"),
      technologies: [
        "English",
        "JSON",
        "Data Analysis",
        "Data Classification",
        "Digital Competence",
      ],
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
            period={formatExperiencePeriod(exp.startDate, exp.endDate, locale)}
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
