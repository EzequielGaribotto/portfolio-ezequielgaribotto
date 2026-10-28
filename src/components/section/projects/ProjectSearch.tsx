"use client";

import { useState, useEffect } from "react";
import { FaSearch, FaTimes } from "react-icons/fa";
import { useTranslation } from "../../../context/TranslationContext";
import styles from "./ProjectSearch.module.css";
import TagHint from "../../common/TagHint";

interface ProjectSearchProps {
  onSearchChange: (searchTerm: string) => void;
  onKeywordsChange: (keywords: string[]) => void;
  selectedKeywords: string[];
  projectTags: string[];
  onChipHover?: (tag: string | null) => void;
}

export default function ProjectSearch({ 
  onSearchChange, 
  onKeywordsChange, 
  selectedKeywords,
  projectTags,
  onChipHover
}: ProjectSearchProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const { t } = useTranslation();

  // Hardcoded keyword filters: what the work covers (scope) and the tools used (technology)
  const scopeKeywords = [
    "Applied AI",
    "AI Engineering",
    "Agentic Development",
    "Agentic AI",
    "Data Engineering",
  ];
  const techKeywords = [
    "Machine Learning",
    "Python",
    "Back-end",
    "Front-end",
    "Vue",
    "Supabase",
    "API",
    "Cloud",
    "UI",
    "UX",
    "Firebase",
    "Java",
    "Kotlin",
    "Android",
    "React",
    "Game Development",
  ];

  useEffect(() => {
    onSearchChange(searchTerm);
  }, [searchTerm, onSearchChange]);

  const handleKeywordToggle = (keyword: string) => {
    const updatedKeywords = selectedKeywords.includes(keyword)
      ? selectedKeywords.filter(k => k !== keyword)
      : [...selectedKeywords, keyword];
    
    onKeywordsChange(updatedKeywords);
  };

  const clearSearch = () => {
    setSearchTerm("");
    onKeywordsChange([]);
  };

  const hasActiveFilters = searchTerm.trim() !== "" || selectedKeywords.length > 0;

  return (
    <div className={styles.searchContainer}>
      {/* Search Bar */}
      <div className={styles.searchBarWrapper}>
        <div className={styles.searchBar}>
          <FaSearch className={styles.searchIcon} />
          <input
            type="text"
            placeholder={t("search.placeholder")}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className={styles.searchInput}
          />
          {hasActiveFilters && (
            <button
              onClick={clearSearch}
              className={styles.clearButton}
              aria-label={t("search.clearFilters")}
            >
              <FaTimes />
            </button>
          )}
        </div>
      </div>

      {/* Keyword Tags */}
      <div className={styles.keywordsContainer}>
        {[
          { label: t("search.scopeLabel"), keywords: scopeKeywords, scope: true },
          { label: t("search.techLabel"), keywords: techKeywords, scope: false },
        ].map((group) => (
          <div key={group.label} className={styles.keywordGroup}>
            <span className={styles.groupLabel}>{group.label}</span>
            <div className={styles.keywordTags}>
              {group.keywords.map((keyword) => (
                <TagHint key={keyword} tag={keyword} pool={projectTags} onHoverChange={onChipHover}>
                  <button
                    onClick={() => handleKeywordToggle(keyword)}
                    className={`${styles.keywordTag} ${group.scope ? styles.scopeTag : ""} ${
                      selectedKeywords.includes(keyword) ? styles.selected : ""
                    }`}
                  >
                    {keyword}
                  </button>
                </TagHint>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
