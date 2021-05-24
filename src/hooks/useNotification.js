import clsx from 'clsx';
import {
  SvgOutlineExclamationCircle,
  SvgSolidExclamation,
  useNotificationCenter,
} from '../components/tailwind-ui';

const TIMEOUT = 4000;

export default function useNotification() {
  const notificationContext = useNotificationCenter();

  const addNotification = (title, message, { textColor, Icon }) => {
    notificationContext.addNotification(
      {
        title: (
          <span className={clsx('text-base font-semibold', textColor + '500')}>
            {title}
          </span>
        ),
        content: <span className="text-sm text-neutral-500">{message}</span>,
        icon: <Icon className={clsx('w-8 h-8', textColor + '600')} />,
      },
      TIMEOUT,
    );
  };

  const addInfoNotification = (title, message) => {
    addNotification(title, message, {
      textColor: 'text-primary-',
      Icon: SvgOutlineExclamationCircle,
    });
  };

  const addWarningNotification = (title, message) => {
    addNotification(title, message, {
      textColor: 'text-warning-',
      Icon: SvgSolidExclamation,
    });
  };

  const addErrorNotification = (title, message) => {
    addNotification(title, message, {
      textColor: 'text-danger-',
      Icon: SvgSolidExclamation,
    });
  };

  return { addErrorNotification, addWarningNotification, addInfoNotification };
}
