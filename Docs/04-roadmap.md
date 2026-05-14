# Feuille de route

> Étapes du projet. Validation utilisateur attendue entre chaque étape.

| # | Étape | Statut |
|---|-------|--------|
| 1 | Clarifier les choix initiaux | Fait (2026-05-14) |
| 2 | Arborescence | Validée (2026-05-14) |
| 3 | Directions visuelles | Validée (2026-05-14) — direction **A « Editorial Bold »** retenue, cf. [05-direction-visuelle.md](./05-direction-visuelle.md) |
| 4 | Initialiser Astro 5 + Tailwind 4 | Fait (2026-05-14) |
| 5 | Structure de base navigable (placeholders) | Validée (2026-05-14) |
| 6 | Design final | Validée (2026-05-14) |
| 7 | SEO + performance | Fait (2026-05-14) |
| 8 | Documentation + déploiement | Fait (2026-05-14) — voir [`/deploy/README.md`](../deploy/README.md) |

## Étape 3 — Directions visuelles

**Objectif :** proposer 2-3 directions concrètes (palette + typographie + ambiance), avec aperçus, pour que tu choisisses avant tout codage de design.

**Livrable :**
- Pour chaque direction : palette (5-7 couleurs clair + sombre), paire de fonts, mots-clés d'ambiance, références d'inspiration, mini-mockup d'aperçu.

## Étape 4 — Initialiser Astro 5 + Tailwind 4

- `npm create astro@latest` (template minimal, TypeScript strict).
- `npm install tailwindcss @tailwindcss/vite`.
- Plugin Vite dans `astro.config.mjs`.
- Intégrations : `@astrojs/sitemap`, `@astrojs/mdx`, `@astrojs/rss`.
- Configuration i18n (`defaultLocale: 'fr'`, `locales: ['fr','en']`, `prefixDefaultLocale: false`).
- `site: 'https://leonheu.fr'`.
- `.nvmrc`, `.gitignore`, `tsconfig.json` strict.

## Étape 5 — Structure de base navigable

- Toutes les pages (FR + EN) avec contenu placeholder réaliste.
- Layouts `BaseLayout` + `BlogPostLayout`.
- Composants : `Header`, `Footer`, `LanguageSwitcher`, `ThemeToggle`, `SEO`, `Hero`, `ProjectCard`, `PostCard`, `SkillGroup`.
- `content.config.ts` avec les schémas Zod.
- 2 projets d'exemple, 1 article d'exemple FR + 1 EN.
- Helpers i18n fonctionnels.
- Style minimal — juste de quoi vérifier que le squelette tient debout.

## Étape 6 — Design final

- Application de la direction visuelle retenue (étape 3).
- Variables CSS dans `global.css` via `@theme` Tailwind 4.
- Hiérarchie typographique (display, body, caption, code).
- Animations subtiles (transitions thème, hover cartes, view transitions Astro).
- Vérif responsive aux breakpoints `sm`, `md`, `lg`, `xl`, `2xl`.

## Étape 7 — SEO + performance

- Composant `SEO.astro` complet : title, description, canonical, `hreflang` FR/EN, Open Graph, Twitter Card, JSON-LD `Person`.
- Sitemap multi-langue via `@astrojs/sitemap` (config `i18n`).
- RSS FR + EN.
- `robots.txt`.
- Images via Astro Image (AVIF/WebP, lazy, responsive sizes).
- Preconnect aux fonts, `font-display: swap`.
- Vérif Lighthouse mobile — cible : 95+ partout (Performance, Accessibility, Best Practices, SEO).

## Étape 8 — Documentation + déploiement

- `README.md` racine : install, scripts, ajout projet, ajout article.
- Choix d'infra Proxmox :
  - **Caddy en LXC** (recommandé : HTTPS auto via Let's Encrypt, config minimaliste).
  - **Docker nginx** (alternative si tu préfères containeriser).
- DNS de `leonheu.fr` → IP du LXC / host.
- Procédure de build + transfert (`rsync` ou `docker build` + push).
- Vérification finale : HTTPS valide, sitemap accessible, hreflang corrects, 404 stylée.
