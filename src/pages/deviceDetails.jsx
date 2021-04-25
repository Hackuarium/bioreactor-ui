import { connectDevice, getDevice } from '../services/deviceService';
import { useState, useEffect } from 'react';

const DeviceDetails = ({ match }) => {
  const [data, setData] = useState([]);
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
  }, [deviceId]);

  useEffect(() => {
    if (deviceClient) {
      //console.log(deviceClient);
      deviceClient.subscribe(
        (message) => setData([message, ...data]),
        (error) => console.log(error),
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [deviceClient]);

  return (
    <div>
      <div>Device Details</div>
      <p>{deviceId}</p>
      <p>{JSON.stringify(data[0])}</p>
    </div>
  );
};

export default DeviceDetails;
