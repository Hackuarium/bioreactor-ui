import { connectDevice, DEVICE_TYPE } from '../services/deviceService';
import { useState, useEffect } from 'react';

const DeviceDetails = () => {
  const [connected, setConnected] = useState(false);
  const [data, setData] = useState([]);

  useEffect(() => {
    const device = connectDevice(
      DEVICE_TYPE.broadcast,
      'patinyComputer',
      'mqtt.beemos.org',
      'lpatiny/Computer/server',
      (res) => {
        //console.log(res);
        setConnected(true);
        setData(res);
        //device.getLastData().then((res) => console.log(res));
      },
      (err) => console.log(err),
    );
    /*
    setTimeout(() => {
      device.disconnect(() => setConnected(false));
    }, 9000);*/

    return () => {
      device.disconnect();
    };
  }, []);

  return (
    <div>
      <div>Device Details</div>
      <div>{connected && JSON.stringify(data)}</div>
    </div>
  );
};

export default DeviceDetails;
