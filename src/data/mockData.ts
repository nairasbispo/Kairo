import { DaySchedule, LanguageProgress, SkillPriority } from '../types';
import { ALL_DIAGNOSTIC_QUESTIONS } from './diagnosticQuestions';

export { ALL_DIAGNOSTIC_QUESTIONS };

export const INITIAL_SKILL_PRIORITIES: SkillPriority[] = [
  {
    id: 'speaking',
    label: 'Speaking (Fala)',
    description: 'Produção oral espontânea, pronúncia e fluência conversacional.',
    priority: 1,
    icon: 'record_voice_over'
  },
  {
    id: 'listening',
    label: 'Listening (Escuta)',
    description: 'Compreensão auditiva em tempo real, nuances e sotaques.',
    priority: 2,
    icon: 'headphones'
  },
  {
    id: 'reading',
    label: 'Reading (Leitura)',
    description: 'Absorção de vocabulário, estrutura sintática e interpretação textual.',
    priority: 3,
    icon: 'menu_book'
  },
  {
    id: 'writing',
    label: 'Writing (Escrita)',
    description: 'Articulação formal de ideias, gramática aplicada e redação estruturada.',
    priority: 4,
    icon: 'edit_note'
  }
];

export const LANGUAGES_DATA: LanguageProgress[] = [
  {
    id: 'EN',
    name: 'Inglês',
    code: 'EN',
    level: 'Nível B1',
    fluencyPercent: 62,
    tag: 'ESTADOS UNIDOS',
    recommendedFocus: 'Conversação Profissional',
    hoursStudied: 12.5
  },
  {
    id: 'FR',
    name: 'Francês',
    code: 'FR',
    level: 'Nível A2',
    fluencyPercent: 45,
    tag: 'TODOS OS NÍVEIS',
    recommendedFocus: 'Compreensão Auditiva',
    hoursStudied: 6.2
  },
  {
    id: 'ES',
    name: 'Espanhol',
    code: 'ES',
    level: 'Nível A1',
    fluencyPercent: 20,
    tag: 'IMERSÃO TOTAL',
    recommendedFocus: 'Vocabulário do Dia a Dia',
    hoursStudied: 3.5
  },
  {
    id: 'IT',
    name: 'Italiano',
    code: 'IT',
    level: 'Iniciante (A1)',
    fluencyPercent: 12,
    tag: 'ARTE & CULTURA',
    recommendedFocus: 'Bases Gramaticais & IPA',
    hoursStudied: 2.1
  }
];

export const DIAGNOSTIC_QUESTIONS = ALL_DIAGNOSTIC_QUESTIONS.EN;

