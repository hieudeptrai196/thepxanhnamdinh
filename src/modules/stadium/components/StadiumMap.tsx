'use client';

import { useState } from 'react';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import type { StadiumStand } from '@/shared/types/stadium';

type Props = {
  stands: StadiumStand[];
  map: string;
};

/**
 * Hotspot boxes over the official plan, in percentages of the cropped view
 * below. The source image is a framed poster, so the wrapper trims the border
 * and sponsor strip and shows only the diagram itself.
 */
const hotspots: Record<StadiumStand['id'], { left: string; top: string; width: string; height: string }> = {
  b: { left: '24.7%', top: '16.5%', width: '50.6%', height: '16.4%' },
  d: { left: '8.5%', top: '35.4%', width: '19.5%', height: '38%' },
  c: { left: '71.9%', top: '35.4%', width: '18.8%', height: '38%' },
  a: { left: '22.5%', top: '79.5%', width: '52.8%', height: '16.5%' },
};

export function StadiumMap({ stands, map }: Props) {
  const t = useTranslations('stadium');
  const [activeId, setActiveId] = useState<StadiumStand['id'] | null>(null);

  const active = stands.find((s) => s.id === activeId);

  return (
    <section className="py-12 lg:py-16">
      <h2 className="font-display text-[length:var(--text-section)] tracking-[var(--tracking-display)] uppercase text-text-primary leading-[var(--leading-tight)] mb-2">
        {t('mapTitle')}
      </h2>
      <p className="text-sm text-text-secondary mb-8">{t('mapHint')}</p>

      <div className="grid lg:grid-cols-[1fr_320px] gap-6 lg:gap-8 items-start">
        <div className="rounded-[var(--radius-default)] bg-bg-secondary border border-[var(--border-color)] p-3 sm:p-4">
          <div
            className="relative w-full overflow-hidden rounded-[var(--radius-small)]"
            style={{ aspectRatio: '1864 / 1294' }}
          >
            {/* Oversized inner frame crops the poster border away */}
            <div
              className="absolute"
              style={{ left: '-4.945%', top: '-6.329%', width: '109.89%', height: '126.58%' }}
            >
              <Image
                src={map}
                alt={t('mapTitle')}
                fill
                sizes="(max-width: 1024px) 100vw, 60vw"
                className="object-cover"
              />
            </div>

            {stands.map((stand) => {
              const box = hotspots[stand.id];
              const isActive = stand.id === activeId;
              return (
                <button
                  key={stand.id}
                  type="button"
                  aria-pressed={isActive}
                  aria-label={stand.name}
                  onClick={() => setActiveId(isActive ? null : stand.id)}
                  style={box}
                  className={`absolute rounded-[3px] border-2 transition-colors duration-150 ${
                    isActive
                      ? 'border-club-blue bg-[var(--color-club-blue-15)]'
                      : 'border-transparent hover:border-club-blue hover:bg-[var(--color-club-blue-8)]'
                  }`}
                />
              );
            })}
          </div>
        </div>

        {/* Stand list doubles as the selector on touch devices */}
        <div className="rounded-[var(--radius-default)] bg-bg-secondary border border-[var(--border-color)] p-5 sm:p-6">
          {active ? (
            <>
              <h3 className="font-heading font-bold text-lg text-text-primary mb-3">{active.name}</h3>
              <div className="flex flex-wrap gap-1.5 mb-4">
                {active.sections.map((section) => (
                  <span
                    key={section}
                    className="px-2 py-1 rounded-[var(--radius-badge)] bg-club-blue text-white font-mono text-xs"
                  >
                    {section}
                  </span>
                ))}
              </div>
              <p className="text-sm text-text-secondary leading-relaxed mb-4">{active.description}</p>
              <button
                type="button"
                onClick={() => setActiveId(null)}
                className="text-sm font-heading font-bold text-club-blue hover:text-club-blue-hover transition-colors duration-150"
              >
                ← {t('allStands')}
              </button>
            </>
          ) : (
            <div className="flex flex-col divide-y divide-[var(--border-color)]">
              {stands.map((stand) => (
                <button
                  key={stand.id}
                  type="button"
                  onClick={() => setActiveId(stand.id)}
                  className="flex items-center justify-between gap-3 py-3 first:pt-0 last:pb-0 text-left group"
                >
                  <span className="text-sm font-heading font-bold text-text-primary group-hover:text-club-blue transition-colors duration-150">
                    {stand.name}
                  </span>
                  <span className="font-mono text-xs text-text-secondary shrink-0">
                    {stand.sections.join(' · ')}
                  </span>
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
