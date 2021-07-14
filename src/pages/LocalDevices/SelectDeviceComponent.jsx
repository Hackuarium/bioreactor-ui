import { useEffect, useState } from 'react';

import { Dropdown, Button } from '../../components/tailwind-ui';
import useNotification from '../../hooks/useNotification';
import devicesManager from '../../services/localDeviceService';
import { DEVICE_KINDS } from '../../services/devicesOptions';

const typeOptions = DEVICE_KINDS.map((type) => ({
  label: type,
  type: 'option',
}));

const SelectDeviceComponent = ({
  device = { label: '--' },
  deviceType = typeOptions.filter((o) => o.label === 'SimpleSpectro')[0],
  onSelectDevice,
  onSelectType,
}) => {
  const { addInfoNotification, addWarningNotification } = useNotification();
  const [devices, setDevices] = useState([]);

  useEffect(() => {
    onSelectType(deviceType);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // continuous update of devices list
  useEffect(() => {
    updateConnectedDevices();
    const cleanUp = devicesManager.continuousUpdateDevices((newList) => {
      handleDevicesListChange(newList);
    });
    return () => cleanUp.then((intervalId) => clearInterval(intervalId));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [devices.length]);

  const updateConnectedDevices = async () => {
    const newList = await devicesManager.getConnectedDevices();
    if (newList.length > 0) {
      if (!device?.id) onSelectDevice(renderOptions(newList)[0]);
      setDevices(newList);
    }
  };

  // When connected devices are changed : show notification + set selected + set devicesList
  const handleDevicesListChange = (newList) => {
    if (newList.length > devices.length) {
      addInfoNotification('New device connected');
      if (!device?.id) onSelectDevice(renderOptions(newList)[0]);
    } else if (newList.length < devices.length) {
      addWarningNotification('Device disconnected');
      if (newList.length === 0) onSelectDevice({ label: '--' });
    }
    setDevices(newList);
  };

  const onRequest = async () => {
    document.activeElement.blur();
    await devicesManager.requestDevices();
    const newList = await devicesManager.getConnectedDevices();
    handleDevicesListChange(newList);
  };

  const renderOptions = (list) =>
    list.map((device) => ({
      id: device.id,
      label: 'Device-' + device.id,
      type: 'option',
    }));

  return (
    <div className="m-4 py-3 px-4 flex flex-col-reverse sm:flex-row sm:justify-between sm:items-center rounded-md bg-white shadow ">
      <div className="flex flex-row flex-wrap justify-between">
        <div className="my-1 mx-2 w-full sm:w-max flex items-center justify-end flex-nowrap">
          <h3 className="mr-2 text-base font-medium text-neutral-800 ">
            Device Type :
          </h3>
          <Dropdown
            title={deviceType.label}
            options={[typeOptions]}
            onSelect={onSelectType}
          />
        </div>
        <div className="my-1 mx-2 w-full sm:w-max flex items-center justify-end flex-nowrap">
          <h3 className="mr-2 text-base font-medium text-neutral-800">
            Select device :
          </h3>
          <Dropdown
            title={device.label}
            options={[renderOptions(devices)]}
            onSelect={onSelectDevice}
          />
        </div>
      </div>
      <Button className="mb-3 sm:mb-0" onClick={onRequest}>
        Request device
      </Button>
    </div>
  );
};

export default SelectDeviceComponent;
