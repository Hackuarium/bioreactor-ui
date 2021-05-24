import { useState } from 'react';
import SelectDeviceComponent from './selectDeviceComponent';

const LocalDevices = () => {
  const [devices, setDevices] = useState([]);

  return (
    <>
      <SelectDeviceComponent devices={devices} setDevices={setDevices} />
      <div>{JSON.stringify(devices)}</div>
    </>
  );
};

export default LocalDevices;
