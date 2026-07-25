import React, { useState } from 'react';
import { AppView, SkillPriority, UserProfile } from '../types';
import { INITIAL_SKILL_PRIORITIES } from '../data/mockData';
import { ALL_DIAGNOSTIC_QUESTIONS } from '../data/diagnosticQuestions';
import { RadarChart } from './RadarChart';
import { HeaderNav } from './HeaderNav';

interface OnboardingViewProps {
  user: UserProfile;
  onUpdateUser: (updated: Partial<UserProfile>) => void;
  onFinishOnboarding: () => void;
  onNavigate: (view: AppView) => void;
}

export const OnboardingView: React.FC<OnboardingViewProps> = ({
  user,
  onUpdateUser,
  onFinishOnboarding,
  onNavigate
}) => {
  const [step, setStep] = useState<number>(0);
  const totalSteps = 10;

  // Onboarding local state
  const [selectedLanguages, setSelectedLanguages] = useState<string[]>(['EN', 'FR', 'ES', 'IT']);
  const [testLanguage, setTestLanguage] = useState<'EN' | 'FR' | 'ES' | 'IT'>('EN');
  const [goal, setGoal] = useState<string>(user.goal || 'conversar');
  const [customGoalText, setCustomGoalText] = useState<string>(user.customGoal || '');
  const [selectedMethods, setSelectedMethods] = useState<string[]>(['podcasts', 'conversacao', 'artigos', 'ia']);
  const [dailyMins, setDailyMins] = useState<number>(user.dailyMinutes || 45);
  const [selectedDays, setSelectedDays] = useState<string[]>(user.studyDays || ['M', 'T', 'W', 'T', 'F']);
  const [selfLevel, setSelfLevel] = useState<string>(user.selfLevel || 'intermediate');
  const [priorities, setPriorities] = useState<SkillPriority[]>(INITIAL_SKILL_PRIORITIES);

  // Assessment Quiz State
  const [currentQuestionIdx, setCurrentQuestionIdx] = useState<number>(0);
  const [selectedOptionId, setSelectedOptionId] = useState<string | null>(null);
  const [showAnswerFeedback, setShowAnswerFeedback] = useState<boolean>(false);
  const [showPauseModal, setShowPauseModal] = useState<boolean>(false);
  const [userAnswers, setUserAnswers] = useState<Record<number, boolean>>({});

  const progressPercent = Math.round(((step + 1) / (totalSteps + 1)) * 100);

  // Diagnostic questions for selected language
  const activeQuestions = ALL_DIAGNOSTIC_QUESTIONS[testLanguage] || ALL_DIAGNOSTIC_QUESTIONS.EN;
  const currentQuestion = activeQuestions[currentQuestionIdx] || activeQuestions[0];
  const selectedOption = currentQuestion.options.find(o => o.id === selectedOptionId);

  // Dynamic Score & Level Calculation
  const totalQuestions = activeQuestions.length;
  const answeredCount = Object.keys(userAnswers).length;
  const correctCount = Object.values(userAnswers).filter(Boolean).length;
  const overallPercentage = answeredCount > 0 ? Math.round((correctCount / totalQuestions) * 100) : 0;

  // Calculate scores per skill category
  const getCategoryScore = (category: string) => {
    const catQuestions = activeQuestions.filter(q => q.skillCategory === category);
    if (catQuestions.length === 0) return Math.min(100, Math.max(20, overallPercentage));
    let catCorrect = 0;
    catQuestions.forEach((q) => {
      const qIdx = activeQuestions.findIndex(item => item.id === q.id);
      if (userAnswers[qIdx]) catCorrect++;
    });
    return Math.round((catCorrect / catQuestions.length) * 100);
  };

  const calculatedReading = getCategoryScore('reading');
  const calculatedVocab = getCategoryScore('writing');
  const calculatedGrammar = getCategoryScore('grammar');
  const calculatedComprehension = Math.round((calculatedReading + calculatedVocab + calculatedGrammar + overallPercentage) / 4);

  // Map percentage to CEFR Level Tag and Description
  const getLevelInfo = (pct: number) => {
    if (pct >= 88) {
      return {
        tag: 'C1',
        title: 'C1 Avançado',
        sub: 'Você demonstra domínio avançado, boa fluência e precisão conceitual e sintática no idioma.',
        nextTrajectory: 'C2 em 8 meses'
      };
    } else if (pct >= 70) {
      return {
        tag: 'B2',
        title: 'B2 Independente',
        sub: 'Você possui ótima capacidade de compreensão, boa espontaneidade em conversações e domina vocabulário intermediário-avançado.',
        nextTrajectory: 'C1 em 6 meses'
      };
    } else if (pct >= 48) {
      return {
        tag: 'B1',
        title: 'B1 Intermediário',
        sub: 'Você compreende os pontos principais em assuntos familiares de trabalho, estudos e lazer no idioma.',
        nextTrajectory: 'B2 em 5 meses'
      };
    } else if (pct >= 25) {
      return {
        tag: 'A2',
        title: 'A2 Básico',
        sub: 'Você compreende frases e expressões de uso frequente relacionadas com áreas de prioridade imediata.',
        nextTrajectory: 'B1 em 4 meses'
      };
    } else {
      return {
        tag: 'A1',
        title: 'A1 Iniciante',
        sub: 'Você está construindo as bases fundamentais do idioma para iniciar suas primeiras frases com confiança.',
        nextTrajectory: 'A2 em 3 meses'
      };
    }
  };

  const calculatedLevel = getLevelInfo(overallPercentage);

  const handleNextStep = () => {
    if (step < totalSteps) {
      setStep(prev => prev + 1);
    } else {
      // Save and finish
      onUpdateUser({
        targetLanguage: testLanguage,
        goal: goal === 'custom' ? customGoalText : goal,
        customGoal: customGoalText,
        learningMethods: selectedMethods,
        dailyMinutes: dailyMins,
        studyDays: selectedDays,
        selfLevel: calculatedLevel.tag.toLowerCase(),
        skillPriorities: priorities,
        diagnosticScore: {
          overallLevel: calculatedLevel.title,
          comprehension: calculatedComprehension,
          reading: calculatedReading,
          vocabulary: calculatedVocab,
          grammar: calculatedGrammar
        },
        languageLevels: {
          ...user.languageLevels,
          [testLanguage]: calculatedLevel.tag
        }
      });
      onFinishOnboarding();
    }
  };

  const handlePrevStep = () => {
    if (step > 0) {
      setStep(prev => prev - 1);
    } else {
      onNavigate('landing');
    }
  };

  // Reorder priorities helpers
  const movePriority = (index: number, direction: 'up' | 'down') => {
    const newArr = [...priorities];
    const targetIdx = direction === 'up' ? index - 1 : index + 1;
    if (targetIdx < 0 || targetIdx >= newArr.length) return;
    const temp = newArr[index];
    newArr[index] = newArr[targetIdx];
    newArr[targetIdx] = temp;

    // re-assign priority index
    newArr.forEach((item, idx) => {
      item.priority = idx + 1;
    });

    setPriorities(newArr);
  };

  const handleSelectOption = (optId: string) => {
    if (showAnswerFeedback) return;
    setSelectedOptionId(optId);
    setShowAnswerFeedback(true);

    const chosenOpt = currentQuestion.options.find(o => o.id === optId);
    if (chosenOpt) {
      setUserAnswers(prev => ({
        ...prev,
        [currentQuestionIdx]: chosenOpt.isCorrect
      }));
    }
  };

  const handleNextQuestion = () => {
    if (currentQuestionIdx < activeQuestions.length - 1) {
      setCurrentQuestionIdx(prev => prev + 1);
      setSelectedOptionId(null);
      setShowAnswerFeedback(false);
    } else {
      // Finish test -> show result
      setStep(9);
    }
  };

  // Dynamic radar chart values computed from priorities
  const skillValuesMap: Record<string, number> = {
    speaking: priorities.find(p => p.id === 'speaking')?.priority === 1 ? 85 : 65,
    listening: priorities.find(p => p.id === 'listening')?.priority === 1 ? 82 : 70,
    reading: priorities.find(p => p.id === 'reading')?.priority === 1 ? 88 : 72,
    writing: priorities.find(p => p.id === 'writing')?.priority === 1 ? 80 : 60,
  };

  const radarData = [
    { label: 'SPEAKING', value: skillValuesMap.speaking },
    { label: 'LISTENING', value: skillValuesMap.listening },
    { label: 'READING', value: skillValuesMap.reading },
    { label: 'WRITING', value: skillValuesMap.writing },
  ];

  return (
    <div className="min-h-screen bg-[#fff8f5] text-[#1e1b18] flex flex-col pt-16">
      <HeaderNav
        currentView="onboarding"
        onNavigate={onNavigate}
        user={user}
        progressPercent={progressPercent}
        onBack={handlePrevStep}
        stepText={`Passo ${step + 1} de 10`}
      />

      <main className="flex-1 flex flex-col items-center justify-center p-4 sm:p-8 max-w-5xl mx-auto w-full">
        {/* STEP 0: Welcome Screen */}
        {step === 0 && (
          <div className="text-center max-w-2xl py-12 animate-fade-in space-y-6">
            <div className="relative inline-block">
              <div className="absolute -inset-4 bg-[#ffdbd2]/40 rounded-full blur-2xl"></div>
              <span className="material-symbols-outlined text-[64px] text-[#9a4029] relative z-10 font-light">
                route
              </span>
            </div>

            <h1 className="font-serif text-4xl sm:text-5xl font-semibold text-[#1e1b18] tracking-tight">
              Vamos construir sua jornada.
            </h1>

            <p className="text-base sm:text-lg text-[#56423d] max-w-xl mx-auto leading-relaxed">
              Precisamos conhecer seus objetivos para criar um plano realmente personalizado.
            </p>

            <div className="pt-4">
              <button
                onClick={handleNextStep}
                className="px-10 py-4 bg-[#9a4029] text-white font-semibold rounded-xl tracking-wider uppercase text-xs hover:bg-[#b9583e] transition-all shadow-md hover:shadow-xl inline-flex items-center gap-2 group"
              >
                <span>Começar</span>
                <span className="material-symbols-outlined text-[18px] group-hover:translate-x-1 transition-transform">
                  arrow_forward
                </span>
              </button>
            </div>
          </div>
        )}

        {/* STEP 1: Target Languages */}
        {step === 1 && (
          <div className="w-full max-w-3xl space-y-8 animate-fade-in">
            <div className="text-center space-y-2">
              <span className="text-xs font-semibold text-[#9a4029] tracking-widest uppercase">
                Idioma Alvo
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl font-semibold text-[#1e1b18]">
                Quais idiomas você deseja aprender?
              </h2>
              <p className="text-sm text-[#56423d] max-w-lg mx-auto">
                Selecione os idiomas que você quer dominar. Você pode escolher mais de um e ajustar seu foco a qualquer momento.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { code: 'EN', name: 'English', tag: 'INICIANTE - AVANÇADO' },
                { code: 'FR', name: 'Français', tag: 'TODOS OS NÍVEIS' },
                { code: 'ES', name: 'Español', tag: 'IMERSÃO TOTAL' },
                { code: 'IT', name: 'Italiano', tag: 'ARTE & CULTURA' },
              ].map((lang) => {
                const isSelected = selectedLanguages.includes(lang.code);
                return (
                  <button
                    key={lang.code}
                    onClick={() => {
                      if (isSelected && selectedLanguages.length > 1) {
                        setSelectedLanguages(selectedLanguages.filter(l => l !== lang.code));
                      } else if (!isSelected) {
                        setSelectedLanguages([...selectedLanguages, lang.code]);
                      }
                    }}
                    className={`p-6 rounded-2xl flex flex-col items-center text-center transition-all border ${
                      isSelected
                        ? 'bg-[#f5ece7] border-[#9a4029] ring-2 ring-[#9a4029]/20 shadow-sm'
                        : 'bg-[#fff8f5] border-[#efe6e2] hover:border-[#dcc1ba]'
                    }`}
                  >
                    <span className={`font-serif text-3xl font-bold mb-2 ${isSelected ? 'text-[#9a4029]' : 'text-[#56423d]'}`}>
                      {lang.code}
                    </span>
                    <span className="font-semibold text-sm text-[#1e1b18] mb-3">{lang.name}</span>
                    <span className="text-[10px] font-bold tracking-wider text-[#89726c] uppercase bg-[#e9e1dc]/50 px-2 py-0.5 rounded-full">
                      {lang.tag}
                    </span>
                  </button>
                );
              })}
            </div>

            <div className="flex justify-end pt-6">
              <button
                onClick={handleNextStep}
                className="px-8 py-3 bg-[#9a4029] text-white rounded-full text-xs font-semibold tracking-wider uppercase hover:bg-[#b9583e] transition-colors shadow-sm flex items-center gap-2"
              >
                <span>Continuar</span>
                <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
              </button>
            </div>
          </div>
        )}

        {/* STEP 2: Goal Selection */}
        {step === 2 && (
          <div className="w-full max-w-3xl space-y-8 animate-fade-in">
            <div className="text-center space-y-2">
              <span className="text-xs font-semibold text-[#9a4029] tracking-widest uppercase">
                Passo 3 • Objetivo
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl font-semibold text-[#1e1b18]">
                Qual é sua meta?
              </h2>
              <p className="text-sm text-[#56423d] max-w-md mx-auto">
                Defina seu objetivo principal. Isso nos ajudará a personalizar sua jornada de aprendizado.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                { id: 'conversar', title: 'Conversar fluentemente', sub: 'Para trabalho ou interações sociais', icon: 'forum' },
                { id: 'viajar', title: 'Viajar com confiança', sub: 'Explorar o mundo sem barreiras', icon: 'flight_takeoff' },
                { id: 'ler', title: 'Ler livros originais', sub: 'Literatura, artigos e notícias', icon: 'menu_book' },
                { id: 'estudar', title: 'Aprovação em exames', sub: 'TOEFL, IELTS, ou estudos acadêmicos', icon: 'school' },
              ].map((opt) => {
                const isSelected = goal === opt.id;
                return (
                  <label
                    key={opt.id}
                    onClick={() => setGoal(opt.id)}
                    className={`group relative flex items-center p-4 cursor-pointer rounded-2xl transition-all duration-300 border ${
                      isSelected
                        ? 'bg-[#f5ece7] border-[#9a4029] shadow-sm'
                        : 'bg-[#fff8f5] border-[#efe6e2] hover:bg-[#fbf2ed]'
                    }`}
                  >
                    <div className="w-12 h-12 rounded-full bg-[#fff8f5] text-[#9a4029] flex items-center justify-center mr-4 shrink-0 shadow-sm">
                      <span className="material-symbols-outlined text-[24px]">{opt.icon}</span>
                    </div>
                    <div className="flex-1">
                      <span className="block font-semibold text-sm text-[#1e1b18] mb-0.5">{opt.title}</span>
                      <span className="block text-xs text-[#56423d]">{opt.sub}</span>
                    </div>
                    <div className={`w-5 h-5 rounded-full border flex items-center justify-center ml-2 ${
                      isSelected ? 'border-[#9a4029] bg-[#9a4029] text-white' : 'border-[#dcc1ba]'
                    }`}>
                      {isSelected && <span className="material-symbols-outlined text-[14px]">check</span>}
                    </div>
                  </label>
                );
              })}
            </div>

            {/* Custom Goal Input */}
            <div className="pt-2">
              <label className="block text-xs font-semibold text-[#56423d] uppercase tracking-wider mb-1">
                Ou escreva sua própria meta
              </label>
              <input
                type="text"
                value={customGoalText}
                onChange={(e) => {
                  setCustomGoalText(e.target.value);
                  setGoal('custom');
                }}
                placeholder="Ex: Entender filmes sem legenda ou entrevistas de trabalho"
                className="w-full bg-transparent border-b-2 border-[#dcc1ba] focus:border-[#9a4029] text-sm text-[#1e1b18] py-2 outline-none transition-colors"
              />
            </div>

            <div className="flex justify-end pt-4">
              <button
                onClick={handleNextStep}
                className="px-8 py-3 bg-[#9a4029] text-white rounded-full text-xs font-semibold tracking-wider uppercase hover:bg-[#b9583e] transition-colors shadow-sm flex items-center gap-2"
              >
                <span>Continuar</span>
                <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
              </button>
            </div>
          </div>
        )}

        {/* STEP 3: Learning Preferences */}
        {step === 3 && (
          <div className="w-full max-w-3xl space-y-8 animate-fade-in">
            <div className="text-center space-y-2">
              <span className="text-xs font-semibold text-[#9a4029] tracking-widest uppercase">
                Preferências de Estudo
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl font-semibold text-[#1e1b18]">
                Como você prefere estudar?
              </h2>
              <p className="text-sm text-[#56423d] max-w-md mx-auto">
                Selecione as formas como você mais gosta de absorver conhecimento para montar sua trilha ideal.
              </p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
              {[
                { id: 'livros', label: 'Livros', icon: 'menu_book' },
                { id: 'videos', label: 'Vídeos', icon: 'smart_display' },
                { id: 'podcasts', label: 'Podcasts', icon: 'podcasts' },
                { id: 'conversacao', label: 'Conversação', icon: 'forum' },
                { id: 'flashcards', label: 'Flashcards', icon: 'style' },
                { id: 'filmes', label: 'Filmes', icon: 'movie' },
                { id: 'series', label: 'Séries', icon: 'tv' },
                { id: 'musica', label: 'Música', icon: 'music_note' },
                { id: 'artigos', label: 'Artigos', icon: 'article' },
                { id: 'ia', label: 'Tutor IA', icon: 'smart_toy' },
              ].map((m) => {
                const isSelected = selectedMethods.includes(m.id);
                return (
                  <button
                    key={m.id}
                    onClick={() => {
                      if (isSelected) {
                        setSelectedMethods(selectedMethods.filter(i => i !== m.id));
                      } else {
                        setSelectedMethods([...selectedMethods, m.id]);
                      }
                    }}
                    className={`p-4 rounded-2xl flex flex-col items-center text-center transition-all border ${
                      isSelected
                        ? 'bg-[#f5ece7] border-[#9a4029] ring-2 ring-[#9a4029]/20 shadow-sm'
                        : 'bg-[#fff8f5] border-[#efe6e2] hover:bg-[#fbf2ed]'
                    }`}
                  >
                    <span className={`material-symbols-outlined text-[28px] mb-2 ${
                      isSelected ? 'text-[#9a4029]' : 'text-[#56423d]'
                    }`}>
                      {m.icon}
                    </span>
                    <span className="font-semibold text-xs text-[#1e1b18]">{m.label}</span>
                  </button>
                );
              })}
            </div>

            <div className="flex justify-end pt-4">
              <button
                onClick={handleNextStep}
                className="px-8 py-3 bg-[#9a4029] text-white rounded-full text-xs font-semibold tracking-wider uppercase hover:bg-[#b9583e] transition-colors shadow-sm flex items-center gap-2"
              >
                <span>Continuar</span>
                <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
              </button>
            </div>
          </div>
        )}

        {/* STEP 4: Schedule Commitment */}
        {step === 4 && (
          <div className="w-full max-w-xl space-y-8 animate-fade-in">
            <div className="text-center space-y-2">
              <span className="text-xs font-semibold text-[#9a4029] tracking-widest uppercase">
                Comprometimento
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl font-semibold text-[#1e1b18]">
                Quanto tempo você consegue estudar?
              </h2>
              <p className="text-sm text-[#56423d]">
                Consistência supera intensidade. Defina uma meta realista para criar um hábito sustentável.
              </p>
            </div>

            <div className="bg-[#fff8f5] p-6 rounded-2xl border border-[#efe6e2] space-y-6 shadow-sm">
              {/* Daily Duration Slider */}
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-semibold text-[#1e1b18]">Duração por Sessão Diária</span>
                  <span className="font-serif text-xl font-bold text-[#9a4029]">
                    {dailyMins >= 60 ? `${Math.floor(dailyMins / 60)}h ${dailyMins % 60 ? `${dailyMins % 60}m` : ''}` : `${dailyMins} min`}
                  </span>
                </div>

                <input
                  type="range"
                  min="15"
                  max="180"
                  step="15"
                  value={dailyMins}
                  onChange={(e) => setDailyMins(Number(e.target.value))}
                  className="w-full accent-[#9a4029] cursor-pointer"
                />

                <div className="flex justify-between text-[11px] font-semibold text-[#89726c]">
                  <span>15 min</span>
                  <span>3 horas</span>
                </div>
              </div>

              {/* Days Per Week Selector */}
              <div className="space-y-3">
                <span className="text-sm font-semibold text-[#1e1b18] block">Dias por Semana</span>
                <div className="flex justify-between gap-2">
                  {['M', 'T', 'W', 'T', 'F', 'S', 'S'].map((day, idx) => {
                    const isSelected = selectedDays.includes(day);
                    return (
                      <button
                        key={idx}
                        onClick={() => {
                          if (isSelected && selectedDays.length > 1) {
                            setSelectedDays(selectedDays.filter((_, i) => i !== idx));
                          } else if (!isSelected) {
                            setSelectedDays([...selectedDays, day]);
                          }
                        }}
                        className={`w-10 h-10 rounded-xl font-bold text-sm transition-all border ${
                          isSelected
                            ? 'bg-[#9a4029] text-white border-[#9a4029] shadow-sm'
                            : 'bg-[#f5ece7] text-[#56423d] border-[#dcc1ba]/40 hover:bg-[#efe6e2]'
                        }`}
                      >
                        {day}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Weekly Total Calculation */}
              <div className="p-4 rounded-xl bg-[#f5ece7] border border-[#dcc1ba]/40 flex items-center justify-between">
                <div>
                  <span className="block text-[10px] font-semibold tracking-wider text-[#89726c] uppercase">
                    Carga Semanal Total
                  </span>
                  <span className="font-serif text-2xl font-bold text-[#1e1b18]">
                    {((dailyMins * selectedDays.length) / 60).toFixed(1)} horas
                  </span>
                </div>
                <div className="w-10 h-10 rounded-full bg-[#f2dccb] text-[#9a4029] flex items-center justify-center">
                  <span className="material-symbols-outlined text-[20px]">schedule</span>
                </div>
              </div>
            </div>

            <div className="flex justify-end">
              <button
                onClick={handleNextStep}
                className="px-8 py-3 bg-[#9a4029] text-white rounded-full text-xs font-semibold tracking-wider uppercase hover:bg-[#b9583e] transition-colors shadow-sm flex items-center gap-2"
              >
                <span>Continuar</span>
                <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
              </button>
            </div>
          </div>
        )}

        {/* STEP 5: Self-Reported Level */}
        {step === 5 && (
          <div className="w-full max-w-3xl space-y-8 animate-fade-in">
            <div className="text-center space-y-2">
              <span className="text-xs font-semibold text-[#9a4029] tracking-widest uppercase">
                Autoavaliação
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl font-semibold text-[#1e1b18]">
                Qual seu nível aproximado?
              </h2>
              <p className="text-sm text-[#56423d] max-w-md mx-auto">
                Faremos um teste de nivelamento completo a seguir para confirmar seu progresso exato.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                { id: 'never', title: 'Nunca estudei', sub: 'Começando do zero absoluto. Vamos construir a base juntos.' },
                { id: 'beginner', title: 'Iniciante', sub: 'Conheço algumas palavras e frases, mas tenho dificuldade em formar frases completas.' },
                { id: 'intermediate', title: 'Intermediário', sub: 'Consigo manter conversas básicas e entendo a maior parte de textos simples.' },
                { id: 'advanced', title: 'Avançado', sub: 'Comunico-me com fluência, mas quero aperfeiçoar gramática e vocabulário específico.' },
              ].map((lvl) => {
                const isSelected = selfLevel === lvl.id;
                return (
                  <button
                    key={lvl.id}
                    onClick={() => setSelfLevel(lvl.id)}
                    className={`p-5 rounded-2xl text-left transition-all border ${
                      isSelected
                        ? 'bg-[#f5ece7] border-[#9a4029] ring-2 ring-[#9a4029]/20 shadow-sm'
                        : 'bg-[#fff8f5] border-[#efe6e2] hover:bg-[#fbf2ed]'
                    }`}
                  >
                    <span className="block font-semibold text-base text-[#1e1b18] mb-1">{lvl.title}</span>
                    <span className="block text-xs text-[#56423d] leading-relaxed">{lvl.sub}</span>
                  </button>
                );
              })}
            </div>

            {/* Unknown Level Button */}
            <button
              onClick={() => setSelfLevel('unknown')}
              className={`w-full p-4 rounded-2xl border text-center transition-all ${
                selfLevel === 'unknown'
                  ? 'bg-[#f5ece7] border-[#9a4029]'
                  : 'bg-[#fff8f5] border-[#efe6e2] hover:bg-[#fbf2ed]'
              }`}
            >
              <span className="block font-semibold text-sm text-[#1e1b18]">Ainda não sei</span>
              <span className="block text-xs text-[#89726c]">Sem problemas! Nosso teste de nivelamento descobrirá exatamente onde você está.</span>
            </button>

            <div className="flex justify-end pt-4">
              <button
                onClick={handleNextStep}
                className="px-8 py-3 bg-[#9a4029] text-white rounded-full text-xs font-semibold tracking-wider uppercase hover:bg-[#b9583e] transition-colors shadow-sm flex items-center gap-2"
              >
                <span>Continuar</span>
                <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
              </button>
            </div>
          </div>
        )}

        {/* STEP 6: Skill Prioritization (Matching Image 2 with Radar Chart!) */}
        {step === 6 && (
          <div className="w-full max-w-5xl space-y-8 animate-fade-in">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              {/* Left Column: Explanatory Header & Radar Chart */}
              <div className="lg:col-span-5 space-y-6">
                <span className="text-xs font-semibold text-[#9a4029] tracking-widest uppercase">
                  Priorização de Competências
                </span>
                <h2 className="font-serif text-3xl font-semibold text-[#1e1b18] leading-tight">
                  Quais competências você deseja priorizar?
                </h2>
                <p className="text-xs text-[#56423d] leading-relaxed">
                  A aquisição fluente exige equilíbrio, mas o foco direcional acelera o domínio em áreas críticas. Ordene de acordo com sua necessidade imediata.
                </p>

                {/* Live Radar Chart Preview */}
                <div className="p-6 rounded-2xl bg-[#f5ece7] border border-[#dcc1ba]/60 flex flex-col items-center shadow-inner">
                  <span className="text-[10px] font-bold text-[#89726c] uppercase tracking-wider mb-2">
                    Projeção de Foco Kairo
                  </span>
                  <RadarChart data={radarData} size={220} showLabels={true} />
                </div>
              </div>

              {/* Right Column: Priority Orderable List */}
              <div className="lg:col-span-7 space-y-4">
                <div className="flex justify-between items-center text-xs font-bold text-[#89726c] uppercase tracking-wider px-2">
                  <span>Arraste / Reordene</span>
                  <span className="text-[#9a4029]">Alta Prioridade</span>
                </div>

                <div className="space-y-3">
                  {priorities.map((item, index) => (
                    <div
                      key={item.id}
                      className="p-4 rounded-2xl bg-[#fff8f5] border border-[#efe6e2] shadow-sm hover:border-[#9a4029]/40 transition-all flex items-center justify-between"
                    >
                      <div className="flex items-center gap-3">
                        <div className="flex flex-col gap-1">
                          <button
                            onClick={() => movePriority(index, 'up')}
                            disabled={index === 0}
                            className="text-[#89726c] hover:text-[#9a4029] disabled:opacity-30"
                          >
                            <span className="material-symbols-outlined text-[16px]">keyboard_arrow_up</span>
                          </button>
                          <button
                            onClick={() => movePriority(index, 'down')}
                            disabled={index === priorities.length - 1}
                            className="text-[#89726c] hover:text-[#9a4029] disabled:opacity-30"
                          >
                            <span className="material-symbols-outlined text-[16px]">keyboard_arrow_down</span>
                          </button>
                        </div>

                        <div className="w-10 h-10 rounded-xl bg-[#f5ece7] text-[#9a4029] flex items-center justify-center shrink-0">
                          <span className="material-symbols-outlined text-[20px]">{item.icon}</span>
                        </div>

                        <div>
                          <span className="font-semibold text-sm text-[#1e1b18] block">{item.label}</span>
                          <span className="text-xs text-[#56423d] block">{item.description}</span>
                        </div>
                      </div>

                      <span className="text-xs font-bold text-[#9a4029] bg-[#f2dccb] px-2.5 py-1 rounded-full shrink-0">
                        #{index + 1}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="flex justify-between items-center pt-4">
                  <span className="text-[10px] font-bold text-[#89726c] uppercase tracking-wider">
                    Baixa Prioridade
                  </span>
                  <button
                    onClick={handleNextStep}
                    className="px-8 py-3 bg-[#9a4029] text-white rounded-full text-xs font-semibold tracking-wider uppercase hover:bg-[#b9583e] transition-colors shadow-sm flex items-center gap-2"
                  >
                    <span>Continuar</span>
                    <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* STEP 7: Diagnostic Test Intro */}
        {step === 7 && (
          <div className="w-full max-w-4xl space-y-8 animate-fade-in">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-7 space-y-6">
                <span className="text-xs font-semibold text-[#9a4029] tracking-widest uppercase">
                  Avaliação Diagnóstica Niveladora
                </span>
                <h2 className="font-serif text-4xl sm:text-5xl font-semibold text-[#1e1b18] leading-tight">
                  Vamos avaliar <span className="text-[#9a4029] italic font-normal">seu nível.</span>
                </h2>
                <p className="text-sm text-[#56423d] leading-relaxed max-w-md">
                  Selecione o idioma para realizar o teste de nivelamento com 20 questões formuladas rigorosamente do nível A1 ao C1.
                </p>

                {/* Language selection for diagnostic test */}
                <div className="space-y-2">
                  <span className="block text-xs font-bold text-[#89726c] uppercase">Escolha o Idioma do Teste:</span>
                  <div className="flex flex-wrap gap-2">
                    {[
                      { code: 'EN', name: 'Inglês' },
                      { code: 'FR', name: 'Francês' },
                      { code: 'ES', name: 'Espanhol' },
                      { code: 'IT', name: 'Italiano' },
                    ].map((l) => (
                      <button
                        key={l.code}
                        onClick={() => {
                          setTestLanguage(l.code as any);
                          setCurrentQuestionIdx(0);
                        }}
                        className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
                          testLanguage === l.code
                            ? 'bg-[#9a4029] text-white shadow-sm'
                            : 'bg-[#f5ece7] text-[#56423d] hover:bg-[#efe6e2]'
                        }`}
                      >
                        <span className="font-serif font-black">{l.code}</span>
                        <span>{l.name}</span>
                      </button>
                    ))}
                  </div>
                </div>

                <div className="pt-2">
                  <button
                    onClick={handleNextStep}
                    className="px-10 py-4 bg-[#9a4029] text-white font-semibold rounded-xl text-xs uppercase tracking-wider hover:bg-[#b9583e] transition-all shadow-md flex items-center gap-2"
                  >
                    <span>Iniciar Teste ({testLanguage})</span>
                    <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
                  </button>
                </div>
              </div>

              <div className="lg:col-span-5 bg-[#f5ece7] p-6 rounded-2xl border border-[#dcc1ba]/60 space-y-6">
                <div className="flex justify-between items-center border-b border-[#efe6e2] pb-3">
                  <span className="font-serif font-bold text-base text-[#1e1b18]">Resumo do Teste</span>
                  <span className="text-[10px] font-bold text-[#9a4029] bg-[#f2dccb] px-2 py-0.5 rounded-full uppercase">
                    {testLanguage}
                  </span>
                </div>

                <div className="space-y-4 text-xs text-[#56423d]">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-[#fff8f5] text-[#9a4029] flex items-center justify-center">
                      <span className="material-symbols-outlined text-[18px]">format_list_numbered</span>
                    </div>
                    <div>
                      <span className="block font-bold text-[#89726c] uppercase text-[10px]">Volume</span>
                      <span className="font-semibold text-[#1e1b18]">20 questões selecionadas ({testLanguage})</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-[#fff8f5] text-[#9a4029] flex items-center justify-center">
                      <span className="material-symbols-outlined text-[18px]">timer</span>
                    </div>
                    <div>
                      <span className="block font-bold text-[#89726c] uppercase text-[10px]">Duração Estimada</span>
                      <span className="font-semibold text-[#1e1b18]">Aproximadamente 12 minutos</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-[#fff8f5] text-[#9a4029] flex items-center justify-center">
                      <span className="material-symbols-outlined text-[18px]">psychology</span>
                    </div>
                    <div>
                      <span className="block font-bold text-[#89726c] uppercase text-[10px]">Avaliador Automatizado</span>
                      <span className="font-semibold text-[#1e1b18]">Gramática, Sintaxe, Leitura e Fonética</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* STEP 8: Placement Assessment Module (Matching Images 12 & 14) */}
        {step === 8 && (
          <div className="w-full max-w-4xl space-y-6 animate-fade-in relative">
            <div className="flex items-center justify-between text-xs text-[#89726c]">
              <span className="font-serif font-bold text-lg text-[#9a4029]">
                {currentQuestion.module}
              </span>
              <button
                onClick={() => setShowPauseModal(true)}
                className="hover:text-[#9a4029] transition-colors flex items-center gap-1 font-semibold"
              >
                <span className="material-symbols-outlined text-[18px]">pause_circle</span>
                <span>Pausar</span>
              </button>
            </div>

            {/* Reading passage card if available */}
            {currentQuestion.passage && (
              <div className="p-6 rounded-2xl bg-[#f5ece7]/80 border border-[#dcc1ba]/60 font-serif text-base text-[#1e1b18] leading-relaxed shadow-sm">
                <span className="block text-[10px] font-bold text-[#9a4029] uppercase tracking-wider mb-2 font-sans">
                  Leia o trecho abaixo
                </span>
                {currentQuestion.passage}
              </div>
            )}

            {/* Question title */}
            <div className="space-y-2">
              <h3 className="font-serif text-xl sm:text-2xl font-semibold text-[#1e1b18]">
                {currentQuestion.questionText}
              </h3>
            </div>

            {/* Question options */}
            <div className="space-y-3">
              {currentQuestion.options.map((opt) => {
                const isSelected = selectedOptionId === opt.id;
                let optBorderClass = 'border-[#efe6e2] bg-[#fff8f5] hover:bg-[#fbf2ed]';

                if (showAnswerFeedback) {
                  if (opt.isCorrect) {
                    optBorderClass = 'border-[#9a4029] bg-[#9a4029]/10 ring-2 ring-[#9a4029]';
                  } else if (isSelected) {
                    optBorderClass = 'border-[#ba1a1a] bg-[#ffdad6]/40';
                  }
                }

                return (
                  <div key={opt.id} className="space-y-2">
                    <button
                      onClick={() => handleSelectOption(opt.id)}
                      className={`w-full p-4 rounded-2xl text-left border transition-all flex items-start gap-4 ${optBorderClass}`}
                    >
                      <div className={`w-7 h-7 rounded-full flex items-center justify-center font-bold text-xs shrink-0 mt-0.5 ${
                        opt.isCorrect && showAnswerFeedback
                          ? 'bg-[#9a4029] text-white'
                          : isSelected && !opt.isCorrect && showAnswerFeedback
                          ? 'bg-[#ba1a1a] text-white'
                          : 'bg-[#f5ece7] text-[#56423d]'
                      }`}>
                        {opt.id.toUpperCase()}
                      </div>

                      <div className="flex-1 text-sm font-medium text-[#1e1b18] leading-snug">
                        {opt.text}
                      </div>
                    </button>

                    {/* Explanatory feedback box if selected */}
                    {showAnswerFeedback && isSelected && (
                      <div className={`p-4 rounded-xl text-xs space-y-1 ${
                        opt.isCorrect ? 'bg-[#f2dccb] text-[#706052]' : 'bg-[#ffdad6] text-[#93000a]'
                      }`}>
                        <span className="font-bold uppercase tracking-wider block">
                          {opt.isCorrect ? ' Insight Correto' : ' Incorreta'}
                        </span>
                        <p>{opt.explanation}</p>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Next question button */}
            {showAnswerFeedback && (
              <div className="flex justify-end pt-4">
                <button
                  onClick={handleNextQuestion}
                  className="px-8 py-3 bg-[#9a4029] text-white rounded-full text-xs font-semibold tracking-wider uppercase hover:bg-[#b9583e] transition-colors shadow-sm flex items-center gap-2"
                >
                  <span>Próxima Questão</span>
                  <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
                </button>
              </div>
            )}

            {/* Pause Modal Overlay */}
            {showPauseModal && (
              <div className="fixed inset-0 bg-[#1e1b18]/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                <div className="bg-[#fff8f5] rounded-3xl p-8 max-w-md w-full border border-[#dcc1ba] shadow-2xl text-center space-y-6 animate-fade-in">
                  <div className="w-12 h-12 rounded-full bg-[#f5ece7] text-[#9a4029] flex items-center justify-center mx-auto">
                    <span className="material-symbols-outlined text-[24px]">pause</span>
                  </div>
                  <h3 className="font-serif text-2xl font-semibold text-[#1e1b18]">
                    Você deseja continuar depois?
                  </h3>
                  <p className="text-xs text-[#56423d]">
                    Seu progresso será salvo e você poderá retomar de onde parou a qualquer instante.
                  </p>
                  <div className="space-y-3">
                    <button
                      onClick={() => setShowPauseModal(false)}
                      className="w-full py-3 bg-[#9a4029] text-white rounded-xl text-xs font-semibold uppercase tracking-wider hover:bg-[#b9583e]"
                    >
                      Continuar Teste
                    </button>
                    <button
                      onClick={() => {
                        setShowPauseModal(false);
                        onNavigate('dashboard');
                      }}
                      className="w-full py-3 border border-[#89726c] text-[#56423d] rounded-xl text-xs font-semibold uppercase hover:bg-[#f5ece7]"
                    >
                      Salvar e Sair
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* STEP 9: Diagnostic Assessment Result */}
        {step === 9 && (
          <div className="w-full max-w-3xl space-y-8 animate-fade-in text-center">
            <div className="space-y-2">
              <span className="text-xs font-semibold text-[#9a4029] uppercase tracking-widest bg-[#f2dccb] px-3 py-1 rounded-full">
                Avaliação Concluída ({testLanguage})
              </span>
              <h2 className="font-serif text-4xl sm:text-5xl font-semibold text-[#1e1b18]">
                Nível Confirmado: {calculatedLevel.title}
              </h2>
              <p className="text-xs text-[#56423d] max-w-xl mx-auto leading-relaxed">
                {calculatedLevel.sub}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
              <div className="p-6 rounded-2xl bg-[#f5ece7] border border-[#dcc1ba]/60 flex flex-col items-center space-y-4">
                <span className="font-semibold text-sm text-[#1e1b18]">Compreensão Geral</span>
                <div className="relative w-32 h-32 flex items-center justify-center">
                  <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                    <path
                      className="text-[#e9e1dc]"
                      strokeWidth="3.5"
                      stroke="currentColor"
                      fill="none"
                      d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                    />
                    <path
                      className="text-[#9a4029]"
                      strokeDasharray={`${calculatedComprehension}, 100`}
                      strokeWidth="3.5"
                      strokeLinecap="round"
                      stroke="currentColor"
                      fill="none"
                      d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                    />
                  </svg>
                  <div className="absolute flex flex-col items-center">
                    <span className="font-serif text-2xl font-bold text-[#1e1b18]">{calculatedComprehension}%</span>
                    <span className="text-[10px] font-bold text-[#9a4029] uppercase">
                      {calculatedComprehension >= 80 ? 'Excelente' : calculatedComprehension >= 50 ? 'Bom' : 'Em Construção'}
                    </span>
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                {[
                  { label: 'Reading (Leitura)', score: calculatedReading },
                  { label: 'Vocabulary (Vocabulário)', score: calculatedVocab },
                  { label: 'Grammar (Gramática)', score: calculatedGrammar },
                ].map((sk, idx) => (
                  <div key={idx} className="p-4 rounded-xl bg-[#fff8f5] border border-[#efe6e2] space-y-1 text-left">
                    <div className="flex justify-between text-xs font-semibold text-[#1e1b18]">
                      <span>{sk.label}</span>
                      <span className="text-[#9a4029]">{sk.score}%</span>
                    </div>
                    <div className="w-full h-2 bg-[#e9e1dc] rounded-full overflow-hidden">
                      <div className="h-full bg-[#9a4029]" style={{ width: `${sk.score}%` }}></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex justify-center pt-4">
              <button
                onClick={handleNextStep}
                className="px-10 py-3.5 bg-[#9a4029] text-white rounded-full text-xs font-semibold tracking-wider uppercase hover:bg-[#b9583e] shadow-md flex items-center gap-2"
              >
                <span>Ver Resumo do Plano</span>
                <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
              </button>
            </div>
          </div>
        )}

        {/* STEP 10: Plan Summary */}
        {step === 10 && (
          <div className="w-full max-w-4xl space-y-8 animate-fade-in">
            <div className="text-center space-y-2">
              <h2 className="font-serif text-4xl sm:text-5xl font-semibold text-[#1e1b18]">
                Resumo do Plano
              </h2>
              <p className="text-xs text-[#56423d]">
                Criamos uma rotina inteligente adaptada perfeitamente ao seu ritmo e objetivos.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              {/* Choices Summary Cards */}
              <div className="lg:col-span-7 space-y-4">
                <div className="flex justify-between items-center text-xs font-semibold text-[#89726c] uppercase">
                  <span>Suas Escolhas</span>
                  <button onClick={() => setStep(1)} className="text-[#9a4029] hover:underline">
                    Editar
                  </button>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 rounded-2xl bg-[#f5ece7] border border-[#dcc1ba]/60 space-y-1">
                    <span className="text-[10px] font-bold text-[#89726c] uppercase block">Idioma Alvo</span>
                    <span className="font-serif text-lg font-semibold text-[#1e1b18] block">
                      {testLanguage === 'EN' ? 'Inglês' : testLanguage === 'FR' ? 'Francês' : testLanguage === 'ES' ? 'Espanhol' : 'Italiano'}
                    </span>
                    <span className="text-xs text-[#56423d] block">{testLanguage}</span>
                  </div>

                  <div className="p-4 rounded-2xl bg-[#f5ece7] border border-[#dcc1ba]/60 space-y-1">
                    <span className="text-[10px] font-bold text-[#89726c] uppercase block">Objetivo</span>
                    <span className="font-serif text-lg font-semibold text-[#1e1b18] block capitalize">
                      {goal === 'conversar' ? 'Conversar Fluentemente' : goal === 'viajar' ? 'Viajar' : goal === 'ler' ? 'Leitura' : goal}
                    </span>
                  </div>

                  <div className="p-4 rounded-2xl bg-[#f5ece7] border border-[#dcc1ba]/60 space-y-1">
                    <span className="text-[10px] font-bold text-[#89726c] uppercase block">Dedicação Diária</span>
                    <span className="font-serif text-lg font-semibold text-[#1e1b18] block">{dailyMins} Minutos</span>
                    <div className="w-full h-1.5 bg-[#e9e1dc] rounded-full overflow-hidden mt-2">
                      <div className="h-full bg-[#9a4029]" style={{ width: `${Math.min(100, (dailyMins / 60) * 100)}%` }}></div>
                    </div>
                  </div>

                  <div className="p-4 rounded-2xl bg-[#ffdad6]/40 border border-[#ba1a1a]/20 space-y-1">
                    <span className="text-[10px] font-bold text-[#ba1a1a] uppercase block">Nível Confirmado</span>
                    <span className="font-serif text-lg font-semibold text-[#1e1b18] block">{calculatedLevel.title}</span>
                    <span className="text-xs text-[#56423d] block">Avaliador Kairo ({correctCount}/{totalQuestions} acertos)</span>
                  </div>
                </div>

                <div className="pt-4">
                  <button
                    onClick={handleNextStep}
                    className="w-full py-4 bg-[#9a4029] text-white rounded-xl text-xs font-semibold uppercase tracking-wider hover:bg-[#b9583e] transition-all shadow-md flex items-center justify-center gap-2"
                  >
                    <span>Criar Meu Plano no Kairo</span>
                    <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
                  </button>
                </div>
              </div>

              {/* Trajectory Card */}
              <div className="lg:col-span-5 glass-card p-6 rounded-3xl border border-[#dcc1ba] space-y-6 text-center shadow-lg">
                <div className="flex justify-between items-center text-[10px] font-bold text-[#9a4029] uppercase">
                  <span>Kairo AI</span>
                  <span className="bg-[#f2dccb] px-2 py-0.5 rounded-full">Projeção Real</span>
                </div>

                <div className="relative w-40 h-40 mx-auto flex items-center justify-center">
                  <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                    <path
                      className="text-[#e9e1dc]"
                      strokeWidth="3"
                      stroke="currentColor"
                      fill="none"
                      d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                    />
                    <path
                      className="text-[#9a4029]"
                      strokeDasharray={`${calculatedComprehension}, 100`}
                      strokeWidth="3"
                      strokeLinecap="round"
                      stroke="currentColor"
                      fill="none"
                      d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                    />
                  </svg>
                  <div className="absolute flex flex-col items-center">
                    <span className="font-serif text-3xl font-bold text-[#1e1b18]">{dailyMins}</span>
                    <span className="text-[10px] font-bold text-[#89726c] uppercase">MIN / DIA</span>
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-[#fff8f5] border border-[#efe6e2] text-left space-y-1">
                  <span className="text-[10px] font-bold text-[#89726c] uppercase block">Trajetória Estimada Real</span>
                  <span className="font-serif text-lg font-semibold text-[#1e1b18] block">{calculatedLevel.nextTrajectory}</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};
