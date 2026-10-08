import { SAMPLE } from '../data/extras';
import { L, ui, type Lang, type UiKey } from '../data/ui';
import { analyze } from './match';

const root = document.documentElement;
const lang = root.lang as Lang;
const t = (key: UiKey) => ui[lang][key];
const $ = <T extends HTMLElement>(id: string) => document.getElementById(id) as T;
const esc = (s: string) =>
  s.replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' })[c]!);
const chips = (labels: string[], cls: string) =>
  `<div class="chips">${labels.map((l) => `<span class="chip ${cls}">${esc(l)}</span>`).join('')}</div>`;

function setFilter(filter: string) {
  document
    .querySelectorAll('[data-f]')
    .forEach((b) => b.setAttribute('aria-pressed', String((b as HTMLElement).dataset.f === filter)));
  let shown = 0;
  for (const grid of [$('cases'), $('minis')]) {
    const cards = [...grid.querySelectorAll<HTMLElement>('[data-dom]')];
    for (const card of cards)
      card.hidden = filter !== 'all' && !card.dataset.dom!.split(' ').includes(filter);
    const visible = cards.filter((c) => !c.hidden).length;
    grid.hidden = !visible;
    shown += visible;
  }
  $('empty').hidden = shown > 0;
}

function selectTab(tab: HTMLElement) {
  for (const other of tab.parentElement!.querySelectorAll<HTMLElement>('[role=tab]')) {
    const on = other === tab;
    other.setAttribute('aria-selected', String(on));
    other.tabIndex = on ? 0 : -1;
    $(other.getAttribute('aria-controls')!).hidden = !on;
  }
}

function toggleSkill(chip: HTMLElement) {
  const on = chip.getAttribute('aria-pressed') !== 'true';
  document.querySelectorAll('.sk [aria-pressed]').forEach((c) => c.setAttribute('aria-pressed', 'false'));
  chip.setAttribute('aria-pressed', String(on));
  $('proof').innerHTML = on
    ? `<b>${esc(chip.textContent!.trim())}</b> · ${esc(t('skills.used'))} ${esc(chip.dataset.where!)}`
    : esc(t('skills.idle'));
}

function runMatch() {
  const r = analyze($<HTMLTextAreaElement>('jd').value);
  $('result').innerHTML = r
    ? `<div class="gauge"><span class="pct">${r.pct} %</span><span class="note">${r.hits.length} / ${r.hits.length + r.gaps.length}</span></div>
      <div class="meter"><i style="width:${r.pct}%"></i></div>
      <p>${esc(t('match.score'))}.</p>
      <h3>${esc(t('match.hits'))}</h3>${chips(
        r.hits.map((h) => L(h.label, lang)),
        'hit',
      )}
      ${r.gaps.length ? `<h3>${esc(t('match.gaps'))}</h3>${chips(r.gaps, 'gap')}` : ''}
      <h3>${esc(t('match.where'))}</h3>
      <ol>${r.top.map(([w, n]) => `<li>${esc(w)} <span class="note">· ${n}</span></li>`).join('')}</ol>`
    : `<p class="note">${esc(t('match.none'))}</p>`;
}

function copy(button: HTMLElement) {
  const el = $(button.dataset.copy!);
  const done = () => {
    button.textContent = t('contact.copied');
    setTimeout(() => (button.textContent = t('contact.copy')), 1500);
  };
  // No clipboard access (old browser, denied permission): select the text so Ctrl+C works.
  const fallback = () => getSelection()?.selectAllChildren(el);
  try {
    navigator.clipboard.writeText(el.textContent!).then(done, fallback);
  } catch {
    fallback();
  }
}

function toggleTheme() {
  const dark = root.dataset.theme
    ? root.dataset.theme === 'dark'
    : matchMedia('(prefers-color-scheme: dark)').matches;
  root.dataset.theme = dark ? 'light' : 'dark';
  try {
    localStorage.setItem('he-theme', root.dataset.theme);
  } catch {
    // private mode: the choice just lasts for this page view
  }
}

document.addEventListener('click', (e) => {
  const target = e.target as HTMLElement;
  if (target instanceof HTMLDialogElement) return target.close(); // click on the backdrop
  const b = target.closest<HTMLElement>('button');
  if (!b) return;
  if (b.dataset.f) setFilter(b.dataset.f);
  else if (b.dataset.case) $<HTMLDialogElement>(`dlg-${b.dataset.case}`).showModal();
  else if ('close' in b.dataset) b.closest('dialog')!.close();
  else if (b.getAttribute('role') === 'tab') selectTab(b);
  else if (b.dataset.where) toggleSkill(b);
  else if (b.dataset.copy) copy(b);
  else if (b.id === 'run') runMatch();
  else if (b.id === 'sample') {
    $<HTMLTextAreaElement>('jd').value = SAMPLE[lang];
    runMatch();
  } else if (b.id === 'theme') toggleTheme();
});

// Arrow keys move between the experience / education tabs
document.querySelector('[role=tablist]')!.addEventListener('keydown', (e) => {
  const key = (e as KeyboardEvent).key;
  if (key !== 'ArrowLeft' && key !== 'ArrowRight') return;
  const next = document.querySelector<HTMLElement>('[role=tab][aria-selected=false]')!;
  selectTab(next);
  next.focus();
});

// Scroll progress, active nav link, and a language switch that keeps the current section
const links = [...document.querySelectorAll<HTMLAnchorElement>('nav.main a')];
const langLinks = [...document.querySelectorAll<HTMLAnchorElement>('.lang a')];
function onScroll() {
  const max = root.scrollHeight - root.clientHeight;
  $('progress').style.width = `${max > 0 ? (root.scrollTop / max) * 100 : 0}%`;
  let current: HTMLAnchorElement | undefined;
  for (const a of links) if (document.querySelector(a.hash)!.getBoundingClientRect().top < 120) current = a;
  for (const a of links) a.classList.toggle('on', a === current);
  for (const a of langLinks) a.hash = current?.hash ?? '';
}
addEventListener('scroll', onScroll, { passive: true });

runMatch();
onScroll();
