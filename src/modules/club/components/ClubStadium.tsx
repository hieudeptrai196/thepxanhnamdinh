'use client';

import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { LazyMount, Skeleton } from '@/shared/components/ui';
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

      {/* Stadium image — links to Google Images search */}
      <a
        href="https://www.google.com/search?q=s%C3%A2n+v%E1%BA%ADn+%C4%91%E1%BB%99ng+thi%C3%AAn+tr%C6%B0%E1%BB%9Dng+nam+%C4%91%E1%BB%8Bnh&tbm=isch"
        target="_blank"
        rel="noopener noreferrer"
        className={`block relative w-full aspect-[4/3] sm:aspect-[16/9] lg:aspect-[21/9] rounded-[var(--radius-default)] overflow-hidden mb-8 group ${
          visible ? 'animate-fade-in-up stagger-1' : 'opacity-0'
        }`}
      >
        <Image
          src="/images/stadium/sanvandong.webp"
          alt={t('stadiumTitle')}
          fill
          className="object-cover animate-[kenburns_20s_ease-in-out_infinite_alternate] transition-transform duration-300 group-hover:scale-105"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-dark-navy/60 to-transparent" />
        <div className="absolute bottom-4 left-4 sm:bottom-6 sm:left-6">
          <p className="font-display text-xl sm:text-2xl text-white tracking-wider uppercase">
            Thiên Trường
          </p>
          <p className="text-xs sm:text-sm text-white/70 font-mono mt-1">~30,000 · Nam Định</p>
        </div>
      </a>

      {/* Description */}
      <div className={`max-w-3xl mx-auto text-center mb-10 ${visible ? 'animate-fade-in-up stagger-2' : 'opacity-0'}`}>
        <p className="text-sm sm:text-base text-text-secondary leading-relaxed">
          {t('stadiumDesc')}
        </p>
      </div>

      {/* Google Maps — the iframe is only mounted once it nears the viewport,
          so the map never loads on initial page render */}
      <LazyMount
        rootMargin="300px"
        className={`w-full aspect-[4/3] sm:aspect-[16/9] lg:aspect-[21/9] rounded-[var(--radius-default)] overflow-hidden mb-8 ${
          visible ? 'animate-fade-in-up stagger-3' : 'opacity-0'
        }`}
        fallback={<Skeleton className="w-full h-full" />}
      >
        <iframe
          title={t('stadiumTitle')}
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3738.703122151244!2d106.17744967562135!3d20.436294707863045!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3135e7471458090d%3A0xc7cf9a0dbd3dad0d!2zU8OibiB24bqtbiDEkeG7mW5nIFRoacOqbiBUcsaw4budbmc!5e0!3m2!1svi!2s!4v1788085702131!5m2!1svi!2s"
          width="100%"
          height="100%"
          className="border-0 w-full h-full"
          allowFullScreen
          loading="lazy"
          referrerPolicy="strict-origin-when-cross-origin"
        />
      </LazyMount>

      {/* Facts grid */}
      <div className="grid sm:grid-cols-3 gap-4 sm:gap-6">
        {facts.map((fact, i) => (
          <div
            key={fact}
            className={`p-5 sm:p-6 rounded-[var(--radius-default)] bg-bg-secondary border border-[var(--border-color)] hover:shadow-card transition-all duration-300 hover:-translate-y-0.5 ${
              visible ? 'animate-fade-in-up' : 'opacity-0'
            }`}
            style={{ animationDelay: `${0.4 + i * 0.15}s` }}
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
