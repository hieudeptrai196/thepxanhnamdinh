'use client';

import Image from 'next/image';
import { useTranslations } from 'next-intl';
import type { StadiumPhoto } from '@/shared/types/stadium';

type Props = {
  photos: StadiumPhoto[];
};

export function StadiumGallery({ photos }: Props) {
  const t = useTranslations('stadium');

  return (
    <section className="py-12 lg:py-16">
      <h2 className="font-display text-[length:var(--text-section)] tracking-[var(--tracking-display)] uppercase text-text-primary leading-[var(--leading-tight)] mb-8">
        {t('galleryTitle')}
      </h2>

      {/* Mixed sizes — the lead photo runs wide once there are enough to fill
          the row; with only two it stays an even split. */}
      <div className={`grid gap-4 sm:grid-cols-2 ${photos.length > 2 ? 'lg:grid-cols-3' : ''}`}>
        {photos.map((photo, i) => (
          <figure
            key={photo.image + i}
            className={`relative overflow-hidden rounded-[var(--radius-default)] bg-light-gray ${
              i === 0 && photos.length > 2
                ? 'sm:col-span-2 lg:col-span-2 aspect-[16/9]'
                : 'aspect-[16/10]'
            }`}
          >
            <Image
              src={photo.image}
              alt={photo.caption}
              fill
              sizes="(max-width: 640px) 100vw, 50vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[rgba(7,28,44,0.85)] to-transparent" />
            <figcaption className="absolute bottom-0 left-0 right-0 p-4 text-sm text-white/90 font-heading">
              {photo.caption}
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}
