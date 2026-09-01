import type { NewsArticle } from '@/shared/types/news';
import newsJson from '@/mocks/news.json';

export function getNewsData(): NewsArticle[] {
  return newsJson as NewsArticle[];
}

export function getArticleBySlug(slug: string): NewsArticle | undefined {
  return (newsJson as NewsArticle[]).find((a) => a.slug === slug);
}

/** Same-category articles first, topped up with the most recent others. */
export function getRelatedArticles(slug: string, limit = 3): NewsArticle[] {
  const all = newsJson as NewsArticle[];
  const current = all.find((a) => a.slug === slug);
  if (!current) return [];

  const others = all
    .filter((a) => a.slug !== slug)
    .sort((a, b) => +new Date(b.publishedAt) - +new Date(a.publishedAt));

  const sameCategory = others.filter((a) => a.category === current.category);
  const rest = others.filter((a) => a.category !== current.category);

  return [...sameCategory, ...rest].slice(0, limit);
}
