import { DiagnosticQuestion } from '../types';

// 20 Questions for Italian (IT)
export const ITALIAN_QUESTIONS: DiagnosticQuestion[] = [
  {
    id: 101,
    language: 'IT',
    module: 'MÓDULO 1 • VOCABULÁRIO ESSENCIAL',
    questionNumber: 1,
    totalQuestions: 20,
    skillCategory: 'reading',
    levelTarget: 'A1',
    questionText: 'Qual è il significato della parola "Piacere"?',
    options: [
      { id: 'a', text: 'Prazer / Muito prazer', isCorrect: true, explanation: 'Correto! "Piacere" é usado ao se apresentar a alguém ("Prazer em conhecê-lo").' },
      { id: 'b', text: 'Por favor', isCorrect: false, explanation: 'Incorreto. "Por favor" em italiano é "Per favore".' },
      { id: 'c', text: 'Obrigado', isCorrect: false, explanation: 'Incorreto. "Obrigado" em italiano é "Grazie".' },
      { id: 'd', text: 'De nada', isCorrect: false, explanation: 'Incorreto. "De nada" em italiano é "Prego".' }
    ]
  },
  {
    id: 102,
    language: 'IT',
    module: 'MÓDULO 1 • VERBOS NO PRESENTE',
    questionNumber: 2,
    totalQuestions: 20,
    skillCategory: 'writing',
    levelTarget: 'A1',
    questionText: 'Completa la frase: "Io _____ italiano tutti i giorni."',
    options: [
      { id: 'a', text: 'studiate', isCorrect: false, explanation: 'Incorreto. "Studiate" é a conjugação para "voi" (vós).' },
      { id: 'b', text: 'studio', isCorrect: true, explanation: 'Exato! Para a primeira pessoa "Io", o verbo regolare estudiar termina em -o ("studio").' },
      { id: 'c', text: 'studia', isCorrect: false, explanation: 'Incorreto. "Studia" é para "lui/lei" (ele/ela).' },
      { id: 'd', text: 'studiamo', isCorrect: false, explanation: 'Incorreto. "Studiamo" é para "noi" (nós).' }
    ]
  },
  {
    id: 103,
    language: 'IT',
    module: 'MÓDULO 1 • COMPREENSÃO AUDITIVA E SAUDAÇÕES',
    questionNumber: 3,
    totalQuestions: 20,
    skillCategory: 'listening',
    levelTarget: 'A1',
    questionText: 'Quale espressione si usa per dire "Boa noite" quando ci si congeda (ao se despedir à noite)?',
    options: [
      { id: 'a', text: 'Buongiorno', isCorrect: false, explanation: 'Incorreto. "Buongiorno" significa Bom dia.' },
      { id: 'b', text: 'Buonasera', isCorrect: false, explanation: 'Incorreto. "Buonasera" é a saudação ao chegar à noite.' },
      { id: 'c', text: 'Buonanotte', isCorrect: true, explanation: 'Correto! "Buonanotte" é usado exclusivamente na despedida à noite ou antes de dormir.' },
      { id: 'd', text: 'Arrivederci', isCorrect: false, explanation: 'Incorreto. "Arrivederci" significa Até logo, mas não é especificamente "Boa noite".' }
    ]
  },
  {
    id: 104,
    language: 'IT',
    module: 'MÓDULO 2 • ARTIGOS E SUBSTANTIVOS',
    questionNumber: 4,
    totalQuestions: 20,
    skillCategory: 'reading',
    levelTarget: 'A1',
    questionText: 'Qual è l\'articolo determinativo corretto per la parola "studente"?',
    options: [
      { id: 'a', text: 'il', isCorrect: false, explanation: 'Incorreto. "il" é usado antes de consoantes simples (ex: il libro).' },
      { id: 'b', text: 'lo', isCorrect: true, explanation: 'Perfetto! Usa-se "lo" antes de substantivos masculinos iniciados por "s + consoante" (lo studente).' },
      { id: 'c', text: 'la', isCorrect: false, explanation: 'Incorreto. "la" é feminino.' },
      { id: 'd', text: 'un', isCorrect: false, explanation: 'Incorreto. "un" é artigo indeterminativo.' }
    ]
  },
  {
    id: 105,
    language: 'IT',
    module: 'MÓDULO 2 • VERBOS ESSENCIAIS (ESSERE / AVERE)',
    questionNumber: 5,
    totalQuestions: 20,
    skillCategory: 'writing',
    levelTarget: 'A2',
    questionText: 'Scegli la forma corretta del verbo essere: "Noi _____ felici di conoscerti."',
    options: [
      { id: 'a', text: 'siamo', isCorrect: true, explanation: 'Correto! "Noi siamo" = Nós somos/estamos.' },
      { id: 'b', text: 'sono', isCorrect: false, explanation: 'Incorreto. "sono" é para "io" ou "loro".' },
      { id: 'c', text: 'siete', isCorrect: false, explanation: 'Incorreto. "siete" é para "voi".' },
      { id: 'd', text: 'è', isCorrect: false, explanation: 'Incorreto. "è" é para "lui/lei".' }
    ]
  },
  {
    id: 106,
    language: 'IT',
    module: 'MÓDULO 2 • RESTAURANTE E CULTURA',
    questionNumber: 6,
    totalQuestions: 20,
    skillCategory: 'speaking',
    levelTarget: 'A2',
    questionText: 'Come si chiede il conto in un ristorante italiano in modo cortese?',
    options: [
      { id: 'a', text: 'Il conto, per favore.', isCorrect: true, explanation: 'Exato! É a forma natural e educada de pedir a conta.' },
      { id: 'b', text: 'Dammi i soldi ora.', isCorrect: false, explanation: 'Incorreto e deselegante.' },
      { id: 'c', text: 'Quanto costa la pizza?', isCorrect: false, explanation: 'Incorreto. Pergunta o preço da pizza, não a conta total.' },
      { id: 'd', text: 'Vorrei un altro piatto.', isCorrect: false, explanation: 'Incorreto. Pede outro prato.' }
    ]
  },
  {
    id: 107,
    language: 'IT',
    module: 'MÓDULO 3 • PASSATO PROSSIMO (PASSADO)',
    questionNumber: 7,
    totalQuestions: 20,
    skillCategory: 'reading',
    levelTarget: 'A2',
    questionText: 'Completa: "Ieri Marco _____ a Roma in treno."',
    options: [
      { id: 'a', text: 'ha andato', isCorrect: false, explanation: 'Incorreto. O verbo "andare" exige o auxiliar essere (è andato).' },
      { id: 'b', text: 'è andato', isCorrect: true, explanation: 'Correto! Verbos de movimento usam o auxiliar essere e concordam em gênero/número.' },
      { id: 'c', text: 'va', isCorrect: false, explanation: 'Incorreto. "va" está no presente.' },
      { id: 'd', text: 'è andata', isCorrect: false, explanation: 'Incorreto. "andata" é feminino, e Marco é masculino.' }
    ]
  },
  {
    id: 108,
    language: 'IT',
    module: 'MÓDULO 3 • PRONOMES DIRETOS',
    questionNumber: 8,
    totalQuestions: 20,
    skillCategory: 'writing',
    levelTarget: 'B1',
    questionText: 'Sostituisci la parola tra parentesi: "Conosci quella ragazza? Sì, _____ conosco."',
    options: [
      { id: 'a', text: 'la', isCorrect: true, explanation: 'Correto! "la" substitui um objeto direto feminino singular (quella ragazza).' },
      { id: 'b', text: 'lo', isCorrect: false, explanation: 'Incorreto. "lo" é masculino singular.' },
      { id: 'c', text: 'li', isCorrect: false, explanation: 'Incorreto. "li" é masculino plural.' },
      { id: 'd', text: 'le', isCorrect: false, explanation: 'Incorreto. "le" é direto plural feminino ou indireto.' }
    ]
  },
  {
    id: 109,
    language: 'IT',
    module: 'MÓDULO 3 • VOCABULÁRIO DE VIAGEM',
    questionNumber: 9,
    totalQuestions: 20,
    skillCategory: 'listening',
    levelTarget: 'B1',
    questionText: 'Che cosa significa l\'espressione "In bocca al lupo"?',
    options: [
      { id: 'a', text: 'Boa sorte! (Expressão de desejo de sucesso)', isCorrect: true, explanation: 'Correto! A resposta tradicional a essa expressão é "Crepi il lupo!".' },
      { id: 'b', text: 'Cuidado com os animais', isCorrect: false, explanation: 'Incorreto.' },
      { id: 'c', text: 'Tenha bom apetite', isCorrect: false, explanation: 'Incorreto. Bom apetite é "Buon appetito".' },
      { id: 'd', text: 'Até amanhã cedo', isCorrect: false, explanation: 'Incorreto.' }
    ]
  },
  {
    id: 110,
    language: 'IT',
    module: 'MÓDULO 4 • FUTURO SEMPLICE',
    questionNumber: 10,
    totalQuestions: 20,
    skillCategory: 'writing',
    levelTarget: 'B1',
    questionText: 'Qual è la forma corretta del futuro per "partire" (io)?',
    options: [
      { id: 'a', text: 'partirò', isCorrect: true, explanation: 'Exato! A terminação de futuro para "io" é -ò (partirò).' },
      { id: 'b', text: 'partirai', isCorrect: false, explanation: 'Incorreto. "partirai" é para "tu".' },
      { id: 'c', text: 'partirà', isCorrect: false, explanation: 'Incorreto. "partirà" é para "lui/lei".' },
      { id: 'd', text: 'partiremo', isCorrect: false, explanation: 'Incorreto. "partiremo" é para "noi".' }
    ]
  },
  {
    id: 111,
    language: 'IT',
    module: 'MÓDULO 4 • CONDITIONAL SIMPLE',
    questionNumber: 11,
    totalQuestions: 20,
    skillCategory: 'speaking',
    levelTarget: 'B1',
    questionText: 'Come si dice cortesemente "Eu gostaria de um café" in italiano?',
    options: [
      { id: 'a', text: 'Vorrei un caffè, per favore.', isCorrect: true, explanation: 'Correto! "Vorrei" é o condicional de volere para pedidos corteses.' },
      { id: 'b', text: 'Voglio un caffè ora.', isCorrect: false, explanation: 'Incorreto. É direto demais (impositivo).' },
      { id: 'c', text: 'Ho voluto un caffè.', isCorrect: false, explanation: 'Incorreto. Está no passado.' },
      { id: 'd', text: 'Bevo caffè sempre.', isCorrect: false, explanation: 'Incorreto. Significa "bebo café sempre".' }
    ]
  },
  {
    id: 112,
    language: 'IT',
    module: 'MÓDULO 4 • INTERPRETAÇÃO DE TEXTO CULTURA',
    questionNumber: 12,
    totalQuestions: 20,
    skillCategory: 'reading',
    levelTarget: 'B2',
    passage: `"Il Rinascimento italiano ha segnato una svolta epocale nella storia dell'arte e del pensiero umano. Centri come Firenze, Venezia e Roma sono diventati fari culturali capaci di attrarre artisti, filosofi e scienziati da tutto il continente."`,
    questionText: 'Secondo il testo, qual è stato l\'impatto del Rinascimento italiano?',
    options: [
      { id: 'a', text: 'Ha trasformato città italiane in fari culturali d\'influenza europea.', isCorrect: true, explanation: 'Exato! Cidades como Florença e Roma atraíram mentes de todo o continente.' },
      { id: 'b', text: 'Ha ridotto l\'interesse per l\'arte e la filosofia.', isCorrect: false, explanation: 'Incorreto. O texto afirma o oposto.' },
      { id: 'c', text: 'Si è limitato esclusivamente alla città di Napoli.', isCorrect: false, explanation: 'Incorreto. Menciona Florença, Veneza e Roma.' },
      { id: 'd', text: 'Non ha avuto alcun rilievo fuori dall\'Italia.', isCorrect: false, explanation: 'Incorreto.' }
    ]
  },
  {
    id: 113,
    language: 'IT',
    module: 'MÓDULO 5 • CONGIUNTIVO PRESENTE',
    questionNumber: 13,
    totalQuestions: 20,
    skillCategory: 'reading',
    levelTarget: 'B2',
    questionText: 'Scegli la frase corretta con il congiuntivo: "Penso che Paolo _____ ragione."',
    options: [
      { id: 'a', text: 'abbia', isCorrect: true, explanation: 'Correto! O verbo pensare expressa opinião e exige o subjuntivo/congiuntivo (abbia).' },
      { id: 'b', text: 'ha', isCorrect: false, explanation: 'Incorreto. "ha" é indicativo.' },
      { id: 'c', text: 'avrà', isCorrect: false, explanation: 'Incorreto. "avrà" é futuro do indicativo.' },
      { id: 'd', text: 'avesse', isCorrect: false, explanation: 'Incorreto. "avesse" é o imperfeito do congiuntivo.' }
    ]
  },
  {
    id: 114,
    language: 'IT',
    module: 'MÓDULO 5 • PRONOME COMBINATO',
    questionNumber: 14,
    totalQuestions: 20,
    skillCategory: 'writing',
    levelTarget: 'B2',
    questionText: 'Sostituisci: "Spiego la lezione a te" -> "_____ spiego la lezione."',
    options: [
      { id: 'a', text: 'Te la', isCorrect: false, explanation: 'Incorreto. Te la seria "Spiego la lezione (f) a te", mas o pronome vem combinado como Te la se houver objeto direto ' },
      { id: 'b', text: 'Ti', isCorrect: true, explanation: 'Correto! "Ti spiego la lezione" (Explico-te a lição).' },
      { id: 'c', text: 'Gli', isCorrect: false, explanation: 'Incorreto. "Gli" é para a ele.' },
      { id: 'd', text: 'Le', isCorrect: false, explanation: 'Incorreto. "Le" é para a ela ou tratamento formal.' }
    ]
  },
  {
    id: 115,
    language: 'IT',
    module: 'MÓDULO 5 • EXPRESSÕES IDIOMÁTICAS',
    questionNumber: 15,
    totalQuestions: 20,
    skillCategory: 'speaking',
    levelTarget: 'B2',
    questionText: 'Cosa significa l\'espressione "Non avere peli sulla lingua"?',
    options: [
      { id: 'a', text: 'Parlare in modo schietto, franco e senza peli sulla lingua (sem rodeios).', isCorrect: true, explanation: 'Correto! Significa dizer a verdade abertamente sem medo.' },
      { id: 'b', text: 'Avere difficoltà a pronunciare le parole.', isCorrect: false, explanation: 'Incorreto.' },
      { id: 'c', text: 'Mangiare cibo piccante.', isCorrect: false, explanation: 'Incorreto.' },
      { id: 'd', text: 'Stare in silenzio assoluto.', isCorrect: false, explanation: 'Incorreto.' }
    ]
  },
  {
    id: 116,
    language: 'IT',
    module: 'MÓDULO 6 • CONCORDÂNCIA DO PASSATO PROSSIMO',
    questionNumber: 16,
    totalQuestions: 20,
    skillCategory: 'reading',
    levelTarget: 'C1',
    questionText: 'Completa: "Le mele che ho comprato? Le ho ____ All\'ortofrutta."',
    options: [
      { id: 'a', text: 'comprate', isCorrect: true, explanation: 'Correto! Quando há pronome direto antecedente "Le" (f.pl.), o particípio passado concorda (comprate).' },
      { id: 'b', text: 'comprato', isCorrect: false, explanation: 'Incorreto. Deve concordar com o pronome Le.' },
      { id: 'c', text: 'comprati', isCorrect: false, explanation: 'Incorreto. Comprati é masculino plural.' },
      { id: 'd', text: 'comprata', isCorrect: false, explanation: 'Incorreto. Comprata é feminino singular.' }
    ]
  },
  {
    id: 117,
    language: 'IT',
    module: 'MÓDULO 6 • PERIOD HIPOTHETICAL (PERÍODO HIPOTÉTICO)',
    questionNumber: 17,
    totalQuestions: 20,
    skillCategory: 'writing',
    levelTarget: 'C1',
    questionText: 'Se io (avere) _____ abbastanza tempo, (venire) _____ alla tua festa ieri sera.',
    options: [
      { id: 'a', text: 'avessi avuto / sarei venuto', isCorrect: true, explanation: 'Exato! Hipótese no passado irreal exige Congiuntivo Trapassato + Condizionale Composto.' },
      { id: 'b', text: 'ho / vengo', isCorrect: false, explanation: 'Incorreto. Refere-se a algo irreal do passado (ieri sera).' },
      { id: 'c', text: 'avessi / verrei', isCorrect: false, explanation: 'Incorreto. Seria para hipótese no presente.' },
      { id: 'd', text: 'avrò / verrò', isCorrect: false, explanation: 'Incorreto.' }
    ]
  },
  {
    id: 118,
    language: 'IT',
    module: 'MÓDULO 6 • GERÚNDIO E FORMA PASSIVA',
    questionNumber: 18,
    totalQuestions: 20,
    skillCategory: 'listening',
    levelTarget: 'C1',
    questionText: 'Quale frase contiene una forma passiva con il verbo "andare"?',
    options: [
      { id: 'a', text: 'Questa regola va applicata con rigorosa attenzione.', isCorrect: true, explanation: 'Correto! "Andare + particípio" expressa uma necessidade passiva (deve ser aplicada).' },
      { id: 'b', text: 'Vado al mercato ogni sabato mattina.', isCorrect: false, explanation: 'Incorreto. Uso normal do verbo ir.' },
      { id: 'c', text: 'Sono andato a lezione di storia.', isCorrect: false, explanation: 'Incorreto. Passato prossimo de movimento.' },
      { id: 'd', text: 'Andiamo a mangiare una pizza stasera.', isCorrect: false, explanation: 'Incorreto.' }
    ]
  },
  {
    id: 119,
    language: 'IT',
    module: 'MÓDULO 6 • SINTAXE AVANÇADA E REGÊNCIA',
    questionNumber: 19,
    totalQuestions: 20,
    skillCategory: 'reading',
    levelTarget: 'C1',
    questionText: 'Quale preposizione regge il verbo "rinunciare"?',
    options: [
      { id: 'a', text: 'a (Rinunciare a qualcosa)', isCorrect: true, explanation: 'Correto! Diz-se "Rinunciare a un\'opportunità / a qualcosa".' },
      { id: 'b', text: 'di', isCorrect: false, explanation: 'Incorreto.' },
      { id: 'c', text: 'da', isCorrect: false, explanation: 'Incorreto.' },
      { id: 'd', text: 'su', isCorrect: false, explanation: 'Incorreto.' }
    ]
  },
  {
    id: 120,
    language: 'IT',
    module: 'MÓDULO 6 • LINGUAGEM FORMAL E NEGÓCIOS',
    questionNumber: 20,
    totalQuestions: 20,
    skillCategory: 'speaking',
    levelTarget: 'C1',
    questionText: 'In un\'email formale di lavoro, come si conclude opportunamente la comunicazione?',
    options: [
      { id: 'a', text: 'Distinti saluti, / Cordiali saluti,', isCorrect: true, explanation: 'Exato! É a fórmula padrão e elegante para encerramento de e-mails corporativos formais.' },
      { id: 'b', text: 'Baci e abbracci!', isCorrect: false, explanation: 'Incorreto. Informal demais.' },
      { id: 'c', text: 'Ciao bello, ci vediamo!', isCorrect: false, explanation: 'Incorreto. Gíria informal.' },
      { id: 'd', text: 'A presto caro amigo.', isCorrect: false, explanation: 'Incorreto. Apenas para conhecidos.' }
    ]
  }
];

