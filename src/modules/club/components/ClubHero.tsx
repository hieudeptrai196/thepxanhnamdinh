'use client';

import Image from 'next/image';
import { useTranslations } from 'next-intl';

export function ClubHero() {
  const t = useTranslations('club');

  return (
    <section className="relative w-full overflow-hidden bg-dark-navy h-[50vh] sm:h-[60vh] lg:h-[70vh] flex items-center justify-center">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 35px, rgba(255,255,255,0.03) 35px, rgba(255,255,255,0.03) 70px)',
        }} />
      </div>

      {/* Gradient overlays */}
      <div className="absolute inset-0 bg-gradient-to-b from-dark-navy/40 via-transparent to-dark-navy" />

      {/* Content */}
      <div className="relative z-10 text-center px-4">
        {/* Logo */}
        <div className="animate-scale-in mb-6">
          <Image
            src="/images/logo.png"
            alt="Thép Xanh Nam Định FC"
            width={120}
            height={120}
            className="mx-auto size-24 sm:size-28 lg:size-32 drop-shadow-lg"
          />
        </div>

        {/* Title */}
        <h1 className="animate-fade-in-up stagger-1 font-display text-4xl sm:text-5xl lg:text-7xl text-white tracking-[var(--tracking-display)] uppercase leading-[var(--leading-tight)]">
          {t('heroTitle')}
        </h1>

        {/* Subtitle */}
        <p className="animate-fade-in-up stagger-2 mt-3 sm:mt-4 font-heading text-lg sm:text-xl lg:text-2xl text-club-blue font-semibold italic">
          &ldquo;{t('heroSubtitle')}&rdquo;
        </p>

        {/* Tagline */}
        <p className="animate-fade-in-up stagger-3 mt-3 text-sm sm:text-base font-mono text-white/60 tracking-wider uppercase">
          {t('heroTagline')}
        </p>

        {/* Decorative line */}
        <div className="animate-fade-in-up stagger-4 mt-6 mx-auto w-16 h-0.5 bg-club-blue rounded-full" />
      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-[var(--bg-primary)] to-transparent" />
    </section>
  );
}
