import { useState, useMemo } from "react";
import { Project } from "../models/Project";
import { useLocalStorage } from "./useLocalStorage";
import { expandSearchTerm, matchesWithSynonyms } from "../constants/techSynonyms";

export type SortBy = 'relevance' | 'date';

interface ProjectMatch {
  project: Project;
  score: number;
  matchDetails: {
    titleExact: boolean;
    titlePartial: boolean;
    descriptionMatch: boolean;
    techMatches: number;
    totalTechs: number;
  };
}

/**
 * Parse date string to Date object
 * Handles formats like "diciembre 2024", "December 2024", "abril 2025", etc.
 */
function parseProjectDate(dateStr: string): Date {
  // Month mappings for Spanish and English
  const monthMap: Record<string, number> = {
    'enero': 0, 'january': 0,
    'febrero': 1, 'february': 1,
    'marzo': 2, 'march': 2,
    'abril': 3, 'april': 3,
    'mayo': 4, 'may': 4,
    'junio': 5, 'june': 5,
    'julio': 6, 'july': 6,
    'agosto': 7, 'august': 7,
    'septiembre': 8, 'september': 8, 'sept': 8,
    'octubre': 9, 'october': 9, 'oct': 9,
    'noviembre': 10, 'november': 10, 'nov': 10,
    'diciembre': 11, 'december': 11, 'dec': 11
  };

  const parts = dateStr.toLowerCase().trim().split(' ');
  if (parts.length >= 2) {
    const month = monthMap[parts[0]];
    const year = parseInt(parts[1]);
    if (month !== undefined && !isNaN(year)) {
      return new Date(year, month);
    }
  }

  // Fallback to parsing as standard date
  return new Date(dateStr);
}

/**
 * Compare two projects by date
 * Returns: negative if a is more recent, positive if b is more recent, 0 if equal
 * Ongoing projects (endDate === null) are always ranked higher than completed projects
 */
function compareDates(a: Project, b: Project): number {
  // Ongoing projects (present) should always come first
  const aIsOngoing = a.endDate === null;
  const bIsOngoing = b.endDate === null;
  
  if (aIsOngoing && !bIsOngoing) {
    return -1; // a is ongoing, b is not -> a comes first
  }
  if (!aIsOngoing && bIsOngoing) {
    return 1; // b is ongoing, a is not -> b comes first
  }
  
  // Both ongoing or both completed - compare by date
  // For ongoing projects, use startDate
  // For completed projects, use endDate
  const aDate = aIsOngoing ? parseProjectDate(a.startDate) : parseProjectDate(a.endDate!);
  const bDate = bIsOngoing ? parseProjectDate(b.startDate) : parseProjectDate(b.endDate!);
  
  // Sort descending (most recent first)
  return bDate.getTime() - aDate.getTime();
}

