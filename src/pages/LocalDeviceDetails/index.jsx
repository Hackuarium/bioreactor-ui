import { useState, useEffect, useCallback } from 'react';
import { parseCurrentSettings } from 'legoino-util';

import { HorizontalNavigation } from '../../components/tailwind-ui';
import useNotification from '../../hooks/useNotification';
import { sendCommand } from '../../services/localDeviceService';
import { COMMANDS } from '../../services/devicesOptions';
import { getDevice } from '../../services/devicesService';
import GeneralTab from './GeneralTab';
import HistoryTab from './HistoryTab';
import ConfigTab from './ConfigTab';
import AdvancedTab from './AdvancedTab';

const tabs = ['General', 'History', 'Advanced', 'Configuration'].map((v) => ({
  value: v,
  label: v,
}));

const LocalDevices = ({ match }) => {
  const [currentData, setCurrentData] = useState({}); // data to display
  const [allData, setAllData] = useState([]); // data history
  const [refreshInterval, setRefreshInterval] = useState(2000);

  const [currentDevice, setCurrentDevice] = useState();
  const [selectedTab, setSelectedTab] = useState(tabs[0]);

  const { addErrorNotification } = useNotification();
  const deviceId = `${match.params.id}`;

  // get device from DB
  useEffect(() => {
    getDevice(deviceId).then((_device) => {
      setCurrentDevice(_device);
    });
  }, [deviceId]);

  // get data immediately after getting device
  useEffect(() => getData(), [currentDevice?.id]);

  // Listen to data from device every {refreshInterval}
  useEffect(() => {
    if (currentDevice?.id) {
      const timeout = setInterval(() => getData(), refreshInterval);
      return () => {
        clearInterval(timeout);
      };
    }
  }, [currentDevice?.id, refreshInterval]);

  // get data from device
  const getData = async () => {
    if (currentDevice?.id) {
      try {
        const compressedResults = await sendCommand(
          currentDevice?.id,
          COMMANDS.compactSettings,
        );
        const results = parseCurrentSettings(compressedResults, {
          kind: currentDevice?.kind?.kind,
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
  };

  const renderTabContent = (tab) => {
    switch (tab.value) {
      case 'General':
        return <GeneralTab data={currentData} device={currentDevice} />;
      case 'History':
        return <HistoryTab data={allData} />;
      case 'Advanced':
        return <AdvancedTab device={currentDevice} />;
      case 'Configuration':
        return (
          <ConfigTab
            device={currentDevice}
            refreshInterval={refreshInterval}
            setRefreshInterval={setRefreshInterval}
            data={currentData}
            refreshData={() => getData()}
          />
        );
      default:
        return <div />;
    }
  };

  return (
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
  );
};

export default LocalDevices;
