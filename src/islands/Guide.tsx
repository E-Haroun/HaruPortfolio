import { useEffect, useRef, useState } from 'preact/hooks';
import { AVATAR } from '../data/extras';
import { GUIDE } from '../data/guide';
import { ui, type Lang } from '../data/ui';
import { matchResult, matchTouched, section } from '../lib/store';

type Mood = 'wave' | 'happy' | 'think' | 'idle';

/** What the guide says right now: a comment on the matching score, or a line about the section in view. */
function line(lang: Lang): { text: string; mood: Mood } {
  const where = section.value;
  if (where !== 'top' && where !== 'match') {
    const text = GUIDE[where as keyof typeof GUIDE]?.[lang] ?? GUIDE.hello[lang];
    return { text, mood: where === 'contact' ? 'wave' : 'idle' };
  }
  if (!matchTouched.value) return { text: GUIDE.hello[lang], mood: 'wave' };
  const r = matchResult.value;
  if (!r) return { text: GUIDE.none[lang], mood: 'think' };
  if (r.pct === null) return { text: GUIDE.few[lang], mood: 'think' };
  const tier = r.pct >= 75 ? 'high' : r.pct >= 50 ? 'mid' : 'low';
  const gap = r.gaps.length ? ` ${GUIDE.gap[lang].replace('{gap}', r.gaps[0])}` : '';
  return {
    text: GUIDE[tier][lang].replace('{pct}', String(r.pct)) + gap,
    mood: tier === 'high' ? 'happy' : 'think',
  };
}

const MOUTH: Record<Mood, string> = {
  wave: 'M41 60q9 8 18 0',
  happy: 'M40 59q10 10 20 0',
  think: 'M45 62h10',
  idle: 'M43 61q7 4 14 0',
};

/**
 * The guide character. It stands on the matching demo at the top of the page, then floats in the
 * corner once its spot has scrolled away (always floating on small screens, where it has no spot).
 */
export default function Guide({ lang }: { lang: Lang }) {
  const t = ui[lang];
  const { text, mood } = line(lang);
  const [floating, setFloating] = useState(false);
  const [open, setOpen] = useState(true);
  const dock = useRef<HTMLDivElement>(null);
  const eyes = useRef<SVGGElement>(null);

  useEffect(() => {
    const watcher = new IntersectionObserver(([entry]) => setFloating(!entry.isIntersecting), {
      rootMargin: '-90px 0px 0px',
    });
    watcher.observe(dock.current!);
    return () => watcher.disconnect();
  }, []);

  // While floating, a new line reopens the bubble, then it folds away so it never sits on the content for long.
  useEffect(() => {
    setOpen(true);
    const timer = setTimeout(() => setOpen(false), 9000);
    return () => clearTimeout(timer);
  }, [text, floating]);

  // The eyes follow the pointer
  useEffect(() => {
    const follow = (e: PointerEvent) => {
      const el = eyes.current;
      if (!el) return;
      const box = el.getBoundingClientRect();
      const dx = e.clientX - (box.left + box.width / 2);
      const dy = e.clientY - (box.top + box.height / 2);
      const reach = Math.min(1, Math.hypot(dx, dy) / 300) * 2.5;
      const angle = Math.atan2(dy, dx);
      el.style.transform = `translate(${Math.cos(angle) * reach}px, ${Math.sin(angle) * reach}px)`;
    };
    addEventListener('pointermove', follow, { passive: true });
    return () => removeEventListener('pointermove', follow);
  }, []);

  return (
    <div class="guide-dock" ref={dock}>
      <aside class={`guide ${mood}${floating ? ' float' : ''}`} aria-label={t['guide.label']}>
        {(open || !floating) && (
          <div class="bubble" key={text}>
            <p>{text}</p>
            <button type="button" aria-label={t['guide.close']} onClick={() => setOpen(false)}>
              ×
            </button>
          </div>
        )}
        <button
          type="button"
          class="avatar"
          aria-label={t['guide.toggle']}
          aria-expanded={open || !floating}
          onClick={() => setOpen(!open)}
        >
          <svg viewBox="0 0 100 120" aria-hidden="true">
            <g class="arm">
              <path d="M76 98L93 64" />
              <circle cx="94" cy="60" r="7" />
            </g>
            <rect class="skin" x="43" y="64" width="14" height="16" />
            <path class="body" d="M18 120V100a32 26 0 0 1 64 0v20z" />
            <text x="50" y="111" text-anchor="middle">
              HE
            </text>
            <circle class="skin" cx="25" cy="48" r="5" />
            <circle class="skin" cx="75" cy="48" r="5" />
            <rect class="skin" x="26" y="18" width="48" height="54" rx="22" />
            {AVATAR.beard && <path class="ink" d="M27 50q0 23 23 23t23-23q-4 13-23 13T27 50z" />}
            {AVATAR.hair === 'short' && (
              <path class="ink" d="M25 44V38a25 22 0 0 1 50 0v6q-4-12-25-12T25 44z" />
            )}
            {AVATAR.hair === 'curly' && (
              <g class="ink">
                {[28, 37, 46, 55, 64, 72].map((x, i) => (
                  <circle cx={x} cy={i % 5 === 0 ? 30 : 22} r="8" />
                ))}
              </g>
            )}
            <g class="eyes" ref={eyes}>
              <g class="blink">
                <circle cx="40" cy="48" r="3.2" />
                <circle cx="60" cy="48" r="3.2" />
              </g>
            </g>
            {AVATAR.glasses && (
              <path
                class="line"
                d="M32 48a8 8 0 1 0 16 0a8 8 0 1 0-16 0m20 0a8 8 0 1 0 16 0a8 8 0 1 0-16 0M48 48h4"
              />
            )}
            <path class="line mouth" d={MOUTH[mood]} />
          </svg>
        </button>
      </aside>
    </div>
  );
}
