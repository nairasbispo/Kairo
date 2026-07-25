import { createClient } from '@supabase/supabase-js';
import { UserProfile, LearnedWord, DaySchedule } from '../types';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || (typeof process !== 'undefined' && process.env?.VITE_SUPABASE_URL) || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || (typeof process !== 'undefined' && process.env?.VITE_SUPABASE_ANON_KEY) || '';

export const isSupabaseConfigured = Boolean(supabaseUrl && supabaseAnonKey);

export const supabase = isSupabaseConfigured
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null;

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
