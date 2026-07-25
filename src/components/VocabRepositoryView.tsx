import React, { useState } from 'react';
import { AppView, LearnedWord, UserProfile } from '../types';
import { Sidebar } from './Sidebar';

interface VocabRepositoryViewProps {
  user: UserProfile;
  onUpdateUser: (updated: Partial<UserProfile>) => void;
  onNavigate: (view: AppView) => void;
  onOpenCoach: () => void;
}

export const VocabRepositoryView: React.FC<VocabRepositoryViewProps> = ({
  user,
  onUpdateUser,
  onNavigate,
  onOpenCoach
}) => {
  const [selectedLang, setSelectedLang] = useState<'ALL' | 'EN' | 'FR' | 'ES' | 'IT'>('ALL');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [showAddModal, setShowAddModal] = useState<boolean>(false);

  // Form for adding new word
  const [newWord, setNewWord] = useState<string>('');
  const [newIpa, setNewIpa] = useState<string>('');
  const [newTranslation, setNewTranslation] = useState<string>('');
  const [newExample, setNewExample] = useState<string>('');
  const [newLang, setNewLang] = useState<'EN' | 'FR' | 'ES' | 'IT'>('EN');
  const [newCategory, setNewCategory] = useState<'substantivo' | 'verbo' | 'adjetivo' | 'expressao'>('substantivo');

  const words = user.learnedWords || [];

  const filteredWords = words.filter((item) => {
    const matchesLang = selectedLang === 'ALL' || item.language === selectedLang;
    const matchesSearch =
      item.word.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.translation.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.ipa.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesLang && matchesSearch;
  });

  const handleSpeak = (word: string, langCode: 'EN' | 'FR' | 'ES' | 'IT') => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(word);
      const localeMap: Record<string, string> = {
        EN: 'en-US',
        FR: 'fr-FR',
        ES: 'es-ES',
        IT: 'it-IT'
      };
      utterance.lang = localeMap[langCode] || 'en-US';
      utterance.rate = 0.9;
      window.speechSynthesis.speak(utterance);
    }
  };

  const handleToggleMastered = (id: string) => {
    const updated = words.map(w => w.id === id ? { ...w, mastered: !w.mastered } : w);
    onUpdateUser({ learnedWords: updated });
  };

  const handleAddWord = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newWord.trim() || !newTranslation.trim()) return;

    const newEntry: LearnedWord = {
      id: `custom-${Date.now()}`,
      language: newLang,
      word: newWord.trim(),
      ipa: newIpa.trim() ? (newIpa.startsWith('/') ? newIpa.trim() : `/${newIpa.trim()}/`) : '/phonetic/',
      translation: newTranslation.trim(),
      example: newExample.trim() || `Exemplo com ${newWord.trim()}`,
      category: newCategory,
      dateAdded: new Date().toISOString().split('T')[0],
      mastered: false
    };

    onUpdateUser({ learnedWords: [newEntry, ...words] });
    setNewWord('');
    setNewIpa('');
    setNewTranslation('');
    setNewExample('');
    setShowAddModal(false);
  };

  const getLanguageBadge = (lang: string) => {
    switch (lang) {
      case 'EN': return { name: 'Inglês', bg: 'bg-[#e0f2fe]', text: 'text-[#0369a1]' };
      case 'FR': return { name: 'Francês', bg: 'bg-[#fce7f3]', text: 'text-[#be185d]' };
      case 'ES': return { name: 'Espanhol', bg: 'bg-[#fef3c7]', text: 'text-[#b45309]' };
      case 'IT': return { name: 'Italiano', bg: 'bg-[#dcfce7]', text: 'text-[#15803d]' };
      default: return { name: lang, bg: 'bg-[#f5ece7]', text: 'text-[#9a4029]' };
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
            Repositório de Palavras & Fonética IPA
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
        <Sidebar currentView="vocab" onNavigate={onNavigate} onOpenCoach={onOpenCoach} />

        <main className="flex-1 p-6 lg:p-10 space-y-8 max-w-7xl mx-auto w-full">
          {/* Hero Bar */}
          <div className="p-8 rounded-3xl bg-[#f5ece7] border border-[#dcc1ba]/80 flex flex-wrap items-center justify-between gap-6 shadow-sm">
            <div className="space-y-2 max-w-2xl">
              <span className="text-xs font-semibold text-[#9a4029] uppercase tracking-widest bg-[#f2dccb] px-3 py-1 rounded-full">
                Vocabulário Aprendido
              </span>
              <h1 className="font-serif text-3xl font-semibold text-[#1e1b18]">
                Dicionário Fonético IPA
              </h1>
              <p className="text-xs sm:text-sm text-[#56423d] leading-relaxed">
                Consulte todas as palavras aprendidas em Inglês, Francês, Espanhol e Italiano, acompanhadas do Alfabeto Fonético Internacional (IPA) para pronúncia perfeita.
              </p>
            </div>

            <button
              onClick={() => setShowAddModal(true)}
              className="px-6 py-3.5 bg-[#9a4029] text-white rounded-xl text-xs font-semibold uppercase tracking-wider hover:bg-[#b9583e] transition-all shadow-md flex items-center gap-2 shrink-0"
            >
              <span className="material-symbols-outlined text-[18px]">add</span>
              <span>Adicionar Palavra</span>
            </button>
          </div>

          {/* Language Filter & Search Bar */}
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#efe6e2] pb-4">
            <div className="flex flex-wrap gap-2">
              {[
                { code: 'ALL', label: 'Todos os Idiomas' },
                { code: 'EN', label: 'Inglês (EN)' },
                { code: 'FR', label: 'Francês (FR)' },
                { code: 'ES', label: 'Espanhol (ES)' },
                { code: 'IT', label: 'Italiano (IT)' },
              ].map((tab) => (
                <button
                  key={tab.code}
                  onClick={() => setSelectedLang(tab.code as any)}
                  className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
                    selectedLang === tab.code
                      ? 'bg-[#9a4029] text-white shadow-sm'
                      : 'bg-[#fff8f5] text-[#56423d] border border-[#efe6e2] hover:border-[#9a4029]/50'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            <div className="relative w-full sm:w-72">
              <span className="material-symbols-outlined text-[18px] text-[#89726c] absolute left-3 top-2.5">
                search
              </span>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Buscar palavra, IPA ou tradução..."
                className="w-full bg-[#fff8f5] border border-[#dcc1ba] rounded-xl pl-9 pr-4 py-2 text-xs text-[#1e1b18] outline-none focus:border-[#9a4029]"
              />
            </div>
          </div>

          {/* Words List Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredWords.map((item) => {
              const badge = getLanguageBadge(item.language);
              return (
                <div
                  key={item.id}
                  className={`p-6 rounded-2xl border transition-all space-y-4 shadow-sm relative group ${
                    item.mastered
                      ? 'bg-[#fbf2ed] border-[#dcc1ba]'
                      : 'bg-[#fff8f5] border-[#efe6e2] hover:border-[#9a4029]/40'
                  }`}
                >
                  <div className="flex justify-between items-start">
                    <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full uppercase ${badge.bg} ${badge.text}`}>
                      {badge.name}
                    </span>

                    <button
                      onClick={() => handleToggleMastered(item.id)}
                      className={`text-xs font-semibold flex items-center gap-1 px-2.5 py-1 rounded-full transition-colors ${
                        item.mastered
                          ? 'bg-[#9a4029] text-white'
                          : 'bg-[#f5ece7] text-[#89726c] hover:text-[#9a4029]'
                      }`}
                      title={item.mastered ? 'Palavra Dominada' : 'Marcar como Dominada'}
                    >
                      <span className="material-symbols-outlined text-[14px]">
                        {item.mastered ? 'check_circle' : 'circle'}
                      </span>
                      <span>{item.mastered ? 'Dominada' : 'Aprender'}</span>
                    </button>
                  </div>

                  <div>
                    <div className="flex items-center gap-3">
                      <h3 className="font-serif text-2xl font-bold text-[#1e1b18]">
                        {item.word}
                      </h3>
                      <button
                        onClick={() => handleSpeak(item.word, item.language)}
                        className="w-8 h-8 rounded-full bg-[#f5ece7] hover:bg-[#9a4029] text-[#9a4029] hover:text-white flex items-center justify-center transition-colors shadow-sm"
                        title="Ouvir pronúncia"
                      >
                        <span className="material-symbols-outlined text-[18px]">volume_up</span>
                      </button>
                    </div>

                    {/* Phonetic IPA Notation Box */}
                    <div className="mt-1 flex items-center gap-2">
                      <span className="text-xs font-mono font-bold text-[#9a4029] bg-[#f2dccb]/70 px-2.5 py-1 rounded-md tracking-wider">
                        IPA: {item.ipa}
                      </span>
                      <span className="text-[10px] font-bold uppercase text-[#89726c]">
                        {item.category}
                      </span>
                    </div>
                  </div>

                  <div className="pt-2 border-t border-[#efe6e2] space-y-1">
                    <span className="text-xs font-bold text-[#1e1b18] block">
                      Tradução: {item.translation}
                    </span>
                    <p className="text-xs text-[#56423d] italic leading-relaxed">
                      "{item.example}"
                    </p>
                  </div>
                </div>
              );
            })}

            {filteredWords.length === 0 && (
              <div className="col-span-full py-12 text-center text-sm text-[#89726c] space-y-2">
                <span className="material-symbols-outlined text-[48px] text-[#dcc1ba]">search_off</span>
                <p>Nenhuma palavra encontrada para o filtro selecionado.</p>
              </div>
            )}
          </div>
        </main>
      </div>

      {/* Add Word Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-[#1e1b18]/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-[#fff8f5] rounded-3xl p-6 sm:p-8 max-w-lg w-full border border-[#dcc1ba] shadow-2xl space-y-6 animate-fade-in">
            <div className="flex justify-between items-center border-b border-[#efe6e2] pb-3">
              <h3 className="font-serif text-2xl font-semibold text-[#1e1b18]">
                Adicionar Palavra ao Repositório
              </h3>
              <button
                onClick={() => setShowAddModal(false)}
                className="text-[#89726c] hover:text-[#1e1b18]"
              >
                <span className="material-symbols-outlined text-[20px]">close</span>
              </button>
            </div>

            <form onSubmit={handleAddWord} className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-[#56423d] uppercase mb-1">
                    Idioma
                  </label>
                  <select
                    value={newLang}
                    onChange={(e) => setNewLang(e.target.value as any)}
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
                    Categoria
                  </label>
                  <select
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value as any)}
                    className="w-full bg-[#f5ece7] border border-[#dcc1ba] rounded-xl px-3 py-2 text-xs font-semibold text-[#1e1b18] outline-none"
                  >
                    <option value="substantivo">Substantivo</option>
                    <option value="verbo">Verbo</option>
                    <option value="adjetivo">Adjetivo</option>
                    <option value="expressao">Expressão</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#56423d] uppercase mb-1">
                  Palavra no Idioma Alvo
                </label>
                <input
                  type="text"
                  required
                  value={newWord}
                  onChange={(e) => setNewWord(e.target.value)}
                  placeholder="Ex: Sviluppare"
                  className="w-full bg-[#f5ece7] border border-[#dcc1ba] rounded-xl px-3 py-2 text-xs text-[#1e1b18] outline-none focus:border-[#9a4029]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#56423d] uppercase mb-1">
                  Fonética IPA (International Phonetic Alphabet)
                </label>
                <input
                  type="text"
                  value={newIpa}
                  onChange={(e) => setNewIpa(e.target.value)}
                  placeholder="Ex: /zvilupˈpa.re/"
                  className="w-full bg-[#f5ece7] border border-[#dcc1ba] rounded-xl px-3 py-2 text-xs font-mono text-[#9a4029] outline-none focus:border-[#9a4029]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#56423d] uppercase mb-1">
                  Tradução em Português
                </label>
                <input
                  type="text"
                  required
                  value={newTranslation}
                  onChange={(e) => setNewTranslation(e.target.value)}
                  placeholder="Ex: Desenvolver"
                  className="w-full bg-[#f5ece7] border border-[#dcc1ba] rounded-xl px-3 py-2 text-xs text-[#1e1b18] outline-none focus:border-[#9a4029]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#56423d] uppercase mb-1">
                  Exemplo de Frase Contextual
                </label>
                <textarea
                  rows={2}
                  value={newExample}
                  onChange={(e) => setNewExample(e.target.value)}
                  placeholder="Ex: Vogliamo sviluppare un nuovo progetto professionale."
                  className="w-full bg-[#f5ece7] border border-[#dcc1ba] rounded-xl px-3 py-2 text-xs text-[#1e1b18] outline-none focus:border-[#9a4029]"
                />
              </div>

              <div className="flex justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-5 py-2.5 border border-[#89726c] text-[#56423d] rounded-xl text-xs font-semibold uppercase hover:bg-[#f5ece7]"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 bg-[#9a4029] text-white rounded-xl text-xs font-semibold uppercase hover:bg-[#b9583e]"
                >
                  Salvar Palavra
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
