import client from '../services/mqttService';
import { useEffect } from 'react';

const BroadcastDevices = () => {
  useEffect(() => {
    client.subscribe('lpatiny/Computer/server', (msg) => console.log(msg));
    return () => {
      client.disconnect();
    };
  });

  return <div>BroadcastDevicesPage</div>;
};

export default BroadcastDevices;
