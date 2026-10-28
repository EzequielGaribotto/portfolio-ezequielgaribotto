"use client";

import { useEffect, useState, useRef } from "react";
import ProjectCard from "./ProjectCard";
import { Project } from "../../../../models/Project";
import styles from "./LazyProjectCard.module.css";

interface LazyProjectCardProps {
  project: Project;
  searchTerm?: string;
  highlightTags?: string[];
}

export default function LazyProjectCard({ project, searchTerm, highlightTags }: LazyProjectCardProps) {
  const [isVisible, setIsVisible] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsVisible(true);
          // Don't disconnect so we can track visibility
        }
      },
      // Mount well before the card scrolls into view, so a placeholder is rarely seen and the masonry
      // has settled its real height by the time the card is on screen
      { rootMargin: "1500px 0px" }
    );

    if (cardRef.current) {
      observer.observe(cardRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, [project.id]);

  return (
    <div ref={cardRef} className={styles.lazyCardContainer}>
      {isVisible ? (
        <ProjectCard project={project} searchTerm={searchTerm} externalHighlight={highlightTags} />
      ) : (
        <div className={styles.placeholder}>
          <div className={styles.placeholderTitle}></div>
          <div className={styles.placeholderDescription}></div>
          <div className={styles.placeholderImage}></div>
          <div className={styles.placeholderTags}>
            <div className={styles.placeholderTag}></div>
            <div className={styles.placeholderTag}></div>
            <div className={styles.placeholderTag}></div>
          </div>
        </div>
      )}
    </div>
  );
}
