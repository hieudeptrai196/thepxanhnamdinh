export type StadiumStand = {
  id: 'west' | 'east' | 'north' | 'south';
  name: string;
  capacity: number;
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
  stands: StadiumStand[];
  gallery: StadiumPhoto[];
};
