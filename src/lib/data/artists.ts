export type Artist = {
	id: number;
	name: string;
	studio: string;
	neighborhood: string;
	bio: string;
	specialties: string[];
	experienceYears: number;
	bookingStatus: 'open' | 'closed' | 'waitlist';
	artworkIds: number[];
};

export const artists: Artist[] = [
	{
		id: 1,
		name: 'Mara Ellis',
		studio: 'Northline Tattoo',
		neighborhood: 'Lawrenceville',
		bio: 'Fine-line botanical work inspired by natural forms, delicate textures, and organic compositions.',
		specialties: ['Fine Line', 'Illustrative'],
		experienceYears: 7,
		bookingStatus: 'open',
		artworkIds: [1, 7]
	},
      {
    id: 2,
    name: 'Jonah Reed',
    studio: 'Black Lantern Studio',
    neighborhood: 'South Side',
    bio: 'Bold blackwork, ornamental designs, and high-contrast compositions.',
    specialties: ['Blackwork', 'Geometric'],
    experienceYears: 9,
    bookingStatus: 'waitlist',
    artworkIds: [2, 5]
  },
  {
    id: 3,
    name: 'Sofia Vale',
    studio: 'Third Street Tattoo',
    neighborhood: 'Bloomfield',
    bio: 'Illustrative tattoos with floral motifs, storytelling, and expressive linework.',
    specialties: ['Illustrative', 'Fine Line'],
    experienceYears: 5,
    bookingStatus: 'open',
    artworkIds: [3, 6]
  },
  {
    id: 4,
    name: 'Caleb Stone',
    studio: 'Ironwood Tattoo',
    neighborhood: 'Strip District',
    bio: 'Traditional tattoos featuring bold outlines, classic imagery, and vibrant compositions.',
    specialties: ['Traditional', 'Blackwork'],
    experienceYears: 11,
    bookingStatus: 'closed',
    artworkIds: [4, 8]
  }
];
