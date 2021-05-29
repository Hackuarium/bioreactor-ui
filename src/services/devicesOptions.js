import legoinoDeviceInformation from 'legoino-device-information';

// Default Values

export const DEVICES_DB = 'BIOREACTOR_devices';
export const DEFAULT_PORT = '9001';
export const DEFAULT_PROTOCOL = 'tcp';

// Static Values

export const DEVICE_TYPE = {
  broadcast: 'broadcast',
  interactive: 'interactive',
  local: 'local',
};

export const DEVICE_PROTOCOLS = ['tcp', 'http'];

export const DEVICE_KINDS = Object.keys(legoinoDeviceInformation).map(
  (key) => legoinoDeviceInformation[key].kind,
);

export const DEVICE_STATUS = {
  opening: 1,
  opened: 2,
  closed: 3,
  missing: 9,
  error: 10,
};

export const COMMANDS = {
  compactSettings: 'uc',
  reset: 'ur1234',
  setParameter: (label, value) => `${label}${value}`,
};
