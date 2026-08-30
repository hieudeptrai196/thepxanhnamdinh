'use client';

import { useMemo } from 'react';
import { useTranslations } from 'next-intl';
import type { NewsArticle } from '@/shared/types/news';
import { ContentLoader } from '@/shared/components/ui/ContentLoader';
import { NewsCard } from './NewsCard';

type Props = {
  articles: NewsArticle[];
};

export function NewsList({ articles }: Props) {
  const t = useTranslations('news');

  const sorted = useMemo(
    () => [...articles].sort(
      (a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime(),
    ),
    [articles],
  );

  const [featured, ...rest] = sorted;

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <p className="text-sm text-text-secondary font-mono">{t('subtitle')}</p>
        <span className="text-sm text-text-secondary font-mono">
          {sorted.length} {t('articles')}
        </span>
      </div>

      <ContentLoader count={6} skeleton="card" className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {sorted.length === 0 ? (
          <p className="col-span-full text-center text-text-secondary py-12">
            {t('noArticles')}
          </p>
        ) : (
          <>
            {featured && <NewsCard article={featured} featured />}
            {rest.map((article) => (
              <NewsCard key={article.id} article={article} />
            ))}
          </>
        )}
      </ContentLoader>
    </div>
  );
}
