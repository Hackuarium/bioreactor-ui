import { useState } from 'react';
import { parseCurrentSettings } from 'legoino-util';
import legoinoDeviceInformation from 'legoino-device-information';

import { Button } from '../../components/tailwind-ui';
import { getLocalDevicesManager } from '../../services/localDeviceService';
import SelectDeviceComponent from './selectDeviceComponent';

const LocalDevices = () => {
  const devicesManager = getLocalDevicesManager();

  const [data, setData] = useState({});
  const [selectedDevice, setSelectedDevice] = useState({});

  const sendCommand = async () => {
    const r = await devicesManager.sendCommand(selectedDevice.id, 'uc');
    const s = parseCurrentSettings(r, {
      kind: 'SimpleSpectro',
      // parameterLabel: true,
      parameterInfo: true,
      parametersArray: true,
    });
    setData(s);
    console.log(s);
  };

  return (
    <>
      <SelectDeviceComponent
        selectedDevice={selectedDevice}
        setSelectedDevice={setSelectedDevice}
      />
      <div className="m-4 py-3 px-4 flex flex-col items-center rounded-md bg-white shadow ">
        <Button className="mb-3 sm:mb-0 self-end" onClick={sendCommand}>
          Compact settings
        </Button>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
          {data?.parametersArray?.map((param) => (
            <div className="w-max m-2 p-2 flex flex-col rounded-md bg-white shadow">
              <p>{param.name || param.label}</p>
              <p>{param.value}</p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default LocalDevices;
