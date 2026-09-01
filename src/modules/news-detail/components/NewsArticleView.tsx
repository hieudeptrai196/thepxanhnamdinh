'use client';

import Image from 'next/image';
import { useTranslations, useLocale } from 'next-intl';
import { Link } from '@/i18n/navigation';
import type { NewsArticle } from '@/shared/types/news';
import type { Match } from '@/shared/types/match';
import { Badge, ShareButtons } from '@/shared/components/ui';
import { NewsCardSmall } from '@/shared/components/news/NewsCardSmall';
import { ArticleBody } from './ArticleBody';
import { RelatedMatchCard } from './RelatedMatchCard';

type Props = {
  article: NewsArticle;
  related: NewsArticle[];
  relatedMatch?: Match;
};

function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString('vi-VN', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  });
}

/** Initials stand in for an author photo — the mock data has no avatars. */
function authorInitials(name: string): string {
  return name
    .split(' ')
    .filter(Boolean)
    .slice(-2)
    .map((w) => w[0])
    .join('')
    .toUpperCase();
}

export function NewsArticleView({ article, related, relatedMatch }: Props) {
  const t = useTranslations('news');
  const locale = useLocale();

  return (
    <article className="flex flex-col gap-8 lg:gap-10">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-sm text-text-secondary">
        <Link href="/" className="hover:text-club-blue transition-colors">
          {t('home')}
        </Link>
        <span>/</span>
        <Link href="/news" className="hover:text-club-blue transition-colors">
          {t('title')}
        </Link>
        <span>/</span>
        <span className="text-text-primary font-heading font-bold truncate">
          {article.title}
        </span>
      </nav>

      <header className="max-w-[820px]">
        {/* Category + date */}
        <div className="flex items-center gap-3 mb-4">
          <Badge variant="category">{t(article.category)}</Badge>
          <span className="text-xs font-mono text-text-secondary">
            {formatDate(article.publishedAt)}
          </span>
        </div>

        <h1 className="font-display text-[var(--text-section)] tracking-[var(--tracking-display)] uppercase text-text-primary leading-[var(--leading-tight)] mb-4">
          {article.title}
        </h1>

        <p className="text-base sm:text-lg text-text-secondary leading-relaxed mb-6">
          {article.excerpt}
        </p>

        {/* Author */}
        <div className="flex items-center gap-3 pt-5 border-t border-[var(--border-color)]">
          <span className="flex items-center justify-center size-10 rounded-full bg-club-blue text-white font-heading font-bold text-sm shrink-0">
            {authorInitials(article.author)}
          </span>
          <div className="min-w-0">
            <p className="font-heading font-bold text-sm text-text-primary truncate">
              {article.author}
            </p>
            <p className="text-xs font-mono text-text-secondary">
              {formatDate(article.publishedAt)}
            </p>
          </div>
        </div>
      </header>

      {/* Hero image */}
      <div className="relative w-full aspect-[16/9] rounded-[var(--radius-default)] overflow-hidden bg-light-gray">
        <Image
          src={article.image}
          alt={article.title}
          fill
          sizes="100vw"
          className="object-cover"
          priority
        />
      </div>

      <div className="grid lg:grid-cols-[1fr_300px] gap-8 lg:gap-10 items-start">
        {/* Body */}
        <div className="max-w-[820px]">
          {article.content && article.content.length > 0 && (
            <ArticleBody blocks={article.content} />
          )}

          <div className="mt-8 pt-6 border-t border-[var(--border-color)]">
            <ShareButtons
              url={`/${locale}/news/${article.slug}`}
              title={article.title}
            />
          </div>
        </div>

        {/* Sidebar */}
        <aside className="flex flex-col gap-6">
          {relatedMatch && <RelatedMatchCard match={relatedMatch} />}
        </aside>
      </div>

      {/* Related news */}
      {related.length > 0 && (
        <section className="pt-8 border-t border-[var(--border-color)]">
          <h2 className="font-display text-2xl sm:text-3xl tracking-[var(--tracking-display)] uppercase text-text-primary mb-6">
            {t('relatedNews')}
          </h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((item) => (
              <NewsCardSmall key={item.id} article={item} />
            ))}
          </div>
        </section>
      )}

      <Link
        href="/news"
        className="inline-flex items-center gap-2 text-sm text-club-blue hover:text-club-blue-hover font-heading font-bold transition-colors"
      >
        <svg className="size-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
        </svg>
        {t('backToNews')}
      </Link>
    </article>
  );
}
