import React, { useState } from 'react';
import ReactMapGL, { Marker, Popup } from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { MapPin } from 'react-feather';

// Sample Data for Markers
const locations = [
  { id: 1, title: 'Hanoi', latitude: 21.0285, longitude: 105.8542 },
  { id: 2, title: 'Da Nang', latitude: 16.0471, longitude: 108.2062 },
  { id: 3, title: 'Ho Chi Minh City', latitude: 10.7769, longitude: 106.7009 }
];

export default function MapPage() {
  const [viewport, setViewport] = useState({
    latitude: 21.0285,
    longitude: 105.8542,
    zoom: 5,
    bearing: 0,
    pitch: 0
  });

  const [selectedLocation, setSelectedLocation] = useState(null);

  return (
    <div style={{ width: '100vw', height: '100vh' }}>
      <ReactMapGL
        {...viewport}
        width="100%"
        height="100%"
        mapStyle="mapbox://styles/mapbox/streets-v11"
        mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_TOKEN}
        onMove={(evt) => setViewport(evt.viewState)}
      >
        {/* Render Markers */}
        {locations.map((loc) => (
          <Marker key={loc.id} longitude={loc.longitude} latitude={loc.latitude}>
            <button
              className="marker-btn"
              onClick={() => setSelectedLocation(loc)}
            >
              <MapPin color="#FF385C" />
            </button>
          </Marker>
        ))}

        {/* Popup for Selected Location */}
        {selectedLocation && (
          <Popup
            longitude={selectedLocation.longitude}
            latitude={selectedLocation.latitude}
            onClose={() => setSelectedLocation(null)}
          >
            <div>
              <h3>{selectedLocation.title}</h3>
            </div>
          </Popup>
        )}
      </ReactMapGL>
    </div>
  );
}