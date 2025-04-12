"use client";

import Link from "next/link";
import Image from "next/image";
import { useTranslation } from "../context/TranslationContext";
import { Project } from "../models/Project";
import { FaGooglePlay } from "react-icons/fa";

interface ProjectCardProps {
  project: Project;
}

export default function ProjectCard({ project }: ProjectCardProps) {
  const { t } = useTranslation();

  return (
    <div className="project-card bg-white border border-gray-300 rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow">
      <Link href={`/projects/${project.shortName}`} className="project-link">
        {project.image ? (
          <Image
            src={project.image}
            alt={t(project.titleKey)}
            width={300}
            height={200}
            className="project-image rounded-t-lg"
          />
        ) : (
          <div className="project-placeholder text-center text-gray-500 py-10">
            {t("projects.noImage")}
          </div>
        )}
        <h3 className="project-title text-lg font-bold mt-4">{t(project.titleKey)}</h3>
        <p className="project-description text-sm text-gray-600 mt-2">
          {t(project.descriptionKey)}
        </p>
      </Link>
      <div className="project-links flex justify-end mt-4 space-x-2">
        {project.playStoreLink && (
          <a
            href={project.playStoreLink}
            target="_blank"
            rel="noopener noreferrer"
            className="social-icon github bg-gray-800 text-white p-2 rounded-full hover:bg-gray-700 transition"
            onClick={(e) => e.stopPropagation()}
          >
            <FaGooglePlay size={20} />
          </a>
        )}
        {project.repoLink && (
          <a
            href={project.repoLink}
            target="_blank"
            rel="noopener noreferrer"
            className="social-icon github bg-gray-800 text-white p-2 rounded-full hover:bg-gray-700 transition"
            onClick={(e) => e.stopPropagation()}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
              fill="white"
              className="w-5 h-5"
            >
              <path d="M2 2.5A2.5 2.5 0 0 1 4.5 0h8.75a.75.75 0 0 1 .75.75v12.5a.75.75 0 0 1-.75.75h-2.5a.75.75 0 0 1 0-1.5h1.75v-2h-8a1 1 0 0 0-.714 1.7.75.75 0 1 1-1.072 1.05A2.495 2.495 0 0 1 2 11.5Zm10.5-1h-8a1 1 0 0 0-1 1v6.708A2.486 2.486 0 0 1 4.5 9h8ZM5 12.25a.25.25 0 0 1 .25-.25h3.5a.25.25 0 0 1 .25.25v3.25a.25.25 0 0 1-.4.2l-1.45-1.087a.249.249 0 0 0-.3 0L5.4 15.7a.25.25 0 0 1-.4-.2Z"></path>
            </svg>
          </a>
        )}
      </div>
    </div>
  );
}