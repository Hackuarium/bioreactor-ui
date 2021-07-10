import { useState, useEffect, useCallback } from 'react';
import { parseCurrentSettings } from 'legoino-util';

import { HorizontalNavigation } from '../../components/tailwind-ui';
import useNotification from '../../hooks/useNotification';
import devicesManager from '../../services/localDeviceService';
import { COMMANDS } from './../../services/devicesOptions';
import SelectDeviceComponent from './SelectDeviceComponent';
import GeneralTab from './GeneralTab';
import HistoryTab from './HistoryTab';
import ConfigTab from './ConfigTab';
import AdvancedTab from './AdvancedTab';

const tabs = ['General', 'History', 'Advanced', 'Configuration'].map((v) => ({
  value: v,
  label: v,
}));

const LocalDevices = () => {
  const [currentData, setCurrentData] = useState({}); // data to display
  const [allData, setAllData] = useState([]); // data history
  const [refreshInterval, setRefreshInterval] = useState(10000);

  const [selectedDevice, setSelectedDevice] = useState();
  const [selectedType, setSelectedType] = useState();
  const [selectedTab, setSelectedTab] = useState(tabs[0]);

  const { addErrorNotification } = useNotification();

  // get data from device
  const getData = useCallback(
    async (deviceId) => {
      if (deviceId) {
        try {
          const compressedResults = await devicesManager.sendCommand(
            deviceId,
            COMMANDS.compactSettings,
          );
          const results = parseCurrentSettings(compressedResults, {
            kind: selectedType?.label,
            parameterInfo: true,
            parametersArray: true,
          });
          setCurrentData(results);
          setAllData([results, ...allData]);
        } catch (e) {
          addErrorNotification(e.message);
        }
      } else {
        setCurrentData({}); // Hide tabs (no data to display)
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [allData, selectedType?.label],
  );

  // Listen to data from device every {refreshInterval}
  useEffect(() => {
    if (selectedDevice?.id) {
      const timeout = setInterval(
        () => getData(selectedDevice?.id),
        refreshInterval,
      );
      return () => {
        clearInterval(timeout);
      };
    }
  }, [selectedDevice?.id, refreshInterval, getData]);

  // if selectedType or selectedDevice changed: delete HistoryData + get the new data
  useEffect(() => {
    setAllData([]);
    getData(selectedDevice?.id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedType?.label, selectedDevice?.id]);

  const renderTabContent = (tab) => {
    switch (tab.value) {
      case 'General':
        return <GeneralTab data={currentData} device={selectedDevice} />;
      case 'History':
        return <HistoryTab data={allData} deviceType={selectedType?.label} />;
      case 'Advanced':
        return <AdvancedTab />;
      case 'Configuration':
        return (
          <ConfigTab
            device={selectedDevice}
            refreshInterval={refreshInterval}
            setRefreshInterval={setRefreshInterval}
            data={currentData}
            refreshData={() => getData(selectedDevice?.id)}
          />
        );
      default:
        return <div />;
    }
  };

  return (
    <>
      <SelectDeviceComponent
        deviceType={selectedType}
        onSelectType={setSelectedType}
        device={selectedDevice}
        onSelectDevice={setSelectedDevice}
      />
      {selectedDevice?.id ? (
        <div className="mx-4 pb-4">
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
