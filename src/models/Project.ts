export interface Project {
  id: string;
  title: string;
  description: string;
  footer: string;
  startDate: string;
  endDate: string | null;
  image: string;
  technologies?: string[];
  repoLink?: string;
  programameLink?: string;
  arcadeLink?: string;
  playStoreLink?: string;
}