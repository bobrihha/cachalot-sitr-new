export type Lang = 'ru' | 'en';
export type Page = 'home' | 'approach';

export const homePath = (lang: Lang) => (lang === 'en' ? '/en/' : '/');
export const approachPath = (lang: Lang) => (lang === 'en' ? '/en/approach/' : '/approach/');

export const absoluteCanonicalBase = (lang: Lang) => (lang === 'en' ? 'https://cachalot.cc/en' : 'https://cachalot.cc');

