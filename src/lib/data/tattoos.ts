
export type Tattoo = {
  id: number;
  title: string;
  artist: string;
  neighborhood: string;
  style: string;
  symbol: string;
  tone: string;
  height: number;
};

export const tattoos: Tattoo[] = [
  {
    id: 1,
    title: 'Botanical Study',
    artist: 'Artist No. 01',
    neighborhood: 'Lawrenceville',
    style: 'Fine Line',
    symbol: '✿',
    tone: '#d8d2c4',
    height: 300
  },
  {
    id: 2,
    title: 'The Serpent',
    artist: 'Artist No. 02',
    neighborhood: 'South Side',
    style: 'Blackwork',
    symbol: '〰',
    tone: '#c5c1b8',
    height: 390
  },
  {
    id: 3,
    title: 'Night Bloom',
    artist: 'Artist No. 03',
    neighborhood: 'Bloomfield',
    style: 'Illustrative',
    symbol: '❀',
    tone: '#b7afa0',
    height: 260
  },
  {
    id: 4,
    title: 'The Sun',
    artist: 'Artist No. 04',
    neighborhood: 'Strip District',
    style: 'Traditional',
    symbol: '☼',
    tone: '#c9bdab',
    height: 340
  },
  {
    id: 5,
    title: 'Small Worlds',
    artist: 'Artist No. 05',
    neighborhood: 'Lawrenceville',
    style: 'Fine Line',
    symbol: '✧',
    tone: '#e0d8c9',
    height: 270
  },
  {
    id: 6,
    title: 'Quiet Geometry',
    artist: 'Artist No. 06',
    neighborhood: 'Oakland',
    style: 'Geometric',
    symbol: '◇',
    tone: '#c4c9bf',
    height: 360
  },
  {
    id: 7,
    title: 'Wildflower',
    artist: 'Artist No. 07',
    neighborhood: 'South Side',
    style: 'Illustrative',
    symbol: '✾',
    tone: '#c6b7a7',
    height: 310
  },
  {
    id: 8,
    title: 'Moon Phase',
    artist: 'Artist No. 08',
    neighborhood: 'Bloomfield',
    style: 'Blackwork',
    symbol: '☾',
    tone: '#b5b6b0',
    height: 400
  }
];
