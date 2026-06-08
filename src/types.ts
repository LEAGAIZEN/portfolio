export type WindowID = 'about' | 'projects' | 'skills' | 'certifications' | 'resume' | 'contact';

export interface WindowState {
  id: WindowID;
  title: string;
  isOpen: boolean;
  isMinimized: boolean;
  isMaximized: boolean;
  // Initial placement coordinates used by the window manager components
  initialX: number;
  initialY: number;
  width: number;
  height: number;
  zIndex: number;
  iconName: string;
}

export interface Project {
  id: string;
  title: string;
  category: string;
  date: string;
  description: string;
  tech: string[];
  points: string[];
  githubUrl?: string;
  liveUrl?: string;
  imageAccent: string; // Background visual glow color (e.g. indigo, cyan, violet)
}

export interface Certification {
  id: string;
  title: string;
  issuer: string;
  date?: string;
  link?: string;
}

export interface SkillCategory {
  name: string;
  icon: string;
  skills: { name: string; level: number; info?: string }[];
}

export interface Message {
  id: string;
  senderName: string;
  senderEmail: string;
  subject: string;
  content: string;
  timestamp: string;
  isRead: boolean;
}
