# Stack technique et décisions

> Décisions confirmées le **2026-05-14**.

## Pile choisie

| Couche | Choix | Version |
|--------|-------|---------|
| Framework | [Astro](https://astro.build) | v5 |
| CSS | [Tailwind CSS](https://tailwindcss.com) | v4 |
| Contenu | Astro Content Collections (Markdown + Zod) | natif v5 |
| Sortie | Site statique (`output: 'static'`) | par défaut |
| Langage | TypeScript (strict) | dernier stable |
| Runtime | Node ≥ 20 (LTS) | figé via `.nvmrc` |

## Pourquoi Astro

- **Orienté contenu** : un portfolio = beaucoup d'HTML, peu de JS. Astro envoie zéro JS par défaut — on en ajoute uniquement où nécessaire (toggle thème, animations).
- **Content Collections natifs** : typage Zod sur le frontmatter, validation au build. Impossible d'oublier un champ sur un projet.
- **i18n natif v5** : routing et helpers fournis sans dépendance externe.
- **Performance hors-pair** : Lighthouse 95+ atteint quasi sans effort.
- **Build statique** : zéro vendor lock-in côté hébergement (point crucial vu le self-host).

## Pourquoi Tailwind 4

- **CSS-first** : palette, typo, breakpoints se déclarent en CSS via `@theme`. Plus de `tailwind.config.mjs` JavaScript.
- **Plugin Vite natif** (`@tailwindcss/vite`), parfaitement intégré à Astro 5.
- **Variables CSS exposées automatiquement** → dark mode et theming triviaux.

## Décisions produit

### Internationalisation

| Aspect | Choix |
|--------|-------|
| Langues | **Français + Anglais** |
| Langue par défaut | Français |
| Routing | `prefixDefaultLocale: false` → `/` pour FR, `/en/` pour EN |
| Slugs | Localisés (`/projets` vs `/projects`, `/a-propos` vs `/about`) |
| Strings UI | Centralisées dans `src/i18n/ui.ts` |
| Contenu projets | Bilingue dans un seul fichier (champs `title_fr` / `title_en`) |
| Contenu blog | Un dossier par langue (`src/content/blog/fr/`, `src/content/blog/en/`) |

**Pourquoi :** SEO français renforcé (URLs propres, pas de préfixe), anglais accessible mais isolé, slugs localisés = meilleure pertinence des moteurs de recherche.

### Thème clair / sombre

| Aspect | Choix |
|--------|-------|
| Modes | Clair + Sombre |
| Détection initiale | Préférence système (`prefers-color-scheme`) |
| Toggle | Bouton manuel dans le header |
| Persistance | `localStorage` (clé `theme`) |
| Anti-FOUC | Script inline en `<head>` qui pose la classe `.dark` avant le render |

### Contact

- **Liens uniquement** : email (`mailto:` avec sujet pré-rempli), GitHub, LinkedIn.
- **Bouton « Télécharger mon CV »** pointant vers `/cv/leon-heu-cv-{fr|en}.pdf`.
- **Pas de formulaire** — un recruteur ouvrira son client mail s'il veut écrire ; zéro backend = zéro spam, zéro maintenance, zéro service tiers.

### Déploiement

- **Self-host sur Proxmox personnel**, domaine `leonheu.fr`.
- **Pas d'adaptateur Astro spécifique** — on garde `output: 'static'`, donc pas de `@astrojs/netlify`, pas de `@astrojs/vercel`.
- Options envisagées à l'étape 8 : **Caddy en LXC** (préférence, HTTPS automatique) ou Docker `nginx`.

## Ce qu'on ne fait PAS

- Pas de CMS (Markdown suffit).
- Pas d'interface d'admin.
- Pas de framework UI lourd côté client (React/Vue/Svelte) tant qu'aucune île n'en a besoin — pas de surcoût bundle inutile.
- Pas de formulaire de contact (cf. supra).
- Pas d'analytics intrusive ; éventuellement Plausible auto-hébergé plus tard.
