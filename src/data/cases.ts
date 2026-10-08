import type { Tr } from './ui';

export const DOMAINS = {
  finance: { fr: 'Finance & crédit', en: 'Finance & credit' },
  sante: { fr: 'Santé', en: 'Healthcare' },
  iot: { fr: 'IoT & capteurs', en: 'IoT & sensors' },
  nlp: { fr: 'NLP & LLM', en: 'NLP & LLM' },
} satisfies Record<string, Tr>;

export type Domain = keyof typeof DOMAINS;

/** A block of the case-study window: a heading, then a paragraph or a list. */
export type Section = [heading: string, body: string | string[]];

export interface Case {
  id: string;
  /** Name used in the `where` lists of skills.ts, so a matched skill can link back to its project. */
  mission: string;
  dom: Domain[];
  org: Tr;
  when: string;
  title: Tr;
  sum: Tr;
  stack: string[];
  /** Featured cases get a large card, measured results and a case-study window. */
  featured?: { metrics: Tr<string[]>; detail: Tr<Section[]> };
}

export const CASES: Case[] = [
  {
    id: 'scoreia',
    mission: 'LOCAM',
    dom: ['finance'],
    org: { fr: 'HPDIA · client LOCAM / ONLIZ', en: 'HPDIA · client LOCAM / ONLIZ' },
    when: '2025 –',
    title: { fr: 'Scoring crédit par IA en production', en: 'AI credit scoring in production' },
    sum: {
      fr: "Maintenance et évolution d'une chaîne de scoring qui décide des demandes de financement : modèles de ML, moteur de règles et données d'entreprises (Altares, INPI, Banque de France), sur une vingtaine de microservices Azure Functions.",
      en: 'Maintaining and evolving a scoring chain that decides on equipment financing requests: ML models, a rules engine and company data (Altares, INPI, Banque de France), across some twenty Azure Functions microservices.',
    },
    stack: ['Python', 'TypeScript', 'Azure Functions', 'SQL Server', 'Cosmos DB', 'KQL', 'Locust'],
    featured: {
      metrics: {
        fr: [
          "Biais d'imputation KNN du modèle mis en évidence : 6 713 scorings concernés",
          'Latence p95 passée de 6 s à 70 s : cause racine identifiée',
          'Idempotence prouvée : 165 relances sur 165 réussies',
        ],
        en: [
          'KNN imputation bias found in the model: 6,713 scorings affected',
          'p95 latency up from 6 s to 70 s: root cause identified',
          'Idempotency proven: 165 out of 165 retries succeeded',
        ],
      },
      detail: {
        fr: [
          [
            'Contexte',
            "LOCAM finance et loue des équipements professionnels. Chaque demande passe par une chaîne de scoring par IA puis jusqu'à la signature électronique. Mon rôle couvre tout le cycle de TMA : support de production, investigation, correctifs, évolutions, chiffrage, recette et mise en production.",
          ],
          [
            "Investigation d'incidents",
            [
              "Méthode formalisée : reconstituer le parcours d'un dossier dans les logs KQL, l'historique SQL (tables temporelles), le workflow Cosmos DB et les réponses des API externes",
              "Biais d'imputation KNN des fonds propres sur bilans confidentiels (modèle v161), risque de crédit remonté au client",
              "Appel Altares bloqué 68 s gelant toute la chaîne ; pic de latence d'une API GraphQL partenaire",
              'Messages en boucle dus à des connexions SQL « zombies » coupées par le load balancer Azure',
              'Faux positifs du moteur de règles : CA nul, multi-dirigeants, dates par défaut, fichier Banque de France',
            ],
          ],
          [
            'TMA corrective',
            [
              "Retry INPI silencieux qui renvoyait des commandes signées à l'état de prospect",
              'Date de fin des dossiers cédés : 3 fichiers, 6 tests unitaires, rollback SQL vérifié',
              'Idempotence face à la double livraison Azure Queue',
              'Filtre codé en dur dans un pipeline Azure Data Factory et une requête GraphQL',
            ],
          ],
          [
            'TMA évolutive',
            [
              'Évolution valeur résiduelle et assurance sur 4 services',
              'Mapping des adresses Altares (siège et établissements), 4 tests unitaires',
              "Nouvelle règle d'impayés financiers sur 12 mois, chiffrée à environ 12,5 jours",
              "Migration asynchrone de 7 services, passage à Python 3.12, refonte d'environ 270 logs",
            ],
          ],
          [
            'Amélioration continue',
            [
              'Tests de charge : flux de production témoin et charge injectée par paliers',
              "Guide d'onboarding de 17 chapitres et référentiel de déblocage",
              'Faille de sécurité remontée avec plan de remédiation',
            ],
          ],
        ],
        en: [
          [
            'Context',
            'LOCAM finances and leases professional equipment. Every request goes through an AI scoring chain up to e-signature. I cover the whole maintenance cycle: production support, investigation, fixes, enhancements, estimates, acceptance testing and releases.',
          ],
          [
            'Incident investigation',
            [
              "A formal method: rebuild an application's path through KQL logs, SQL history (temporal tables), the Cosmos DB workflow and external API responses",
              'KNN imputation bias on confidential balance sheets (model v161), credit risk escalated to the client',
              'An Altares call hanging for 68 s froze the chain; a partner GraphQL API latency spike',
              "Message loops caused by 'zombie' SQL connections dropped by the Azure load balancer",
              'Rules engine false positives: null revenue, multiple directors, default dates, a Banque de France file',
            ],
          ],
          [
            'Corrective maintenance',
            [
              'Silent INPI retry that sent signed orders back to lead status',
              'End date of transferred contracts: 3 files, 6 unit tests, SQL rollback verified',
              'Idempotency against Azure Queue double delivery',
              'Hardcoded filter in an Azure Data Factory pipeline and a GraphQL query',
            ],
          ],
          [
            'Enhancements',
            [
              'Residual value and insurance across 4 services',
              'Altares address mapping (headquarters and branches), 4 unit tests',
              'New 12-month unpaid-debt rule, estimated at about 12.5 days',
              'Async migration of 7 services, Python 3.12 upgrade, about 270 logs reworked',
            ],
          ],
          [
            'Continuous improvement',
            [
              'Load testing: a live production control flow plus stepped injected load',
              'A 17-chapter onboarding guide and an order-unblocking playbook',
              'Security issue raised with a remediation plan',
            ],
          ],
        ],
      },
    },
  },
  {
    id: 'datarh',
    mission: 'DataRH',
    dom: ['nlp'],
    org: { fr: 'HPDIA · projet interne', en: 'HPDIA · internal project' },
    when: '2025 – 2026',
    title: { fr: 'Matching CV / missions par embeddings', en: 'CV-to-job matching with embeddings' },
    sum: {
      fr: "DataRH aide les recruteurs d'ESN à rapprocher candidats et besoins clients : extraction des CV par LLM, compétences normalisées avec ESCO, matching explicable et dossiers de compétences générés automatiquement.",
      en: 'DataRH helps IT consultancy recruiters match candidates to client needs: LLM-based CV extraction, skills normalized with ESCO, explainable matching and auto-generated skills files.',
    },
    stack: ['Python', 'Django', 'pgvector', 'Sentence Transformers', 'Groq', 'Docker'],
    featured: {
      metrics: {
        fr: [
          "4 modèles d'embeddings comparés en nDCG et en latence",
          "Requêtes SQL de l'écran candidats : de 121 à 2",
          'Pitch à la direction, puis POC validé',
        ],
        en: [
          '4 embedding models compared on nDCG and latency',
          'SQL queries on the candidates screen: from 121 to 2',
          'Pitched to management, POC approved',
        ],
      },
      detail: {
        fr: [
          [
            'Contexte',
            'Les recruteurs passent beaucoup de temps à lire des CV et à les rapprocher des missions. DataRH centralise les profils et propose un matching explicable.',
          ],
          [
            'Réalisations',
            [
              'Extraction des CV par LLM avec sorties structurées',
              'Normalisation des compétences avec la taxonomie ESCO',
              'Matching par embeddings multilingues et similarité cosinus',
              'Laboratoire comparant MiniLM, multilingual E5, BGE-M3, un reranker BGE et la recherche hybride (RRF), évalués en nDCG et latence sur un corpus fictif',
              'Génération de dossiers de compétences Word et PDF',
              'Portail candidat avec lien à usage unique et validation RH',
            ],
          ],
        ],
        en: [
          [
            'Context',
            'Recruiters spend a lot of time reading CVs and matching them to roles. DataRH centralizes profiles and offers explainable matching.',
          ],
          [
            'What I built',
            [
              'LLM CV extraction with structured outputs',
              'Skills normalized with the ESCO taxonomy',
              'Matching with multilingual embeddings and cosine similarity',
              'A lab comparing MiniLM, multilingual E5, BGE-M3, a BGE reranker and hybrid search (RRF), scored on nDCG and latency over a synthetic corpus',
              'Word and PDF skills file generation',
              'Candidate portal with single-use links and HR approval',
            ],
          ],
        ],
      },
    },
  },
  {
    id: 'kaldi',
    mission: 'Zenidoc',
    dom: ['sante', 'nlp'],
    org: { fr: 'Zenidoc', en: 'Zenidoc' },
    when: '2022 – 2023',
    title: { fr: 'Reconnaissance vocale médicale', en: 'Medical speech recognition' },
    sum: {
      fr: "Un service qui accélère la rédaction des comptes rendus médicaux par la voix. J'ai repris l'architecture, réduit la latence et donné à l'équipe une vue temps réel des données et des logs.",
      en: 'A service that speeds up medical report writing by voice. I reworked the architecture, cut latency and gave the team a real-time view of data and logs.',
    },
    stack: ['Python', 'Node.js', 'PostgreSQL', 'REST', 'Grafana', 'Prometheus'],
    featured: {
      metrics: {
        fr: [
          "Architecture comparée à l'état de l'art, puis refondue",
          'Sockets optimisés : latence réduite entre médecin et modèle',
          'Tableau de bord temps réel connecté par API REST',
        ],
        en: [
          'Architecture benchmarked against the state of the art, then reworked',
          'Optimized sockets: lower latency between doctor and model',
          'Real-time dashboard connected through a REST API',
        ],
      },
      detail: {
        fr: [
          [
            'Contexte',
            "Projet KALDI : les médecins dictent leurs comptes rendus dans une application web. L'enjeu était la rapidité de connexion au service de reconnaissance vocale.",
          ],
          [
            'Réalisations',
            [
              'Maintenance et amélioration continue du service',
              'Tests de précision et de performance',
              'Optimisation de la communication par sockets',
              'Tableau de bord temps réel des données et des logs',
            ],
          ],
        ],
        en: [
          [
            'Context',
            'Project KALDI: doctors dictate reports in a web app. The challenge was the speed of the connection to the speech service.',
          ],
          [
            'What I did',
            [
              'Ongoing maintenance and improvement of the service',
              'Accuracy and performance testing',
              'Optimized socket communication',
              'Real-time dashboard of data and logs',
            ],
          ],
        ],
      },
    },
  },
  {
    id: 'gestbot',
    mission: 'Orange',
    dom: ['iot'],
    org: { fr: 'Orange · R&D', en: 'Orange · R&D' },
    when: '2022',
    title: {
      fr: 'Reconnaissance de gestes sur la puce IA du smartphone',
      en: "Gesture recognition on the phone's AI chip",
    },
    sum: {
      fr: "GestBot, un agent conversationnel piloté par les gestes : données d'accéléromètre et de gyroscope, modèles LSTM et GRU, puis déploiement embarqué sur la puce IA du téléphone.",
      en: "GestBot, a gesture-driven conversational agent: accelerometer and gyroscope data, LSTM and GRU models, then on-device deployment on the phone's AI chip.",
    },
    stack: ['Python', 'TensorFlow', 'TFLite', 'Android', 'InfluxDB', 'GCP'],
    featured: {
      metrics: {
        fr: [
          'Application Android de collecte de données capteurs',
          'Classification de séries temporelles en temps réel',
          'Modèle déployé avec TFLite, avec les équipes IoT',
        ],
        en: [
          'Android app to collect sensor data',
          'Real-time time-series classification',
          'Model deployed with TFLite alongside the IoT teams',
        ],
      },
      detail: {
        fr: [
          [
            'Contexte',
            "Projet de relation client et d'edge computing : reconnaître des gestes, dont l'écriture de lettres dans l'air, avec les capteurs du smartphone.",
          ],
          [
            'Réalisations',
            [
              "État de l'art des chatbots, des capteurs et des puces IA",
              'Pipeline : nettoyage par API REST, stockage InfluxDB, traitement sur GCP, trajectoires par quaternions',
              'Modèles LSTM et GRU, réglage des hyperparamètres',
              'Intégration du modèle sur la puce IA et tests de précision',
            ],
          ],
        ],
        en: [
          [
            'Context',
            "A customer-relations and edge computing project: recognizing gestures, including writing letters in the air, with the phone's sensors.",
          ],
          [
            'What I did',
            [
              'State of the art on chatbots, sensors and AI chips',
              'Pipeline: REST cleaning, InfluxDB storage, GCP processing, quaternion trajectories',
              'LSTM and GRU models, hyperparameter tuning',
              'On-chip model integration and accuracy testing',
            ],
          ],
        ],
      },
    },
  },
  {
    id: 'boatly',
    mission: 'Boatly',
    dom: ['iot'],
    org: { fr: 'Amiltone · Boatly', en: 'Amiltone · Boatly' },
    when: '2023',
    title: { fr: 'Maintenance prédictive maritime', en: 'Predictive maintenance at sea' },
    sum: {
      fr: "Algorithmes de ML sur les capteurs embarqués (protocole N2K) et tableaux de bord d'alertes.",
      en: 'ML on onboard sensor data (N2K protocol) with alerting dashboards.',
    },
    stack: ['Python', 'ML', 'Power BI'],
  },
  {
    id: 'engage',
    mission: 'Exolis Hoppen',
    dom: ['sante'],
    org: { fr: 'Amiltone · Exolis Hoppen', en: 'Amiltone · Exolis Hoppen' },
    when: '2023 – 2024',
    title: { fr: 'Plateforme e-santé de suivi des patients', en: 'Patient follow-up e-health platform' },
    sum: {
      fr: 'Rendez-vous, suivi connecté, téléconsultation et portail des soignants.',
      en: 'Appointments, connected follow-up, teleconsultation and a clinician portal.',
    },
    stack: ['Angular', 'NestJS', 'SQL'],
  },
  {
    id: 'skilleye',
    mission: 'SkillEye',
    dom: ['nlp'],
    org: { fr: 'Amiltone · projet interne', en: 'Amiltone · internal project' },
    when: '2024',
    title: { fr: "Veille d'offres structurée par LLM", en: 'Job-offer monitoring structured by LLMs' },
    sum: {
      fr: 'Scraping multi-plateformes, extraction par ChatGPT, Gemini et Groq, tableau de bord Streamlit.',
      en: 'Multi-site scraping, extraction with ChatGPT, Gemini and Groq, Streamlit dashboard.',
    },
    stack: ['Python', 'LLM', 'Streamlit'],
  },
  {
    id: 'covid',
    mission: 'COVID-19',
    dom: ['sante'],
    org: { fr: 'Projet personnel', en: 'Personal project' },
    when: '',
    title: { fr: 'Détection du COVID-19 sur radiographies', en: 'COVID-19 detection on chest X-rays' },
    sum: {
      fr: "CNN avec recherche d'hyperparamètres : 98,1 % de précision sur le jeu de test.",
      en: 'CNN with hyperparameter search: 98.1% accuracy on the test set.',
    },
    stack: ['Keras', 'OpenCV'],
  },
  {
    id: 'mayash',
    mission: 'Mayash',
    dom: ['nlp'],
    org: { fr: 'Mayash · stage', en: 'Mayash · internship' },
    when: '2021',
    title: { fr: 'Chatbot automobile en darija', en: 'Car-sales chatbot in Darija' },
    sum: {
      fr: 'Lexique du jargon automobile en darija, bot multiplateforme avec LUIS et Bot Framework.',
      en: 'Darija car-jargon lexicon, multi-platform bot with LUIS and Bot Framework.',
    },
    stack: ['NLP', 'LUIS', 'C#', 'Azure'],
  },
];
