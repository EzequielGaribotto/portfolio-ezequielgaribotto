export interface ProjectDocument {
  id: string;
  label: string;
  file: string;
  pages?: number;
  /** Tags (of the same card) that this document is about: highlighted while hovering its button. */
  technologies?: string[];
}

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
  weight?: number;
  experienceId?: string;
  documents?: ProjectDocument[];
}