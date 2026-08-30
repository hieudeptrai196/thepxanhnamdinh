'use client';

import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { useScrollReveal } from './useScrollReveal';

const facts = ['stadiumFact1', 'stadiumFact2', 'stadiumFact3'] as const;

export function ClubStadium() {
  const t = useTranslations('club');
  const { ref, visible } = useScrollReveal(0.1);

  return (
    <section ref={ref} className="py-12 lg:py-16">
      <h2 className={`font-display text-[var(--text-section)] tracking-[var(--tracking-display)] uppercase text-text-primary leading-[var(--leading-tight)] text-center mb-10 ${
        visible ? 'animate-fade-in-up' : 'opacity-0'
      }`}>
        {t('stadiumTitle')}
      </h2>

      {/* Stadium image */}
      <div className={`relative w-full aspect-[21/9] rounded-[var(--radius-default)] overflow-hidden mb-8 ${
        visible ? 'animate-fade-in-up stagger-1' : 'opacity-0'
      }`}>
        <Image
          src="/images/common/banners/642413932116627n.jpg"
          alt={t('stadiumTitle')}
          fill
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-dark-navy/60 to-transparent" />
        <div className="absolute bottom-4 left-4 sm:bottom-6 sm:left-6">
          <p className="font-display text-xl sm:text-2xl text-white tracking-wider uppercase">
            Thiên Trường
          </p>
          <p className="text-xs sm:text-sm text-white/70 font-mono mt-1">~30,000 · Nam Định</p>
        </div>
      </div>

      {/* Description */}
      <div className={`max-w-3xl mx-auto text-center mb-10 ${visible ? 'animate-fade-in-up stagger-2' : 'opacity-0'}`}>
        <p className="text-sm sm:text-base text-text-secondary leading-relaxed">
          {t('stadiumDesc')}
        </p>
      </div>

      {/* Facts grid */}
      <div className="grid sm:grid-cols-3 gap-4 sm:gap-6">
        {facts.map((fact, i) => (
          <div
            key={fact}
            className={`p-5 sm:p-6 rounded-[var(--radius-default)] bg-bg-secondary border border-[var(--border-color)] hover:shadow-card transition-all duration-300 hover:-translate-y-0.5 ${
              visible ? 'animate-fade-in-up' : 'opacity-0'
            }`}
            style={{ animationDelay: `${0.3 + i * 0.15}s` }}
          >
            <h3 className="font-heading font-bold text-text-primary text-sm sm:text-base mb-2">
              {t(`${fact}Title`)}
            </h3>
            <p className="text-xs sm:text-sm text-text-secondary leading-relaxed">
              {t(`${fact}Desc`)}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
