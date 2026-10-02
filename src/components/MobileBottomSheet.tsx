import React, { useState, useEffect } from 'react';
import type { Place } from '../types';
import { PlaceDetailSheet } from './PlaceDetailSheet';
import { PlaceIndex } from './PlaceIndex';
import { ChevronUp, ChevronDown } from 'lucide-react';

interface MobileBottomSheetProps {
  selectedPlace: Place | null;
  places: Place[];
  onSelectPlace: (place: Place) => void;
  onCloseDetail: () => void;
}

type SheetState = 'peek' | 'expanded' | 'fullscreen';

export const MobileBottomSheet: React.FC<MobileBottomSheetProps> = ({
  selectedPlace,
  places,
  onSelectPlace,
  onCloseDetail,
}) => {
  const [sheetState, setSheetState] = useState<SheetState>('peek');

  // Automatically expand slightly when a place is selected on the map
  useEffect(() => {
    if (selectedPlace) {
      setSheetState('expanded');
    }
  }, [selectedPlace]);

  const toggleExpansion = () => {
    if (sheetState === 'peek') {
      setSheetState('expanded');
    } else if (sheetState === 'expanded') {
      setSheetState('fullscreen');
    } else {
      setSheetState('peek');
    }
  };

  return (
    <aside
      className={`mobile-bottom-sheet state-${sheetState}`}
      aria-label="Mobile Exploration Bottom Sheet"
    >
      {/* Handle Bar */}
      <div className="sheet-handle-bar" onClick={toggleExpansion} role="button" tabIndex={0}>
        <div className="sheet-handle-pill" />
      </div>

      {/* Sheet Summary Header */}
      <div className="sheet-header-summary" onClick={toggleExpansion}>
        <div className="sheet-summary-left">
          <span className="sheet-summary-title">
            {selectedPlace ? selectedPlace.name : 'Seongbuk-dong Exploration'}
          </span>
          <span className="sheet-summary-subtitle">
            {selectedPlace
              ? `${selectedPlace.category} · ${selectedPlace.district}`
              : `${places.length} Curated Local Places · Tap to explore`}
          </span>
        </div>

        <button
          className="sheet-toggle-btn"
          onClick={(e) => {
            e.stopPropagation();
            toggleExpansion();
          }}
          type="button"
        >
          {sheetState === 'peek' ? (
            <ChevronUp size={16} aria-hidden="true" />
          ) : (
            <ChevronDown size={16} aria-hidden="true" />
          )}
        </button>
      </div>

      {/* Scrollable Content (Detail or Index) */}
      <div className="sheet-content-scrollable">
        {selectedPlace ? (
          <PlaceDetailSheet
            place={selectedPlace}
            onClose={() => {
              onCloseDetail();
              setSheetState('peek');
            }}
            onSelectPlace={onSelectPlace}
          />
        ) : (
          <PlaceIndex
            places={places}
            selectedPlaceId={null}
            hoveredPlaceId={null}
            onSelectPlace={(p) => {
              onSelectPlace(p);
              setSheetState('expanded');
            }}
            onHoverPlace={() => {}}
          />
        )}
      </div>
    </aside>
  );
};
