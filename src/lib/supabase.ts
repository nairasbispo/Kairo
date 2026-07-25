import { createClient } from '@supabase/supabase-js';
import { UserProfile, LearnedWord, DaySchedule } from '../types';
import { INITIAL_SKILL_PRIORITIES, INITIAL_CUSTOM_SCHEDULE } from '../data/mockData';
import { INITIAL_LEARNED_WORDS } from '../data/vocabData';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || (typeof process !== 'undefined' && process.env?.VITE_SUPABASE_URL) || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || (typeof process !== 'undefined' && process.env?.VITE_SUPABASE_ANON_KEY) || '';

export const isSupabaseConfigured = Boolean(supabaseUrl && supabaseAnonKey);

export const supabase = isSupabaseConfigured
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null;

// Demo Profile for Alex Silva
export const DEMO_USER_PROFILE: UserProfile = {
  name: 'Alex Silva',
  email: 'alex.estudante@kairo.edu',
  isLoggedIn: true,
  streakDays: 12,
  targetLanguage: 'EN',
  goal: 'conversar',
  customGoal: '',
  learningMethods: ['podcasts', 'conversacao', 'artigos', 'ia'],
  dailyMinutes: 45,
  studyDays: ['M', 'T', 'W', 'T', 'F'],
  selfLevel: 'intermediate',
  skillPriorities: INITIAL_SKILL_PRIORITIES,
  diagnosticScore: {
    overallLevel: 'B1 Intermediário',
    comprehension: 82,
    reading: 78,
    vocabulary: 65,
    grammar: 70
  },
  languageLevels: {
    EN: 'B1',
    FR: 'A2',
    ES: 'A1',
    IT: 'A1'
  },
  hoursPerLanguage: {
    EN: 12.5,
    FR: 6.2,
    ES: 3.5,
    IT: 2.0
  },
  learnedWords: INITIAL_LEARNED_WORDS,
  customSchedule: INITIAL_CUSTOM_SCHEDULE,
  totalHoursStudied: 18.5,
  weeklyGoalHours: 5.0
};

// Clean zeroed profile for a brand new user account
export const createCleanUserProfile = (name: string, email: string): UserProfile => ({
  name: name || email.split('@')[0] || 'Novo Estudante',
  email: email,
  isLoggedIn: true,
  streakDays: 0,
  targetLanguage: 'EN',
  goal: 'conversar',
  customGoal: '',
  learningMethods: ['conversacao', 'artigos'],
  dailyMinutes: 30,
  studyDays: ['M', 'T', 'W', 'T', 'F'],
  selfLevel: 'beginner',
  skillPriorities: INITIAL_SKILL_PRIORITIES,
  diagnosticScore: {
    overallLevel: 'A1 Iniciante',
    comprehension: 0,
    reading: 0,
    vocabulary: 0,
    grammar: 0
  },
  languageLevels: {
    EN: 'A1',
    FR: 'A1',
    ES: 'A1',
    IT: 'A1'
  },
  hoursPerLanguage: {
    EN: 0,
    FR: 0,
    ES: 0,
    IT: 0
  },
  learnedWords: [],
  customSchedule: INITIAL_CUSTOM_SCHEDULE.map(day => ({
    ...day,
    tasks: day.tasks.map(t => ({ ...t, completed: false }))
  })),
  totalHoursStudied: 0,
  weeklyGoalHours: 3.0
});

