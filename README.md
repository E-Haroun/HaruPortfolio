# Portfolio · Haroun Ezzahraoui

Site portfolio bilingue (FR / EN) d'un ingénieur IA & développement. Astro, TypeScript, CSS natif, aucun framework front.

En ligne : https://e-haroun.github.io/HaruPortfolio/

## Lancer en local

Node 22.12 ou plus récent.

```bash
npm install
npm run dev        # http://localhost:4321/HaruPortfolio/
```

| Commande          | Rôle                                              |
| ----------------- | ------------------------------------------------- |
| `npm run build`   | Génère le site statique dans `dist/`              |
| `npm run preview` | Sert `dist/` en local                             |
| `npm run lint`    | ESLint + Prettier                                 |
| `npm run check`   | Typage (`astro check`)                            |
| `npm test`        | Tests de fumée Playwright (après `npm run build`) |

Première exécution des tests : `npx playwright install chromium`.

## Modifier le contenu

Tout le contenu est dans `src/data/`, séparé du code. Chaque texte a un champ `fr` et un champ `en`.

| Fichier     | Contenu                                                      |
| ----------- | ------------------------------------------------------------ |
| `ui.ts`     | Libellés de l'interface, accroche, titres de section, SEO    |
| `cases.ts`  | Études de cas et projets                                     |
| `path.ts`   | Expériences et formation                                     |
| `skills.ts` | Compétences, missions qui les prouvent, mots-clés de la démo |
| `extras.ts` | Coordonnées, certifications, compétitions, langues, FAQ      |

## Ajouter un projet

Ajouter une entrée au tableau `CASES` de `src/data/cases.ts` :

```ts
{
  id: 'mon-projet',
  dom: ['nlp'],                       // finance | sante | iot | nlp
  org: { fr: 'Projet personnel', en: 'Personal project' },
  when: '2026',
  title: { fr: '…', en: '…' },
  sum: { fr: '…', en: '…' },
  stack: ['Python', 'FastAPI'],
}
```

Cela suffit pour une petite carte. Pour une grande carte avec résultats mesurés et fenêtre d'étude de cas, ajouter un champ `featured: { metrics, detail }` sur le modèle des entrées existantes.

Si le projet prouve une compétence, ajouter son nom au champ `where` de cette compétence dans `src/data/skills.ts`.

## Déploiement

Chaque push sur `main` lance `.github/workflows/ci.yml` : lint, typage, build, tests, puis publication sur GitHub Pages.

Pour un nom de domaine personnalisé : dans `astro.config.mjs`, mettre le domaine dans `site` et supprimer `base`, puis adapter l'URL de `playwright.config.ts`.
