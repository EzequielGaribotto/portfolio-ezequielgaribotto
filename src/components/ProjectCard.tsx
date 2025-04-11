"use client";

import Link from "next/link";
import Image from "next/image";
import { useTranslation } from "../context/TranslationContext";
import { Project } from "../models/Project";
import { FaGooglePlay } from "react-icons/fa"; // Import Play Store icon

interface ProjectCardProps {
  project: Project;
}

export default function ProjectCard({ project }: ProjectCardProps) {
  const { t } = useTranslation();

  return (
    <div className="group block rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow bg-foreground text-background p-4">
      {/* Main Project Link */}
      <Link
        href={`/projects/${project.shortName}`}
        className="flex flex-col items-center text-center"
      >
        {project.image ? (
          <Image
            src={project.image}
            alt={t(project.titleKey)}
            width={300}
            height={200}
            className="rounded-lg mb-4 group-hover:scale-105 transition-transform"
          />
        ) : (
          <div className="w-[300px] h-[200px] bg-red-500 rounded-lg mb-4 flex items-center justify-center text-white">
            {t("projects.noImage")}
          </div>
        )}
        <h3 className="text-xl font-bold group-hover:underline">{t(project.titleKey)}</h3>
        <p className="text-sm mt-2">{t(project.descriptionKey)}</p>
      </Link>

      {/* Links Section */}
      <div className="mt-4 flex space-x-4 justify-center">
        {/* Play Store Link */}
        {project.playStoreLink && (
          <a
            href={project.playStoreLink}
            target="_blank"
            rel="noopener noreferrer"
            className="w-10 h-10 bg-gray-800 hover:bg-gray-700 text-white rounded-full flex items-center justify-center transition-transform transform hover:scale-110"
            onClick={(e) => e.stopPropagation()} // Prevent event propagation
          >
            <FaGooglePlay size={20} className="text-white"/>
          </a>
        )}

        {/* GitHub Repo Link */}
        {project.repoLink && (
          <a
            href={project.repoLink}
            target="_blank"
            rel="noopener noreferrer"
            className="w-10 h-10 bg-gray-800 hover:bg-gray-700 text-white rounded-full flex items-center justify-center transition-transform transform hover:scale-110"
            onClick={(e) => e.stopPropagation()} // Prevent event propagation
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
              fill="white"
              className="w-5 h-5 text-white" 
            >
              <path d="M2 2.5A2.5 2.5 0 0 1 4.5 0h8.75a.75.75 0 0 1 .75.75v12.5a.75.75 0 0 1-.75.75h-2.5a.75.75 0 0 1 0-1.5h1.75v-2h-8a1 1 0 0 0-.714 1.7.75.75 0 1 1-1.072 1.05A2.495 2.495 0 0 1 2 11.5Zm10.5-1h-8a1 1 0 0 0-1 1v6.708A2.486 2.486 0 0 1 4.5 9h8ZM5 12.25a.25.25 0 0 1 .25-.25h3.5a.25.25 0 0 1 .25.25v3.25a.25.25 0 0 1-.4.2l-1.45-1.087a.249.249 0 0 0-.3 0L5.4 15.7a.25.25 0 0 1-.4-.2Z"></path>
            </svg>
          </a>
        )}
      </div>
    </div>
  );
}