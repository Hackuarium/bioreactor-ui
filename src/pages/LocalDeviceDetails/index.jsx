import { useState, useEffect, useCallback } from 'react';
import { parseCurrentSettings } from 'legoino-util';

import GeneralTab from './GeneralTab';
import HistoryTab from './HistoryTab';
import ConfigTab from './ConfigTab';
import AdvancedTab from './AdvancedTab';
import BioreactorTab from "./BioreactorTab";
import BioreactorPlot from './BioreactorPlot';
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

import { StatusParameterContext, ErrorParameterContext, StepParameterContext, StepsProtocolParameterContext } from './Contexts';

const SCAN_INTERVAL = 1000;

let tabs = ['General', 'History', 'Advanced', 'Configuration','Bioreactor', 'Plots'].map((v) => ({
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

  const [statusParameter, setStatusParameter] = useState([]);
  const [errorParameter, setErrorParameter] = useState([]);
  const [stepParameter, setStepParameter] = useState([]);
  const [stepsProtocolParameter, setStepsProtocolParameter] = useState([]);

  const { addWarningNotification } = useNotification();

  // get device from DB just in the first render
  useEffect(() => {
    const deviceId = `${match.params.id}`;
    getDevice(deviceId).then((_device) => {
      setCurrentDevice(_device);
      let check = Number(_device?.id).toString(16).slice(0,2);
      // console.log('currentDevice', check);
      if (!(check === '36' || check === 'Na')) {
        let newTab = [...tabs];
        newTab = newTab.filter((tab) => tab.value !== 'Bioreactor');
        tabs = newTab;
      }
    });
  }, [match.params.id]);

  // get data from device
  const getCurrentData = useCallback(async () => {
    const steps = [...Array(16).keys()].map((v) => v+1);
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
          setCurrentData(results);  // Update current data on-line
          saveDataRow(currentDevice._id, results);
          setStatusParameter(results.parametersArray?.find(param => param.name === 'Status'));
          setErrorParameter(results.parametersArray?.find(param => param.name === 'Error'));
          setStepParameter(results.parametersArray?.find(param => param.name === 'Current step'));
          setStepsProtocolParameter(steps.map(v => (results.parametersArray?.find(param => param.name === `Step ${v}`))));
        } catch (e) {
          //  console.log(e.message);
        }
      } else {
        // get local saved data
        getLastSavedData(currentDevice._id).then((row) => {
          if (row.length > 0) {
            setCurrentData(row[0]);
            setStatusParameter(row[0].parametersArray?.find(param => param.name === 'Status'));
            setErrorParameter(row[0].parametersArray?.find(param => param.name === 'Error'));
            setStepParameter(row[0].parametersArray?.find(param => param.name === 'Current step'));
            setStepsProtocolParameter(steps.map(v => (row[0].parametersArray?.find(param => param.name === `Step ${v}`))));
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
    // console.log('Check', Number(currentDevice?.id).toString(16).slice(0,2));
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
      case 'Bioreactor':
          // console.log(currentData);
          // console.log(currentDevice);
          return (
            <StatusParameterContext.Provider value={statusParameter}>
              <ErrorParameterContext.Provider value={errorParameter}>
                <StepParameterContext.Provider value={stepParameter}>
                  <StepsProtocolParameterContext.Provider value={stepsProtocolParameter}>
                    <BioreactorTab data={currentData} />
                  </StepsProtocolParameterContext.Provider>
                </StepParameterContext.Provider>
              </ErrorParameterContext.Provider>
            </StatusParameterContext.Provider>
          );
      case 'Plots':
        return (
          <BioreactorPlot
              device={currentDevice}
              refreshInterval={refreshInterval}
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
      <div className="p-3 mt-4 sm:m-0 flex flex-col items-center rounded-md sm:rounded-t-none bg-white shadow">
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
