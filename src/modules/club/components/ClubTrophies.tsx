'use client';

import { useCallback, useRef } from 'react';
import { useTranslations } from 'next-intl';
import { useScrollReveal } from './useScrollReveal';

const trophies = [
  { titleVi: 'Vô địch Quốc gia A1', titleEn: 'A1 National Championship', year: '1985', icon: '🏆' },
  { titleVi: 'Vô địch V.League 2', titleEn: 'V.League 2 Championship', year: '2017', icon: '🥇' },
  { titleVi: 'Vô địch V.League 1', titleEn: 'V.League 1 Championship', year: '2023-24', icon: '🏆' },
  { titleVi: 'Vô địch V.League 1', titleEn: 'V.League 1 Championship', year: '2024-25', icon: '🏆' },
];

function TrophyCard({ trophy, i, visible }: { trophy: typeof trophies[0]; i: number; visible: boolean }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const glintRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const card = cardRef.current;
    const glint = glintRef.current;
    if (!card || !glint) return;

    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((y - centerY) / centerY) * -12;
    const rotateY = ((x - centerX) / centerX) * 12;

    card.style.transform = `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.03)`;
    glint.style.background = `radial-gradient(circle at ${x}px ${y}px, rgba(255,255,255,0.15) 0%, transparent 60%)`;
  }, []);

  const handleMouseLeave = useCallback(() => {
    const card = cardRef.current;
    const glint = glintRef.current;
    if (!card || !glint) return;

    card.style.transform = 'perspective(800px) rotateX(0deg) rotateY(0deg) scale(1)';
    glint.style.background = 'transparent';
  }, []);

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`relative text-center p-6 sm:p-8 rounded-[var(--radius-default)] bg-bg-secondary border border-[var(--border-color)] hover:border-club-blue/30 transition-[border,box-shadow] duration-300 hover:shadow-card will-change-transform ${
        visible ? 'animate-scale-in' : 'opacity-0'
      }`}
      style={{
        animationDelay: `${i * 0.12}s`,
        transformStyle: 'preserve-3d',
        transition: 'transform 0.15s ease-out, border-color 0.3s, box-shadow 0.3s',
      }}
    >
      {/* Light glint overlay */}
      <div
        ref={glintRef}
        className="absolute inset-0 rounded-[var(--radius-default)] pointer-events-none z-10"
        style={{ transition: 'background 0.15s ease-out' }}
      />

      <div className="text-4xl sm:text-5xl mb-3" style={{ transform: 'translateZ(30px)' }}>
        {trophy.icon}
      </div>
      <div className="font-display text-xl sm:text-2xl text-club-blue tracking-wider mb-1" style={{ transform: 'translateZ(20px)' }}>
        {trophy.year}
      </div>
      <h3 className="font-heading font-semibold text-text-primary text-xs sm:text-sm uppercase tracking-wide" style={{ transform: 'translateZ(10px)' }}>
        {trophy.titleVi}
      </h3>
    </div>
  );
}

export function ClubTrophies() {
  const t = useTranslations('club');
  const { ref, visible } = useScrollReveal(0.2);

  return (
    <section ref={ref} className="py-12 lg:py-16">
      <h2 className={`font-display text-[var(--text-section)] tracking-[var(--tracking-display)] uppercase text-text-primary leading-[var(--leading-tight)] text-center mb-10 ${
        visible ? 'animate-fade-in-up' : 'opacity-0'
      }`}>
        {t('trophiesTitle')}
      </h2>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {trophies.map((trophy, i) => (
          <TrophyCard key={`${trophy.year}-${i}`} trophy={trophy} i={i} visible={visible} />
        ))}
      </div>
    </section>
  );
}
