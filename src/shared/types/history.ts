export type Championship = {
  year: string;
  competition: string;
  note: string;
};

export type Milestone = {
  year: string;
  title: string;
  description: string;
};

export type Honour = {
  competition: string;
  count: number;
  years: string[];
};

export type HistoryData = {
  championships: Championship[];
  milestones: Milestone[];
  honours: Honour[];
};
