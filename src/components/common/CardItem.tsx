import React, { useState } from "react";
import Image from 'next/image';
import styles from "./CardItem.module.css";
import MetaInfoDisplay from './MetaInfoDisplay';
import TagHint from './TagHint';
import { descendants, orderTags } from "../../constants/techTaxonomy";
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
  /** Open bean tooltips below the bean, in bold. */
  tooltipBelow?: boolean;
}

const CardItem: React.FC<CardItemProps> = ({
  id,
  title,
  subtitle,
  period,
  location,
  description,
  technologies: rawTechnologies,
  imageUrl,
  linkUrl,
  className = "",
  tooltipBelow = false,
}) => {
  const { t } = useTranslation();
  const technologies = orderTags(rawTechnologies);
  const [showAllTags, setShowAllTags] = useState(false);
  const [hoveredTag, setHoveredTag] = useState<string | null>(null);
  const below = hoveredTag ? descendants(hoveredTag) : null;
  const isRelated = (x: string) => !!below && below.has(x);
  const expanded = showAllTags;
  // Hovering a tag whose concrete technologies are folded away opens the list, and it stays open
  const handleTagHover = (tag: string | null) => {
    setHoveredTag(tag);
    if (tag && technologies.slice(TAG_LIMIT).some((x) => descendants(tag).has(x))) setShowAllTags(true);
  };
  return (
    <div
      key={id}
      id={id}
      className={`${styles.cardItem} ${className}`}
      onMouseLeave={() => setHoveredTag(null)}
    >
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
        {(expanded ? technologies : technologies.slice(0, TAG_LIMIT)).map((tech, index) => (
          <span
            key={index}
            className={`${styles.tech} ${
              isRelated(tech) ? styles.techRelated : ""
            } ${hoveredTag === tech ? styles.techActive : ""}`}
          >
            <TagHint tag={tech} projectId={id} pool={technologies} onHoverChange={handleTagHover} below={tooltipBelow} boldTip={tooltipBelow}>{tech}</TagHint>
          </span>
        ))}
        {technologies.length > TAG_LIMIT && (
          <button type="button" className={`${styles.moreTags} ${
              !expanded && technologies.slice(TAG_LIMIT).some(isRelated) ? styles.moreTagsRelated : ""
            }`}
            onClick={() => setShowAllTags((v) => !v)}>
            {expanded
              ? t("tags.showLess")
              : t("tags.showMore").replace("{count}", String(technologies.length - TAG_LIMIT))}
          </button>
        )}
      </div>
    </div>
  );
};

export default CardItem;
