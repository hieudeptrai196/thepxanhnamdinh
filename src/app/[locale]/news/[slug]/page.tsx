import { getTranslations } from 'next-intl/server';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Container } from '@/shared/components/ui/Container';
import { getArticleBySlug, getNewsData, getRelatedArticles } from '@/modules/news';
import { getMatchById } from '@/modules/matches';
import { NewsArticleView } from '@/modules/news-detail';

type Props = {
  params: Promise<{ locale: string; slug: string }>;
};

export async function generateStaticParams() {
  return getNewsData().map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = await params;
  const article = getArticleBySlug(slug);
  const t = await getTranslations({ locale, namespace: 'news' });

  if (!article) {
    return { title: t('articleNotFound') };
  }

  return {
    title: article.title,
    description: article.excerpt,
    openGraph: {
      title: article.title,
      description: article.excerpt,
      images: [article.image],
      type: 'article',
      publishedTime: article.publishedAt,
    },
  };
}

export default async function NewsDetailPage({ params }: Props) {
  const { slug } = await params;
  const article = getArticleBySlug(slug);

  if (!article) {
    notFound();
  }

  const related = getRelatedArticles(slug);
  const relatedMatch = article.relatedMatchId
    ? getMatchById(article.relatedMatchId)
    : undefined;

  return (
    <section className="py-8 lg:py-12">
      <Container>
        <NewsArticleView article={article} related={related} relatedMatch={relatedMatch} />
      </Container>
    </section>
  );
}
