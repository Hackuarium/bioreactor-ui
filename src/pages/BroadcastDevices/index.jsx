import { useState, useEffect } from 'react';

import { Button } from '../../components/tailwind-ui';
import { testDeviceConnection } from '../../services/broadCastDeviceService';
import {
  addDevice,
  updateDevice,
  deleteDevice,
  getDevices,
} from '../../services/devicesService';
import useNotification from '../../hooks/useNotification';
import DevicesList from './DevicesList';
import DeviceModal from './DeviceModal';
import { DEVICE_TYPE } from '../../services/devicesOptions';

const BroadcastDevices = ({ history, match }) => {
  const [render, setRender] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [devicesList, setDevicesList] = useState([]);
  const [onEditValues, setOnEditValues] = useState({});
  const { addErrorNotification } = useNotification();

  useEffect(() => {
    // get saved devices from DB
    getDevices(DEVICE_TYPE.broadcast).then((list) => setDevicesList(list));
  }, [render]);

  const onOpenModal = () => {
    setOnEditValues({});
    setIsModalOpen(true);
  };

  const onCloseModal = () => {
    setRender(!render); // refresh devices list
    setIsModalOpen(false); // close modal
  };

  const onSelectItem = (device, e, callback) => {
    setTimeout(async () => {
      testDeviceConnection(device)
        .then(() => {
          callback();
          history.push(match.url + '/' + device._id);
        })
        .catch((err) => {
          addErrorNotification(e.name, e.message);
          callback();
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

  return (
    <div className="p-8">
      <h2 className="text-3xl font-semibold mb-10">Broadcast devices</h2>
      <div className="w-full flex justify-end mb-4">
        <Button onClick={onOpenModal}>Add device</Button>
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
