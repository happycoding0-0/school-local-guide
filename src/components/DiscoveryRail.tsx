import React from 'react';
import type { Place } from '../types';
import { AreaContext } from './AreaContext';
import { FeaturedPlace } from './FeaturedPlace';
import { PlaceIndex } from './PlaceIndex';

interface DiscoveryRailProps {
  featuredPlace: Place;
  places: Place[];
  selectedPlaceId: string | null;
  hoveredPlaceId: string | null;
  onSelectPlace: (place: Place) => void;
  onHoverPlace: (id: string | null) => void;
}

export const DiscoveryRail: React.FC<DiscoveryRailProps> = ({
  featuredPlace,
  places,
  selectedPlaceId,
  hoveredPlaceId,
  onSelectPlace,
  onHoverPlace,
}) => {
  return (
    <aside className="discovery-rail" aria-label="Editorial Discovery Rail">
      <AreaContext />
      <FeaturedPlace place={featuredPlace} onSelect={onSelectPlace} />
      <PlaceIndex
        places={places}
        selectedPlaceId={selectedPlaceId}
        hoveredPlaceId={hoveredPlaceId}
        onSelectPlace={onSelectPlace}
        onHoverPlace={onHoverPlace}
      />
    </aside>
  );
};
