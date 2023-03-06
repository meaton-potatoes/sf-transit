import React, { useEffect, useState } from "react";
import qs from "qs";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretDown, faCaretRight } from "@fortawesome/free-solid-svg-icons";

import LocalStorageHelper from "./lib/LocalStorageHelper";
import AppContext from "./AppContext";

import Sidebar from "./components/Sidebar";
import Map from "./components/MapDisplay";
import {
  StyledIcon,
  StyledMapContainer,
  StyledSidebarContainer,
} from "./components/StyledComponents";
import { fetchPatterns, fetchStops } from "./lib/Api";
import { monitoredVehicles } from "./lib/RealTimeApi";

function App() {
  const [showSidebar, setShowSidebar] = useState(true);
  const [stops, setStops] = useState([]);
  const [buses, setBuses] = useState([]);
  const [patterns, setPatterns] = useState([]);
  const [favoriteStops, setFavoriteStops] = useState({});

  const params = qs.parse(window.location.search.substr(1));
  const selectedRouteIds = params.routes ? params.routes?.split(",") : [];

  const toggleFavoriteStop = (id) => {
    const isFavorite = favoriteStops[id];
    const newFavoriteStops = LocalStorageHelper.setFavoriteStop(
      id,
      !isFavorite
    );
    setFavoriteStops(newFavoriteStops);
  };

  const fetchBuses = () => {
    console.log("fetchBuses");
    return monitoredVehicles()
      .then((buses) =>
        setBuses(
          buses.filter(
            (bus) =>
              selectedRouteIds.length === 0 ||
              selectedRouteIds.includes(bus.routeId)
          )
        )
      )
      .then(() => setTimeout(fetchBuses, 10000));
  };

  useEffect(() => {
    fetchPatterns({ routeIds: selectedRouteIds }).then(setPatterns);
    fetchStops({ routeIds: selectedRouteIds }).then(setStops);
    fetchBuses();
  }, []);

  return (
    <AppContext.Provider
      value={{
        stops,
        favoriteStops,
        toggleFavoriteStop,
        patterns,
        selectedRouteIds,
        buses,
      }}
    >
      <div style={{ height: "100%" }}>
        <StyledMapContainer showSidebar={showSidebar}>
          <Map />
        </StyledMapContainer>
        <StyledSidebarContainer showSidebar={showSidebar}>
          <div style={{ display: "flex" }}>
            <StyledIcon
              icon={showSidebar ? faCaretDown : faCaretRight}
              onClick={() => setShowSidebar(!showSidebar)}
            />
          </div>

          {showSidebar && <Sidebar />}
        </StyledSidebarContainer>
      </div>
    </AppContext.Provider>
  );
}

export default App;
