import { ReactComponent as Status } from '../assets/icons/status.svg';
import { ReactComponent as Settings } from '../assets/icons/settings.svg';
import { ReactComponent as Temperature } from '../assets/icons/temperature.svg';

export const routes = [
  {
    label: 'Status',
    path: 'statuspath',
    icon: (props) => <Status {...props} />,
  },
  {
    label: 'Temperature',
    path: 'temperaturepath',
    icon: (props) => <Temperature {...props} />,
  },
  {
    label: 'History',
    path: 'Historypath',
    icon: (props) => <Settings {...props} />,
  },
  {
    label: 'Settings',
    path: 'Settingspath',
    icon: (props) => <Settings {...props} />,
    subMenu: [
      { label: 'Settings 1', path: 'Settingspath1' },
      { label: 'Settings 2', path: 'Settingspath2' },
      { label: 'Settings 3', path: 'Settingspath3' },
    ],
  },
];
