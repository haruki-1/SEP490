import React, { useState } from "react";
import ReactMapGL, { Marker, Popup } from "react-map-gl";
import styled from "styled-components";
import { MapPin } from "react-feather";

// Example data
const guidebooks = [
  {
    id: 1,
    title: "Explore Hanoi",
    description: "Discover the best food and culture in Hanoi.",
    lat: 21.0285,
    long: 105.8542,
  },
  {
    id: 2,
    title: "Da Nang Adventures",
    description: "A coastal city with beautiful beaches.",
    lat: 16.0471,
    long: 108.2062,
  },
];

const GuidebookMap = () => {
  const [viewport, setViewport] = useState({
    latitude: 21.0285,
    longitude: 105.8542,
    zoom: 5,
  });

  const [selectedBook, setSelectedBook] = useState(null);

  return (
    <MapContainer>
      {/* Mapbox Map */}
      <ReactMapGL
        {...viewport}
        width="100%"
        height="100%"
        mapStyle="mapbox://styles/mapbox/streets-v11"
        mapboxAccessToken="YOUR_MAPBOX_ACCESS_TOKEN"
        onMove={(evt) => setViewport(evt.viewState)}
      >
        {/* Markers */}
        {guidebooks.map((book) => (
          <Marker key={book.id} longitude={book.long} latitude={book.lat}>
            <button className="marker-btn" onClick={() => setSelectedBook(book)}>
              <MapPin color="#FF385C" />
            </button>
          </Marker>
        ))}

        {/* Popup */}
        {selectedBook && (
          <Popup
            longitude={selectedBook.long}
            latitude={selectedBook.lat}
            onClose={() => setSelectedBook(null)}
            closeOnClick={true}
          >
            <PopupContent>
              <h3>{selectedBook.title}</h3>
              <p>{selectedBook.description}</p>
            </PopupContent>
          </Popup>
        )}
      </ReactMapGL>
    </MapContainer>
  );
};

export default GuidebookMap;

// Styled Components
const MapContainer = styled.div`
  width: 100%;
  height: 90vh;
`;

const PopupContent = styled.div`
  font-family: Arial, sans-serif;
  color: #333;
  h3 {
    font-size: 1.2rem;
    font-weight: bold;
    margin-bottom: 0.5rem;
  }
  p {
    font-size: 1rem;
  }
`;
