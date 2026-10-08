import { useState } from 'preact/hooks';
import { CASES } from '../data/cases';
import { SK, type Skill } from '../data/skills';
import { L, ui, type Lang } from '../data/ui';
import { openCase } from '../lib/store';

export default function Skills({ lang }: { lang: Lang }) {
  const t = ui[lang];
  const [picked, setPicked] = useState<Skill | null>(null);

  return (
    <>
      <div class="sec-head">
        <div>
          <div class="eyebrow">{t['skills.eyebrow']}</div>
          <h2>{t['skills.title']}</h2>
        </div>
        <p>{t['skills.hint']}</p>
      </div>

      <div class="explorer">
        <div class="skills">
          {SK.map((group) => (
            <div class="sk">
              <h3>{group.g[lang]}</h3>
              <div class="chips">
                {group.items.map((it) => (
                  <button
                    type="button"
                    class="chip"
                    aria-pressed={it === picked}
                    onClick={() => setPicked(it === picked ? null : it)}
                  >
                    {L(it.label, lang)}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div class="proof" id="proof-panel" aria-live="polite">
          {picked ? (
            <>
              <b>{L(picked.label, lang)}</b>
              <span class="eyebrow">{t['skills.used']}</span>
              <div class="chips">
                {picked.where.map((mission) => {
                  const project = CASES.find((c) => c.mission === mission);
                  return project ? (
                    <button
                      type="button"
                      class="chip link"
                      title={t['match.open']}
                      onClick={() => (openCase.value = project.id)}
                    >
                      {mission} <span aria-hidden="true">→</span>
                    </button>
                  ) : (
                    <span class="chip">{mission}</span>
                  );
                })}
              </div>
            </>
          ) : (
            <span class="idle">{t['skills.idle']}</span>
          )}
        </div>
      </div>
    </>
  );
}
