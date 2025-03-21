import React, { useState } from 'react';
import 'mapbox-gl/dist/mapbox-gl.css';
import { MapPin } from 'react-feather';
import Map,{ Marker, Popup } from 'react-map-gl/mapbox';

// Sample Data
const properties = [
  {
    id: 1,
    title: 'Modern Studio in Old Quarter',
    location: 'Hanoi, Vietnam',
    latitude: 21.0321,
    longitude: 105.8510,
    price: 45,
  },
  {
    id: 2,
    title: 'Luxury Apartment with River View',
    location: 'Hanoi, Vietnam',
    latitude: 21.0395,
    longitude: 105.8650,
    price: 75,
  },
  {
    id: 3,
    title: 'Traditional Vietnamese House',
    location: 'Hanoi, Vietnam',
    latitude: 21.0240,
    longitude: 105.8420,
    price: 38,
  }
];

export default function MapPage() {
  const [viewport, setViewport] = useState({
    latitude: 21.0285,
    longitude: 105.8542,
    zoom: 12,
  });

  const [selectedProperty, setSelectedProperty] = useState(null);

  return (
    <div style={{ width: '100vw', height: '100vh' }}>
      {/* Map Component */}
      <Map
        {...viewport}
        width="100%"
        height="100%"
        mapStyle="mapbox://styles/mapbox/streets-v11"
        mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_TOKEN}
        onMove={(evt) => setViewport(evt.viewState)}
      >
        {/* Markers */}
        {properties.map((property) => (
          <Marker key={property.id} longitude={property.longitude} latitude={property.latitude}>
            <button
              className="marker-btn"
              onClick={() => setSelectedProperty(property)}
              aria-label="Property Marker"
            >
              <MapPin color="#FF385C" />
            </button>
          </Marker>
        ))}

        {/* Popup on Marker Click */}
        {selectedProperty && (
          <Popup
            longitude={selectedProperty.longitude}
            latitude={selectedProperty.latitude}
            onClose={() => setSelectedProperty(null)}
          >
            <div>
              <h3>{selectedProperty.title}</h3>
              <p>Price: ${selectedProperty.price} / night</p>
              <p>{selectedProperty.location}</p>
            </div>
          </Popup>
        )}
      </Map>
    </div>
  );
}
