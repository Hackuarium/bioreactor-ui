import legoinoDeviceInformation from 'legoino-device-information';

// Default Values

export const DEVICES_DB = 'BIOREACTOR-UI_devices';
export const DEFAULT_PORT =
  window.location.protocol === 'https:' ? '443' : '80'; // old '8080'
export const DEFAULT_PROTOCOL =
  window.location.protocol === 'https:' ? 'wss' : 'http'; // old tcp

// Static Values

export const DEVICE_PROTOCOLS = ['http', 'tcp', 'wss'];

export const COMMANDS = {
  help: 'h',
  settings: 'u',
  compactSettings: 'uc',
  runExperiment: 'r',
  kinetic: 'k',
  reset: 'ur1234',
  sleep: 'l',
  setParameter: (label, value) => `${label}${value}`,
};

export const DEVICE_KINDS = Object.keys(legoinoDeviceInformation).map(
  (key) => legoinoDeviceInformation[key].kind,
);

export const DEVICE_KINDS_OPTIONS = Object.keys(legoinoDeviceInformation)
  .filter((key) => legoinoDeviceInformation[key].kind)
  .map((key) => ({
    ...legoinoDeviceInformation[key],
    label: legoinoDeviceInformation[key].kind,
    type: 'option',
  }));

export const DEVICE_STATUS = {
  opening: 1,
  opened: 2,
  closed: 3,
  missing: 9,
  error: 10,
};

export const DEVICE_TYPE = {
  broadcast: 'broadcast',
  interactive: 'interactive',
  local: 'local',
};

export const getDeviceType = (deviceId) => {
  try {
    if (deviceId) {
      const selectedDeviceType = legoinoDeviceInformation.fromDeviceID(
        Number(deviceId),
      );
      return DEVICE_KINDS_OPTIONS.filter(
        (element) => element.id === selectedDeviceType.id,
      )[0];
    }
  } catch (e) {
    console.log(e);
    return undefined;
  }
};
