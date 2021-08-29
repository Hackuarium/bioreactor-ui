import React from 'react';
import {
  BadgeSize,
  Badge,
  Button,
  SvgSolidPencilAlt,
  SvgSolidArrowCircleLeft,
} from '../../components/tailwind-ui';

const DeviceCardInfo = ({ device, isConnected, goBack, onOpenModel }) => {
  return (
    <div className="my-2 p-2 flex flex-row items-start rounded-md bg-white shadow ">
      <SvgSolidArrowCircleLeft
        className="my-3 mr-2 h-6 w-6 text-neutral-300 cursor-pointer"
        onClick={goBack}
      />
      <div className="w-full my-2 flex flex-col">
        <div className="flex flex-row items-center">
          <h1 className="mr-4 text-lg font-semibold truncate text-primary-800">
            {device?.name}
          </h1>
          <Badge
            dot
            rounded
            label={isConnected ? 'Active' : 'Inactive'}
            size={BadgeSize.SMALL}
            color={isConnected ? 'success' : 'neutral'}
            className="w-min h-min"
          />
        </div>
        <div className="flex flex-row flex-wrap justify-between items-end">
          <div className="flex flex-col">
            <h3 className="mt-2 text-xs font-italic text-neutral-600 font-base truncate">
              <span className="font-semibold">Kind: </span>
              {`${device?.kind?.name} (${device?.kind?.kind})`}
            </h3>
            <h3 className="mt-2 text-xs font-italic text-neutral-600 font-base truncate">
              <span className="font-semibold">URL: </span>
              {`${device?.protocol}://${device?.url}:${device?.port}`}
            </h3>
            <h3 className="mt-2 text-xs font-italic text-neutral-600 font-base truncate">
              <span className="font-semibold">Topic: </span>
              {`${device?.topic}`}
            </h3>
          </div>
          <div className="flex flex-row mt-2 ">
            <Button
              size="small"
              variant="white"
              className="mr-2 "
              onClick={() => onOpenModel(true)}
            >
              <SvgSolidPencilAlt className="text-gray-700" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeviceCardInfo;
