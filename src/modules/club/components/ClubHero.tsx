'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import { useTranslations } from 'next-intl';

export function ClubHero() {
  const t = useTranslations('club');
  const sectionRef = useRef<HTMLElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function onScroll() {
      const section = sectionRef.current;
      if (!section) return;

      const rect = section.getBoundingClientRect();
      const sectionH = section.offsetHeight;
      if (rect.bottom < 0 || rect.top > window.innerHeight) return;

      const scrolled = -rect.top;
      const progress = Math.max(0, Math.min(scrolled / sectionH, 1));

      if (bgRef.current) {
        bgRef.current.style.transform = `translateY(${progress * 80}px) scale(${1 + progress * 0.08})`;
      }
      if (logoRef.current) {
        logoRef.current.style.transform = `translateY(${progress * 40}px) scale(${1 - progress * 0.15})`;
        logoRef.current.style.opacity = `${1 - progress * 0.8}`;
      }
      if (textRef.current) {
        textRef.current.style.transform = `translateY(${progress * 60}px)`;
        textRef.current.style.opacity = `${1 - progress * 1.2}`;
      }
    }

    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <section ref={sectionRef} className="relative w-full overflow-hidden bg-dark-navy h-[50vh] sm:h-[60vh] lg:h-[70vh] flex items-center justify-center">
      {/* Background layer — moves slowest */}
      <div ref={bgRef} className="absolute inset-0 will-change-transform">
        <div className="absolute inset-0 opacity-[0.07]" style={{
          backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 35px, rgba(255,255,255,0.05) 35px, rgba(255,255,255,0.05) 70px)',
        }} />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(0,157,218,0.08)_0%,_transparent_70%)]" />
      </div>

      {/* Gradient overlays */}
      <div className="absolute inset-0 bg-gradient-to-b from-dark-navy/40 via-transparent to-dark-navy" />

      {/* Logo layer — moves at medium speed */}
      <div ref={logoRef} className="absolute z-[5] will-change-transform">
        <div className="animate-scale-in">
          <Image
            src="/images/logo.png"
            alt="Thép Xanh Nam Định FC"
            width={200}
            height={200}
            className="mx-auto size-40 sm:size-48 lg:size-56 drop-shadow-2xl opacity-[0.06]"
            aria-hidden="true"
            loading="lazy"
          />
        </div>
      </div>

      {/* Text layer — moves fastest */}
      <div ref={textRef} className="relative z-10 text-center px-4 will-change-transform">
        {/* Logo */}
        <div className="animate-scale-in mb-6">
          <Image
            src="/images/logo.png"
            alt="Thép Xanh Nam Định FC"
            width={120}
            height={120}
            className="mx-auto size-24 sm:size-28 lg:size-32 drop-shadow-lg"
            priority
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
