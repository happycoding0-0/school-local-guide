export type PlaceCategory = 'Culture' | 'Nature & Walk' | 'Tea & Cafe' | 'Local Food';

export interface PlaceCoordinates {
  lat: number;
  lng: number;
}

export interface ImageProvenance {
  url: string;
  source: string;
  sourceUrl: string;
  creator: string;
  license: string;
  depictsActualPlace: boolean;
  caption?: string;
}

export interface PlaceImageInfo {
  url?: string;
  isVerifiedPhoto: boolean;
  attribution?: string;
  license?: string;
  source?: string;
  sourceUrl?: string;
  creator?: string;
  depictsActualPlace?: boolean;
  detailImage?: ImageProvenance;
  motif?: 'hanok' | 'mountain' | 'teahouse' | 'stone' | 'hearth' | 'village';
}

export interface Place {
  id: string;
  numericId: string; // '01', '02', etc. for editorial indexing
  name: string;
  nameKo: string;
  category: PlaceCategory;
  district: string;
  coordinates: PlaceCoordinates;
  shortDescription: string;
  description: string;
  whyLocalsLikeIt: string;
  address: string;
  nearestStation: string;
  walkingTip?: string;
  bestTimeToVisit?: string;
  tags: string[];
  image: PlaceImageInfo;
  curatedNearbyIds: string[]; // IDs of complementary places within walking distance
}

export interface GuideSuggestionItem {
  id: string;
  type: 'walk' | 'tea' | 'food' | 'route' | 'tip';
  title: string;
  subtitle: string;
  targetPlaceId?: string;
  estimatedMinutes?: number;
  reason: string;
}

export interface CuratedRouteStep {
  placeId: string;
  stepMinutes: number;
  note: string;
}

export interface CuratedRoute {
  id: string;
  title: string;
  subtitle: string;
  durationLabel: string;
  totalDistanceKm: number;
  theme: 'peace' | 'heritage' | 'evening';
  description: string;
  steps: CuratedRouteStep[];
}
