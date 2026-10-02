import React from 'react';
import type { CuratedRoute, Place } from '../types';
import { PLACES_DATA } from '../data/places';
import { Clock, ArrowLeft, ArrowUpRight } from 'lucide-react';

interface RouteViewProps {
  route: CuratedRoute;
  onSelectPlace: (place: Place) => void;
  onCloseRoute: () => void;
}

export const RouteView: React.FC<RouteViewProps> = ({
  route,
  onSelectPlace,
  onCloseRoute,
}) => {
  return (
    <div className="route-view-container" aria-label={`Curated route: ${route.title}`}>
      <div className="route-header">
        <div className="route-header-titles">
          <span className="route-tag">Curated Walking Circuit</span>
          <h3 className="route-title">{route.title}</h3>
          <span className="route-duration-badge">
            <Clock size={12} style={{ display: 'inline', marginRight: 4 }} aria-hidden="true" />
            {route.durationLabel}
          </span>
        </div>
        <button
          className="detail-close-btn"
          onClick={onCloseRoute}
          aria-label="Back to place details"
          type="button"
        >
          <ArrowLeft size={14} aria-hidden="true" />
        </button>
      </div>

      <p className="route-description">{route.description}</p>

      {/* Step-by-Step Vertical Timeline */}
      <div className="route-timeline">
        {route.steps.map((step, idx) => {
          const place = PLACES_DATA.find((p) => p.id === step.placeId);
          return (
            <div key={step.placeId} className="route-step-item">
              <div className="route-step-indicator">
                <span className="step-marker-dot">{idx + 1}</span>
                {idx < route.steps.length - 1 && <span className="step-connecting-line" />}
              </div>

              <div className="route-step-content">
                <div
                  className="step-place-name"
                  onClick={() => place && onSelectPlace(place)}
                  role="button"
                  tabIndex={0}
                >
                  <span>{place ? place.name : step.placeId}</span>
                  <span className="step-allocated-time">{step.stepMinutes} min</span>
                  <ArrowUpRight size={12} aria-hidden="true" />
                </div>
                <p className="step-instruction-note">{step.note}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
