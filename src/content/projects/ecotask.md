---
title_fr: "EcoTask — gestionnaire de tâches"
title_en: "EcoTask — task manager"
summary_fr: "Application web de gestion de tâches avec persistance hors-ligne via IndexedDB."
summary_en: "Web app for task management with offline persistence via IndexedDB."
tech: ["Astro", "TypeScript", "IndexedDB", "Tailwind"]
repo: "https://github.com/leonheu/ecotask"
demo: "https://ecotask.example.com"
featured: true
order: 1
date: 2026-03-15
---

## Contexte

EcoTask est un projet pédagogique réalisé dans le cadre du Bachelor CDA-WM. L'objectif : une application web rapide, utilisable sans connexion, et 100 % côté client.

## Stack

- **Astro** pour le shell statique et le routage.
- **TypeScript** strict pour la logique métier.
- **IndexedDB** pour la persistance locale.
- **Tailwind CSS** pour le style.

## Apprentissages

- Conception d'un schéma IndexedDB sans ORM.
- Gestion de l'état hors-ligne et synchronisation différée.
- Animations CSS performantes (transform, will-change).
