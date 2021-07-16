import legoinoDeviceInformation from 'legoino-device-information';

// Default Values

export const DEVICES_DB = 'BIOREACTOR_devices';
export const DEFAULT_PORT = '80'; // old '8080'
export const DEFAULT_PROTOCOL = 'http'; // old tcp

// Static Values

export const DEVICE_TYPE = {
  broadcast: 'broadcast',
  interactive: 'interactive',
  local: 'local',
};

export const DEVICE_PROTOCOLS = ['http', 'tcp', 'wss'];

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
  runExperiment: 'r',
  kinetic: 'k',
  reset: 'ur1234',
  sleep: 'l',
  setParameter: (label, value) => `${label}${value}`,
};
