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
    value: '/status',
    icon: <SvgOutlineChartSquareBar height="20" />,
    exact: true,
    inNavbar: true,
    component: lazy(() => import('../pages/Status')),
  },
  {
    id: 'preferences',
    label: 'Preferences',
    value: '/preferences',
    icon: <SvgOutlineClipboardList height="20" />,
    exact: true,
    inNavbar: true,
    options: [
      {
        id: 'general',
        label: 'General',
        value: '/preferences/general',
        icon: <SvgOutlineAdjustments height="20" />,
        exact: true,
        inNavbar: true,
        component: lazy(() => import('../pages/General')),
      },
      {
        id: 'broadcast-devices',
        label: 'Broadcast devices',
        value: '/preferences/broadcast-devices',
        icon: <SvgOutlineChip height="20" />,
        exact: true,
        inNavbar: true,
        component: lazy(() => import('../pages/BroadcastDevices')),
        options: [
          {
            id: 'device-details',
            label: 'Device information',
            value: '/preferences/broadcast-devices/device/:id',
            exact: true,
            component: lazy(() => import('../pages/DeviceDetails')),
          },
        ],
      },
      {
        id: 'interactive-devices',
        label: 'Interactive devices',
        value: '/preferences/interactive-devices',
        icon: <SvgOutlineSwitchHorizontal height="20" />,
        exact: true,
        inNavbar: true,
        component: lazy(() => import('../pages/InteractiveDevices')),
      },
      {
        id: 'local-devices',
        label: 'Local devices',
        value: '/preferences/local-devices',
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
    value: '/settings',
    icon: <SvgOutlineCog height="20" />,
    exact: true,
    inNavbar: true,
    component: lazy(() => import('../pages/Settings')),
  },
];

export default ROUTS;
