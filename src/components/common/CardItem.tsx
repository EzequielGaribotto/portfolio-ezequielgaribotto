import React, { useRef, useState } from "react";
import Image from 'next/image';
import styles from "./CardItem.module.css";
import MetaInfoDisplay from './MetaInfoDisplay';
import TagHint from './TagHint';
import { descendants, isScopeTag, orderTags } from "../../constants/techTaxonomy";
import { useTranslation } from "../../context/TranslationContext";
import { useMediaQuery } from "../../hooks/useMediaQuery";
import { useAnimatedHeight } from "../../hooks/useAnimatedHeight";

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
  /** Wide layout: the description on the left, the tags in a column on the right. */
  split?: boolean;
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
  split = false,
}) => {
  const { t } = useTranslation();
  const technologies = orderTags(rawTechnologies);
  const [showAllTags, setShowAllTags] = useState(false);
  const [hoveredTag, setHoveredTag] = useState<string | null>(null);
  const below = hoveredTag ? descendants(hoveredTag) : null;
  const isRelated = (x: string) => !!below && below.has(x);
  // In the split layout the tag column has room for every tag; below 900px the tags sit under the text and stay folded
  const columnFits = useMediaQuery("(min-width: 901px)");
  const showEverything = split && columnFits;
  const expanded = showAllTags || showEverything;
  const tagsRef = useRef<HTMLDivElement>(null);
  useAnimatedHeight(tagsRef, expanded);

  // Hovering a tag whose concrete technologies are folded away opens the list, and it stays open
  const handleTagHover = (tag: string | null) => {
    setHoveredTag(tag);
    if (tag && technologies.slice(TAG_LIMIT).some((x) => descendants(tag).has(x))) setShowAllTags(true);
  };
  return (
    <div
      key={id}
      id={id}
      className={`${styles.cardItem} ${split ? styles.split : ""} ${className}`}
      onMouseLeave={() => setHoveredTag(null)}
    >
      <div className={styles.cardHeader}>
        {imageUrl && (
          <Image
            src={imageUrl}
            alt={`${title} logo`}
            width={120}
            height={120}
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
      <div className={styles.description} style={{ textAlign: 'left', whiteSpace: 'pre-line' }}>
        {description}
      </div>

      <div ref={tagsRef} className={`${styles.technologies} ${hoveredTag ? styles.techFocus : ""}`}>
        {(expanded ? technologies : technologies.slice(0, TAG_LIMIT)).map((tech, index) => (
          <span
            key={index}
            className={`${styles.tech} ${isScopeTag(tech) ? styles.techScope : ""} ${
              isRelated(tech) ? styles.techRelated : ""
            } ${hoveredTag === tech ? styles.techActive : ""}`}
          >
            <TagHint tag={tech} projectId={id} pool={technologies} onHoverChange={handleTagHover} sideWhenCrowded={showEverything}>{tech}</TagHint>
          </span>
        ))}
        {technologies.length > TAG_LIMIT && !showEverything && (
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
