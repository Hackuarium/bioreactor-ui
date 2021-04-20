import {
  SvgOutlineExclamationCircle,
  SvgSolidExclamation,
  useNotificationCenter,
} from '../components/tailwind-ui';

const TIMEOUT = 4000;

export default function useNotification() {
  const notificationContext = useNotificationCenter();

  const addInfoNotification = (title, message) => {
    notificationContext.addNotification(
      {
        title: (
          <span className="text-base font-semibold text-primary-500">
            {title}
          </span>
        ),
        content: <span className="text-sm text-neutral-500">{message}</span>,
        icon: (
          <SvgOutlineExclamationCircle className="w-8 h-8 text-primary-600" />
        ),
      },
      TIMEOUT,
    );
  };

  const addErrorNotification = (title, message) => {
    notificationContext.addNotification(
      {
        title: (
          <span className=" text-base font-semibold text-danger-500">
            {title}
          </span>
        ),
        content: <span className="text-sm text-neutral-500">{message}</span>,
        icon: <SvgSolidExclamation className="w-8 h-8 text-danger-600" />,
      },
      TIMEOUT,
    );
  };

  return { addErrorNotification, addInfoNotification };
}
