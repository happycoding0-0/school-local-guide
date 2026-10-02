import React from 'react';
import type { Place } from '../types';

interface ImageFallbackProps {
  place: Place;
}

export const ImageFallback: React.FC<ImageFallbackProps> = ({ place }) => {
  return (
    <div className="modern-editorial-cover" role="img" aria-label={`Architectural graphic cover for ${place.name}`}>
      {/* Precision Geometric Grid Background */}
      <div className="cover-grid-layer" aria-hidden="true" />

      {/* Top Meta Header */}
      <div className="cover-top-bar">
        <div className="cover-index-badge">
          <span className="cover-index-prefix">LOC</span>
          <span className="cover-index-val">{place.numericId}</span>
        </div>
        <div className="cover-category-chip">
          <span className="cover-category-dot" />
          <span className="cover-category-text">{place.category.toUpperCase()}</span>
        </div>
      </div>

      {/* Center Minimalist Map Geometry & Typography */}
      <div className="cover-center-block">
        <div className="cover-geometry-reticle" aria-hidden="true">
          <svg viewBox="0 0 100 100" className="reticle-svg" fill="none" stroke="currentColor">
            {/* Minimal coordinate circle and crosshair lines */}
            <circle cx="50" cy="50" r="38" strokeWidth="0.75" strokeDasharray="3 3" opacity="0.4" />
            <circle cx="50" cy="50" r="22" strokeWidth="0.75" opacity="0.3" />
            <circle cx="50" cy="50" r="4" fill="currentColor" opacity="0.6" />
            <line x1="12" y1="50" x2="38" y2="50" strokeWidth="0.75" opacity="0.5" />
            <line x1="62" y1="50" x2="88" y2="50" strokeWidth="0.75" opacity="0.5" />
            <line x1="50" y1="12" x2="50" y2="38" strokeWidth="0.75" opacity="0.5" />
            <line x1="50" y1="62" x2="50" y2="88" strokeWidth="0.75" opacity="0.5" />
          </svg>
        </div>

        <div className="cover-titles">
          <h3 className="cover-place-name">{place.name}</h3>
          <span className="cover-korean-clean">{place.nameKo}</span>
        </div>
      </div>

      {/* Bottom Technical Coordinates Bar */}
      <div className="cover-bottom-bar">
        <div className="cover-coords-group">
          <span className="cover-coords-label">GEO</span>
          <span className="cover-coords-val">
            {place.coordinates.lat.toFixed(5)}°N · {place.coordinates.lng.toFixed(5)}°E
          </span>
        </div>
        <div className="cover-tag-group">
          <span className="cover-district-label">SEONGBUK ARCHIVE</span>
        </div>
      </div>
    </div>
  );
};
