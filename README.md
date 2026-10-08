# Portfolio · Haroun Ezzahraoui

Site portfolio bilingue (FR / EN) d'un ingénieur IA & développement.

En ligne : https://e-haroun.github.io/HaruPortfolio/

## Architecture

- **Astro** génère des pages statiques : tout le contenu est dans le HTML, donc lisible par les moteurs de recherche et utilisable sans JavaScript.
- **Preact** anime les parties interactives, sous forme d'îlots hydratés indépendamment (`src/islands/`) : la démo de matching, les études de cas, le parcours, les compétences et le personnage-guide.
- Les îlots communiquent par quelques **signals** partagés (`src/lib/store.ts`) : cliquer sur une mission dans la démo ouvre son étude de cas, et le guide commente le score.
- CSS natif avec variables, thème clair et sombre, animations liées au défilement sans script.

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

| Fichier     | Contenu                                                                    |
| ----------- | -------------------------------------------------------------------------- |
| `ui.ts`     | Libellés de l'interface, accroche, titres de section, SEO                  |
| `cases.ts`  | Études de cas et projets                                                   |
| `path.ts`   | Expériences et formation                                                   |
| `skills.ts` | Compétences, missions qui les prouvent, mots-clés de la démo               |
| `extras.ts` | Coordonnées, certifications, langues, FAQ, offres d'exemple, chiffres clés |
| `guide.ts`  | Répliques du personnage-guide, par section et selon le score de la démo    |

L'apparence du personnage (cheveux, barbe, lunettes) se règle dans `AVATAR`, en bas de `extras.ts`.

## Ajouter un projet

Ajouter une entrée au tableau `CASES` de `src/data/cases.ts` :

```ts
{
  id: 'mon-projet',
  mission: 'Mon projet',              // nom repris dans skills.ts
  dom: ['nlp'],                       // finance | sante | iot | nlp
  org: { fr: 'Projet personnel', en: 'Personal project' },
  when: '2026',
  title: { fr: '…', en: '…' },
  sum: { fr: '…', en: '…' },
  stack: ['Python', 'FastAPI'],
}
```

Cela suffit pour une petite carte. Pour une grande carte avec résultats mesurés et fenêtre d'étude de cas, ajouter un champ `featured: { metrics, detail }` sur le modèle des entrées existantes.

Si le projet prouve une compétence, ajouter son nom de `mission` au champ `where` de cette compétence dans `src/data/skills.ts` : la démo de matching et l'explorateur de compétences feront alors le lien vers sa carte.

## Déploiement

Chaque push sur `main` lance `.github/workflows/ci.yml` : lint, typage, build, tests, puis publication sur GitHub Pages.

Pour un nom de domaine personnalisé : dans `astro.config.mjs`, mettre le domaine dans `site` et supprimer `base`, puis adapter l'URL de `playwright.config.ts`.
