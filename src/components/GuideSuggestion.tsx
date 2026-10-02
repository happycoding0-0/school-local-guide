import React from 'react';
import type { GuideSuggestionItem } from '../types';
import { Footprints, Coffee, UtensilsCrossed, Compass, Info, ArrowRight } from 'lucide-react';

interface GuideSuggestionProps {
  suggestion: GuideSuggestionItem;
  onSelectSuggestion: (suggestion: GuideSuggestionItem) => void;
}

export const GuideSuggestion: React.FC<GuideSuggestionProps> = ({
  suggestion,
  onSelectSuggestion,
}) => {
  const getIcon = () => {
    switch (suggestion.type) {
      case 'tea':
        return <Coffee size={13} aria-hidden="true" />;
      case 'food':
        return <UtensilsCrossed size={13} aria-hidden="true" />;
      case 'route':
        return <Compass size={13} aria-hidden="true" />;
      case 'walk':
        return <Footprints size={13} aria-hidden="true" />;
      case 'tip':
      default:
        return <Info size={13} aria-hidden="true" />;
    }
  };

  return (
    <button
      className="guide-suggestion-card"
      onClick={() => onSelectSuggestion(suggestion)}
      type="button"
    >
      <div className="suggestion-top-row">
        <div className="suggestion-meta-group">
          <div className="suggestion-type-icon">{getIcon()}</div>
          <span className="suggestion-title">{suggestion.title}</span>
        </div>
        <div className="suggestion-meta-group">
          <span className="suggestion-subtitle">{suggestion.subtitle}</span>
          <ArrowRight size={13} className="suggestion-arrow" aria-hidden="true" />
        </div>
      </div>
      <p className="suggestion-reason">{suggestion.reason}</p>
    </button>
  );
};
