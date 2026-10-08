import type { Tr } from './ui';

export const PROFILE = {
  name: 'Haroun Ezzahraoui',
  email: 'haroun.ezzahraoui.10@gmail.com',
  linkedin: 'https://www.linkedin.com/in/eharoun/',
};

export const CERTS: [year: string, name: string][] = [
  ['2024', 'ChatGPT for Data Science'],
  ['2024', 'Machine Learning in Python'],
  ['2024', 'Machine Learning with Decision Trees and Random Forests'],
  ['2023', 'Introduction to Data and Data Science'],
  ['2021', 'Programming in Python · Coursera'],
  ['2021', 'Programming in Java EE · Red Hat'],
  ['2021', 'Blockchain Essentials · Cognitive Class'],
  ['2020', 'CCNA Cybersecurity Operations · Cisco'],
  ['2020', 'Mobility Fundamentals · Cisco Networking Academy'],
  ['2020', 'Problem Solving and Design Thinking · IBM P-TECH'],
];

export const HACKS: (string | Tr)[] = [
  'Google Hash Code · ENSAM',
  'MCPC · Moroccan Collegiate Programming Contest',
  { fr: 'Hackathon ENSAJ · banques', en: 'Hackathon ENSAJ · banking' },
  { fr: 'Hackathon Technopark · digitalisation', en: 'Hackathon Technopark · digitalization' },
  'Code1T · EHTP',
  'Capture the Flag · EHTP',
];

export const LANGS: Tr<[code: string, label: string][]> = {
  fr: [
    ['AR', 'Arabe · langue maternelle'],
    ['FR', 'Français · bilingue'],
    ['EN', 'Anglais · courant, niveau professionnel'],
    ['DE', 'Allemand · A2'],
  ],
  en: [
    ['AR', 'Arabic · native'],
    ['FR', 'French · bilingual'],
    ['EN', 'English · fluent, professional'],
    ['DE', 'German · A2'],
  ],
};

export const FAQ: Tr<[question: string, answer: string][]> = {
  fr: [
    [
      'Quel type de poste recherchez-vous ?',
      'Ingénieur IA, ML, LLM ou MLOps, en CDI ou en freelance, en télétravail ou en hybride en France. Je suis le plus utile là où un système IA doit tourner de façon fiable en production.',
    ],
    [
      'Pouvez-vous reprendre un système IA déjà en production ?',
      "Oui, c'est mon métier actuel : je maintiens une chaîne de scoring crédit par IA, j'investigue les incidents jusqu'à la cause racine, je corrige, je fais évoluer et je documente pour l'équipe.",
    ],
    [
      'Dans quels secteurs avez-vous travaillé ?',
      'Finance et crédit (scoring IA), santé (reconnaissance vocale médicale, suivi des patients), télécom et IoT (Orange, maintenance prédictive maritime), transport (trafic autoroutier).',
    ],
    [
      "Avec quelle stack êtes-vous le plus à l'aise ?",
      'Python, SQL et Azure au quotidien ; TensorFlow et PyTorch pour le deep learning ; embeddings, pgvector et LLM via API pour le NLP ; Docker et CI/CD pour livrer.',
    ],
    [
      'Dans quelles langues travaillez-vous ?',
      'Français, anglais et arabe. Je peux mener un entretien ou une mission entièrement en anglais.',
    ],
  ],
  en: [
    [
      'What kind of role are you looking for?',
      'AI, ML, LLM or MLOps engineering, permanent or freelance, remote or hybrid in France. I add the most where an AI system has to run reliably in production.',
    ],
    [
      'Can you take over an AI system that is already in production?',
      'Yes, it is my current job: I maintain an AI credit-scoring chain, investigate incidents down to the root cause, ship fixes and enhancements, and document for the team.',
    ],
    [
      'Which industries have you worked in?',
      'Finance and credit (AI scoring), healthcare (medical speech recognition, patient follow-up), telecom and IoT (Orange, maritime predictive maintenance), transport (motorway traffic).',
    ],
    [
      'Which stack are you most comfortable with?',
      'Python, SQL and Azure every day; TensorFlow and PyTorch for deep learning; embeddings, pgvector and LLM APIs for NLP; Docker and CI/CD to ship.',
    ],
    [
      'Which languages do you work in?',
      'French, English and Arabic. I can run an interview or a whole project in English.',
    ],
  ],
};

