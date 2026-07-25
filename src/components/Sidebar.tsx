import React from 'react';
import { AppView } from '../types';

interface SidebarProps {
  currentView: AppView;
  onNavigate: (view: AppView) => void;
  onOpenCoach?: () => void;
  onLogout?: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  currentView,
  onNavigate,
  onOpenCoach,
  onLogout
}) => {
  const menuItems: { id: AppView | 'languages' | 'community' | 'settings'; label: string; icon: string; view?: AppView }[] = [
    { id: 'dashboard', label: 'Dashboard', icon: 'grid_view', view: 'dashboard' },
    { id: 'study', label: 'Estudar', icon: 'menu_book', view: 'study' },
    { id: 'vocab', label: 'Vocabulário & IPA', icon: 'spellcheck', view: 'vocab' },
    { id: 'planning', label: 'Planejamento', icon: 'calendar_today', view: 'planning' },
    { id: 'analytics', label: 'Estatísticas', icon: 'bar_chart', view: 'analytics' },
  ];

  return (
    <aside className="w-64 bg-[#fbf2ed] border-r border-[#efe6e2] flex flex-col justify-between p-6 shrink-0 min-h-[calc(100vh-4rem)]">
      <div>
        {/* Brand */}
        <div className="flex items-center gap-3 mb-8 px-2">
          <div className="w-8 h-8 rounded-xl bg-[#9a4029] text-white flex items-center justify-center font-bold text-lg shadow-sm">
            K
          </div>
          <span className="font-serif text-2xl font-bold text-[#9a4029] tracking-tight">
            Kairo
          </span>
        </div>

        {/* Menu Navigation */}
        <nav className="space-y-1.5">
          {menuItems.map((item) => {
            const isActive = item.view === currentView;
            return (
              <button
                key={item.id}
                onClick={() => item.view && onNavigate(item.view)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-medium text-sm transition-all duration-200 ${
                  isActive
                    ? 'bg-[#9a4029] text-white shadow-sm font-semibold'
                    : 'text-[#56423d] hover:bg-[#efe6e2] hover:text-[#1e1b18]'
                }`}
              >
                <span className="material-symbols-outlined text-[20px]">{item.icon}</span>
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>

        {/* AI Tutor Quick Access Widget */}
        <div className="mt-8 p-4 rounded-2xl bg-[#f5ece7] border border-[#dcc1ba]/60 space-y-3">
          <div className="flex items-center gap-2 text-xs font-semibold text-[#9a4029] uppercase tracking-wider">
            <span className="material-symbols-outlined text-[18px]">auto_awesome</span>
            <span>Tutor AI Kairo</span>
          </div>
          <p className="text-xs text-[#56423d] leading-relaxed">
            Dúvida em gramática ou quer praticar diálogos?
          </p>
          <button
            onClick={onOpenCoach}
            className="w-full py-2 bg-[#9a4029]/10 hover:bg-[#9a4029] text-[#9a4029] hover:text-white rounded-lg text-xs font-semibold transition-all flex items-center justify-center gap-1.5"
          >
            <span className="material-symbols-outlined text-[16px]">chat</span>
            <span>Falar com o Tutor</span>
          </button>
        </div>
      </div>

      {/* Footer / Settings */}
      <div className="pt-6 border-t border-[#efe6e2]">
        <button
          onClick={() => {
            if (onLogout) {
              onLogout();
            } else {
              onNavigate('landing');
            }
          }}
          className="w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-xs font-medium text-[#89726c] hover:text-[#1e1b18] hover:bg-[#efe6e2] transition-colors"
        >
          <span className="material-symbols-outlined text-[18px]">logout</span>
          <span>Sair da Conta</span>
        </button>
      </div>
    </aside>
  );
};
