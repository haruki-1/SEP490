import React, { useEffect, useRef } from "react";
import styled from "styled-components";
import { MapPin } from "react-feather";
import Map, { Marker, Popup } from "react-map-gl/mapbox";
import { resultImages } from "../data";

const MapComponent = React.memo(
	({ results, selectedLocation, setSelectedLocation, viewport, setViewport }) => {
		const containerRef = useRef(null);

		// Scroll animation effect
		useEffect(() => {
			const handleScroll = () => {
				if (window.scrollY < window.innerHeight * 1.2) {
					containerRef.current.style.transform =
						"translateY(" + window.scrollY * 0.2 + "px)";
				}
			};
			const containerRefCurr = containerRef.current;
			window.addEventListener("scroll", handleScroll);
			return () => window.removeEventListener("scroll", handleScroll);
		}, []);

		return (
			<MapContainer ref={containerRef}>
				<Map
					mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_TOKEN}
					mapStyle="mapbox://styles/mapbox/streets-v11"
					initialViewState={viewport}
					style={{ width: "100%", height: "100%" }}
					onMove={(e) => setViewport(e.viewState)}
				>
					{results.map((result, index) => (
						<div key={result.long}>
							<Marker longitude={result.long} latitude={result.lat}>
								<p
									role="img"
									className={`mapMarker ${selectedLocation.long === result.long ? "active" : ""}`}
									onClick={() => setSelectedLocation({ ...result, index })}
									aria-label="push-pin"
								>
									<MapPin className="mapPin" />
								</p>
							</Marker>

							{selectedLocation.long === result.long && (
								<Popup
									onClose={() => setSelectedLocation({})}
									closeOnClick={true}
									latitude={result.lat}
									longitude={result.long}
									className="popup"
								>
									<PopupInner bg={resultImages[selectedLocation.index]?.[0] || ''}>
										<h5>{result.title}</h5>
										<h4>{result.price}</h4>
									</PopupInner>
								</Popup>
							)}
						</div>
					))}
				</Map>
			</MapContainer>
		);
	}
);

export default MapComponent;

// Styled components

const MapContainer = styled.div`
  width: 100%;
  height: 90vh;
  z-index: 1;
  margin-bottom: -35vh;
  background: var(--gray);
  position: relative;

  &::before {
    content: "";
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    background: linear-gradient(to top, var(--light) 30%, transparent);
    z-index: 3;
    height: 20vh;
    pointer-events: none;
  }

  .mapMarker {
    position: relative;
    animation: markerAnim 0.5s infinite ease-out alternate;

    &.active {
      animation-play-state: paused;
      &::before {
        animation-play-state: paused;
      }
    }

    &::before {
      content: "";
      position: absolute;
      width: 1rem;
      height: 0.25rem;
      background: var(--dark);
      transform-origin: bottom center;
      filter: blur(2px);
      border-radius: 100%;
      bottom: 0.125rem;
      left: 0.25rem;
      z-index: -1;
      opacity: 0.5;
      animation: markerShadowAnim 0.5s infinite ease-out alternate;
    }
  }

  @keyframes markerAnim {
    to {
      transform: translateY(-0.5rem);
    }
  }

  @keyframes markerShadowAnim {
    to {
      transform: translateY(0.5rem) scale(0.25);
      opacity: 1;
    }
  }

  .mapPin {
    stroke: none;
    fill: var(--pink);
    circle {
      fill: var(--gray);
    }
  }

  .mapboxgl-popup {
    z-index: 1;
  }

  .mapboxgl-popup-content {
    border-radius: 1rem;
    padding: 0;
    max-width: 240px;
    width: 75%;
    background: var(--dark);
  }

  .mapboxgl-popup-close-button {
    right: 0;
    top: 0;
    color: var(--white);
    line-height: 1;
    z-index: 98;
    background: var(--pink);
    height: 1.5rem;
    width: 1.5rem;
    border-radius: 0 1rem 0 1rem;
    box-shadow: -0.5rem 0.5rem 0.5rem #0002;
  }

  .mapboxgl-popup-anchor-top .mapboxgl-popup-tip {
    border-bottom-color: var(--dark);
  }

  .mapboxgl-popup-anchor-bottom .mapboxgl-popup-tip {
    border-top-color: var(--dark);
  }

  @media (min-width: 48rem) {
    margin-bottom: -50vh;
    height: calc(100vh + 10rem);

    .mapboxgl-popup-content {
      width: 360px;
    }
  }
`;

const PopupInner = styled.div`
  background: linear-gradient(to top, var(--dark), transparent),
    url(/images/results/${(props) => props.bg});
  background-size: cover;
  padding: 5rem 1rem 0.5rem;
  box-shadow: 0 0.25rem 0.5rem #0002;
  border-radius: 1rem;
  color: var(--white);
`;
