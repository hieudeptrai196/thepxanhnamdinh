export type PlayerPosition = 'goalkeeper' | 'defender' | 'midfielder' | 'forward';

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
};

export type PlayerStats = {
  appearances: number;
  goals: number;
  assists: number;
  yellowCards: number;
  redCards: number;
  minutesPlayed: number;
  rating?: number;
};
