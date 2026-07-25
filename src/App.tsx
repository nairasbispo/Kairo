import { useState, useEffect } from 'react';
import { AppView, SkillType, UserProfile } from './types';
import { INITIAL_SKILL_PRIORITIES, INITIAL_CUSTOM_SCHEDULE } from './data/mockData';
import { INITIAL_LEARNED_WORDS } from './data/vocabData';
import { 
  supabase, 
  isSupabaseConfigured, 
  syncUserProfileToSupabase, 
  fetchUserProfileFromSupabase,
  createCleanUserProfile,
  DEMO_USER_PROFILE
} from './lib/supabase';
import { LandingView } from './components/LandingView';
import { OnboardingView } from './components/OnboardingView';
import { DashboardView } from './components/DashboardView';
import { StudyStudioView } from './components/StudyStudioView';
import { AnalyticsView } from './components/AnalyticsView';
import { PlanningView } from './components/PlanningView';
import { VocabRepositoryView } from './components/VocabRepositoryView';
import { AuthView } from './components/AuthView';
import { GeminiModal } from './components/GeminiModal';

export default function App() {
  const [currentView, setCurrentView] = useState<AppView>('landing');
  const [user, setUser] = useState<UserProfile>(() => {
    const saved = localStorage.getItem('kairo_user');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { /* ignore */ }
    }
    return DEMO_USER_PROFILE;
  });

  const [initialStudySkill, setInitialStudySkill] = useState<SkillType>('listening');
  const [isCoachOpen, setIsCoachOpen] = useState<boolean>(false);

  // Supabase Auth Listener
  useEffect(() => {
    if (!isSupabaseConfigured || !supabase) return;

    const initUserFromSession = async (sessionUser: any) => {
      const email = sessionUser.email || '';
      const name = sessionUser.user_metadata?.full_name || sessionUser.user_metadata?.name || email.split('@')[0];
      const profile = await fetchUserProfileFromSupabase(email, name);
      setUser(profile);
    };

    // Fetch active session
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session?.user) {
        initUserFromSession(session.user);
      }
    });

    // Listen to session changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (_event, session) => {
      if (session?.user) {
        initUserFromSession(session.user);
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

  const handleLogin = async (name: string, email: string) => {
    const profile = await fetchUserProfileFromSupabase(email, name);
    setUser(profile);
    localStorage.setItem('kairo_user', JSON.stringify(profile));
  };

  const handleLogout = async () => {
    if (isSupabaseConfigured && supabase) {
      await supabase.auth.signOut();
    }
    localStorage.removeItem('kairo_user');
    const cleanGuest = createCleanUserProfile('Visitante', '');
    cleanGuest.isLoggedIn = false;
    setUser(cleanGuest);
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
