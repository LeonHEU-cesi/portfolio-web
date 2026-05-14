# Arborescence du projet

> Structure validée le **2026-05-14**.

## Vue d'ensemble

```
Portfolio-web/
├── Docs/                        ← documentation de conception
├── public/                      ← fichiers servis tels quels
├── src/                         ← code source
│   ├── assets/                  ← images optimisées par Astro
│   ├── components/              ← composants .astro réutilisables
│   ├── content/                 ← contenu Markdown (Content Collections)
│   ├── content.config.ts        ← schémas Zod des collections
│   ├── data/                    ← données structurées en TS
│   ├── i18n/                    ← traductions UI + helpers
│   ├── layouts/                 ← gabarits de page
│   ├── pages/                   ← routes du site
│   └── styles/                  ← global.css (Tailwind + @theme)
├── astro.config.mjs
├── tsconfig.json
├── package.json
├── .nvmrc
├── .gitignore
└── README.md
```

## `public/`

Fichiers servis **tels quels** — URL = chemin sous `public/`.

```
public/
├── favicon.svg
├── cv/
│   ├── leon-heu-cv-fr.pdf       → /cv/leon-heu-cv-fr.pdf
│   └── leon-heu-cv-en.pdf
└── og/
    └── og-default.jpg           → /og/og-default.jpg
```

- **Aucun traitement** Astro (pas d'optimisation, pas de hash de cache).
- À utiliser pour : favicon, PDF, fonts auto-hébergées si besoin, images Open Graph fixes.

## `src/assets/`

Images **importées** par les composants (`import img from '../assets/...'`).

- Optimisation automatique : format AVIF/WebP, redimensionnement responsive, lazy loading.
- À utiliser pour : vignettes de projet, photo de profil, illustrations.

## `src/components/`

Composants UI réutilisables.

| Composant | Rôle |
|-----------|------|
| `Header.astro` | Logo + navigation + `LanguageSwitcher` + `ThemeToggle` |
| `Footer.astro` | Liens sociaux, copyright, lien RSS |
| `LanguageSwitcher.astro` | Bascule FR ↔ EN (conserve la page courante traduite) |
| `ThemeToggle.astro` | Bascule clair ↔ sombre, persistée en localStorage |
| `SEO.astro` | `<meta>`, `<link rel="canonical">`, OG, Twitter Card, JSON-LD, hreflang |
| `Hero.astro` | Bloc d'accroche page d'accueil |
| `ProjectCard.astro` | Vignette projet (liste + featured) |
| `PostCard.astro` | Vignette article de blog |
| `SkillGroup.astro` | Groupe de compétences (Front / Back / Outils / Soft skills…) |

## `src/content/` (Content Collections)

```
src/content/
├── projects/
│   ├── ecotask.md
│   └── portfolio.md
└── blog/
    ├── fr/
    │   └── bienvenue.md
    └── en/
        └── welcome.md
```

- **Projets** : 1 fichier `.md` par projet, contenu bilingue via frontmatter (`title_fr` / `title_en`, `summary_fr` / `summary_en`).
- **Articles** : séparés par langue (un article peut n'exister que dans une seule langue).
- Schémas validés au build par `src/content.config.ts` (Zod).

→ Détails dans [03-modele-de-contenu.md](./03-modele-de-contenu.md).

## `src/data/`

Données qui ne sont **pas** des documents Markdown.

| Fichier | Contient |
|---------|----------|
| `site.ts` | Nom, URL canonique, email, liens sociaux, langues supportées |
| `skills.ts` | Compétences groupées par catégorie |
| `experiences.ts` | Formation + expériences pro / alternance |

TypeScript plutôt que JSON pour avoir l'autocomplétion dans VS Code et le typage strict.

## `src/i18n/`

```
src/i18n/
├── ui.ts       ← { fr: { nav_home: 'Accueil', ... }, en: { ... } }
└── utils.ts    ← getLangFromUrl(), useTranslations(), useTranslatedPath()
```

Pattern recommandé Astro v5 — strings UI centralisées, helpers typés.

## `src/layouts/`

| Layout | Utilisé par |
|--------|-------------|
| `BaseLayout.astro` | Toutes les pages (shell HTML, `<head>`, thème, SEO, header, footer) |
| `BlogPostLayout.astro` | Pages d'article de blog (sommaire, dates, RSS) |

## `src/pages/`

Routes du site. **FR à la racine**, **EN sous `/en/`**.

```
src/pages/
├── index.astro             → /                       (Accueil FR)
├── a-propos.astro          → /a-propos
├── projets/
│   ├── index.astro         → /projets                (liste)
│   └── [slug].astro        → /projets/ecotask        (détail)
├── blog/
│   ├── index.astro         → /blog
│   └── [slug].astro        → /blog/bienvenue
├── contact.astro           → /contact
├── rss-fr.xml.ts           → /rss-fr.xml
├── rss-en.xml.ts           → /rss-en.xml
└── en/
    ├── index.astro         → /en
    ├── about.astro         → /en/about
    ├── projects/
    │   ├── index.astro     → /en/projects
    │   └── [slug].astro    → /en/projects/ecotask
    ├── blog/
    │   ├── index.astro     → /en/blog
    │   └── [slug].astro    → /en/blog/welcome
    └── contact.astro       → /en/contact
```

## `src/styles/global.css`

Point d'entrée Tailwind v4 :

```css
@import "tailwindcss";

@theme {
  --color-brand-500: oklch(...);
  --font-display: "Inter Variable", system-ui, sans-serif;
  /* palette, typographies, rayons définis à l'étape 6 */
}
```

La palette, les typographies et les rayons définitifs seront posés à l'étape 6 (design final), selon la direction visuelle retenue à l'étape 3.