// 20 Questions for French (FR)
export const FRENCH_QUESTIONS: DiagnosticQuestion[] = [
  {
    id: 201,
    language: 'FR',
    module: 'MÓDULO 1 • SAUDAÇÕES E APRESENTAÇÃO',
    questionNumber: 1,
    totalQuestions: 20,
    skillCategory: 'reading',
    levelTarget: 'A1',
    questionText: 'Que signifie l\'expression "Enchanté(e)" en français?',
    options: [
      { id: 'a', text: 'Muito prazer em conhecê-lo(a)', isCorrect: true, explanation: 'Parfait! "Enchanté" é a expressão usada ao conhecer alguém.' },
      { id: 'b', text: 'Até amanhã', isCorrect: false, explanation: 'Incorreto. Até amanhã é "À demain".' },
      { id: 'c', text: 'Com licença', isCorrect: false, explanation: 'Incorreto. Com licença é "Excusez-moi".' },
      { id: 'd', text: 'Por favor', isCorrect: false, explanation: 'Incorreto. Por favor é "S\'il vous plaît".' }
    ]
  },
  {
    id: 202,
    language: 'FR',
    module: 'MÓDULO 1 • VERBOS NO PRESENTE (S\'APPELER)',
    questionNumber: 2,
    totalQuestions: 20,
    skillCategory: 'writing',
    levelTarget: 'A1',
    questionText: 'Complétez la phrase: "Je _____ Sophie, et vous?"',
    options: [
      { id: 'a', text: 'm\'appelle', isCorrect: true, explanation: 'Exact! "Je m\'appelle" significa "Eu me chamo".' },
      { id: 'b', text: 't\'appelles', isCorrect: false, explanation: 'Incorreto. "t\'appelles" é para "Tu".' },
      { id: 'c', text: 's\'appelle', isCorrect: false, explanation: 'Incorreto. "s\'appelle" é para "Il/Elle".' },
      { id: 'd', text: 'nous appelons', isCorrect: false, explanation: 'Incorreto. "nous appelons" é para "Nous".' }
    ]
  },
  {
    id: 203,
    language: 'FR',
    module: 'MÓDULO 1 • VERBOS FUNDAMENTAIS (ÊTRE / AVOIR)',
    questionNumber: 3,
    totalQuestions: 20,
    skillCategory: 'reading',
    levelTarget: 'A1',
    questionText: 'Quelle est la conjugaison correcte du verbe AVOIR avec "Nous"?',
    options: [
      { id: 'a', text: 'Nous avons', isCorrect: true, explanation: 'Bravo! "Nous avons" = Nós temos.' },
      { id: 'b', text: 'Nous sommes', isCorrect: false, explanation: 'Incorreto. "Nous sommes" é o verbo être (somos/estamos).' },
      { id: 'c', text: 'Nous avez', isCorrect: false, explanation: 'Incorreto. "Vous avez" é com vous.' },
      { id: 'd', text: 'Nous ont', isCorrect: false, explanation: 'Incorreto. "Ils/Elles ont" é na 3ª pessoa.' }
    ]
  },
  {
    id: 204,
    language: 'FR',
    module: 'MÓDULO 2 • ARTIGOS DEFINIDOS E INDEFINIDOS',
    questionNumber: 4,
    totalQuestions: 20,
    skillCategory: 'listening',
    levelTarget: 'A1',
    questionText: 'Choisissez l\'article correct pour le mot "étudiant":',
    options: [
      { id: 'a', text: 'l\'', isCorrect: true, explanation: 'Correto! Diante de vogais ou h mudo, le/la viram l\' (l\'étudiant).' },
      { id: 'b', text: 'le', isCorrect: false, explanation: 'Incorreto. Ocorre elisão por começar com vogal.' },
      { id: 'c', text: 'la', isCorrect: false, explanation: 'Incorreto.' },
      { id: 'd', text: 'les', isCorrect: false, explanation: 'Incorreto. "Les" é para o plural.' }
    ]
  },
  {
    id: 205,
    language: 'FR',
    module: 'MÓDULO 2 • NEGAÇÃO BÁSICA (NE... PAS)',
    questionNumber: 5,
    totalQuestions: 20,
    skillCategory: 'writing',
    levelTarget: 'A2',
    questionText: 'Transformez la phrase à la forme négative: "Il parle anglais."',
    options: [
      { id: 'a', text: 'Il ne parle pas anglais.', isCorrect: true, explanation: 'Correto! A negação padrão abraça o verbo conjugado: ne + verbo + pas.' },
      { id: 'b', text: 'Il parle pas ne anglais.', isCorrect: false, explanation: 'Incorreto. Posição incorreta.' },
      { id: 'c', text: 'Il pas parle anglais.', isCorrect: false, explanation: 'Incorreto.' },
      { id: 'd', text: 'Il non parle anglais.', isCorrect: false, explanation: 'Incorreto. "Non" não é usado como partícula verbal.' }
    ]
  },
  {
    id: 206,
    language: 'FR',
    module: 'MÓDULO 2 • COMPRA E RESTAURANTE',
    questionNumber: 6,
    totalQuestions: 20,
    skillCategory: 'speaking',
    levelTarget: 'A2',
    questionText: 'Comment commander poliment un café au croissant dans un café parisien?',
    options: [
      { id: 'a', text: 'Je voudrais un café et un croissant, s\'il vous plaît.', isCorrect: true, explanation: 'Excellente réponse! "Je voudrais" é o condicional cortês para fazer pedidos.' },
      { id: 'b', text: 'Donne-moi un café maintenant.', isCorrect: false, explanation: 'Incorreto e grosseiro.' },
      { id: 'c', text: 'Combien coûte la tour Eiffel?', isCorrect: false, explanation: 'Incorreto. Pergunta o preço do monumento.' },
      { id: 'd', text: 'J\'ai aimé le café hier.', isCorrect: false, explanation: 'Incorreto.' }
    ]
  },
  {
    id: 207,
    language: 'FR',
    module: 'MÓDULO 3 • PASSÉ COMPOSÉ AVEC AVOIR',
    questionNumber: 7,
    totalQuestions: 20,
    skillCategory: 'reading',
    levelTarget: 'A2',
    questionText: 'Complétez au passé composé: "Hier, nous _____ un excellent film."',
    options: [
      { id: 'a', text: 'avons regardé', isCorrect: true, explanation: 'Correto! Avoir (avons) + particípio passado do verbo -er (regardé).' },
      { id: 'b', text: 'sommes regardé', isCorrect: false, explanation: 'Incorreto. Regarder usa o auxiliar avoir.' },
      { id: 'c', text: 'regardons', isCorrect: false, explanation: 'Incorreto. Está no presente.' },
      { id: 'd', text: 'avez regardé', isCorrect: false, explanation: 'Incorreto. "Avez" é para vous.' }
    ]
  },
  {
    id: 208,
    language: 'FR',
    module: 'MÓDULO 3 • PASSÉ COMPOSÉ AVEC ÊTRE',
    questionNumber: 8,
    totalQuestions: 20,
    skillCategory: 'writing',
    levelTarget: 'A2',
    questionText: 'Choisissez la forme exacte: "Marie _____ à Paris le week-end dernier."',
    options: [
      { id: 'a', text: 'est allée', isCorrect: true, explanation: 'Bravo! Aller usa être (est) e o particípio concorda com o sujeito feminino (allée).' },
      { id: 'b', text: 'a allé', isCorrect: false, explanation: 'Incorreto. Aller exige o auxiliar être.' },
      { id: 'c', text: 'est allé', isCorrect: false, explanation: 'Incorreto. Falta a concordância feminina -e.' },
      { id: 'd', text: 'va', isCorrect: false, explanation: 'Incorreto. Está no presente.' }
    ]
  },
  {
    id: 209,
    language: 'FR',
    module: 'MÓDULO 3 • PRONOMES COD (OBJETO DIRETO)',
    questionNumber: 9,
    totalQuestions: 20,
    skillCategory: 'reading',
    levelTarget: 'B1',
    questionText: 'Remplacez le complément: "Tu connais cette chanson?" -> "Oui, je _____ connais."',
    options: [
      { id: 'a', text: 'la', isCorrect: true, explanation: 'Correto! "la" substitui um substantivo feminino singular (cette chanson).' },
      { id: 'b', text: 'le', isCorrect: false, explanation: 'Incorreto. "le" é masculino.' },
      { id: 'c', text: 'lui', isCorrect: false, explanation: 'Incorreto. "lui" é objeto indireto.' },
      { id: 'd', text: 'les', isCorrect: false, explanation: 'Incorreto. "les" é plural.' }
    ]
  },
  {
    id: 210,
    language: 'FR',
    module: 'MÓDULO 4 • FUTUR SIMPLE',
    questionNumber: 10,
    totalQuestions: 20,
    skillCategory: 'writing',
    levelTarget: 'B1',
    questionText: 'Quelle est la forme du futur simple pour "partir" (il)?',
    options: [
      { id: 'a', text: 'partira', isCorrect: true, explanation: 'Exato! A terminação de futur simple para il/elle é -a (partira).' },
      { id: 'b', text: 'partirai', isCorrect: false, explanation: 'Incorreto. "partirai" é para Je.' },
      { id: 'c', text: 'partiront', isCorrect: false, explanation: 'Incorreto. "partiront" é para ils/elles.' },
      { id: 'd', text: 'partirait', isCorrect: false, explanation: 'Incorreto. "partirait" é condicional.' }
    ]
  },
  {
    id: 211,
    language: 'FR',
    module: 'MÓDULO 4 • IMPARFAIT vs PASSÉ COMPOSÉ',
    questionNumber: 11,
    totalQuestions: 20,
    skillCategory: 'listening',
    levelTarget: 'B1',
    questionText: 'Complétez: "Pendant que je (dormir) _____, le téléphone a sonné."',
    options: [
      { id: 'a', text: 'dormais', isCorrect: true, explanation: 'Correto! A ação contínua de fundo usa o imparfait (dormais).' },
      { id: 'b', text: 'ai dormi', isCorrect: false, explanation: 'Incorreto. Passé composé seria uma ação pontual delimitada.' },
      { id: 'c', text: 'dors', isCorrect: false, explanation: 'Incorreto. "dors" está no presente.' },
      { id: 'd', text: 'dormira', isCorrect: false, explanation: 'Incorreto. Futuro.' }
    ]
  },
  {
    id: 212,
    language: 'FR',
    module: 'MÓDULO 4 • INTERPRETAÇÃO DE TEXTO CULTURAL',
    questionNumber: 12,
    totalQuestions: 20,
    skillCategory: 'reading',
    levelTarget: 'B2',
    passage: `"L'écoute active dans les négociations commerciales en France requiert non seulement la maîtrise du vocabulaire technique, mais aussi la compréhension des nuances implicites et du respect des règles d'étiquette professionnelle."`,
    questionText: 'Selon le texte, que nécessite la négociation commerciale en France?',
    options: [
      { id: 'a', text: 'Le vocabulaire technique ainsi que la maîtrise des nuances implicites et de l\'étiquette.', isCorrect: true, explanation: 'Exactement! Exige técnica e compreensão cultural implícita.' },
      { id: 'b', text: 'Uniquement la rapidité de réponse verbale.', isCorrect: false, explanation: 'Incorreto.' },
      { id: 'c', text: 'Ignorer la politesse formelle au profit du résultat.', isCorrect: false, explanation: 'Incorreto.' },
      { id: 'd', text: 'Parler sans pause ni réflexion.', isCorrect: false, explanation: 'Incorreto.' }
    ]
  },
  {
    id: 213,
    language: 'FR',
    module: 'MÓDULO 5 • SUBJONCTIF PRÉSENT',
    questionNumber: 13,
    totalQuestions: 20,
    skillCategory: 'writing',
    levelTarget: 'B2',
    questionText: 'Choisissez la forme correcte: "Il faut que tu _____ tes devoirs avant de sortir."',
    options: [
      { id: 'a', text: 'fasses', isCorrect: true, explanation: 'Bravo! "Il faut que" exige o subjuntivo do verbo faire (fasses).' },
      { id: 'b', text: 'fais', isCorrect: false, explanation: 'Incorreto. "fais" é indicativo.' },
      { id: 'c', text: 'fera', isCorrect: false, explanation: 'Incorreto. "fera" é futuro.' },
      { id: 'd', text: 'fasse', isCorrect: false, explanation: 'Incorreto. "fasse" é para il/elle/je.' }
    ]
  },
  {
    id: 214,
    language: 'FR',
    module: 'MÓDULO 5 • PRONOMES "EN" E "Y"',
    questionNumber: 14,
    totalQuestions: 20,
    skillCategory: 'reading',
    levelTarget: 'B2',
    questionText: 'Complétez: "Tu vas à la bibliothèque? Oui, j\'_____ vais maintenant."',
    options: [
      { id: 'a', text: 'y', isCorrect: true, explanation: 'Correto! "y" substitui um lugar introduzido pela preposição "à" (à la bibliothèque).' },
      { id: 'b', text: 'en', isCorrect: false, explanation: 'Incorreto. "en" substitui de + complemento.' },
      { id: 'c', text: 'le', isCorrect: false, explanation: 'Incorreto.' },
      { id: 'd', text: 'lui', isCorrect: false, explanation: 'Incorreto.' }
    ]
  },
  {
    id: 215,
    language: 'FR',
    module: 'MÓDULO 5 • EXPRESSÕES IDIOMÁTICAS',
    questionNumber: 15,
    totalQuestions: 20,
    skillCategory: 'speaking',
    levelTarget: 'B2',
    questionText: 'Que signifie l\'expression imagée "Avoir le coup de foudre"?',
    options: [
      { id: 'a', text: 'Tomber amoureux instantanément / Paixão à primeira vista.', isCorrect: true, explanation: 'Exato! Significa se apaixonar de repente.' },
      { id: 'b', text: 'Avoir peur de l\'orage.', isCorrect: false, explanation: 'Incorreto.' },
      { id: 'c', text: 'Être très en colère.', isCorrect: false, explanation: 'Incorreto.' },
      { id: 'd', text: 'Gagner un prix important.', isCorrect: false, explanation: 'Incorreto.' }
    ]
  },
  {
    id: 216,
    language: 'FR',
    module: 'MÓDULO 6 • CONDITIONNEL PASSÉ',
    questionNumber: 16,
    totalQuestions: 20,
    skillCategory: 'writing',
    levelTarget: 'C1',
    questionText: 'Si j\'avais su, je _____ plus tôt à la réunion.',
    options: [
      { id: 'a', text: 'serais venu', isCorrect: true, explanation: 'Correto! "Si + plus-que-parfait" exige o "conditionnel passé" na oração principal.' },
      { id: 'b', text: 'viendrais', isCorrect: false, explanation: 'Incorreto. É o condicional presente.' },
      { id: 'c', text: 'suis venu', isCorrect: false, explanation: 'Incorreto.' },
      { id: 'd', text: 'serai venu', isCorrect: false, explanation: 'Incorreto.' }
    ]
  },
  {
    id: 217,
    language: 'FR',
    module: 'MÓDULO 6 • CONCORDANCE DU PARTICIPE PASSÉ AVEC AVOIR',
    questionNumber: 17,
    totalQuestions: 20,
    skillCategory: 'reading',
    levelTarget: 'C1',
    questionText: 'Identifiez la phrase correctement accordée:',
    options: [
      { id: 'a', text: 'Les fleurs que j\'ai achetées sont magnifiques.', isCorrect: true, explanation: 'Correto! O objeto direto (que = les fleurs) antecede o verbo avoir, exigindo concordância em f.pl. (achetées).' },
      { id: 'b', text: 'Les fleurs que j\'ai acheté sont magnifiques.', isCorrect: false, explanation: 'Incorreto. Falta a concordância com o COD anteposto.' },
      { id: 'c', text: 'Les fleurs que j\'ai achetés sont magnifiques.', isCorrect: false, explanation: 'Incorreto. Achetés é m.pl.' },
      { id: 'd', text: 'Les fleurs que j\'ai achetée sont magnifiques.', isCorrect: false, explanation: 'Incorreto.' }
    ]
  },
  {
    id: 218,
    language: 'FR',
    module: 'MÓDULO 6 • CONJUNÇÕES COMPLEXAS',
    questionNumber: 18,
    totalQuestions: 20,
    skillCategory: 'listening',
    levelTarget: 'C1',
    questionText: 'Quelle locution exige l\'emploi du subjonctif?',
    options: [
      { id: 'a', text: 'Bien que (Embora)', isCorrect: true, explanation: 'Correto! "Bien que" é sempre seguido pelo subjonctif.' },
      { id: 'b', text: 'Parce que (Porque)', isCorrect: false, explanation: 'Incorreto. Parce que exige o indicativo.' },
      { id: 'c', text: 'Pendant que (Enquanto)', isCorrect: false, explanation: 'Incorreto. Exige o indicativo.' },
      { id: 'd', text: 'Après que (Depois que)', isCorrect: false, explanation: 'Incorreto. Historicamente exige indicativo.' }
    ]
  },
  {
    id: 219,
    language: 'FR',
    module: 'MÓDULO 6 • REGÊNCIA VERBAL E PREPOSIÇÕES',
    questionNumber: 19,
    totalQuestions: 20,
    skillCategory: 'writing',
    levelTarget: 'C1',
    questionText: 'Complétez: "Le directeur a décidé _____ reporter la conférence à la semaine prochaine."',
    options: [
      { id: 'a', text: 'de', isCorrect: true, explanation: 'Correto! O verbo "décider" rege a preposição "de" antes de infinitivo (décider de faire).' },
      { id: 'b', text: 'à', isCorrect: false, explanation: 'Incorreto.' },
      { id: 'c', text: 'pour', isCorrect: false, explanation: 'Incorreto.' },
      { id: 'd', text: 'par', isCorrect: false, explanation: 'Incorreto.' }
    ]
  },
  {
    id: 220,
    language: 'FR',
    module: 'MÓDULO 6 • CORRESPONDÊNCIA FORMAL',
    questionNumber: 20,
    totalQuestions: 20,
    skillCategory: 'speaking',
    levelTarget: 'C1',
    questionText: 'Quelle est la formule de politesse la plus adaptée pour conclure une lettre formelle administrative?',
    options: [
      { id: 'a', text: 'Veuillez agréer, Madame, Monsieur, l\'expression de mes salutations distinguées.', isCorrect: true, explanation: 'Excellence! É a fórmula clássica e refinada para correspondência formal.' },
      { id: 'b', text: 'Bisous et à plus tard!', isCorrect: false, explanation: 'Incorreto. Totalmente informal.' },
      { id: 'c', text: 'Amicalement vôtre, salut.', isCorrect: false, explanation: 'Incorreto.' },
      { id: 'd', text: 'On se rappelle demain.', isCorrect: false, explanation: 'Incorreto.' }
    ]
  }
];