export function useProjectSearch(projects: Project[]) {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedKeywords, setSelectedKeywords] = useLocalStorage<string[]>("project-search-keywords", []);
  const [showAllProjects, setShowAllProjects] = useLocalStorage<boolean>("show-all-projects", false);
  const [sortBy, setSortBy] = useLocalStorage<SortBy>("project-sort-by", "relevance");

  const filteredProjects = useMemo(() => {
    // Default projects to show when no filters are applied
    const defaultProjects = ["barcelona-inequality", "neutral-news", "eulix", "competitive-programming"];
    
    const hasSearchTerm = searchTerm.trim() !== "";
    const hasKeywords = selectedKeywords.length > 0;
    const hasActiveFilters = hasSearchTerm || hasKeywords;

    // If no filters are applied and showAllProjects is false, show only default projects
    if (!hasActiveFilters && !showAllProjects) {
      return projects.filter(project => defaultProjects.includes(project.id));
    }

    // Create scored matches for sorting
    const projectMatches: ProjectMatch[] = [];

    for (const project of projects) {
      let matchScore = 0;
      let shouldInclude = true;
      
      const matchDetails = {
        titleExact: false,
        titlePartial: false,
        descriptionMatch: false,
        techMatches: 0,
        totalTechs: project.technologies?.length || 0
      };

      // Search term filtering and scoring
      if (hasSearchTerm) {
        const expandedTerms = expandSearchTerm(searchTerm);
        let searchMatches = false;

        // Title matching (highest priority)
        if (matchesWithSynonyms(project.title, searchTerm)) {
          const titleLower = project.title.toLowerCase();
          // Check for exact match with any expanded term
          const exactMatch = expandedTerms.some(term => titleLower === term.toLowerCase());
          
          if (exactMatch) {
            matchDetails.titleExact = true;
            matchScore += 1000; // Highest score for exact title match
          } else {
            matchDetails.titlePartial = true;
            // Score based on best matching term
            const bestMatch = expandedTerms.find(term => titleLower.includes(term.toLowerCase()));
            if (bestMatch) {
              const position = titleLower.indexOf(bestMatch.toLowerCase());
              const lengthRatio = bestMatch.length / titleLower.length;
              matchScore += 500 + (50 - Math.min(position, 50)) + (lengthRatio * 100);
            }
          }
          searchMatches = true;
        }

        // Description matching (medium priority)
        if (matchesWithSynonyms(project.description, searchTerm)) {
          matchDetails.descriptionMatch = true;
          const descriptionLower = project.description.toLowerCase();
          const bestMatch = expandedTerms.find(term => descriptionLower.includes(term.toLowerCase()));
          if (bestMatch) {
            const position = descriptionLower.indexOf(bestMatch.toLowerCase());
            const lengthRatio = bestMatch.length / descriptionLower.length;
            matchScore += 200 + (20 - Math.min(position / 10, 20)) + (lengthRatio * 50);
          }
          searchMatches = true;
        }

        // Technology matching (lower priority but still important)
        const techMatches = project.technologies?.filter((tech: string) => 
          matchesWithSynonyms(tech, searchTerm)
        ) || [];
        
        if (techMatches.length > 0) {
          matchScore += techMatches.length * 100; // 100 points per matching tech
          searchMatches = true;
        }

        if (!searchMatches) {
          shouldInclude = false;
        }
      }

      // Keyword filtering and scoring (AND logic)
      if (hasKeywords && shouldInclude) {
        const keywordMatches = selectedKeywords.filter(keyword => {
          // Helper function to check if keyword matches in text considering word boundaries and case
          const smartMatch = (text: string, keyword: string): boolean => {
            const escapedKeyword = keyword.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
            
            // Pattern 1: Exact word matches with word boundaries (case insensitive)
            const wordBoundaryRegex = new RegExp(`\\b${escapedKeyword}\\b`, 'i');
            
            // Pattern 2: For acronyms/uppercase - match only as complete segments
            // This matches "API" in "FastAPI", "RESTful API", "Web-API" but NOT in "Scraping"
            const acronymRegex = new RegExp(`(?:^|\\b|[A-Z])${escapedKeyword}(?=\\b|[A-Z]|$)`, 'i');
            
            // For very short keywords (1-2 chars), be more strict - only word boundaries
            if (keyword.length <= 2) {
              return wordBoundaryRegex.test(text);
            }
            
            return wordBoundaryRegex.test(text) || acronymRegex.test(text);
          };
          
          // Check in title
          const titleMatch = smartMatch(project.title, keyword);
          
          // Check in description  
          const descriptionMatch = smartMatch(project.description, keyword);
          
          // Check in technologies array with smart matching
          const techMatch = project.technologies?.some((tech: string) => 
            smartMatch(tech, keyword)
          ) || false;
          
          return titleMatch || descriptionMatch || techMatch;
        });

        // Must match ALL selected keywords
        if (keywordMatches.length !== selectedKeywords.length) {
          shouldInclude = false;
        } else {
          // Count tech matches for scoring
          matchDetails.techMatches = selectedKeywords.filter(keyword => 
            project.technologies?.some((tech: string) => {
              const escapedKeyword = keyword.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
              const wordBoundaryRegex = new RegExp(`\\b${escapedKeyword}\\b`, 'i');
              const acronymRegex = new RegExp(`(?:^|\\b|[A-Z])${escapedKeyword}(?=\\b|[A-Z]|$)`, 'i');
              
              if (keyword.length <= 2) {
                return wordBoundaryRegex.test(tech);
              }
              
              return wordBoundaryRegex.test(tech) || acronymRegex.test(tech);
            })
          ).length;
          
          // Bonus points for keyword matches
          matchScore += selectedKeywords.length * 150; // 150 points per matching keyword
          
          // Bonus for higher percentage of tech stack matching
          if (matchDetails.totalTechs > 0) {
            const techMatchRatio = matchDetails.techMatches / matchDetails.totalTechs;
            matchScore += techMatchRatio * 100;
          }
        }
      }

      if (shouldInclude) {
        projectMatches.push({
          project,
          score: matchScore,
          matchDetails
        });
      }
    }

    // Sort by score (descending), then by fallback criteria
    projectMatches.sort((a, b) => {
      // If sorting by date, use date as primary sort
      if (sortBy === 'date') {
        const dateCompare = compareDates(a.project, b.project);
        if (dateCompare !== 0) return dateCompare;
      }
      
      // If sorting by relevance OR date comparison is equal, use weight as primary sort
      // Lower weight = higher priority
      const aWeight = a.project.weight ?? 999;
      const bWeight = b.project.weight ?? 999;
      if (aWeight !== bWeight) {
        return aWeight - bWeight;
      }

      // Secondary: Sort by match score (only matters if there's a search/filter)
      if (b.score !== a.score) {
        return b.score - a.score;
      }

      // Tertiary: Prefer projects with more exact matches
      const aExactness = (a.matchDetails.titleExact ? 4 : 0) + 
                        (a.matchDetails.titlePartial ? 2 : 0) + 
                        (a.matchDetails.descriptionMatch ? 1 : 0);
      const bExactness = (b.matchDetails.titleExact ? 4 : 0) + 
                        (b.matchDetails.titlePartial ? 2 : 0) + 
                        (b.matchDetails.descriptionMatch ? 1 : 0);
      
      if (bExactness !== aExactness) {
        return bExactness - aExactness;
      }

      // Quaternary: Prefer projects with higher tech match ratio
      const aTechRatio = a.matchDetails.totalTechs > 0 ? 
        a.matchDetails.techMatches / a.matchDetails.totalTechs : 0;
      const bTechRatio = b.matchDetails.totalTechs > 0 ? 
        b.matchDetails.techMatches / b.matchDetails.totalTechs : 0;
      
      if (bTechRatio !== aTechRatio) {
        return bTechRatio - aTechRatio;
      }

      // Quinary: Prefer projects with more technologies (more comprehensive)
      if (b.matchDetails.totalTechs !== a.matchDetails.totalTechs) {
        return b.matchDetails.totalTechs - a.matchDetails.totalTechs;
      }

      // Final fallback: Alphabetical by title
      return a.project.title.localeCompare(b.project.title);
    });

    return projectMatches.map(match => match.project);
  }, [projects, searchTerm, selectedKeywords, showAllProjects, sortBy]);

  const hasActiveFilters = searchTerm.trim() !== "" || selectedKeywords.length > 0;
  const resultCount = filteredProjects.length;
  const totalCount = projects.length;

  return {
    searchTerm,
    setSearchTerm,
    selectedKeywords,
    setSelectedKeywords,
    filteredProjects,
    hasActiveFilters,
    resultCount,
    totalCount,
    showAllProjects,
    setShowAllProjects,
    sortBy,
    setSortBy
  };
}
