export interface Project {
  id: string;
  title: string;
  description: string;
  footer: string;
  startDate: string;
  endDate: string | null;
  image?: string; // Made optional
  images?: string[]; // Optional array for carousel
  technologies?: string[];
  repoLink?: string;
  programameLink?: string;
  arcadeLink?: string;
  playStoreLink?: string;
  appStoreLink?: string;
  presentationLink?: string;
  websiteLink?: string;
  weight?: number; // Priority/relevance weight for sorting (1-12, lower is higher priority)
}