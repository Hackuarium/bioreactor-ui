import { useState, useEffect } from 'react';
import { throttle } from 'lodash';
import { HorizontalNavigation } from '../../components/tailwind-ui';

import { connectDevice } from '../../services/broadCastDeviceService';
import {
  getDevice,
  updateDevice,
  getDeviceKind,
  mapParameters,
} from '../../services/devicesService';
import HistoryTab from './HistoryTab';
import GeneralTab from './GeneralTab';
import DeviceCardInfo from './DeviceCardInfo';

const TABS = ['General', 'Data'].map((value) => ({
  value: value,
  label: value,
}));

const DeviceDetails = ({ match, history }) => {
  const [currentDevice, setCurrentDevice] = useState();
  const [selectedTab, setSelectedTab] = useState(TABS[0]);
  const [deviceClient, setDeviceClient] = useState();
  const [data, setData] = useState([]);

  const [currentPage, setCurrentPage] = useState(1);

  const [count, setCount] = useState(0);

  // const [allData, setAllData] = useState([]);
  const [previousData, setPreviousData] = useState([]);

  const deviceId = `${match.params.id}`;

  // get device from DB at the first render
  useEffect(() => {
    if (deviceId) {
      getDevice(deviceId).then((_device) => {
        // console.log(_device);
        setCurrentDevice(_device);
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [deviceId]);

  // subscribe to device & listen to data (+ correct device kind if it's not right)
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
  }, [currentDevice]);

  const updateData = throttle(
    (_data) => {
      const params = mapParameters(currentDevice.kind?.kind, _data?.parameters);
      // console.log(params);
      setData({ ..._data, parameters: params });
    },
    1000,
    { trailing: true },
  );

  // useEffect(() => {
  //   if (deviceClient) {
  //     //getAllDataCount
  //     deviceClient.getAllDataCount().then((result) => {
  //       console.log('data count');
  //       console.log(result);
  //       setCount(result);
  //     });
  //     //console.log(data);
  //     deviceClient.getPageData(currentPage * 10, 10).then((result) => {
  //       //console.log(result);
  //       setPreviousData(result);
  //     });
  //     // deviceClient.getAllData().then((result) => {
  //     //   //console.log(result);
  //     //   setAllData(result);
  //     // });
  //   }
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [deviceClient]);

  // useEffect(() => {
  //   if (deviceClient) {
  //     deviceClient.getPageData(currentPage * 10, 10).then((result) => {
  //       //console.log(result);
  //       setPreviousData(result);
  //     });
  //   }
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [currentPage]);

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
        {/* <ActualDetails DetailType={selectedTab.value} data={data} /> */}

        {/* <DetailsPlot
            allData={previousData}
            previousData={previousData}
            DetailType={selected.value}
            Header={selected.value + ' Variation Chart'}
          /> */}

        {/* <DataTable
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          count={count}
          previousData={previousData}
          DetailType={selectedTab.value}
        /> */}
      </div>
    </div>
  );
};

export default DeviceDetails;