/** Example job descriptions for the matching demo. The first one is loaded by default. */
export const SAMPLES: { label: Tr; text: Tr }[] = [
  {
    label: { fr: 'AI Engineer · fintech', en: 'AI Engineer · fintech' },
    text: {
      fr: "AI Engineer – CDI – télétravail\n\nVous rejoignez l'équipe IA d'une fintech. Vous concevez des fonctionnalités LLM et RAG en Python (FastAPI), les déployez avec Docker et une CI/CD sur Azure, et suivez leur qualité en production (monitoring, tests).\n\nProfil : expérience en machine learning et NLP, SQL, embeddings. Une expérience en finance, crédit ou santé est un plus. Bonus : Kubernetes, Terraform, LangGraph.",
      en: 'AI Engineer – permanent – remote\n\nJoin the AI team of a fintech. You design LLM and RAG features in Python (FastAPI), deploy them with Docker and CI/CD on Azure, and track their quality in production (monitoring, tests).\n\nProfile: experience in machine learning and NLP, SQL, embeddings. Experience in finance, credit or healthcare is a plus. Bonus: Kubernetes, Terraform, LangGraph.',
    },
  },
  {
    label: { fr: 'MLOps Engineer · santé', en: 'MLOps Engineer · healthcare' },
    text: {
      fr: 'MLOps Engineer – CDI – hybride\n\nVous industrialisez des modèles de deep learning (TensorFlow, PyTorch) pour un éditeur de logiciels de santé : conteneurs Docker, Kubernetes, CI/CD, monitoring Grafana et Prometheus, tests de charge.\n\nProfil : Python, SQL, GCP. Bonus : Terraform, AWS, Kafka.',
      en: 'MLOps Engineer – permanent – hybrid\n\nYou take deep learning models (TensorFlow, PyTorch) to production for a healthcare software vendor: Docker containers, Kubernetes, CI/CD, Grafana and Prometheus monitoring, load testing.\n\nProfile: Python, SQL, GCP. Bonus: Terraform, AWS, Kafka.',
    },
  },
  {
    label: { fr: 'Data Engineer · crédit', en: 'Data Engineer · credit' },
    text: {
      fr: 'Data Engineer – freelance – télétravail\n\nVous construisez des pipelines de données PySpark et des ETL sur Azure (Data Factory, Microsoft Fabric) avec SQL Server et du CDC, et vous alimentez des tableaux de bord Power BI pour une équipe risque de crédit.\n\nBonus : Databricks, dbt, Airflow, Snowflake.',
      en: 'Data Engineer – freelance – remote\n\nYou build PySpark data pipelines and ETL on Azure (Data Factory, Microsoft Fabric) with SQL Server and CDC, and feed Power BI dashboards for a credit risk team.\n\nBonus: Databricks, dbt, Airflow, Snowflake.',
    },
  },
];

/** Measured results shown next to the investigation card. Every figure comes from a real mission. */
export const STATS: { value: string | Tr; label: Tr; from: Tr }[] = [
  {
    value: { fr: '6 713', en: '6,713' },
    label: {
      fr: "scorings concernés par un biais d'imputation KNN que j'ai mis en évidence",
      en: 'scorings affected by a KNN imputation bias I uncovered',
    },
    from: { fr: 'Scoring crédit IA · LOCAM', en: 'AI credit scoring · LOCAM' },
  },
  {
    value: '165 / 165',
    label: {
      fr: 'relances réussies : idempotence prouvée face à la double livraison de messages',
      en: 'retries succeeded: idempotency proven against double message delivery',
    },
    from: { fr: 'Scoring crédit IA · LOCAM', en: 'AI credit scoring · LOCAM' },
  },
  {
    value: '121 → 2',
    label: {
      fr: "requêtes SQL pour afficher l'écran candidats",
      en: 'SQL queries to render the candidates screen',
    },
    from: { fr: 'DataRH · projet interne', en: 'DataRH · internal project' },
  },
  {
    value: '≈ 20',
    label: {
      fr: 'microservices Azure Functions en maintenance et en évolution',
      en: 'Azure Functions microservices maintained and evolved',
    },
    from: { fr: 'Scoring crédit IA · LOCAM', en: 'AI credit scoring · LOCAM' },
  },
];

/** Traits of the guide character: adjust them so it looks like the real person. */
export const AVATAR: { hair: 'short' | 'curly' | 'none'; beard: boolean; glasses: boolean } = {
  hair: 'short',
  beard: false,
  glasses: false,
};
