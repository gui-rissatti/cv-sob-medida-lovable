// CV Data Types

export interface PersonalData {
  fullName: string;
  email: string;
  phone: string;
  city: string;
  state: string;
  linkedin: string;
  portfolio: string;
}

export interface Experience {
  id: string;
  company: string;
  role: string;
  startDate: string;
  endDate: string;
  isCurrent: boolean;
  achievements: string;
}

export interface Education {
  id: string;
  institution: string;
  degree: string;
  field: string;
  endYear: string;
}

export interface Language {
  name: string;
  level: string;
}

export interface Project {
  id: string;
  name: string;
  description: string;
  url?: string;
}

export interface Certification {
  id: string;
  name: string;
  issuer: string;
  year: string;
}

export interface CVFormData {
  // Personal Data
  personalData: PersonalData;
  // Target Role
  targetRole: string;
  seniority: string;
  location: string;
  // Job Description
  jobDescription: string;
  jobUrl: string;
  companyName: string;
  // Professional Summary
  professionalSummary: string;
  // Experience
  experiences: Experience[];
  // Education
  education: Education[];
  // Skills
  hardSkills: string[];
  softSkills: string[];
  // Languages
  languages: Language[];
  // Extras
  projects: Project[];
  certifications: Certification[];
}

export interface GenerationSettings {
  tone: "direto" | "tecnico" | "executivo";
  length: "1page" | "2pages";
  language: "pt-BR" | "en";
  focus: "relevancia" | "ats" | "impacto";
  includePhoto: boolean;
  includeAddress: boolean;
  emphasizeLeadership: boolean;
}

export interface CVHistoryItem {
  id: string;
  name: string;
  targetJob: string;
  companyName: string;
  createdAt: string;
  updatedAt: string;
  status: "draft" | "generated" | "exported";
  formData: CVFormData;
  settings: GenerationSettings;
  generatedContent?: GeneratedCV;
}

export interface GeneratedCV {
  headline: string;
  contact: string;
  summary: string;
  experienceBlocks: Array<{
    id: string;
    company: string;
    role: string;
    period: string;
    bullets: string[];
  }>;
  educationBlocks: Array<{
    id: string;
    institution: string;
    degree: string;
    field: string;
    year: string;
  }>;
  skills: string[];
  languages: Array<{ name: string; level: string }>;
  extras?: {
    projects?: Array<{ name: string; description: string }>;
    certifications?: Array<{ name: string; issuer: string; year: string }>;
  };
}

export const initialPersonalData: PersonalData = {
  fullName: "",
  email: "",
  phone: "",
  city: "",
  state: "",
  linkedin: "",
  portfolio: "",
};

export const initialFormData: CVFormData = {
  personalData: initialPersonalData,
  targetRole: "",
  seniority: "",
  location: "",
  jobDescription: "",
  jobUrl: "",
  companyName: "",
  professionalSummary: "",
  experiences: [
    {
      id: crypto.randomUUID(),
      company: "",
      role: "",
      startDate: "",
      endDate: "",
      isCurrent: false,
      achievements: "",
    },
  ],
  education: [
    {
      id: crypto.randomUUID(),
      institution: "",
      degree: "",
      field: "",
      endYear: "",
    },
  ],
  hardSkills: [],
  softSkills: [],
  languages: [],
  projects: [],
  certifications: [],
};

export const initialSettings: GenerationSettings = {
  tone: "direto",
  length: "1page",
  language: "pt-BR",
  focus: "relevancia",
  includePhoto: false,
  includeAddress: false,
  emphasizeLeadership: false,
};
