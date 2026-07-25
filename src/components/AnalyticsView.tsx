import React from 'react';
import { AppView, UserProfile } from '../types';
import { Sidebar } from './Sidebar';
import { RadarChart } from './RadarChart';
import { LANGUAGES_DATA } from '../data/mockData';

interface AnalyticsViewProps {
  user: UserProfile;
  onNavigate: (view: AppView) => void;
  onOpenCoach: () => void;
}

export const AnalyticsView: React.FC<AnalyticsViewProps> = ({
  user,
  onNavigate,
  onOpenCoach
}) => {
  const radarData = [
    { label: 'Speaking', value: 68 },
    { label: 'Listening', value: 82 },
    { label: 'Reading', value: 78 },
    { label: 'Writing', value: 65 },
  ];

  const totalHours = LANGUAGES_DATA.reduce((acc, curr) => acc + (curr.hoursStudied || 0), 0);

  return (
    <div className="min-h-screen bg-[#fff8f5] text-[#1e1b18] flex flex-col pt-16">
      <header className="fixed top-0 left-0 w-full h-16 bg-[#fff8f5]/90 backdrop-blur-md border-b border-[#efe6e2] z-40 px-6 flex items-center justify-between">
        <span className="font-serif text-lg font-bold text-[#9a4029]">Kairo Analytics & Insights</span>
        <button
          onClick={() => onNavigate('dashboard')}
          className="px-4 py-1.5 border border-[#89726c] text-[#56423d] hover:bg-[#f5ece7] rounded-full text-xs font-semibold"
        >
          Voltar ao Dashboard
        </button>
      </header>

      <div className="flex flex-1">
        <Sidebar currentView="analytics" onNavigate={onNavigate} onOpenCoach={onOpenCoach} />

        <main className="flex-1 p-6 lg:p-10 space-y-8 max-w-6xl mx-auto w-full">
          <div className="space-y-2">
            <span className="text-xs font-bold text-[#9a4029] uppercase tracking-widest bg-[#f2dccb] px-3 py-1 rounded-full">
              Relatório de Desempenho
            </span>
            <h1 className="font-serif text-3xl font-semibold text-[#1e1b18]">
              Análise Comparativa & Multidimensional
            </h1>
            <p className="text-xs text-[#56423d]">
              Acompanhe a comparação de horas dedicadas e evolução do nivelamento em Inglês, Francês, Espanhol e Italiano.
            </p>
          </div>

          {/* Comparative Section: Hours Spent Per Language */}
          <div className="p-8 rounded-3xl bg-[#f5ece7] border border-[#dcc1ba]/80 space-y-6 shadow-sm">
            <div className="flex flex-wrap justify-between items-center gap-4 border-b border-[#efe6e2] pb-4">
              <div>
                <span className="text-[10px] font-bold text-[#89726c] uppercase block">Dedicacão Total Acumulada</span>
                <h2 className="font-serif text-2xl font-bold text-[#1e1b18]">
                  {totalHours.toFixed(1)} Horas Estudadas
                </h2>
              </div>
              <span className="text-xs font-bold text-[#9a4029] bg-[#f2dccb] px-3 py-1 rounded-full uppercase">
                Comparativo Idiomas
              </span>
            </div>

            {/* Language Comparison Progress Bars */}
            <div className="space-y-5">
              {LANGUAGES_DATA.map((lang) => {
                const percentage = totalHours > 0 ? Math.round(((lang.hoursStudied || 0) / totalHours) * 100) : 25;
                return (
                  <div key={lang.id} className="space-y-1.5">
                    <div className="flex justify-between items-center text-xs">
                      <div className="flex items-center gap-2">
                        <span className="w-7 h-7 rounded-lg bg-[#9a4029] text-white font-bold text-xs flex items-center justify-center">
                          {lang.code}
                        </span>
                        <span className="font-bold text-[#1e1b18]">{lang.name}</span>
                        <span className="text-[10px] font-semibold text-[#89726c] bg-[#fff8f5] px-2 py-0.5 rounded-full border border-[#efe6e2]">
                          {lang.level}
                        </span>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="text-[#89726c]">{percentage}% do tempo</span>
                        <span className="font-bold text-[#9a4029]">{lang.hoursStudied || 0} horas</span>
                      </div>
                    </div>

                    <div className="w-full h-3 bg-[#e9e1dc] rounded-full overflow-hidden p-0.5">
                      <div
                        className="h-full bg-[#9a4029] rounded-full transition-all duration-500"
                        style={{ width: `${percentage}%` }}
                      ></div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Radar Chart & Insights */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div className="p-8 rounded-3xl bg-[#f5ece7] border border-[#dcc1ba] flex flex-col items-center">
              <span className="text-xs font-bold text-[#89726c] uppercase mb-4">
                Radar de Competências (Nível B1 Intermediário)
              </span>
              <RadarChart data={radarData} size={280} showLabels={true} />
            </div>

            <div className="space-y-4">
              <div className="p-5 rounded-2xl bg-[#fff8f5] border border-[#efe6e2] space-y-2">
                <span className="text-xs font-bold text-[#9a4029] uppercase block">Destaque da Semana</span>
                <p className="text-sm font-semibold text-[#1e1b18]">
                  Inglês é seu idioma mais estudado (12.5h), seguido por Francês (6.2h) e Espanhol (3.5h).
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-[#fff8f5] border border-[#efe6e2] space-y-2">
                <span className="text-xs font-bold text-[#89726c] uppercase block">Próxima Meta Kairo</span>
                <p className="text-sm text-[#56423d]">
                  Mantenha a frequência de 15 min diários em Italiano para evoluir de A1 para A2 rapidamente.
                </p>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};
