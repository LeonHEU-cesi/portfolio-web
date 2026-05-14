# Modèle de contenu

> Schémas des Content Collections et structures des données.

## Collection `projects`

Un fichier `.md` par projet dans `src/content/projects/`.

### Schéma Zod

```ts
// src/content.config.ts (extrait)
import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const projects = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/projects' }),
  schema: ({ image }) => z.object({
    title_fr: z.string(),
    title_en: z.string(),
    summary_fr: z.string().max(200),
    summary_en: z.string().max(200),
    tech: z.array(z.string()),            // ex: ['Astro', 'TypeScript', 'Tailwind']
    repo: z.string().url().optional(),
    demo: z.string().url().optional(),
    image: image(),                       // résolu via src/assets/projects/...
    featured: z.boolean().default(false),
    order: z.number().default(0),         // tri manuel
    date: z.coerce.date(),                // date de fin ou de mise en avant
  }),
});
```

### Exemple

```markdown
---
title_fr: "EcoTask — gestionnaire de tâches"
title_en: "EcoTask — task manager"
summary_fr: "Application web de gestion de tâches avec persistance hors-ligne."
summary_en: "Web app for task management with offline persistence."
tech: ["Astro", "TypeScript", "IndexedDB", "Tailwind"]
repo: "https://github.com/leonheu/ecotask"
demo: "https://ecotask.leonheu.fr"
image: "../../assets/projects/ecotask/cover.jpg"
featured: true
order: 1
date: 2026-03-15
---

## Contexte

Projet réalisé dans le cadre de... [contenu Markdown libre, alimente la page détail]
```

Le **corps Markdown** alimente la page détail `/projets/[slug]` (et `/en/projects/[slug]`). Si le corps est vide, la carte ne lie qu'au démo / repo — pas besoin de tout détailler dès le départ.

## Collection `blog`

Articles `.md` dans `src/content/blog/<lang>/`.

### Schéma Zod

```ts
const blog = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/blog' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    tags: z.array(z.string()).default([]),
    draft: z.boolean().default(false),
    lang: z.enum(['fr', 'en']),           // dérivé du dossier, déclaré explicitement
  }),
});
```

### Exemple

```markdown
---
title: "Bienvenue sur mon blog"
description: "Premier article : pourquoi j'ai créé ce portfolio."
pubDate: 2026-05-14
tags: ["meta"]
lang: "fr"
---

# Bienvenue

[contenu Markdown]
```

## Données structurées (`src/data/`)

### `site.ts`

```ts
export const site = {
  name: 'Léon Heu',
  url: 'https://leonheu.fr',
  email: 'leonheu97@gmail.com',
  social: {
    github: 'https://github.com/leonheu',
    linkedin: 'https://www.linkedin.com/in/leon-heu/',
  },
  languages: ['fr', 'en'] as const,
  defaultLanguage: 'fr' as const,
};
```

### `skills.ts`

```ts
export const skillGroups = [
  {
    id: 'frontend',
    label_fr: 'Front-end',
    label_en: 'Front-end',
    skills: ['HTML', 'CSS', 'JavaScript', 'TypeScript', 'React', 'Astro', 'Tailwind'],
  },
  {
    id: 'backend',
    label_fr: 'Back-end',
    label_en: 'Back-end',
    skills: ['Node.js', 'PHP', 'SQL', '...'],
  },
  // ...
];
```

### `experiences.ts`

```ts
export const experiences = [
  {
    type: 'education',        // 'education' | 'work'
    title_fr: '...',
    title_en: '...',
    org: '...',
    startDate: '2024-09',
    endDate: '2026-06',       // null si en cours
    summary_fr: '...',
    summary_en: '...',
  },
  // ...
];
```

## Strings UI (`src/i18n/ui.ts`)

```ts
export const ui = {
  fr: {
    nav_home: 'Accueil',
    nav_about: 'À propos',
    nav_projects: 'Projets',
    nav_blog: 'Blog',
    nav_contact: 'Contact',
    cta_download_cv: 'Télécharger mon CV',
    cta_see_project: 'Voir le projet',
    cta_see_code: 'Voir le code',
    cta_live_demo: 'Démo en ligne',
    // ...
  },
  en: {
    nav_home: 'Home',
    nav_about: 'About',
    nav_projects: 'Projects',
    nav_blog: 'Blog',
    nav_contact: 'Contact',
    cta_download_cv: 'Download my résumé',
    cta_see_project: 'See project',
    cta_see_code: 'See code',
    cta_live_demo: 'Live demo',
    // ...
  },
} as const;
```

## Slugs de routes localisés

Pour que `/projets` (FR) et `/projects` (EN) co-existent proprement, on duplique les fichiers de page (cf. [arborescence](./02-arborescence.md#srcpages)) — Astro v5 ne gère pas les slugs localisés automatiquement pour les routes statiques, mais cette duplication reste très légère car les pages partagent layouts, composants et i18n helpers.

## Workflow d'ajout de contenu

### Ajouter un projet

1. Optionnel : placer la vignette dans `src/assets/projects/<slug>/cover.jpg`.
2. Créer `src/content/projects/<slug>.md` avec le frontmatter complet.
3. (Optionnel) Rédiger le corps Markdown pour la page détail.
4. Lancer `npm run dev` — Astro valide le frontmatter via Zod et affiche les erreurs.

### Ajouter un article de blog

1. Créer `src/content/blog/<lang>/<slug>.md` (`lang` = `fr` ou `en`).
2. Frontmatter avec au minimum : `title`, `description`, `pubDate`, `lang`.
3. Rédiger le contenu en Markdown.
4. Mettre `draft: true` tant que l'article n'est pas prêt à être publié.
