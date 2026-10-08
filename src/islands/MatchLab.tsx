import { useEffect, useMemo, useRef, useState } from 'preact/hooks';
import { CASES } from '../data/cases';
import { SAMPLES } from '../data/extras';
import { L, ui, type Lang } from '../data/ui';
import { analyze } from '../lib/match';
import { matchResult, matchTouched, openCase } from '../lib/store';

const RING = 2 * Math.PI * 52;

/** Eases a displayed number towards its target, so the score counts up instead of jumping. */
function useTween(target: number) {
  const [value, setValue] = useState(target);
  const shown = useRef(target);
  useEffect(() => {
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) return setValue(target);
    const from = shown.current;
    const start = performance.now();
    let frame = 0;
    const tick = (now: number) => {
      const k = Math.min(1, (now - start) / 500);
      shown.current = from + (target - from) * (1 - (1 - k) ** 3);
      setValue(shown.current);
      if (k < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [target]);
  return value;
}

export default function MatchLab({ lang }: { lang: Lang }) {
  const t = ui[lang];
  const [preset, setPreset] = useState(0);
  const [text, setText] = useState(SAMPLES[0].text[lang]);
  const result = useMemo(() => analyze(text), [text]);
  const pct = useTween(result?.pct ?? 0);

  useEffect(() => {
    matchResult.value = result;
  }, [result]);

  const pick = (i: number) => {
    setPreset(i);
    setText(SAMPLES[i].text[lang]);
    matchTouched.value = true;
  };
  const type = (value: string) => {
    setPreset(-1);
    setText(value);
    matchTouched.value = true;
  };
  const most = result?.top[0]?.[1] ?? 1;
  const chips = (title: string, kind: string, labels: string[]) =>
    labels.length > 0 && (
      <>
        <h3>{title}</h3>
        <div class="chips">
          {labels.map((label, i) => (
            <span class={`chip ${kind}`} style={{ '--i': i }} key={label}>
              {label}
            </span>
          ))}
        </div>
      </>
    );

  return (
    <div class="lab" id="match">
      <div class="lab-bar">
        <span class="eyebrow">{t['match.eyebrow']}</span>
        <span class="live">
          <i />
          {t['match.live']}
        </span>
      </div>
      <div class="lab-body">
        <div class="lab-in">
          <h2>{t['match.title']}</h2>
          <p class="lab-sub">{t['match.sub']}</p>
          <div class="presets" role="group" aria-label={t['match.presets']}>
            {SAMPLES.map((s, i) => (
              <button type="button" aria-pressed={i === preset} onClick={() => pick(i)}>
                {s.label[lang]}
              </button>
            ))}
          </div>
          <label class="sr-only" for="jd">
            {t['match.label']}
          </label>
          <textarea id="jd" value={text} spellcheck={false} onInput={(e) => type(e.currentTarget.value)} />
          <p class="note">{t['match.note']}</p>
        </div>

        <div class="lab-out">
          {!result ? (
            <p class="note" role="status">
              {t['match.none']}
            </p>
          ) : (
            <>
              {result.pct === null ? (
                <p class="few" role="status">
                  {t['match.few']}
                </p>
              ) : (
                <div class="score" role="status">
                  <svg class="ring" viewBox="0 0 120 120" aria-hidden="true">
                    <circle cx="60" cy="60" r="52" />
                    <circle
                      cx="60"
                      cy="60"
                      r="52"
                      class="on"
                      stroke-dasharray={RING}
                      stroke-dashoffset={RING * (1 - pct / 100)}
                    />
                  </svg>
                  <span class="pct">{Math.round(pct)} %</span>
                  <p>
                    <b>
                      {result.hits.length} / {result.hits.length + result.gaps.length}
                    </b>{' '}
                    {t['match.score']}.
                  </p>
                </div>
              )}

              {chips(
                t['match.hits'],
                'hit',
                result.hits.map((h) => L(h.label, lang)),
              )}
              {chips(t['match.gaps'], 'gap', result.gaps)}
              {chips(
                t['match.sectors'],
                'sector',
                result.sectors.map((s) => L(s.label, lang)),
              )}

              {result.pct !== null && (
                <>
                  <h3>{t['match.where']}</h3>
                  <ol class="bars">
                    {result.top.map(([mission, n]) => {
                      const project = CASES.find((c) => c.mission === mission);
                      return (
                        <li key={mission} style={{ '--w': `${(n / most) * 100}%` }}>
                          {project ? (
                            <button
                              type="button"
                              title={t['match.open']}
                              onClick={() => (openCase.value = project.id)}
                            >
                              {mission} <span aria-hidden="true">→</span>
                            </button>
                          ) : (
                            <span>{mission}</span>
                          )}
                          <i />
                          <b>{n}</b>
                        </li>
                      );
                    })}
                  </ol>
                </>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
