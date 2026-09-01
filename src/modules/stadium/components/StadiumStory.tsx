'use client';

import Image from 'next/image';
import { useTranslations } from 'next-intl';
import type { StadiumData } from '@/shared/types/stadium';

type Props = {
  stadium: StadiumData;
};

export function StadiumStory({ stadium }: Props) {
  const t = useTranslations('stadium');

  const specs = [
    { label: t('capacity'), value: `${stadium.capacity.toLocaleString('vi-VN')} ${t('seats')}` },
    { label: t('pitchSize'), value: stadium.pitchSize },
    { label: t('surface'), value: stadium.surface },
    { label: t('floodlights'), value: stadium.floodlights },
    { label: t('address'), value: stadium.address },
  ];

  return (
    <section className="py-12 lg:py-16">
      {/* Asymmetric split — large image beside a narrower text column */}
      <div className="grid lg:grid-cols-[7fr_5fr] gap-8 lg:gap-12 items-start">
        <div className="relative w-full aspect-[4/3] lg:aspect-[3/2] rounded-[var(--radius-default)] overflow-hidden bg-light-gray">
          <Image
            src="/images/stadium/sanvandong.webp"
            alt={stadium.name}
            fill
            sizes="(max-width: 1024px) 100vw, 58vw"
            className="object-cover"
          />
        </div>

        <div>
          <h2 className="font-display text-[length:var(--text-section)] tracking-[var(--tracking-display)] uppercase text-text-primary leading-[var(--leading-tight)] mb-5">
            {t('storyTitle')}
          </h2>
          <p className="text-base text-text-primary leading-[1.65] mb-4">{t('storyP1')}</p>
          <p className="text-base text-text-secondary leading-[1.65]">{t('storyP2')}</p>

          <h3 className="mt-8 mb-3 text-xs font-heading font-semibold uppercase tracking-[var(--tracking-label)] text-text-secondary">
            {t('specs')}
          </h3>
          <div className="flex flex-col divide-y divide-[var(--border-color)] border-t border-[var(--border-color)]">
            {specs.map((row) => (
              <div key={row.label} className="flex items-start justify-between gap-4 py-3">
                <span className="text-sm text-text-secondary shrink-0">{row.label}</span>
                <span className="text-sm text-text-primary font-heading font-bold text-right">
                  {row.value}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
