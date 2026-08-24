'use client';

import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { Button } from '@/shared/components/ui/Button';
import { Container } from '@/shared/components/ui/Container';

const BANNER_SRC =
  '/images/common/banners/485140479_1055513036607122_4214485283417037742_n.png';

export function HeroSection() {
  const t = useTranslations('hero');

  return (
    <section className="bg-dark-navy pt-6 lg:pt-10">
      <Container>
        {/* Banner — contained illustration */}
        <div className="relative w-full">
          <Image
            src={BANNER_SRC}
            alt="Thép Xanh Nam Định FC"
            width={2048}
            height={1251}
            className="w-full h-auto"
            priority
            sizes="(max-width: 1400px) 100vw, 1400px"
          />
        </div>

        {/* Content below banner */}
        <div className="py-10 lg:py-14">
          <div className="max-w-2xl">
            <p className="font-heading font-semibold text-sm uppercase tracking-[var(--tracking-label)] text-club-blue mb-3">
              {t('subheadline')}
            </p>
            <h1 className="font-display text-[var(--text-section)] tracking-[var(--tracking-display)] uppercase text-white leading-[var(--leading-tight)]">
              {t('headline')}
            </h1>
            <div className="mt-6">
              <Button variant="primary" size="lg">
                {t('cta')}
              </Button>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
