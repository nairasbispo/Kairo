import React from 'react';
import { AppView, UserProfile } from '../types';
import { Sidebar } from './Sidebar';
import { LANGUAGES_DATA } from '../data/mockData';

interface DashboardViewProps {
  user: UserProfile;
  onNavigate: (view: AppView) => void;
  onStartStudySession: (skill?: 'listening' | 'speaking' | 'reading' | 'writing') => void;
  onOpenCoach: () => void;
}

export const DashboardView: React.FC<DashboardViewProps> = ({
  user,
  onNavigate,
  onStartStudySession,
  onOpenCoach
}) => {
  return (
    <div className="min-h-screen bg-[#fff8f5] text-[#1e1b18] flex flex-col pt-16">
      {/* Top Header */}
      <header className="fixed top-0 left-0 w-full h-16 bg-[#fff8f5]/90 backdrop-blur-md border-b border-[#efe6e2] z-40 px-6 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button
            onClick={() => onStartStudySession()}
            className="px-4 py-1.5 bg-[#9a4029] text-white text-xs font-semibold uppercase tracking-wider rounded-full hover:bg-[#b9583e] transition-colors flex items-center gap-1.5 shadow-sm"
          >
            <span className="w-2 h-2 rounded-full bg-white animate-pulse"></span>
            <span>Sessão Ativa</span>
          </button>
          <span className="font-serif text-lg font-bold text-[#9a4029]">Kairo Dashboard</span>
        </div>

        <div className="flex items-center gap-4">
          {/* Supabase Status Pill */}
          <div className="hidden sm:flex items-center gap-1.5 px-3 py-1 bg-[#e9e1dc]/70 text-[#56423d] rounded-full text-xs font-semibold">
            <span className="w-2 h-2 rounded-full bg-[#34a853] animate-pulse"></span>
            <span>Supabase Ativo</span>
          </div>

          {/* Streak badge */}
          <div className="flex items-center gap-1.5 px-3 py-1 bg-[#f2dccb] text-[#706052] rounded-full text-xs font-semibold">
            <span className="material-symbols-outlined text-[16px] text-[#9a4029]">local_fire_department</span>
            <span>{user.streakDays} dias seguidos</span>
          </div>

          <button
            onClick={onOpenCoach}
            className="p-2 rounded-full hover:bg-[#f5ece7] text-[#56423d] transition-colors relative"
            title="Tutor AI Kairo"
          >
            <span className="material-symbols-outlined text-[20px]">auto_awesome</span>
            <span className="absolute top-1 right-1 w-2 h-2 bg-[#9a4029] rounded-full"></span>
          </button>

          {/* Profile user info */}
          <div className="flex items-center gap-2 pl-2 border-l border-[#efe6e2]">
            <div className="w-8 h-8 rounded-full bg-[#9a4029] text-white font-bold flex items-center justify-center text-xs shadow-sm">
              {user.name.charAt(0)}
            </div>
            <span className="font-semibold text-xs text-[#1e1b18]">{user.name}</span>
          </div>
        </div>
      </header>

      <div className="flex flex-1">
        {/* Left Sidebar */}
        <Sidebar currentView="dashboard" onNavigate={onNavigate} onOpenCoach={onOpenCoach} />

        {/* Main Dashboard Content */}
        <main className="flex-1 p-6 lg:p-10 space-y-8 max-w-7xl mx-auto w-full">
          {/* Today's Mission Hero Banner */}
          <div className="p-8 rounded-3xl bg-gradient-to-r from-[#f5ece7] via-[#fbf2ed] to-[#fff8f5] border border-[#dcc1ba]/60 shadow-sm relative overflow-hidden">
            <div className="max-w-2xl space-y-4">
              <span className="text-xs font-semibold text-[#9a4029] uppercase tracking-widest bg-[#f2dccb] px-3 py-1 rounded-full">
                Missão de Hoje
              </span>

              <h1 className="font-serif text-3xl sm:text-4xl font-semibold text-[#1e1b18] tracking-tight">
                {user.dailyMinutes} minutos para avançar em {user.targetLanguage === 'EN' ? 'Inglês' : user.targetLanguage === 'FR' ? 'Francês' : user.targetLanguage === 'ES' ? 'Espanhol' : 'Italiano'}.
              </h1>

              <p className="text-xs sm:text-sm text-[#56423d] leading-relaxed">
                A atividade de hoje foca na expansão de vocabulário e escuta ativa ({user.diagnosticScore?.overallLevel || 'Nível em Avaliação'}).
              </p>

              <div className="flex flex-wrap items-center gap-3 pt-2">
                <button
                  onClick={() => onStartStudySession('listening')}
                  className="px-6 py-3 bg-[#9a4029] text-white rounded-xl text-xs font-semibold uppercase tracking-wider hover:bg-[#b9583e] transition-all shadow-md flex items-center gap-2"
                >
                  <span className="material-symbols-outlined text-[18px]">play_arrow</span>
                  <span>Iniciar Estudo (15 min Podcast)</span>
                </button>

                <button
                  onClick={() => onStartStudySession('speaking')}
                  className="px-5 py-3 border border-[#89726c] text-[#56423d] hover:bg-[#fff8f5] rounded-xl text-xs font-semibold transition-all flex items-center gap-1.5"
                >
                  <span className="material-symbols-outlined text-[18px]">mic</span>
                  <span>Praticar Fala com IA</span>
                </button>
              </div>
            </div>
          </div>

          {/* Languages Grid & Comparative Section */}
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <div>
                <span className="text-[10px] font-bold text-[#89726c] uppercase block">Seus Idiomas em Estudo</span>
                <h2 className="font-serif text-2xl font-semibold text-[#1e1b18]">
                  Progresso & Nivelamento por Idioma
                </h2>
              </div>
              <button
                onClick={() => onNavigate('onboarding')}
                className="text-xs font-semibold text-[#9a4029] hover:underline"
              >
                + Gerenciar Idiomas
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {LANGUAGES_DATA.map((lang) => (
                <div
                  key={lang.id}
                  onClick={() => onStartStudySession()}
                  className="p-5 rounded-2xl bg-[#fff8f5] border border-[#efe6e2] hover:border-[#9a4029]/50 transition-all cursor-pointer shadow-sm space-y-3 group"
                >
                  <div className="flex justify-between items-start">
                    <div className="w-10 h-10 rounded-xl bg-[#f5ece7] text-[#9a4029] flex items-center justify-center font-bold text-lg group-hover:bg-[#9a4029] group-hover:text-white transition-colors">
                      {lang.code}
                    </div>
                    <span className="text-[10px] font-bold text-[#89726c] uppercase bg-[#e9e1dc]/50 px-2 py-0.5 rounded-full">
                      {lang.level}
                    </span>
                  </div>

                  <div>
                    <span className="font-semibold text-base text-[#1e1b18] block">{lang.name}</span>
                    <span className="text-xs text-[#56423d] block">{lang.recommendedFocus}</span>
                  </div>

                  <div className="space-y-1">
                    <div className="flex justify-between text-[11px] font-semibold text-[#89726c]">
                      <span>Horas Dedicadas</span>
                      <span className="text-[#9a4029] font-bold">{lang.hoursStudied || 0}h</span>
                    </div>
                    <div className="w-full h-1.5 bg-[#e9e1dc] rounded-full overflow-hidden">
                      <div
                        className="h-full bg-[#9a4029]"
                        style={{ width: `${Math.min(100, ((lang.hoursStudied || 1) / 15) * 100)}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Access Cards: Vocab Repo & Planning */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div
              onClick={() => onNavigate('vocab')}
              className="p-6 rounded-3xl bg-[#f5ece7] border border-[#dcc1ba]/80 hover:border-[#9a4029] transition-all cursor-pointer shadow-sm flex items-center justify-between group"
            >
              <div className="space-y-1">
                <span className="text-[10px] font-bold text-[#9a4029] uppercase tracking-wider block">
                  Dicionário Pessoal
                </span>
                <h3 className="font-serif text-xl font-bold text-[#1e1b18] group-hover:text-[#9a4029] transition-colors">
                  Repositório de Vocabulário & IPA
                </h3>
                <p className="text-xs text-[#56423d]">
                  Palavras aprendidas com notação fonética IPA, áudio e tradução contextual.
                </p>
              </div>
              <div className="w-12 h-12 rounded-2xl bg-[#9a4029] text-white flex items-center justify-center shrink-0 shadow-md group-hover:scale-105 transition-transform">
                <span className="material-symbols-outlined text-[24px]">spellcheck</span>
              </div>
            </div>

            <div
              onClick={() => onNavigate('planning')}
              className="p-6 rounded-3xl bg-[#fbf2ed] border border-[#dcc1ba]/80 hover:border-[#9a4029] transition-all cursor-pointer shadow-sm flex items-center justify-between group"
            >
              <div className="space-y-1">
                <span className="text-[10px] font-bold text-[#9a4029] uppercase tracking-wider block">
                  Cronograma Adaptativo
                </span>
                <h3 className="font-serif text-xl font-bold text-[#1e1b18] group-hover:text-[#9a4029] transition-colors">
                  Planejamento Personalizado
                </h3>
                <p className="text-xs text-[#56423d]">
                  Configure metas diárias, horários flexíveis e dias de estudo sob medida.
                </p>
              </div>
              <div className="w-12 h-12 rounded-2xl bg-[#9a4029] text-white flex items-center justify-center shrink-0 shadow-md group-hover:scale-105 transition-transform">
                <span className="material-symbols-outlined text-[24px]">calendar_month</span>
              </div>
            </div>
          </div>

          {/* Progress & Skills Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Left: Level & Skill Meters */}
            <div className="lg:col-span-7 p-6 rounded-3xl bg-[#f5ece7]/60 border border-[#dcc1ba]/60 space-y-6">
              <div className="flex justify-between items-center border-b border-[#efe6e2] pb-4">
                <div>
                  <span className="text-[10px] font-bold text-[#89726c] uppercase block">Status do Idioma ({user.targetLanguage})</span>
                  <h3 className="font-serif text-xl font-semibold text-[#1e1b18]">
                    {user.diagnosticScore?.overallLevel || 'Nível B1 Intermediário'}
                  </h3>
                </div>
                <span className="text-xs font-bold text-[#9a4029] bg-[#f2dccb] px-3 py-1 rounded-full">
                  Compreensão {user.diagnosticScore?.comprehension || 80}%
                </span>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 rounded-2xl bg-[#fff8f5] border border-[#efe6e2] space-y-2">
                  <div className="flex justify-between items-center text-xs">
                    <span className="font-semibold text-[#1e1b18]">Compreensão</span>
                    <span className="font-bold text-[#9a4029]">{user.diagnosticScore?.comprehension || 82}%</span>
                  </div>
                  <div className="w-full h-2 bg-[#e9e1dc] rounded-full overflow-hidden">
                    <div className="h-full bg-[#9a4029]" style={{ width: `${user.diagnosticScore?.comprehension || 82}%` }}></div>
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-[#fff8f5] border border-[#efe6e2] space-y-2">
                  <div className="flex justify-between items-center text-xs">
                    <span className="font-semibold text-[#1e1b18]">Vocabulário</span>
                    <span className="font-bold text-[#9a4029]">{user.diagnosticScore?.vocabulary || 68}%</span>
                  </div>
                  <div className="w-full h-2 bg-[#e9e1dc] rounded-full overflow-hidden">
                    <div className="h-full bg-[#9a4029]" style={{ width: `${user.diagnosticScore?.vocabulary || 68}%` }}></div>
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-[#fff8f5] border border-[#efe6e2] space-y-2">
                  <div className="flex justify-between items-center text-xs">
                    <span className="font-semibold text-[#1e1b18]">Reading (Leitura)</span>
                    <span className="font-bold text-[#9a4029]">{user.diagnosticScore?.reading || 78}%</span>
                  </div>
                  <div className="w-full h-2 bg-[#e9e1dc] rounded-full overflow-hidden">
                    <div className="h-full bg-[#9a4029]" style={{ width: `${user.diagnosticScore?.reading || 78}%` }}></div>
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-[#fff8f5] border border-[#efe6e2] space-y-2">
                  <div className="flex justify-between items-center text-xs">
                    <span className="font-semibold text-[#1e1b18]">Grammar (Gramática)</span>
                    <span className="font-bold text-[#9a4029]">{user.diagnosticScore?.grammar || 70}%</span>
                  </div>
                  <div className="w-full h-2 bg-[#e9e1dc] rounded-full overflow-hidden">
                    <div className="h-full bg-[#9a4029]" style={{ width: `${user.diagnosticScore?.grammar || 70}%` }}></div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right: Weekly Study Hours Chart */}
            <div className="lg:col-span-5 p-6 rounded-3xl bg-[#fff8f5] border border-[#efe6e2] space-y-6 shadow-sm">
              <div className="flex justify-between items-center">
                <div>
                  <span className="text-[10px] font-bold text-[#89726c] uppercase block">Dedicacão Semanal</span>
                  <h3 className="font-serif text-xl font-semibold text-[#1e1b18]">5.2 Horas Estudadas</h3>
                </div>
                <span className="material-symbols-outlined text-[24px] text-[#9a4029]">bar_chart</span>
              </div>

              <div className="flex items-end justify-between h-36 pt-4 border-b border-[#efe6e2] gap-2">
                {[
                  { day: 'SEG', height: '60%', mins: '45m' },
                  { day: 'TER', height: '80%', mins: '60m' },
                  { day: 'QUA', height: '40%', mins: '30m' },
                  { day: 'QUI', height: '90%', mins: '75m' },
                  { day: 'SEX', height: '70%', mins: '50m' },
                  { day: 'SÁB', height: '30%', mins: '20m' },
                  { day: 'DOM', height: '50%', mins: '35m' },
                ].map((bar, i) => (
                  <div key={i} className="flex-1 flex flex-col items-center gap-2 group">
                    <div className="w-full bg-[#e9e1dc] rounded-t-lg relative overflow-hidden flex items-end h-full">
                      <div
                        className="w-full bg-[#9a4029] rounded-t-lg transition-all group-hover:bg-[#b9583e]"
                        style={{ height: bar.height }}
                      ></div>
                    </div>
                    <span className="text-[10px] font-bold text-[#89726c]">{bar.day}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};
