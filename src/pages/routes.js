import { lazy } from 'react';
import { ReactComponent as Status } from '../assets/icons/status.svg';
import { ReactComponent as Settings } from '../assets/icons/settings.svg';
import { ReactComponent as Temperature } from '../assets/icons/temperature.svg';

const routes = [
  {
    label: 'Status',
    path: '/status',
    exact: true,
    component: lazy(() => import('./statusPage')),
    icon: (props) => <Status {...props} />,
  },
  {
    label: 'Temperature',
    path: '/temperature',
    exact: true,
    component: lazy(() => import('./temperaturePage')),
    icon: (props) => <Temperature {...props} />,
  },
  {
    label: 'History',
    path: '/history',
    exact: true,
    component: lazy(() => import('./historyPage')),
    icon: (props) => <Settings {...props} />,
  },
  {
    label: 'Settings',
    path: '/settings',
    exact: true,
    component: lazy(() => import('./settingsPage')),
    icon: (props) => <Settings {...props} />,
    subRoute: [
      {
        label: 'Settings 1',
        path: '/settings1',
        exact: true,
        component: lazy(() => import('./settings1Page')),
      },
      {
        label: 'Settings 2',
        path: '/settings2',
        exact: true,
        component: lazy(() => import('./settings1Page')),
      },
      {
        label: 'Settings 3',
        path: '/settings3',
        exact: true,
        component: lazy(() => import('./settings1Page')),
      },
    ],
  },
];

export default routes;
