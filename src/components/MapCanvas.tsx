import React, { useEffect, useRef } from 'react';
import L from 'leaflet';
import type { Place } from '../types';
import { Plus, Minus, RotateCcw } from 'lucide-react';

interface MapCanvasProps {
  places: Place[];
  selectedPlace: Place | null;
  hoveredPlaceId: string | null;
  onSelectPlace: (place: Place) => void;
  onHoverPlace: (id: string | null) => void;
}

// Seongbuk-dong geographic center and optimal initial zoom
const SEONGBUK_CENTER: [number, number] = [37.5938, 126.9962];
const INITIAL_ZOOM = 15;

export const MapCanvas: React.FC<MapCanvasProps> = ({
  places,
  selectedPlace,
  hoveredPlaceId,
  onSelectPlace,
  onHoverPlace,
}) => {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const markersRef = useRef<Map<string, L.Marker>>(new Map());

  // 1. Initialize Map once
  useEffect(() => {
    if (!mapContainerRef.current || mapInstanceRef.current) return;

    const map = L.map(mapContainerRef.current, {
      center: SEONGBUK_CENTER,
      zoom: INITIAL_ZOOM,
      zoomControl: false,
      attributionControl: true,
      maxZoom: 18,
      minZoom: 13,
    });

    // Clean OpenStreetMap tiles - 100% free, zero watermarks, no API key required
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      maxZoom: 19,
    }).addTo(map);

    mapInstanceRef.current = map;

    return () => {
      map.remove();
      mapInstanceRef.current = null;
    };
  }, []);

  // 2. Synchronize Places Markers
  useEffect(() => {
    const map = mapInstanceRef.current;
    if (!map) return;

    // Clear existing markers that might have been removed
    markersRef.current.forEach((marker) => marker.remove());
    markersRef.current.clear();

    places.forEach((place) => {
      const isSelected = selectedPlace?.id === place.id;
      const isHovered = hoveredPlaceId === place.id;

      const customIcon = L.divIcon({
        className: 'custom-leaflet-div-wrapper',
        html: `
          <div class="custom-map-marker ${isSelected ? 'selected' : ''} ${isHovered ? 'hovered' : ''}">
            <span>${place.numericId}</span>
            <span class="custom-map-marker-label">${place.name}</span>
          </div>
        `,
        iconSize: [32, 32],
        iconAnchor: [16, 16],
      });

      const marker = L.marker([place.coordinates.lat, place.coordinates.lng], {
        icon: customIcon,
        title: place.name,
      });

      marker.on('click', () => {
        onSelectPlace(place);
      });

      marker.on('mouseover', () => {
        onHoverPlace(place.id);
      });

      marker.on('mouseout', () => {
        onHoverPlace(null);
      });

      marker.addTo(map);
      markersRef.current.set(place.id, marker);
    });
  }, [places, onSelectPlace, onHoverPlace]);

  // 3. Update Marker visual states on selection or hover change
  useEffect(() => {
    places.forEach((place) => {
      const marker = markersRef.current.get(place.id);
      if (!marker) return;

      const isSelected = selectedPlace?.id === place.id;
      const isHovered = hoveredPlaceId === place.id;

      const updatedIcon = L.divIcon({
        className: 'custom-leaflet-div-wrapper',
        html: `
          <div class="custom-map-marker ${isSelected ? 'selected' : ''} ${isHovered ? 'hovered' : ''}">
            <span>${place.numericId}</span>
            <span class="custom-map-marker-label">${place.name}</span>
          </div>
        `,
        iconSize: [32, 32],
        iconAnchor: [16, 16],
      });

      marker.setIcon(updatedIcon);

      if (isSelected) {
        marker.setZIndexOffset(1000);
      } else if (isHovered) {
        marker.setZIndexOffset(500);
      } else {
        marker.setZIndexOffset(0);
      }
    });
  }, [places, selectedPlace, hoveredPlaceId]);

  // 4. Smooth Pan/FlyTo when selectedPlace updates
  useEffect(() => {
    const map = mapInstanceRef.current;
    if (!map || !selectedPlace) return;

    // Small offset on desktop so detail sheet doesn't overlap the marker point
    const isDesktop = window.innerWidth > 900;
    const targetLng = isDesktop
      ? selectedPlace.coordinates.lng + 0.0018 // Shift slightly left so marker stays visible next to floating sheet
      : selectedPlace.coordinates.lng;

    map.flyTo([selectedPlace.coordinates.lat, targetLng], 16, {
      duration: 0.7,
      easeLinearity: 0.25,
    });
  }, [selectedPlace]);

  // Map Controls Handlers
  const handleZoomIn = () => {
    mapInstanceRef.current?.zoomIn();
  };

  const handleZoomOut = () => {
    mapInstanceRef.current?.zoomOut();
  };

  const handleResetCenter = () => {
    mapInstanceRef.current?.flyTo(SEONGBUK_CENTER, INITIAL_ZOOM, {
      duration: 0.6,
    });
  };

  return (
    <div className="map-viewport" aria-label="Interactive Seongbuk Map Canvas">
      <div ref={mapContainerRef} className="map-container" />

      {/* District Live Status Badge */}
      <div className="map-district-badge">
        <span className="pulse-dot" aria-hidden="true" />
        <span>Seongbuk District · {places.length} Locations on Map</span>
      </div>

      {/* Floating Custom Map Controls */}
      <div className="map-floating-controls" aria-label="Map Controls">
        <button
          className="map-control-btn"
          onClick={handleZoomIn}
          title="Zoom in"
          aria-label="Zoom in"
          type="button"
        >
          <Plus size={16} aria-hidden="true" />
        </button>
        <button
          className="map-control-btn"
          onClick={handleZoomOut}
          title="Zoom out"
          aria-label="Zoom out"
          type="button"
        >
          <Minus size={16} aria-hidden="true" />
        </button>
        <button
          className="map-control-btn"
          onClick={handleResetCenter}
          title="Re-center District"
          aria-label="Re-center District"
          type="button"
        >
          <RotateCcw size={14} aria-hidden="true" />
        </button>
      </div>
    </div>
  );
};
