import { ui, type Lang } from '../data/ui';
import { section } from '../lib/store';

// Page-level behaviour that needs no component: theme, copy buttons, scroll tracking, card spotlight.
const root = document.documentElement;
const t = ui[root.lang as Lang];
const $ = (id: string) => document.getElementById(id)!;

$('theme').addEventListener('click', () => {
  const dark = root.dataset.theme
    ? root.dataset.theme === 'dark'
    : matchMedia('(prefers-color-scheme: dark)').matches;
  root.dataset.theme = dark ? 'light' : 'dark';
  try {
    localStorage.setItem('he-theme', root.dataset.theme);
  } catch {
    // private mode: the choice just lasts for this page view
  }
});

for (const button of document.querySelectorAll<HTMLElement>('[data-copy]')) {
  button.addEventListener('click', () => {
    const el = $(button.dataset.copy!);
    const done = () => {
      button.textContent = t['contact.copied'];
      setTimeout(() => (button.textContent = t['contact.copy']), 1500);
    };
    // No clipboard access (old browser, denied permission): select the text so Ctrl+C works.
    const fallback = () => getSelection()?.selectAllChildren(el);
    try {
      navigator.clipboard.writeText(el.textContent!).then(done, fallback);
    } catch {
      fallback();
    }
  });
}

// Scroll progress, section in view (for the nav and the guide), and a language switch that keeps the section
const sections = [...document.querySelectorAll<HTMLElement>('main :is(section, .lab)[id]')];
const links = [...document.querySelectorAll<HTMLAnchorElement>('nav.main a')];
const langLinks = [...document.querySelectorAll<HTMLAnchorElement>('.lang a')];
function onScroll() {
  const max = root.scrollHeight - root.clientHeight;
  $('progress').style.width = `${max > 0 ? (root.scrollTop / max) * 100 : 0}%`;
  let current = 'top';
  if (root.scrollTop > 80) {
    for (const s of sections) if (s.getBoundingClientRect().top < innerHeight * 0.45) current = s.id;
  }
  section.value = current;
  for (const a of links) a.classList.toggle('on', a.hash === `#${current}`);
  for (const a of langLinks) a.hash = current === 'top' ? '' : current;
}
addEventListener('scroll', onScroll, { passive: true });
onScroll();

// Cards with the `spot` class get a soft light that follows the pointer
addEventListener(
  'pointermove',
  (e) => {
    const card = (e.target as Element).closest?.<HTMLElement>('.spot');
    if (!card) return;
    const box = card.getBoundingClientRect();
    card.style.setProperty('--mx', `${e.clientX - box.left}px`);
    card.style.setProperty('--my', `${e.clientY - box.top}px`);
  },
  { passive: true },
);
