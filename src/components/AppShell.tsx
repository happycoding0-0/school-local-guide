import React, { useState, useMemo } from 'react';
import type { Place, PlaceCategory } from '../types';
import { PLACES_DATA } from '../data/places';
import { TopNavigation } from './TopNavigation';
import { DiscoveryRail } from './DiscoveryRail';
import { MapCanvas } from './MapCanvas';
import { PlaceDetailSheet } from './PlaceDetailSheet';
import { MobileBottomSheet } from './MobileBottomSheet';

export const AppShell: React.FC = () => {
  const [selectedPlace, setSelectedPlace] = useState<Place | null>(PLACES_DATA[0]);
  const [hoveredPlaceId, setHoveredPlaceId] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<PlaceCategory | 'All'>('All');

  // Filter places based on selected category pill
  const filteredPlaces = useMemo(() => {
    if (selectedCategory === 'All') {
      return PLACES_DATA;
    }
    return PLACES_DATA.filter((p) => p.category === selectedCategory);
  }, [selectedCategory]);

  // Featured place is the first place in the filtered set, or Gilsangsa by default
  const featuredPlace = useMemo(() => {
    return filteredPlaces[0] || PLACES_DATA[0];
  }, [filteredPlaces]);

  const handleSelectPlace = (place: Place) => {
    setSelectedPlace(place);
  };

  const handleCloseDetail = () => {
    setSelectedPlace(null);
  };

  return (
    <div className="app-shell">
      {/* 1. Top Navigation */}
      <TopNavigation
        selectedCategory={selectedCategory}
        onSelectCategory={(cat) => {
          setSelectedCategory(cat);
          // If the selected place doesn't match the new category, reset to the first matching place
          if (cat !== 'All' && selectedPlace && selectedPlace.category !== cat) {
            const firstMatch = PLACES_DATA.find((p) => p.category === cat);
            if (firstMatch) {
              setSelectedPlace(firstMatch);
            }
          }
        }}
        totalCount={filteredPlaces.length}
      />

      {/* 2. Main Desktop Two-Area Composition */}
      <main className="app-main">
        {/* Discovery Rail (30% desktop) */}
        <DiscoveryRail
          featuredPlace={featuredPlace}
          places={filteredPlaces}
          selectedPlaceId={selectedPlace?.id || null}
          hoveredPlaceId={hoveredPlaceId}
          onSelectPlace={handleSelectPlace}
          onHoverPlace={setHoveredPlaceId}
        />

        {/* Spatial Map Canvas (70% desktop hero) */}
        <MapCanvas
          places={filteredPlaces}
          selectedPlace={selectedPlace}
          hoveredPlaceId={hoveredPlaceId}
          onSelectPlace={handleSelectPlace}
          onHoverPlace={setHoveredPlaceId}
        />

        {/* Floating Contextual Detail Surface on Desktop */}
        {selectedPlace && (
          <aside className="desktop-detail-container" aria-label="Selected Place Details">
            <PlaceDetailSheet
              place={selectedPlace}
              onClose={handleCloseDetail}
              onSelectPlace={handleSelectPlace}
            />
          </aside>
        )}
      </main>

      {/* 3. Mobile Bottom Sheet Experience */}
      <MobileBottomSheet
        selectedPlace={selectedPlace}
        places={filteredPlaces}
        onSelectPlace={handleSelectPlace}
        onCloseDetail={handleCloseDetail}
      />
    </div>
  );
};
