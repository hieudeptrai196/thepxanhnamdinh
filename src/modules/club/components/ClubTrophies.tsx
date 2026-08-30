'use client';

import { useTranslations } from 'next-intl';
import { useScrollReveal } from './useScrollReveal';

const trophies = [
  { titleVi: 'Vô địch Quốc gia A1', titleEn: 'A1 National Championship', year: '1985', icon: '🏆' },
  { titleVi: 'Vô địch V.League 2', titleEn: 'V.League 2 Championship', year: '2017', icon: '🥇' },
  { titleVi: 'Vô địch V.League 1', titleEn: 'V.League 1 Championship', year: '2023-24', icon: '🏆' },
  { titleVi: 'Vô địch V.League 1', titleEn: 'V.League 1 Championship', year: '2024-25', icon: '🏆' },
];

export function ClubTrophies() {
  const t = useTranslations('club');
  const { ref, visible } = useScrollReveal(0.2);

  return (
    <section ref={ref} className="py-12 lg:py-16">
      <h2 className={`font-display text-[var(--text-section)] tracking-[var(--tracking-display)] uppercase text-text-primary leading-[var(--leading-tight)] text-center mb-10 ${
        visible ? 'animate-fade-in-up' : 'opacity-0'
      }`}>
        {t('trophiesTitle')}
      </h2>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {trophies.map((trophy, i) => (
          <div
            key={`${trophy.year}-${i}`}
            className={`group text-center p-6 sm:p-8 rounded-[var(--radius-default)] bg-bg-secondary border border-[var(--border-color)] hover:border-club-blue/30 transition-all duration-300 hover:shadow-card hover:-translate-y-1 ${
              visible ? `animate-scale-in` : 'opacity-0'
            }`}
            style={{ animationDelay: `${i * 0.12}s` }}
          >
            <div className="text-4xl sm:text-5xl mb-3 transition-transform duration-300 group-hover:scale-110">
              {trophy.icon}
            </div>
            <div className="font-display text-xl sm:text-2xl text-club-blue tracking-wider mb-1">
              {trophy.year}
            </div>
            <h3 className="font-heading font-semibold text-text-primary text-xs sm:text-sm uppercase tracking-wide">
              {trophy.titleVi}
            </h3>
          </div>
        ))}
      </div>
    </section>
  );
}
