import React, { useState } from "react";
import Map from "./Map";
import { searchResults } from "../data"; // danh sách địa điểm bạn có
import styled from "styled-components";

export default function SearchPage() {
  const [showMap, setShowMap] = useState(false);
  const [viewport, setViewport] = useState({
    latitude: 21.0285,
    longitude: 105.8542,
    zoom: 12,
  });

  const [selectedLocation, setSelectedLocation] = useState({});

  return (
    <Container>
      {/* Nút toggle bản đồ */}
      <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50">
        <ToggleButton onClick={() => setShowMap(!showMap)}>
        {showMap ? t('hideMap') : t('showMap')}
        </ToggleButton>
      </div>

      <ContentWrapper>
        {/* Danh sách */}
        <ListWrapper $showMap={showMap}>
          {searchResults.map((result, i) => (
            <Card key={i}>
              <h4>{result.title}</h4>
              <p>{result.price}</p>
            </Card>
          ))}
        </ListWrapper>

        {/* Bản đồ */}
        {showMap && (
          <MapWrapper>
            <Map
              results={searchResults}
              selectedLocation={selectedLocation}
              setSelectedLocation={setSelectedLocation}
              viewport={viewport}
              setViewport={setViewport}
            />
          </MapWrapper>
        )}
      </ContentWrapper>
    </Container>
  );
}
const Container = styled.div`
  position: relative;
  width: 100%;
`;

const ToggleButton = styled.button`
  position: fixed;
  top: 1rem;
  right: 1rem;
  z-index: 99;
  padding: 0.75rem 1.5rem;
  background: white;
  border-radius: 999px;
  box-shadow: 0 0 10px #0003;
  border: none;
  cursor: pointer;
  font-weight: bold;
`;

const ContentWrapper = styled.div`
  display: flex;
  flex-direction: row;
  height: 100vh;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const ListWrapper = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: 2rem;
  ${({ $showMap }) =>
    $showMap
      ? `
    @media (min-width: 768px) {
      width: 50%;
    }
  `
      : `
    width: 100%;
  `}
`;

const MapWrapper = styled.div`
  width: 100%;
  height: 100vh;

  @media (min-width: 768px) {
    width: 50%;
    height: 100vh;
    position: sticky;
    top: 0;
  }

  @media (max-width: 768px) {
    position: fixed;
    top: 0;
    left: 0;
    z-index: 98;
    height: 100%;
  }
`;

const Card = styled.div`
  margin-bottom: 1.5rem;
  padding: 1rem;
  border: 1px solid #eee;
  border-radius: 0.75rem;
  background: white;
`;