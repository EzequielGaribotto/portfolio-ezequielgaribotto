export interface Experience {
  id: string;
  company: string;
  position: string;
  startDate: Date;
  endDate: Date | null;
  location: string;
  description: string;
  technologies: string[];
  imageUrl?: string;
  companyUrl?: string;
}
