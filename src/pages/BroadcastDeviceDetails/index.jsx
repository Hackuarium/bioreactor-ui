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

    <div class=" text-white flex items-center absolute rounded-full py-4 px-4 shadow-xl bg-pink-500 left-4 -top-6">
              
                <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                </svg>
            </div>

    <div class="flex space-x-4 ..." >
    <div class="flex flex-1 flex-col p-4 bg-gray-200 shadow-md hover:shodow-lg rounded-2xl">
        <div class="flex items-center justify-between">
          <div class="flex justify-items-stretch  items-center">
            
            <div className=' flex-1  flex-col w-1/2'>
              <div class="  flex flex-col ml-3 mb-3">
              
                <div class=" flex flex-row font-medium leading-none text-gray-900">
                  
                  <svg xmlns="http://www.w3.org/2000/svg" class="mr-2 h-6 w-6" fill="white"  viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
                  </svg>
                  Device Name
                  </div>
                <p class="ml-8 text-sm text-gray-700 leading-none mt-1">{deviceInfos ? deviceInfos.name : ''}
                </p>
              </div>
              <div class=" flex flex-col ml-3 mb-3">
                <div class="flex flex-row font-medium leading-none text-gray-900">
                <svg xmlns="http://www.w3.org/2000/svg" class="mr-2 h-6 w-6" fill="white" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                </svg>
                  Url
                </div>
                <p class="ml-8 text-sm text-gray-700 leading-none mt-1">{deviceInfos ? deviceInfos.url : ''}
                </p>
              </div>
              <div class="flex flex-col ml-3 mb-3">
                <div class="flex flex-row font-medium leading-none text-gray-900">
                <svg xmlns="http://www.w3.org/2000/svg" class="mr-2 h-6 w-6" fill="white" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                </svg>
                  Device kind
                </div>
                <p class="ml-8 text-sm text-gray-700 leading-none mt-1">{deviceInfos ? deviceInfos.kind : ''}
                </p>
              </div>
              <div class="flex flex-col ml-3 mb-3">
                <div class="flex flex-row font-medium leading-none text-gray-900">
                <svg xmlns="http://www.w3.org/2000/svg" class="mr-2 h-6 w-6" fill="white" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                </svg>
                  Topic
                </div>
                <p class="ml-8 text-sm text-gray-700 leading-none mt-1">{deviceInfos ? deviceInfos.topic : ''}
                </p>
              </div>
            </div>
            
          </div>
        </div>
      </div>

      <div class="flex flex-1 flex-col p-4 bg-gray-200 shadow-md hover:shodow-lg rounded-2xl">
        <div class="flex items-center justify-between">
          <div class="flex justify-items-stretch  items-center">
             <div className=' flex-1  flex-col w-1/2' style={{width:'50%'}}>
              <div class="  flex flex-col ml-3 mb-3">
                <div class="flex flex-row font-medium leading-none text-gray-900">
                <svg xmlns="http://www.w3.org/2000/svg" class="mr-2 h-6 w-6" fill="white" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5.636 18.364a9 9 0 010-12.728m12.728 0a9 9 0 010 12.728m-9.9-2.829a5 5 0 010-7.07m7.072 0a5 5 0 010 7.07M13 12a1 1 0 11-2 0 1 1 0 012 0z" />
                </svg>
                  Status
                </div>
                <p class="ml-8 text-sm text-gray-700 leading-none mt-1">Connected
                </p>
              </div>
              <div class=" flex flex-col ml-3 mb-3">
                <div class=" flex flex-row font-medium leading-none text-gray-900">
                <svg xmlns="http://www.w3.org/2000/svg" class="mr-2 h-6 w-6" fill="white" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                  First Date Entry
                </div>
                <p class="ml-8 text-sm text-gray-700 leading-none mt-1">12/10/2021
                </p>
              </div>
              <div class="flex flex-col ml-3 mb-3">
                <div class="flex flex-row font-medium leading-none text-gray-900">
                <svg xmlns="http://www.w3.org/2000/svg" class="mr-2 h-6 w-6" fill="white" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                  Last Date Entry
                </div>
                <p class="ml-8 text-sm text-gray-700 leading-none mt-1">12/10/2021
                </p>
              </div>
              <div class="flex flex-col ml-3 mb-3">
                <div class="flex flex-row font-medium leading-none text-gray-900">
                <svg xmlns="http://www.w3.org/2000/svg" fill-rule="evenodd" class="mr-2 h-6 w-6" fill="white" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 13l-7 7-7-7m14-8l-7 7-7-7" />
                </svg>
                  Number of Entries
                </div>
                <p class="ml-8 text-sm text-gray-700 leading-none mt-1">10
                </p>
              </div>
            </div>
           
          </div>
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
