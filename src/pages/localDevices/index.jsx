import { useState } from 'react';
import { parseCurrentSettings } from 'legoino-util';

import { HorizontalNavigation } from '../../components/tailwind-ui';
import {
  COMMANDS,
  getLocalDevicesManager,
} from '../../services/localDeviceService';
import SelectDeviceComponent from './SelectDeviceComponent';
import GeneralTab from './GeneralTab';
import ConfigTab from './ConfigTab';
import EditTab from './EditTab';

const tabs = [
  {
    value: 'general',
    label: 'General',
  },
  {
    value: 'edit',
    label: 'Edit',
  },
  {
    value: 'config',
    label: 'Configuration',
  },
];

const LocalDevices = () => {
  const devicesManager = getLocalDevicesManager();

  const [data, setData] = useState({});
  const [selectedDevice, setSelectedDevice] = useState({ label: '--' });
  const [selectedTab, setSelectedTab] = useState(tabs[2]);

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
    newDevice?.id
      ? sendCommand(newDevice.id, COMMANDS.compactSettings)
      : setData({});
  };

  const renderTabContent = (selected) => {
    switch (selected.value) {
      case 'general':
        return <GeneralTab data={data?.parametersArray} />;
      case 'edit':
        return <EditTab device={selectedDevice} />;
      case 'config':
        return (
          <ConfigTab
            device={selectedDevice}
            data={data?.parametersArray}
            deviceType="SimpleSpectro"
          />
        );

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
      {selectedDevice.id ? (
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
      ) : (
        <NoConnectedDevice />
      )}
    </>
  );
};

const NoConnectedDevice = () => {
  return (
    <div className="mx-5 mt-16 flex flex-col items-center">
      <h3 className="text-base font-bold text-gray-300 leading-loose">
        No connected Device
      </h3>
      <h3 className="text-sm font-base text-gray-300">
        Please plug your device into the computer
      </h3>
    </div>
  );
};

export default LocalDevices;
