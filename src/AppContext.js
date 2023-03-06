import { createContext } from "react";

export default createContext({
  buses: [],
  stops: [],
  favoriteStops: {},
  lines: [],
  toggleFavoriteStop: (id) => null,
});
