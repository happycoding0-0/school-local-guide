import React from 'react';
import type { Place } from '../types';
import { PlaceIndexItem } from './PlaceIndexItem';

interface PlaceIndexProps {
  places: Place[];
  selectedPlaceId: string | null;
  hoveredPlaceId: string | null;
  onSelectPlace: (place: Place) => void;
  onHoverPlace: (id: string | null) => void;
}

export const PlaceIndex: React.FC<PlaceIndexProps> = ({
  places,
  selectedPlaceId,
  hoveredPlaceId,
  onSelectPlace,
  onHoverPlace,
}) => {
  return (
    <section className="place-index-container" aria-label="Curated Place Index">
      <div className="place-index-header">
        <span>Curated Place Index</span>
        <span>{places.length} Locations</span>
      </div>

      <div className="place-index-list">
        {places.map((place) => (
          <PlaceIndexItem
            key={place.id}
            place={place}
            isSelected={selectedPlaceId === place.id}
            isHovered={hoveredPlaceId === place.id}
            onSelect={onSelectPlace}
            onHover={onHoverPlace}
          />
        ))}
      </div>
    </section>
  );
};
