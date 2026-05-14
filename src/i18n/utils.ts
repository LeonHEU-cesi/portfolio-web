import { defaultLang, showDefaultLang, ui, routes, type Lang, type UIKey } from './ui';

export function getLangFromUrl(url: URL): Lang {
  const [, maybeLang] = url.pathname.split('/');
  if (maybeLang && maybeLang in ui) return maybeLang as Lang;
  return defaultLang;
}

export function useTranslations(lang: Lang) {
  return function t<K extends UIKey>(key: K): (typeof ui)[typeof defaultLang][K] {
    return (ui[lang][key] ?? ui[defaultLang][key]) as (typeof ui)[typeof defaultLang][K];
  };
}

type RouteKey = keyof (typeof routes)[typeof defaultLang];

export function useTranslatedPath(lang: Lang) {
  return function translatePath(key: RouteKey, slug = ''): string {
    const segment = routes[lang][key];
    const prefix = lang === defaultLang && !showDefaultLang ? '' : `/${lang}`;
    const base = segment ? `/${segment}` : '';
    const tail = slug ? `/${slug}` : '';
    const path = `${prefix}${base}${tail}`;
    return path || '/';
  };
}
