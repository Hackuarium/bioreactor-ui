import { DevicesManager } from 'legoino-navigator-serial';

const SCAN_INTERVAL = 5000;
const DEVICE_STATUS = {
  opening: 1,
  opened: 2,
  closed: 3,
  missing: 9,
  error: 10,
};

export const getLocalDevicesManager = () => {
  const devicesManager = new DevicesManager(navigator.serial);

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
    return await devicesManager.getDevicesList({ ready: true });
    // If ready==`true` returns only currently connected device, else returns all devices ever connected.
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
    devicesManager.continuousUpdateDevices({
      scanInterval,
      callback,
    });
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
