import React from "react";
import Map, { Source, Layer, Marker } from "react-map-gl";
import AppContext from "../../AppContext";
import { PATTERN_LAYER_STYLE } from "./MapboxStyles";
import "mapbox-gl/dist/mapbox-gl.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBusSimple,
  faLocationPin,
  faTrainSubway,
  faTrainTram,
} from "@fortawesome/free-solid-svg-icons";
import { ROUTES } from "../../lib/Api";

const DEFAULT_VIEW_STATE = {
  longitude: -122.448884,
  latitude: 37.772182,
  zoom: 12,
};

const MapboxMap = () => (
  <AppContext.Consumer>
    {({ patterns, stops, buses }) => {
      return (
        <Map
          initialViewState={DEFAULT_VIEW_STATE}
          style={{ width: "100%", height: "100%", overflow: "hidden" }}
          mapStyle="mapbox://styles/mapbox/streets-v9"
        >
          <Source id="routes" type="geojson" data={patterns}>
            <Layer {...PATTERN_LAYER_STYLE} />
          </Source>
          {buses.map(
            ({
              id,
              bearing,
              routeId,
              direction,
              coordinates: { longitude, latitude },
            }) => {
              const travelMode = ROUTES.find(({ id }) => routeId === id).mode;
              const Icon = {
                bus: () => <FontAwesomeIcon icon={faBusSimple} color="red" />,
                metro: () => (
                  <FontAwesomeIcon icon={faTrainSubway} color="dodgerblue" />
                ),
                cableway: () => (
                  <FontAwesomeIcon icon={faTrainTram} color="goldenrod" />
                ),
              }[travelMode];

              return (
                <Marker
                  key={id}
                  longitude={longitude}
                  latitude={latitude}
                  anchor="bottom"
                >
                  <div
                    style={{
                      transform: `rotate(${bearing}deg)`,
                      backgroundColor: "lightgray",
                      borderRadius: "0 100% 100% 100%",
                      width: "20px",
                      height: "20px",
                      border: "1px solid gray",
                      textAlign: "center",
                    }}
                  >
                    <div
                      style={{
                        transform: `rotate(-${bearing}deg)`,
                      }}
                    >
                      <Icon />
                    </div>
                  </div>
                </Marker>
              );
            }
          )}
          {stops.map(({ objectid, latitude, longitude }) => (
            <Marker
              key={objectid}
              longitude={longitude}
              latitude={latitude}
              anchor="bottom"
            >
              <FontAwesomeIcon icon={faLocationPin} color="purple" />
            </Marker>
          ))}
        </Map>
      );
    }}
  </AppContext.Consumer>
);

export default MapboxMap;
