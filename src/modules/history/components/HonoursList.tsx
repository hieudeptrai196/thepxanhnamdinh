'use client';

import { useTranslations } from 'next-intl';
import type { Honour } from '@/shared/types/history';

type Props = {
  honours: Honour[];
};

export function HonoursList({ honours }: Props) {
  const t = useTranslations('history');

  return (
    <section className="py-12 lg:py-16">
      <h2 className="font-display text-[length:var(--text-section)] tracking-[var(--tracking-display)] uppercase text-text-primary leading-[var(--leading-tight)] mb-8">
        {t('honoursTitle')}
      </h2>

      <div className="flex flex-col divide-y divide-[var(--border-color)] border-y border-[var(--border-color)]">
        {honours.map((h) => (
          <div
            key={h.competition}
            className="grid grid-cols-[1fr_auto] sm:grid-cols-[1fr_auto_240px] items-center gap-4 py-4"
          >
            <span className="font-heading font-bold text-sm sm:text-base text-text-primary">
              {h.competition}
            </span>
            <span className="font-display text-2xl sm:text-3xl text-text-primary tracking-[var(--tracking-display)] leading-none">
              {h.count}
              <span className="ml-1 text-xs font-body font-normal text-text-secondary tracking-normal">
                {t('times')}
              </span>
            </span>
            <span className="col-span-2 sm:col-span-1 font-mono text-xs text-text-secondary sm:text-right">
              {h.years.join(' · ')}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}
