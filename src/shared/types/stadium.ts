export type StadiumStand = {
  id: 'a' | 'b' | 'c' | 'd';
  name: string;
  /** Section labels as printed on the official plan, e.g. A1–A6. */
  sections: string[];
  description: string;
};

export type StadiumPhoto = {
  image: string;
  caption: string;
};

export type StadiumData = {
  name: string;
  nickname: string;
  capacity: number;
  opened: number;
  rebuilt: number;
  inaugurated: string;
  pitchSize: string;
  surface: string;
  address: string;
  floodlights: string;
  ticketUrl: string;
  map: string;
  stands: StadiumStand[];
  gallery: StadiumPhoto[];
};
