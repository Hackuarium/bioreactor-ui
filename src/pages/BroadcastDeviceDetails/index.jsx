import { useState, useEffect } from 'react';
import { HorizontalNavigation } from '../../components/tailwind-ui';

import { connectDevice } from '../../services/broadCastDeviceService';
import { getDevice } from '../../services/devicesService';
import Details from './Details';
import DeviceCardInfo from './DeviceCardInfo';

const DeviceDetails = ({ match, history }) => {
  const [currentPage, setCurrentPage] = useState(1);

  const [count, setCount] = useState(0);

  const [selected, setSelected] = useState({ value: 'Load', label: 'Load' });

  const [data, setData] = useState([]);
  // const [allData, setAllData] = useState([]);
  const [previousData, setPreviousData] = useState([]);

  const [deviceClient, setDeviceClient] = useState();
  const [deviceInfos, setDeviceInfos] = useState();
  const deviceId = `${match.params.id}`;

  useEffect(() => {
    if (deviceId) {
      getDevice(deviceId).then((deviceInfo) => {
        console.log(deviceInfo);
        setDeviceInfos(deviceInfo);
        connectDevice(deviceInfo).then((deviceClient) =>
          setDeviceClient(deviceClient),
        );
      });
    }
    return () => deviceClient?.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [deviceId]);

  useEffect(() => {
    if (deviceClient) {
      //getAllDataCount
      deviceClient.getAllDataCount().then((result) => {
        console.log('data count');
        console.log(result);
        setCount(result);
      });
      deviceClient.subscribe(
        (message) => setData([message, ...data]),
        (error) => console.log(error),
      );
      //console.log(data);
      deviceClient.getPageData(currentPage * 10, 10).then((result) => {
        //console.log(result);
        setPreviousData(result);
      });
      // deviceClient.getAllData().then((result) => {
      //   //console.log(result);
      //   setAllData(result);
      // });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [deviceClient]);

  useEffect(() => {
    if (deviceClient) {
      deviceClient.getPageData(currentPage * 10, 10).then((result) => {
        //console.log(result);
        setPreviousData(result);
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage]);

  return (
    <div className="mx-4 pb-4">
      <DeviceCardInfo device={deviceInfos} goBack={() => history.goBack()} />

      <HorizontalNavigation
        onSelect={(option) => {
          setSelected(option);
          setCurrentPage(1);
        }}
        selected={selected}
        options={['Load', 'I/O', 'FS', 'Temperature'].map((value) => ({
          value: String(value),
          label: String(value) + ' Details',
        }))}
      />

      <div className="p-3 mt-4 sm:m-0 flex flex-col items-center rounded-md sm:rounded-t-none bg-white shadow ">
        <Details
          allData={previousData}
          currentPage={currentPage}
          count={count}
          data={data}
          previousData={previousData}
          DetailType={selected.value}
          setCurrentPage={(p) => setCurrentPage(p)}
        />
      </div>
    </div>
  );
};

export default DeviceDetails;
