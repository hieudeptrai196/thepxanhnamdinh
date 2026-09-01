export type NewsCategory =
  | 'all'
  | 'first-team'
  | 'v-league'
  | 'afc'
  | 'club'
  | 'interview';

/** Article body is a block list so pull quotes and headings can be styled. */
export type ArticleBlock =
  | { type: 'paragraph'; text: string }
  | { type: 'heading'; text: string }
  | { type: 'quote'; text: string; attribution?: string };

export type NewsArticle = {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content?: ArticleBlock[];
  image: string;
  category: NewsCategory;
  author: string;
  publishedAt: string;
  /** Set on match reports — pulls the scoreline into the article sidebar. */
  relatedMatchId?: string;
};
