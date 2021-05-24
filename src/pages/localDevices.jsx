import { useEffect, useState } from 'react';
import { Dropdown } from '../components/tailwind-ui';
import { getLocalDevicesManager } from '../services/localDeviceService';
import useNotification from '../hooks/useNotification';

const LocalDevices = () => {
  const devicesManager = getLocalDevicesManager();

  const [devicesList, setDevicesList] = useState([]);
  const [selectedDevice, setSelectedDevice] = useState('');

  const { addInfoNotification, addWarningNotification } = useNotification();

  const addNotification = (oldList, newList) => {
    if (newList > oldList) addInfoNotification('New Device connected');
    else if (newList < oldList) addWarningNotification('Device disconnected');
  };

  const onRequest = async () => {
    await devicesManager.requestDevices();
    const _devices = await devicesManager.getConnectedDevices();
    addNotification(devicesList, _devices);
    setDevicesList(_devices);
  };

  // continuous update of devices list
  useEffect(() => {
    const cleanUp = devicesManager.continuousUpdateDevices((_devices) => {
      addNotification(devicesList, _devices);
      setDevicesList(_devices);
    });
    return () => cleanUp.then((intervalId) => clearInterval(intervalId));
  }, [devicesList, devicesManager]);

  return (
    <>
      <button onClick={onRequest} className="m-4 bg-primary-500">
        requestDevices
      </button>
      <div>LocalDevicesPage test</div>
      <div>{JSON.stringify(devicesList)}</div>
      <div className="bg-red-500">
        <Dropdown
          title={selectedDevice}
          options={[
            [
              { label: 'test1', type: 'option' },
              { label: 'test1', type: 'option' },
            ],
          ]}
          onSelect={(i) => {
            console.log(i);
            setSelectedDevice(i.label);
          }}
        />
      </div>
    </>
  );
};

export default LocalDevices;
