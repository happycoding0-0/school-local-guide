import React, { useState } from 'react';
import type { Place, GuideSuggestionItem } from '../types';
import { getContextualSuggestions, getRouteById } from '../services/localGuideEngine';
import { PLACES_DATA } from '../data/places';
import { GuideSuggestion } from './GuideSuggestion';
import { RouteView } from './RouteView';
import { Compass } from 'lucide-react';

interface LocalGuideProps {
  place: Place;
  onSelectPlace: (place: Place) => void;
}

export const LocalGuide: React.FC<LocalGuideProps> = ({ place, onSelectPlace }) => {
  const [activeRouteId, setActiveRouteId] = useState<string | null>(null);

  // Reset active route when selected place changes
  React.useEffect(() => {
    setActiveRouteId(null);
  }, [place.id]);

  const suggestions = getContextualSuggestions(place);
  const activeRoute = activeRouteId ? getRouteById(activeRouteId) : undefined;

  const handleSelectSuggestion = (suggestion: GuideSuggestionItem) => {
    if (suggestion.type === 'route') {
      // Find corresponding route based on category or default
      if (place.category === 'Culture' || place.category === 'Tea & Cafe') {
        setActiveRouteId('route-peace');
      } else if (place.category === 'Nature & Walk') {
        setActiveRouteId('route-wall-heritage');
      } else {
        setActiveRouteId('route-local-table');
      }
    } else if (suggestion.targetPlaceId) {
      const targetPlace = PLACES_DATA.find((p) => p.id === suggestion.targetPlaceId);
      if (targetPlace) {
        onSelectPlace(targetPlace);
      }
    }
  };

  return (
    <section className="local-guide-section" aria-label="Contextual Local Guide">
      <div className="local-guide-header">
        <span className="guide-badge-title">
          <Compass size={13} aria-hidden="true" />
          Local Guide Agent
        </span>
        <h3 className="guide-heading">Explore from {place.name}</h3>
        <p className="guide-subheading">
          Contextual pairings calculated from geographic distance and neighborhood relations.
        </p>
      </div>

      {activeRoute ? (
        <RouteView
          route={activeRoute}
          onSelectPlace={onSelectPlace}
          onCloseRoute={() => setActiveRouteId(null)}
        />
      ) : (
        <div className="guide-suggestions-list">
          {suggestions.map((suggestion) => (
            <GuideSuggestion
              key={suggestion.id}
              suggestion={suggestion}
              onSelectSuggestion={handleSelectSuggestion}
            />
          ))}
        </div>
      )}
    </section>
  );
};
