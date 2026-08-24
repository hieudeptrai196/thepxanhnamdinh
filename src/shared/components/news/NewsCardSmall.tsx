'use client';

import Image from 'next/image';
import { Link } from '@/i18n/navigation';
import type { NewsArticle } from '@/shared/types/news';
import { cn } from '@/lib/cn';

type Props = {
  article: NewsArticle;
  className?: string;
};

const categoryLabels: Record<string, string> = {
  'v-league': 'V.League',
  'first-team': 'Đội 1',
  club: 'CLB',
  interview: 'Phỏng vấn',
  afc: 'AFC',
};

export function NewsCardSmall({ article, className }: Props) {
  return (
    <Link
      href={`/news/${article.slug}`}
      className={cn('group flex gap-4', className)}
    >
      <div className="relative w-28 h-20 lg:w-36 lg:h-24 shrink-0 overflow-hidden rounded-[var(--radius-small)] bg-light-gray">
        <Image
          src={article.image}
          alt={article.title}
          fill
          sizes="144px"
          className="object-cover transition-transform duration-300 group-hover:scale-[1.02]"
        />
      </div>
      <div className="flex flex-col justify-center min-w-0">
        <span className="text-[0.6875rem] font-heading font-semibold uppercase tracking-[var(--tracking-label)] text-club-blue">
          {categoryLabels[article.category] || article.category}
        </span>
        <h4 className="mt-1 font-heading font-bold text-sm leading-snug text-text-primary line-clamp-2 group-hover:text-club-blue transition-colors duration-150">
          {article.title}
        </h4>
        <p className="mt-1.5 text-xs text-text-secondary font-mono">
          {new Date(article.publishedAt).toLocaleDateString('vi-VN')}
        </p>
      </div>
    </Link>
  );
}
