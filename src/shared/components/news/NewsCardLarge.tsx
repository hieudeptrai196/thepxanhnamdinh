'use client';

import Image from 'next/image';
import { Link } from '@/i18n/navigation';
import type { NewsArticle } from '@/shared/types/news';
import { Badge } from '@/shared/components/ui/Badge';
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

export function NewsCardLarge({ article, className }: Props) {
  return (
    <Link
      href={`/news/${article.slug}`}
      className={cn('group block', className)}
    >
      <div className="relative aspect-[16/10] overflow-hidden rounded-[var(--radius-default)] bg-light-gray">
        <Image
          src={article.image}
          alt={article.title}
          fill
          sizes="(max-width: 768px) 100vw, 60vw"
          className="object-cover transition-transform duration-300 group-hover:scale-[1.02]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[rgba(7,28,44,0.7)] to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-5 lg:p-8">
          <Badge variant="category" className="mb-3">
            {categoryLabels[article.category] || article.category}
          </Badge>
          <h3 className="font-heading font-bold text-xl lg:text-2xl text-white leading-tight">
            {article.title}
          </h3>
          <p className="mt-2 text-sm text-white/70 line-clamp-2 hidden sm:block">
            {article.excerpt}
          </p>
          <p className="mt-3 text-xs text-white/50 font-mono">
            {new Date(article.publishedAt).toLocaleDateString('vi-VN')}
          </p>
        </div>
      </div>
    </Link>
  );
}
