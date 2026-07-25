import { useState, useEffect } from 'react';
import { AppView, SkillType, UserProfile } from './types';
import { INITIAL_SKILL_PRIORITIES, INITIAL_CUSTOM_SCHEDULE } from './data/mockData';
import { INITIAL_LEARNED_WORDS } from './data/vocabData';
import { supabase, isSupabaseConfigured, syncUserProfileToSupabase } from './lib/supabase';
import { LandingView } from './components/LandingView';
import { OnboardingView } from './components/OnboardingView';
import { DashboardView } from './components/DashboardView';
import { StudyStudioView } from './components/StudyStudioView';
import { AnalyticsView } from './components/AnalyticsView';
import { PlanningView } from './components/PlanningView';
import { VocabRepositoryView } from './components/VocabRepositoryView';
import { AuthView } from './components/AuthView';
import { GeminiModal } from './components/GeminiModal';

const INITIAL_USER: UserProfile = {
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

export default function App() {
  const [currentView, setCurrentView] = useState<AppView>('landing');
  const [user, setUser] = useState<UserProfile>(() => {
    const saved = localStorage.getItem('kairo_user');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { /* ignore */ }
    }
    return INITIAL_USER;
  });

  const [initialStudySkill, setInitialStudySkill] = useState<SkillType>('listening');
  const [isCoachOpen, setIsCoachOpen] = useState<boolean>(false);

  // Supabase Auth Listener
  useEffect(() => {
    if (!isSupabaseConfigured || !supabase) return;

    // Fetch active session
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session?.user) {
        setUser(prev => {
          const updated = {
            ...prev,
            email: session.user.email || prev.email,
            name: session.user.user_metadata?.full_name || session.user.user_metadata?.name || prev.name,
            isLoggedIn: true
          };
          syncUserProfileToSupabase(updated);
          return updated;
        });
      }
    });

    // Listen to session changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session?.user) {
        setUser(prev => {
          const updated = {
            ...prev,
            email: session.user.email || prev.email,
            name: session.user.user_metadata?.full_name || session.user.user_metadata?.name || prev.name,
            isLoggedIn: true
          };
          syncUserProfileToSupabase(updated);
          return updated;
        });
      } else {
        setUser(prev => ({ ...prev, isLoggedIn: false }));
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  // Sync to localStorage
  useEffect(() => {
    localStorage.setItem('kairo_user', JSON.stringify(user));
  }, [user]);

  const handleUpdateUser = (updated: Partial<UserProfile>) => {
    setUser(prev => {
      const newUser = { ...prev, ...updated };
      syncUserProfileToSupabase(newUser);
      return newUser;
    });
  };

  const handleStartStudySession = (skill: SkillType = 'listening') => {
    setInitialStudySkill(skill);
    setCurrentView('study');
  };

  const handleLogin = (name: string, email: string) => {
    setUser(prev => {
      const updated = { ...prev, name, email, isLoggedIn: true };
      syncUserProfileToSupabase(updated);
      return updated;
    });
  };

  const handleLogout = async () => {
    if (isSupabaseConfigured && supabase) {
      await supabase.auth.signOut();
    }
    setUser(prev => ({ ...prev, isLoggedIn: false }));
    setCurrentView('landing');
  };

  return (
    <div className="min-h-screen bg-[#fff8f5] text-[#1e1b18] font-sans antialiased">
      {currentView === 'landing' && (
        <LandingView
          onStartOnboarding={() => setCurrentView('onboarding')}
          onNavigate={(view) => setCurrentView(view)}
        />
      )}

      {currentView === 'onboarding' && (
        <OnboardingView
          user={user}
          onUpdateUser={handleUpdateUser}
          onFinishOnboarding={() => setCurrentView('dashboard')}
          onNavigate={(view) => setCurrentView(view)}
        />
      )}

      {currentView === 'dashboard' && (
        <DashboardView
          user={user}
          onNavigate={(view) => setCurrentView(view)}
          onStartStudySession={handleStartStudySession}
          onOpenCoach={() => setIsCoachOpen(true)}
        />
      )}

      {currentView === 'study' && (
        <StudyStudioView
          user={user}
          initialSkill={initialStudySkill}
          onNavigate={(view) => setCurrentView(view)}
          onOpenCoach={() => setIsCoachOpen(true)}
        />
      )}

      {currentView === 'analytics' && (
        <AnalyticsView
          user={user}
          onNavigate={(view) => setCurrentView(view)}
          onOpenCoach={() => setIsCoachOpen(true)}
        />
      )}

      {currentView === 'vocab' && (
        <VocabRepositoryView
          user={user}
          onUpdateUser={handleUpdateUser}
          onNavigate={(view) => setCurrentView(view)}
          onOpenCoach={() => setIsCoachOpen(true)}
        />
      )}

      {currentView === 'planning' && (
        <PlanningView
          user={user}
          onUpdateUser={handleUpdateUser}
          onNavigate={(view) => setCurrentView(view)}
          onOpenCoach={() => setIsCoachOpen(true)}
        />
      )}

      {currentView === 'auth' && (
        <AuthView
          onLogin={handleLogin}
          onNavigate={(view) => setCurrentView(view)}
        />
      )}

      {/* Floating Gemini AI Tutor Coach Dialog */}
      <GeminiModal
        isOpen={isCoachOpen}
        onClose={() => setIsCoachOpen(false)}
        targetLanguage={user.targetLanguage === 'EN' ? 'Inglês' : 'Francês'}
      />
    </div>
  );
}
