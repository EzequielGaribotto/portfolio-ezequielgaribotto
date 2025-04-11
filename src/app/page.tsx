"use client";

import ProjectCard from "../components/ProjectCard";
import { useTranslation } from "../context/TranslationContext";
import Image from "next/image";
import { FaGithub, FaLinkedin, FaGooglePlay } from "react-icons/fa"; // Import Play Store icon
import { Project } from "../models/Project";

const projects: Project[] = [
  {
    id: "neutral-news",
    shortName: "neutral-news",
    image: "/images/projects/neutral-news.jpg",
    titleKey: "projectTitles.neutral-news",
    descriptionKey: "projectDescriptions.neutral-news",
    playStoreLink: "https://play.google.com/store/apps/details?id=com.eulix.mobile.app&hl=en_US", // Placeholder link
  },
  {
    id: "eulix",
    shortName: "eulix-app",
    image: "/images/projects/eulix.jpg",
    titleKey: "projectTitles.eulix",
    descriptionKey: "projectDescriptions.eulix",
    playStoreLink: "https://play.google.com/store/apps/details?id=com.eulix.mobile.app&hl=en_US", // Actual link
  },
  {
    id: "zomb",
    shortName: "zomb-game",
    image: "/images/projects/zomb-game.jpg",
    titleKey: "projectTitles.zomb",
    descriptionKey: "projectDescriptions.zomb",
    repoLink: "https://github.com/EzequielGaribotto/zomb",
  },
  {
    id: "competitive-programming",
    shortName: "competitive",
    image: "/images/projects/competitive.jpg",
    titleKey: "projectTitles.competitive-programming",
    descriptionKey: "projectDescriptions.competitive-programming",
    repoLink: "https://github.com/EzequielGaribotto/CompetitiveProgramming",
  },
  {
    id: "m08-p4-maps-app",
    shortName: "maps-app",
    image: "/images/projects/maps-app.jpg",
    titleKey: "projectTitles.m08-p4-maps-app",
    descriptionKey: "projectDescriptions.m08-p4-maps-app",
    repoLink: "https://github.com/EzequielGaribotto/M08-P4-MapsApp",
  },
  {
    id: "trivial-app-jetpack-compose",
    shortName: "trivial-app",
    image: "/images/projects/trivial-app.jpg",
    titleKey: "projectTitles.trivial-app-jetpack-compose",
    descriptionKey: "projectDescriptions.trivial-app-jetpack-compose",
    repoLink: "https://github.com/EzequielGaribotto/TrivialApp-Jetpack-Compose-Kotlin",
  },
];

export default function Home() {
  const { t } = useTranslation();

  const profileImage = "/images/profile/ezequiel-garibotto.png"; // Replace with your actual profile image path

  return (
    <div className="flex flex-col items-center p-8 sm:p-20">
      {/* Profile Section */}
      <section className="flex flex-col items-center bg-white shadow-lg rounded-lg p-8 sm:p-12 mb-12 max-w-4xl w-full">
        {/* Profile Image */}
        <div className="w-[150px] h-[150px] sm:w-[200px] sm:h-[200px] rounded-full overflow-hidden mb-6">
          <Image
            src={profileImage}
            alt={t("aboutMe.photoAlt")}
            className="object-cover"
            width={200}
            height={200}
            onError={() => {
              console.error("Failed to load profile image");
            }}
          />
        </div>

        {/* Name and Description */}
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4 text-black">Ezequiel Garibotto</h1> {/* Text color set to black */}
          <p className="text-lg max-w-[60%] mx-auto text-black">{t("aboutMe.description")}</p> {/* Text color set to black */}

          {/* Social Links */}
          <div className="mt-6 flex space-x-4 justify-center">
            <a
              href="https://github.com/EzequielGaribotto"
              target="_blank"
              rel="noopener noreferrer"
              className="w-12 h-12 bg-gray-800 hover:bg-gray-700 text-white rounded-full flex items-center justify-center transition-transform transform hover:scale-110"
            >
              <FaGithub size={24} className="text-white"/>
            </a>
            <a
              href="https://linkedin.com/in/ezequiel-garibotto"
              target="_blank"
              rel="noopener noreferrer"
              className="w-12 h-12 bg-blue-600 hover:bg-blue-500 text-white rounded-full flex items-center justify-center transition-transform transform hover:scale-110"
            >
              <FaLinkedin size={24} className="text-white"/>
            </a>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section className="w-full max-w-4xl">
        <h2 className="text-3xl font-bold text-center mb-8">{t("projects.myprojects")}</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </section>
    </div>
  );
}