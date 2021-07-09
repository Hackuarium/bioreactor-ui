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

const tabs = ['General', 'History', 'Configuration'].map((v) => ({
  value: v,
  label: v,
}));

const LocalDevices = () => {
  const [selectedDevice, setSelectedDevice] = useState();
  const [selectedType, setSelectedType] = useState();
  const [selectedTab, setSelectedTab] = useState(tabs[0]);
  const [currentData, setCurrentData] = useState({});
  const [allData, setAlltData] = useState([]);
  const [refreshInterval, setRefreshInterval] = useState(10000);
  const { addErrorNotification } = useNotification();

  const getData = useCallback(
    async (deviceId) => {
      if (deviceId) {
        try {
          const compressedResults = await devicesManager.sendCommand(
            deviceId,
            COMMANDS.compactSettings,
          );
          const results = parseCurrentSettings(compressedResults, {
            kind: selectedType?.label, // parameterLabel: true,
            parameterInfo: true,
            parametersArray: true,
          });

          setCurrentData(results);
          setAlltData([results, ...allData]);
        } catch (e) {
          addErrorNotification(e.message);
        }
      } else {
        setCurrentData({});
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [allData, selectedType?.label, selectedDevice?.id],
  );

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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [refreshInterval, getData]);

  // if selectedType or selectedDevice: delete HistoryData + get the new data
  useEffect(() => {
    setAlltData([]);
    getData(selectedDevice?.id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedType?.label, selectedDevice?.id]);

  const renderTabContent = (tab) => {
    switch (tab.value) {
      case 'General':
        return <GeneralTab data={currentData} device={selectedDevice} />;
      case 'History':
        return <HistoryTab data={allData} deviceType={selectedType?.label} />;
      case 'Configuration':
        return (
          <ConfigTab
            device={selectedDevice}
            data={currentData}
            refreshInterval={refreshInterval}
            setRefreshInterval={setRefreshInterval}
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
        onSelectDevice={(newDevice) => {
          setSelectedDevice(newDevice);
          getData(newDevice?.id);
        }}
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
