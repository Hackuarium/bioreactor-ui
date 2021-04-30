import { connectDevice, getDevice } from '../services/deviceService';
import { useState, useEffect } from 'react';
import { HorizontalNavigation } from '../components/tailwind-ui';
import FSDetails from '../components/DeviceDetails/FSDetails'
import InOutDetails from '../components/DeviceDetails/InOutDetails'
import LoadDetails from '../components/DeviceDetails/LoadDetails'
import TemperatureDetails from '../components/DeviceDetails/TemperatureDetails'

const DeviceDetails = ({ match }) => {

  const [currentPage, setCurrentPage] = useState(1);

  const [selected, setSelected] = useState({value:'Load Details', label:'Load Details'});

  const [data, setData] = useState([]);
  const [previousData, setPreviousData] = useState([]);

  const [deviceClient, setDeviceClient] = useState();
  const deviceId = `${match.params.id}`;

  useEffect(() => {
    if (deviceId) {
      /*getDevice(deviceId).then((deviceInfo) => {
        //console.log(deviceInfo);
        connectDevice(deviceInfo).then((deviceClient) =>
          setDeviceClient(deviceClient),
        );
      });*/
      
      setData([{parameters:{A:'1',B:'2',C:'3',D:'4',E:'5',F:'6',G:'7',H:'8',I:'9',J:'10',K:'11',L:'12',M:'13',N:'14',O:'15',P:'16',}}]);
      setPreviousData([
        {doc:{parameters:{A:'1',B:'2',C:'3',D:'4',E:'5',F:'6',G:'7',H:'8',I:'9',J:'10',K:'11',L:'12',M:'13',N:'14',O:'15',P:'16',}}},
        {doc:{parameters:{A:'1',B:'2',C:'3',D:'4',E:'5',F:'6',G:'7',H:'8',I:'9',J:'10',K:'11',L:'12',M:'13',N:'14',O:'15',P:'16',}}},
        {doc:{parameters:{A:'1',B:'2',C:'3',D:'4',E:'5',F:'6',G:'7',H:'8',I:'9',J:'10',K:'11',L:'12',M:'13',N:'14',O:'15',P:'16',}}},
        {doc:{parameters:{A:'1',B:'2',C:'3',D:'4',E:'5',F:'6',G:'7',H:'8',I:'9',J:'10',K:'11',L:'12',M:'13',N:'14',O:'15',P:'16',}}},
        {doc:{parameters:{A:'1',B:'2',C:'3',D:'4',E:'5',F:'6',G:'7',H:'8',I:'9',J:'10',K:'11',L:'12',M:'13',N:'14',O:'15',P:'16',}}},
        {doc:{parameters:{A:'1',B:'2',C:'3',D:'4',E:'5',F:'6',G:'7',H:'8',I:'9',J:'10',K:'11',L:'12',M:'13',N:'14',O:'15',P:'16',}}},
        {doc:{parameters:{A:'1',B:'2',C:'3',D:'4',E:'5',F:'6',G:'7',H:'8',I:'9',J:'10',K:'11',L:'12',M:'13',N:'14',O:'15',P:'16',}}},
        {doc:{parameters:{A:'1',B:'2',C:'3',D:'4',E:'5',F:'6',G:'7',H:'8',I:'9',J:'10',K:'11',L:'12',M:'13',N:'14',O:'15',P:'16',}}},
        {doc:{parameters:{A:'1',B:'2',C:'3',D:'4',E:'5',F:'6',G:'7',H:'8',I:'9',J:'10',K:'11',L:'12',M:'13',N:'14',O:'15',P:'16',}}},
        {doc:{parameters:{A:'1',B:'2',C:'3',D:'4',E:'5',F:'6',G:'7',H:'8',I:'9',J:'10',K:'11',L:'12',M:'13',N:'14',O:'15',P:'16',}}},
        {doc:{parameters:{A:'1',B:'2',C:'3',D:'4',E:'5',F:'6',G:'7',H:'8',I:'9',J:'10',K:'11',L:'12',M:'13',N:'14',O:'15',P:'16',}}},
        {doc:{parameters:{A:'1',B:'2',C:'3',D:'4',E:'5',F:'6',G:'7',H:'8',I:'9',J:'10',K:'11',L:'12',M:'13',N:'14',O:'15',P:'16',}}},
        {doc:{parameters:{A:'1',B:'2',C:'3',D:'4',E:'5',F:'6',G:'7',H:'8',I:'9',J:'10',K:'11',L:'12',M:'13',N:'14',O:'15',P:'16',}}},
        {doc:{parameters:{A:'1',B:'2',C:'3',D:'4',E:'5',F:'6',G:'7',H:'8',I:'9',J:'10',K:'11',L:'12',M:'13',N:'14',O:'15',P:'16',}}},
        {doc:{parameters:{A:'1',B:'2',C:'3',D:'4',E:'5',F:'6',G:'7',H:'8',I:'9',J:'10',K:'11',L:'12',M:'13',N:'14',O:'15',P:'16',}}},
        {doc:{parameters:{A:'1',B:'2',C:'3',D:'4',E:'5',F:'6',G:'7',H:'8',I:'9',J:'10',K:'11',L:'12',M:'13',N:'14',O:'15',P:'16',}}},
        {doc:{parameters:{A:'1',B:'2',C:'3',D:'4',E:'5',F:'6',G:'7',H:'8',I:'9',J:'10',K:'11',L:'12',M:'13',N:'14',O:'15',P:'16',}}},
        {doc:{parameters:{A:'1',B:'2',C:'3',D:'4',E:'5',F:'6',G:'7',H:'8',I:'9',J:'10',K:'11',L:'12',M:'13',N:'14',O:'15',P:'16',}}},
        {doc:{parameters:{A:'1',B:'2',C:'3',D:'4',E:'5',F:'6',G:'7',H:'8',I:'9',J:'10',K:'11',L:'12',M:'13',N:'14',O:'15',P:'16',}}},
        {doc:{parameters:{A:'1',B:'2',C:'3',D:'4',E:'5',F:'6',G:'7',H:'8',I:'9',J:'10',K:'11',L:'12',M:'13',N:'14',O:'15',P:'16',}}},
        {doc:{parameters:{A:'1',B:'2',C:'3',D:'4',E:'5',F:'6',G:'7',H:'8',I:'9',J:'10',K:'11',L:'12',M:'13',N:'14',O:'15',P:'16',}}},
        {doc:{parameters:{A:'1',B:'2',C:'3',D:'4',E:'5',F:'6',G:'7',H:'8',I:'9',J:'10',K:'11',L:'12',M:'13',N:'14',O:'15',P:'16',}}},
        {doc:{parameters:{A:'1',B:'2',C:'3',D:'4',E:'5',F:'6',G:'7',H:'8',I:'9',J:'10',K:'11',L:'12',M:'13',N:'14',O:'15',P:'16',}}},
        {doc:{parameters:{A:'1',B:'2',C:'3',D:'4',E:'5',F:'6',G:'7',H:'8',I:'9',J:'10',K:'11',L:'12',M:'13',N:'14',O:'15',P:'16',}}},
      
      ]);
    }
  },[deviceId]);

  useEffect(() => {
    if (deviceClient) {
      //getAllDataCount
      /*deviceClient.getAllDataCount().then((result) => {
        console.log(result);
        setCount(result);
      });
      deviceClient.subscribe(
        (message) => setData([message, ...data]),
        (error) => console.log(error),
      );
      console.log(data);
      deviceClient.getPageDate(currentPage * 10, 10).then((result) => {
        console.log(result);
        setPreviousData(result);
      });*/
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [deviceClient]);

  useEffect(() => {
    if (deviceClient) {
      /*deviceClient.getPageDate(currentPage * 10, 10).then((result) => {
        console.log(result);
        setPreviousData(result);
      });*/
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage]);

  return (
    <div class="m-4 p-2 shadow-lg " style={{backgroundColor:'white', borderRadius:'10px'}} >
      <div>
        <HorizontalNavigation 
          onSelect={(option) => {
            setSelected(option);
          }}
          selected={selected}
          options={['Load Details', 'I/O Details','FS Details', 'Temperature Details'].map((value) => ({
            value: String(value),
            label: String(value),
          }))}
        />
      </div>
      

      <div>
        {selected.value==='Temperature Details'? 
          <TemperatureDetails data={data} previousData={previousData} />
          :selected.value==='FS Details'?
          <FSDetails data={data} previousData={previousData}/>
          :selected.value==='I/O Details'?
          <InOutDetails data={data} previousData={previousData}/>
          :selected.value==='Load Details'?
          <LoadDetails data={data} previousData={previousData}/>:null
        }
      </div>

    </div>
  );
};

export default DeviceDetails;
