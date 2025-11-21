"use client";

import { useTranslation } from "../../../context/TranslationContext";
import { SortBy } from "../../../hooks/useProjectSearch";
import styles from "./SearchResults.module.css";

interface SearchResultsProps {
  resultCount: number;
  totalCount: number;
  hasActiveFilters: boolean;
  showAllProjects?: boolean;
  onToggleShowAll?: () => void;
  sortBy: SortBy;
  onSortChange: (sortBy: SortBy) => void;
}

export default function SearchResults({ 
  resultCount, 
  totalCount, 
  hasActiveFilters,
  showAllProjects = false,
  onToggleShowAll,
  sortBy,
  onSortChange
}: SearchResultsProps) {
  const { t } = useTranslation();

  if (!hasActiveFilters) {
    return (
      <div className={styles.resultsContainer}>
        <p className={styles.resultsText}>
          {showAllProjects 
            ? t("search.showingAll").replace("{count}", totalCount.toString())
            : t("search.showingLimited")
                .replace("{count}", resultCount.toString())
                .replace("{total}", totalCount.toString())
          }
          {onToggleShowAll && (
            <>
              {" • "}
              <button
                onClick={onToggleShowAll}
                className={styles.toggleLink}
              >
                {showAllProjects ? t("search.showLessLink") : t("search.showAllLink")}
              </button>
            </>
          )}
        </p>
        
        {/* Sort toggle */}
        <div className={styles.sortContainer}>
          <span className={styles.sortLabel}>{t("search.sortBy")}:</span>
          <button
            onClick={() => onSortChange('relevance')}
            className={`${styles.sortButton} ${sortBy === 'relevance' ? styles.sortButtonActive : ''}`}
          >
            {t("search.sortByRelevance")}
          </button>
          <button
            onClick={() => onSortChange('date')}
            className={`${styles.sortButton} ${sortBy === 'date' ? styles.sortButtonActive : ''}`}
          >
            {t("search.sortByDate")}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.resultsContainer}>
      <p className={styles.resultsText}>
        {resultCount === 0 ? (
          <span className={styles.noResults}>
            {t("search.noResults")}
          </span>
        ) : (
          <>
            {t("search.showingFiltered")
              .replace("{filtered}", resultCount.toString())
              .replace("{total}", totalCount.toString())}
            {resultCount < totalCount && (
              <span className={styles.filteredNote}>
                {" "}{t("search.filtered")}
              </span>
            )}
          </>
        )}
      </p>
      
      {/* Sort toggle - also show when filtering */}
      {resultCount > 0 && (
        <div className={styles.sortContainer}>
          <span className={styles.sortLabel}>{t("search.sortBy")}:</span>
          <button
            onClick={() => onSortChange('relevance')}
            className={`${styles.sortButton} ${sortBy === 'relevance' ? styles.sortButtonActive : ''}`}
          >
            {t("search.sortByRelevance")}
          </button>
          <button
            onClick={() => onSortChange('date')}
            className={`${styles.sortButton} ${sortBy === 'date' ? styles.sortButtonActive : ''}`}
          >
            {t("search.sortByDate")}
          </button>
        </div>
      )}
    </div>
  );
}
