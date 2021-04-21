import { useState, useEffect } from 'react';
import { isFunction } from 'lodash';
import { Button } from '../components/tailwind-ui';
import DevicesList from '../components/devicesList';
import DeviceModal from '../components/deviceModal';
import {
  addDevice,
  updateDevice,
  deleteDevice,
  getSavedDevices,
  connectDevice,
} from '../services/deviceService';
import useNotification from '../hooks/useNotification';

const BroadcastDevices = () => {
  const [render, setRender] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [devicesList, setDevicesList] = useState([]);
  const [onEditValues, setOnEditValues] = useState({});
  const { addErrorNotification } = useNotification();

  useEffect(() => {
    // get saved devices from DB
    getSavedDevices().then((list) => setDevicesList(list));
  }, [render]);

  const onSelectItem = (device, e, callback) => {
    setTimeout(() => {
      connectDevice(device)
        .then((r) => {
          // navigate to device details page
          console.log(r);
          isFunction(callback) && callback();
        })
        .catch((e) => {
          addErrorNotification(e.name, e.message);
          isFunction(callback) && callback();
        });
    }, 500);
  };

  const onEditItem = (device, e) => {
    e.stopPropagation();
    setOnEditValues(device);
    setIsModalOpen(true);
  };

  const onDeleteItem = (device, e) => {
    e.stopPropagation();
    deleteDevice(device._id)
      .then(() => setRender(!render))
      .catch((e) => addErrorNotification(e.name, e.message));
  };

  const onCloseModal = () => {
    setRender(!render);
    setIsModalOpen(false);
    setOnEditValues({});
  };

  return (
    <div className="p-8">
      <h2 className="text-3xl font-semibold mb-12 lg:mb-16">
        Broadcast devices
      </h2>
      <div className="w-full flex justify-end mb-6 lg:mb-8">
        <Button onClick={() => setIsModalOpen(true)}>Add device</Button>
      </div>
      <div>
        <div className="w-full my-2 flex flex-row items-center ">
          <h3 className="w-max ml-2 mr-4 text-neutral-600 text-sm whitespace-nowrap ">
            Available devices
          </h3>
          <div className="w-full border-t border-neutral-300" />
        </div>
        <DevicesList
          data={devicesList}
          onSelect={onSelectItem}
          onEdit={onEditItem}
          onDelete={onDeleteItem}
        />
      </div>

      <DeviceModal
        isOpen={isModalOpen}
        onClose={onCloseModal}
        initialValues={onEditValues}
        onSave={addDevice}
        onUpdate={updateDevice}
      ></DeviceModal>
    </div>
  );
};

export default BroadcastDevices;
