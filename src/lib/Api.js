import ROUTES_BY_STOP from "./data/routes_by_stop.json";
import STOPS_BY_ROUTE from "./data/stops_by_route.json";
import ROUTES from "./data/routes.json";
import STOPS from "./data/stops.json";

const fetchPatterns = ({ routeIds }) =>
  fetch("https://data.sfgov.org/resource/9exe-acju.geojson").then((response) =>
    response.json().then(({ type, features }) => {
      const filteredFeatures = features
        .filter(
          (feature) =>
            routeIds.length === 0 ||
            routeIds.includes(feature.properties.route_name)
        )
        .map((feature) => ({
          ...feature,
          properties: {
            ...feature.properties,
            mode: ROUTES.find(({ id }) => feature.properties.route_name === id)
              .mode,
          },
        }));
      return { type, features: filteredFeatures };
    })
  );

const fetchStops = ({ routeIds }) =>
  fetch("https://data.sfgov.org/resource/i28k-bkz6.json")
    .then((response) => response.json())
    .then((stops) => {
      const stopIds = routeIds.map((routeId) => STOPS_BY_ROUTE[routeId]).flat();
      return stops.filter((stop) => {
        const formattedStopId = `1${stop.stopid.substr(0, 4)}`;
        return routeIds.length === 0 || stopIds.includes(formattedStopId);
      });
    });

export { fetchPatterns, fetchStops, ROUTES, STOPS };
