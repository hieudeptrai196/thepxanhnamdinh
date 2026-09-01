export type MatchStatus = 'upcoming' | 'live' | 'finished';

export type MatchTeam = {
  id: string;
  name: string;
  shortName: string;
  logo: string;
};

export type Match = {
  id: string;
  homeTeam: MatchTeam;
  awayTeam: MatchTeam;
  homeScore: number | null;
  awayScore: number | null;
  status: MatchStatus;
  date: string;
  time: string;
  venue: string;
  competition: string;
  round?: string;
};

/* ── Match detail ─────────────────────────────────────────────── */

export type LineupPlayer = {
  number: number;
  name: string;
  /** Shown under the name, e.g. "Thủ môn", "Tiền vệ". Optional. */
  role?: string;
};

export type TeamLineup = {
  formation: string;
  starting: LineupPlayer[];
  substitutes: LineupPlayer[];
};

/** One comparison row in the stats tab. `unit: 'percent'` renders a % suffix. */
export type MatchStat = {
  key: string;
  home: number;
  away: number;
  unit?: 'percent';
};

export type MatchBroadcast = {
  channels: string[];
  streaming?: string[];
  commentary?: string;
};

export type MatchRecap = {
  title: string;
  body: string[];
  image?: string;
};

export type FormResult = 'W' | 'D' | 'L';

/**
 * Optional per-match extras. Every field may be missing — matches without
 * detail data render an empty state instead of the corresponding tab content.
 */
export type MatchDetail = {
  matchId: string;
  recap?: MatchRecap;
  lineups?: { home: TeamLineup; away: TeamLineup };
  stats?: MatchStat[];
  broadcast?: MatchBroadcast;
  referee?: string;
  attendance?: number;
  ticketUrl?: string;
  form?: { home: FormResult[]; away: FormResult[] };
};
