import { useState } from 'preact/hooks';
import { EDU, EXP } from '../data/path';
import { L, ui, type Lang } from '../data/ui';

const PANELS = [
  { key: 'exp', rows: EXP },
  { key: 'edu', rows: EDU },
] as const;

export default function Path({ lang }: { lang: Lang }) {
  const t = ui[lang];
  const [tab, setTab] = useState<'exp' | 'edu'>('exp');

  // Arrow keys move between the two tabs, as the tabs pattern expects
  const onKeyDown = (e: KeyboardEvent) => {
    if (e.key !== 'ArrowLeft' && e.key !== 'ArrowRight') return;
    const next = tab === 'exp' ? 'edu' : 'exp';
    setTab(next);
    document.getElementById(`tab-${next}`)?.focus();
  };

  return (
    <>
      <div class="sec-head">
        <div>
          <div class="eyebrow">{t['path.eyebrow']}</div>
          <h2>{t['path.title']}</h2>
        </div>
        <div class="tabs" role="tablist" aria-label={t['path.title']} onKeyDown={onKeyDown}>
          {PANELS.map(({ key }) => (
            <button
              type="button"
              role="tab"
              id={`tab-${key}`}
              aria-controls={`panel-${key}`}
              aria-selected={key === tab}
              tabIndex={key === tab ? 0 : -1}
              onClick={() => setTab(key)}
            >
              {t[`path.${key}`]}
            </button>
          ))}
        </div>
      </div>

      {PANELS.map(({ key, rows }) => (
        <div role="tabpanel" id={`panel-${key}`} aria-labelledby={`tab-${key}`} hidden={key !== tab}>
          <ol class="tl">
            {rows.map((r, i) => (
              <li class={i === 0 && key === 'exp' ? 'now' : undefined}>
                <div class="when">{r.when}</div>
                <div>
                  <h3>{r.title[lang]}</h3>
                  <div class="org">{L(r.org, lang)}</div>
                  <p class="sum">{r.sum[lang]}</p>
                  {r.items && (
                    <details>
                      <summary>{t['path.details']}</summary>
                      <ul>
                        {r.items[lang].map((item) => (
                          <li>{item}</li>
                        ))}
                      </ul>
                    </details>
                  )}
                  {r.stack && (
                    <div class="stack">
                      {r.stack.map((s) => (
                        <span class="chip">{s}</span>
                      ))}
                    </div>
                  )}
                </div>
              </li>
            ))}
          </ol>
        </div>
      ))}
    </>
  );
}
