import React from 'react';
import { AppView, UserProfile } from '../types';

interface HeaderNavProps {
  currentView: AppView;
  onNavigate: (view: AppView) => void;
  user: UserProfile;
  progressPercent?: number;
  onBack?: () => void;
  title?: string;
  stepText?: string;
}

export const HeaderNav: React.FC<HeaderNavProps> = ({
  currentView,
  onNavigate,
  user,
  progressPercent = 0,
  onBack,
  stepText
}) => {
  return (
    <>
      {/* Onboarding top progress bar */}
      {(currentView === 'onboarding' || currentView === 'assessment' || currentView === 'plan-summary') && (
        <nav className="fixed top-0 left-0 w-full h-1 z-50 bg-[#e9e1dc]">
          <div
            className="h-full bg-[#9a4029] transition-all duration-500 ease-in-out shadow-[0_0_8px_rgba(154,64,41,0.4)]"
            style={{ width: `${Math.min(100, Math.max(5, progressPercent))}%` }}
          />
        </nav>
      )}

      <header className="fixed top-1 left-0 w-full z-40 bg-[#fff8f5]/90 backdrop-blur-md border-b border-[#efe6e2]/60">
        <div className="h-16 max-w-6xl mx-auto px-4 sm:px-8 flex items-center justify-between">
          {/* Back button or Brand */}
          <div className="flex items-center gap-3">
            {onBack ? (
              <button
                onClick={onBack}
                className="flex items-center gap-1.5 text-[#56423d] hover:text-[#9a4029] transition-colors font-medium text-sm"
              >
                <span className="material-symbols-outlined text-[20px]">arrow_back</span>
                <span>Voltar</span>
              </button>
            ) : (
              <button
                onClick={() => onNavigate('landing')}
                className="flex items-center gap-2 group"
              >
                <div className="w-7 h-7 rounded-lg bg-[#9a4029] text-[#fff8f5] flex items-center justify-center font-bold text-base shadow-sm group-hover:scale-105 transition-transform">
                  K
                </div>
                <span className="font-serif text-xl font-semibold text-[#9a4029]">Kairo</span>
              </button>
            )}
          </div>

          {/* Center Brand / Step info */}
          <div className="flex items-center gap-2">
            {onBack && (
              <button onClick={() => onNavigate('landing')} className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-md bg-[#9a4029] text-white flex items-center justify-center font-bold text-xs">
                  K
                </div>
                <span className="font-serif text-lg font-semibold text-[#9a4029]">Kairo</span>
              </button>
            )}
            {stepText && (
              <span className="text-xs font-semibold tracking-wider text-[#9a4029] uppercase bg-[#f5ece7] px-2.5 py-1 rounded-full ml-2">
                {stepText}
              </span>
            )}
          </div>

          {/* Right Controls */}
          <div className="flex items-center gap-4">
            {/* Database Sync Status Badge */}
            <div className="hidden md:flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-semibold bg-[#e9e1dc]/60 text-[#56423d]">
              <span className="w-2 h-2 rounded-full bg-[#34a853] animate-pulse"></span>
              <span>Supabase Conectado</span>
            </div>

            {user.isLoggedIn ? (
              <div className="flex items-center gap-3">
                {/* Streak Badge */}
                <div className="hidden sm:flex items-center gap-1.5 px-3 py-1 bg-[#f2dccb] text-[#706052] rounded-full text-xs font-semibold">
                  <span className="material-symbols-outlined text-[16px] text-[#9a4029]">local_fire_department</span>
                  <span>{user.streakDays} dias seguidos</span>
                </div>

                <button
                  onClick={() => onNavigate('dashboard')}
                  className="px-4 py-1.5 bg-[#9a4029] text-white rounded-full text-xs font-semibold tracking-wide uppercase hover:bg-[#b9583e] transition-colors shadow-sm"
                >
                  Meu Painel
                </button>
              </div>
            ) : currentView === 'landing' ? (
              <div className="flex items-center gap-3">
                <button
                  onClick={() => onNavigate('auth')}
                  className="text-xs font-semibold text-[#56423d] hover:text-[#9a4029] uppercase tracking-wider px-3 py-1.5"
                >
                  Entrar
                </button>
                <button
                  onClick={() => onNavigate('onboarding')}
                  className="px-4 py-2 bg-[#9a4029] text-white rounded-full text-xs font-semibold tracking-wider uppercase hover:bg-[#b9583e] transition-all shadow-sm"
                >
                  Começar
                </button>
              </div>
            ) : (
              <button
                onClick={() => onNavigate('dashboard')}
                className="text-sm font-medium text-[#89726c] hover:text-[#1e1b18] transition-colors underline underline-offset-4"
              >
                Sair e salvar
              </button>
            )}
          </div>
        </div>
      </header>
    </>
  );
};
