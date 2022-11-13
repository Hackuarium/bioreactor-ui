import { useState, useEffect, useCallback } from 'react';
import { parseCurrentSettings } from 'legoino-util';

import GeneralTab from './GeneralTab';
import HistoryTab from './HistoryTab';
import ConfigTab from './ConfigTab';
import AdvancedTab from './AdvancedTab';
import DeviceCardInfo from './DeviceCardInfo';
import LocalDeviceModal from '../LocalDevices/LocalDeviceModal';
import useNotification from '../../hooks/useNotification';
import { COMMANDS } from '../../services/devicesOptions';
import { HorizontalNavigation } from '../../components/tailwind-ui';
import {
  sendCommand,
  requestDevices,
  getConnectedDevices,
  continuousUpdateDevices,
} from '../../services/localDeviceService';
import {
  getDevice,
  updateDevice,
  saveDataRow,
  getLastSavedData,
} from '../../services/devicesService';

const SCAN_INTERVAL = 1000;

const tabs = ['General', 'History', 'Advanced', 'Configuration'].map((v) => ({
  value: v,
  label: v,
}));

const LocalDevices = ({ match, history }) => {
  const [currentDevice, setCurrentDevice] = useState();
  const [selectedTab, setSelectedTab] = useState(tabs[0]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [forceRender, setForceRender] = useState(false);

  const [currentData, setCurrentData] = useState({}); // data to display
  const [refreshInterval, setRefreshInterval] = useState(2000);

  const { addWarningNotification } = useNotification();

  // get device from DB just in the first render
  useEffect(() => {
    const deviceId = `${match.params.id}`;
    getDevice(deviceId).then((_device) => {
      setCurrentDevice(_device);
    });
  }, [match.params.id]);

  // get data from device
  const getCurrentData = useCallback(async () => {
    if (currentDevice?.id) {
      if (currentDevice?.connected) {
        try {
          const compressedResults = await sendCommand(
            currentDevice?.id,
            COMMANDS.compactSettings,
          );
          // let checkDigit = 0;
          // for (let i = 0; i < compressedResults.length; i = i + 2) {
          //   checkDigit ^= parseInt(`${compressedResults[i]}${compressedResults[i+1]}`, 16);
          //   // console.log('i', checkDigit.toString(16));
          // }
          // console.log('Final prev', checkDigit);
          // if (checkDigit === 0) {
          //   console.log('checkDigit', checkDigit.toString(16));
          // }
          // else {
          //   addWarningNotification('CheckDigit error');
          // }
          const results = parseCurrentSettings(compressedResults, {
            // kind: currentDevice?.kind?.kind,
            parameterInfo: true,
            parametersArray: true,
          });
          // console.log('results', results);

          setCurrentData(results);
          saveDataRow(currentDevice._id, results);
        } catch (e) {
           console.log(e.message);
        }
      } else {
        // get local saved data
        getLastSavedData(currentDevice._id).then((row) => {
          console.log(row);
          if (row.length > 0) {
            setCurrentData(row[0]);
          }
        });
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentDevice?.id, currentDevice?.connected]);

  // get data immediately after getting device
  useEffect(() => {
    getCurrentData();
  }, [getCurrentData]);

  // Listen continuously to data from device every {refreshInterval}
  useEffect(() => {
    if (currentDevice?.id && currentDevice?.connected) {
      const timeout = setInterval(() => getCurrentData(), refreshInterval);
      return () => clearInterval(timeout);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [getCurrentData, refreshInterval]);

  // Listen continuously to device connectivity
  useEffect(() => {
    setDeviceConnectivity();
    const cleanUp = continuousUpdateDevices((connectedDevices) => {
      const isConnected =
        connectedDevices.filter((d) => d.id === currentDevice?.id).length > 0;
      if (isConnected && !currentDevice?.connected) {
        setCurrentDevice({ ...currentDevice, connected: true });
      } else if (!isConnected && currentDevice?.connected) {
        addWarningNotification(`${currentDevice?.name} is disconnected`);
        setCurrentDevice({ ...currentDevice, connected: false });
      }
    }, SCAN_INTERVAL);

    return () => cleanUp.then((intervalId) => clearInterval(intervalId));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentDevice?.id, currentDevice?.connected, forceRender]);

  const setDeviceConnectivity = async () => {
    const connectedDevices = await getConnectedDevices();
    if (connectedDevices.filter((d) => d.id === currentDevice?.id).length > 0) {
      setCurrentDevice({ ...currentDevice, connected: true });
    }
  };

  const onRequest = async () => {
    document.activeElement.blur();
    await requestDevices();
    setDeviceConnectivity();
  };

  const onSaveDevice = async (device) => {
    const { connected, ...deviceInfo } = device;
    updateDevice(deviceInfo).then(() => {
      setCurrentDevice(device);
      setForceRender(!forceRender);
      setIsModalOpen(false);
    });
  };

  const renderTabContent = (tab) => {
    switch (tab.value) {
      case 'General':
        return <GeneralTab data={currentData} />;
      case 'History':
        return (
          <HistoryTab
            device={currentDevice}
            refreshInterval={refreshInterval}
          />
        );
      case 'Advanced':
        return <AdvancedTab device={currentDevice} />;
      case 'Configuration':
        return (
          <ConfigTab
            device={currentDevice}
            refreshInterval={refreshInterval}
            setRefreshInterval={setRefreshInterval}
            data={currentData}
            refreshData={() => getCurrentData()}
          />
        );
      default:
        return <div />;
    }
  };

  return (
    <div className="mx-4 pb-4">
      <DeviceCardInfo
        device={currentDevice}
        goBack={() => history.goBack()}
        onOpenModel={setIsModalOpen}
        onRequest={onRequest}
      />

      <HorizontalNavigation
        onSelect={setSelectedTab}
        selected={selectedTab}
        options={tabs}
      />
      <div className="p-3 mt-4 sm:m-0 flex flex-col items-center rounded-md sm:rounded-t-none bg-white shadow ">
        {renderTabContent(selectedTab)}
      </div>

      <LocalDeviceModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        initialValues={currentDevice}
        onSave={onSaveDevice}
      />
    </div>
  );
};

export default LocalDevices;
