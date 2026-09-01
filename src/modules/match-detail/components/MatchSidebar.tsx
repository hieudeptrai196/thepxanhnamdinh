'use client';

import { useTranslations } from 'next-intl';
import type { Match, MatchDetail, FormResult } from '@/shared/types/match';

type Props = {
  match: Match;
  detail?: MatchDetail;
};

const formColor: Record<FormResult, string> = {
  W: 'bg-win-green',
  D: 'bg-draw-gray',
  L: 'bg-live-red',
};

const formLabel: Record<FormResult, string> = {
  W: 'T',
  D: 'H',
  L: 'B',
};

function FormRow({ team, form }: { team: string; form: FormResult[] }) {
  return (
    <div className="flex items-center justify-between gap-3 py-3 first:pt-0 last:pb-0">
      <span className="text-sm text-text-primary font-heading truncate">{team}</span>
      <div className="flex gap-1 shrink-0">
        {form.map((result, i) => (
          <span
            key={i}
            className={`size-6 rounded-[var(--radius-small)] ${formColor[result]} flex items-center justify-center`}
          >
            <span className="font-display text-xs text-white tracking-wider">
              {formLabel[result]}
            </span>
          </span>
        ))}
      </div>
    </div>
  );
}

export function MatchSidebar({ match, detail }: Props) {
  const t = useTranslations('matches');

  const infoRows = [
    { label: t('competition'), value: match.competition },
    ...(match.round ? [{ label: t('round'), value: match.round }] : []),
    { label: t('venue'), value: match.venue },
    ...(detail?.referee ? [{ label: t('referee'), value: detail.referee }] : []),
    ...(detail?.attendance
      ? [{ label: t('attendance'), value: detail.attendance.toLocaleString('vi-VN') }]
      : []),
  ];

  return (
    <div className="flex flex-col gap-6">
      {/* Ticket CTA — only meaningful before kick-off */}
      {match.status === 'upcoming' && detail?.ticketUrl && (
        <div className="rounded-[var(--radius-default)] bg-bg-inverse p-5 sm:p-6">
          <h3 className="font-display text-xl tracking-[var(--tracking-display)] uppercase text-white mb-2">
            {t('buyTickets')}
          </h3>
          <p className="text-sm text-white/60 leading-relaxed mb-4">
            {t('buyTicketsDesc')}
          </p>
          <a
            href={detail.ticketUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center w-full min-h-[44px] px-5 rounded-[var(--radius-default)] bg-club-blue text-white font-body font-semibold text-sm uppercase tracking-[var(--tracking-label)] hover:bg-club-blue-hover active:bg-club-blue-active transition-colors duration-150"
          >
            {t('buyTickets')}
          </a>
        </div>
      )}

      {/* Match info */}
      <div className="rounded-[var(--radius-default)] bg-bg-secondary border border-[var(--border-color)] p-5 sm:p-6">
        <h3 className="font-display text-lg tracking-[var(--tracking-display)] uppercase text-text-primary mb-4">
          {t('matchInfo')}
        </h3>
        <div className="flex flex-col divide-y divide-[var(--border-color)]">
          {infoRows.map((row) => (
            <div key={row.label} className="flex items-center justify-between gap-4 py-3 first:pt-0 last:pb-0">
              <span className="text-sm text-text-secondary shrink-0">{row.label}</span>
              <span className="text-sm text-text-primary font-heading font-bold text-right">
                {row.value}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Recent form for both sides */}
      {detail?.form && (
        <div className="rounded-[var(--radius-default)] bg-bg-secondary border border-[var(--border-color)] p-5 sm:p-6">
          <h3 className="font-display text-lg tracking-[var(--tracking-display)] uppercase text-text-primary mb-4">
            {t('recentForm')}
          </h3>
          <div className="flex flex-col divide-y divide-[var(--border-color)]">
            <FormRow team={match.homeTeam.shortName} form={detail.form.home} />
            <FormRow team={match.awayTeam.shortName} form={detail.form.away} />
          </div>
        </div>
      )}
    </div>
  );
}
