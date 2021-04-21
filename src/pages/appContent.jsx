import React, { Suspense } from 'react';
import { Route, Switch } from 'react-router-dom';
import {
  NotificationCenter,
  NotificationProvider,
  Spinner,
} from '../components/tailwind-ui';

const AppContent = ({ routes }) => {
  const renderRoutes = (routes) =>
    routes.flatMap((route) => {
      if (route.options) return renderRoutes(route.options);
      else
        return (
          <Route
            key={route.label}
            path={route.value}
            exact={route.exact}
            component={route.component}
          />
        );
    });

  return (
    <div className="w-full h-full" data-testid="App-content">
      <NotificationProvider>
        <NotificationCenter position="top-right" className="mt-16" />
        <Suspense
          fallback={
            <div className="w-full h-full flex justify-center items-start pt-52">
              <Spinner className="text-secondary w-12"></Spinner>
            </div>
          }
        >
          <Switch>
            {renderRoutes(routes)}
            {/**use the first route as default one */}
            <Route path="/" exact component={routes[0].component} />
          </Switch>
        </Suspense>
      </NotificationProvider>
    </div>
  );
};

export default AppContent;
