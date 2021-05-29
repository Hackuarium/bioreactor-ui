import React, { useEffect, useState } from 'react';

import { getLocalDevicesManager } from '../../services/localDeviceService';
import { Dropdown, Button } from '../../components/tailwind-ui';
import useNotification from '../../hooks/useNotification';

const SelectDeviceComponent = ({ selected, onSelectAction }) => {
  const devicesManager = getLocalDevicesManager();
  const { addInfoNotification, addWarningNotification } = useNotification();
  const [devices, setDevices] = useState([]);

  // continuous update of devices list
  useEffect(() => {
    const cleanUp = devicesManager.continuousUpdateDevices((newList) => {
      handleDevicesListChange(devices, newList);
    });
    return () => cleanUp.then((intervalId) => clearInterval(intervalId));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [devices, devicesManager]);

  // When connected devices are changed : show notification + set selected + set devicesList
  const handleDevicesListChange = (oldList, newList) => {
    if (newList > oldList) {
      addInfoNotification('New device connected');
      if (!selected?.id) onSelectAction(renderOptions(newList)[0][0]);
    } else if (newList < oldList) {
      addWarningNotification('Device disconnected');
      if (newList.length === 0) onSelectAction({ label: '--' });
    }
    setDevices(newList);
  };

  const renderOptions = (_devices) => [
    _devices.map((device) => ({
      id: device.id,
      label: 'Device-' + device.id,
      type: 'option',
    })),
  ];

  const onRequest = async () => {
    document.activeElement.blur();
    await devicesManager.requestDevices();
    const newList = await devicesManager.getConnectedDevices();
    handleDevicesListChange(devices, newList);
  };

  return (
    <div className="m-4 py-3 px-4 flex flex-col-reverse sm:flex-row sm:justify-between sm:items-center rounded-md bg-white shadow ">
      <div className="flex justify-between items-center">
        <h3 className="mr-4 text-base font-medium text-neutral-800">
          Select device :
        </h3>
        <Dropdown
          title={selected.label}
          options={renderOptions(devices)}
          onSelect={(i) => {
            console.log(i);
            onSelectAction(i);
          }}
        />
      </div>
      <Button className="mb-3 sm:mb-0" onClick={onRequest}>
        Request device
      </Button>
    </div>
  );
};

export default SelectDeviceComponent;
