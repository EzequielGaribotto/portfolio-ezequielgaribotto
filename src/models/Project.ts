export interface Project {
  id: string;
  shortName: string;
  image?: string;
  titleKey: string;
  descriptionKey: string;
  playStoreLink?: string; // Optional property for Play Store links
  repoLink?: string; // Optional property for GitHub repository links
}