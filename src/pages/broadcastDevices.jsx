import AvailableDevicesList from '../components/availableDevicesList';
import { useState } from 'react';

const BroadcastDevices = () => {
  const [data] = useState([
    {
      name: 'device 1',
      url: 'mqtt.beemos.org',
      topic: 'lpatiny/Computer/server',
    },
    {
      name: 'device 2',
      url: 'mqtt.zakodium.org',
      topic: 'lpatiny/Computer/server',
    },
    {
      name: 'device 3',
      url: 'mqtt.zakodium.org',
      topic: 'lpatiny/Computer/server',
    },
  ]);

  const onSelectItem = (device) => {
    console.log(device);
  };

  const onEditItem = (device, e) => {
    e.stopPropagation();
    console.log(device);
  };

  return (
    <div className="p-8">
      <h2 className="text-3xl font-semibold ">Broadcast devices</h2>
      <div className="h-40" />
      <div className="w-full flex flex-row items-center">
        <h3 className="w-max ml-2 mr-4 text-neutral-600 text-sm font-semibold whitespace-nowrap ">
          Available devices
        </h3>
        <div className="w-full border-t border-neutral-300" />
      </div>
      <div className="h-4" />

      <AvailableDevicesList
        data={data}
        onSelect={onSelectItem}
        onEdit={onEditItem}
      />
    </div>
  );
};

export default BroadcastDevices;
