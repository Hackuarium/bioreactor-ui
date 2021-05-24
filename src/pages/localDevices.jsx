import { useEffect, useState } from 'react';
import { Dropdown, Button } from '../components/tailwind-ui';
import { getLocalDevicesManager } from '../services/localDeviceService';
import useNotification from '../hooks/useNotification';

const LocalDevices = () => {
  const devicesManager = getLocalDevicesManager();

  const [devicesList, setDevicesList] = useState([]);
  const [selectedDevice, setSelectedDevice] = useState({ label: '--' });

  const { addInfoNotification, addWarningNotification } = useNotification();

  // continuous update of devices list
  useEffect(() => {
    const cleanUp = devicesManager.continuousUpdateDevices((newList) => {
      handleDevicesListChange(devicesList, newList);
    });
    return () => cleanUp.then((intervalId) => clearInterval(intervalId));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [devicesList, devicesManager]);

  // When connected devices are changed : show notification + set selectedDevice + set devicesList
  const handleDevicesListChange = (oldList, newList) => {
    if (newList > oldList) {
      addInfoNotification('New device connected');
      if (!selectedDevice?.id) setSelectedDevice(renderOptions(newList)[0][0]);
    } else if (newList < oldList) {
      addWarningNotification('Device disconnected');
      if (newList.length === 0) setSelectedDevice({ label: '--' });
    }
    setDevicesList(newList);
  };

  const renderOptions = (devices) => [
    devices.map((device) => ({
      id: device.id,
      label: 'Device-' + device.id,
      type: 'option',
    })),
  ];

  const onRequest = async () => {
    await devicesManager.requestDevices();
    const newList = await devicesManager.getConnectedDevices();
    handleDevicesListChange(devicesList, newList);
  };

  return (
    <>
      <div className="m-4 py-3 px-4 flex flex-col-reverse sm:flex-row sm:justify-between sm:items-center rounded-md bg-white shadow ">
        <div className="flex justify-between items-center">
          <h3 className="mr-4 text-base font-medium text-neutral-800">
            Select device :
          </h3>
          <Dropdown
            title={selectedDevice.label}
            options={renderOptions(devicesList)}
            onSelect={(i) => {
              console.log(i);
              setSelectedDevice(i);
            }}
          />
        </div>
        <Button className="mb-3 sm:mb-0" onClick={onRequest}>
          Request device
        </Button>
      </div>
      <div>{JSON.stringify(devicesList)}</div>
    </>
  );
};

export default LocalDevices;
