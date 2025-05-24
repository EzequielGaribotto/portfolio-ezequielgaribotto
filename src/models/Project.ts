export interface Project {
  id: string;
  shortName: string;
  image: string;
  titleKey: string;
  descriptionKey: string;
  footerKey: string;
  startDateKey: string;
  endDateKey: string | null;
  repoLink?: string;
  programameLink?: string;
  arcadeLink?: string;
  playStoreLink?: string;
}