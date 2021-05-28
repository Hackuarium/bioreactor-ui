import { useState } from 'react';
import { parseCurrentSettings } from 'legoino-util';
import legoinoDeviceInformation from 'legoino-device-information';

import { Button, HorizontalNavigation } from '../../components/tailwind-ui';
import { getLocalDevicesManager } from '../../services/localDeviceService';
import SelectDeviceComponent from './selectDeviceComponent';
import GeneralParams from '../../components/localDevice/GeneralParams';

const tabs = [
  {
    value: 'general',
    label: 'General',
  },
  {
    value: 'details',
    label: 'Details',
  },
];

const LocalDevices = () => {
  const devicesManager = getLocalDevicesManager();

  const [data, setData] = useState({});
  const [selectedDevice, setSelectedDevice] = useState({ label: '--' });
  const [selectedTab, setSelectedTab] = useState(tabs[0]);

  const sendCommand = async (deviceId, command) => {
    const r = await devicesManager.sendCommand(deviceId, command);
    const s = parseCurrentSettings(r, {
      kind: 'SimpleSpectro',
      // parameterLabel: true,
      parameterInfo: true,
      parametersArray: true,
    });
    setData(s);
    console.log(s);
  };

  const onSelectedDeviceChanged = (newDevice) => {
    setSelectedDevice(newDevice);
    newDevice?.id ? sendCommand(newDevice.id, 'uc') : setData({});
  };

  const renderTabContent = (selected) => {
    switch (selected.value) {
      case 'general':
        return <GeneralParams data={data} />;
      case 'details':
        return <div>details</div>;

      default:
        return <div>default</div>;
    }
  };

  return (
    <>
      <SelectDeviceComponent
        selected={selectedDevice}
        onSelectAction={onSelectedDeviceChanged}
      />
      <div className="mx-5 ">
        <HorizontalNavigation
          onSelect={setSelectedTab}
          selected={selectedTab}
          options={tabs}
        />
        <div className="p-3 flex flex-col items-center rounded-md rounded-t-none bg-white shadow ">
          {renderTabContent(selectedTab)}
        </div>
      </div>
    </>
  );
};

export default LocalDevices;
