/**
 * Every locale the site has translations for. `en` is fully translated at the
 * UI level but its content (news, match reports, stadium and history data)
 * is still Vietnamese-only, so it is paused rather than shipped half-done.
 *
 * To re-enable English: put 'en' back into `locales` below. Nothing else needs
 * changing — the message files, the language switcher and the middleware all
 * read from here. Remember to drop the `/en → /vi` redirect in next.config.ts.
 */
export const allLocales = ['vi', 'en'] as const;

export const locales = ['vi'] as const;

export const defaultLocale = 'vi' as const;

export type Locale = (typeof locales)[number];
export type AnyLocale = (typeof allLocales)[number];

/** The language switcher only makes sense with something to switch to. */
export const isMultilingual = locales.length > 1;
