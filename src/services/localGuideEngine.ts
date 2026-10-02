import type { Place, GuideSuggestionItem, CuratedRoute } from '../types';
import { PLACES_DATA } from '../data/places';
import { CURATED_ROUTES } from '../data/routes';

// Calculates great-circle distance between two coordinates in meters
export function calculateDistanceMeters(
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number
): number {
  const R = 6371e3; // Earth radius in meters
  const phi1 = (lat1 * Math.PI) / 180;
  const phi2 = (lat2 * Math.PI) / 180;
  const deltaPhi = ((lat2 - lat1) * Math.PI) / 180;
  const deltaLambda = ((lon2 - lon1) * Math.PI) / 180;

  const a =
    Math.sin(deltaPhi / 2) * Math.sin(deltaPhi / 2) +
    Math.cos(phi1) * Math.cos(phi2) * Math.sin(deltaLambda / 2) * Math.sin(deltaLambda / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  return Math.round(R * c);
}

// Converts distance in meters to walking minutes (average pedestrian speed: 4.5 km/h ≈ 75 m/min)
export function estimateWalkingMinutes(meters: number): number {
  return Math.max(2, Math.round(meters / 75));
}

// Generates contextual, deterministic guide suggestions for the active place
export function getContextualSuggestions(currentPlace: Place): GuideSuggestionItem[] {
  const suggestions: GuideSuggestionItem[] = [];

  // Find complementary nearby places
  const nearbyPlaces = currentPlace.curatedNearbyIds
    .map((id) => PLACES_DATA.find((p) => p.id === id))
    .filter((p): p is Place => !!p);

  // 1. Food / Tea / Walk pairings based on current category
  if (currentPlace.category === 'Culture') {
    // Temple / Heritage: Pair with tea and quiet walk
    const teaPlace = nearbyPlaces.find((p) => p.category === 'Tea & Cafe') ||
      PLACES_DATA.find((p) => p.category === 'Tea & Cafe');
    if (teaPlace) {
      const dist = calculateDistanceMeters(
        currentPlace.coordinates.lat,
        currentPlace.coordinates.lng,
        teaPlace.coordinates.lat,
        teaPlace.coordinates.lng
      );
      const mins = estimateWalkingMinutes(dist);
      suggestions.push({
        id: `sug-tea-${teaPlace.id}`,
        type: 'tea',
        title: `Traditional Tea Companion · ${teaPlace.name}`,
        subtitle: `${mins} min walk (${dist}m)`,
        targetPlaceId: teaPlace.id,
        estimatedMinutes: mins,
        reason: `After tranquil contemplation at ${currentPlace.name}, relax on the garden veranda of this 1930s Hanok with artisanal pumpkin or herbal tea.`,
      });
    }

    const walkPlace = nearbyPlaces.find((p) => p.category === 'Nature & Walk') ||
      PLACES_DATA.find((p) => p.id === 'sukjeongmun');
    if (walkPlace) {
      const dist = calculateDistanceMeters(
        currentPlace.coordinates.lat,
        currentPlace.coordinates.lng,
        walkPlace.coordinates.lat,
        walkPlace.coordinates.lng
      );
      const mins = estimateWalkingMinutes(dist);
      suggestions.push({
        id: `sug-walk-${walkPlace.id}`,
        type: 'walk',
        title: `Quiet Walk Nearby · ${walkPlace.name}`,
        subtitle: `${mins} min walk (${dist}m)`,
        targetPlaceId: walkPlace.id,
        estimatedMinutes: mins,
        reason: `Extend your quiet journey along the stone paths and ancient pine groves connecting into ${walkPlace.name}.`,
      });
    }

    // 2-Hour Curated Route pairing
    suggestions.push({
      id: 'sug-route-peace',
      type: 'route',
      title: 'Curated 2-Hour Circuit · Contemplative Sanctuary',
      subtitle: 'Gilsangsa → Suyeonsanbang → Simujang',
      reason: 'A cohesive, unhurried morning or afternoon loop connecting Seongbuk’s most poetic heritage dwellings.',
    });

    // Cultural Tip
    suggestions.push({
      id: 'sug-tip-etiquette',
      type: 'tip',
      title: 'Local Cultural Etiquette',
      subtitle: 'Respectful observation',
      reason: 'Please keep voices soft. Photography is permitted in courtyards, but respect visitors meditating inside sanctuary halls.',
    });
  } else if (currentPlace.category === 'Local Food') {
    // Food: Pair with digestive stroll and tea
    const teaPlace = nearbyPlaces.find((p) => p.category === 'Tea & Cafe') ||
      PLACES_DATA.find((p) => p.id === 'suyeonsanbang');
    if (teaPlace) {
      const dist = calculateDistanceMeters(
        currentPlace.coordinates.lat,
        currentPlace.coordinates.lng,
        teaPlace.coordinates.lat,
        teaPlace.coordinates.lng
      );
      const mins = estimateWalkingMinutes(dist);
      suggestions.push({
        id: `sug-tea-${teaPlace.id}`,
        type: 'tea',
        title: `Digestive Tea · ${teaPlace.name}`,
        subtitle: `${mins} min walk (${dist}m)`,
        targetPlaceId: teaPlace.id,
        estimatedMinutes: mins,
        reason: `Cleanse your palate after ${currentPlace.name} with warm, hand-brewed medicinal herbs or sweet pumpkin tea in an ancient garden.`,
      });
    }

    const culturePlace = nearbyPlaces.find((p) => p.category === 'Culture') ||
      PLACES_DATA.find((p) => p.id === 'choe-sun-u-house');
    if (culturePlace) {
      const dist = calculateDistanceMeters(
        currentPlace.coordinates.lat,
        currentPlace.coordinates.lng,
        culturePlace.coordinates.lat,
        culturePlace.coordinates.lng
      );
      const mins = estimateWalkingMinutes(dist);
      suggestions.push({
        id: `sug-culture-${culturePlace.id}`,
        type: 'walk',
        title: `Historic Hanok Stroll · ${culturePlace.name}`,
        subtitle: `${mins} min walk (${dist}m)`,
        targetPlaceId: culturePlace.id,
        estimatedMinutes: mins,
        reason: `Take a gentle post-meal stroll into the tranquil 1930s courtyard where the master art historian studied Korean aesthetics.`,
      });
    }

    suggestions.push({
      id: 'sug-route-food',
      type: 'route',
      title: 'Curated 1.5-Hour Circuit · Heritage Table & Tea',
      subtitle: 'Choe Sun-u House → Noodle Table → Garden Tea',
      reason: 'Experience the authentic pace of a Seongbuk local afternoon—artisan architecture paired with generational culinary comfort.',
    });

    suggestions.push({
      id: 'sug-tip-food',
      type: 'tip',
      title: 'Local Ordering Insight',
      subtitle: 'Authentic local pairing',
      reason: currentPlace.id === 'guksijib'
        ? 'Order regular Guksi alongside a plate of tender Suyuk (boiled beef brisket) with seasoned garlic chive kimchi.'
        : 'Order the Dwaejibulbaek (pork bulgogi baekban). Wrap charcoal meat with rice and seasoned ssamjang in fresh lettuce.',
    });
  } else if (currentPlace.category === 'Nature & Walk') {
    // Nature: Pair with hearty local meal downhill and historic landmark
    const foodPlace = nearbyPlaces.find((p) => p.category === 'Local Food') ||
      PLACES_DATA.find((p) => p.category === 'Local Food');
    if (foodPlace) {
      const dist = calculateDistanceMeters(
        currentPlace.coordinates.lat,
        currentPlace.coordinates.lng,
        foodPlace.coordinates.lat,
        foodPlace.coordinates.lng
      );
      const mins = estimateWalkingMinutes(dist);
      suggestions.push({
        id: `sug-food-${foodPlace.id}`,
        type: 'food',
        title: `Hearty Meal Downhill · ${foodPlace.name}`,
        subtitle: `${mins} min walk (${dist}m)`,
        targetPlaceId: foodPlace.id,
        estimatedMinutes: mins,
        reason: `Recharge after hiking the stone fortress ridge with warm, genuine neighborhood comfort food.`,
      });
    }

    const heritagePlace = nearbyPlaces.find((p) => p.category === 'Culture') ||
      PLACES_DATA.find((p) => p.id === 'simujang');
    if (heritagePlace) {
      const dist = calculateDistanceMeters(
        currentPlace.coordinates.lat,
        currentPlace.coordinates.lng,
        heritagePlace.coordinates.lat,
        heritagePlace.coordinates.lng
      );
      const mins = estimateWalkingMinutes(dist);
      suggestions.push({
        id: `sug-heritage-${heritagePlace.id}`,
        type: 'walk',
        title: `Living Heritage Stop · ${heritagePlace.name}`,
        subtitle: `${mins} min walk (${dist}m)`,
        targetPlaceId: heritagePlace.id,
        estimatedMinutes: mins,
        reason: `Discover the intimate north-facing courtyard where poet-monk Manhae wrote under towering pine trees.`,
      });
    }

    suggestions.push({
      id: 'sug-route-wall',
      type: 'route',
      title: 'Curated 2.5-Hour Circuit · Fortress & Village Ridge',
      subtitle: 'Hyehwamun → Seongbuk City Wall → Bukjeong → Sukjeongmun',
      reason: 'Traverse 600 years of defensive stonework and living hillside communities along the scenic spine of northern Seoul.',
    });

    suggestions.push({
      id: 'sug-tip-walk',
      type: 'tip',
      title: 'Trail & Footwear Guidance',
      subtitle: 'Terrain preparation',
      reason: 'Wear comfortable sneakers. Ancient stone steps can be irregular. Rampart trail illumination is active until 23:00.',
    });
  } else {
    // Tea & Cafe
    const templePlace = PLACES_DATA.find((p) => p.id === 'gilsangsa');
    if (templePlace) {
      const dist = calculateDistanceMeters(
        currentPlace.coordinates.lat,
        currentPlace.coordinates.lng,
        templePlace.coordinates.lat,
        templePlace.coordinates.lng
      );
      const mins = estimateWalkingMinutes(dist);
      suggestions.push({
        id: `sug-temple-${templePlace.id}`,
        type: 'walk',
        title: `Forest Sanctuary Walk · ${templePlace.name}`,
        subtitle: `${mins} min walk (${dist}m)`,
        targetPlaceId: templePlace.id,
        estimatedMinutes: mins,
        reason: `Stroll up the gentle wooded slope to experience the silent mountain sanctuary and interfaith Guanyin statue.`,
      });
    }

    const villagePlace = PLACES_DATA.find((p) => p.id === 'bukjeong-village');
    if (villagePlace) {
      const dist = calculateDistanceMeters(
        currentPlace.coordinates.lat,
        currentPlace.coordinates.lng,
        villagePlace.coordinates.lat,
        villagePlace.coordinates.lng
      );
      const mins = estimateWalkingMinutes(dist);
      suggestions.push({
        id: `sug-village-${villagePlace.id}`,
        type: 'walk',
        title: `Hillside Village Stroll · ${villagePlace.name}`,
        subtitle: `${mins} min walk (${dist}m)`,
        targetPlaceId: villagePlace.id,
        estimatedMinutes: mins,
        reason: `Climb the historic alleyway steps to see the living village resting directly against the Seoul City Wall.`,
      });
    }

    suggestions.push({
      id: 'sug-route-peace',
      type: 'route',
      title: 'Curated 2-Hour Circuit · Contemplative Sanctuary',
      subtitle: 'Temple → Tea House → Hillside Hanok',
      reason: 'The definitive quiet trail through Seongbuk’s preserved literary and spiritual hideaways.',
    });

    suggestions.push({
      id: 'sug-tip-tea',
      type: 'tip',
      title: 'Tea House Etiquette',
      subtitle: 'Slow living rituals',
      reason: 'Take off shoes before stepping on wood flooring. Take your time to enjoy the tea temperature and gentle garden sounds.',
    });
  }

  return suggestions;
}

// Find a route by its ID
export function getRouteById(routeId: string): CuratedRoute | undefined {
  return CURATED_ROUTES.find((r) => r.id === routeId);
}
