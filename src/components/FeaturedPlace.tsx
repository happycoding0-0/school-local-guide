import React from 'react';
import type { Place } from '../types';
import { ImageFallback } from './ImageFallback';
import { ArrowUpRight } from 'lucide-react';

interface FeaturedPlaceProps {
  place: Place;
  onSelect: (place: Place) => void;
}

export const FeaturedPlace: React.FC<FeaturedPlaceProps> = ({ place, onSelect }) => {
  return (
    <article
      className="featured-place-section"
      onClick={() => onSelect(place)}
      aria-label={`Featured spot: ${place.name}`}
    >
      <div className="featured-header-label">
        <span>Featured Discovery</span>
        <ArrowUpRight size={14} aria-hidden="true" />
      </div>

      <div className="featured-image-wrapper">
        {place.image.isVerifiedPhoto && place.image.url ? (
          <img
            src={place.image.url}
            alt={place.name}
            loading="lazy"
          />
        ) : (
          <ImageFallback place={place} />
        )}
      </div>

      <div className="featured-meta">
        <span className="featured-number">NO. {place.numericId}</span>
        <span className="featured-category">{place.category}</span>
      </div>

      <h2 className="featured-name">
        {place.name}
        <span className="featured-korean-name">{place.nameKo}</span>
      </h2>

      <p className="featured-summary">{place.shortDescription}</p>
    </article>
  );
};
