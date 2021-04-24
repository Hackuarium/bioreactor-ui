import { Route } from 'react-router-dom';
import { useLocation } from 'react-router-dom';

import ROUTS from './routes';

export const routes = ROUTS;

// return all routes in flat list: [ route1, route2, ...]
export const renderRoutes = (routes) =>
  routes.flatMap((route) => {
    const routeList = [];
    if (route.component)
      routeList.push(
        <Route
          key={route.id}
          path={route.value}
          exact={route.exact}
          component={route.component}
        />,
      );
    else if (route.render)
      routeList.push(
        <Route
          key={route.id}
          path={route.value}
          exact={route.exact}
          render={route.render}
        />,
      );
    // if it has sub routes, add them
    if (route.options) routeList.push(renderRoutes(route.options));
    return routeList;
  });

export const getCurrentRoute = (routes) => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const currentLocation = useLocation();
  const currentRoute = routes
    .flatMap((route) => (route.options ? route.options : route))
    .find((route) => route.value === currentLocation.pathname);

  return currentRoute;
};
