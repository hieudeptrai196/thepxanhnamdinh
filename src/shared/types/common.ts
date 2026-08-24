export type StandingEntry = {
  position: number;
  team: {
    id: string;
    name: string;
    shortName: string;
    logo: string;
  };
  played: number;
  won: number;
  drawn: number;
  lost: number;
  goalsFor: number;
  goalsAgainst: number;
  goalDifference: number;
  points: number;
};
