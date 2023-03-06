export const PATTERN_LAYER_STYLE = {
  id: "routes",
  type: "line",
  source: "routes",
  symbol: {
    "text-field": "{route_name}",
  },
  paint: {
    "line-width": {
      base: 2,
      stops: [
        [12, 4],
        // [22, 180],
      ],
    },
    "line-color": "purple",
    // [
    //   "case",
    //   ["match", ["get", "route_name"], ["38"], true, false],
    //   "red",
    //   "blue",
    // ],
    "line-opacity": [
      "case",
      ["boolean", ["feature-state", "hover"], false],
      1,
      0.3,
    ],
  },
};
