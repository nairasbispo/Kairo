import React, { useState } from 'react';
import { AppView, DaySchedule, ScheduledTask, UserProfile } from '../types';
import { Sidebar } from './Sidebar';
import { INITIAL_CUSTOM_SCHEDULE } from '../data/mockData';

interface PlanningViewProps {
  user: UserProfile;
  onUpdateUser: (updated: Partial<UserProfile>) => void;
  onNavigate: (view: AppView) => void;
  onOpenCoach: () => void;
}

export const PlanningView: React.FC<PlanningViewProps> = ({
  user,
  onUpdateUser,
  onNavigate,
  onOpenCoach
}) => {
  const [schedule, setSchedule] = useState<DaySchedule[]>(
    user.customSchedule || INITIAL_CUSTOM_SCHEDULE
  );

  const [selectedDayIdx, setSelectedDayIdx] = useState<number>(0);
  const [showAddTaskModal, setShowAddTaskModal] = useState<boolean>(false);

  // New task form state
  const [newTaskTitle, setNewTaskTitle] = useState<string>('');
  const [newTaskDuration, setNewTaskDuration] = useState<number>(20);
  const [newTaskLang, setNewTaskLang] = useState<'EN' | 'FR' | 'ES' | 'IT'>('EN');
  const [newTaskSkill, setNewTaskSkill] = useState<'listening' | 'speaking' | 'reading' | 'writing'>('listening');

  const saveScheduleToUser = (newSched: DaySchedule[]) => {
    setSchedule(newSched);
    onUpdateUser({ customSchedule: newSched });
  };

  const handleToggleDayActive = (dayIndex: number) => {
    const updated = schedule.map((day, idx) =>
      idx === dayIndex ? { ...day, active: !day.active } : day
    );
    saveScheduleToUser(updated);
  };

  const handleToggleTaskCompleted = (dayIndex: number, taskId: string) => {
    const updated = schedule.map((day, idx) => {
      if (idx !== dayIndex) return day;
      return {
        ...day,
        tasks: day.tasks.map(t => t.id === taskId ? { ...t, completed: !t.completed } : t)
      };
    });
    saveScheduleToUser(updated);
  };

  const handleDeleteTask = (dayIndex: number, taskId: string) => {
    const updated = schedule.map((day, idx) => {
      if (idx !== dayIndex) return day;
      return {
        ...day,
        tasks: day.tasks.filter(t => t.id !== taskId)
      };
    });
    saveScheduleToUser(updated);
  };

  const handleAddTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTaskTitle.trim()) return;

    const task: ScheduledTask = {
      id: `task-${Date.now()}`,
      title: newTaskTitle.trim(),
      durationMinutes: newTaskDuration,
      language: newTaskLang,
      skill: newTaskSkill,
      completed: false
    };

    const updated = schedule.map((day, idx) => {
      if (idx !== selectedDayIdx) return day;
      return {
        ...day,
        tasks: [...day.tasks, task]
      };
    });

    saveScheduleToUser(updated);
    setNewTaskTitle('');
    setShowAddTaskModal(false);
  };

  const totalWeeklyMinutes = schedule.reduce((sum, day) => {
    if (!day.active) return sum;
    return sum + day.tasks.reduce((tSum, t) => tSum + t.durationMinutes, 0);
  }, 0);

  const getLangBadgeColor = (lang: string) => {
    switch (lang) {
      case 'EN': return 'bg-[#0369a1] text-white';
      case 'FR': return 'bg-[#be185d] text-white';
      case 'ES': return 'bg-[#b45309] text-white';
      case 'IT': return 'bg-[#15803d] text-white';
      default: return 'bg-[#9a4029] text-white';
    }
  };

  return (
    <div className="min-h-screen bg-[#fff8f5] text-[#1e1b18] flex flex-col pt-16">
      {/* Top Header */}
      <header className="fixed top-0 left-0 w-full h-16 bg-[#fff8f5]/90 backdrop-blur-md border-b border-[#efe6e2] z-40 px-6 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-xl bg-[#9a4029] text-white font-bold flex items-center justify-center text-xs">
            K
          </div>
          <span className="font-serif text-lg font-bold text-[#9a4029]">
            Planejamento de Estudos Personalizado
          </span>
        </div>

        <button
          onClick={() => onNavigate('dashboard')}
          className="px-4 py-1.5 border border-[#89726c] text-[#56423d] hover:bg-[#f5ece7] rounded-full text-xs font-semibold uppercase"
        >
          Voltar ao Dashboard
        </button>
      </header>

      <div className="flex flex-1">
        <Sidebar currentView="planning" onNavigate={onNavigate} onOpenCoach={onOpenCoach} />

        <main className="flex-1 p-6 lg:p-10 space-y-8 max-w-7xl mx-auto w-full">
          {/* Header Banner */}
          <div className="p-8 rounded-3xl bg-[#f5ece7] border border-[#dcc1ba]/80 flex flex-wrap items-center justify-between gap-6 shadow-sm">
            <div className="space-y-2 max-w-2xl">
              <span className="text-xs font-semibold text-[#9a4029] uppercase tracking-widest bg-[#f2dccb] px-3 py-1 rounded-full">
                Cronograma Totalmente Editável
              </span>
              <h1 className="font-serif text-3xl font-semibold text-[#1e1b18]">
                Monte seu Plano Semanal
              </h1>
              <p className="text-xs sm:text-sm text-[#56423d] leading-relaxed">
                Adicione blocos de estudo, defina os idiomas desejados (Inglês, Francês, Espanhol, Italiano), ajuste horários e organize sua rotina com liberdade.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-[#fff8f5] border border-[#dcc1ba]/60 text-center space-y-1 shrink-0">
              <span className="text-[10px] font-bold text-[#89726c] uppercase block">Meta Semanal Estimada</span>
              <span className="font-serif text-2xl font-bold text-[#9a4029]">
                {(totalWeeklyMinutes / 60).toFixed(1)} h / semana
              </span>
            </div>
          </div>

          {/* Days Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-7 gap-4">
            {schedule.map((day, dayIdx) => (
              <div
                key={dayIdx}
                className={`p-4 rounded-2xl border transition-all space-y-3 flex flex-col justify-between ${
                  day.active
                    ? 'bg-[#fff8f5] border-[#efe6e2] shadow-sm'
                    : 'bg-[#f5ece7]/40 border-[#efe6e2] opacity-70'
                }`}
              >
                {/* Day Header */}
                <div className="flex justify-between items-center border-b border-[#efe6e2] pb-2">
                  <div className="flex items-center gap-1.5">
                    <button
                      onClick={() => handleToggleDayActive(dayIdx)}
                      className={`w-5 h-5 rounded-md flex items-center justify-center transition-colors ${
                        day.active ? 'bg-[#9a4029] text-white' : 'bg-[#dcc1ba] text-white'
                      }`}
                      title={day.active ? 'Desativar dia' : 'Ativar dia'}
                    >
                      <span className="material-symbols-outlined text-[14px]">
                        {day.active ? 'check' : 'power_settings_new'}
                      </span>
                    </button>
                    <span className="font-serif font-bold text-sm text-[#1e1b18]">
                      {day.dayName.split('-')[0]}
                    </span>
                  </div>

                  <button
                    onClick={() => {
                      setSelectedDayIdx(dayIdx);
                      setShowAddTaskModal(true);
                    }}
                    className="w-6 h-6 rounded-lg bg-[#f5ece7] hover:bg-[#9a4029] text-[#9a4029] hover:text-white flex items-center justify-center transition-colors"
                    title="Adicionar Atividade"
                  >
                    <span className="material-symbols-outlined text-[16px]">add</span>
                  </button>
                </div>

                {/* Tasks List */}
                <div className="space-y-2 flex-1 min-h-[140px]">
                  {day.tasks.map((task) => (
                    <div
                      key={task.id}
                      className={`p-2.5 rounded-xl border text-xs space-y-1.5 transition-all relative group ${
                        task.completed
                          ? 'bg-[#f2dccb]/40 border-[#dcc1ba] line-through text-[#89726c]'
                          : 'bg-[#f5ece7] border-[#dcc1ba]/60 text-[#1e1b18]'
                      }`}
                    >
                      <div className="flex justify-between items-start gap-1">
                        <span className="font-semibold text-[11px] leading-snug flex-1">
                          {task.title}
                        </span>

                        <button
                          onClick={() => handleDeleteTask(dayIdx, task.id)}
                          className="text-[#89726c] hover:text-[#ba1a1a] opacity-0 group-hover:opacity-100 transition-opacity"
                          title="Excluir Atividade"
                        >
                          <span className="material-symbols-outlined text-[14px]">delete</span>
                        </button>
                      </div>

                      <div className="flex justify-between items-center text-[10px]">
                        <span className={`px-1.5 py-0.2 rounded font-bold uppercase ${getLangBadgeColor(task.language)}`}>
                          {task.language}
                        </span>

                        <div className="flex items-center gap-1 font-semibold text-[#89726c]">
                          <span className="material-symbols-outlined text-[12px]">schedule</span>
                          <span>{task.durationMinutes}m</span>

                          <button
                            onClick={() => handleToggleTaskCompleted(dayIdx, task.id)}
                            className={`ml-1 w-4 h-4 rounded flex items-center justify-center ${
                              task.completed ? 'bg-[#9a4029] text-white' : 'border border-[#89726c]'
                            }`}
                          >
                            {task.completed && <span className="material-symbols-outlined text-[10px]">check</span>}
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}

                  {day.tasks.length === 0 && (
                    <div className="h-full flex items-center justify-center py-6 text-[11px] text-[#89726c] italic text-center">
                      Sem atividades para este dia.
                    </div>
                  )}
                </div>

                {/* Day Footer */}
                <div className="pt-2 border-t border-[#efe6e2] flex justify-between text-[10px] font-bold text-[#89726c]">
                  <span>Total:</span>
                  <span>
                    {day.tasks.reduce((sum, t) => sum + t.durationMinutes, 0)} min
                  </span>
                </div>
              </div>
            ))}
          </div>
        </main>
      </div>

      {/* Add Task Modal */}
      {showAddTaskModal && (
        <div className="fixed inset-0 bg-[#1e1b18]/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-[#fff8f5] rounded-3xl p-6 max-w-md w-full border border-[#dcc1ba] shadow-2xl space-y-5 animate-fade-in">
            <div className="flex justify-between items-center border-b border-[#efe6e2] pb-3">
              <h3 className="font-serif text-xl font-semibold text-[#1e1b18]">
                Adicionar Tarefa para {schedule[selectedDayIdx]?.dayName}
              </h3>
              <button
                onClick={() => setShowAddTaskModal(false)}
                className="text-[#89726c] hover:text-[#1e1b18]"
              >
                <span className="material-symbols-outlined text-[20px]">close</span>
              </button>
            </div>

            <form onSubmit={handleAddTask} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-[#56423d] uppercase mb-1">
                  Título da Atividade
                </label>
                <input
                  type="text"
                  required
                  value={newTaskTitle}
                  onChange={(e) => setNewTaskTitle(e.target.value)}
                  placeholder="Ex: Leitura Contextual & Vocabulário IPA"
                  className="w-full bg-[#f5ece7] border border-[#dcc1ba] rounded-xl px-3 py-2 text-xs text-[#1e1b18] outline-none focus:border-[#9a4029]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-[#56423d] uppercase mb-1">
                    Idioma
                  </label>
                  <select
                    value={newTaskLang}
                    onChange={(e) => setNewTaskLang(e.target.value as any)}
                    className="w-full bg-[#f5ece7] border border-[#dcc1ba] rounded-xl px-3 py-2 text-xs font-semibold text-[#1e1b18] outline-none"
                  >
                    <option value="EN">Inglês (EN)</option>
                    <option value="FR">Francês (FR)</option>
                    <option value="ES">Espanhol (ES)</option>
                    <option value="IT">Italiano (IT)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#56423d] uppercase mb-1">
                    Duração (min)
                  </label>
                  <input
                    type="number"
                    min="5"
                    max="180"
                    value={newTaskDuration}
                    onChange={(e) => setNewTaskDuration(Number(e.target.value))}
                    className="w-full bg-[#f5ece7] border border-[#dcc1ba] rounded-xl px-3 py-2 text-xs font-semibold text-[#1e1b18] outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#56423d] uppercase mb-1">
                  Competência Foco
                </label>
                <select
                  value={newTaskSkill}
                  onChange={(e) => setNewTaskSkill(e.target.value as any)}
                  className="w-full bg-[#f5ece7] border border-[#dcc1ba] rounded-xl px-3 py-2 text-xs font-semibold text-[#1e1b18] outline-none"
                >
                  <option value="listening">Listening (Escuta)</option>
                  <option value="speaking">Speaking (Fala)</option>
                  <option value="reading">Reading (Leitura)</option>
                  <option value="writing">Writing (Escrita)</option>
                </select>
              </div>

              <div className="flex justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setShowAddTaskModal(false)}
                  className="px-4 py-2 border border-[#89726c] text-[#56423d] rounded-xl text-xs font-semibold uppercase hover:bg-[#f5ece7]"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-[#9a4029] text-white rounded-xl text-xs font-semibold uppercase hover:bg-[#b9583e]"
                >
                  Adicionar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
