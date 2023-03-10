import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { Button } from '../../components/tailwind-ui';
import {
  broadcastDeviceInfo,
  continuousListenToDevices,
} from '../../services/broadCastDeviceService';
import {
  updateDevice,
  deleteDevice,
  getDevices,
  addDevice,
} from '../../services/devicesService';
import useNotification from '../../hooks/useNotification';
import DevicesList from './DevicesList';
import DeviceModal from './DeviceModal';
import { DEVICE_TYPE } from '../../services/devicesOptions';

const SCAN_INTERVAL = 10000; // refresh devices status every 10s

const BroadcastDevices = ({ history, match }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [devicesList, setDevicesList] = useState([]);
  const [onEditValues, setOnEditValues] = useState({});
  const { addErrorNotification } = useNotification();

  const navigate = useNavigate();

  // get saved devices from DB
  useEffect(() => {
    refreshDevices();
  }, []);

  // listen continuously to devices status
  useEffect(() => {
    const cleanup = continuousListenToDevices(
      devicesList,
      (res) => {
        const _devices = [];
        let isChanged = false;
        res.forEach((response) => {
          if (response.status === 'fulfilled') {
            const device = response.value.device;
            if (!device.connected) {
              device.connected = true;
              isChanged = true;
            }
            _devices.push(device);
          } else {
            const device = response.reason.device;
            if (device.connected) {
              device.connected = false;
              isChanged = true;
            }
            _devices.push(device);
          }
        });
        if (isChanged) setDevicesList(_devices);
      },
      SCAN_INTERVAL,
    );

    return () => cleanup.then((intervalId) => clearInterval(intervalId));
  }, [devicesList]);

  const refreshDevices = () =>
    getDevices(DEVICE_TYPE.broadcast).then(setDevicesList);

  const onCloseModal = () => {
    setIsModalOpen(false); // close modal
    setOnEditValues({});
  };

  const onSelectDevice = (device, e) => {
    // history.push(match.url + '/' + device._id);
    navigate(match.url + '/' + device._id);
  };

  const onAddDevice = async (device) => {
    const deviceInfo = broadcastDeviceInfo(device);
    await addDevice(deviceInfo);
    refreshDevices();
  };

  const onUpdateDevice = async (device) => {
    await updateDevice(device);
    refreshDevices();
  };

  const onEditDevice = (device, e) => {
    e.stopPropagation();
    setOnEditValues(device);
    setIsModalOpen(true);
  };

  const onDeleteDevice = (device, e) => {
    e.stopPropagation();
    deleteDevice(device._id)
      .then(() => refreshDevices())
      .catch((e) => addErrorNotification(e.name, e.message));
  };

  return (
    <div className="p-8">
      <h2 className="text-3xl font-semibold mb-10">Broadcast devices</h2>
      <div className="w-full flex justify-end mb-4">
        <Button onClick={() => setIsModalOpen(true)}>Add</Button>
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
          onSelect={onSelectDevice}
          onEdit={onEditDevice}
          onDelete={onDeleteDevice}
        />
      </div>

      <DeviceModal
        isOpen={isModalOpen}
        onClose={onCloseModal}
        initialValues={onEditValues}
        onSave={onAddDevice}
        onUpdate={onUpdateDevice}
      ></DeviceModal>
    </div>
  );
};

export default BroadcastDevices;
