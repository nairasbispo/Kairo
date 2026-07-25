import { useState, useEffect } from 'react';
import { AppView, SkillType, UserProfile } from './types';
import { 
  auth,
  fetchUserProfileFromFirebase,
  syncUserProfileToFirebase,
  createCleanUserProfile,
  DEMO_USER_PROFILE,
  signOutUser
} from './lib/firebase';
import { onAuthStateChanged } from 'firebase/auth';
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

  // Firebase Auth Listener
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser && firebaseUser.email) {
        const name = firebaseUser.displayName || firebaseUser.email.split('@')[0];
        const profile = await fetchUserProfileFromFirebase(firebaseUser.email, name);
        setUser(profile);
      }
    });

    return () => unsubscribe();
  }, []);

  // Sync to localStorage
  useEffect(() => {
    localStorage.setItem('kairo_user', JSON.stringify(user));
  }, [user]);

  const handleUpdateUser = (updated: Partial<UserProfile>) => {
    setUser(prev => {
      const newUser = { ...prev, ...updated };
      syncUserProfileToFirebase(newUser);
      return newUser;
    });
  };

  const handleStartStudySession = (skill: SkillType = 'listening') => {
    setInitialStudySkill(skill);
    setCurrentView('study');
  };

  const handleLogin = async (name: string, email: string) => {
    const profile = await fetchUserProfileFromFirebase(email, name);
    setUser(profile);
    localStorage.setItem('kairo_user', JSON.stringify(profile));
  };

  const handleLogout = async () => {
    await signOutUser();
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
