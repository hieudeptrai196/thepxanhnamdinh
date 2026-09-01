import Image from 'next/image';
import type { ReactNode } from 'react';

export const ctaClass =
  'inline-flex items-center justify-center min-h-[44px] px-8 rounded-[var(--radius-default)] bg-club-blue text-white font-body font-semibold text-sm uppercase tracking-[var(--tracking-label)] hover:bg-club-blue-hover active:bg-club-blue-active transition-colors duration-150';

type Props = {
  label: string;
  title: string;
  description: string;
  /** Rendered as the CTA — a next-intl Link or a plain next/link, per caller. */
  action: ReactNode;
};

/**
 * Presentational only, no hooks, so it renders identically from the locale
 * not-found (which has i18n) and the root one (which does not). All motion is
 * CSS, one pass — nothing here depends on the client.
 */
export function NotFoundScene({ label, title, description, action }: Props) {
  return (
    <section className="relative flex-1 flex items-center justify-center overflow-hidden bg-dark-navy py-20 lg:py-28">
      {/* Stadium backdrop, well under the texture ceiling */}
      <Image
        src="/images/stadium/sanvandong.webp"
        alt=""
        fill
        sizes="100vw"
        className="object-cover opacity-[0.28]"
        priority
      />
      <div className="absolute inset-0 bg-gradient-to-t from-dark-navy via-dark-navy/75 to-dark-navy/55" />

      {/* The offside line — sweeps left to right once on load. The tilt lives on
          a wrapper because the sweep animates `transform` on the line itself. */}
      <div
        className="absolute left-0 right-0 top-[38%]"
        style={{ transform: 'rotate(-2.5deg)' }}
        aria-hidden="true"
      >
        <div className="h-px bg-club-blue animate-offside-line" />
        <div
          className="h-20 bg-gradient-to-b from-[var(--color-club-blue-15)] to-transparent animate-offside-line"
          style={{ animationDelay: '0.1s' }}
        />
      </div>

      <div className="relative z-10 text-center px-4 max-w-xl">
        {/* Oversized 404 sitting behind the headline */}
        <p className="font-display text-[length:var(--text-number-display)] text-white/[0.16] leading-none select-none animate-fade-in-up">
          404
        </p>

        <div className="-mt-1 sm:-mt-2 lg:-mt-4">
          {/* Linesman flag + label */}
          <div className="flex items-center justify-center gap-2 mb-3 animate-fade-in-up stagger-1">
            <svg className="size-4 shrink-0" viewBox="0 0 16 16" aria-hidden="true">
              <rect x="1" y="1" width="1.4" height="14" fill="rgba(255,255,255,0.5)" />
              <rect x="2.4" y="1.5" width="12" height="8" fill="var(--color-live-red)" />
              <rect x="2.4" y="1.5" width="4" height="4" fill="#fff" />
              <rect x="10.4" y="1.5" width="4" height="4" fill="#fff" />
              <rect x="6.4" y="5.5" width="4" height="4" fill="#fff" />
            </svg>
            <span className="font-mono text-xs uppercase tracking-[var(--tracking-label)] text-white/50">
              {label}
            </span>
          </div>

          <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl text-white tracking-[var(--tracking-display)] uppercase leading-[var(--leading-tight)] animate-fade-in-up stagger-2">
            {title}
          </h1>

          <p className="mt-4 text-sm sm:text-base text-white/60 leading-relaxed animate-fade-in-up stagger-3">
            {description}
          </p>

          <div className="mt-8 animate-fade-in-up stagger-4">{action}</div>
        </div>
      </div>
    </section>
  );
}
