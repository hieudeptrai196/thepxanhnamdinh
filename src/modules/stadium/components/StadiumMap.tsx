'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import type { StadiumStand } from '@/shared/types/stadium';

type Props = {
  stands: StadiumStand[];
};

/** Flat top-down plan — no 3D, no perspective, per DESIGN.md. */
const standShapes: Record<StadiumStand['id'], { x: number; y: number; w: number; h: number }> = {
  north: { x: 70, y: 20, w: 260, h: 46 },
  south: { x: 70, y: 194, w: 260, h: 46 },
  west: { x: 20, y: 74, w: 42, h: 112 },
  east: { x: 338, y: 74, w: 42, h: 112 },
};

export function StadiumMap({ stands }: Props) {
  const t = useTranslations('stadium');
  const [activeId, setActiveId] = useState<StadiumStand['id'] | null>(null);

  const active = stands.find((s) => s.id === activeId);

  return (
    <section className="py-12 lg:py-16">
      <h2 className="font-display text-[length:var(--text-section)] tracking-[var(--tracking-display)] uppercase text-text-primary leading-[var(--leading-tight)] mb-2">
        {t('mapTitle')}
      </h2>
      <p className="text-sm text-text-secondary mb-8">{t('mapHint')}</p>

      <div className="grid lg:grid-cols-[1fr_320px] gap-8 items-start">
        <div className="rounded-[var(--radius-default)] bg-bg-secondary border border-[var(--border-color)] p-4 sm:p-6">
          <svg viewBox="0 0 400 260" className="w-full h-auto" role="group" aria-label={t('mapTitle')}>
            {/* Pitch */}
            <rect x="82" y="78" width="236" height="104" rx="2" className="fill-[var(--color-win-green)] opacity-20" />
            <rect x="82" y="78" width="236" height="104" rx="2" fill="none" stroke="currentColor" strokeWidth="1" className="text-text-secondary opacity-40" />
            <line x1="200" y1="78" x2="200" y2="182" stroke="currentColor" strokeWidth="1" className="text-text-secondary opacity-40" />
            <circle cx="200" cy="130" r="18" fill="none" stroke="currentColor" strokeWidth="1" className="text-text-secondary opacity-40" />
            <rect x="82" y="104" width="20" height="52" fill="none" stroke="currentColor" strokeWidth="1" className="text-text-secondary opacity-40" />
            <rect x="298" y="104" width="20" height="52" fill="none" stroke="currentColor" strokeWidth="1" className="text-text-secondary opacity-40" />

            {/* Stands */}
            {stands.map((stand) => {
              const shape = standShapes[stand.id];
              const isActive = stand.id === activeId;
              return (
                <g key={stand.id}>
                  <rect
                    x={shape.x}
                    y={shape.y}
                    width={shape.w}
                    height={shape.h}
                    rx="3"
                    tabIndex={0}
                    role="button"
                    aria-pressed={isActive}
                    aria-label={stand.name}
                    onClick={() => setActiveId(isActive ? null : stand.id)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        setActiveId(isActive ? null : stand.id);
                      }
                    }}
                    className={`cursor-pointer transition-colors duration-150 outline-none ${
                      isActive
                        ? 'fill-club-blue'
                        : 'fill-[var(--border-color)] hover:fill-[var(--color-club-blue-15)]'
                    }`}
                  />
                  <text
                    x={shape.x + shape.w / 2}
                    y={shape.y + shape.h / 2 + 4}
                    textAnchor="middle"
                    className={`font-mono text-[11px] pointer-events-none ${
                      isActive ? 'fill-white' : 'fill-[var(--text-secondary)]'
                    }`}
                  >
                    {stand.id === 'west' ? 'A' : stand.id === 'east' ? 'B' : stand.id === 'north' ? 'C' : 'D'}
                  </text>
                </g>
              );
            })}
          </svg>
        </div>

        {/* Detail panel */}
        <div className="rounded-[var(--radius-default)] bg-bg-secondary border border-[var(--border-color)] p-5 sm:p-6">
          {active ? (
            <>
              <h3 className="font-heading font-bold text-lg text-text-primary mb-1">{active.name}</h3>
              <p className="font-mono text-sm text-club-blue mb-4">
                {active.capacity.toLocaleString('vi-VN')} {t('seats')}
              </p>
              <p className="text-sm text-text-secondary leading-relaxed">{active.description}</p>
            </>
          ) : (
            <div className="flex flex-col divide-y divide-[var(--border-color)]">
              {stands.map((stand) => (
                <button
                  key={stand.id}
                  type="button"
                  onClick={() => setActiveId(stand.id)}
                  className="flex items-center justify-between gap-3 py-3 first:pt-0 last:pb-0 text-left hover:text-club-blue transition-colors duration-150"
                >
                  <span className="text-sm font-heading font-bold text-text-primary">{stand.name}</span>
                  <span className="font-mono text-xs text-text-secondary shrink-0">
                    {stand.capacity.toLocaleString('vi-VN')}
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
