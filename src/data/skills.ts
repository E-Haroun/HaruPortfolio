import type { Tr } from './ui';

export interface Skill {
  label: string | Tr;
  /** Missions that prove the skill. Never empty: an unproven skill belongs in GAPS. */
  where: string[];
  /** Lowercase, accent-free terms the matching demo looks for in a job description. */
  terms: string[];
}

const s = (label: string | Tr, where: string[], terms: string[]): Skill => ({ label, where, terms });

/** A `sector` group lists industries, not skills: the matching demo shows them but never scores them. */
export const SK: { g: Tr; items: Skill[]; sector?: boolean }[] = [
  {
    g: { fr: 'IA générative et LLM', en: 'Generative AI & LLMs' },
    items: [
      s(
        'LLM',
        ['DataRH', 'SkillEye'],
        [
          'llm',
          'llms',
          'large language model',
          'gpt',
          'openai',
          'chatgpt',
          'mistral',
          'gemini',
          'groq',
          'ia generative',
          'generative ai',
          'genai',
          'prompt engineering',
          'prompts',
        ],
      ),
      s('RAG', ['SkillEye', 'DataRH'], ['rag', 'retrieval augmented', 'retrieval-augmented']),
      s(
        'Embeddings',
        ['DataRH'],
        [
          'embedding',
          'embeddings',
          'vector',
          'vectorielle',
          'vectoriel',
          'pgvector',
          'chromadb',
          'faiss',
          'semantic search',
          'recherche semantique',
          'sentence transformers',
        ],
      ),
      s(
        'NLP',
        ['Mayash', 'ENSAM', 'DataRH'],
        ['nlp', 'traitement du langage', 'natural language', 'nlu', 'chatbot', 'chatbots', 'conversationnel'],
      ),
      s(
        'Speech',
        ['Zenidoc'],
        ['speech', 'vocale', 'asr', 'speech-to-text', 'speech recognition', 'voice recognition'],
      ),
    ],
  },
  {
    g: { fr: 'Machine learning', en: 'Machine learning' },
    items: [
      s(
        'Deep learning',
        ['Orange'],
        [
          'deep learning',
          'tensorflow',
          'keras',
          'pytorch',
          'lstm',
          'gru',
          'cnn',
          'neural network',
          'reseaux de neurones',
        ],
      ),
      s(
        'Machine learning',
        ['LOCAM', 'Boatly', 'APRR'],
        ['machine learning', 'apprentissage automatique', 'scikit-learn', 'sklearn', 'ml'],
      ),
      s(
        { fr: 'Séries temporelles', en: 'Time series' },
        ['Orange', 'Boatly'],
        [
          'time series',
          'time-series',
          'series temporelles',
          'capteur',
          'capteurs',
          'sensor',
          'sensors',
          'iot',
          'accelerometer',
        ],
      ),
      s('Edge AI', ['Orange'], ['tflite', 'embarque', 'on-device', 'edge ai', 'edge computing']),
      s(
        'Vision',
        ['COVID-19'],
        ['computer vision', 'vision par ordinateur', 'ocr', 'opencv', 'image processing', 'imagerie'],
      ),
    ],
  },
  {
    g: { fr: 'Production et MLOps', en: 'Production & MLOps' },
    items: [
      s(
        'MLOps',
        ['LOCAM', 'Zenidoc'],
        ['mlops', 'mlflow', 'model monitoring', 'deploiement de modeles', 'model deployment'],
      ),
      s('Docker', ['DataRH', 'Flotto'], ['docker', 'conteneur', 'conteneurs', 'container', 'containers']),
      s(
        'CI/CD',
        ['Flotto', 'LOCAM'],
        ['ci/cd', 'cicd', 'ci-cd', 'github actions', 'gitlab ci', 'azure devops', 'integration continue'],
      ),
      s(
        'Tests',
        ['LOCAM'],
        ['tests', 'pytest', 'tnr', 'non-regression', 'load testing', 'tests de charge', 'locust'],
      ),
      s(
        { fr: 'Observabilité', en: 'Observability' },
        ['LOCAM', 'Zenidoc'],
        [
          'kql',
          'grafana',
          'prometheus',
          'observabilite',
          'observability',
          'application insights',
          'monitoring',
        ],
      ),
    ],
  },
  {
    g: { fr: 'Cloud et données', en: 'Cloud & data' },
    items: [
      s('Azure', ['LOCAM'], ['azure', 'azure functions', 'cosmos', 'data factory', 'microsoft fabric']),
      s('GCP', ['Orange', 'ENSAM'], ['gcp', 'google cloud', 'vertex', 'bigquery']),
      s('SQL', ['LOCAM', 'DataRH'], ['sql', 'sql server', 'postgresql', 'postgres', 't-sql']),
      s('NoSQL', ['LOCAM', 'Orange'], ['cosmos db', 'mongodb', 'nosql', 'influxdb']),
      s(
        'Data engineering',
        ['LOCAM', 'Flotto'],
        [
          'etl',
          'pyspark',
          'spark',
          'data pipeline',
          'pipeline de donnees',
          'pipelines de donnees',
          'cdc',
          'n8n',
          'data engineering',
        ],
      ),
      s(
        'Power BI',
        ['Boatly', 'APRR'],
        ['power bi', 'powerbi', 'dashboard', 'dashboards', 'tableau de bord'],
      ),
    ],
  },
  {
    g: { fr: 'Développement', en: 'Software' },
    items: [
      s('Python', ['LOCAM', 'DataRH', 'Orange'], ['python']),
      s(
        'APIs',
        ['DataRH', 'Zenidoc'],
        ['api', 'apis', 'rest api', 'api rest', 'restful', 'fastapi', 'graphql', 'django', 'flask'],
      ),
      s(
        'TypeScript / Node.js',
        ['LOCAM', 'Zenidoc'],
        ['typescript', 'node', 'nodejs', 'node.js', 'nestjs', 'javascript'],
      ),
      s('Angular', ['Exolis Hoppen', 'Flotto'], ['angular', 'front-end', 'frontend']),
      s('Agile / Scrum', ['Amiltone', 'HPDIA'], ['agile', 'scrum', 'jira']),
    ],
  },
  {
    g: { fr: 'Secteurs', en: 'Industries' },
    sector: true,
    items: [
      s(
        { fr: 'Finance & crédit', en: 'Finance & credit' },
        ['LOCAM'],
        [
          'finance',
          'banque',
          'bank',
          'banking',
          'credit',
          'scoring',
          'assurance',
          'insurance',
          'fintech',
          'risque',
          'risk',
          'leasing',
        ],
      ),
      s(
        { fr: 'Santé', en: 'Healthcare' },
        ['Zenidoc', 'Exolis Hoppen'],
        [
          'sante',
          'health',
          'healthcare',
          'medical',
          'medicale',
          'medicales',
          'hopital',
          'e-sante',
          'clinique',
          'clinical',
          'patient',
          'patients',
        ],
      ),
    ],
  },
];

/** Skills a job may ask for that no mission proves yet: the demo reports them honestly as gaps. */
export const GAPS: [label: string, terms: string[]][] = [
  ['Kubernetes', ['kubernetes', 'k8s']],
  ['Terraform', ['terraform']],
  ['Databricks', ['databricks']],
  ['dbt', ['dbt']],
  ['Kafka', ['kafka']],
  ['Airflow', ['airflow']],
  ['Agents LLM / LangGraph', ['langgraph', 'agentic', 'ai agents', 'agents ia', 'agents llm']],
  ['Fine-tuning', ['fine-tuning', 'fine tuning', 'finetuning', 'lora']],
  ['AWS', ['aws', 'sagemaker', 'bedrock']],
  ['Scala', ['scala']],
  ['Go', ['golang']],
  ['Rust', ['rust']],
  ['Snowflake', ['snowflake']],
  ['React', ['react']],
];
