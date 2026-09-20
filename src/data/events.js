const img = (id) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=1200&q=80`

export const defaultEvents = [
  {
    id: 'e1',
    title: 'Acoustic Night at Nako',
    date: '2026-09-25',
    time: '6:30 PM',
    tag: 'Live Music',
    description:
      'An evening of live acoustic sets from local Pokhara artists, with Spanish lattes and brownies all night. No cover charge — just come and listen.',
    image: img('photo-1495202315925-e0058c6e74aa'),
    featured: true
  },
  {
    id: 'e2',
    title: 'Latte Art Workshop',
    date: '2026-10-09',
    time: '3:00 PM',
    tag: 'Workshop',
    description:
      'Head barista Bibek teaches pouring, texturing and the classics — heart, rosetta, tulip. All equipment and beans included, limited to 8 seats.',
    image: img('photo-1509042239860-f550ce710b93'),
    featured: true
  },
  {
    id: 'e3',
    title: 'Cold Brew & Dessert Tasting',
    date: '2026-10-24',
    time: '5:00 PM',
    tag: 'Tasting',
    description:
      'Sample our 18-hour cold brew beside chef-picked desserts, with tasting notes from the roastery. A slow afternoon made for lingering.',
    image: img('photo-1461023058943-07fcbe16d735'),
    featured: false
  },
  {
    id: 'e4',
    title: 'Nepali Jazz Brunch',
    date: '2026-11-13',
    time: '10:00 AM',
    tag: 'Brunch',
    description:
      'Jazz trio, brunch plates and pour-over flights. Doors open at 10 — the kitchen runs until the last set ends.',
    image: img('photo-1414235077428-338989a2e8c0'),
    featured: false
  },
  {
    id: 'e5',
    title: 'Sips & Singles Night',
    date: '2026-08-29',
    time: '7:00 PM',
    tag: 'Evening',
    description:
      'A closed-set singles evening with cocktail specials and barista-paired coffees. A warm night that became a monthly favourite.',
    image: img('photo-1517230878791-4d28214057c2'),
    featured: false
  },
  {
    id: 'e6',
    title: 'Roastery Meet & Greet',
    date: '2026-08-14',
    time: '4:00 PM',
    tag: 'Talk',
    description:
      'Our dialect of Syangja farmers joined us to talk sourcing, terroir and why Nepali coffee deserves its place on the world map.',
    image: img('photo-1524350876685-274059332603'),
    featured: false
  },
  {
    id: 'e7',
    title: 'First Latte Art Throwdown',
    date: '2026-07-11',
    time: '6:00 PM',
    tag: 'Competition',
    description:
      'Our first community throwdown — 16 baristas, 3 blind judges and a lot of crema. Thanks to everyone who made it a night to remember.',
    image: img('photo-1587734195503-904fca47e0e9'),
    featured: false
  }
]