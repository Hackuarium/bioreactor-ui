import { useState, useEffect } from 'react';
import { throttle } from 'lodash';
import { HorizontalNavigation } from '../../components/tailwind-ui';

import { connectDevice } from '../../services/broadCastDeviceService';
import {
  getDevice,
  updateDevice,
  getDeviceKind,
  mapParameters,
  getLastSavedData,
  closeDbConnection,
} from '../../services/devicesService';
import HistoryTab from './HistoryTab';
import GeneralTab from './GeneralTab';
import DeviceCardInfo from './DeviceCardInfo';
import { useCallback } from 'react';

const TABS = ['General', 'Data'].map((value) => ({
  value: value,
  label: value,
}));

const DeviceDetails = ({ match, history }) => {
  const [currentDevice, setCurrentDevice] = useState();
  const [selectedTab, setSelectedTab] = useState(TABS[0]);
  const [deviceClient, setDeviceClient] = useState();
  const [data, setData] = useState({});

  const deviceId = `${match.params.id}`;

  // if it's called multiple times, execute it once in 1000ms
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const updateData = useCallback(
    throttle(
      (_data) => {
        const params = mapParameters(
          currentDevice.kind?.kind,
          _data?.parameters,
        );
        console.log({ ..._data, parameters: params });
        setData({ ..._data, parameters: params });
      },
      1000,
      { trailing: true },
    ),
    [currentDevice?.kind?.kind],
  );

  // get device from DB at the first render
  useEffect(() => {
    if (deviceId) {
      getDevice(deviceId).then(setCurrentDevice).catch(console.log);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [deviceId]);

  // fetch data locally at first when remote data is not received yet
  useEffect(() => {
    if (currentDevice?._id) {
      getLastSavedData(currentDevice?._id).then((_data) => {
        if (_data.length > 0) updateData(_data[0]);
      });
    }
    return () => currentDevice?._id && closeDbConnection(currentDevice?._id);
  }, [currentDevice?._id, updateData]);

  // get remote data : subscribe to device & listen to data (+ correct device kind if it's not right)
  useEffect(() => {
    let unsubscribe;
    if (currentDevice) {
      let isFirstTime = true;
      connectDevice(currentDevice)
        .then((_deviceClient) => {
          setDeviceClient(_deviceClient);
          unsubscribe = _deviceClient?.subscribe(
            (_data) => {
              if (isFirstTime) {
                // set the correct device kind (extracted from deviceId)
                const kind = getDeviceKind(_data.deviceId);
                if (kind?.kind !== currentDevice.kind?.kind) {
                  updateDevice({ ...currentDevice, kind });
                  setCurrentDevice({ ...currentDevice, kind });
                }
                isFirstTime = false;
              }
              updateData(_data);
            },
            (err) => console.log(err),
          );
        })
        .catch((err) => console.log(err));
    }
    return () => {
      unsubscribe && unsubscribe();
      deviceClient?.disconnect();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentDevice]);

  const renderTabContent = (tab) => {
    switch (tab.value) {
      case 'General':
        return <GeneralTab data={data} device={currentDevice} />;
      case 'Data':
        return <HistoryTab device={currentDevice} />;
      default:
        return <div />;
    }
  };

  const goBack = () => history.goBack();

  return (
    <div className="mx-4 pb-4">
      <DeviceCardInfo device={currentDevice} goBack={goBack} />

      <HorizontalNavigation
        onSelect={setSelectedTab}
        selected={selectedTab}
        options={TABS}
      />

      <div className="p-3 mt-4 sm:m-0 flex flex-col items-center rounded-md sm:rounded-t-none bg-white shadow ">
        {renderTabContent(selectedTab)}
      </div>
    </div>
  );
};

export default DeviceDetails;
