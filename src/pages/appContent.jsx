import React, { Suspense } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import Loader from '../components/loader';

const AppContent = ({ routes }) => {
  return (
    <div className="w-full h-full">
      <Suspense
        fallback={
          <Loader
            color={'#f05454'}
            size={80}
            className="w-full h-full flex justify-center items-start pt-52"
          />
        }
      >
        <Switch>
          {routes.flatMap((route) => {
            if (route.subRoute) {
              /**return subRoutes with path : /parentRoute/subRoute */
              return route.subRoute.map((subRoute) => (
                <Route
                  key={subRoute.label}
                  path={route.path + subRoute.path}
                  exact={subRoute.exact}
                  component={subRoute.component}
                />
              ));
            } else {
              /**return main routes */
              return (
                <Route
                  key={route.label}
                  path={route.path}
                  exact={route.exact}
                  component={route.component}
                />
              );
            }
          })}
          {/**use the first route as default one */}
          <Route path="/" exact component={routes[0].component} />
          <Redirect to="/" />
        </Switch>
      </Suspense>
    </div>
  );
};

export default AppContent;
