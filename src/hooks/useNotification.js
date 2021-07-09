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

  const addInfoNotification = (title, message, timeout = 1000) => {
    addNotification(title, message, {
      textColor: 'text-primary-',
      Icon: SvgOutlineExclamationCircle,
      timeout: timeout,
    });
  };

  const addWarningNotification = (title, message, timeout = 2500) => {
    addNotification(title, message, {
      textColor: 'text-warning-',
      Icon: SvgSolidExclamation,
      timeout: timeout,
    });
  };

  const addErrorNotification = (title, message, timeout = 5000) => {
    addNotification(title, message, {
      textColor: 'text-danger-',
      Icon: SvgSolidExclamation,
      timeout: timeout,
    });
  };

  return { addErrorNotification, addWarningNotification, addInfoNotification };
}
