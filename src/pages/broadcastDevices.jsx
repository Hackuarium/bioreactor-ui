import { useState, useEffect } from 'react';
import { Button } from '../components/tailwind-ui';
import AvailableDevicesList from '../components/availableDevicesList';
import AddDeviceModal from '../components/addDeviceModal';
import { getSavedDevices } from '../services/deviceService';

const BroadcastDevices = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [devicesList, setDevicesList] = useState([]);

  useEffect(() => {
    // get saved devices from DB
    getSavedDevices().then((list) => setDevicesList(list));
  }, [isModalOpen]);

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
        <Button onClick={() => setIsModalOpen(true)}>Add device</Button>
      </div>
      <AddDeviceModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      ></AddDeviceModal>

      <AvailableDevicesList
        data={devicesList}
        onSelect={onSelectItem}
        onEdit={onEditItem}
      />
    </div>
  );
};

export default BroadcastDevices;
