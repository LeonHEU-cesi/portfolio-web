# Direction visuelle — Editorial Bold

> Retenue le **2026-05-14** parmi 3 propositions.

## Concept

Style éditorial moderne inspiré de Vercel, Linear, Resend. Typographie géométrique, espaces généreux, accent saturé pour signal premium. Lisibilité maximale, hiérarchie nette, signal « professionnel et technique » immédiat.

## Palette

### Clair

| Rôle | Valeur | Usage |
|------|--------|-------|
| `bg` | `#FAFAFA` | Arrière-plan global |
| `surface` | `#FFFFFF` | Cartes, blocs élevés |
| `text` | `#0A0A0A` | Texte principal |
| `muted` | `#525252` | Texte secondaire, légendes |
| `border` | `#E5E5E5` | Bordures, séparateurs |
| `accent` | `#FF4F00` | CTAs, liens hover, indicateurs clés |

### Sombre

| Rôle | Valeur | Usage |
|------|--------|-------|
| `bg` | `#0A0A0A` | Arrière-plan global |
| `surface` | `#171717` | Cartes, blocs élevés |
| `text` | `#FAFAFA` | Texte principal |
| `muted` | `#A3A3A3` | Texte secondaire |
| `border` | `#262626` | Bordures, séparateurs |
| `accent` | `#FF6B2C` | Variante légèrement désaturée pour fond sombre |

## Typographie

| Rôle | Famille | Notes |
|------|---------|-------|
| Display + Body | **Inter** (variable, sans-serif géométrique) | Auto-hébergée, `font-display: swap` |
| Mono | **JetBrains Mono** | Pour tags tech, code, labels techniques |

### Hiérarchie indicative

| Niveau | Taille | Poids | Tracking | Line-height |
|--------|--------|-------|----------|-------------|
| Display XL (hero) | `clamp(3rem, 8vw, 8rem)` | 700-800 | `-0.02em` | 1.0 |
| H1 page | `clamp(2rem, 4vw, 3.5rem)` | 700 | `-0.015em` | 1.1 |
| H2 section | `1.875rem` (30px) | 600 | `-0.01em` | 1.2 |
| H3 | `1.25rem` (20px) | 600 | `-0.005em` | 1.3 |
| Body | `1.0625rem` (17px) | 400 | `0` | 1.7 |
| Caption / muted | `0.875rem` (14px) | 500 | `0` | 1.5 |

## Implémentation Tailwind 4

Bloc `@theme` dans `src/styles/global.css` (extrait prévisionnel) :

```css
@import "tailwindcss";

@theme {
  /* couleurs — mode clair par défaut */
  --color-bg: #FAFAFA;
  --color-surface: #FFFFFF;
  --color-text: #0A0A0A;
  --color-muted: #525252;
  --color-border: #E5E5E5;
  --color-accent: #FF4F00;

  /* typographie */
  --font-sans: "Inter Variable", system-ui, sans-serif;
  --font-mono: "JetBrains Mono Variable", ui-monospace, monospace;
}

/* sombre via classe (toggle utilisateur) */
:root.dark {
  --color-bg: #0A0A0A;
  --color-surface: #171717;
  --color-text: #FAFAFA;
  --color-muted: #A3A3A3;
  --color-border: #262626;
  --color-accent: #FF6B2C;
}

/* fallback : si pas de choix utilisateur, suit le système */
@media (prefers-color-scheme: dark) {
  :root:not(.light) {
    --color-bg: #0A0A0A;
    --color-surface: #171717;
    --color-text: #FAFAFA;
    --color-muted: #A3A3A3;
    --color-border: #262626;
    --color-accent: #FF6B2C;
  }
}
```

Détails précis (anti-FOUC, mécanique du toggle, persistance) traités à l'étape 6.

## Principes d'application

- **Accent avec parcimonie** : CTAs principaux, hover de liens, indicateurs (« featured », « live »). Jamais en fond plein.
- **Bordures plutôt qu'ombres** : `border 1px` sur cartes/inputs, ombres réservées aux modales (s'il y en a).
- **Hover discret** : `translateY(-2px)`, transition `150ms ease-out`, changement de tonalité de bordure.
- **Mono pour le tech** : tags techno (`Astro · TS`), KBD, hashes commit.
- **Espacements généreux** : padding section `5rem-8rem` vertical, gaps en multiples de 4 pour rythme cohérent.
- **Animations sobres** : pas de spring/bounce, transitions courtes (150-200 ms), `ease-out` par défaut.

## Inspirations

- [vercel.com](https://vercel.com)
- [linear.app](https://linear.app)
- [resend.com](https://resend.com)

## Options ouvertes pour l'étape 6

Aucun engagement à valider maintenant — points à reconsidérer pendant l'implémentation :

- Variante d'accent : tester un rouge plus profond ou un magenta si l'orange-red sature trop à grande surface.
- Geist (par Vercel) comme alternative à Inter — typographique très proche, légèrement plus moderne.
- View Transitions Astro pour transitions inter-pages fluides.
