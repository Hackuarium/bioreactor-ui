import { useState, useEffect } from 'react';
import { HorizontalNavigation } from '../../components/tailwind-ui';

import { connectDevice } from '../../services/broadCastDeviceService';
import { getDevice } from '../../services/devicesService';
import Details from './Details';

const DeviceDetails = ({ match }) => {
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
    <div
      className="m-4 p-2 shadow-lg "
      style={{ backgroundColor: 'white', borderRadius: '10px' }}
    >
      <div className="m-4">
        <div className="p-4 border-b">
          <h2 className="text-2xl ">Device Information</h2>
          <p className="text-sm text-gray-500">Device connection details.</p>
        </div>

        <div>
          <div className="md:grid md:grid-cols-2 hover:bg-gray-50 md:space-y-0 space-y-1 p-4 border-b">
            <p className="text-gray-600">Device Name</p>
            <p>{deviceInfos ? deviceInfos.name : ''}</p>
          </div>
        </div>
        <div>
          <div className="md:grid md:grid-cols-2 hover:bg-gray-50 md:space-y-0 space-y-1 p-4 border-b">
            <p className="text-gray-600">Url</p>
            <p>{deviceInfos ? deviceInfos.url : ''}</p>
          </div>
        </div>
        <div>
          <div className="md:grid md:grid-cols-2 hover:bg-gray-50 md:space-y-0 space-y-1 p-4 border-b">
            <p className="text-gray-600">Device kind</p>
            <p>{deviceInfos ? deviceInfos.kind : ''}</p>
          </div>
        </div>
        <div>
          <div className="md:grid md:grid-cols-2 hover:bg-gray-50 md:space-y-0 space-y-1 p-4 border-b">
            <p className="text-gray-600">Topic</p>
            <p>{deviceInfos ? deviceInfos.topic : ''}</p>
          </div>
        </div>
      </div>

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
  );
};

export default DeviceDetails;
