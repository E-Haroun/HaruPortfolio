import { GAPS, SK, type Skill } from '../data/skills';

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
  hits: Skill[];
  gaps: string[];
  /** Share of the skills found in the job that a mission proves, 0-100. */
  pct: number;
  /** Missions that prove the most requested skills: [mission, number of skills]. */
  top: [string, number][];
}

// ponytail: keyword and synonym matching, not embeddings; swap for a real model if the demo ever needs semantics.
export function analyze(jobDescription: string): MatchResult | null {
  const text = norm(jobDescription);
  const hits = SK.flatMap((group) => group.items).filter((it) => it.terms.some((term) => has(text, term)));
  const gaps = GAPS.filter(([, terms]) => terms.some((term) => has(text, term))).map(([label]) => label);
  const total = hits.length + gaps.length;
  if (!total) return null;

  const score = new Map<string, number>();
  for (const it of hits) for (const w of it.where) score.set(w, (score.get(w) ?? 0) + 1);
  const top = [...score].sort((a, b) => b[1] - a[1]).slice(0, 4);
  return { hits, gaps, pct: Math.round((hits.length / total) * 100), top };
}
