'use client';

import { useTranslations } from 'next-intl';
import type { MatchBroadcast as Broadcast } from '@/shared/types/match';

type Props = {
  broadcast: Broadcast;
};

export function MatchBroadcast({ broadcast }: Props) {
  const t = useTranslations('matches');

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h3 className="text-xs font-heading font-semibold uppercase tracking-[var(--tracking-label)] text-text-secondary mb-3">
          {t('channels')}
        </h3>
        <div className="flex flex-wrap gap-2">
          {broadcast.channels.map((channel) => (
            <span
              key={channel}
              className="px-3 py-2 rounded-[var(--radius-default)] border border-[var(--border-color)] font-heading font-bold text-sm text-text-primary"
            >
              {channel}
            </span>
          ))}
        </div>
      </div>

      {broadcast.streaming && broadcast.streaming.length > 0 && (
        <div>
          <h3 className="text-xs font-heading font-semibold uppercase tracking-[var(--tracking-label)] text-text-secondary mb-3">
            {t('streaming')}
          </h3>
          <div className="flex flex-wrap gap-2">
            {broadcast.streaming.map((service) => (
              <span key={service} className="font-mono text-sm text-text-secondary">
                {service}
              </span>
            ))}
          </div>
        </div>
      )}

      {broadcast.commentary && (
        <p className="text-sm text-text-secondary">{broadcast.commentary}</p>
      )}
    </div>
  );
}
