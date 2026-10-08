import { signal } from '@preact/signals';
import type { MatchResult } from './match';

/** State shared by the islands of the page. Each island hydrates on its own; these signals are what links them. */

/** Id of the section currently in view, set by the scroll tracker. */
export const section = signal('top');

/** Last result of the matching demo, `null` when the job description contains no known skill. */
export const matchResult = signal<MatchResult | null>(null);

/** True once the visitor has typed or picked a job description: the guide then comments the score. */
export const matchTouched = signal(false);

/** Id of a case the visitor asked to see from another island; the case list opens it and resets this. */
export const openCase = signal<string | null>(null);
