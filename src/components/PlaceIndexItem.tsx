import React from 'react';
import type { Place } from '../types';

interface PlaceIndexItemProps {
  place: Place;
  isSelected: boolean;
  isHovered: boolean;
  onSelect: (place: Place) => void;
  onHover: (id: string | null) => void;
}

export const PlaceIndexItem: React.FC<PlaceIndexItemProps> = ({
  place,
  isSelected,
  isHovered,
  onSelect,
  onHover,
}) => {
  return (
    <div
      className={`place-index-item ${isSelected ? 'selected' : ''} ${isHovered ? 'hovered' : ''}`}
      onClick={() => onSelect(place)}
      onMouseEnter={() => onHover(place.id)}
      onMouseLeave={() => onHover(null)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onSelect(place);
        }
      }}
      aria-label={`Select ${place.name}, ${place.category}`}
    >
      <span className="item-index-number">{place.numericId}</span>

      <div className="item-index-content">
        <div className="item-title-row">
          <span className="item-name">{place.name}</span>
          <span className="item-korean">{place.nameKo}</span>
        </div>
        <div className="item-meta-row">
          <span className="item-category">{place.category}</span>
          <span>·</span>
          <span>Seongbuk</span>
        </div>
      </div>
    </div>
  );
};
