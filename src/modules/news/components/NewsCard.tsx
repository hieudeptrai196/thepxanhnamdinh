'use client';

import Image from 'next/image';
import { useTranslations } from 'next-intl';
import type { NewsArticle } from '@/shared/types/news';
import { Badge } from '@/shared/components/ui/Badge';

type Props = {
  article: NewsArticle;
  featured?: boolean;
};

function formatDate(dateStr: string): string {
  const d = new Date(dateStr);
  return d.toLocaleDateString('vi-VN', { day: '2-digit', month: '2-digit', year: 'numeric' });
}

export function NewsCard({ article, featured = false }: Props) {
  const t = useTranslations('news');

  if (featured) {
    return (
      <article className="group bg-bg-secondary rounded-[var(--radius-default)] border border-[var(--border-color)] overflow-hidden transition-shadow duration-150 hover:shadow-card col-span-full">
        <div className="grid sm:grid-cols-2 gap-0">
          <div className="relative aspect-[16/9] sm:aspect-auto overflow-hidden">
            <Image
              src={article.image}
              alt={article.title}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105"
              sizes="(max-width: 640px) 100vw, 50vw"
            />
          </div>
          <div className="p-5 sm:p-6 lg:p-8 flex flex-col justify-center">
            <div className="flex items-center gap-2 mb-3">
              <Badge variant="category">{t(article.category)}</Badge>
              <span className="text-xs font-mono text-text-secondary">{formatDate(article.publishedAt)}</span>
            </div>
            <h2 className="font-heading font-bold text-text-primary text-lg sm:text-xl lg:text-2xl leading-tight mb-3 line-clamp-3">
              {article.title}
            </h2>
            <p className="text-sm text-text-secondary leading-relaxed mb-4 line-clamp-3">
              {article.excerpt}
            </p>
            <span className="text-sm font-heading font-semibold text-club-blue uppercase tracking-wide">
              {t('readMore')} →
            </span>
          </div>
        </div>
      </article>
    );
  }

  return (
    <article className="group bg-bg-secondary rounded-[var(--radius-default)] border border-[var(--border-color)] overflow-hidden transition-shadow duration-150 hover:shadow-card">
      <div className="relative aspect-[16/10] overflow-hidden">
        <Image
          src={article.image}
          alt={article.title}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
      </div>
      <div className="p-4 sm:p-5">
        <div className="flex items-center gap-2 mb-2">
          <Badge variant="category">{t(article.category)}</Badge>
          <span className="text-xs font-mono text-text-secondary">{formatDate(article.publishedAt)}</span>
        </div>
        <h3 className="font-heading font-bold text-text-primary text-sm sm:text-base leading-tight mb-2 line-clamp-2">
          {article.title}
        </h3>
        <p className="text-xs sm:text-sm text-text-secondary leading-relaxed line-clamp-2">
          {article.excerpt}
        </p>
      </div>
    </article>
  );
}
