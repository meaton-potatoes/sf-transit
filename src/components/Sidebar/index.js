import React from "react";
import AppContext from "../../AppContext";
import { StyledContainer } from "./StyledComponents";
import RouteMultiSelect from "./RouteMultiSelect";
import FavoriteStopPredictions from "./FavoriteStopPredictions";

const Sidebar = () => (
  <AppContext.Consumer>
    {({ selectedRouteIds }) => (
      <StyledContainer>
        <RouteMultiSelect {...{ selectedRouteIds }} />
        <FavoriteStopPredictions stopIds={["14295"]} />
      </StyledContainer>
    )}
  </AppContext.Consumer>
);

export default Sidebar;
