import clsx from 'clsx';
import {
  SvgOutlineExclamationCircle,
  SvgSolidExclamation,
  useNotificationCenter,
} from '../components/tailwind-ui';

export default function useNotification() {
  const notificationContext = useNotificationCenter();

  const addNotification = (title, message, { textColor, Icon, timeout }) => {
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
      timeout,
    );
  };

  const addInfoNotification = (title, message) => {
    addNotification(title, message, {
      textColor: 'text-primary-',
      Icon: SvgOutlineExclamationCircle,
      timeout: 1000,
    });
  };

  const addWarningNotification = (title, message) => {
    addNotification(title, message, {
      textColor: 'text-warning-',
      Icon: SvgSolidExclamation,
      timeout: 2500,
    });
  };

  const addErrorNotification = (title, message) => {
    addNotification(title, message, {
      textColor: 'text-danger-',
      Icon: SvgSolidExclamation,
      timeout: 5000,
    });
  };

  return { addErrorNotification, addWarningNotification, addInfoNotification };
}
