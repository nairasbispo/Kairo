import React, { useState } from 'react';
import { askAILanguageCoach } from '../services/geminiService';

interface GeminiModalProps {
  isOpen: boolean;
  onClose: () => void;
  targetLanguage?: string;
}

export const GeminiModal: React.FC<GeminiModalProps> = ({
  isOpen,
  onClose,
  targetLanguage = 'Inglês'
}) => {
  const [question, setQuestion] = useState<string>('');
  const [answer, setAnswer] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  if (!isOpen) return null;

  const handleAsk = async () => {
    if (!question.trim() || loading) return;
    setLoading(true);
    setAnswer('');
    const res = await askAILanguageCoach(question, targetLanguage);
    setAnswer(res);
    setLoading(false);
  };

  return (
    <div className="fixed inset-0 bg-[#1e1b18]/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-[#fff8f5] rounded-3xl p-6 sm:p-8 max-w-lg w-full border border-[#dcc1ba] shadow-2xl space-y-4 animate-fade-in relative">
        <div className="flex justify-between items-center border-b border-[#efe6e2] pb-3">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[20px] text-[#9a4029]">auto_awesome</span>
            <span className="font-serif font-bold text-lg text-[#1e1b18]">Tutor AI Kairo</span>
          </div>
          <button onClick={onClose} className="text-[#89726c] hover:text-[#1e1b18]">
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>

        <p className="text-xs text-[#56423d]">
          Pergunte sobre gramática, regras gramaticais ou solicite frases de exemplo para {targetLanguage}.
        </p>

        <textarea
          rows={3}
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          placeholder="Ex: Qual a diferença entre 'make' e 'do' no ambiente corporativo?"
          className="w-full p-3 rounded-xl bg-[#f5ece7] border border-[#dcc1ba] text-xs text-[#1e1b18] outline-none focus:border-[#9a4029] resize-none"
        />

        <div className="flex justify-end">
          <button
            onClick={handleAsk}
            disabled={loading}
            className="px-6 py-2.5 bg-[#9a4029] text-white rounded-xl text-xs font-semibold uppercase tracking-wider hover:bg-[#b9583e] transition-colors flex items-center gap-2"
          >
            {loading ? 'Analisando...' : 'Perguntar ao Tutor'}
          </button>
        </div>

        {answer && (
          <div className="p-4 rounded-xl bg-[#f5ece7] border border-[#dcc1ba]/60 space-y-2 text-xs text-[#1e1b18] leading-relaxed max-h-48 overflow-y-auto">
            <span className="font-bold text-[#9a4029] block uppercase text-[10px]">Resposta Kairo AI:</span>
            <p>{answer}</p>
          </div>
        )}
      </div>
    </div>
  );
};