// 20 Questions for Spanish (ES)
export const SPANISH_QUESTIONS: DiagnosticQuestion[] = [
  {
    id: 301,
    language: 'ES',
    module: 'MÓDULO 1 • SALUDOS Y PRESENTACIÓN',
    questionNumber: 1,
    totalQuestions: 20,
    skillCategory: 'reading',
    levelTarget: 'A1',
    questionText: '¿Qué significa la expresión "Mucho gusto" al conocer a alguien?',
    options: [
      { id: 'a', text: 'Muito prazer em conhecê-lo(a)', isCorrect: true, explanation: '¡Correcto! É a forma padrão de cortesia ao se apresentar.' },
      { id: 'b', text: 'Muito obrigado', isCorrect: false, explanation: 'Incorreto. Obrigado é "Muchas gracias".' },
      { id: 'c', text: 'Até amanhã', isCorrect: false, explanation: 'Incorreto. Até amanhã é "Hasta mañana".' },
      { id: 'd', text: 'Com licença', isCorrect: false, explanation: 'Incorreto. Com licença é "Con permiso".' }
    ]
  },
  {
    id: 302,
    language: 'ES',
    module: 'MÓDULO 1 • VERBOS SER Y ESTAR',
    questionNumber: 2,
    totalQuestions: 20,
    skillCategory: 'writing',
    levelTarget: 'A1',
    questionText: 'Completa con la forma correcta: "Nosotros _____ muy contentos con el curso."',
    options: [
      { id: 'a', text: 'estamos', isCorrect: true, explanation: '¡Excelente! Para estados temporários de ânimo (contentos), usa-se estar (estamos).' },
      { id: 'b', text: 'somos', isCorrect: false, explanation: 'Incorreto. "Somos" indicaria característica permanente.' },
      { id: 'c', text: 'están', isCorrect: false, explanation: 'Incorreto. "Están" é para ellos/ellas/ustedes.' },
      { id: 'd', text: 'soy', isCorrect: false, explanation: 'Incorreto.' }
    ]
  },
  {
    id: 303,
    language: 'ES',
    module: 'MÓDULO 1 • VOCABULÁRIO DE FAMÍLIA',
    questionNumber: 3,
    totalQuestions: 20,
    skillCategory: 'listening',
    levelTarget: 'A1',
    questionText: '¿Cómo se dice "avô" e "avó" en español?',
    options: [
      { id: 'a', text: 'Abuelo y abuela', isCorrect: true, explanation: '¡Muy bien! Abuelo / Abuela.' },
      { id: 'b', text: 'Tío y tía', isCorrect: false, explanation: 'Incorreto. Tío/Tía são tio e tia.' },
      { id: 'c', text: 'Sobrino y sobrina', isCorrect: false, explanation: 'Incorreto. Sobrinho/Sobrinha.' },
      { id: 'd', text: 'Primo y prima', isCorrect: false, explanation: 'Incorreto. Primo/Prima.' }
    ]
  },
  {
    id: 304,
    language: 'ES',
    module: 'MÓDULO 2 • ARTÍCULOS Y EL "LO" NEUTRO',
    questionNumber: 4,
    totalQuestions: 20,
    skillCategory: 'reading',
    levelTarget: 'A1',
    questionText: '¿Cuál es el artículo para palabras femeninas que empiezan con "a" tónica como "agua"?',
    options: [
      { id: 'a', text: 'el (el agua clara)', isCorrect: true, explanation: '¡Correcto! Evita-se a cacofonia usando "el" antes de palavras femininas no singular iniciadas por "a" ou "ha" tônicas.' },
      { id: 'b', text: 'la', isCorrect: false, explanation: 'Incorreto no singular devido à regra de cacofonia ("la agua" é eufonicamente evitado).' },
      { id: 'c', text: 'lo', isCorrect: false, explanation: 'Incorreto. "Lo" é o artigo neutro e nunca acompanha substantivos.' },
      { id: 'd', text: 'los', isCorrect: false, explanation: 'Incorreto.' }
    ]
  },
  {
    id: 305,
    language: 'ES',
    module: 'MÓDULO 2 • PRESENTE DE INDICATIVO (IRREGULARES)',
    questionNumber: 5,
    totalQuestions: 20,
    skillCategory: 'writing',
    levelTarget: 'A2',
    questionText: 'Conjuga el verbo "Tener" para la primera persona (Yo):',
    options: [
      { id: 'a', text: 'Tengo', isCorrect: true, explanation: '¡Exacto! "Yo tengo" é a forma irregular no presente.' },
      { id: 'b', text: 'Tienes', isCorrect: false, explanation: 'Incorreto. "Tienes" é para Tú.' },
      { id: 'c', text: 'Tiene', isCorrect: false, explanation: 'Incorreto. "Tiene" é para Él/Ella.' },
      { id: 'd', text: 'Tenemos', isCorrect: false, explanation: 'Incorreto.' }
    ]
  },
  {
    id: 306,
    language: 'ES',
    module: 'MÓDULO 2 • PEDIR COMIDA Y DIRECCIONES',
    questionNumber: 6,
    totalQuestions: 20,
    skillCategory: 'speaking',
    levelTarget: 'A2',
    questionText: '¿Cómo pides la cuenta educadamente en un restaurante en Madrid?',
    options: [
      { id: 'a', text: 'La cuenta, por favor.', isCorrect: true, explanation: '¡Perfecto! É a forma natural e cortês.' },
      { id: 'b', text: 'Dame el dinero rápido.', isCorrect: false, explanation: 'Incorreto e rude.' },
      { id: 'c', text: '¿Dónde está el baño?', isCorrect: false, explanation: 'Incorreto. Pergunta pela localização do banheiro.' },
      { id: 'd', text: 'Quiero pagar mañana.', isCorrect: false, explanation: 'Incorreto.' }
    ]
  },
  {
    id: 307,
    language: 'ES',
    module: 'MÓDULO 3 • PRETERITO PERFECTO COMPUESTO',
    questionNumber: 7,
    totalQuestions: 20,
    skillCategory: 'reading',
    levelTarget: 'A2',
    questionText: 'Completa: "Esta mañana yo _____ un café muy rico con tostadas."',
    options: [
      { id: 'a', text: 'he tomado', isCorrect: true, explanation: '¡Correcto! Para ações concluídas dentro de uma unidade de tempo ainda não encerrada (esta mañana), usa-se pretérito perfecto.' },
      { id: 'b', text: 'tomé', isCorrect: false, explanation: 'Incorreto na norma padrão com "esta mañana" (onde predomina o pretérito perfecto composto).' },
      { id: 'c', text: 'había tomado', isCorrect: false, explanation: 'Incorreto. É o pluscuamperfecto.' },
      { id: 'd', text: 'tomo', isCorrect: false, explanation: 'Incorreto. Presente.' }
    ]
  },
  {
    id: 308,
    language: 'ES',
    module: 'MÓDULO 3 • PRETERITO INDEFINIDO (PASSADO SIMPLES)',
    questionNumber: 8,
    totalQuestions: 20,
    skillCategory: 'writing',
    levelTarget: 'A2',
    questionText: 'Elige la forma del pasado de "Ir/Ser" para (Él/Ella) el año pasado:',
    options: [
      { id: 'a', text: 'fue', isCorrect: true, explanation: '¡Muy bien! Él/Ella fue a España el año pasado.' },
      { id: 'b', text: 'fui', isCorrect: false, explanation: 'Incorreto. "Fui" é para Yo.' },
      { id: 'c', text: 'fuiste', isCorrect: false, explanation: 'Incorreto. "Fuiste" é para Tú.' },
      { id: 'd', text: 'fuimos', isCorrect: false, explanation: 'Incorreto. "Fuimos" é para Nosotros.' }
    ]
  },
  {
    id: 309,
    language: 'ES',
    module: 'MÓDULO 3 • PRONOMBRES DE OBJETO DIRECTO',
    questionNumber: 9,
    totalQuestions: 20,
    skillCategory: 'reading',
    levelTarget: 'B1',
    questionText: 'Sustituye la palabra: "¿Has leído esta novela?" -> "Sí, ya _____ he leído."',
    options: [
      { id: 'a', text: 'la', isCorrect: true, explanation: '¡Correcto! "la" substitui objeto direto feminino singular (esta novela).' },
      { id: 'b', text: 'lo', isCorrect: false, explanation: 'Incorreto. "lo" é masculino.' },
      { id: 'c', text: 'le', isCorrect: false, explanation: 'Incorreto. "le" é objeto indireto.' },
      { id: 'd', text: 'las', isCorrect: false, explanation: 'Incorreto.' }
    ]
  },
  {
    id: 310,
    language: 'ES',
    module: 'MÓDULO 4 • FUTURO IMPERFECTO',
    questionNumber: 10,
    totalQuestions: 20,
    skillCategory: 'writing',
    levelTarget: 'B1',
    questionText: '¿Cuál es la forma del futuro simple para "Hacer" (nosotros)?',
    options: [
      { id: 'a', text: 'haremos', isCorrect: true, explanation: '¡Exacto! O verbo hacer tem raiz irregular har- no futuro (haremos).' },
      { id: 'b', text: 'haceremos', isCorrect: false, explanation: 'Incorreto. Não preserva o infinitivo completo.' },
      { id: 'c', text: 'haríamos', isCorrect: false, explanation: 'Incorreto. É o condicional.' },
      { id: 'd', text: 'hicimos', isCorrect: false, explanation: 'Incorreto. É o passado.' }
    ]
  },
  {
    id: 311,
    language: 'ES',
    module: 'MÓDULO 4 • CONDICIONAL SIMPLE',
    questionNumber: 11,
    totalQuestions: 20,
    skillCategory: 'speaking',
    levelTarget: 'B1',
    questionText: '¿Cómo expresas un deseo educado diciendo "Gostaria de agendar uma reunião"?',
    options: [
      { id: 'a', text: 'Me gustaría agendar una reunión.', isCorrect: true, explanation: '¡Perfecto! "Me gustaría" é o condicional de cortesia.' },
      { id: 'b', text: 'Quiero agendar una reunión ya.', isCorrect: false, explanation: 'Incorreto. Demasiado impositivo.' },
      { id: 'c', text: 'Agendé una reunión ayer.', isCorrect: false, explanation: 'Incorreto.' },
      { id: 'd', text: 'Voy a agendar una reunión nunca.', isCorrect: false, explanation: 'Incorreto.' }
    ]
  },
  {
    id: 312,
    language: 'ES',
    module: 'MÓDULO 4 • LECTURA Y COMPRENSIÓN LITERARIA',
    questionNumber: 12,
    totalQuestions: 20,
    skillCategory: 'reading',
    levelTarget: 'B2',
    passage: `"El microteatro y las expresiones escénicas independientes han revitalizado los centros urbanos en América Latina, convirtiendo pequeños locales comerciales en escenarios íntimos para la innovación dramatúrgica."`,
    questionText: 'Según el texto, ¿cuál ha sido la contribución del microteatro?',
    options: [
      { id: 'a', text: 'Revitalizar centros urbanos mediante espacios íntimos de innovación dramática.', isCorrect: true, explanation: '¡Exacto! Transformou pequenos locais em palcos para a dramaturgia.' },
      { id: 'b', text: 'Eliminar el teatro tradicional por completo.', isCorrect: false, explanation: 'Incorreto.' },
      { id: 'c', text: 'Aumentar los costes de producción escénica.', isCorrect: false, explanation: 'Incorreto.' },
      { id: 'd', text: 'Construir grandes estadios culturales.', isCorrect: false, explanation: 'Incorreto.' }
    ]
  },
  {
    id: 313,
    language: 'ES',
    module: 'MÓDULO 5 • PRESENTE DE SUBJUNTIVO',
    questionNumber: 13,
    totalQuestions: 20,
    skillCategory: 'writing',
    levelTarget: 'B2',
    questionText: 'Completa: "Espero que tú (tener) _____ un viaje fantástico."',
    options: [
      { id: 'a', text: 'tengas', isCorrect: true, explanation: '¡Correcto! Verbos de desejo (esperar) exigem o presente de subjuntivo (tengas).' },
      { id: 'b', text: 'tienes', isCorrect: false, explanation: 'Incorreto. "Tienes" é indicativo.' },
      { id: 'c', text: 'tendrás', isCorrect: false, explanation: 'Incorreto. Futuro.' },
      { id: 'd', text: 'tuvieras', isCorrect: false, explanation: 'Incorreto. Imperfeito de subjuntivo.' }
    ]
  },
  {
    id: 314,
    language: 'ES',
    module: 'MÓDULO 5 • PRONOMBRES COMBINADOS (SE LO)',
    questionNumber: 14,
    totalQuestions: 20,
    skillCategory: 'reading',
    levelTarget: 'B2',
    questionText: 'Sustituye los pronombres: "Dije la verdad a Juan" -> "_____ dije la verdad."',
    options: [
      { id: 'a', text: 'Se la', isCorrect: true, explanation: '¡Bravo! Quando le + la se encontram, o le vira "se" (Se la dije).' },
      { id: 'b', text: 'Le la', isCorrect: false, explanation: 'Incorreto. Não se diz "Le la" em espanhol devido à cacofonia.' },
      { id: 'c', text: 'Me la', isCorrect: false, explanation: 'Incorreto.' },
      { id: 'd', text: 'Te la', isCorrect: false, explanation: 'Incorreto.' }
    ]
  },
  {
    id: 315,
    language: 'ES',
    module: 'MÓDULO 5 • EXPRESIONES IDIOMÁTICAS',
    questionNumber: 15,
    totalQuestions: 20,
    skillCategory: 'speaking',
    levelTarget: 'B2',
    questionText: '¿Qué significa la expresión popular "Estar en las nubes"?',
    options: [
      { id: 'a', text: 'Estar distraído o pensando en otra cosa.', isCorrect: true, explanation: '¡Correcto! Estar distraído ou desatento.' },
      { id: 'b', text: 'Viajar en avión frecuentemente.', isCorrect: false, explanation: 'Incorreto.' },
      { id: 'c', text: 'Tener mucho frío.', isCorrect: false, explanation: 'Incorreto.' },
      { id: 'd', text: 'Estar muy enfadado con alguien.', isCorrect: false, explanation: 'Incorreto.' }
    ]
  },
  {
    id: 316,
    language: 'ES',
    module: 'MÓDULO 6 • IMPERFECTO DE SUBJUNTIVO',
    questionNumber: 16,
    totalQuestions: 20,
    skillCategory: 'writing',
    levelTarget: 'C1',
    questionText: 'Si yo (tener) _____ más presupuesto, invertiría en investigación tecnológica.',
    options: [
      { id: 'a', text: 'tuviera', isCorrect: true, explanation: '¡Correcto! Condição hipotética no presente exige imperfeito de subjuntivo (tuviera/tuviese).' },
      { id: 'b', text: 'tenga', isCorrect: false, explanation: 'Incorreto. É o presente de subjuntivo.' },
      { id: 'c', text: 'tendría', isCorrect: false, explanation: 'Incorreto. Não se usa condicional imediatamente após a conjunção "Si".' },
      { id: 'd', text: 'tengo', isCorrect: false, explanation: 'Incorreto.' }
    ]
  },
  {
    id: 317,
    language: 'ES',
    module: 'MÓDULO 6 • MARCADORES DEL DISCURSO FORMAL',
    questionNumber: 17,
    totalQuestions: 20,
    skillCategory: 'reading',
    levelTarget: 'C1',
    questionText: '¿Qué conector formal expresa oposición o contraste entre dos ideas?',
    options: [
      { id: 'a', text: 'No obstante, / Sin embargo,', isCorrect: true, explanation: '¡Exacto! São conectores adversativos formais para demonstrar contraste.' },
      { id: 'b', text: 'Por lo tanto,', isCorrect: false, explanation: 'Incorreto. Conector consecutivo.' },
      { id: 'c', text: 'En primer lugar,', isCorrect: false, explanation: 'Incorreto. Conector de ordenamento.' },
      { id: 'd', text: 'Es decir,', isCorrect: false, explanation: 'Incorreto. Conector explicativo.' }
    ]
  },
  {
    id: 318,
    language: 'ES',
    module: 'MÓDULO 6 • ESTILO DIRECTO E INDIRECTO',
    questionNumber: 18,
    totalQuestions: 20,
    skillCategory: 'listening',
    levelTarget: 'C1',
    questionText: 'Transforma al estilo indirecto: María dijo: "Llegaré mañana" -> María dijo que _____ al día siguiente.',
    options: [
      { id: 'a', text: 'llegaría', isCorrect: true, explanation: '¡Perfecto! O futuro no discurso direto vira condicional no discurso indireto passado.' },
      { id: 'b', text: 'llegará', isCorrect: false, explanation: 'Incorreto.' },
      { id: 'c', text: 'ha llegado', isCorrect: false, explanation: 'Incorreto.' },
      { id: 'd', text: 'llegara', isCorrect: false, explanation: 'Incorreto.' }
    ]
  },
  {
    id: 319,
    language: 'ES',
    module: 'MÓDULO 6 • RÉGIMEN PREPOSICIONAL',
    questionNumber: 19,
    totalQuestions: 20,
    skillCategory: 'writing',
    levelTarget: 'C1',
    questionText: '¿Qué preposición exige el verbo "insistir"?',
    options: [
      { id: 'a', text: 'en (Insistir en algo)', isCorrect: true, explanation: '¡Correcto! Diz-se "Insistir en que..." ou "Insistir en algo".' },
      { id: 'b', text: 'de', isCorrect: false, explanation: 'Incorreto.' },
      { id: 'c', text: 'por', isCorrect: false, explanation: 'Incorreto.' },
      { id: 'd', text: 'con', isCorrect: false, explanation: 'Incorreto.' }
    ]
  },
  {
    id: 320,
    language: 'ES',
    module: 'MÓDULO 6 • CORRESPONDENCIA COMERCIAL',
    questionNumber: 20,
    totalQuestions: 20,
    skillCategory: 'speaking',
    levelTarget: 'C1',
    questionText: '¿Cuál es la fórmula formal de despedida recomendada para una carta comercial?',
    options: [
      { id: 'a', text: 'Atentamente, / Le saluda cordialmente,', isCorrect: true, explanation: '¡Excelente! É o encerramento elegante e profissional.' },
      { id: 'b', text: 'Un abrazo fuerte y besos.', isCorrect: false, explanation: 'Incorreto. Pessoal demais.' },
      { id: 'c', text: 'Chao pescao, nos vemos.', isCorrect: false, explanation: 'Incorreto. Expressão coloquial.' },
      { id: 'd', text: 'Hasta la vista, baby.', isCorrect: false, explanation: 'Incorreto.' }
    ]
  }
];

