import type { Tr } from './ui';

export interface Step {
  when: string;
  title: Tr;
  org: string | Tr;
  sum: Tr;
  items?: Tr<string[]>;
  stack?: string[];
}

export const EXP: Step[] = [
  {
    when: '2025 –',
    title: {
      fr: 'Ingénieur IA & développement (TMA)',
      en: 'AI & software engineer (application maintenance)',
    },
    org: 'HPDIA · CDI',
    sum: {
      fr: 'Plateforme de scoring crédit par IA pour LOCAM / ONLIZ, pipeline Microsoft Fabric pour les données de scoring, et projet interne DataRH.',
      en: 'AI credit-scoring platform for LOCAM / ONLIZ, a Microsoft Fabric pipeline for scoring data, and the internal DataRH project.',
    },
    items: {
      fr: [
        "Investigation d'incidents de production avec KQL, SQL temporel et Cosmos DB",
        'Correctifs et évolutions sur une vingtaine de microservices Azure Functions',
        "Chiffrages, documents d'analyse et de conception, recette",
        "Optimisation d'un notebook PySpark en CDC pour synchroniser IMX vers la base PDF",
        'Matching CV / missions par embeddings (DataRH)',
      ],
      en: [
        'Production incident investigation with KQL, temporal SQL and Cosmos DB',
        'Fixes and enhancements across some twenty Azure Functions microservices',
        'Estimates, analysis and design documents, acceptance testing',
        'Optimized a PySpark CDC notebook syncing IMX to the PDF database',
        'CV-to-job matching with embeddings (DataRH)',
      ],
    },
    stack: ['Python', 'Azure', 'KQL', 'SQL Server', 'PySpark'],
  },
  {
    when: '2023 – 2025',
    title: { fr: 'Consultant data, IA & développement', en: 'Data, AI & software consultant' },
    org: 'Amiltone · CDI · Marseille',
    sum: {
      fr: "Cinq missions dans l'industrie, le maritime et la santé.",
      en: 'Five assignments across industry, maritime and healthcare.',
    },
    items: {
      fr: [
        'APRR : analyse prédictive du trafic autoroutier et application Vigie Réseau',
        'Boatly : maintenance prédictive à partir des capteurs de bateaux',
        'Exolis Hoppen : plateforme Engage de suivi des patients',
        'Flotto : gestion de flotte, ETL n8n, CI/CD et monitoring Grafana',
        "SkillEye : veille d'offres d'emploi structurée par LLM",
      ],
      en: [
        'APRR: predictive motorway traffic analysis and the Vigie Réseau app',
        'Boatly: predictive maintenance from boat sensors',
        'Exolis Hoppen: the Engage patient follow-up platform',
        'Flotto: fleet management, n8n ETL, CI/CD and Grafana monitoring',
        'SkillEye: job-offer monitoring structured by LLMs',
      ],
    },
    stack: ['Python', 'ML', 'Power BI', 'Angular', 'Docker'],
  },
  {
    when: '2022 – 2023',
    title: { fr: 'Ingénieur développeur full stack & IA', en: 'Full-stack & AI engineer' },
    org: 'Zenidoc · CDD · Marseille',
    sum: {
      fr: 'Service de reconnaissance vocale pour les comptes rendus médicaux.',
      en: 'Speech recognition service for medical reports.',
    },
    items: {
      fr: [
        "Refonte de l'architecture et réduction de la latence",
        'Tests de précision et de performance',
        'Tableau de bord temps réel par API REST',
      ],
      en: [
        'Architecture rework and latency reduction',
        'Accuracy and performance testing',
        'Real-time dashboard through a REST API',
      ],
    },
    stack: ['Python', 'Node.js', 'PostgreSQL'],
  },
  {
    when: '2022',
    title: { fr: 'Ingénieur R&D deep learning', en: 'R&D deep learning engineer' },
    org: {
      fr: "Orange · stage de fin d'études · Pessac",
      en: 'Orange · final-year internship · Pessac',
    },
    sum: {
      fr: 'Reconnaissance de gestes par capteurs de smartphone, déployée sur la puce IA.',
      en: 'Gesture recognition from phone sensors, deployed on the AI chip.',
    },
    items: {
      fr: [
        'Collecte accéléromètre et gyroscope via une application Android',
        'Modèles LSTM et GRU',
        'Déploiement embarqué avec TFLite',
      ],
      en: [
        'Accelerometer and gyroscope collection via an Android app',
        'LSTM and GRU models',
        'On-device deployment with TFLite',
      ],
    },
    stack: ['TensorFlow', 'TFLite', 'Android'],
  },
  {
    when: '2021',
    title: { fr: 'Ingénieur IA / NLP', en: 'AI / NLP engineer' },
    org: { fr: 'Mayash · stage · Casablanca', en: 'Mayash · internship · Casablanca' },
    sum: {
      fr: "Chatbot multiplateforme d'achat et de vente de voitures, avec un lexique en darija.",
      en: 'Multi-platform car-sales chatbot with a Darija lexicon.',
    },
    stack: ['NLP', 'LUIS', 'Bot Framework', 'Azure SQL'],
  },
  {
    when: '2020',
    title: { fr: 'Développeur Python / NLP', en: 'Python / NLP developer' },
    org: { fr: 'ENSAM Casablanca · stage', en: 'ENSAM Casablanca · internship' },
    sum: {
      fr: "Chatbot d'orientation des étudiants : LSTM et Word2Vec, Dialogflow, déployé sur GCP.",
      en: 'Student guidance chatbot: LSTM and Word2Vec, Dialogflow, deployed on GCP.',
    },
    stack: ['Keras', 'Dialogflow', 'GCP'],
  },
];

export const EDU: Step[] = [
  {
    when: '2019 – 2022',
    title: {
      fr: "Diplôme d'ingénieur, IA et génie informatique",
      en: 'Engineering degree, AI and computer science',
    },
    org: 'ENSAM Casablanca',
    sum: {
      fr: 'Machine learning, deep learning, recherche opérationnelle, génie logiciel.',
      en: 'Machine learning, deep learning, operations research, software engineering.',
    },
  },
  {
    when: '2021 – 2022',
    title: {
      fr: 'Échange de 5e année, IA et génie informatique',
      en: 'Final-year exchange, AI and computer science',
    },
    org: 'UTBM · Belfort-Montbéliard, France',
    sum: {
      fr: "Semestre d'échange en intelligence artificielle.",
      en: 'Exchange semester in artificial intelligence.',
    },
  },
  {
    when: '2017 – 2019',
    title: { fr: 'DUT génie informatique', en: 'Two-year degree in computer science' },
    org: 'EST Casablanca',
    sum: {
      fr: 'Développement, bases de données, systèmes et réseaux.',
      en: 'Software development, databases, systems and networks.',
    },
  },
];
