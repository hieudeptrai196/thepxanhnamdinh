'use client';

import { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { Button } from '@/shared/components/ui/Button';

type Banner = {
  src: string;
  alt: string;
  href?: string;
};

const banners: Banner[] = [
  {
    src: '/images/common/banners/485140479_1055513036607122_4214485283417037742_n.png',
    alt: 'Thép Xanh Nam Định FC',
  },
  {
    src: '/images/common/banners/642413932_1576185250716022_4649655387200941555_n.jpg',
    alt: 'Sân Thiên Trường',
    href: '#',
  },
];

const AUTOPLAY_MS = 5000;

export function HeroSection() {
  const t = useTranslations('hero');
  const [current, setCurrent] = useState(0);
  const [paused, setPaused] = useState(false);
  const total = banners.length;
  const isSingle = total <= 1;

  const goTo = useCallback(
    (index: number) => setCurrent(((index % total) + total) % total),
    [total],
  );

  useEffect(() => {
    if (isSingle || paused) return;
    const id = setInterval(() => setCurrent((p) => (p + 1) % total), AUTOPLAY_MS);
    return () => clearInterval(id);
  }, [isSingle, paused, total]);

  return (
    <section
      className="relative w-full overflow-hidden bg-dark-navy h-[50vh] sm:h-[60vh] lg:h-[75vh]"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* Slides */}
      <div
        className="flex h-full transition-transform duration-500 ease-out"
        style={{ transform: `translateX(-${current * 100}%)` }}
      >
        {banners.map((banner, i) => {
          const Slide = banner.href ? 'a' : 'div';
          const slideProps = banner.href ? { href: banner.href } : {};

          return (
            <Slide key={banner.src} {...slideProps} className="relative w-full h-full shrink-0">
              <Image
                src={banner.src}
                alt={banner.alt}
                fill
                className="object-cover object-center"
                priority={i === 0}
                sizes="100vw"
              />
            </Slide>
          );
        })}
      </div>

      {/* Bottom blur gradient */}
      <div className="absolute inset-x-0 bottom-0 h-32 lg:h-40 bg-gradient-to-t from-dark-navy/90 via-dark-navy/50 to-transparent backdrop-blur-[2px] [mask-image:linear-gradient(to_top,black_60%,transparent)]" />

      {/* Bottom overlay: CTA + bar indicators */}
      <div className="absolute inset-x-0 bottom-0 pb-5 px-5 lg:pb-8 lg:px-12">
        <div className="flex items-end justify-between gap-4">
          <Button variant="primary" size="lg">
            {t('cta')}
          </Button>

          {/* Bar indicators */}
          {!isSingle && (
            <div className="flex gap-1.5">
              {banners.map((_, i) => (
                <button
                  key={i}
                  onClick={() => goTo(i)}
                  className={`h-1 rounded-full transition-all duration-300 ${
                    i === current
                      ? 'w-8 bg-white'
                      : 'w-4 bg-white/40 hover:bg-white/70'
                  }`}
                  aria-label={`Go to slide ${i + 1}`}
                />
              ))}
            </div>
          )}
        </div>
      </div>

    </section>
  );
}
