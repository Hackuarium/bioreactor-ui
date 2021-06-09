import { useState, useEffect } from 'react';
import { parseCurrentSettings } from 'legoino-util';

import SelectDeviceComponent from './SelectDeviceComponent';
import GeneralTab from './GeneralTab';
import EditTab from './EditTab';
import ConfigTab from './ConfigTab';
import { HorizontalNavigation } from '../../components/tailwind-ui';
import devicesManager from '../../services/localDeviceService';
import { COMMANDS } from './../../services/devicesOptions';

const tabs = [
  {
    value: 'general',
    label: 'General',
  },
  {
    value: 'history',
    label: 'History',
  },
  {
    value: 'config',
    label: 'Configuration',
  },
];
const deviceType = 'SimpleSpectro';

const LocalDevices = ({ refreshInterval = 1000 }) => {
  const [selectedDevice, setSelectedDevice] = useState({ label: '--' });
  const [selectedTab, setSelectedTab] = useState(tabs[0]);
  const [data, setData] = useState({});

  useEffect(() => {
    if (selectedDevice?.id) {
      const interval = setInterval(
        () => getData(selectedDevice?.id),
        refreshInterval,
      );
      return () => {
        clearInterval(interval);
      };
    }
  }, [refreshInterval, selectedDevice?.id]);

  const getData = async (deviceId) => {
    if (deviceId) {
      const compressedResults = await devicesManager.sendCommand(
        deviceId,
        COMMANDS.compactSettings,
      );
      const results = parseCurrentSettings(compressedResults, {
        kind: deviceType, // parameterLabel: true,
        parameterInfo: true,
        parametersArray: true,
      });
      setData(results);
      //console.log(results);
    } else {
      setData({});
      //console.log({});
    }
  };

  const onSelectedDeviceChanged = (newDevice) => {
    setSelectedDevice(newDevice);
    getData(newDevice?.id);
  };

  const renderTabContent = (tab) => {
    switch (tab.value) {
      case 'general':
        return <GeneralTab data={data} />;
      case 'edit':
        return <EditTab device={selectedDevice} />;
      case 'config':
        return <ConfigTab device={selectedDevice} deviceType={deviceType} />;
      default:
        return <div />;
    }
  };

  return (
    <>
      <SelectDeviceComponent
        selected={selectedDevice}
        onSelectAction={onSelectedDeviceChanged}
      />
      {selectedDevice.id ? (
        <div className="mx-4">
          <HorizontalNavigation
            onSelect={setSelectedTab}
            selected={selectedTab}
            options={tabs}
          />
          <div className="p-3 mt-4 sm:m-0 flex flex-col items-center rounded-md sm:rounded-t-none bg-white shadow ">
            {renderTabContent(selectedTab)}
          </div>
        </div>
      ) : (
        <div className="mx-5 mt-16 flex flex-col items-center">
          <h3 className="text-base font-bold text-gray-300 leading-loose">
            No connected Device
          </h3>
          <h3 className="text-sm font-base text-gray-300">
            Please plug your device into the computer
          </h3>
        </div>
      )}
    </>
  );
};

export default LocalDevices;
