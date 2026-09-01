'use client';

import { useTranslations } from 'next-intl';
import type { MatchStatus } from '@/shared/types/match';
import { Badge } from '@/shared/components/ui/Badge';

type Props = {
  status: MatchStatus;
  className?: string;
};

const variantByStatus = {
  upcoming: 'upcoming',
  live: 'live',
  finished: 'ft',
} as const;

const labelKeyByStatus: Record<MatchStatus, string> = {
  upcoming: 'upcoming',
  live: 'live',
  finished: 'ft',
};

export function MatchBadge({ status, className }: Props) {
  const t = useTranslations('matches');

  return (
    <Badge variant={variantByStatus[status]} className={className}>
      {t(labelKeyByStatus[status])}
    </Badge>
  );
}
