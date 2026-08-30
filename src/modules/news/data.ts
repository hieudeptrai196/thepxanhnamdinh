import type { NewsArticle } from '@/shared/types/news';
import newsJson from '@/mocks/news.json';

export function getNewsData(): NewsArticle[] {
  return newsJson as NewsArticle[];
}
