export interface Event {
  id: string;
  title: string;
  date: string;
  time: string;
  venue: string;
  address: string;
  description: string;
  image: string;
  slug: string;
}

export const events: Event[] = [
  {
    id: 'spa',
    title: 'Spa Day',
    date: 'Wednesday 2 June 2027',
    time: 'TBC',
    venue: 'TBC',
    address: 'Bermuda',
    description: 'Unwind and refresh before the celebrations begin. Join us for a relaxing spa day — the perfect way to ease into wedding week. More details to follow.',
    image: '/images/event-spa.png',
    slug: 'spa-day',
  },
  {
    id: 'beach',
    title: 'Beach Party',
    date: 'Wednesday 2 June 2027',
    time: 'Afternoon',
    venue: 'Elbow Beach',
    address: 'Elbow Beach, Paget Parish, Bermuda',
    description: 'Kick off the celebrations with sun, sand, and sea at the iconic Elbow Beach. Bring your swimsuit, your dancing shoes, and your best beach vibes.',
    image: '/images/event-beach-party.png',
    slug: 'beach-party',
  },
  {
    id: 'golf',
    title: 'Golf Day',
    date: 'Thursday 3 June 2027',
    time: 'Morning',
    venue: 'Port Royal Golf Course',
    address: 'Port Royal Golf Course, Southampton, Bermuda',
    description: 'Tee off on one of the Caribbean\'s finest courses. Port Royal\'s ocean-side fairways offer stunning views — whether you\'re a scratch golfer or a first-timer.',
    image: '/images/event-golf.png',
    slug: 'golf',
  },
  {
    id: 'boat',
    title: 'Boat Trip',
    date: 'Friday 4 June 2027',
    time: 'TBC',
    venue: 'TBC',
    address: 'Bermuda',
    description: 'Set sail around the stunning Bermuda coastline. Crystal-clear waters, hidden coves, and good company — the ultimate pre-wedding adventure. Full details coming soon.',
    image: '/images/event-boat-trip.png',
    slug: 'boat-trip',
  },
  {
    id: 'wedding',
    title: 'The Wedding',
    date: 'Saturday 5 June 2027',
    time: '3:00 PM',
    venue: 'The Reefs',
    address: '56 South Shore Rd, Southampton, Bermuda SN 02',
    description: 'The day we\'ve all been waiting for! Join JBen & JCaitlin as they say their vows at the breathtaking Reefs resort, perched on the cliffs above the turquoise South Shore.',
    image: '/images/event-wedding.png',
    slug: 'wedding',
  },
  {
    id: 'garden',
    title: 'Garden Party',
    date: 'Sunday 6 June 2027',
    time: 'Afternoon',
    venue: 'Woodrina Cottage',
    address: 'Woodrina Cottage, Paget, Bermuda',
    description: 'A relaxed afternoon in a beautiful Bermudian cottage garden to round off the festivities. Champagne, strawberries, and sunshine — the perfect farewell to a wonderful week.',
    image: '/images/event-garden-party.png',
    slug: 'garden-party',
  },
];

export function getEventBySlug(slug: string): Event | undefined {
  return events.find(e => e.slug === slug);
}
