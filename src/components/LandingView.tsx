import React from 'react';
import { AppView } from '../types';
import { RadarChart } from './RadarChart';

interface LandingViewProps {
  onStartOnboarding: () => void;
  onNavigate: (view: AppView) => void;
}

export const LandingView: React.FC<LandingViewProps> = ({
  onStartOnboarding,
  onNavigate
}) => {
  const radarData = [
    { label: 'Vocabulary', value: 85 },
    { label: 'Grammar', value: 70 },
    { label: 'Speaking', value: 68 },
    { label: 'Listening', value: 82 },
    { label: 'Writing', value: 65 },
  ];

  return (
    <div className="min-h-screen bg-[#fff8f5] text-[#1e1b18] flex flex-col pt-16">
      {/* Top Navbar */}
      <nav className="fixed top-0 left-0 w-full h-16 bg-[#fff8f5]/90 backdrop-blur-md border-b border-[#efe6e2] z-40 px-6 sm:px-12 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-xl bg-[#9a4029] text-white flex items-center justify-center font-bold text-lg shadow-sm">
            K
          </div>
          <span className="font-serif text-2xl font-semibold text-[#9a4029]">Kairo</span>
        </div>

        <div className="hidden md:flex items-center gap-8 text-xs font-semibold text-[#56423d] uppercase tracking-wider">
          <a href="#recursos" className="hover:text-[#9a4029] transition-colors">Recursos</a>
          <a href="#como-funciona" className="hover:text-[#9a4029] transition-colors">Como Funciona</a>
          <button onClick={() => onNavigate('dashboard')} className="hover:text-[#9a4029] transition-colors">
            Dashboard
          </button>
          <a href="#faq" className="hover:text-[#9a4029] transition-colors">FAQ</a>
        </div>

        <div className="flex items-center gap-4">
          <button
            onClick={() => onNavigate('auth')}
            className="text-xs font-semibold text-[#56423d] hover:text-[#9a4029] uppercase tracking-wider px-3 py-1.5"
          >
            Entrar
          </button>
          <button
            onClick={onStartOnboarding}
            className="px-5 py-2.5 bg-[#9a4029] text-white rounded-full text-xs font-semibold uppercase tracking-wider hover:bg-[#b9583e] transition-all shadow-sm"
          >
            Começar Gratuitamente
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-6 lg:px-12 pt-12 pb-16 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        <div className="lg:col-span-6 space-y-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#f2dccb] text-[#706052] text-xs font-semibold uppercase tracking-wider">
            <span className="w-2 h-2 rounded-full bg-[#9a4029] animate-pulse"></span>
            Academic Zen
          </div>

          <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-semibold leading-[1.15] text-[#1e1b18] tracking-tight">
            Transforme sua rotina de idiomas em uma <span className="text-[#9a4029] italic font-normal">jornada inteligente.</span>
          </h1>

          <p className="text-base sm:text-lg text-[#56423d] leading-relaxed max-w-xl">
            Kairo organiza seus estudos, acompanha sua evolução e cria um sistema personalizado para quem aprende vários idiomas ao mesmo tempo.
          </p>

          <div className="flex flex-wrap items-center gap-4 pt-2">
            <button
              onClick={onStartOnboarding}
              className="px-8 py-3.5 bg-[#9a4029] text-white rounded-xl text-sm font-semibold uppercase tracking-wider hover:bg-[#b9583e] transition-all shadow-md hover:shadow-lg flex items-center gap-2"
            >
              <span>Começar Gratuitamente</span>
              <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
            </button>

            <button
              onClick={() => onNavigate('dashboard')}
              className="px-6 py-3.5 border border-[#89726c] text-[#56423d] hover:bg-[#f5ece7] rounded-xl text-sm font-semibold transition-all"
            >
              Ver Demonstração
            </button>
          </div>

          {/* Social Proof */}
          <div className="flex items-center gap-4 pt-4 border-t border-[#efe6e2]">
            <div className="flex -space-x-2">
              <div className="w-8 h-8 rounded-full bg-[#9a4029] text-white flex items-center justify-center font-bold text-xs ring-2 ring-[#fff8f5]">A</div>
              <div className="w-8 h-8 rounded-full bg-[#6c5b4e] text-white flex items-center justify-center font-bold text-xs ring-2 ring-[#fff8f5]">M</div>
              <div className="w-8 h-8 rounded-full bg-[#5d5c58] text-white flex items-center justify-center font-bold text-xs ring-2 ring-[#fff8f5]">J</div>
            </div>
            <span className="text-xs font-semibold text-[#56423d]">
              <strong>2,000+</strong> estudantes ativos na comunidade
            </span>
          </div>
        </div>

        {/* Hero Mockup Graphic */}
        <div className="lg:col-span-6 relative">
          <div className="glass-card rounded-2xl p-6 shadow-xl border border-[#dcc1ba]/80 bg-[#fff8f5]/80 relative overflow-hidden">
            <div className="flex items-center justify-between mb-4 pb-3 border-b border-[#efe6e2]">
              <div className="flex items-center gap-2">
                <div className="w-5 h-5 rounded-md bg-[#9a4029] text-white text-xs font-bold flex items-center justify-center">K</div>
                <span className="font-serif font-semibold text-sm text-[#9a4029]">Kairo Preview</span>
              </div>
              <span className="text-xs font-semibold text-[#9a4029] bg-[#f2dccb] px-2.5 py-0.5 rounded-full">
                Fluência +15% esta semana
              </span>
            </div>

            {/* Language Cards */}
            <div className="grid grid-cols-2 gap-3 mb-4">
              <div className="p-3 bg-[#f2dccb]/60 rounded-xl border border-[#dcc1ba]/40">
                <div className="flex justify-between text-xs font-bold text-[#1e1b18] mb-1">
                  <span>EN (English)</span>
                  <span className="text-[#9a4029]">85%</span>
                </div>
                <div className="w-full h-1.5 bg-[#e9e1dc] rounded-full overflow-hidden">
                  <div className="h-full bg-[#9a4029]" style={{ width: '85%' }}></div>
                </div>
              </div>
              <div className="p-3 bg-[#f5ece7] rounded-xl border border-[#dcc1ba]/40">
                <div className="flex justify-between text-xs font-bold text-[#1e1b18] mb-1">
                  <span>FR (Français)</span>
                  <span className="text-[#9a4029]">60%</span>
                </div>
                <div className="w-full h-1.5 bg-[#e9e1dc] rounded-full overflow-hidden">
                  <div className="h-full bg-[#9a4029]" style={{ width: '60%' }}></div>
                </div>
              </div>
            </div>

            {/* Radar Chart */}
            <div className="bg-[#fbf2ed] p-4 rounded-xl border border-[#efe6e2] flex flex-col items-center">
              <span className="text-xs font-semibold text-[#56423d] uppercase tracking-wider mb-2">
                Análise Multidimensional de Habilidades
              </span>
              <RadarChart data={radarData} size={200} showLabels={true} />
            </div>
          </div>
        </div>
      </section>

      {/* Architecture Features Section */}
      <section id="recursos" className="py-20 bg-[#fbf2ed] border-y border-[#efe6e2]">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
            <span className="text-xs font-semibold tracking-widest text-[#9a4029] uppercase">
              O Método Kairo
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-semibold text-[#1e1b18]">
              Arquitetura para o aprendizado profundo.
            </h2>
            <p className="text-sm text-[#56423d]">
              Elimine o caos das planilhas e aplicativos desconectados com um hub centralizado.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-6 rounded-2xl bg-[#fff8f5] border border-[#efe6e2] space-y-4 hover:border-[#9a4029]/50 transition-all shadow-sm">
              <div className="w-12 h-12 rounded-xl bg-[#f5ece7] text-[#9a4029] flex items-center justify-center">
                <span className="material-symbols-outlined text-[24px]">calendar_month</span>
              </div>
              <h3 className="font-serif text-lg font-semibold text-[#1e1b18]">Planejamento Inteligente</h3>
              <p className="text-xs text-[#56423d] leading-relaxed">
                Organize automaticamente sua rotina de estudos com base nos seus objetivos acadêmicos e profissionais.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-[#fff8f5] border border-[#efe6e2] space-y-4 hover:border-[#9a4029]/50 transition-all shadow-sm">
              <div className="w-12 h-12 rounded-xl bg-[#f5ece7] text-[#9a4029] flex items-center justify-center">
                <span className="material-symbols-outlined text-[24px]">timelapse</span>
              </div>
              <h3 className="font-serif text-lg font-semibold text-[#1e1b18]">Acompanhamento Completo</h3>
              <p className="text-xs text-[#56423d] leading-relaxed">
                Visualize horas de estudo, competências adquiridas e evolução constante com métricas precisas.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-[#fff8f5] border border-[#efe6e2] space-y-4 hover:border-[#9a4029]/50 transition-all shadow-sm">
              <div className="w-12 h-12 rounded-xl bg-[#f5ece7] text-[#9a4029] flex items-center justify-center">
                <span className="material-symbols-outlined text-[24px]">analytics</span>
              </div>
              <h3 className="font-serif text-lg font-semibold text-[#1e1b18]">Estatísticas Visuais</h3>
              <p className="text-xs text-[#56423d] leading-relaxed">
                Gráficos claros e perspicazes sobre seu desempenho em cada habilidade (fala, escuta, leitura, escrita).
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-[#fff8f5] border border-[#efe6e2] space-y-4 hover:border-[#9a4029]/50 transition-all shadow-sm">
              <div className="w-12 h-12 rounded-xl bg-[#f5ece7] text-[#9a4029] flex items-center justify-center">
                <span className="material-symbols-outlined text-[24px]">translate</span>
              </div>
              <h3 className="font-serif text-lg font-semibold text-[#1e1b18]">Múltiplos Idiomas</h3>
              <p className="text-xs text-[#56423d] leading-relaxed">
                Gerencie vários idiomas simultaneamente em um único ambiente focado e sem atritos.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Workflow Steps */}
      <section id="como-funciona" className="py-20 bg-[#fff8f5]">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="text-center max-w-xl mx-auto mb-16 space-y-2">
            <h2 className="font-serif text-3xl font-semibold text-[#1e1b18]">
              O fluxo do conhecimento.
            </h2>
            <p className="text-xs text-[#56423d]">
              Um processo sistemático projetado para eliminar o atrito e maximizar a retenção.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-4 relative">
            {[
              { num: '01', title: 'Teste de nivelamento' },
              { num: '02', title: 'Plano personalizado' },
              { num: '03', title: 'Registro de estudos' },
              { num: '04', title: 'Acompanhamento contínuo' },
              { num: '05', title: 'Objetivos alcançados' },
            ].map((step, idx) => (
              <div key={idx} className="flex flex-col items-center text-center p-4">
                <div className="w-10 h-10 rounded-full bg-[#f5ece7] text-[#9a4029] font-bold text-xs flex items-center justify-center border border-[#dcc1ba] mb-3">
                  {step.num}
                </div>
                <h4 className="font-serif text-sm font-semibold text-[#1e1b18]">{step.title}</h4>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#fbf2ed] border-t border-[#efe6e2] py-12 px-6 lg:px-12 text-xs text-[#56423d]">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <div className="w-5 h-5 bg-[#9a4029] text-white font-bold flex items-center justify-center text-xs rounded">K</div>
              <span className="font-serif font-bold text-base text-[#9a4029]">Kairo</span>
            </div>
            <p className="text-[#89726c]">Academic Zen: Onde a disciplina encontra a clareza intelectual no aprendizado de idiomas.</p>
          </div>

          <div className="flex items-center gap-6">
            <button onClick={onStartOnboarding} className="hover:text-[#9a4029]">Criar Plano</button>
            <button onClick={() => onNavigate('auth')} className="hover:text-[#9a4029]">Acessar Conta</button>
            <button onClick={() => onNavigate('dashboard')} className="hover:text-[#9a4029]">Demonstração</button>
          </div>
        </div>
        <div className="max-w-7xl mx-auto mt-8 pt-6 border-t border-[#efe6e2] text-center text-[#89726c]">
          © {new Date().getFullYear()} Kairo Technologies. Todos os direitos reservados.
        </div>
      </footer>
    </div>
  );
};
