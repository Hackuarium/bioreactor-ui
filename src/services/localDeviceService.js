import { isFunction } from 'lodash';
import { DevicesManager } from 'legoino-navigator-serial';
import legoinoDeviceInformation from 'legoino-device-information';

const SCAN_INTERVAL = 3000;

const devicesManager = new DevicesManager(navigator.serial);

export const getLocalDevicesManager = () => {
  /**
   * By calling this method from a click you give users the possibility to allow access to some devices
   */
  const requestDevices = async () => {
    await devicesManager.requestDevices();
  };

  /**
   * @returns {Array<object>}
   */
  const getConnectedDevices = async () => {
    await devicesManager.updateDevices();
    const connectedDevices = await devicesManager.getDevicesList({
      ready: true, // If ready==`true` returns only currently connected device, else returns all devices ever connected.
    });
    return connectedDevices;
  };

  /**
   * Update updated devices list every `scanInterval` [ms].
   * @param {Function} callback(devicesList): Callback to execute on each update
   * @param {number} scanInterval Delay between calls
   */
  const continuousUpdateDevices = async (
    callback,
    scanInterval = SCAN_INTERVAL,
  ) => {
    const interval = setInterval(async () => {
      const connectedDevices = await getConnectedDevices();
      isFunction(callback) && callback(connectedDevices);
    }, scanInterval);
    return interval;
  };

  /**
   * Send a serial command to a device.
   * @param {number} id ID of the device
   * @param {string} command Command to send
   * @returns ??????
   */
  const sendCommand = async (deviceId, command) => {
    return await devicesManager.sendCommand(deviceId, command);
  };

  return {
    requestDevices,
    getConnectedDevices,
    continuousUpdateDevices,
    sendCommand,
  };
};
