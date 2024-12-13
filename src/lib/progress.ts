export type Progress = {
  completedCommands: string[];
  level: number;
  experience: number;
};

export const LEVELS = {
  DEBUTANT: 1,
  INTERMEDIAIRE: 2,
  AVANCE: 3,
};

export function calculateLevel(completedCommands: string[]): number {
  const commandCount = completedCommands.length;
  if (commandCount >= 30) return LEVELS.AVANCE;
  if (commandCount >= 15) return LEVELS.INTERMEDIAIRE;
  return LEVELS.DEBUTANT;
}

export function calculateExperience(completedCommands: string[]): number {
  return completedCommands.length * 10;
}

export function loadProgress(): Progress {
  if (typeof window === 'undefined') {
    return {
      completedCommands: [],
      level: 1,
      experience: 0
    };
  }

  const saved = localStorage.getItem('gitProgress');
  return saved ? JSON.parse(saved) : {
    completedCommands: [],
    level: 1,
    experience: 0
  };
}

export function saveProgress(progress: Progress): void {
  if (typeof window !== 'undefined') {
    localStorage.setItem('gitProgress', JSON.stringify(progress));
  }
} 