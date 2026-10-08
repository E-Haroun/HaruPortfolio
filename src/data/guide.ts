import type { Tr } from './ui';

/**
 * Lines of the guide character, by page section and by matching result.
 * `{pct}` is replaced by the score and `{gap}` by the first skill not yet proven on a mission.
 */
export const GUIDE = {
  hello: {
    fr: "Bonjour, je suis le double de Haroun. Collez une offre juste là : je vous montre ce que j'ai déjà fait en mission, et ce que je n'ai pas encore fait.",
    en: "Hi, I'm Haroun's stand-in. Paste a job description right there: I'll show what I have already done on real projects, and what I haven't yet.",
  },
  high: {
    fr: '{pct} % : la plupart de ces compétences, je les ai déjà pratiquées en mission. Cliquez sur un projet pour voir la preuve.',
    en: '{pct}%: I have already used most of these skills on real projects. Click a project to see the proof.',
  },
  mid: {
    fr: '{pct} % : une bonne base commune. Regardez les missions les plus proches de votre offre.',
    en: '{pct}%: a solid common ground. Have a look at the projects closest to your job.',
  },
  low: {
    fr: '{pct} % : ce poste sort en partie de mon parcours. Je préfère vous le montrer tout de suite.',
    en: '{pct}%: part of this role is outside my experience. I would rather show you right away.',
  },
  gap: {
    fr: "Et je ne cache pas les manques : {gap}, je ne l'ai pas encore démontré en mission.",
    en: "And I don't hide the gaps: I have not proven {gap} on a project yet.",
  },
  few: {
    fr: 'Je vois trop peu de compétences techniques dans cette offre pour donner un score honnête. Elle ne vise sans doute pas un poste IA, data ou développement.',
    en: 'I see too few technical skills in this job to give an honest score. It is probably not an AI, data or software role.',
  },
  none: {
    fr: "Je n'ai repéré aucune compétence technique. Essayez avec une fiche de poste plus détaillée.",
    en: "I couldn't spot any technical skill. Try a more detailed job description.",
  },
  work: {
    fr: 'Quatre études de cas détaillées. Filtrez par domaine, puis ouvrez celle qui ressemble à votre contexte.',
    en: 'Four detailed case studies. Filter by domain, then open the one closest to your context.',
  },
  path: {
    fr: "En entreprise depuis 2022 : Zenidoc, Amiltone, puis HPDIA, après un stage de fin d'études chez Orange.",
    en: 'In industry since 2022: Zenidoc, Amiltone, then HPDIA, after a final-year internship at Orange.',
  },
  skills: {
    fr: "Cliquez sur une compétence : je vous dis dans quelle mission je l'ai mise en œuvre.",
    en: 'Click a skill: I will tell you on which project I used it.',
  },
  certs: {
    fr: 'Certifications, compétitions et langues. Je travaille en français, en anglais et en arabe.',
    en: 'Certifications, competitions and languages. I work in French, English and Arabic.',
  },
  faq: {
    fr: "Les questions qu'on me pose le plus souvent.",
    en: 'The questions I get asked most often.',
  },
  contact: {
    fr: 'On en parle ? Un email suffit.',
    en: 'Shall we talk? An email is all it takes.',
  },
} satisfies Record<string, Tr>;
