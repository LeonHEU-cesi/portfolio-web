# Portfolio — Léon Heu

Site portfolio personnel — Astro 5 + Tailwind CSS 4, bilingue FR/EN, thèmes clair/sombre.

> En cours de construction. Conception documentée dans [`Docs/`](./Docs/README.md), feuille de route dans [`Docs/04-roadmap.md`](./Docs/04-roadmap.md).

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

Voir [`Docs/02-arborescence.md`](./Docs/02-arborescence.md) pour le détail.

## Stack

- **Framework :** [Astro 5](https://astro.build) — sortie 100 % statique (`output: 'static'`)
- **CSS :** [Tailwind CSS 4](https://tailwindcss.com) — config CSS-first via `@theme`
- **Contenu :** Astro Content Collections (Markdown + Zod)
- **i18n :** routing natif Astro v5, FR (racine) + EN (`/en/`)
- **Déploiement :** statique, auto-hébergé (cf. [`Docs/01-stack-et-decisions.md`](./Docs/01-stack-et-decisions.md))

## Licence

[MIT](./LICENSE) © 2026 Léon Heu
