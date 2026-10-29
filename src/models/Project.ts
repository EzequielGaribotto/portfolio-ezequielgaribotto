export interface ProjectDocument {
  id: string;
  label: string;
  file: string;
  pages?: number;
  /** Visible name on the pill (the full label stays as the accessible name and the hover title). */
  shortLabel?: string;
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
  /** Open-ended but not being worked on: the date line reads "since X" instead of "X - present". */
  paused?: boolean;
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
  /** Short text the card shows in place of the description when the full write-up lives elsewhere (see experienceId). */
  summary?: string;
  documents?: ProjectDocument[];
}