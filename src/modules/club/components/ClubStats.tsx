'use client';

import { useTranslations } from 'next-intl';
import { useScrollReveal } from './useScrollReveal';
import { CountUp } from './CountUp';

const stats = [
  { key: 'statFounded', value: 1965, suffix: '' },
  { key: 'statTitles', value: 3, suffix: '' },
  { key: 'statCapacity', value: 30000, suffix: '' },
  { key: 'statSeasons', value: 9, suffix: '+' },
];

export function ClubStats() {
  const t = useTranslations('club');
  const { ref, visible } = useScrollReveal(0.3);

  return (
    <section ref={ref} className="py-12 lg:py-16">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {stats.map(({ key, value, suffix }, i) => (
          <div
            key={key}
            className={`text-center p-6 sm:p-8 rounded-[var(--radius-default)] bg-bg-secondary border border-[var(--border-color)] transition-all duration-500 hover:shadow-card hover:-translate-y-1 ${
              visible ? `animate-fade-in-up stagger-${i + 1}` : 'opacity-0'
            }`}
          >
            <div className="font-display text-3xl sm:text-4xl lg:text-5xl text-club-blue tracking-[var(--tracking-display)]">
              <CountUp end={value} active={visible} suffix={suffix} />
            </div>
            <p className="mt-2 text-xs sm:text-sm font-heading font-semibold text-text-secondary uppercase tracking-wider">
              {t(key)}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
