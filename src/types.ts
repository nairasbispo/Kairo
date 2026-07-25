export type AppView = 
  | 'landing' 
  | 'onboarding' 
  | 'assessment' 
  | 'assessment-result'
  | 'plan-summary'
  | 'dashboard' 
  | 'study' 
  | 'vocab'
  | 'analytics' 
  | 'planning' 
  | 'auth';

export type AuthMode = 'signin' | 'signup' | 'forgot' | 'sent';

export type SkillType = 'speaking' | 'listening' | 'reading' | 'writing';

export interface LanguageProgress {
  id: string;
  name: string;
  code: string; // 'EN' | 'FR' | 'ES' | 'IT'
  level: string; // e.g., 'B1', 'A2', 'A1'
  fluencyPercent: number;
  tag: string;
  color?: string;
  flagCode?: string;
  recommendedFocus?: string;
  hoursStudied?: number;
}

export interface SkillPriority {
  id: SkillType;
  label: string;
  description: string;
  priority: number; // 1 (highest) to 4
  icon: string;
}

export interface DiagnosticQuestion {
  id: number;
  language: 'EN' | 'FR' | 'ES' | 'IT';
  module: string;
  totalQuestions: number;
  questionNumber: number;
  passage?: string;
  questionText: string;
  options: {
    id: string;
    text: string;
    isCorrect: boolean;
    explanation: string;
  }[];
  skillCategory: SkillType;
  levelTarget?: string; // e.g., 'A1', 'A2', 'B1', 'B2', 'C1'
}

export interface LearnedWord {
  id: string;
  language: 'EN' | 'FR' | 'ES' | 'IT';
  word: string;
  ipa: string; // International Phonetic Alphabet notation e.g. /dɪˈsɛntrəlaɪzd/
  translation: string;
  example: string;
  category: 'substantivo' | 'verbo' | 'adjetivo' | 'expressao';
  dateAdded: string;
  mastered: boolean;
}

export interface ScheduledTask {
  id: string;
  title: string;
  durationMinutes: number;
  language: 'EN' | 'FR' | 'ES' | 'IT';
  skill: SkillType;
  completed?: boolean;
}

export interface DaySchedule {
  dayName: string;
  dayCode: string;
  active: boolean;
  tasks: ScheduledTask[];
}

export interface UserProfile {
  name: string;
  email: string;
  isLoggedIn: boolean;
  streakDays: number;
  targetLanguage: string;
  goal: string;
  customGoal?: string;
  learningMethods: string[];
  dailyMinutes: number;
  studyDays: string[];
  selfLevel: string;
  skillPriorities: SkillPriority[];
  languageLevels: {
    EN: string;
    FR: string;
    ES: string;
    IT: string;
  };
  diagnosticScore: {
    overallLevel: string;
    comprehension: number;
    reading: number;
    vocabulary: number;
    grammar: number;
  };
  totalHoursStudied: number;
  weeklyGoalHours: number;
  hoursPerLanguage: {
    EN: number;
    FR: number;
    ES: number;
    IT: number;
  };
  learnedWords: LearnedWord[];
  customSchedule: DaySchedule[];
}

export interface StudySessionState {
  isActive: boolean;
  isPaused: boolean;
  timeRemaining: number; // in seconds
  totalDuration: number; // in seconds
  skill: SkillType;
  language: string;
  mode: 'podcast' | 'ai-chat' | 'vocab-ipa' | 'reading';
  trackTitle: string;
}
