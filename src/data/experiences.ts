export type Experience = {
  type: 'education' | 'work';
  title_fr: string;
  title_en: string;
  org: string;
  startDate: string;
  endDate: string | null;
  summary_fr: string;
  summary_en: string;
};

export const experiences: Experience[] = [
  {
    type: 'work',
    title_fr: 'Alternance — Développeur web',
    title_en: 'Work-study — Web developer',
    org: 'Entreprise (à compléter)',
    startDate: '2024-09',
    endDate: null,
    summary_fr: "Développement et maintenance d'applications web internes.",
    summary_en: 'Development and maintenance of internal web applications.',
  },
  {
    type: 'education',
    title_fr: "Bachelor +3 — Concepteur et Développeur d'Applications Web et Mobile (CDA-WM)",
    title_en: "Bachelor's — Web and Mobile Application Designer & Developer (CDA-WM)",
    org: 'CESI',
    startDate: '2024-09',
    endDate: '2026-09',
    summary_fr: 'Formation en alternance, niveau RNCP 6.',
    summary_en: 'Work-study program, RNCP level 6.',
  },
];
