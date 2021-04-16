import AvailableDevicesList from '../components/availableDevicesList';
import { useState } from 'react';
import AddDeviceModal from '../components/addDeviceModal';

const BroadcastDevices = () => {
  const [isModalOpen, setIsModalOpen] = useState(true);
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
      <h2 className="text-3xl font-semibold mb-12 lg:mb-16">
        Broadcast devices
      </h2>
      <div className="w-full flex justify-end mb-6 lg:mb-8">
        <button
          onClick={() => setIsModalOpen(true)}
          className="px-4 text-neutral-100 font-semibold p-2 border rounded-md shadow bg-primary-700 focus:outline-none active:bg-primary-500"
        >
          Add device
        </button>
      </div>
      <AddDeviceModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      ></AddDeviceModal>

      <AvailableDevicesList
        data={data}
        onSelect={onSelectItem}
        onEdit={onEditItem}
      />
    </div>
  );
};

export default BroadcastDevices;
