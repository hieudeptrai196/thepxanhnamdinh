'use client';

import { useTranslations } from 'next-intl';
import { StatCard } from '@/shared/components/data';

type Props = {
  capacity: number;
  opened: number;
  titles: number;
};

export function StadiumStats({ capacity, opened, titles }: Props) {
  const t = useTranslations('stadium');

  return (
    <section className="py-12 lg:py-16">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
        <StatCard value={capacity.toLocaleString('vi-VN')} label={t('capacity')} />
        <StatCard value={opened} label={t('opened')} />
        <StatCard value={titles} label={t('titlesWon')} />
      </div>
    </section>
  );
}
