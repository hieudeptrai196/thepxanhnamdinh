import type { ArticleBlock } from '@/shared/types/news';

type Props = {
  blocks: ArticleBlock[];
};

export function ArticleBody({ blocks }: Props) {
  return (
    <div className="flex flex-col gap-5">
      {blocks.map((block, i) => {
        if (block.type === 'heading') {
          return (
            <h2
              key={i}
              className="font-heading font-bold text-xl sm:text-2xl text-text-primary leading-snug mt-3"
            >
              {block.text}
            </h2>
          );
        }

        if (block.type === 'quote') {
          return (
            <blockquote
              key={i}
              className="border-l-[3px] border-club-blue pl-5 py-1 my-2"
            >
              <p className="font-heading font-semibold italic text-xl sm:text-2xl text-text-primary leading-snug">
                {block.text}
              </p>
              {block.attribution && (
                <cite className="block mt-2 text-sm text-text-secondary not-italic font-mono">
                  — {block.attribution}
                </cite>
              )}
            </blockquote>
          );
        }

        return (
          <p key={i} className="text-base text-text-primary leading-[1.65]">
            {block.text}
          </p>
        );
      })}
    </div>
  );
}
