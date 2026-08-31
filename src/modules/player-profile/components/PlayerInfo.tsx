'use client';

import { useTranslations } from 'next-intl';
import type { Player } from '@/shared/types/player';

type Props = {
  player: Player;
};

function calculateAge(dob: string): number {
  const birth = new Date(dob);
  const today = new Date();
  let age = today.getFullYear() - birth.getFullYear();
  const m = today.getMonth() - birth.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < birth.getDate())) age--;
  return age;
}

function formatDate(dob: string): string {
  const d = new Date(dob);
  return d.toLocaleDateString('vi-VN', { day: '2-digit', month: '2-digit', year: 'numeric' });
}

export function PlayerInfo({ player }: Props) {
  const t = useTranslations('squad');

  const rows = [
    { label: t('position'), value: t(player.position) },
    { label: t('nationality'), value: `${player.nationalityFlag} ${player.nationality}` },
    ...(player.dateOfBirth
      ? [{ label: t('dateOfBirth'), value: `${formatDate(player.dateOfBirth)} (${calculateAge(player.dateOfBirth)} ${t('age')})` }]
      : []),
    ...(player.height ? [{ label: t('height'), value: `${player.height} cm` }] : []),
    ...(player.weight ? [{ label: t('weight'), value: `${player.weight} kg` }] : []),
  ];

  return (
    <div className="bg-bg-secondary rounded-[var(--radius-default)] border border-[var(--border-color)] p-5 sm:p-6">
      <h2 className="font-display text-lg sm:text-xl tracking-[var(--tracking-display)] uppercase text-text-primary mb-4">
        {t('personalInfo')}
      </h2>

      <div className="flex flex-col divide-y divide-[var(--border-color)]">
        {rows.map((row) => (
          <div key={row.label} className="flex items-center justify-between py-3 first:pt-0 last:pb-0 gap-4">
            <span className="text-sm text-text-secondary shrink-0">{row.label}</span>
            <span className="text-sm text-text-primary font-heading font-bold text-right">{row.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
