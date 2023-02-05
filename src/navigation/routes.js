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
    inNavbar: true,
    component: lazy(() => import('../pages/Status')),
  },
  {
    id: 'preferences',
    label: 'Preferences',
    value: '/preferences',
    icon: <SvgOutlineClipboardList height="20" />,
    inNavbar: true,
    options: [
      {
        id: 'general',
        label: 'General',
        value: '/preferences/general',
        icon: <SvgOutlineAdjustments height="20" />,
        inNavbar: true,
        component: lazy(() => import('../pages/General')),
      },
      {
        id: 'broadcast-devices',
        label: 'Broadcast devices',
        value: '/preferences/broadcast-devices',
        icon: <SvgOutlineDesktopComputer height="20" />,
        inNavbar: true,
        component: lazy(() => import('../pages/BroadcastDevices')),
        options: [
          {
            id: 'broadcastDevice-details',
            label: 'Device information',
            value: '/preferences/broadcast-devices/:id',
            component: lazy(() => import('../pages/BroadcastDeviceDetails')),
          },
        ],
      },
      {
        id: 'interactive-devices',
        label: 'Interactive devices',
        value: '/preferences/interactive-devices',
        icon: <SvgOutlineSwitchHorizontal height="20" />,
        inNavbar: true,
        component: lazy(() => import('../pages/InteractiveDevices')),
      },
      {
        id: 'local-devices',
        label: 'Local devices',
        value: '/preferences/local-devices',
        icon: <SvgOutlineChip height="20" />,
        inNavbar: true,
        component: lazy(() => import('../pages/LocalDevices')),
        options: [
          {
            id: 'localDevice-details',
            label: 'Device information',
            value: '/preferences/local-devices/:id',
            component: lazy(() => import('../pages/LocalDeviceDetails')),
          },
        ],
      },
    ],
  },
  {
    id: 'settings',
    label: 'Settings',
    value: '/settings',
    icon: <SvgOutlineCog height="20" />,
    inNavbar: true,
    component: lazy(() => import('../pages/Settings')),
  },
];

export default ROUTS;
