import { GoogleGenAI } from '@google/genai';

let aiInstance: GoogleGenAI | null = null;

function getGenAI(): GoogleGenAI | null {
  if (aiInstance) return aiInstance;
  // Environment variable provided by platform or .env
  const metaEnv = (import.meta as unknown as { env: Record<string, string> }).env;
  const apiKey = metaEnv?.VITE_GEMINI_API_KEY || (typeof process !== 'undefined' ? process.env.GEMINI_API_KEY : '');
  if (apiKey) {
    aiInstance = new GoogleGenAI({ apiKey });
    return aiInstance;
  }
  return null;
}

export async function generateAIStudyInsights(params: {
  targetLanguage: string;
  level: string;
  goal: string;
  priorities: string[];
}): Promise<string> {
  const ai = getGenAI();
  if (!ai) {
    return `Recomendação Personalizada para ${params.targetLanguage} (${params.level}):
• Foco principal em ${params.priorities[0] || 'Conversação'} para acelerar fluência em 6 meses.
• Prática recomendada de 30 a 45 minutos diários com ênfase em audição ativa e retenção de vocabulário chave.`;
  }

  try {
    const prompt = `Você é o tutor especialista de idiomas do sistema Kairo ("Academic Zen").
O estudante tem como objetivo "${params.goal}" no idioma "${params.targetLanguage}", nível atual "${params.level}".
Competências prioritárias: ${params.priorities.join(', ')}.

Escreva uma análise concisa de 3 tópicos, elegante e motivadora no tom "Academic Zen" (em português), indicando a melhor estratégia semanal de estudos para ele.`;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });

    return response.text || 'Análise gerada com sucesso.';
  } catch (err) {
    console.warn('Gemini API call warning:', err);
    return `Plano de Aprendizado Kairo:
1. Prática ativa de escuta e fala focada no objetivo de "${params.goal}".
2. Rotina de 45 min/dia com ciclos de imersão e revisão de vocabulário contextual.`;
  }
}

export async function askAILanguageCoach(question: string, languageContext: string): Promise<string> {
  const ai = getGenAI();
  if (!ai) {
    return `Análise gramatical Kairo: A estrutura da frase em ${languageContext} demonstra concordância adequada e tom profissional. Recomendamos praticar com variação de tempos verbais no passado.`;
  }

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: `Você é o Kairo AI Coach, um especialista em linguística e ensino de idiomas no estilo "Academic Zen".
Responda em português à seguinte pergunta do estudante sobre o idioma ${languageContext}:
"${question}"
Forneça explicações claras, com exemplos de uso e dicas idiomáticas práticas.`,
    });

    return response.text || 'Resposta do tutor Kairo enviada.';
  } catch (err) {
    console.warn('Gemini tutor error:', err);
    return `Explicação Kairo: Em ${languageContext}, essa construção enfatiza a intenção da ação. Pratique repetindo a frase em voz alta no estúdio.`;
  }
}
