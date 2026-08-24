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
