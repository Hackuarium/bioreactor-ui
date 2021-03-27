import { useLocation } from 'react-router-dom';

export const getCurrentRoute = (routes) => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const currentLocation = useLocation();
  const currentRoute = routes
    .flatMap((route) => (route.options ? route.options : route))
    .find((route) => route.value === currentLocation.pathname);

  return currentRoute;
};
