// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import mdx from '@astrojs/mdx';
import tailwindcss from '@tailwindcss/vite';

const SITE = 'https://leonheu.fr';

const localizedPairs = {
  '/a-propos': '/en/about',
  '/en/about': '/a-propos',
  '/projets': '/en/projects',
  '/en/projects': '/projets',
};

export default defineConfig({
  site: SITE,

  i18n: {
    defaultLocale: 'fr',
    locales: ['fr', 'en'],
    routing: {
      prefixDefaultLocale: false,
    },
  },

  integrations: [
    mdx(),
    sitemap({
      i18n: {
        defaultLocale: 'fr',
        locales: {
          fr: 'fr',
          en: 'en',
        },
      },
      filter: (page) => !page.includes('/404'),
      serialize(item) {
        const url = new URL(item.url);
        const path = url.pathname.replace(/\/$/, '') || '/';

        if (path in localizedPairs) {
          const lang = path.startsWith('/en/') ? 'en' : 'fr';
          const other = lang === 'fr' ? 'en' : 'fr';
          const otherUrl = new URL(localizedPairs[path] + '/', SITE).toString();
          item.links = [
            { lang, url: item.url },
            { lang: other, url: otherUrl },
          ];
        }

        const projectMatch = path.match(/^(?:\/en)?\/(?:projets|projects)\/(.+)$/);
        if (projectMatch) {
          const slug = projectMatch[1];
          item.links = [
            { lang: 'fr', url: new URL(`/projets/${slug}/`, SITE).toString() },
            { lang: 'en', url: new URL(`/en/projects/${slug}/`, SITE).toString() },
          ];
        }

        return item;
      },
    }),
  ],

  vite: {
    plugins: [tailwindcss()],
  },
});
