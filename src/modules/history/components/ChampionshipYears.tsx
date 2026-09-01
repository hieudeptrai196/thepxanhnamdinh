'use client';

import { useTranslations } from 'next-intl';
import type { Championship } from '@/shared/types/history';

type Props = {
  championships: Championship[];
};

function GoldStar() {
  return (
    <svg className="size-5 shrink-0" viewBox="0 0 24 24" fill="var(--color-gold)" aria-hidden="true">
      <path d="M12 2l2.9 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77 5.82 21.02 7 14.14l-5-4.87 7.1-1.01L12 2z" />
    </svg>
  );
}

/**
 * The only place on the site permitted to use Championship Gold — one star per
 * title, matching the three stars on the crest.
 */
export function ChampionshipYears({ championships }: Props) {
  const t = useTranslations('history');

  return (
    <section className="py-12 lg:py-16">
      <h2 className="font-display text-[length:var(--text-section)] tracking-[var(--tracking-display)] uppercase text-text-primary leading-[var(--leading-tight)] mb-2">
        {t('championsTitle')}
      </h2>
      <p className="text-sm text-text-secondary mb-8">{t('championsIntro')}</p>

      <div className="grid gap-4 sm:gap-6 sm:grid-cols-3">
        {championships.map((c) => (
          <div
            key={c.year}
            className="rounded-[var(--radius-default)] bg-bg-inverse p-6 sm:p-8 text-center"
          >
            <div className="flex justify-center mb-3">
              <GoldStar />
            </div>
            <p className="font-display text-5xl sm:text-6xl lg:text-7xl text-white tracking-[var(--tracking-display)] leading-none">
              {c.year}
            </p>
            <p className="mt-3 font-heading font-bold text-sm uppercase tracking-[var(--tracking-label)] text-white/80">
              {c.competition}
            </p>
            <p className="mt-1 text-xs text-white/50 font-mono">{c.note}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
