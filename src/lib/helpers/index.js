export const getRoutesFromPatterns = (patterns) => {
  let routes = {};
  patterns.forEach((pattern) => {
    routes[pattern.properties.route_name] =
      routes[pattern.properties.route_name] || [];
  });
};
