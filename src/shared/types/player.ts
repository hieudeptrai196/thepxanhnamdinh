export type PlayerPosition = 'goalkeeper' | 'defender' | 'midfielder' | 'forward';

export type PlayerStats = {
  appearances: number;
  goals: number;
  assists: number;
  cleanSheets?: number;
  yellowCards: number;
  redCards: number;
  minutesPlayed: number;
  rating?: number;
};

export type RecentForm = {
  opponent: string;
  result: 'W' | 'D' | 'L';
  score: string;
};

export type Player = {
  id: string;
  name: string;
  number: number;
  position: PlayerPosition;
  nationality: string;
  nationalityFlag: string;
  image: string;
  dateOfBirth?: string;
  height?: number;
  weight?: number;
  bio?: string;
  stats?: PlayerStats;
  recentForm?: RecentForm[];
};
