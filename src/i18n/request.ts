import { getRequestConfig } from 'next-intl/server';
import { routing } from './routing';

export default getRequestConfig(async ({ requestLocale }) => {
  let locale = await requestLocale;

  if (!locale || !routing.locales.includes(locale as 'vi' | 'en')) {
    locale = routing.defaultLocale;
  }

  return {
    locale,
    messages: {
      ...(await import(`./messages/${locale}/common.json`)).default,
      ...(await import(`./messages/${locale}/home.json`)).default,
      ...(await import(`./messages/${locale}/matches.json`)).default,
      ...(await import(`./messages/${locale}/squad.json`)).default,
      ...(await import(`./messages/${locale}/standings.json`)).default,
      ...(await import(`./messages/${locale}/news.json`)).default,
      ...(await import(`./messages/${locale}/club.json`)).default,
      ...(await import(`./messages/${locale}/stadium.json`)).default,
      ...(await import(`./messages/${locale}/history.json`)).default,
    },
  };
});
