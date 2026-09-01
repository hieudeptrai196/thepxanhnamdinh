'use client';

import { useTranslations } from 'next-intl';
import type { Milestone } from '@/shared/types/history';

type Props = {
  milestones: Milestone[];
};

export function HistoryTimeline({ milestones }: Props) {
  const t = useTranslations('history');

  return (
    <section className="py-12 lg:py-16">
      <h2 className="font-display text-[length:var(--text-section)] tracking-[var(--tracking-display)] uppercase text-text-primary leading-[var(--leading-tight)] mb-8">
        {t('timelineTitle')}
      </h2>

      <div className="flex flex-col divide-y divide-[var(--border-color)] border-y border-[var(--border-color)]">
        {milestones.map((m) => (
          <article
            key={m.year}
            className="grid grid-cols-1 sm:grid-cols-[140px_1fr] gap-2 sm:gap-8 py-6"
          >
            {/* The year itself is the graphic element */}
            <p className="font-display text-4xl sm:text-5xl text-club-blue tracking-[var(--tracking-display)] leading-none">
              {m.year}
            </p>
            <div>
              <h3 className="font-heading font-bold text-base sm:text-lg text-text-primary mb-1">
                {m.title}
              </h3>
              <p className="text-sm text-text-secondary leading-relaxed max-w-[70ch]">
                {m.description}
              </p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
