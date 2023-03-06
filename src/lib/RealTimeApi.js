const BASE_URL = "https://api.511.org/transit";

const request = (method, path, parameters = {}) => {
  return fetch(
    [
      `${BASE_URL}${path}`,
      new URLSearchParams({
        ...parameters,
        api_key: process.env.REACT_APP_API_511_API_KEY,
      }),
    ].join("?"),
    { method }
  ).then((response) => response.json());
};

export const monitoredStops = ({ stopId: stopCode }) => {
  return request("GET", "/stopMonitoring", {
    agency: "SF",
    ...{ ...(stopCode ? { stopCode } : {}) },
  }).then((response) => {
    return response["ServiceDelivery"]["StopMonitoringDelivery"][
      "MonitoredStopVisit"
    ].map((monitoredStop) => {
      const {
        MonitoringRef: id,
        MonitoredVehicleJourney: {
          DirectionRef: direction,
          VehicleRef: vehicleRef,
          VehicleLocation: { Latitude: lat, Longitude: lng },
          LineRef: routeId,
          MonitoredCall: { ExpectedArrivalTime: eta },
        },
      } = monitoredStop;
      return {
        rawData: monitoredStop,
        routeId,
        id,
        direction,
        vehicle: {
          ref: vehicleRef,
          eta,
          coordinates: {
            latitude: parseFloat(lat),
            longitude: parseFloat(lng),
          },
        },
      };
    });
  });
};

export const monitoredVehicles = () => {
  return request("GET", "/vehicleMonitoring", { agency: "SF" }).then(
    (response) => {
      return response["Siri"]["ServiceDelivery"]["VehicleMonitoringDelivery"][
        "VehicleActivity"
      ]
        .map((monitoredVehicle) => {
          const {
            MonitoredVehicleJourney: {
              Bearing: bearing,
              VehicleRef: id,
              DirectionRef: direction,
              LineRef: routeId,
              VehicleLocation: { Latitude: lat, Longitude: lng },
              PublishedLineName: name,
            },
          } = monitoredVehicle;
          if (!routeId) {
            return null;
          }
          return {
            rawData: monitoredVehicle,
            bearing: parseFloat(bearing),
            coordinates: {
              latitude: parseFloat(lat),
              longitude: parseFloat(lng),
            },
            id,
            direction,
            routeId,
            name,
          };
        })
        .filter((x) => x);
    }
  );
};
