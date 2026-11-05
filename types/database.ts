export type UserRole = "business" | "talent" | "admin";

export type ApplicationStatus = "pending" | "reviewed" | "accepted" | "rejected";

export interface User {
  id: string;
  email: string;
  role: UserRole;
  full_name?: string | null;
  created_at: string;
  updated_at: string;
}

export interface BusinessProfile {
  id: string;
  user_id: string;
  company_name: string;
  website?: string | null;
  industry?: string | null;
  company_size?: string | null;
  location?: string | null;
  description?: string | null;
  created_at: string;
  updated_at: string;
}

export interface TalentProfile {
  id: string;
  user_id: string;
  headline?: string | null;
  location?: string | null;
  years_of_experience?: number | null;
  skills?: string[] | null;
  preferred_roles?: string[] | null;
  availability?: string | null;
  bio?: string | null;
  linkedin_url?: string | null;
  portfolio_url?: string | null;
  cv_url?: string | null;
  created_at: string;
  updated_at: string;
}

export interface OnboardingApplication {
  id: string;
  company_name: string;
  website?: string | null;
  industry?: string | null;
  company_size?: string | null;
  location?: string | null;
  contact_name: string;
  contact_title?: string | null;
  contact_email: string;
  contact_phone?: string | null;
  services_interested?: string[] | null;
  challenge_description?: string | null;
  how_heard?: string | null;
  status: ApplicationStatus;
  created_at: string;
  updated_at: string;
}

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  content: string;
  excerpt?: string | null;
  cover_image?: string | null;
  author_id?: string | null;
  published: boolean;
  published_at?: string | null;
  created_at: string;
  updated_at: string;
}

export interface Opportunity {
  id: string;
  title: string;
  company_name: string;
  location?: string | null;
  role_type?: string | null;
  description?: string | null;
  budget?: string | null;
  skills_required?: string[] | null;
  status: "open" | "closed";
  created_at: string;
}

