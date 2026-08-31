'use client';

import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { siteConfig } from '@/config/site';
import { useScrollReveal } from './useScrollReveal';

function FacebookIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M24 12.07C24 5.4 18.63 0 12 0S0 5.4 0 12.07C0 18.1 4.39 23.09 10.13 24v-8.44H7.08v-3.49h3.05V9.41c0-3.02 1.79-4.69 4.53-4.69 1.31 0 2.68.24 2.68.24v2.97h-1.51c-1.49 0-1.96.93-1.96 1.89v2.25h3.33l-.53 3.49h-2.8V24C19.61 23.09 24 18.1 24 12.07Z" />
    </svg>
  );
}

function VerifiedIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 1.5 14.7 4l3.6-.4 1.2 3.45 3.3 1.6-1.1 3.5 1.1 3.5-3.3 1.6-1.2 3.45-3.6-.4L12 22.5 9.3 20l-3.6.4-1.2-3.45-3.3-1.6L2.3 12 1.2 8.5l3.3-1.6L5.7 3.6l3.6.4L12 1.5Zm-1.2 13.9 5.6-5.6-1.5-1.5-4.1 4.1-1.9-1.9-1.5 1.5 3.4 3.4Z" />
    </svg>
  );
}

export function ClubFans() {
  const t = useTranslations('club');
  const { ref, visible } = useScrollReveal(0.15);

  return (
    <section ref={ref} className="py-12 lg:py-16">
      <div className="grid lg:grid-cols-2 gap-6 lg:gap-10 items-center">
        {/* Facebook follow card — rendered locally, no third-party embed */}
        <div
          className={`rounded-[var(--radius-default)] border border-[var(--border-color)] bg-bg-secondary overflow-hidden ${
            visible ? 'animate-fade-in-left' : 'opacity-0'
          }`}
        >
          <div className="p-5 sm:p-6">
            <div className="flex items-center gap-4">
              <div className="relative size-16 shrink-0 rounded-full overflow-hidden bg-dark-navy">
                <Image
                  src="/images/logo.png"
                  alt={t('fansPageName')}
                  fill
                  sizes="64px"
                  className="object-contain p-2"
                />
              </div>
              <div className="min-w-0">
                <div className="flex items-center gap-1.5">
                  <h3 className="font-heading font-bold text-base sm:text-lg text-text-primary truncate">
                    {t('fansPageName')}
                  </h3>
                  <VerifiedIcon className="size-4 text-club-blue shrink-0" />
                </div>
                <p className="text-xs text-text-secondary font-mono mt-0.5 truncate">
                  {t('fansHandle')}
                </p>
              </div>
            </div>

            <a
              href={siteConfig.social.facebook}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-5 w-full inline-flex items-center justify-center gap-2 min-h-[44px] px-5 rounded-[var(--radius-default)] bg-club-blue text-white font-body font-semibold text-sm uppercase tracking-[var(--tracking-label)] hover:bg-club-blue-hover active:bg-club-blue-active transition-colors duration-150"
            >
              <FacebookIcon className="size-4" />
              {t('fansFollowFacebook')}
            </a>
          </div>
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
