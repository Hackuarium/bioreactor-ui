import React, { Suspense } from 'react';
import { Route, Switch } from 'react-router-dom';

import { routes, renderRoutes } from '../navigation/routeHelper';

import {
  NotificationCenter,
  NotificationProvider,
  Spinner,
} from '../components/tailwind-ui';

const AppContent = () => {
  return (
    <div className="w-full h-full max-w-full" data-testid="App-content">
      <NotificationProvider>
        <NotificationCenter position="top-right" className="mt-16" />
        <Suspense
          fallback={
            <div className="w-full h-full flex justify-center items-start pt-52">
              <Spinner className="text-primary-300 w-10"></Spinner>
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
