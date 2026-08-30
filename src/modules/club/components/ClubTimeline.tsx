'use client';

import { useTranslations } from 'next-intl';
import { useScrollReveal } from './useScrollReveal';

const milestones = [
  { year: '1965', titleVi: 'Thành lập CLB', titleEn: 'Club Founded', descVi: 'Thành lập với tên gọi Thanh niên Nam Hà', descEn: 'Founded as Thanh Niên Nam Hà' },
  { year: '1985', titleVi: 'Vô địch quốc gia', titleEn: 'National Champions', descVi: 'Vô địch giải A1 toàn quốc với mùa giải bất bại — kỳ tích hiếm có trong lịch sử bóng đá Việt Nam', descEn: 'Won A1 National Championship with an unbeaten season — one of only two clubs to achieve this in Vietnamese football' },
  { year: '1997', titleVi: 'Đổi tên Nam Định', titleEn: 'Renamed Nam Định', descVi: 'CLB chính thức mang tên thành phố Nam Định', descEn: 'Club officially takes the name of Nam Định city' },
  { year: '2017', titleVi: 'Vô địch V.League 2', titleEn: 'V.League 2 Champions', descVi: 'Giành chức vô địch hạng Nhất, trở lại sân chơi V.League 1 sau 6 năm', descEn: 'Won the First Division championship, returning to V.League 1 after 6 years' },
  { year: '2022', titleVi: 'SEA Games 31', titleEn: 'SEA Games 31', descVi: 'Sân Thiên Trường được nâng cấp và vinh dự đăng cai tổ chức bảng đấu bóng đá nam SEA Games 31', descEn: 'Thiên Trường Stadium upgraded and hosted men\'s football group-stage matches at SEA Games 31' },
  { year: '2024', titleVi: 'Vô địch V.League 1', titleEn: 'V.League 1 Champions', descVi: 'Đăng quang ngôi vô địch V.League 1 sau 39 năm chờ đợi với chiến thắng 5-1 trước Khánh Hoà', descEn: 'Crowned V.League 1 champions after 39 years with a 5-1 victory over Khánh Hoà' },
  { year: '2025', titleVi: 'Bảo vệ ngôi vương', titleEn: 'Title Defence', descVi: 'Bảo vệ thành công chức vô địch V.League 1, trở thành nhà vô địch hai mùa liên tiếp', descEn: 'Successfully defended V.League 1 title, becoming back-to-back champions' },
];

export function ClubTimeline() {
  const t = useTranslations('club');
  const { ref, visible } = useScrollReveal(0.1);

  return (
    <section ref={ref} className="py-12 lg:py-16">
      <h2 className={`font-display text-[var(--text-section)] tracking-[var(--tracking-display)] uppercase text-text-primary leading-[var(--leading-tight)] text-center mb-10 lg:mb-14 ${
        visible ? 'animate-fade-in-up' : 'opacity-0'
      }`}>
        {t('historyTitle')}
      </h2>

      <div className="relative max-w-3xl mx-auto">
        {/* Vertical line */}
        <div className="absolute left-6 sm:left-1/2 top-0 bottom-0 w-px bg-[var(--border-color)] sm:-translate-x-px" />

        {milestones.map((m, i) => {
          const isLeft = i % 2 === 0;
          return (
            <div
              key={m.year}
              className={`relative flex items-start mb-8 lg:mb-12 ${
                visible ? `${isLeft ? 'animate-fade-in-left' : 'animate-fade-in-right'}` : 'opacity-0'
              }`}
              style={{ animationDelay: `${i * 0.15}s` }}
            >
              {/* Mobile layout: all items on right side */}
              <div className="sm:hidden flex items-start gap-4 w-full pl-2">
                {/* Dot */}
                <div className="relative z-10 mt-1.5 shrink-0">
                  <div className="size-3 rounded-full bg-club-blue ring-4 ring-[var(--bg-primary)]" />
                </div>
                {/* Content */}
                <div className="bg-bg-secondary border border-[var(--border-color)] rounded-[var(--radius-default)] p-4 flex-1 hover:shadow-card transition-shadow">
                  <span className="font-display text-xl text-club-blue tracking-wider">{m.year}</span>
                  <h3 className="font-heading font-bold text-text-primary text-sm mt-1">{m.titleVi}</h3>
                  <p className="text-xs text-text-secondary mt-1 leading-relaxed">{m.descVi}</p>
                </div>
              </div>

              {/* Desktop layout: alternating */}
              <div className="hidden sm:grid sm:grid-cols-[1fr_auto_1fr] sm:gap-6 w-full items-start">
                {/* Left content */}
                <div className={`${isLeft ? '' : 'order-3'}`}>
                  {isLeft && (
                    <div className="bg-bg-secondary border border-[var(--border-color)] rounded-[var(--radius-default)] p-5 text-right hover:shadow-card transition-shadow hover:-translate-y-0.5 transition-transform duration-300">
                      <span className="font-display text-2xl text-club-blue tracking-wider">{m.year}</span>
                      <h3 className="font-heading font-bold text-text-primary mt-1">{m.titleVi}</h3>
                      <p className="text-sm text-text-secondary mt-1 leading-relaxed">{m.descVi}</p>
                    </div>
                  )}
                </div>

                {/* Dot */}
                <div className="relative z-10 flex items-center justify-center mt-2">
                  <div className="size-4 rounded-full bg-club-blue ring-4 ring-[var(--bg-primary)] shadow-md" />
                </div>

                {/* Right content */}
                <div className={`${isLeft ? 'order-3' : ''}`}>
                  {!isLeft && (
                    <div className="bg-bg-secondary border border-[var(--border-color)] rounded-[var(--radius-default)] p-5 hover:shadow-card transition-shadow hover:-translate-y-0.5 transition-transform duration-300">
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
