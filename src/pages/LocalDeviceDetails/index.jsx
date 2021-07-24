import { useState, useEffect } from 'react';
import { parseCurrentSettings } from 'legoino-util';

import {
  BadgeSize,
  Badge,
  HorizontalNavigation,
  Button,
  SvgSolidPencilAlt,
} from '../../components/tailwind-ui';
import useNotification from '../../hooks/useNotification';
import {
  sendCommand,
  requestDevices,
  getConnectedDevices,
  continuousUpdateDevices,
  saveDataRow,
  getLastSavedData,
} from '../../services/localDeviceService';
import { COMMANDS } from '../../services/devicesOptions';
import { getDevice, updateDevice } from '../../services/devicesService';
import GeneralTab from './GeneralTab';
import HistoryTab from './HistoryTab';
import ConfigTab from './ConfigTab';
import AdvancedTab from './AdvancedTab';
import LocalDeviceModal from '../LocalDevices/LocalDeviceModal';
import { useCallback } from 'react';

const SCAN_INTERVAL = 1000;

const tabs = ['General', 'History', 'Advanced', 'Configuration'].map((v) => ({
  value: v,
  label: v,
}));

const LocalDevices = ({ match, history }) => {
  const [currentDevice, setCurrentDevice] = useState();
  const [selectedTab, setSelectedTab] = useState(tabs[0]);
  const [isModalOpen, setIsModalOpen] = useState(false);

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
          const results = parseCurrentSettings(compressedResults, {
            kind: currentDevice?.kind?.kind,
            parameterInfo: true,
            parametersArray: true,
          });
          setCurrentData(results);
          saveDataRow(currentDevice._id, results);
        } catch (e) {
          //  console.log(e.message);
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

  // Listen to data from device every {refreshInterval}
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
  }, [currentDevice?.id, currentDevice?.connected]);

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
      setIsModalOpen(false);
      setCurrentDevice(device);
    });
  };

  const renderTabContent = (tab) => {
    switch (tab.value) {
      case 'General':
        return <GeneralTab data={currentData} device={currentDevice} />;
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
      <div className="my-4 py-3 px-4 flex flex-col rounded-md bg-white shadow ">
        <p
          className="text-xs font-semibold underline text-primary-500 cursor-pointer"
          onClick={() => history.goBack()}
        >
          {'<< Back to devices list'}
        </p>
        <div className="mt-4 flex flex-col">
          <div className="flex flex-row items-center">
            <h1 className="mr-4 text-lg font-semibold truncate text-primary-800">
              {currentDevice?.name}
            </h1>
            <Badge
              dot
              rounded
              label={currentDevice?.connected ? 'Active' : 'Inactive'}
              size={BadgeSize.SMALL}
              color={currentDevice?.connected ? 'success' : 'neutral'}
              className="w-min h-min"
            />
          </div>
          <div className="flex flex-row flex-wrap justify-between items-center">
            <h3 className="mt-2 text-xs font-italic text-neutral-600 font-semibold truncate">
              {`${currentDevice?.kind?.name} (${currentDevice?.kind?.kind})`}
            </h3>
            <div className="flex flex-row mt-2 ">
              <Button
                size="small"
                variant="white"
                className="mr-2 "
                onClick={() => setIsModalOpen(true)}
              >
                <SvgSolidPencilAlt className="text-gray-700" />
              </Button>
              {!currentDevice?.connected && (
                <Button size="xSmall" onClick={onRequest}>
                  Request
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
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