// 20 Questions for English (EN)
export const ENGLISH_QUESTIONS: DiagnosticQuestion[] = [
  {
    id: 401,
    language: 'EN',
    module: 'MODULE 1 • ESSENTIAL GREETINGS',
    questionNumber: 1,
    totalQuestions: 20,
    skillCategory: 'reading',
    levelTarget: 'A1',
    questionText: 'Which phrase is used to introduce yourself politely when meeting someone new?',
    options: [
      { id: 'a', text: 'Nice to meet you, my name is Alex.', isCorrect: true, explanation: 'Spot on! "Nice to meet you" is the classic polite introduction.' },
      { id: 'b', text: 'How much does this cost?', isCorrect: false, explanation: 'Incorrect. Used for asking prices.' },
      { id: 'c', text: 'See you tomorrow night.', isCorrect: false, explanation: 'Incorrect. Used when saying goodbye.' },
      { id: 'd', text: 'Where is the nearest station?', isCorrect: false, explanation: 'Incorrect.' }
    ]
  },
  {
    id: 402,
    language: 'EN',
    module: 'MODULE 1 • PRESENT SIMPLE VERBS',
    questionNumber: 2,
    totalQuestions: 20,
    skillCategory: 'writing',
    levelTarget: 'A1',
    questionText: 'Complete the sentence: "She _____ English fluently every day at work."',
    options: [
      { id: 'a', text: 'speaks', isCorrect: true, explanation: 'Correct! Third-person singular (she) takes the -s ending in Present Simple.' },
      { id: 'b', text: 'speak', isCorrect: false, explanation: 'Incorrect. Missing the third-person -s.' },
      { id: 'c', text: 'speaking', isCorrect: false, explanation: 'Incorrect. Needs an auxiliary verb to form a continuous tense.' },
      { id: 'd', text: 'spoke', isCorrect: false, explanation: 'Incorrect. Past tense.' }
    ]
  },
  {
    id: 403,
    language: 'EN',
    module: 'MODULE 1 • BASIC QUESTION FORMATION',
    questionNumber: 3,
    totalQuestions: 20,
    skillCategory: 'listening',
    levelTarget: 'A1',
    questionText: 'Choose the correct question format to ask about someone\'s origin:',
    options: [
      { id: 'a', text: 'Where are you from?', isCorrect: true, explanation: 'Correct! Standard order: Where + auxiliary verb (are) + subject (you) + preposition (from).' },
      { id: 'b', text: 'Where you are from?', isCorrect: false, explanation: 'Incorrect word order.' },
      { id: 'c', text: 'From where you come?', isCorrect: false, explanation: 'Incorrect phrasing.' },
      { id: 'd', text: 'Where from you?', isCorrect: false, explanation: 'Incorrect.' }
    ]
  },
  {
    id: 404,
    language: 'EN',
    module: 'MODULE 2 • ARTICLES & NOUNS',
    questionNumber: 4,
    totalQuestions: 20,
    skillCategory: 'reading',
    levelTarget: 'A1',
    questionText: 'Which article is correct before the word "opportunity"?',
    options: [
      { id: 'a', text: 'an (an opportunity)', isCorrect: true, explanation: 'Correct! "An" is used before words starting with a vowel sound.' },
      { id: 'b', text: 'a', isCorrect: false, explanation: 'Incorrect. "A" is used before consonant sounds.' },
      { id: 'c', text: 'those', isCorrect: false, explanation: 'Incorrect.' },
      { id: 'd', text: 'these', isCorrect: false, explanation: 'Incorrect.' }
    ]
  },
  {
    id: 405,
    language: 'EN',
    module: 'MODULE 2 • PRESENT CONTINUOUS',
    questionNumber: 5,
    totalQuestions: 20,
    skillCategory: 'writing',
    levelTarget: 'A2',
    questionText: 'Select the correct sentence describing an action happening right now:',
    options: [
      { id: 'a', text: 'They are discussing the annual budget in room 302.', isCorrect: true, explanation: 'Correct! Present continuous (are + discussing) indicates an ongoing action right now.' },
      { id: 'b', text: 'They discussed the annual budget tomorrow.', isCorrect: false, explanation: 'Incorrect tense conflict.' },
      { id: 'c', text: 'They discusses the annual budget now.', isCorrect: false, explanation: 'Incorrect subject-verb agreement.' },
      { id: 'd', text: 'They was discussing the budget.', isCorrect: false, explanation: 'Incorrect plural agreement.' }
    ]
  },
  {
    id: 406,
    language: 'EN',
    module: 'MODULE 2 • TRAVEL & HOSPITALITY',
    questionNumber: 6,
    totalQuestions: 20,
    skillCategory: 'speaking',
    levelTarget: 'A2',
    questionText: 'How do you politely order a meal at a restaurant?',
    options: [
      { id: 'a', text: 'I would like the grilled salmon, please.', isCorrect: true, explanation: 'Spot on! "I would like" is the polite standard.' },
      { id: 'b', text: 'Give me salmon now.', isCorrect: false, explanation: 'Incorrect and impolite.' },
      { id: 'c', text: 'Where is my money?', isCorrect: false, explanation: 'Incorrect.' },
      { id: 'd', text: 'I ate salmon yesterday.', isCorrect: false, explanation: 'Incorrect.' }
    ]
  },
  {
    id: 407,
    language: 'EN',
    module: 'MODULE 3 • PAST SIMPLE vs PRESENT PERFECT',
    questionNumber: 7,
    totalQuestions: 20,
    skillCategory: 'reading',
    levelTarget: 'A2',
    questionText: 'Complete: "I _____ three meetings yesterday afternoon."',
    options: [
      { id: 'a', text: 'had', isCorrect: true, explanation: 'Correct! Specific past time reference ("yesterday afternoon") requires Past Simple (had).' },
      { id: 'b', text: 'have had', isCorrect: false, explanation: 'Incorrect. Present Perfect is not used with specific past timestamps like "yesterday".' },
      { id: 'c', text: 'am having', isCorrect: false, explanation: 'Incorrect.' },
      { id: 'd', text: 'will have', isCorrect: false, explanation: 'Incorrect.' }
    ]
  },
  {
    id: 408,
    language: 'EN',
    module: 'MODULE 3 • COMPARATIVES & SUPERLATIVES',
    questionNumber: 8,
    totalQuestions: 20,
    skillCategory: 'writing',
    levelTarget: 'A2',
    questionText: 'Choose the correct comparative adjective: "This new software is _____ than the old one."',
    options: [
      { id: 'a', text: 'more efficient', isCorrect: true, explanation: 'Correct! Multi-syllable adjectives take "more" in the comparative form.' },
      { id: 'b', text: 'efficienter', isCorrect: false, explanation: 'Incorrect word formation.' },
      { id: 'c', text: 'most efficient', isCorrect: false, explanation: 'Incorrect. Superlative form.' },
      { id: 'd', text: 'as efficient', isCorrect: false, explanation: 'Incorrect.' }
    ]
  },
  {
    id: 409,
    language: 'EN',
    module: 'MODULE 3 • MODAL VERBS FOR OBLIGATION',
    questionNumber: 9,
    totalQuestions: 20,
    skillCategory: 'listening',
    levelTarget: 'B1',
    questionText: 'Which modal verb best expresses a strict corporate rule or requirement?',
    options: [
      { id: 'a', text: 'must / have to', isCorrect: true, explanation: 'Correct! "Must" or "have to" expresses strong necessity and legal/corporate rules.' },
      { id: 'b', text: 'might', isCorrect: false, explanation: 'Incorrect. Expresses possibility.' },
      { id: 'c', text: 'could', isCorrect: false, explanation: 'Incorrect. Expresses ability/option.' },
      { id: 'd', text: 'would', isCorrect: false, explanation: 'Incorrect.' }
    ]
  },
  {
    id: 410,
    language: 'EN',
    module: 'MODULE 4 • FIRST & SECOND CONDITIONALS',
    questionNumber: 10,
    totalQuestions: 20,
    skillCategory: 'writing',
    levelTarget: 'B1',
    questionText: 'Complete the second conditional: "If I _____ more free time, I would learn Italian."',
    options: [
      { id: 'a', text: 'had', isCorrect: true, explanation: 'Correct! Second conditional structure: If + Past Simple (had), would + base verb.' },
      { id: 'b', text: 'have', isCorrect: false, explanation: 'Incorrect.' },
      { id: 'c', text: 'will have', isCorrect: false, explanation: 'Incorrect.' },
      { id: 'd', text: 'would have', isCorrect: false, explanation: 'Incorrect.' }
    ]
  },
  {
    id: 411,
    language: 'EN',
    module: 'MODULE 4 • PAST PERFECT CONTINUOUS',
    questionNumber: 11,
    totalQuestions: 20,
    skillCategory: 'reading',
    levelTarget: 'B1',
    questionText: 'Which sentence correctly demonstrates the past perfect continuous tense?',
    options: [
      { id: 'a', text: 'She had been working on the project when the client called to cancel it.', isCorrect: true, explanation: 'Spot on! "Had been working" captures an ongoing past action interrupted by another past event.' },
      { id: 'b', text: 'She has been working on the project when the client called.', isCorrect: false, explanation: 'Incorrect.' },
      { id: 'c', text: 'She was working on the project tomorrow.', isCorrect: false, explanation: 'Incorrect.' },
      { id: 'd', text: 'She worked on the project when client calls.', isCorrect: false, explanation: 'Incorrect.' }
    ]
  },
  {
    id: 412,
    language: 'EN',
    module: 'MODULE 4 • CORPORATE PASSAGE READING',
    questionNumber: 12,
    totalQuestions: 20,
    skillCategory: 'reading',
    levelTarget: 'B2',
    passage: `"In modern corporate structures, the shift towards decentralized decision-making has fundamentally altered the role of middle management. Rather than acting as mere conduits for directives from above, they are increasingly expected to function as strategic facilitators, interpreting broad company objectives and empowering their teams to innovate within those parameters."`,
    questionText: 'According to the passage, how has the role of middle management changed?',
    options: [
      { id: 'a', text: 'They have transitioned to enabling teams to innovate based on strategic goals.', isCorrect: true, explanation: 'Spot on! Functioning as strategic facilitators captures how managers empower innovation.' },
      { id: 'b', text: 'They are now solely responsible for setting broad company objectives.', isCorrect: false, explanation: 'Incorrect.' },
      { id: 'c', text: 'Their primary function is to strictly enforce directives from upper management.', isCorrect: false, explanation: 'Incorrect.' },
      { id: 'd', text: 'They are no longer necessary in modern corporate structures.', isCorrect: false, explanation: 'Incorrect.' }
    ]
  },
  {
    id: 413,
    language: 'EN',
    module: 'MODULE 5 • PASSIVE VOICE IN BUSINESS',
    questionNumber: 13,
    totalQuestions: 20,
    skillCategory: 'writing',
    levelTarget: 'B2',
    questionText: 'Convert to passive voice: "The CEO announced the quarterly results yesterday."',
    options: [
      { id: 'a', text: 'The quarterly results were announced by the CEO yesterday.', isCorrect: true, explanation: 'Correct! Passive structure: Object + were + past participle + agent.' },
      { id: 'b', text: 'The quarterly results are announced by the CEO tomorrow.', isCorrect: false, explanation: 'Incorrect.' },
      { id: 'c', text: 'The CEO was announced by quarterly results.', isCorrect: false, explanation: 'Incorrect meaning.' },
      { id: 'd', text: 'The results had announced by CEO.', isCorrect: false, explanation: 'Incorrect.' }
    ]
  },
  {
    id: 414,
    language: 'EN',
    module: 'MODULE 5 • REPORTED SPEECH',
    questionNumber: 14,
    totalQuestions: 20,
    skillCategory: 'reading',
    levelTarget: 'B2',
    questionText: 'Transform: John said, "I am reviewing the contract now." -> John said that he _____ the contract then.',
    options: [
      { id: 'a', text: 'was reviewing', isCorrect: true, explanation: 'Correct! Present continuous ("am reviewing") backshifts to past continuous ("was reviewing").' },
      { id: 'b', text: 'is reviewing', isCorrect: false, explanation: 'Incorrect.' },
      { id: 'c', text: 'has reviewed', isCorrect: false, explanation: 'Incorrect.' },
      { id: 'd', text: 'will review', isCorrect: false, explanation: 'Incorrect.' }
    ]
  },
  {
    id: 415,
    language: 'EN',
    module: 'MODULE 5 • IDIOMATIC PHRASES',
    questionNumber: 15,
    totalQuestions: 20,
    skillCategory: 'speaking',
    levelTarget: 'B2',
    questionText: 'In a professional setting, what does the idiom "to hit the nail on the head" mean?',
    options: [
      { id: 'a', text: 'To describe or identify a situation with exact accuracy.', isCorrect: true, explanation: 'Correct! Expressing something with precise accuracy.' },
      { id: 'b', text: 'To cause physical damage to proposal documents.', isCorrect: false, explanation: 'Incorrect.' },
      { id: 'c', text: 'To force a decision prematurely.', isCorrect: false, explanation: 'Incorrect.' },
      { id: 'd', text: 'To postpone an urgent task.', isCorrect: false, explanation: 'Incorrect.' }
    ]
  },
  {
    id: 416,
    language: 'EN',
    module: 'MODULE 6 • THIRD & MIXED CONDITIONALS',
    questionNumber: 16,
    totalQuestions: 20,
    skillCategory: 'writing',
    levelTarget: 'C1',
    questionText: 'Complete: "If we _____ the market trends earlier, we would not be facing this deficit today."',
    options: [
      { id: 'a', text: 'had anticipated', isCorrect: true, explanation: 'Correct! Mixed conditional: Past condition (had anticipated) with present result (would not be facing).' },
      { id: 'b', text: 'anticipated', isCorrect: false, explanation: 'Incorrect.' },
      { id: 'c', text: 'have anticipated', isCorrect: false, explanation: 'Incorrect.' },
      { id: 'd', text: 'would anticipate', isCorrect: false, explanation: 'Incorrect.' }
    ]
  },
  {
    id: 417,
    language: 'EN',
    module: 'MODULE 6 • INVERSION FOR EMPHASIS',
    questionNumber: 17,
    totalQuestions: 20,
    skillCategory: 'reading',
    levelTarget: 'C1',
    questionText: 'Which sentence correctly uses formal inversion?',
    options: [
      { id: 'a', text: 'Seldom have we witnessed such remarkable growth in a single quarter.', isCorrect: true, explanation: 'Correct! Negative adverb (Seldom) + auxiliary verb (have) + subject (we) + main verb (witnessed).' },
      { id: 'b', text: 'Seldom we have witnessed such growth.', isCorrect: false, explanation: 'Incorrect order.' },
      { id: 'c', text: 'Seldom witnessed we such growth.', isCorrect: false, explanation: 'Incorrect.' },
      { id: 'd', text: 'We have seldom witnessed such growth is not inverted.', isCorrect: false, explanation: 'Standard order, not inverted.' }
    ]
  },
  {
    id: 418,
    language: 'EN',
    module: 'MODULE 6 • ADVANCED PHRASAL VERBS',
    questionNumber: 18,
    totalQuestions: 20,
    skillCategory: 'listening',
    levelTarget: 'C1',
    questionText: 'What is the meaning of "to iron out" in a corporate negotiation context?',
    options: [
      { id: 'a', text: 'To resolve minor difficulties or settle details.', isCorrect: true, explanation: 'Correct! "To iron out the details" means resolving discrepancies or small issues.' },
      { id: 'b', text: 'To press business attire before a presentation.', isCorrect: false, explanation: 'Incorrect literal meaning.' },
      { id: 'c', text: 'To cancel a agreement suddenly.', isCorrect: false, explanation: 'Incorrect.' },
      { id: 'd', text: 'To increase prices across the board.', isCorrect: false, explanation: 'Incorrect.' }
    ]
  },
  {
    id: 419,
    language: 'EN',
    module: 'MODULE 6 • SUBJUNCTIVE MOOD IN ENGLISH',
    questionNumber: 19,
    totalQuestions: 20,
    skillCategory: 'writing',
    levelTarget: 'C1',
    questionText: 'Select the correct sentence using the subjunctive mood:',
    options: [
      { id: 'a', text: 'The board recommended that the CEO resign immediately.', isCorrect: true, explanation: 'Correct! Demand/recommendation verbs take the base subjunctive form "resign" (not "resigns").' },
      { id: 'b', text: 'The board recommended that the CEO resigns immediately.', isCorrect: false, explanation: 'Incorrect standard indicative form.' },
      { id: 'c', text: 'The board recommended that the CEO resigned immediately.', isCorrect: false, explanation: 'Incorrect past form.' },
      { id: 'd', text: 'The board recommended that CEO is resigning.', isCorrect: false, explanation: 'Incorrect.' }
    ]
  },
  {
    id: 420,
    language: 'EN',
    module: 'MODULE 6 • FORMAL EXECUTIVE DRAFTING',
    questionNumber: 20,
    totalQuestions: 20,
    skillCategory: 'speaking',
    levelTarget: 'C1',
    questionText: 'Which phrase is most appropriate for opening a formal C-level executive summary?',
    options: [
      { id: 'a', text: 'This document delineates strategic initiatives aimed at optimizing operational efficiency.', isCorrect: true, explanation: 'Spot on! Formal, precise, and executive tone.' },
      { id: 'b', text: 'Hey guys, check out these cool tips for our budget.', isCorrect: false, explanation: 'Inappropriate informal tone.' },
      { id: 'c', text: 'Here are some random thoughts I had this morning.', isCorrect: false, explanation: 'Unprofessional.' },
      { id: 'd', text: 'Read this now or else.', isCorrect: false, explanation: 'Inappropriate command tone.' }
    ]
  }
];

export const ALL_DIAGNOSTIC_QUESTIONS: Record<'EN' | 'FR' | 'ES' | 'IT', DiagnosticQuestion[]> = {
  EN: ENGLISH_QUESTIONS,
  FR: FRENCH_QUESTIONS,
  ES: SPANISH_QUESTIONS,
  IT: ITALIAN_QUESTIONS
};
