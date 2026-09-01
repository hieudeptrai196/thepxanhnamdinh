'use client';

import { useTransition } from 'react';
import { useLocale } from 'next-intl';
import { usePathname, useRouter } from '@/i18n/navigation';
import { locales, type Locale, type AnyLocale } from '@/i18n/config';

/**
 * Rendered only when more than one locale is enabled, so it derives the target
 * from the enabled list rather than assuming a vi/en pair.
 */
export function LanguageSwitcher() {
  const locale = useLocale() as AnyLocale;
  const pathname = usePathname();
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const otherLocale = locales.find((l) => l !== locale) as Locale | undefined;
  if (!otherLocale) return null;

  function handleSwitch() {
    if (!otherLocale) return;
    startTransition(() => {
      router.replace(pathname, { locale: otherLocale });
    });
  }

  return (
    <button
      onClick={handleSwitch}
      disabled={isPending}
      className={`px-3 py-1.5 text-sm font-heading font-semibold uppercase tracking-wide text-text-secondary hover:text-text-primary transition-colors duration-150 ${isPending ? 'opacity-50 cursor-wait' : ''}`}
      aria-label={`Switch to ${otherLocale}`}
    >
      {otherLocale.toUpperCase()}
    </button>
  );
}
