'use client';

import { useTranslations } from 'next-intl';
import { useScrollReveal } from './useScrollReveal';

export function ClubAbout() {
  const t = useTranslations('club');
  const { ref, visible } = useScrollReveal();

  return (
    <section ref={ref} className="py-12 lg:py-16">
      <div className={`max-w-3xl mx-auto text-center ${visible ? 'animate-fade-in-up' : 'opacity-0'}`}>
        <h2 className="font-display text-[length:var(--text-section)] tracking-[var(--tracking-display)] uppercase text-text-primary leading-[var(--leading-tight)] mb-6">
          {t('aboutTitle')}
        </h2>
        <p className="text-base sm:text-lg text-text-secondary leading-relaxed">
          {t('aboutText')}
        </p>
      </div>
    </section>
  );
}
