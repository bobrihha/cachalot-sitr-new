export type Lang = 'ru' | 'en';
export type Page = 'home' | 'approach' | 'parks';

export type AppMode = 'prod' | 'draft';

const modePrefix = (lang: Lang, mode: AppMode) => {
  if (mode === 'draft') return lang === 'en' ? '/en/draft' : '/draft';
  return lang === 'en' ? '/en' : '';
};

export const homePath = (lang: Lang, mode: AppMode = 'prod') => `${modePrefix(lang, mode)}/`;
export const approachPath = (lang: Lang, mode: AppMode = 'prod') =>
  mode === 'draft' ? homePath(lang, mode) : `${modePrefix(lang, mode)}/approach/`;
export const parksPath = (lang: Lang, mode: AppMode = 'prod') =>
  mode === 'draft' ? homePath(lang, mode) : `${modePrefix(lang, mode)}/parks/`;

export const absoluteCanonicalBase = (lang: Lang) => (lang === 'en' ? 'https://cachalot.cc/en' : 'https://cachalot.cc');
