import React, { useState, useEffect } from 'react';
import { AppView, SkillType, UserProfile } from '../types';
import { MOCK_PODCAST_LESSONS } from '../data/mockData';
import { askAILanguageCoach } from '../services/geminiService';

interface StudyStudioViewProps {
  user: UserProfile;
  initialSkill?: SkillType;
  onNavigate: (view: AppView) => void;
  onOpenCoach: () => void;
}

export const StudyStudioView: React.FC<StudyStudioViewProps> = ({
  user,
  initialSkill = 'listening',
  onNavigate,
  onOpenCoach
}) => {
  const [selectedSkill, setSelectedSkill] = useState<SkillType>(initialSkill);
  const [selectedLanguage, setSelectedLanguage] = useState<string>(user.targetLanguage || 'EN');
  const [activeTab, setActiveTab] = useState<'podcast' | 'ai-chat' | 'vocab' | 'reading'>('podcast');

  // Timer State
  const [secondsRemaining, setSecondsRemaining] = useState<number>(22 * 60 + 31); // 22:31 default
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [speed, setSpeed] = useState<string>('1.0x');

  // AI Chat State
  const [chatMessages, setChatMessages] = useState<{ sender: 'ai' | 'user'; text: string }[]>([
    { sender: 'ai', text: 'Hello! I am your Kairo AI practice partner. How was your day today?' }
  ]);
  const [userInputText, setUserInputText] = useState<string>('');
  const [isSending, setIsSending] = useState<boolean>(false);

  // Live Timer Countdown Effect
  useEffect(() => {
    let interval: any = null;
    if (isPlaying && secondsRemaining > 0) {
      interval = setInterval(() => {
        setSecondsRemaining(prev => prev - 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isPlaying, secondsRemaining]);

  const formatTimer = (totalSecs: number) => {
    const mins = Math.floor(totalSecs / 60);
    const secs = totalSecs % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleSendChatMessage = async () => {
    if (!userInputText.trim() || isSending) return;
    const text = userInputText;
    setUserInputText('');
    setChatMessages(prev => [...prev, { sender: 'user', text }]);
    setIsSending(true);

    const response = await askAILanguageCoach(text, selectedLanguage === 'EN' ? 'Inglês' : 'Francês');
    setChatMessages(prev => [...prev, { sender: 'ai', text: response }]);
    setIsSending(false);
  };

  return (
    <div className="min-h-screen bg-[#fff8f5] text-[#1e1b18] flex flex-col pt-16">
      {/* Top Header */}
      <header className="fixed top-0 left-0 w-full h-16 bg-[#fff8f5]/90 backdrop-blur-md border-b border-[#efe6e2] z-40 px-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button
            onClick={() => onNavigate('dashboard')}
            className="flex items-center gap-1 text-[#56423d] hover:text-[#9a4029] text-xs font-semibold"
          >
            <span className="material-symbols-outlined text-[18px]">arrow_back</span>
            <span>Voltar ao Dashboard</span>
          </button>
        </div>

        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-md bg-[#9a4029] text-white flex items-center justify-center font-bold text-xs">
            K
          </div>
          <span className="font-serif text-lg font-semibold text-[#9a4029]">Kairo Estúdio de Prática</span>
        </div>

        <button
          onClick={() => onNavigate('dashboard')}
          className="px-4 py-1.5 border border-[#89726c] text-[#56423d] hover:bg-[#f5ece7] rounded-full text-xs font-semibold uppercase"
        >
          Concluir Sessão
        </button>
      </header>

      <main className="max-w-6xl mx-auto w-full p-6 space-y-6">
        {/* Active Session Studio Hero Bar (Matching Image 2) */}
        <div className="p-6 rounded-3xl bg-[#f5ece7] border border-[#dcc1ba]/80 space-y-6 shadow-sm">
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#efe6e2] pb-4">
            <div className="flex items-center gap-3">
              <span className="flex h-3 w-3 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#9a4029] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-[#9a4029]"></span>
              </span>
              <div>
                <span className="text-[10px] font-bold text-[#89726c] uppercase tracking-wider block">
                  Sessão em Andamento
                </span>
                <span className="font-serif text-3xl font-bold text-[#1e1b18]">
                  {formatTimer(secondsRemaining)}
                </span>
              </div>
            </div>

            {/* Language & Skill Dropdowns */}
            <div className="flex flex-wrap items-center gap-3">
              <select
                value={selectedLanguage}
                onChange={(e) => setSelectedLanguage(e.target.value)}
                className="bg-[#fff8f5] border border-[#dcc1ba] text-xs font-semibold text-[#1e1b18] px-3 py-2 rounded-xl outline-none"
              >
                <option value="EN">Inglês (B1 Intermediário)</option>
                <option value="FR">Francês (A2)</option>
                <option value="ES">Espanhol (A1)</option>
              </select>

              <div className="flex bg-[#fff8f5] p-1 rounded-xl border border-[#dcc1ba]">
                {(['listening', 'speaking', 'reading', 'writing'] as SkillType[]).map((sk) => (
                  <button
                    key={sk}
                    onClick={() => setSelectedSkill(sk)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold capitalize transition-all ${
                      selectedSkill === sk
                        ? 'bg-[#9a4029] text-white shadow-sm'
                        : 'text-[#56423d] hover:text-[#1e1b18]'
                    }`}
                  >
                    {sk}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Audio Controls & Waveform */}
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <button
                onClick={() => setIsPlaying(!isPlaying)}
                className="w-12 h-12 rounded-full bg-[#9a4029] text-white flex items-center justify-center hover:bg-[#b9583e] transition-transform active:scale-95 shadow-md"
              >
                <span className="material-symbols-outlined text-[24px]">
                  {isPlaying ? 'pause' : 'play_arrow'}
                </span>
              </button>

              <button
                onClick={() => setSecondsRemaining(prev => Math.max(0, prev - 15))}
                className="p-2 text-[#56423d] hover:text-[#9a4029]"
                title="Voltar 15s"
              >
                <span className="material-symbols-outlined text-[20px]">replay_10</span>
              </button>

              <button
                onClick={() => setSecondsRemaining(prev => prev + 15)}
                className="p-2 text-[#56423d] hover:text-[#9a4029]"
                title="Avançar 15s"
              >
                <span className="material-symbols-outlined text-[20px]">forward_10</span>
              </button>

              <div className="pl-2">
                <span className="font-semibold text-xs text-[#1e1b18] block">
                  Podcast: Business English Episode #12
                </span>
                <span className="text-[11px] text-[#89726c]">Áudio imersivo de nível B1</span>
              </div>
            </div>

            {/* Speed Selector */}
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold text-[#89726c]">Velocidade:</span>
              {['0.8x', '1.0x', '1.25x', '1.5x'].map((sp) => (
                <button
                  key={sp}
                  onClick={() => setSpeed(sp)}
                  className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all ${
                    speed === sp ? 'bg-[#9a4029] text-white' : 'bg-[#fff8f5] text-[#56423d]'
                  }`}
                >
                  {sp}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Study Studio Modes Navigation */}
        <div className="flex border-b border-[#efe6e2] gap-6 text-sm font-semibold text-[#56423d]">
          {[
            { id: 'podcast', label: 'Transcrição & Áudio', icon: 'podcasts' },
            { id: 'ai-chat', label: 'Conversação com IA', icon: 'chat' },
            { id: 'vocab', label: 'Repositório & Fonética IPA', icon: 'spellcheck' },
            { id: 'reading', label: 'Leitura Contextual', icon: 'article' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`pb-3 border-b-2 flex items-center gap-2 transition-all ${
                activeTab === tab.id
                  ? 'border-[#9a4029] text-[#9a4029]'
                  : 'border-transparent text-[#56423d] hover:text-[#1e1b18]'
              }`}
            >
              <span className="material-symbols-outlined text-[18px]">{tab.icon}</span>
              <span>{tab.label}</span>
            </button>
          ))}
        </div>

        {/* MODE 1: Podcast Transcript */}
        {activeTab === 'podcast' && (
          <div className="bg-[#fff8f5] p-6 rounded-2xl border border-[#efe6e2] space-y-4">
            <h3 className="font-serif text-xl font-semibold text-[#1e1b18]">
              Transcrição Sincronizada
            </h3>
            <p className="text-xs text-[#56423d]">
              Clique em qualquer palavra para ver a tradução instantânea e salvar no seu baralho de vocabulário.
            </p>

            <div className="space-y-4 pt-2">
              {MOCK_PODCAST_LESSONS[0].transcript.map((item, idx) => (
                <div key={idx} className="p-4 rounded-xl bg-[#f5ece7] border border-[#dcc1ba]/40 space-y-1">
                  <div className="flex justify-between items-center text-[10px] font-bold text-[#9a4029] uppercase">
                    <span>{item.speaker}</span>
                    <span>{item.time}</span>
                  </div>
                  <p className="text-sm font-medium text-[#1e1b18] leading-relaxed">
                    {item.text}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* MODE 2: AI Voice & Conversation Partner */}
        {activeTab === 'ai-chat' && (
          <div className="bg-[#fff8f5] p-6 rounded-2xl border border-[#efe6e2] space-y-4 flex flex-col h-[500px]">
            <div className="flex justify-between items-center border-b border-[#efe6e2] pb-3">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-[#9a4029] text-white flex items-center justify-center font-bold text-xs">
                  AI
                </div>
                <div>
                  <span className="font-semibold text-sm text-[#1e1b18] block">Parceiro Kairo AI</span>
                  <span className="text-[10px] text-[#89726c] uppercase">Prática Ativa de Diálogo</span>
                </div>
              </div>
              <span className="text-xs font-semibold text-[#9a4029] bg-[#f2dccb] px-2.5 py-0.5 rounded-full">
                Gemini 2.5 Active
              </span>
            </div>

            {/* Chat Messages */}
            <div className="flex-1 overflow-y-auto space-y-3 p-2">
              {chatMessages.map((msg, idx) => (
                <div
                  key={idx}
                  className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-lg p-4 rounded-2xl text-xs leading-relaxed ${
                      msg.sender === 'user'
                        ? 'bg-[#9a4029] text-white rounded-br-none'
                        : 'bg-[#f5ece7] text-[#1e1b18] border border-[#dcc1ba]/40 rounded-bl-none'
                    }`}
                  >
                    {msg.text}
                  </div>
                </div>
              ))}
            </div>

            {/* Chat Input */}
            <div className="flex gap-2 pt-2 border-t border-[#efe6e2]">
              <input
                type="text"
                value={userInputText}
                onChange={(e) => setUserInputText(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSendChatMessage()}
                placeholder="Escreva sua resposta em Inglês..."
                className="flex-1 bg-[#f5ece7] border border-[#dcc1ba] rounded-xl px-4 py-2.5 text-xs outline-none focus:border-[#9a4029]"
              />
              <button
                onClick={handleSendChatMessage}
                disabled={isSending}
                className="px-5 py-2.5 bg-[#9a4029] text-white rounded-xl text-xs font-semibold uppercase hover:bg-[#b9583e] transition-colors"
              >
                Enviar
              </button>
            </div>
          </div>
        )}

        {/* MODE 3: Vocab Repository & IPA Quick Link */}
        {activeTab === 'vocab' && (
          <div className="bg-[#fff8f5] p-8 rounded-2xl border border-[#efe6e2] space-y-6 text-center max-w-2xl mx-auto">
            <div className="w-16 h-16 rounded-full bg-[#f5ece7] text-[#9a4029] flex items-center justify-center mx-auto shadow-inner">
              <span className="material-symbols-outlined text-[32px]">spellcheck</span>
            </div>

            <div className="space-y-2">
              <h3 className="font-serif text-2xl font-bold text-[#1e1b18]">
                Repositório de Vocabulário com Fonética IPA
              </h3>
              <p className="text-xs text-[#56423d] leading-relaxed max-w-lg mx-auto">
                Acesse a coleção completa de palavras aprendidas em Inglês, Francês, Espanhol e Italiano com notação IPA, tradução contextual e síntese de voz nativa.
              </p>
            </div>

            <div className="pt-2">
              <button
                onClick={() => onNavigate('vocab')}
                className="px-8 py-3.5 bg-[#9a4029] text-white rounded-xl text-xs font-semibold uppercase tracking-wider hover:bg-[#b9583e] transition-all shadow-md inline-flex items-center gap-2"
              >
                <span>Abrir Repositório Completo</span>
                <span className="material-symbols-outlined text-[18px]">open_in_new</span>
              </button>
            </div>
          </div>
        )}

        {/* MODE 4: Reading & Context Drill */}
        {activeTab === 'reading' && (
          <div className="bg-[#fff8f5] p-6 rounded-2xl border border-[#efe6e2] space-y-4 font-serif leading-relaxed">
            <h3 className="text-2xl font-bold text-[#1e1b18]">
              The Evolution of Language Acquisition
            </h3>
            <p className="text-sm text-[#56423d]">
              Consistency and structured immersion are the bedrock of fluency. By focusing on high-frequency vocabulary and contextual syntax, learners achieve retention up to three times faster than standard repetition methods.
            </p>
          </div>
        )}
      </main>
    </div>
  );
};
