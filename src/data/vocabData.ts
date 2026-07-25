import { LearnedWord } from '../types';

export const INITIAL_LEARNED_WORDS: LearnedWord[] = [
  // Italian words with IPA
  {
    id: 'it-1',
    language: 'IT',
    word: 'Piacere',
    ipa: '/pjaˈtʃe.re/',
    translation: 'Prazer / Muito prazer',
    example: 'Piacere di conoscerti, mi chiamo Marco.',
    category: 'expressao',
    dateAdded: '2026-07-20',
    mastered: true
  },
  {
    id: 'it-2',
    language: 'IT',
    word: 'Sviluppare',
    ipa: '/zvilupˈpa.re/',
    translation: 'Desenvolver',
    example: 'Vogliamo sviluppare un nuovo progetto professionale.',
    category: 'verbo',
    dateAdded: '2026-07-21',
    mastered: false
  },
  {
    id: 'it-3',
    language: 'IT',
    word: 'Grazie mille',
    ipa: '/ˈɡrat.tsje ˈmil.le/',
    translation: 'Muito obrigado(a)',
    example: 'Grazie mille per il tuo aiuto prezioso.',
    category: 'expressao',
    dateAdded: '2026-07-22',
    mastered: true
  },
  {
    id: 'it-4',
    language: 'IT',
    word: 'Insieme',
    ipa: '/inˈsjɛ.me/',
    translation: 'Juntos / Em conjunto',
    example: 'Possiamo studiare italiano insieme ogni sera.',
    category: 'substantivo',
    dateAdded: '2026-07-23',
    mastered: false
  },
  {
    id: 'it-5',
    language: 'IT',
    word: 'Capire',
    ipa: '/kaˈpi.re/',
    translation: 'Entender / Compreender',
    example: 'Riesco a capire bene quando parli lentamente.',
    category: 'verbo',
    dateAdded: '2026-07-24',
    mastered: true
  },

  // French words with IPA
  {
    id: 'fr-1',
    language: 'FR',
    word: 'Écouter',
    ipa: '/e.ku.te/',
    translation: 'Escutar / Ouvir',
    example: 'J\'aime écouter des podcasts en français tous les matins.',
    category: 'verbo',
    dateAdded: '2026-07-18',
    mastered: true
  },
  {
    id: 'fr-2',
    language: 'FR',
    word: 'Bienvenue',
    ipa: '/bjɛ̃.və.ny/',
    translation: 'Bem-vindo(a)',
    example: 'Soyez la bienvenue dans notre équipe de recherche.',
    category: 'expressao',
    dateAdded: '2026-07-19',
    mastered: true
  },
  {
    id: 'fr-3',
    language: 'FR',
    word: 'Réseau',
    ipa: '/ʁe.zo/',
    translation: 'Rede / Networking',
    example: 'Le réseau professionnel facilite le recrutement.',
    category: 'substantivo',
    dateAdded: '2026-07-21',
    mastered: false
  },
  {
    id: 'fr-4',
    language: 'FR',
    word: 'Opportunité',
    ipa: '/ɔ.pɔʁ.ty.ni.te/',
    translation: 'Oportunidade',
    example: 'Cette réunion est une opportunité formidable.',
    category: 'substantivo',
    dateAdded: '2026-07-22',
    mastered: false
  },
  {
    id: 'fr-5',
    language: 'FR',
    word: 'Incontournable',
    ipa: '/ɛ̃.kɔ̃.tuʁ.nabl/',
    translation: 'Indispensável / Imperdível',
    example: 'C\'est un événement incontournable pour les étudiants.',
    category: 'adjetivo',
    dateAdded: '2026-07-24',
    mastered: true
  },

  // Spanish words with IPA
  {
    id: 'es-1',
    language: 'ES',
    word: 'Desarrollo',
    ipa: '/desaˈroʝo/',
    translation: 'Desenvolvimento',
    example: 'El desarrollo sostenible es prioritario para la empresa.',
    category: 'substantivo',
    dateAdded: '2026-07-15',
    mastered: true
  },
  {
    id: 'es-2',
    language: 'ES',
    word: 'Hablar',
    ipa: '/aˈblaɾ/',
    translation: 'Falar',
    example: 'Me gusta hablar español con hablantes nativos.',
    category: 'verbo',
    dateAdded: '2026-07-17',
    mastered: true
  },
  {
    id: 'es-3',
    language: 'ES',
    word: 'Éxito',
    ipa: '/ˈeksi.to/',
    translation: 'Sucesso',
    example: 'La presentación comercial fue un verdadero éxito.',
    category: 'substantivo',
    dateAdded: '2026-07-20',
    mastered: false
  },
  {
    id: 'es-4',
    language: 'ES',
    word: 'Oportunidad',
    ipa: '/opoɾtuniˈðað/',
    translation: 'Oportunidade',
    example: 'No dejes pasar esta gran oportunidad de aprendizaje.',
    category: 'substantivo',
    dateAdded: '2026-07-22',
    mastered: false
  },
  {
    id: 'es-5',
    language: 'ES',
    word: 'Conocimiento',
    ipa: '/konosiˈmjento/',
    translation: 'Conhecimento',
    example: 'El conocimiento de idiomas abre puertas internacionales.',
    category: 'substantivo',
    dateAdded: '2026-07-23',
    mastered: true
  },

  // English words with IPA
  {
    id: 'en-1',
    language: 'EN',
    word: 'Decentralized',
    ipa: '/dɪˈsɛntrəlaɪzd/',
    translation: 'Descentralizado',
    example: 'A decentralized leadership model fosters agility and initiative.',
    category: 'adjetivo',
    dateAdded: '2026-07-10',
    mastered: true
  },
  {
    id: 'en-2',
    language: 'EN',
    word: 'Facilitator',
    ipa: '/fəˈsɪlɪteɪtər/',
    translation: 'Facilitador / Mediador',
    example: 'She acted as a strategic facilitator during corporate negotiations.',
    category: 'substantivo',
    dateAdded: '2026-07-12',
    mastered: true
  },
  {
    id: 'en-3',
    language: 'EN',
    word: 'Fluency',
    ipa: '/ˈfluːənsi/',
    translation: 'Fluência',
    example: 'Consistent daily practice leads directly to conversational fluency.',
    category: 'substantivo',
    dateAdded: '2026-07-14',
    mastered: true
  },
  {
    id: 'en-4',
    language: 'EN',
    word: 'Breakthrough',
    ipa: '/ˈbreɪkθruː/',
    translation: 'Avanço / Descoberta importante',
    example: 'This new study routine led to a major linguistic breakthrough.',
    category: 'substantivo',
    dateAdded: '2026-07-19',
    mastered: false
  },
  {
    id: 'en-5',
    language: 'EN',
    word: 'Empowerment',
    ipa: '/ɪmˈpaʊərmənt/',
    translation: 'Empoderamento / Autonomia',
    example: 'Team empowerment results in higher workplace satisfaction.',
    category: 'substantivo',
    dateAdded: '2026-07-21',
    mastered: false
  }
];
