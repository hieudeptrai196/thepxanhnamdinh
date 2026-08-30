'use client';

import { useTranslations } from 'next-intl';
import { useScrollReveal } from './useScrollReveal';

export function ClubFans() {
  const t = useTranslations('club');
  const { ref, visible } = useScrollReveal(0.15);

  return (
    <section ref={ref} className="py-12 lg:py-16">
      <div className="grid lg:grid-cols-2 gap-6 lg:gap-10 items-start">
        {/* Facebook Page */}
        <div className={`rounded-[var(--radius-default)] overflow-hidden ${
          visible ? 'animate-fade-in-left' : 'opacity-0'
        }`}>
          <iframe
            src="https://www.facebook.com/plugins/page.php?href=https%3A%2F%2Fwww.facebook.com%2FThepXanhNamDinhFC&tabs=timeline&width=500&height=600&small_header=false&adapt_container_width=true&hide_cover=false&show_facepile=true"
            width="500"
            height="600"
            className="w-full border-0"
            allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
            allowFullScreen
          />
        </div>

        {/* Content */}
        <div className={`${visible ? 'animate-fade-in-right' : 'opacity-0'}`}>
          <h2 className="font-display text-[var(--text-section)] tracking-[var(--tracking-display)] uppercase text-text-primary leading-[var(--leading-tight)] mb-4">
            {t('fansTitle')}
          </h2>
          <p className="text-sm sm:text-base text-text-secondary leading-relaxed">
            {t('fansDesc')}
          </p>

          {/* Decorative stats */}
          <div className="mt-6 flex gap-6">
            <div>
              <div className="font-display text-2xl sm:text-3xl text-club-blue tracking-wider">30,000+</div>
              <p className="text-xs font-heading text-text-secondary uppercase tracking-wider mt-1">CĐV mỗi trận</p>
            </div>
            <div className="w-px bg-[var(--border-color)]" />
            <div>
              <div className="font-display text-2xl sm:text-3xl text-club-blue tracking-wider">39</div>
              <p className="text-xs font-heading text-text-secondary uppercase tracking-wider mt-1">Năm chờ đợi</p>
            </div>
            <div className="w-px bg-[var(--border-color)]" />
            <div>
              <div className="font-display text-2xl sm:text-3xl text-club-blue tracking-wider">61</div>
              <p className="text-xs font-heading text-text-secondary uppercase tracking-wider mt-1">Năm lịch sử</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
