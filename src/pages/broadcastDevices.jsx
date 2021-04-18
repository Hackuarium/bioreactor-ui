import { useState, useEffect } from 'react';
import { Button } from '../components/tailwind-ui';
import AvailableDevicesList from '../components/availableDevicesList';
import DeviceModal from '../components/deviceModal';
import {
  addDevice,
  updateDevice,
  deleteDevice,
  getSavedDevices,
} from '../services/deviceService';

const BroadcastDevices = () => {
  const [render, setRender] = useState(false);
  const [initialValues, setInitialValues] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [devicesList, setDevicesList] = useState([]);

  useEffect(() => {
    // get saved devices from DB
    getSavedDevices().then((list) => setDevicesList(list));
  }, [render]);

  const onSelectItem = (device) => {
    console.log(device);
  };

  const onEditItem = (device, e) => {
    e.stopPropagation();
    setInitialValues(device);
    setIsModalOpen(true);
  };

  const onDeleteItem = (device, e) => {
    e.stopPropagation();
    deleteDevice(device._id).then(() => setRender(!render));
  };

  const onCloseModal = () => {
    setRender(!render);
    setIsModalOpen(false);
    setInitialValues({});
  };

  return (
    <div className="p-8">
      <h2 className="text-3xl font-semibold mb-12 lg:mb-16">
        Broadcast devices
      </h2>
      <div className="w-full flex justify-end mb-6 lg:mb-8">
        <Button onClick={() => setIsModalOpen(true)}>Add device</Button>
      </div>
      <DeviceModal
        isOpen={isModalOpen}
        onClose={onCloseModal}
        initialValues={initialValues}
        onSave={addDevice}
        onUpdate={updateDevice}
      ></DeviceModal>

      <AvailableDevicesList
        data={devicesList}
        onSelect={onSelectItem}
        onEdit={onEditItem}
        onDelete={onDeleteItem}
      />
    </div>
  );
};

export default BroadcastDevices;
