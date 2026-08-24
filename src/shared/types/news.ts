export type NewsCategory =
  | 'all'
  | 'first-team'
  | 'v-league'
  | 'afc'
  | 'club'
  | 'interview';

export type NewsArticle = {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content?: string;
  image: string;
  category: NewsCategory;
  author: string;
  publishedAt: string;
};
