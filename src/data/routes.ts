import type { CuratedRoute } from '../types';

export const CURATED_ROUTES: CuratedRoute[] = [
  {
    id: 'route-peace',
    title: 'The Contemplative Sanctuary Circuit',
    subtitle: 'Woodland temple, literary tea garden & historic Hanok reflection',
    durationLabel: '2 Hours · 1.6 km',
    totalDistanceKm: 1.6,
    theme: 'peace',
    description:
      'A deeply restorative walk starting inside the silent pine groves of Gilsangsa Temple, continuing down the hillside to savor hot pumpkin tea in Lee Tae-jun’s 1933 garden, and finishing at Manhae’s resolute residence in Simujang.',
    steps: [
      {
        placeId: 'gilsangsa',
        stepMinutes: 45,
        note: 'Begin with quiet contemplation by the Guanyin Bodhisattva and the upper forest path.',
      },
      {
        placeId: 'suyeonsanbang',
        stepMinutes: 40,
        note: '8 min walk down valley · Rest on the wooden porch with handmade sweet pumpkin tea.',
      },
      {
        placeId: 'simujang',
        stepMinutes: 30,
        note: '10 min walk through hillside steps · Contemplate the north-facing pine courtyard of poet Manhae.',
      },
    ],
  },
  {
    id: 'route-wall-heritage',
    title: 'Fortress Battlements & Mountain Village',
    subtitle: 'Ancient stone ramparts, hilltop community life & Bugak ridge vistas',
    durationLabel: '2.5 Hours · 2.4 km',
    totalDistanceKm: 2.4,
    theme: 'heritage',
    description:
      'Climb from the ancient arches of Hyehwamun Gate up the 600-year-old stone ramparts of Hanyangdoseong, winding through the intimate hillside alleys of Bukjeong Village to reach the secluded mountain gatehouse of Sukjeongmun.',
    steps: [
      {
        placeId: 'hyehwamun',
        stepMinutes: 20,
        note: 'Start at the historic East Small Gate arch and admire the ceiling phoenix murals.',
      },
      {
        placeId: 'city-wall-seongbuk',
        stepMinutes: 45,
        note: 'Follow the stone ramparts uphill towards Waryong Park with expansive city vistas.',
      },
      {
        placeId: 'bukjeong-village',
        stepMinutes: 35,
        note: 'Descend gently into the last authentic hillside village beneath the ancient battlements.',
      },
      {
        placeId: 'sukjeongmun',
        stepMinutes: 40,
        note: 'Hike the pine-crested northern ridge to the secluded Great North Gate.',
      },
    ],
  },
  {
    id: 'route-local-table',
    title: 'Artisan Heritage & Heritage Noodle Table',
    subtitle: 'Master art historian’s Hanok, 55-year noodle broth & roadside grill',
    durationLabel: '1.5 Hours · 1.4 km',
    totalDistanceKm: 1.4,
    theme: 'evening',
    description:
      'Immerse in refined Korean spatial aesthetics at Choe Sun-u’s tranquil courtyard, followed by comforting hand-cut Andong noodles in clarified beef broth at legendary Guksijib, ending with tea or charcoal pork bulgogi.',
    steps: [
      {
        placeId: 'choe-sun-u-house',
        stepMinutes: 35,
        note: 'Appreciate the paper screens, open wooden maru floor, and old courtyard garden.',
      },
      {
        placeId: 'guksijib',
        stepMinutes: 40,
        note: '5 min walk down Changgyeonggung-ro · Savor traditional hand-rolled noodles and tender suyuk.',
      },
      {
        placeId: 'suyeonsanbang',
        stepMinutes: 30,
        note: '12 min gentle stroll along Seongbuk-ro · Relax with hot restorative herbal tea.',
      },
    ],
  },
];
