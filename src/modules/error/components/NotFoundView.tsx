'use client';

import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { NotFoundScene, ctaClass } from './NotFoundScene';

/**
 * Client component so it can read translations from the locale layout's
 * NextIntlClientProvider — `not-found.tsx` receives no params of its own.
 */
export function NotFoundView() {
  const t = useTranslations('common');

  return (
    <NotFoundScene
      label={t('error404Label')}
      title={t('error404')}
      description={t('error404Desc')}
      action={
        <Link href="/" className={ctaClass}>
          {t('backToHome')}
        </Link>
      }
    />
  );
}
