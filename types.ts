
export enum SkillLevel {
  Iniciante = 'Iniciante',
  Intermediario = 'Intermediário',
  Avancado = 'Avançado',
}

export interface Skill {
  name: string;
  level: SkillLevel;
}

export interface User {
  id: string;
  name: string;
  email: string; // Added email for auth
  role: 'Student' | 'Professor';
  skills: Skill[];
  interests: string[]; // What they want to learn
  isAvailableMentor: boolean;
  badges: Badge[];
  points: number;
  avatar: string;
}

export interface Badge {
  id: string;
  name: string;
  icon: string;
  description: string;
  type: 'collaboration' | 'achievement' | 'learning';
}

export interface Match {
  mentorId: string;
  menteeId: string;
  topic: string;
  compatibilityScore: number;
}

export interface StudyGroup {
  id: string;
  name: string;
  topic: string;
  members: string[]; // User IDs
  reasoning: string;
}

export type RequestStatus = 'pending' | 'accepted' | 'rejected' | 'completed';

export interface MentorshipRequest {
  id: string;
  mentorId: string;
  menteeId: string;
  menteeName: string;
  mentorName: string;
  topic: string;
  status: RequestStatus;
  rating?: number; // Added rating 1-5
}
