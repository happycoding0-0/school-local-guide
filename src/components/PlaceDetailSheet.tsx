import React from 'react';
import type { Place } from '../types';
import { ImageFallback } from './ImageFallback';
import { LocalGuide } from './LocalGuide';
import { X, MapPin, Train, Sparkles, Heart } from 'lucide-react';

interface PlaceDetailSheetProps {
  place: Place;
  onClose: () => void;
  onSelectPlace: (place: Place) => void;
}

export const PlaceDetailSheet: React.FC<PlaceDetailSheetProps> = ({
  place,
  onClose,
  onSelectPlace,
}) => {
  const [activePhoto, setActivePhoto] = React.useState<'hero' | 'detail'>('hero');

  // Reset to hero when place changes
  React.useEffect(() => {
    setActivePhoto('hero');
  }, [place.id]);

  const currentMedia = activePhoto === 'detail' && place.image.detailImage
    ? {
        url: place.image.detailImage.url,
        attribution: place.image.detailImage.caption || place.image.detailImage.creator,
        license: place.image.detailImage.license,
      }
    : {
        url: place.image.url,
        attribution: place.image.attribution,
        license: place.image.license,
      };

  return (
    <article className="detail-sheet" aria-label={`Details for ${place.name}`}>
      {/* Header Close Control */}
      <div className="detail-header-actions">
        <button
          className="detail-close-btn"
          onClick={onClose}
          aria-label="Close details"
          type="button"
        >
          <X size={16} aria-hidden="true" />
        </button>
      </div>

      {/* Hero Media Container */}
      <div className="detail-media-container">
        {place.image.isVerifiedPhoto && currentMedia.url ? (
          <>
            <img src={currentMedia.url} alt={`${place.name} (${activePhoto})`} />
            
            {/* Multi-Photo Switcher Pill */}
            {place.image.detailImage && (
              <div className="photo-view-switcher" role="group" aria-label="Photo views">
                <button
                  type="button"
                  className={`photo-switch-btn ${activePhoto === 'hero' ? 'active' : ''}`}
                  onClick={() => setActivePhoto('hero')}
                >
                  Overview
                </button>
                <button
                  type="button"
                  className={`photo-switch-btn ${activePhoto === 'detail' ? 'active' : ''}`}
                  onClick={() => setActivePhoto('detail')}
                >
                  Detail
                </button>
              </div>
            )}

            {currentMedia.attribution && (
              <div className="media-attribution-badge">
                <span>{currentMedia.attribution}</span>
                {currentMedia.license && <span>({currentMedia.license})</span>}
              </div>
            )}
          </>
        ) : (
          <ImageFallback place={place} />
        )}
      </div>

      {/* Body Content */}
      <div className="detail-body">
        <div className="detail-title-block">
          <div className="detail-category-row">
            <span className="detail-index-num">NO. {place.numericId}</span>
            <span className="detail-category-badge">{place.category}</span>
          </div>

          <h2 className="detail-main-name">
            {place.name}
            <span className="detail-korean-name"> ({place.nameKo})</span>
          </h2>
        </div>

        <p className="detail-narrative">{place.description}</p>

        {/* Why Locals Like It */}
        <div className="detail-why-local">
          <div className="why-local-header">
            <Heart size={12} fill="currentColor" aria-hidden="true" />
            <span>Why Locals Appreciate This Place</span>
          </div>
          <p className="why-local-text">{place.whyLocalsLikeIt}</p>
        </div>

        {/* Practical Local Guidance */}
        <div className="detail-info-list">
          <div className="detail-info-row">
            <MapPin size={15} className="detail-info-icon" aria-hidden="true" />
            <div className="detail-info-content">
              <span className="detail-info-label">Address</span>
              <span className="detail-info-value">{place.address}</span>
            </div>
          </div>

          <div className="detail-info-row">
            <Train size={15} className="detail-info-icon" aria-hidden="true" />
            <div className="detail-info-content">
              <span className="detail-info-label">Transit Access</span>
              <span className="detail-info-value">{place.nearestStation}</span>
            </div>
          </div>

          {place.walkingTip && (
            <div className="detail-info-row">
              <Sparkles size={15} className="detail-info-icon" aria-hidden="true" />
              <div className="detail-info-content">
                <span className="detail-info-label">Local Walking Tip</span>
                <span className="detail-info-value">{place.walkingTip}</span>
              </div>
            </div>
          )}
        </div>

        {/* Tags */}
        <div className="detail-tags-row">
          {place.tags.map((tag) => (
            <span key={tag} className="detail-tag">
              #{tag}
            </span>
          ))}
        </div>

        {/* Integrated Contextual Local Guide */}
        <LocalGuide place={place} onSelectPlace={onSelectPlace} />
      </div>
    </article>
  );
};