export const INITIAL_CUSTOM_SCHEDULE: DaySchedule[] = [
  {
    dayName: 'Segunda-feira',
    dayCode: 'M',
    active: true,
    tasks: [
      { id: 't1', title: 'Compreensão Auditiva (Podcast)', durationMinutes: 20, language: 'EN', skill: 'listening', completed: true },
      { id: 't2', title: 'Vocabulário IPA & Fonética', durationMinutes: 15, language: 'EN', skill: 'reading', completed: false },
      { id: 't3', title: 'Conversação com Tutor IA', durationMinutes: 10, language: 'EN', skill: 'speaking', completed: false }
    ]
  },
  {
    dayName: 'Terça-feira',
    dayCode: 'T',
    active: true,
    tasks: [
      { id: 't4', title: 'Escuta Ativa & Transcrição', durationMinutes: 25, language: 'FR', skill: 'listening', completed: false },
      { id: 't5', title: 'Repositório de Vocabulário Francês', durationMinutes: 15, language: 'FR', skill: 'reading', completed: false }
    ]
  },
  {
    dayName: 'Quarta-feira',
    dayCode: 'W',
    active: true,
    tasks: [
      { id: 't6', title: 'Leitura Contextual de Artigos', durationMinutes: 20, language: 'ES', skill: 'reading', completed: false },
      { id: 't7', title: 'Prática de Fala & Pronúncia', durationMinutes: 15, language: 'ES', skill: 'speaking', completed: false }
    ]
  },
  {
    dayName: 'Quinta-feira',
    dayCode: 'T',
    active: true,
    tasks: [
      { id: 't8', title: 'Gramática & Verbos Italianos', durationMinutes: 20, language: 'IT', skill: 'writing', completed: false },
      { id: 't9', title: 'Pronúncia IPA de Italiano', durationMinutes: 15, language: 'IT', skill: 'speaking', completed: false }
    ]
  },
  {
    dayName: 'Sexta-feira',
    dayCode: 'F',
    active: true,
    tasks: [
      { id: 't10', title: 'Simulação de Conversa de Negócios', durationMinutes: 30, language: 'EN', skill: 'speaking', completed: false },
      { id: 't11', title: 'Redação Estruturada', durationMinutes: 15, language: 'EN', skill: 'writing', completed: false }
    ]
  },
  {
    dayName: 'Sábado',
    dayCode: 'S',
    active: false,
    tasks: [
      { id: 't12', title: 'Revisão Geral de Vocabulário Aprendido', durationMinutes: 20, language: 'FR', skill: 'reading', completed: false }
    ]
  },
  {
    dayName: 'Domingo',
    dayCode: 'S',
    active: false,
    tasks: [
      { id: 't13', title: 'Leitura Leve & Cultura', durationMinutes: 15, language: 'IT', skill: 'reading', completed: false }
    ]
  }
];

export const MOCK_PODCAST_LESSONS = [
  {
    id: 'pod-1',
    title: 'Podcast: Business English Episode #12',
    durationMinutes: 15,
    language: 'EN',
    audioUrl: 'https://cdn.pixabay.com/download/audio/2022/05/27/audio_1808fbf07a.mp3',
    transcript: [
      { time: '0:05', speaker: 'Host', text: 'Welcome back to Business English Focus. Today we examine decentralized decision-making.' },
      { time: '0:22', speaker: 'Guest', text: 'Thank you. The key is empowering middle management to act as facilitators.' },
      { time: '0:45', speaker: 'Host', text: 'Exactly. When teams have autonomy, innovation speeds up dramatically.' }
    ]
  },
  {
    id: 'pod-2',
    title: 'Podcast: Journal Français des Affaires #08',
    durationMinutes: 15,
    language: 'FR',
    audioUrl: 'https://cdn.pixabay.com/download/audio/2022/05/27/audio_1808fbf07a.mp3',
    transcript: [
      { time: '0:05', speaker: 'Animateur', text: 'Bienvenue dans notre épisode sur la communication en entreprise.' },
      { time: '0:18', speaker: 'Invité', text: 'Aujourd\'hui nous parlons d\'écoute active et de prononciation claire.' }
    ]
  },
  {
    id: 'pod-3',
    title: 'Podcast: Lengua y Negocios en Español #04',
    durationMinutes: 15,
    language: 'ES',
    audioUrl: 'https://cdn.pixabay.com/download/audio/2022/05/27/audio_1808fbf07a.mp3',
    transcript: [
      { time: '0:05', speaker: 'Locutor', text: 'Bienvenidos a nuestro episodio sobre el desarrollo profesional y vocabulario.' },
      { time: '0:20', speaker: 'Invitado', text: 'Es fundamental dominar la pronunciación y la fonética para comunicar con éxito.' }
    ]
  },
  {
    id: 'pod-4',
    title: 'Podcast: Cultura e Lingua Italiana #02',
    durationMinutes: 15,
    language: 'IT',
    audioUrl: 'https://cdn.pixabay.com/download/audio/2022/05/27/audio_1808fbf07a.mp3',
    transcript: [
      { time: '0:05', speaker: 'Presenter', text: 'Benvenuti al nostro programma dedicato alla lingua italiana e alla pronuncia.' },
      { time: '0:20', speaker: 'Ospite', text: 'Oggi esploriamo le espressioni idiomatiche più utilizzate nel quotidiano.' }
    ]
  }
];

