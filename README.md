# Portfolio — Léon Heu

Site portfolio personnel — Astro 5 + Tailwind CSS 4, bilingue FR/EN, thèmes clair/sombre, déployé sur [leonheu.fr](https://leonheu.fr).

## Pré-requis

- Node ≥ 22 (cf. [`.nvmrc`](./.nvmrc))
- [pnpm](https://pnpm.io) ≥ 10

## Installation

```bash
pnpm install
```

## Scripts

| Commande | Effet |
|----------|-------|
| `pnpm dev` | Serveur de développement sur `http://localhost:4321` |
| `pnpm build` | Génère le site statique dans `dist/` |
| `pnpm preview` | Sert `dist/` localement pour vérification |

## Structure

```
Portfolio-web/
├── Docs/              ← documentation de conception (brief, stack, arborescence, modèle de contenu, roadmap, direction visuelle)
├── deploy/            ← configs de déploiement (Caddy LXC ou Docker)
├── public/            ← fichiers servis tels quels (favicon, CV PDF, OG image)
├── src/
│   ├── components/    ← Header, Footer, Hero, ProjectCard, PostCard, SEO, ThemeToggle, LanguageSwitcher, SkillGroup
│   ├── content/       ← Markdown des projets + articles de blog (FR + EN)
│   ├── content.config.ts  ← schémas Zod
│   ├── data/          ← site.ts, skills.ts, experiences.ts
│   ├── i18n/          ← strings UI + helpers de traduction
│   ├── layouts/       ← BaseLayout, BlogPostLayout
│   ├── pages/         ← routes FR + EN sous /en/
│   └── styles/        ← global.css (Tailwind 4 + tokens Editorial Bold)
├── astro.config.mjs
└── package.json
```

Détails complets dans [`Docs/02-arborescence.md`](./Docs/02-arborescence.md).

## Ajouter un projet

1. (Optionnel) Vignette dans `src/assets/projects/<slug>/cover.jpg`
2. Créer `src/content/projects/<slug>.md` :

```markdown
---
title_fr: "Nom du projet"
title_en: "Project name"
summary_fr: "Résumé FR (≤ 200 caractères)"
summary_en: "Summary EN (≤ 200 characters)"
tech: ["Astro", "TypeScript", "..."]
repo: "https://github.com/..."          # optionnel
demo: "https://..."                      # optionnel
featured: true                           # apparaît sur la home
order: 1                                 # tri manuel
date: 2026-05-14
---

## Contexte

Texte Markdown libre — alimente la page détail `/projets/<slug>`.
```

Le frontmatter est validé par Zod au build. Si un champ obligatoire manque, `pnpm build` plante avec un message explicite.

## Ajouter un article de blog

Créer `src/content/blog/<lang>/<slug>.md` (`lang` = `fr` ou `en`) :

```markdown
---
title: "Titre de l'article"
description: "Description courte (utilisée en meta + carte)"
pubDate: 2026-05-14
tags: ["astro", "performance"]
draft: false
lang: "fr"
---

Contenu Markdown libre.
```

Mettre `draft: true` tant que l'article n'est pas prêt — il n'apparaîtra ni en build, ni dans le RSS.

## Avant la première mise en ligne

- Ajouter `public/cv/leon-heu-cv-fr.pdf` + `public/cv/leon-heu-cv-en.pdf`
- (Optionnel) Ajouter `public/og/og-default.jpg` (1200×630) pour les previews Open Graph
- Vérifier `src/data/site.ts` (handles GitHub/LinkedIn corrects)

## Déploiement

Site 100 % statique. Deux options détaillées dans [`deploy/README.md`](./deploy/README.md) :

1. **Caddy LXC sur Proxmox** (recommandé) — HTTPS auto via Let's Encrypt, déploiement par rsync
2. **Docker nginx** — image autonome derrière un reverse proxy TLS

## Stack

- **Framework :** [Astro 5](https://astro.build) — sortie 100 % statique
- **CSS :** [Tailwind CSS 4](https://tailwindcss.com) — config CSS-first via `@theme`
- **Contenu :** Astro Content Collections (Markdown + Zod)
- **Polices :** Inter Variable + JetBrains Mono Variable, self-hostées via `@fontsource-variable`
- **i18n :** routing natif Astro v5, FR (racine) + EN (`/en/`)
- **CI :** GitHub Actions — `pnpm build` à chaque push/PR sur main

## Licence

[MIT](./LICENSE) © 2026 Léon Heu
