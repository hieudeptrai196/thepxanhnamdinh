'use client';

import { useTransition } from 'react';
import { useLocale } from 'next-intl';
import { usePathname, useRouter } from '@/i18n/navigation';
import type { Locale } from '@/i18n/config';

export function LanguageSwitcher() {
  const locale = useLocale() as Locale;
  const pathname = usePathname();
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const otherLocale: Locale = locale === 'vi' ? 'en' : 'vi';
  const label = locale === 'vi' ? 'EN' : 'VI';

  function handleSwitch() {
    startTransition(() => {
      router.replace(pathname, { locale: otherLocale });
    });
  }

  return (
    <button
      onClick={handleSwitch}
      disabled={isPending}
      className={`px-3 py-1.5 text-sm font-heading font-semibold uppercase tracking-wide text-white/70 hover:text-white transition-colors duration-150 ${isPending ? 'opacity-50 cursor-wait' : ''}`}
      aria-label={`Switch to ${otherLocale}`}
    >
      {label}
    </button>
  );
}
