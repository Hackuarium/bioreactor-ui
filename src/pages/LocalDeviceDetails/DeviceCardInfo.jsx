import React from 'react';
import {
  Badge,
  BadgeSize,
  Button,
  SvgSolidPencilAlt,
} from '../../components/tailwind-ui';

const DeviceCardInfo = ({ device, goBack, onOpenModel, onRequest }) => {
  return (
    <div className="my-4 py-3 px-4 flex flex-col rounded-md bg-white shadow ">
      <p
        className="text-xs font-semibold underline text-primary-500 cursor-pointer"
        onClick={goBack}
      >
        {'<< Back to devices list'}
      </p>
      <div className="mt-4 flex flex-col">
        <div className="flex flex-row items-center">
          <h1 className="mr-4 text-lg font-semibold truncate text-primary-800">
            {device?.name}
          </h1>
          <Badge
            dot
            rounded
            label={device?.connected ? 'Active' : 'Inactive'}
            size={BadgeSize.SMALL}
            color={device?.connected ? 'success' : 'neutral'}
            className="w-min h-min"
          />
        </div>
        <div className="flex flex-row flex-wrap justify-between items-center">
          <h3 className="mt-2 text-xs font-italic text-neutral-600 font-semibold truncate">
            {`${device?.kind?.name} (${device?.kind?.kind})`}
          </h3>
          <div className="flex flex-row mt-2 ">
            <Button
              size="small"
              variant="white"
              className="mr-2 "
              onClick={() => onOpenModel(true)}
            >
              <SvgSolidPencilAlt className="text-gray-700" />
            </Button>
            {!device?.connected && (
              <Button size="xSmall" onClick={onRequest}>
                Request
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeviceCardInfo;
