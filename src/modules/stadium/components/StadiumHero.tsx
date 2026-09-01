'use client';

import Image from 'next/image';
import { useTranslations } from 'next-intl';

type Props = {
  ticketUrl: string;
};

export function StadiumHero({ ticketUrl }: Props) {
  const t = useTranslations('stadium');

  return (
    <section className="relative w-full overflow-hidden bg-dark-navy h-[60vh] sm:h-[70vh] lg:h-[80vh] flex items-end">
      <Image
        src="/images/stadium/sanvandong.webp"
        alt={t('heroTitle')}
        fill
        sizes="100vw"
        className="object-cover"
        priority
      />
      {/* Dark Navy based overlay — never pure black, per DESIGN.md */}
      <div className="absolute inset-0 bg-gradient-to-t from-[rgba(7,28,44,0.92)] via-[rgba(7,28,44,0.55)] to-[rgba(7,28,44,0.30)]" />

      <div className="relative z-10 w-full mx-auto max-w-[var(--max-width)] px-4 lg:px-10 pb-12 lg:pb-16">
        <h1 className="animate-fade-in-up font-display text-[length:var(--text-hero)] text-white tracking-[var(--tracking-display)] uppercase leading-[var(--leading-tight)]">
          {t('heroTitle')}
        </h1>
        <p className="animate-fade-in-up stagger-1 mt-2 font-heading text-lg sm:text-xl lg:text-2xl text-club-blue font-semibold uppercase tracking-[var(--tracking-label)]">
          {t('heroSubtitle')}
        </p>

        <a
          href={ticketUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="animate-fade-in-up stagger-2 mt-6 inline-flex items-center justify-center min-h-[44px] px-8 rounded-[var(--radius-default)] bg-club-blue text-white font-body font-semibold text-sm uppercase tracking-[var(--tracking-label)] hover:bg-club-blue-hover active:bg-club-blue-active transition-colors duration-150"
        >
          {t('buyTickets')}
        </a>
      </div>
    </section>
  );
}
