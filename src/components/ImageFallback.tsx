import type { Place } from '../types';

interface ImageFallbackProps {
  place: Place;
}

export const ImageFallback: React.FC<ImageFallbackProps> = ({ place }) => {
  const motif = place.image.motif || 'hanok';

  // SVG Line Motifs representing authentic local heritage
  const renderMotifSvg = () => {
    switch (motif) {
      case 'teahouse':
        return (
          <svg className="fallback-svg-icon" viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            {/* Minimalist Tea Bowl & Steam */}
            <path d="M12 24c0 7 4.5 12 12 12s12-5 12-12H12z" />
            <path d="M10 24h28" />
            <path d="M18 36v3h12v-3" />
            <path d="M20 16c1-2 0-4 1-6" />
            <path d="M27 16c1-2 0-4 1-6" />
          </svg>
        );
      case 'stone':
        return (
          <svg className="fallback-svg-icon" viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            {/* Layered Fortress Rampart Battlements */}
            <path d="M6 38h36" />
            <path d="M8 38V24h32v14" />
            <path d="M8 24h7v-6h6v6h6v-6h6v6h7" />
            <path d="M18 31h12" />
            <path d="M14 38v-7" />
            <path d="M34 38v-7" />
          </svg>
        );
      case 'village':
        return (
          <svg className="fallback-svg-icon" viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            {/* Hillside Steps & Low Rooftops */}
            <path d="M6 40h36" />
            <path d="M10 40V34h8V28h8V22h8V16h4v24" />
            <path d="M8 22l8-6 8 6" />
            <path d="M22 16l8-6 8 6" />
          </svg>
        );
      case 'hearth':
        return (
          <svg className="fallback-svg-icon" viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            {/* Traditional Cooking Vessel / Hearth */}
            <ellipse cx="24" cy="20" rx="14" ry="4" />
            <path d="M10 20c0 9 6 15 14 15s14-6 14-15" />
            <path d="M16 35v5M32 35v5" />
            <path d="M24 10v4" />
          </svg>
        );
      case 'hanok':
      default:
        return (
          <svg className="fallback-svg-icon" viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            {/* Sweeping Hanok Roof Eave & Wooden Frame */}
            <path d="M6 22c8-5 20-5 36 0" />
            <path d="M10 21l14-9 14 9" />
            <path d="M12 22v18h24V22" />
            <path d="M20 28v12M28 28v12" />
            <path d="M16 28h16" />
          </svg>
        );
    }
  };

  return (
    <div className="editorial-fallback-cover">
      <div className="fallback-header-row">
        <span className="fallback-index-stamp">NO. {place.numericId}</span>
        <span className="fallback-category-label">{place.category}</span>
      </div>

      <div className="fallback-center-motif">
        {renderMotifSvg()}
        <span className="fallback-korean-watermark">{place.nameKo}</span>
      </div>

      <div className="fallback-footer-row">
        <span className="fallback-coords">
          {place.coordinates.lat.toFixed(4)}°N, {place.coordinates.lng.toFixed(4)}°E
        </span>
        <span className="fallback-district-stamp">Seongbuk Archival Record</span>
      </div>
    </div>
  );
};
