export interface CharacterStats {
  experience: number;
  projectsCompleted: number;
  linesOfCode: number;
  coffeeConsumed: number;
}

export interface TechItem {
  name: string;
  stars: 4 | 5;
  type: string;
  description: string;
}

export interface SkillSet {
  category: string;
  skills: string[];
}

export interface Milestone {
  id: number;
  title: string;
  date: string;
  description: string;
  unlocked: boolean;
}

export interface Project {
  id: number;
  title: string;
  complexity: number;
  description: string;
  videoUrl?: string;
}
