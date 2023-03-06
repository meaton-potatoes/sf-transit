import React, { useEffect, useState } from "react";
import moment from "moment";
import { monitoredStops } from "../../lib/RealTimeApi";
import { STOPS } from "../../lib/Api";

const minutesFromNow = (dateString) => {
  return moment(dateString).fromNow(true).replace(" minutes", "min");
};

const fetchPredictionsForStop = (stopId) =>
  monitoredStops({ stopId }).then((stopPredictions) => {
    let predictions = {};
    stopPredictions.forEach(({ routeId, vehicle: { eta } }) => {
      predictions[routeId] = predictions[routeId] || [];
      predictions[routeId].push(minutesFromNow(eta));
    });
    return predictions;
  });

const StopPredictions = ({ stopId }) => {
  const [predictions, setPredictions] = useState([]);

  useEffect(() => {
    fetchPredictionsForStop(stopId).then(setPredictions);
  }, []);

  return (
    <div>
      <h3>{STOPS.find((stop) => stop.id === stopId).name}</h3>
      {!predictions ? (
        <div>Loading...</div>
      ) : (
        Object.keys(predictions).map((routeId, i) => (
          <div key={i}>
            {routeId}: {predictions[routeId].join(", ")}
          </div>
        ))
      )}
    </div>
  );
};

const FavoriteStopPredictions = ({ stopIds }) => (
  <div>
    <h2>Predictions</h2>
    {stopIds.map((stopId) => (
      <StopPredictions key={stopId} stopId={stopId} />
    ))}
  </div>
);

export default FavoriteStopPredictions;
