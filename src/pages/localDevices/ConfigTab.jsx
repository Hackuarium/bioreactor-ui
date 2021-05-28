import legoinoDeviceInformation from 'legoino-device-information';

import { Button, Divider, Input } from '../../components/tailwind-ui';
import useNotification from '../../hooks/useNotification';
import {
  COMMANDS,
  getLocalDevicesManager,
} from '../../services/localDeviceService';

const ConfigTab = ({ device, deviceType, data }) => {
  const devicesManager = getLocalDevicesManager();
  const { addInfoNotification } = useNotification();

  const deviceParams = legoinoDeviceInformation[deviceType]?.parameters;

  const onReset = async () => {
    const resultMsg = await devicesManager.sendCommand(
      device.id,
      COMMANDS.reset,
    );
    addInfoNotification(resultMsg);
    console.log(deviceParams);
  };

  return (
    <div className="w-full flex flex-col ">
      {/* <DividerCustom title="Actions" /> */}
      <div className="mt-2 flex flex-row justify-end">
        <Button className="mx-2" variant="white" onClick={onReset}>
          Sleep
        </Button>
        <Button className="mx-2 " variant="white" onClick={onReset}>
          Reset Device
        </Button>
      </div>

      <DividerCustom title="Edit parameters" />
      <div className="flex flex-row justify-start flex-wrap">
        {data &&
          deviceParams.map((param, index) => {
            if (param.writable) {
              const paramData = data.filter((p) => p.label === param.label)[0];
              return (
                <div
                  key={index}
                  className="w-full sm:w-1/2  md:w-1/3 lg:w-1/4 flex"
                >
                  <div className="w-full m-1 p-2 flex flex-col justify-between items-center sm:items-start rounded-md bg-white shadow transform transition-all">
                    <h3 className="py-1 text-sm font-medium text-gray-500">
                      {param.name || param.label}
                    </h3>
                    <div className="w-full flex flex-row justify-center sm:justify-end items-center">
                      <p className="text-xl font-bold text-black leading-none">
                        {paramData?.value * paramData?.factor}
                      </p>

                      <p className="ml-1 text-sm font-medium text-gray-400 leading-none">
                        {param.unit}
                      </p>
                    </div>
                    {/* <input
                      id="id"
                      name="name"
                      type="text"
                      placeholder="placeholder"
                      value="test"
                    /> */}
                  </div>
                </div>
              );
            }
            return undefined;
          })}
      </div>
    </div>
  );
};

const DividerCustom = ({ title }) => {
  return (
    <div className="my-4">
      <Divider justify="start">
        <span className="px-2 bg-white text-xs font-medium text-neutral-400">
          {title}
        </span>
      </Divider>
    </div>
  );
};

export default ConfigTab;
