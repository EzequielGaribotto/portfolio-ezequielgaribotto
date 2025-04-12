export interface Project {
  id: string;
  shortName: string;
  image: string;
  titleKey: string;
  descriptionKey: string;
  startDateKey: string; // Translation key for start date
  endDateKey: string | null; // Translation key for end date (null for ongoing projects)
  repoLink?: string;
  programameLink?: string;
  arcadeLink?: string;
  playStoreLink?: string;
}