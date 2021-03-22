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

const routes = [
  {
    id: 'status',
    label: 'Status',
    path: '/status',
    component: lazy(() => import('./status')),
    icon: <SvgOutlineChartSquareBar height="20" />,
  },
  {
    id: 'preferences',
    label: 'Preferences',
    icon: <SvgOutlineClipboardList height="20" />,
    options: [
      {
        id: 'general',
        label: 'General',
        path: '/preferences/general',
        component: lazy(() => import('./general')),
        icon: <SvgOutlineAdjustments height="20" />,
      },
      {
        id: 'broadcast-devices',
        label: 'Broadcast devices',
        path: '/preferences/broadcast-devices',
        component: lazy(() => import('./broadcastDevices')),
        icon: <SvgOutlineChip height="20" />,
      },
      {
        id: 'interactive-devices',
        label: 'Interactive devices',
        path: '/preferences/interactive-devices',
        component: lazy(() => import('./interactiveDevices')),
        icon: <SvgOutlineSwitchHorizontal height="20" />,
      },
      {
        id: 'local-devices',
        label: 'Local devices',
        path: '/preferences/local-devices',
        component: lazy(() => import('./localDevices')),
        icon: <SvgOutlineDesktopComputer height="20" />,
      },
    ],
  },
  {
    id: 'settings',
    label: 'Settings',
    path: '/settings',
    component: lazy(() => import('./settings')),
    icon: <SvgOutlineCog height="20" />,
  },
];

export default routes;