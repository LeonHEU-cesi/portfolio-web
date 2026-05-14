export type SkillGroup = {
  id: string;
  label_fr: string;
  label_en: string;
  skills: string[];
};

export const skillGroups: SkillGroup[] = [
  {
    id: 'frontend',
    label_fr: 'Front-end',
    label_en: 'Front-end',
    skills: ['HTML', 'CSS', 'JavaScript', 'TypeScript', 'Astro', 'React', 'Tailwind CSS'],
  },
  {
    id: 'backend',
    label_fr: 'Back-end',
    label_en: 'Back-end',
    skills: ['Node.js', 'PHP', 'Symfony', 'SQL', 'REST'],
  },
  {
    id: 'tooling',
    label_fr: 'Outils',
    label_en: 'Tooling',
    skills: ['Git', 'GitHub Actions', 'Docker', 'Linux', 'VS Code'],
  },
  {
    id: 'soft',
    label_fr: 'Soft skills',
    label_en: 'Soft skills',
    skills: ['Travail en équipe', 'Rigueur', 'Curiosité', 'Communication'],
  },
];
