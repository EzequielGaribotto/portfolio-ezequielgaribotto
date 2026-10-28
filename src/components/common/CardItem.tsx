import React, { useState } from "react";
import Image from 'next/image';
import styles from "./CardItem.module.css";
import MetaInfoDisplay from './MetaInfoDisplay';
import TagHint from './TagHint';
import { useTranslation } from "../../context/TranslationContext";

const TAG_LIMIT = 12;

interface CardItemProps {
  id: string;
  title: string;
  subtitle: string;
  period: string;
  location: string;
  description: string;
  technologies: string[];
  imageUrl?: string;
  linkUrl?: string;
  className?: string;
}

const CardItem: React.FC<CardItemProps> = ({
  id,
  title,
  subtitle,
  period,
  location,
  description,
  technologies,
  imageUrl,
  linkUrl,
  className = "",
}) => {
  const { t } = useTranslation();
  const [showAllTags, setShowAllTags] = useState(false);
  return (
    <div key={id} id={id} className={`${styles.cardItem} ${className}`}>
      <div className={styles.cardHeader}>
        {imageUrl && (
          <Image
            src={imageUrl}
            alt={`${title} logo`}
            width={60}
            height={60}
            className={styles.logo}
          />
        )}
        <div style={{ textAlign: 'left', width: '100%' }}>
          <h3 className={styles.title}>
            {linkUrl ? (
              <a
                href={linkUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                {title}
              </a>
            ) : (
              title
            )}
          </h3>
          <h4 className={styles.subtitle}>{subtitle}</h4>
          <MetaInfoDisplay period={period} location={location} />
        </div>
      </div>
      <div style={{ textAlign: 'left', whiteSpace: 'pre-line' }}>
        {description}
      </div>
      
      <div className={styles.technologies}>
        {(showAllTags ? technologies : technologies.slice(0, TAG_LIMIT)).map((tech, index) => (
          <span key={index} className={styles.tech}>
            <TagHint tag={tech} projectId={id}>{tech}</TagHint>
          </span>
        ))}
        {technologies.length > TAG_LIMIT && (
          <button type="button" className={styles.moreTags} onClick={() => setShowAllTags((v) => !v)}>
            {showAllTags
              ? t("tags.showLess")
              : t("tags.showMore").replace("{count}", String(technologies.length - TAG_LIMIT))}
          </button>
        )}
      </div>
    </div>
  );
};

export default CardItem;
