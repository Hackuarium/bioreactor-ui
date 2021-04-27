import { connectDevice, getDevice} from '../services/deviceService';
import { useState, useEffect } from 'react';
import {Table} from '../components/tailwind-ui'

const DeviceDetails = ({ match }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [count, setCount] = useState(0);
  const [data, setData] = useState([]);
  const [previousData, setPreviousData] = useState([]);
  const [deviceClient, setDeviceClient] = useState();
  const deviceId = `${match.params.id}`;
  useEffect(() => {
    if (deviceId) {
      getDevice(deviceId).then((deviceInfo) => {
        //console.log(deviceInfo);
        connectDevice(deviceInfo).then((deviceClient) =>
          setDeviceClient(deviceClient),
        );
      });
    }
  }, []);

  useEffect(() => {
    if (deviceClient) {
      //getAllDataCount
      deviceClient.getAllDataCount().then(result=>{
        console.log(result)
        setCount(result)
      })
      deviceClient.subscribe(
        (message) => setData([message, ...data]),
        (error) => console.log(error),
      );
      console.log(data)
      deviceClient.getPageDate(currentPage*10,10).then(result=>{
        console.log(result)
        setPreviousData(result)
      })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [deviceClient]);

  useEffect(() => {
    if (deviceClient) {
      deviceClient.getPageDate(currentPage*10,10).then(result=>{
        console.log(result)
        setPreviousData(result)
      })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage]);


  return (
    <div class="m-2 ">
    <div class=" bg-white w-full rounded-lg shadow-xl">
        <div class="p-4 border-b">
            <h2 class="text-2xl ">
                Device Details
            </h2>
            <p class="text-sm text-gray-500">
                Current details of the device. 
            </p>
        </div>
        <div>
            <div class="md:grid md:grid-cols-2 hover:bg-gray-50 md:space-y-0 space-y-1 p-4 border-b">
                <p class="text-gray-600">
                    CPU Temperature
                </p>
                <p>
                    {data?data[0]?data[0].parameters.A:"":""}
                </p>
            </div>
            <div class="md:grid md:grid-cols-2 hover:bg-gray-50 md:space-y-0 space-y-1 p-4 border-b">
                <p class="text-gray-600">
                    Free Memory
                </p>
                <p>
                  {data?data[0]?data[0].parameters.B:"":''}
                </p>
            </div>
        </div>
    </div>

    <div class="  my-8   bg-white w-full rounded-lg ">
        <div class="p-4 ">
            <h2 class="text-2xl ">
                Previous Details
            </h2>
            <p class="text-sm text-gray-500">
                Previous details of the device. 
            </p>
        </div>
      <Table class="min-w-full table-auto"
        Header={()=>
          <tr class="bg-primary-900">
            <th class="px-4 py-2"><span class="text-gray-300">CPU Temp</span></th>
            <th class="px-4 py-2"><span class="text-gray-300">Free mem</span></th>
            <th class="px-2 py-2"><span class="text-gray-300">Free swap</span></th>
            <th class="px-2 py-2"><span class="text-gray-300">FS Read</span></th>
            <th class="px-2 py-2"><span class="text-gray-300">FS Write</span></th>
            <th class="px-2 py-2"><span class="text-gray-300">Network R</span></th>
            <th class="px-2 py-2"><span class="text-gray-300">Network W</span></th>
            <th class="px-2 py-2"><span class="text-gray-300">Load</span></th>
            <th class="px-2 py-2"><span class="text-gray-300">User L</span></th>
            <th class="px-2 py-2"><span class="text-gray-300">System L</span></th>
            <th class="px-2 py-2"><span class="text-gray-300">Nice L</span></th>
            <th class="px-2 py-2"><span class="text-gray-300">Idle L</span></th>
            <th class="px-2 py-2"><span class="text-gray-300">IRQ L</span></th>
            <th class="px-4 py-2"><span class="text-gray-300">FS min</span></th>
            <th class="px-4 py-2"><span class="text-gray-300">FS mix</span></th>
          </tr>
        }
      Tr={({value})=>
      value&&value.doc.parameters?
          <tr class="bg-white border-4 border-gray-200">
            <td class="px-4 py-2"><span>{value.doc.parameters.A}</span></td>
            <td class="px-4 py-2"><span>{value.doc.parameters.B}</span></td>
            <td class="px-4 py-2"><span>{value.doc.parameters.C}</span></td>
            <td class="px-4 py-2"><span>{value.doc.parameters.D}</span></td>
            <td class="px-4 py-2"><span>{value.doc.parameters.E}</span></td>
            <td class="px-4 py-2"><span>{value.doc.parameters.F}</span></td>
            <td class="px-4 py-2"><span>{value.doc.parameters.G}</span></td>
            <td class="px-4 py-2"><span>{value.doc.parameters.H}</span></td>
            <td class="px-4 py-2"><span>{value.doc.parameters.I}</span></td>
            <td class="px-4 py-2"><span>{value.doc.parameters.J}</span></td>
            <td class="px-4 py-2"><span>{value.doc.parameters.K}</span></td>
            <td class="px-4 py-2"><span>{value.doc.parameters.L}</span></td>
            <td class="px-4 py-2"><span>{value.doc.parameters.M}</span></td>
            <td class="px-4 py-2"><span>{value.doc.parameters.N}</span></td>
            <td class="px-4 py-2"><span>{value.doc.parameters.O}</span></td>
          </tr>:null}
        data={previousData}
        pagination={{
          itemsPerPage: 10,
          onPageChange: (page)=>{setCurrentPage(page)},
          page: currentPage,
          totalCount: count,
          withText: true
        }}
      />
      </div>
    </div>
  );
};

export default DeviceDetails;
