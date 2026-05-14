export const defaultLang = 'fr' as const;
export const showDefaultLang = false;

export const languages = {
  fr: 'Français',
  en: 'English',
} as const;

export type Lang = keyof typeof languages;

export const routes = {
  fr: {
    home: '',
    about: 'a-propos',
    projects: 'projets',
    blog: 'blog',
    contact: 'contact',
  },
  en: {
    home: '',
    about: 'about',
    projects: 'projects',
    blog: 'blog',
    contact: 'contact',
  },
} as const;

export const ui = {
  fr: {
    nav_home: 'Accueil',
    nav_about: 'À propos',
    nav_projects: 'Projets',
    nav_blog: 'Blog',
    nav_contact: 'Contact',

    theme_toggle_label: 'Basculer le thème',
    lang_switch_label: 'Changer de langue',

    cta_download_cv: 'Télécharger mon CV',
    cta_see_project: 'Voir le projet',
    cta_see_code: 'Voir le code',
    cta_live_demo: 'Démo en ligne',
    cta_all_projects: 'Tous les projets',
    cta_all_posts: 'Tous les articles',
    cta_contact: 'Me contacter',

    home_title: 'Léon Heu — Développeur web',
    home_description: 'Portfolio de Léon Heu, développeur web junior basé en France.',
    home_hero_eyebrow: 'Développeur web · alternance · Bachelor +3',
    home_hero_title: 'Je conçois des sites web modernes, rapides et accessibles.',
    home_hero_subtitle: "En recherche d'une opportunité (emploi, Master, alternance) pour la rentrée 2026.",

    home_featured_title: 'Projets en avant',
    home_featured_subtitle: 'Une sélection de mes réalisations.',

    about_title: 'À propos',
    about_description: 'Mon parcours, ma formation, mes compétences.',
    about_intro_title: "Bonjour, moi c'est Léon.",
    about_intro_body: "Développeur web junior, actuellement en alternance pour finir un Bachelor +3 CDA-WM au CESI. À la recherche d'une opportunité (emploi, Master ou nouvelle alternance) pour septembre 2026.",
    about_skills_title: 'Compétences',
    about_experience_title: 'Parcours',

    projects_title: 'Projets',
    projects_description: 'Mes réalisations — front-end, back-end, outils.',

    blog_title: 'Blog',
    blog_description: "Notes techniques, retours d'expérience.",
    blog_published_on: 'Publié le',
    blog_updated_on: 'Mis à jour le',
    blog_back_to_list: 'Retour au blog',

    contact_title: 'Contact',
    contact_description: 'Discutons.',
    contact_intro: 'La manière la plus simple de me joindre :',
    contact_email_label: 'Email',
    contact_github_label: 'GitHub',
    contact_linkedin_label: 'LinkedIn',
    contact_cv_label: 'CV (PDF)',

    footer_made_with: 'Construit avec Astro et Tailwind.',
    footer_rss: 'Flux RSS',

    not_found_title: 'Page introuvable',
    not_found_back_home: "Retour à l'accueil",

    today: "aujourd'hui",
  },
  en: {
    nav_home: 'Home',
    nav_about: 'About',
    nav_projects: 'Projects',
    nav_blog: 'Blog',
    nav_contact: 'Contact',

    theme_toggle_label: 'Toggle theme',
    lang_switch_label: 'Switch language',

    cta_download_cv: 'Download my résumé',
    cta_see_project: 'See project',
    cta_see_code: 'See code',
    cta_live_demo: 'Live demo',
    cta_all_projects: 'All projects',
    cta_all_posts: 'All posts',
    cta_contact: 'Get in touch',

    home_title: 'Léon Heu — Web developer',
    home_description: 'Portfolio of Léon Heu, junior web developer based in France.',
    home_hero_eyebrow: 'Web developer · work-study · Bachelor +3',
    home_hero_title: 'I design modern, fast and accessible websites.',
    home_hero_subtitle: "Open to job, Master's, or work-study opportunities starting fall 2026.",

    home_featured_title: 'Featured projects',
    home_featured_subtitle: 'A selection of recent work.',

    about_title: 'About',
    about_description: 'My background, education and skills.',
    about_intro_title: "Hi, I'm Léon.",
    about_intro_body: "Junior web developer, currently on a work-study program completing a Bachelor's +3 CDA-WM at CESI. Looking for a job, Master's, or new work-study opportunity starting September 2026.",
    about_skills_title: 'Skills',
    about_experience_title: 'Background',

    projects_title: 'Projects',
    projects_description: "Things I've built — front-end, back-end, tools.",

    blog_title: 'Blog',
    blog_description: 'Technical notes, experience reports.',
    blog_published_on: 'Published',
    blog_updated_on: 'Updated',
    blog_back_to_list: 'Back to blog',

    contact_title: 'Contact',
    contact_description: "Let's talk.",
    contact_intro: 'The easiest way to reach me:',
    contact_email_label: 'Email',
    contact_github_label: 'GitHub',
    contact_linkedin_label: 'LinkedIn',
    contact_cv_label: 'Résumé (PDF)',

    footer_made_with: 'Built with Astro and Tailwind.',
    footer_rss: 'RSS feed',

    not_found_title: 'Page not found',
    not_found_back_home: 'Back to home',

    today: 'today',
  },
} as const;

export type UIKey = keyof (typeof ui)[typeof defaultLang];
