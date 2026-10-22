export interface Project {
  id: string;
  number: string;
  category: string;
  title: string;
  description: string;
  tags: string[];
  version?: string;
  status?: string;
}

export interface SkillCategory {
  title: string;
  skills: string[];
  span?: string;
}

export type ModalType = 'inquiry' | 'easytrip' | 'electrack' | 'palosebo' | null;

export interface InquiryFormData {
  name: string;
  email: string;
  project: string;
  message: string;
  timeline?: string;
}
