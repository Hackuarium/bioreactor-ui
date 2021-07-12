import { lazy } from 'react';
import {
  SvgOutlineAdjustments,
  SvgOutlineChartSquareBar,
  SvgOutlineChip,
  SvgOutlineClipboardList,
  SvgOutlineCog,
  SvgOutlineDesktopComputer,
  SvgOutlineSwitchHorizontal,
} from '../components/tailwind-ui';

const ROUTS = [
  {
    id: 'status',
    label: 'Status',
    value: process.env.PUBLIC_URL + '/status',
    icon: <SvgOutlineChartSquareBar height="20" />,
    exact: true,
    inNavbar: true,
    component: lazy(() => import('../pages/Status')),
  },
  {
    id: 'preferences',
    label: 'Preferences',
    value: process.env.PUBLIC_URL + '/preferences',
    icon: <SvgOutlineClipboardList height="20" />,
    exact: true,
    inNavbar: true,
    options: [
      {
        id: 'general',
        label: 'General',
        value: process.env.PUBLIC_URL + '/preferences/general',
        icon: <SvgOutlineAdjustments height="20" />,
        exact: true,
        inNavbar: true,
        component: lazy(() => import('../pages/General')),
      },
      {
        id: 'broadcast-devices',
        label: 'Broadcast devices',
        value: process.env.PUBLIC_URL + '/preferences/broadcast-devices',
        icon: <SvgOutlineChip height="20" />,
        exact: true,
        inNavbar: true,
        component: lazy(() => import('../pages/BroadcastDevices')),
        options: [
          {
            id: 'device-details',
            label: 'Device information',
            value:
              process.env.PUBLIC_URL +
              '/preferences/broadcast-devices/device/:id',
            exact: true,
            component: lazy(() => import('../pages/DeviceDetails')),
          },
        ],
      },
      {
        id: 'interactive-devices',
        label: 'Interactive devices',
        value: process.env.PUBLIC_URL + '/preferences/interactive-devices',
        icon: <SvgOutlineSwitchHorizontal height="20" />,
        exact: true,
        inNavbar: true,
        component: lazy(() => import('../pages/InteractiveDevices')),
      },
      {
        id: 'local-devices',
        label: 'Local devices',
        value: process.env.PUBLIC_URL + '/preferences/local-devices',
        icon: <SvgOutlineDesktopComputer height="20" />,
        exact: true,
        inNavbar: true,
        component: lazy(() => import('../pages/LocalDevices')),
      },
    ],
  },
  {
    id: 'settings',
    label: 'Settings',
    value: process.env.PUBLIC_URL + '/settings',
    icon: <SvgOutlineCog height="20" />,
    exact: true,
    inNavbar: true,
    component: lazy(() => import('../pages/Settings')),
  },
];

export default ROUTS;
