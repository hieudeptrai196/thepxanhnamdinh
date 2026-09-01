'use client';

import Image from 'next/image';
import { useTranslations } from 'next-intl';

export function HistoryHero() {
  const t = useTranslations('history');

  return (
    <section className="relative w-full overflow-hidden bg-dark-navy h-[45vh] sm:h-[55vh] flex items-end">
      {/* Heritage treatment — desaturated, documentary feel */}
      <Image
        src="/images/common/banners/642413932_1576185250716022_4649655387200941555_n.jpg"
        alt=""
        fill
        sizes="100vw"
        className="object-cover"
        style={{ filter: 'var(--image-heritage-grayscale, grayscale(0.85))' }}
        priority
      />
      <div className="absolute inset-0 bg-gradient-to-t from-[rgba(7,28,44,0.92)] via-[rgba(7,28,44,0.45)] to-[rgba(7,28,44,0.18)]" />
      <div className="absolute inset-0 loading-grain opacity-60" />

      <div className="relative z-10 w-full mx-auto max-w-[var(--max-width)] px-4 lg:px-10 pb-10 lg:pb-14">
        <h1 className="animate-fade-in-up font-display text-[length:var(--text-hero)] text-white tracking-[var(--tracking-display)] uppercase leading-[var(--leading-tight)]">
          {t('heroTitle')}
        </h1>
        <p className="animate-fade-in-up stagger-1 mt-2 font-mono text-sm sm:text-base text-white/60 tracking-wider uppercase">
          {t('heroSubtitle')}
        </p>
      </div>
    </section>
  );
}
