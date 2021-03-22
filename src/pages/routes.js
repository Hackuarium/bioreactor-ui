import { lazy } from 'react';
import { ReactComponent as Status } from '../assets/icons/status.svg';
import { ReactComponent as Settings } from '../assets/icons/settings.svg';
import { ReactComponent as Temperature } from '../assets/icons/temperature.svg';

const routes = [
  {
    id: 'status',
    label: 'Status',
    path: '/status',
    component: lazy(() => import('./statusPage')),
    icon: <Status className="fill-current" height="20" />,
  },
  {
    id: 'temperature',
    label: 'Temperature',
    path: '/temperature',
    component: lazy(() => import('./temperaturePage')),
    icon: <Temperature className="fill-current" height="20" />,
  },
  {
    id: 'history',
    label: 'History',
    path: '/history',
    component: lazy(() => import('./historyPage')),
    icon: <Settings className="fill-current" height="20" />,
  },
  {
    id: 'settings',
    label: 'Settings',
    path: '/settings',
    component: lazy(() => import('./settingsPage')),
    icon: <Settings className="fill-current" height="20" />,
    options: [
      {
        id: 'settings1',
        label: 'Settings 1',
        path: '/settings/settings1',
        exact: true,
        component: lazy(() => import('./settings1Page')),
      },
      {
        id: 'settings2',
        label: 'Settings 2',
        path: '/settings/settings2',
        exact: true,
        component: lazy(() => import('./settings1Page')),
      },
    ],
  },
];

export default routes;
