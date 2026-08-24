'use client';

import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import type { NewsArticle } from '@/shared/types/news';
import { Container } from '@/shared/components/ui/Container';
import { SectionHeader } from '@/shared/components/ui/SectionHeader';
import { NewsCardLarge } from '@/shared/components/news/NewsCardLarge';
import { NewsCardSmall } from '@/shared/components/news/NewsCardSmall';
import { useScrollReveal } from '@/shared/hooks/useScrollReveal';

type Props = {
  articles: NewsArticle[];
};

export function NewsSection({ articles }: Props) {
  const t = useTranslations('news');
  const tCommon = useTranslations('common');
  const ref = useScrollReveal<HTMLElement>();

  if (articles.length === 0) return null;

  const [featured, ...rest] = articles;

  return (
    <section ref={ref} className="py-[var(--section-gap)] bg-bg-secondary scroll-reveal">
      <Container>
        <SectionHeader
          title={t('title')}
          subtitle={t('subtitle')}
          action={
            <Link
              href="/news"
              className="text-sm font-heading font-semibold text-club-blue hover:text-club-blue-hover transition-colors duration-150 uppercase tracking-[var(--tracking-label)]"
            >
              {tCommon('viewAll')}
            </Link>
          }
        />

        {/* Editorial layout: 7 cols feature + 5 cols small stack */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8">
          <div className="lg:col-span-7" data-reveal>
            <NewsCardLarge article={featured} />
          </div>
          <div className="lg:col-span-5 flex flex-col gap-5 lg:gap-6">
            {rest.map((article) => (
              <div
                key={article.id}
                className="border-b border-[var(--border-color)] pb-5 lg:pb-6 last:border-0 last:pb-0"
                data-reveal
              >
                <NewsCardSmall article={article} />
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
