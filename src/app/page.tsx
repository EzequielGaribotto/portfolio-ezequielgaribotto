"use client";

import Image from "next/image";
import Link from "next/link";
import { useTranslation } from "../context/TranslationContext";

const projects = [
  {
    id: "m04-adivina-numero-secreto",
    image: "/images/adivina-numero.png",
  },
  {
    id: "m04-play-html-css",
    image: "/images/play-html-css.png",
  },
  {
    id: "m08-p4-maps-app",
    image: "/images/maps-app.png",
  },
  {
    id: "trivial-app-jetpack-compose",
    image: "/images/trivial-app.png",
  },
  {
    id: "zomb",
    image: "/images/zomb.png",
  },
  {
    id: "competitive-programming",
    image: "/images/competitive-programming.png",
  },
];

export default function Home() {
  const { t } = useTranslation();

  return (
    <div className="p-8 sm:p-20">
      <h1 className="text-3xl font-bold text-center mb-8">{t("projects")}</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
        {projects.map((project) => (
          <Link
            key={project.id}
            href={`/projects/${project.id}`}
            className="group block rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow bg-foreground text-background p-4"
          >
            <div className="flex flex-col items-center text-center">
              <Image
                src={project.image}
                alt={t(`projectTitles.${project.id}`)}
                width={300}
                height={200}
                className="rounded-lg mb-4 group-hover:scale-105 transition-transform"
              />
              <h2 className="text-xl font-bold group-hover:underline">
                {t(`projectTitles.${project.id}`)}
              </h2>
              <p className="text-sm mt-2">{t(`projectDescriptions.${project.id}`)}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}