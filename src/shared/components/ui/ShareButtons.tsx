'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { siteConfig } from '@/config/site';

type Props = {
  /** Absolute URL, or a site-relative path resolved against `siteConfig.url`. */
  url: string;
  title: string;
  className?: string;
};

function IconFacebook({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M24 12.07C24 5.4 18.63 0 12 0S0 5.4 0 12.07C0 18.1 4.39 23.09 10.13 24v-8.44H7.08v-3.49h3.05V9.41c0-3.02 1.79-4.69 4.53-4.69 1.31 0 2.68.24 2.68.24v2.97h-1.51c-1.49 0-1.96.93-1.96 1.89v2.25h3.33l-.53 3.49h-2.8V24C19.61 23.09 24 18.1 24 12.07Z" />
    </svg>
  );
}

function IconX({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M18.24 2.25h3.31l-7.23 8.26 8.5 11.24h-6.65l-5.22-6.82-5.96 6.82H1.68l7.73-8.84L1.25 2.25h6.82l4.71 6.23 5.46-6.23Zm-1.16 17.52h1.83L7.01 4.13H5.05l12.03 15.64Z" />
    </svg>
  );
}

function IconLink({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d="M13.19 8.69a4.5 4.5 0 0 1 0 6.36l-3 3a4.5 4.5 0 0 1-6.36-6.36l1.5-1.5" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M10.81 15.31a4.5 4.5 0 0 1 0-6.36l3-3a4.5 4.5 0 0 1 6.36 6.36l-1.5 1.5" />
    </svg>
  );
}

const buttonClass =
  'inline-flex items-center justify-center size-10 rounded-[var(--radius-default)] border border-[var(--border-color)] text-text-secondary hover:text-club-blue hover:border-club-blue transition-colors duration-150';

export function ShareButtons({ url, title, className }: Props) {
  const t = useTranslations('common');
  const [copied, setCopied] = useState(false);

  // Built from the configured site URL rather than `window.location`, so the
  // server and the client produce the same string (no hydration mismatch) and
  // shared links always point at the real domain instead of localhost.
  const absoluteUrl = url.startsWith('http') ? url : `${siteConfig.url}${url}`;

  async function copyLink() {
    try {
      await navigator.clipboard.writeText(absoluteUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard can be blocked (insecure context, denied permission) — the
      // other share targets still work, so fail quietly.
    }
  }

  return (
    <div className={`flex items-center gap-2 ${className ?? ''}`}>
      <span className="text-xs font-heading font-semibold uppercase tracking-[var(--tracking-label)] text-text-secondary mr-1">
        {t('share')}
      </span>

      <a
        href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(absoluteUrl)}`}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Facebook"
        className={buttonClass}
      >
        <IconFacebook className="size-4" />
      </a>

      <a
        href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(absoluteUrl)}&text=${encodeURIComponent(title)}`}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="X"
        className={buttonClass}
      >
        <IconX className="size-4" />
      </a>

      <button type="button" onClick={copyLink} aria-label={t('copyLink')} className={buttonClass}>
        <IconLink className="size-4" />
      </button>

      {copied && (
        <span className="text-xs text-club-blue font-heading">{t('copied')}</span>
      )}
    </div>
  );
}
