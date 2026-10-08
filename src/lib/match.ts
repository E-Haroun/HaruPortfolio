import { GAPS, SK, type Skill } from '../data/skills';

/** Below this many recognised technical skills, a percentage would say more about the job's wording than about the fit. */
const MIN_SKILLS = 3;

const norm = (s: string) =>
  s
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '');

/** Whole-term match, so "ml" does not fire inside "html" and "c++"-style tokens stay intact. */
const has = (text: string, term: string) =>
  new RegExp(`(^|[^a-z0-9+#])${norm(term).replace(/[.*+?^${}()|[\]\\/]/g, '\\$&')}([^a-z0-9+#]|$)`).test(
    text,
  );

export interface MatchResult {
  /** Technical skills the job asks for that a mission proves. */
  hits: Skill[];
  /** Technical skills the job asks for that no mission proves yet. */
  gaps: string[];
  /** Industries named in the job that I have worked in. Shown, but never part of the score. */
  sectors: Skill[];
  /**
   * Share of the technical skills found in the job that a mission proves, 0-100.
   * `null` when too few were found to score the job: it is probably not a technical role.
   */
  pct: number | null;
  /** Missions that prove the most requested skills: [mission, number of skills]. */
  top: [string, number][];
}

// Keyword and synonym matching on purpose: instant, and the text never leaves the browser.
export function analyze(jobDescription: string): MatchResult | null {
  const text = norm(jobDescription);
  const found = (sector: boolean) =>
    SK.filter((group) => !!group.sector === sector)
      .flatMap((group) => group.items)
      .filter((it) => it.terms.some((term) => has(text, term)));
  const hits = found(false);
  const sectors = found(true);
  const gaps = GAPS.filter(([, terms]) => terms.some((term) => has(text, term))).map(([label]) => label);
  const total = hits.length + gaps.length;
  if (!total && !sectors.length) return null;

  const score = new Map<string, number>();
  for (const it of [...hits, ...sectors]) for (const w of it.where) score.set(w, (score.get(w) ?? 0) + 1);
  const top = [...score].sort((a, b) => b[1] - a[1]).slice(0, 4);
  const pct = total >= MIN_SKILLS ? Math.round((hits.length / total) * 100) : null;
  return { hits, gaps, sectors, pct, top };
}
