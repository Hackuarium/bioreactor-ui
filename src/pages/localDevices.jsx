import { useEffect, useState } from 'react';
import { getLocalDevicesManager } from '../services/localDeviceService';

const LocalDevices = () => {
  const devicesManager = getLocalDevicesManager();
  const [devicesList, setDevicesList] = useState([]);

  const onRequest = async () => {
    await devicesManager.requestDevices();
    const _devices = await devicesManager.getConnectedDevices();
    console.log(_devices);
    setDevicesList(_devices);
  };

  useEffect(() => {
    const cleanUp = devicesManager.continuousUpdateDevices((_devices) => {
      console.log(_devices);
      setDevicesList(_devices);
    });

    return () => cleanUp.then((intervalId) => clearInterval(intervalId));
  }, []);

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
