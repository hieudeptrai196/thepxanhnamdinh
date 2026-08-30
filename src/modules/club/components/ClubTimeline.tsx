'use client';

import { useEffect, useRef, useState } from 'react';
import { useTranslations } from 'next-intl';
import { useScrollReveal } from './useScrollReveal';

const milestones = [
  { year: '1965', titleVi: 'Thành lập CLB', descVi: 'Thành lập với tên gọi Thanh niên Nam Hà' },
  { year: '1985', titleVi: 'Vô địch quốc gia', descVi: 'Vô địch giải A1 toàn quốc với mùa giải bất bại — kỳ tích hiếm có trong lịch sử bóng đá Việt Nam' },
  { year: '1997', titleVi: 'Đổi tên Nam Định', descVi: 'CLB chính thức mang tên thành phố Nam Định' },
  { year: '2017', titleVi: 'Vô địch V.League 2', descVi: 'Giành chức vô địch hạng Nhất, trở lại sân chơi V.League 1 sau 6 năm' },
  { year: '2022', titleVi: 'SEA Games 31', descVi: 'Sân Thiên Trường được nâng cấp và vinh dự đăng cai tổ chức bảng đấu bóng đá nam SEA Games 31' },
  { year: '2024', titleVi: 'Vô địch V.League 1', descVi: 'Đăng quang ngôi vô địch V.League 1 sau 39 năm chờ đợi với chiến thắng 5-1 trước Khánh Hoà' },
  { year: '2025', titleVi: 'Bảo vệ ngôi vương', descVi: 'Bảo vệ thành công chức vô địch V.League 1, trở thành nhà vô địch hai mùa liên tiếp' },
];

export function ClubTimeline() {
  const t = useTranslations('club');
  const { ref, visible } = useScrollReveal(0.05);
  const containerRef = useRef<HTMLDivElement>(null);
  const [lineProgress, setLineProgress] = useState(0);
  const [revealedItems, setRevealedItems] = useState<boolean[]>(new Array(milestones.length).fill(false));

  useEffect(() => {
    if (!visible) return;

    function onScroll() {
      const container = containerRef.current;
      if (!container) return;

      const rect = container.getBoundingClientRect();
      const windowH = window.innerHeight;
      const containerH = container.offsetHeight;

      const visibleTop = Math.max(0, windowH - rect.top);
      const progress = Math.min(visibleTop / (containerH + windowH * 0.3), 1);
      setLineProgress(progress);

      const items = container.querySelectorAll('[data-milestone]');
      const newRevealed = [...revealedItems];
      items.forEach((item, i) => {
        const itemRect = item.getBoundingClientRect();
        if (itemRect.top < windowH * 0.75) {
          newRevealed[i] = true;
        }
      });
      setRevealedItems(newRevealed);
    }

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, [visible]);

  return (
    <section ref={ref} className="py-12 lg:py-16">
      <h2 className={`font-display text-[var(--text-section)] tracking-[var(--tracking-display)] uppercase text-text-primary leading-[var(--leading-tight)] text-center mb-10 lg:mb-14 ${
        visible ? 'animate-fade-in-up' : 'opacity-0'
      }`}>
        {t('historyTitle')}
      </h2>

      <div ref={containerRef} className="relative max-w-3xl mx-auto">
        {/* Static background line */}
        <div className="absolute left-6 sm:left-1/2 top-0 bottom-0 w-px bg-[var(--border-color)] sm:-translate-x-px" />

        {/* Animated drawing line */}
        <div
          className="absolute left-6 sm:left-1/2 top-0 w-px bg-club-blue sm:-translate-x-px origin-top transition-none"
          style={{
            height: `${lineProgress * 100}%`,
            boxShadow: '0 0 8px rgba(0, 157, 218, 0.4)',
          }}
        />

        {milestones.map((m, i) => {
          const isLeft = i % 2 === 0;
          const isRevealed = revealedItems[i];

          return (
            <div
              key={m.year}
              data-milestone
              className="relative flex items-start mb-8 lg:mb-12"
            >
              {/* Mobile layout */}
              <div className="sm:hidden flex items-start gap-4 w-full pl-2">
                <div className="relative z-10 mt-1.5 shrink-0">
                  <div className={`size-3 rounded-full ring-4 ring-[var(--bg-primary)] transition-all duration-500 ${
                    isRevealed ? 'bg-club-blue scale-100' : 'bg-[var(--border-color)] scale-75'
                  }`} />
                  {isRevealed && (
                    <div className="absolute inset-0 size-3 rounded-full bg-club-blue animate-[ripple_1s_ease-out]" />
                  )}
                </div>
                <div className={`bg-bg-secondary border border-[var(--border-color)] rounded-[var(--radius-default)] p-4 flex-1 hover:shadow-card transition-all duration-500 ${
                  isRevealed ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-4'
                }`}>
                  <span className="font-display text-xl text-club-blue tracking-wider">{m.year}</span>
                  <h3 className="font-heading font-bold text-text-primary text-sm mt-1">{m.titleVi}</h3>
                  <p className="text-xs text-text-secondary mt-1 leading-relaxed">{m.descVi}</p>
                </div>
              </div>

              {/* Desktop layout */}
              <div className="hidden sm:grid sm:grid-cols-[1fr_auto_1fr] sm:gap-6 w-full items-start">
                <div className={`${isLeft ? '' : 'order-3'}`}>
                  {isLeft && (
                    <div className={`bg-bg-secondary border border-[var(--border-color)] rounded-[var(--radius-default)] p-5 text-right hover:shadow-card transition-all duration-600 hover:-translate-y-0.5 ${
                      isRevealed ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'
                    }`}>
                      <span className="font-display text-2xl text-club-blue tracking-wider">{m.year}</span>
                      <h3 className="font-heading font-bold text-text-primary mt-1">{m.titleVi}</h3>
                      <p className="text-sm text-text-secondary mt-1 leading-relaxed">{m.descVi}</p>
                    </div>
                  )}
                </div>

                <div className="relative z-10 flex items-center justify-center mt-2">
                  <div className={`size-4 rounded-full ring-4 ring-[var(--bg-primary)] shadow-md transition-all duration-500 ${
                    isRevealed ? 'bg-club-blue scale-100' : 'bg-[var(--border-color)] scale-50'
                  }`} />
                  {isRevealed && (
                    <>
                      <div className="absolute size-4 rounded-full bg-club-blue/40 animate-[ripple_1.2s_ease-out]" />
                      <div className="absolute size-4 rounded-full bg-club-blue/20 animate-[ripple_1.2s_ease-out_0.2s]" />
                    </>
                  )}
                </div>

                <div className={`${isLeft ? 'order-3' : ''}`}>
                  {!isLeft && (
                    <div className={`bg-bg-secondary border border-[var(--border-color)] rounded-[var(--radius-default)] p-5 hover:shadow-card transition-all duration-600 hover:-translate-y-0.5 ${
                      isRevealed ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'
                    }`}>
                      <span className="font-display text-2xl text-club-blue tracking-wider">{m.year}</span>
                      <h3 className="font-heading font-bold text-text-primary mt-1">{m.titleVi}</h3>
                      <p className="text-sm text-text-secondary mt-1 leading-relaxed">{m.descVi}</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