// Helper to fetch or initialize user profile
export async function fetchUserProfileFromSupabase(email: string, name?: string): Promise<UserProfile> {
  if (email === 'alex.estudante@kairo.edu') {
    return { ...DEMO_USER_PROFILE, email, isLoggedIn: true };
  }

  if (!supabase) {
    return createCleanUserProfile(name || email.split('@')[0], email);
  }

  try {
    const { data, error } = await supabase
      .from('user_profiles')
      .select('*')
      .eq('email', email)
      .maybeSingle();

    if (data && !error) {
      return {
        name: data.name || name || email.split('@')[0],
        email: data.email || email,
        isLoggedIn: true,
        streakDays: data.streak_days ?? 0,
        targetLanguage: data.target_language || 'EN',
        goal: data.goal || 'conversar',
        customGoal: data.custom_goal || '',
        learningMethods: ['conversacao', 'artigos'],
        dailyMinutes: data.daily_minutes || 30,
        studyDays: ['M', 'T', 'W', 'T', 'F'],
        selfLevel: data.self_level || 'beginner',
        skillPriorities: INITIAL_SKILL_PRIORITIES,
        diagnosticScore: {
          overallLevel: 'A1 Iniciante',
          comprehension: 0,
          reading: 0,
          vocabulary: 0,
          grammar: 0
        },
        languageLevels: data.language_levels || { EN: 'A1', FR: 'A1', ES: 'A1', IT: 'A1' },
        hoursPerLanguage: data.hours_per_language || { EN: 0, FR: 0, ES: 0, IT: 0 },
        learnedWords: [],
        customSchedule: INITIAL_CUSTOM_SCHEDULE.map(day => ({
          ...day,
          tasks: day.tasks.map(t => ({ ...t, completed: false }))
        })),
        totalHoursStudied: data.total_hours_studied ? Number(data.total_hours_studied) : 0,
        weeklyGoalHours: data.weekly_goal_hours ? Number(data.weekly_goal_hours) : 3.0
      };
    }
  } catch (err) {
    console.warn('[Supabase Profile Fetch Error]', err);
  }

  const freshProfile = createCleanUserProfile(name || email.split('@')[0], email);
  syncUserProfileToSupabase(freshProfile);
  return freshProfile;
}

// Helper to sync user profile to Supabase
export async function syncUserProfileToSupabase(user: UserProfile) {
  if (!supabase) return { error: 'Supabase URL or Key not set' };

  try {
    const { data, error } = await supabase
      .from('user_profiles')
      .upsert({
        id: user.email || 'default-user',
        email: user.email,
        name: user.name,
        streak_days: user.streakDays,
        target_language: user.targetLanguage,
        goal: user.goal,
        custom_goal: user.customGoal,
        daily_minutes: user.dailyMinutes,
        self_level: user.selfLevel,
        language_levels: user.languageLevels,
        hours_per_language: user.hoursPerLanguage,
        total_hours_studied: user.totalHoursStudied,
        weekly_goal_hours: user.weeklyGoalHours,
        updated_at: new Date().toISOString()
      }, { onConflict: 'id' });

    if (error) console.warn('[Supabase Sync Warning]', error.message);
    return { data, error };
  } catch (err) {
    console.warn('[Supabase Sync Exception]', err);
    return { error: err };
  }
}

// Helper to fetch words from Supabase
export async function fetchLearnedWordsFromSupabase(userEmail: string) {
  if (!supabase) return null;

  try {
    const { data, error } = await supabase
      .from('learned_words')
      .select('*')
      .eq('user_id', userEmail)
      .order('created_at', { ascending: false });

    if (error) {
      console.warn('[Supabase Words Fetch Error]', error.message);
      return null;
    }
    return data;
  } catch (err) {
    console.warn('[Supabase Exception]', err);
    return null;
  }
}

// Helper to save a learned word to Supabase
export async function saveLearnedWordToSupabase(userEmail: string, word: LearnedWord) {
  if (!supabase) return null;

  try {
    const { data, error } = await supabase
      .from('learned_words')
      .upsert({
        id: word.id,
        user_id: userEmail,
        language: word.language,
        word: word.word,
        ipa: word.ipa,
        translation: word.translation,
        example: word.example,
        category: word.category,
        date_added: word.dateAdded,
        mastered: word.mastered,
        created_at: new Date().toISOString()
      }, { onConflict: 'id' });

    if (error) console.warn('[Supabase Word Save Error]', error.message);
    return { data, error };
  } catch (err) {
    console.warn('[Supabase Exception]', err);
    return { error: err };
  }
}
