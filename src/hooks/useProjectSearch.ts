import { useState, useMemo } from "react";
import { Project } from "../models/Project";
import { useLocalStorage } from "./useLocalStorage";

export function useProjectSearch(projects: Project[]) {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedKeywords, setSelectedKeywords] = useLocalStorage<string[]>("project-search-keywords", []);
  const [showAllProjects, setShowAllProjects] = useLocalStorage<boolean>("show-all-projects", false);

  const filteredProjects = useMemo(() => {
    // Default projects to show when no filters are applied
    const defaultProjects = ["neutral-news", "eulix", "competitive-programming", "barcelona-inequality"];
    
    let filtered = projects;

    // Filter by search term (title, description, technologies)
    if (searchTerm.trim() !== "") {
      const searchLower = searchTerm.toLowerCase().trim();
      filtered = filtered.filter((project) => {
        const titleMatch = project.title.toLowerCase().includes(searchLower);
        const descriptionMatch = project.description.toLowerCase().includes(searchLower);
        const techMatch = project.technologies?.some((tech: string) => 
          tech.toLowerCase().includes(searchLower)
        ) || false;
        
        return titleMatch || descriptionMatch || techMatch;
      });
    }

    // Filter by selected keywords (AND logic)
    if (selectedKeywords.length > 0) {
      filtered = filtered.filter((project) => {
        // Check if ALL selected keywords are found in the project
        return selectedKeywords.every(keyword => {
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
      });
    }

    // If no filters are applied and showAllProjects is false, show only default projects
    const hasActiveFilters = searchTerm.trim() !== "" || selectedKeywords.length > 0;
    if (!hasActiveFilters && !showAllProjects) {
      filtered = filtered.filter(project => defaultProjects.includes(project.id));
    }

    return filtered;
  }, [projects, searchTerm, selectedKeywords, showAllProjects]);

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
    setShowAllProjects
  };
}
