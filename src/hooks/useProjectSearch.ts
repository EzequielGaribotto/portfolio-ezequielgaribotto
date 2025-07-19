import { useState, useMemo } from "react";
import { Project } from "../models/Project";
import { useLocalStorage } from "./useLocalStorage";

export function useProjectSearch(projects: Project[]) {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedKeywords, setSelectedKeywords] = useLocalStorage<string[]>("project-search-keywords", []);
  const [showAllProjects, setShowAllProjects] = useLocalStorage<boolean>("show-all-projects", false);

  const filteredProjects = useMemo(() => {
    // Default projects to show when no filters are applied
    const defaultProjects = ["neutral-news", "eulix", "competitive-programming", "rick-and-morty-api-list"];
    
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
        // Check if ALL selected keywords are found in the project's technologies
        return selectedKeywords.every(keyword => {
          const keywordLower = keyword.toLowerCase();
          
          // Only check in technologies array for exact matches (case-insensitive)
          const techMatch = project.technologies?.some((tech: string) => 
            tech.toLowerCase() === keywordLower
          ) || false;
          
          return techMatch;
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
