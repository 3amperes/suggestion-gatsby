import React, { useState } from "react";
import { graphql } from "gatsby";
import styled from "styled-components";
import Layout from "../components/layout";
import Marker from "../components/Marker";
import GMaps from "../components/GMaps";

import { getRealFromTo } from "../helpers/markers";

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 200px;
`;

const RENNES_LOCATION = {
  lat: 48.111381,
  lng: -1.679294,
};

// Return map bounds based on list of places
const getMapBounds = (map, maps, places) => {
  const bounds = new maps.LatLngBounds();

  places.forEach((place) => {
    bounds.extend(new maps.LatLng(place.location.lat, place.location.lng));
  });
  return bounds;
};

// Re-center map when resizing the window
const bindResizeListener = (map, maps, bounds) => {
  maps.event.addDomListenerOnce(map, "idle", () => {
    maps.event.addDomListener(window, "resize", () => {
      map.fitBounds(bounds);
    });
  });
};

// Fit map to its bounds after the api is loaded
const apiIsLoaded = (map, maps, places) => {
  // Get bounds by our places
  const bounds = getMapBounds(map, maps, places);
  // Fit map to bounds
  map.fitBounds(bounds);
  // Bind the resize listener
  bindResizeListener(map, maps, bounds);
};

const IndexPage = ({ data }) => {
  const [center, setCenter] = useState(RENNES_LOCATION);
  const [zoom, setZoom] = useState(10);
  const [visibleRowFirst, setVisibleRowFirst] = useState(1);
  const [visibleRowLast, setVisibleRowLast] = useState(5);
  const [hoveredRowIndex, setHoveredRowIndex] = useState(-1);
  const [maxVisibleRows, setMaxVisibleRows] = useState(5);

  const rents = data.rent.edges;

  const [places, setPlaces] = useState(
    rents.map(({ node }) => ({
      id: node.id,
      location: node.property.location,
    }))
  );

  const handleChildClick = (key) => {
    const index = places.findIndex((e) => e.id === key);
    const newPlaces = [...places];
    newPlaces[index].show = !newPlaces[index].show;
    setPlaces(newPlaces);
  };

  const { rowFrom, rowTo } = getRealFromTo(
    visibleRowFirst,
    visibleRowLast,
    maxVisibleRows,
    places.length
  );

  const markers =
    places &&
    places
      //.filter(({ marker, index }) => index >= rowFrom && index <= rowTo)
      .map((place) => (
        <Marker
          key={place.id}
          text="text"
          show={place.show}
          lat={place.location.lat}
          lng={place.location.lng}
        />
      ));

  return (
    <Layout>
      <Wrapper>
        <div style={{ height: "50vh", width: "100%" }}>
          <GMaps
            zoom={zoom}
            center={center}
            yesIWantToUseGoogleMapApiInternals
            onGoogleApiLoaded={({ map, maps }) =>
              apiIsLoaded(map, maps, places)
            }
            onChildClick={handleChildClick}
            onBoundsChange={(center, zoom, bounds, marginBounds) =>
              console.log("coucou", center, zoom, bounds, marginBounds)
            }
          >
            {markers}
          </GMaps>
        </div>
        <aside>
          <ul>
            {rents.map(({ node: rent }) => (
              <li key={rent.id}>
                {rent.rentReference}
                <div>
                  <h2>{rent.property.title}</h2>
                  <p>type: {rent.property.type}</p>
                  <p>surface: {rent.property.surface}m2</p>
                  <p>étage: {rent.property.floor}</p>
                </div>
              </li>
            ))}
          </ul>
        </aside>
      </Wrapper>
    </Layout>
  );
};

export default IndexPage;

export const query = graphql`
  query {
    rent: allSanityRent {
      edges {
        node {
          id
          rentReference
          date
          property {
            title
            type
            surface
            floor
            location {
              lat
              lng
            }
          }
        }
      }
      group(field: property____type) {
        fieldValue
        totalCount
      }
    }
  }
`;
