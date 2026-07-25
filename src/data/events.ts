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
    id: 'beach',
    title: 'Beach Party',
    date: 'Wednesday 2 June 2027',
    time: 'Afternoon',
    venue: 'Elbow Beach',
    address: 'Elbow Beach, Paget Parish, Bermuda',
    description: 'Kick off the celebrations with sun, sand, and sea at the iconic Elbow Beach. Just bring your swimsuit, beach chairs, best beach vibes, and a bottle of something (or two)!',
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
    description: 'Golfers of all abilities are welcome. For those who may not fancy a full 18 holes, 9-hole options are available and there is a driving range. Golf clubs are available for hire. Please see their website for more information including pricing — <a href="https://www.bermudagolf.bm/port-royal/" target="_blank" rel="noopener noreferrer" class="underline hover:text-navy">Port Royal | Experience Bermuda Golf</a>.',
    image: '/images/event-golf.png',
    slug: 'golf',
  },
  {
    id: 'spa',
    title: 'Spa Day',
    date: 'Thursday 3 June 2027',
    time: 'Afternoon',
    venue: 'La Serna Spa at The Reefs',
    address: 'Bermuda',
    description: 'Please see their website for more information and treatments offered and pricing — <a href="https://www.thereefs.com/bermuda-spa" target="_blank" rel="noopener noreferrer" class="underline hover:text-navy">Bermuda Spa | The Reefs</a> — then pop your choices in the RSVP.',
    image: '/images/event-spa.png',
    slug: 'spa-day',
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
    time: '5:00 PM',
    venue: 'The Reefs',
    address: '56 South Shore Rd, Southampton, Bermuda SN 02',
    description: 'The day we\'ve all been waiting for! Join Ben & Caitlin as they say their vows at the breathtaking Reefs resort, perched on the cliffs above the turquoise South Shore following by sun, drink and merriment. Please arrive at 4:30pm or earlier and make yourselves comfortable, finding your seats or grabbing a drink from the bar.',
    image: '/images/event-wedding.png',
    slug: 'wedding',
  },
  {
    id: 'garden',
    title: 'Garden Party',
    date: 'Sunday 6 June 2027',
    time: '12:00 PM onwards',
    venue: 'Woodrina Cottage',
    address: 'Woodrina Cottage, Paget, Bermuda',
    description: 'A relaxed afternoon in our beautiful Bermudian cottage garden to round off the festivities. Plenty of food, drinks and fun will be provided — the perfect farewell to a wonderful week.',
    image: '/images/event-garden-party.png',
    slug: 'garden-party',
  },
];

export function getEventBySlug(slug: string): Event | undefined {
  return events.find(e => e.slug === slug);
}
