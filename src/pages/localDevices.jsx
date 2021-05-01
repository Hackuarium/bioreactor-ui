import { useEffect, useState } from 'react';
import { getLocalDevicesManager } from '../services/localDeviceService';

const LocalDevices = () => {
  const devicesManager = getLocalDevicesManager();
  const [devicesList, setDevicesList] = useState([]);

  const onRequest = async () => {
    await devicesManager.requestDevices();
    const _devices = await devicesManager.getConnectedDevices();
    setDevicesList(_devices);
  };

  useEffect(() => {
    devicesManager.continuousUpdateDevices((_devices) => {
      console.log(_devices);
      if (_devices.size > 0) setDevicesList(_devices);
    });
  });

  return (
    <>
      <button onClick={onRequest} className="m-4 bg-primary-500">
        requestDevices
      </button>
      <div>LocalDevicesPage</div>
      <div>{JSON.stringify(devicesList)}</div>
    </>
  );
};

export default LocalDevices;
