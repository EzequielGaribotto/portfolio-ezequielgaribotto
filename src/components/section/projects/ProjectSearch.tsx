"use client";

import { useState, useEffect, useMemo, useRef } from "react";
import { FaSearch, FaTimes, FaChevronDown } from "react-icons/fa";
import { useTranslation } from "../../../context/TranslationContext";
import styles from "./ProjectSearch.module.css";
import TagHint from "../../common/TagHint";
import HintText from "../../common/HintText";
import { TAG_HINT_KEYS } from "../../../constants/tagHints";
import { suggest, remainder } from "../../../utils/searchSuggestions";
import { scrollBehavior } from "../../../hooks/usePrefersReducedMotion";

interface ProjectSearchProps {
  onSearchChange: (searchTerm: string) => void;
  onKeywordsChange: (keywords: string[]) => void;
  selectedKeywords: string[];
  projectTags: string[];
  /** Titles and tags the search box can complete to. */
  suggestionPool?: string[];
  onChipHover?: (tag: string | null) => void;
  /** Bump to clear the search box and every chip from outside (the empty-results state). */
  clearSignal?: number;
}

export default function ProjectSearch({
  onSearchChange,
  onKeywordsChange,
  selectedKeywords,
  projectTags,
  suggestionPool = [],
  onChipHover,
  clearSignal = 0
}: ProjectSearchProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [techOpen, setTechOpen] = useState(false);
  const [focused, setFocused] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);
  const scopeGroupRef = useRef<HTMLDivElement>(null);
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

  // Picking a scope scrolls the page so the scope row sits just under the navbar, with the results right below it
  const scrollScopeUnderNavbar = () => {
    const group = scopeGroupRef.current;
    if (!group) return;
    const navbar = document.querySelector("header > div");
    const navbarBottom = navbar ? navbar.getBoundingClientRect().bottom : 0;
    const top = group.getBoundingClientRect().top + window.scrollY - navbarBottom - 8;
    window.scrollTo({ top: Math.max(0, top), behavior: scrollBehavior() });
  };

  // The hero's scope row applies a scope here: select it alone and bring the results into view
  useEffect(() => {
    const onScope = (e: Event) => {
      const scope = (e as CustomEvent<string>).detail;
      if (!scope) return;
      onKeywordsChange([scope]);
      requestAnimationFrame(scrollScopeUnderNavbar);
    };
    window.addEventListener("portfolio:scope", onScope);
    return () => window.removeEventListener("portfolio:scope", onScope);
  }, [onKeywordsChange]);

  const handleKeywordToggle = (keyword: string) => {
    const updatedKeywords = selectedKeywords.includes(keyword)
      ? selectedKeywords.filter(k => k !== keyword)
      : [...selectedKeywords, keyword];
    
    onKeywordsChange(updatedKeywords);
  };

  // Autocomplete: a list of options under the field, the best one ghosted inline, Tab to take it
  const suggestions = useMemo(() => suggest(searchTerm, suggestionPool), [searchTerm, suggestionPool]);
  const listVisible = focused && suggestions.length > 0;
  const target = activeIndex >= 0 ? activeIndex : 0;
  const ghost = listVisible ? remainder(searchTerm, suggestions[target]) : "";

  const accept = (value: string) => {
    setSearchTerm(value);
    setActiveIndex(-1);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!listVisible) return;
    if (e.key === "ArrowDown" || e.key === "ArrowUp") {
      e.preventDefault();
      const step = e.key === "ArrowDown" ? 1 : -1;
      setActiveIndex((index) => (index + step + suggestions.length) % suggestions.length);
    } else if (e.key === "Tab" && !e.shiftKey) {
      e.preventDefault();
      accept(suggestions[target]);
    } else if (e.key === "Enter" && activeIndex >= 0) {
      e.preventDefault();
      accept(suggestions[activeIndex]);
    } else if (e.key === "Escape") {
      e.preventDefault();
      e.stopPropagation();
      setFocused(false);
    }
  };

  const clearSearch = () => {
    setSearchTerm("");
    onKeywordsChange([]);
  };

  useEffect(() => {
    if (clearSignal > 0) {
      setSearchTerm("");
      onKeywordsChange([]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [clearSignal]);

  const selectedScopes = scopeKeywords.filter((keyword) => selectedKeywords.includes(keyword) && TAG_HINT_KEYS[keyword]);
  const hasActiveFilters = searchTerm.trim() !== "" || selectedKeywords.length > 0;
  // Scope is the primary filter; the longer technology list opens on demand, and stays open while one of its chips is active
  const techVisible = techOpen || techKeywords.some((keyword) => selectedKeywords.includes(keyword));

  return (
    <div className={styles.searchContainer}>
      {/* Search Bar */}
      <div className={styles.searchBarWrapper}>
        <div className={styles.searchBar}>
          <FaSearch className={styles.searchIcon} />
          {ghost && (
            <span className={styles.ghost} aria-hidden="true">
              <span className={styles.ghostTyped}>{searchTerm}</span>
              {ghost}
            </span>
          )}
          <input
            type="text"
            role="combobox"
            aria-autocomplete="both"
            aria-expanded={listVisible}
            aria-controls="search-suggestions"
            aria-activedescendant={listVisible && activeIndex >= 0 ? `search-suggestion-${activeIndex}` : undefined}
            autoComplete="off"
            placeholder={t("search.placeholder")}
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setActiveIndex(-1);
              setFocused(true);
            }}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
            onKeyDown={handleKeyDown}
            className={styles.searchInput}
          />
          {listVisible && (
            <ul id="search-suggestions" role="listbox" className={styles.suggestions}>
              {suggestions.map((option, index) => (
                <li
                  key={option}
                  id={`search-suggestion-${index}`}
                  role="option"
                  aria-selected={index === target}
                  className={`${styles.suggestion} ${index === target ? styles.suggestionActive : ""}`}
                  // mousedown, not click: the field must keep focus or the list closes before the click lands
                  onMouseDown={(e) => {
                    e.preventDefault();
                    accept(option);
                  }}
                  onMouseEnter={() => setActiveIndex(index)}
                >
                  <span className={styles.suggestionText}>{option}</span>
                  {index === target && <kbd className={styles.suggestionKey}>Tab</kbd>}
                </li>
              ))}
            </ul>
          )}
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
          <div key={group.label} className={styles.keywordGroup} ref={group.scope ? scopeGroupRef : undefined}>
            {group.scope ? (
              <span className={styles.groupLabel}>{group.label}</span>
            ) : (
              <button
                type="button"
                className={`${styles.groupLabel} ${styles.groupToggle}`}
                aria-expanded={techVisible}
                aria-controls="tech-keywords"
                onClick={() => setTechOpen((open) => !open)}
              >
                {group.label}
                <FaChevronDown className={`${styles.groupChevron} ${techVisible ? styles.groupChevronOpen : ""}`} aria-hidden="true" />
              </button>
            )}
            <div className={styles.keywordTags} id={group.scope ? undefined : "tech-keywords"} hidden={!group.scope && !techVisible}>
              {group.keywords.map((keyword) => (
                <TagHint key={keyword} tag={keyword} pool={projectTags} onHoverChange={onChipHover} childFocusable noTouchTip>
                  <button
                    onClick={() => {
                      handleKeywordToggle(keyword);
                      if (group.scope) scrollScopeUnderNavbar();
                    }}
                    aria-pressed={selectedKeywords.includes(keyword)}
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

      {/* What the selected scope covers and what was built under it: the hover hint, kept in view for touch and keyboard */}
      {selectedScopes.length > 0 && (
        <div className={styles.explainer} role="region" aria-label={t("search.explainerLabel")}>
          {selectedScopes.map((scope) => {
            const hintKey = TAG_HINT_KEYS[scope];
            return (
              <div key={scope} className={styles.explainerItem}>
                <p><HintText text={t(`tagHints.${hintKey}`)} labelClassName={styles.explainerLabel} /></p>
                <p><HintText text={t(`tagExamples.${hintKey}`)} labelClassName={styles.explainerLabel} /></p>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
