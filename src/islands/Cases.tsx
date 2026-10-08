import { useEffect, useRef, useState } from 'preact/hooks';
import { CASES, DOMAINS, type Domain } from '../data/cases';
import { ui, type Lang } from '../data/ui';
import { openCase } from '../lib/store';

type Filter = Domain | 'all';

/** Runs a state change inside a view transition when the browser has them, so cards glide to their new place. */
function animate(change: () => void) {
  if (!document.startViewTransition) return change();
  document.startViewTransition(
    () =>
      new Promise<void>((done) => {
        change();
        setTimeout(done); // Preact renders on a microtask: by now the DOM is up to date
      }),
  );
}

export default function Cases({ lang }: { lang: Lang }) {
  const t = ui[lang];
  const [filter, setFilter] = useState<Filter>('all');
  const [flash, setFlash] = useState<string | null>(null);
  const dialogs = useRef<Record<string, HTMLDialogElement | null>>({});
  const asked = openCase.value;

  // Another island asked for a case: open its study, or point at its card when it has none.
  useEffect(() => {
    const c = CASES.find((x) => x.id === asked);
    if (!c) return;
    openCase.value = null;
    if (c.featured) return dialogs.current[c.id]?.showModal();
    setFilter('all');
    setFlash(c.id);
    requestAnimationFrame(() => document.getElementById(`case-${c.id}`)?.scrollIntoView({ block: 'center' }));
    const timer = setTimeout(() => setFlash(null), 2200);
    return () => clearTimeout(timer);
  }, [asked]);

  const shown = CASES.filter((c) => filter === 'all' || c.dom.includes(filter));
  const domains = (dom: Domain[]) => dom.map((d) => DOMAINS[d][lang]).join(' · ');
  const stack = (items: string[]) => (
    <div class="stack">
      {items.map((s) => (
        <span class="chip">{s}</span>
      ))}
    </div>
  );

  return (
    <>
      <div class="sec-head">
        <div>
          <div class="eyebrow">{t['work.eyebrow']}</div>
          <h2>{t['work.title']}</h2>
        </div>
        <div class="filters" role="group" aria-label={t['work.filter']}>
          {(['all', ...Object.keys(DOMAINS)] as Filter[]).map((f) => (
            <button
              type="button"
              data-f={f}
              aria-pressed={f === filter}
              onClick={() => animate(() => setFilter(f))}
            >
              {f === 'all' ? t.all : DOMAINS[f][lang]}
            </button>
          ))}
        </div>
      </div>

      <div class="cases">
        {shown.map((c) =>
          c.featured ? (
            <article
              class="case spot"
              key={c.id}
              id={`case-${c.id}`}
              style={{ viewTransitionName: `case-${c.id}` }}
            >
              <div class="case-main">
                <div class="meta">
                  <span class="dom">{domains(c.dom)}</span>
                  <span>
                    {c.org[lang]} · {c.when}
                  </span>
                </div>
                <h3>{c.title[lang]}</h3>
                <p>{c.sum[lang]}</p>
                {stack(c.stack)}
              </div>
              <div class="case-side">
                <ul class="metrics">
                  {c.featured.metrics[lang].map((m) => (
                    <li>{m}</li>
                  ))}
                </ul>
                <button
                  type="button"
                  class="more"
                  data-case={c.id}
                  onClick={() => dialogs.current[c.id]?.showModal()}
                >
                  {t['work.more']}
                </button>
              </div>
            </article>
          ) : (
            <article
              class={`mini spot${flash === c.id ? ' flash' : ''}`}
              key={c.id}
              id={`case-${c.id}`}
              style={{ viewTransitionName: `case-${c.id}` }}
            >
              <div class="meta">
                <span class="dom">{domains(c.dom)}</span>
                <span>{c.when}</span>
              </div>
              <h3>{c.title[lang]}</h3>
              <p class="org">{c.org[lang]}</p>
              <p>{c.sum[lang]}</p>
              {stack(c.stack)}
            </article>
          ),
        )}
      </div>
      {shown.length === 0 && <p class="empty">{t['work.empty']}</p>}

      {CASES.map(
        (c) =>
          c.featured && (
            <dialog
              key={c.id}
              id={`dlg-${c.id}`}
              aria-labelledby={`dlg-${c.id}-title`}
              ref={(el) => {
                dialogs.current[c.id] = el;
              }}
              onClick={(e) => e.target === e.currentTarget && e.currentTarget.close()}
            >
              <div class="dlg-head">
                <div>
                  <div class="eyebrow">
                    {c.org[lang]} · {c.when}
                  </div>
                  <h3 id={`dlg-${c.id}-title`}>{c.title[lang]}</h3>
                </div>
                <button
                  type="button"
                  class="x"
                  aria-label={t['dlg.close']}
                  onClick={() => dialogs.current[c.id]?.close()}
                >
                  ×
                </button>
              </div>
              <div class="dlg-body">
                {c.featured.detail[lang].map(([heading, body]) => (
                  <div>
                    <h4>{heading}</h4>
                    {Array.isArray(body) ? (
                      <ul>
                        {body.map((b) => (
                          <li>{b}</li>
                        ))}
                      </ul>
                    ) : (
                      <p>{body}</p>
                    )}
                  </div>
                ))}
                <div>
                  <h4>{t['dlg.stack']}</h4>
                  {stack(c.stack)}
                </div>
              </div>
            </dialog>
          ),
      )}
    </>
  );
}
