import db from './db';
import { connect, subscribe } from './mqttService';
import { isFunction } from 'lodash';

// Public Vars
export const DEVICE_TYPE = {
  broadcast: 'broadcast',
  interactive: 'interactive',
  local: 'local',
};
export const DEVICE_PROTOCOLS = {
  tcp: 'tcp',
  http: 'http',
};
export const DEVICE_KINDS = [
  'computer',
  'beemos',
  'openBio',
  'openBio6',
  'openSpectro',
  'simpleSpectro',
  'solar2015',
];

// Private Vars (Default)
const DEVICES_DB = 'BIOREACTOR_devices';
const DEFAULT_PORT = '9001';
const DEFAULT_PROTOCOL = DEVICE_PROTOCOLS.tcp;

// Public Functions

export const connectDevice = ({ url, protocol, port, username, password }) => {
  return connect(url, protocol, port, username, password);
};

export const getSavedDevices = async () => {
  const dbClient = db.connect(DEVICES_DB);
  const list = await dbClient.getAll();
  return list.map((item) => item.doc);
};

export const updateDevice = async (deviceData) => {
  const dbClient = db.connect(DEVICES_DB);
  return dbClient.update(deviceData);
};

export const deleteDevice = (deviceID) => {
  const dbClient = db.connect(DEVICES_DB);
  return dbClient.remove(deviceID).catch((e) => {
    const err = new Error(`Couldn't remove record: ${e.message}`);
    err.name = 'Database Error';
    throw err;
  });
};

export const connectDevice2 = (
  type,
  name,
  url,
  deviceTopic,
  onSuccess,
  onError,
) => {
  const dbName = `${type}_${name}`;
  const dbClient = db.connect(dbName);
  const mqttClient = subscribe(
    url,
    deviceTopic,
    (payload) => {
      dbClient.put({ _id: Date.now().toString(), ...payload });
      isFunction(onSuccess) && onSuccess(payload);
    },
    onError,
  );

  // Functions to return
  const disconnect = () => mqttClient.disconnect(() => dbClient.close());
  const getAllData = () => dbClient.getAll();
  const getLastData = () => dbClient.getAll({ descending: true, limit: 1 });

  return {
    disconnect,
    getAllData,
    getLastData,
  };
};

// add device to devices DB
export const addDevice = async (props) => {
  const dbClient = db.connect(DEVICES_DB);
  const {
    kind,
    name,
    url,
    protocol = DEFAULT_PROTOCOL,
    port = DEFAULT_PORT,
    topic,
    username,
    password,
  } = props;

  // make sure all props are defined
  for (let key in props)
    if (!props[key]) throw new Error(`Field missing [${key}]`);

  const id = `${kind}_${name}`;

  return dbClient
    .get(id)
    .then((r) => {
      // the device already exists in DB
      const err = new Error('Another device exists with the same name');
      err.payload = { exist: true, payload: r };
      throw err;
    })
    .catch((e) => {
      // if the device exists in DB
      if (e.payload && e.payload.exist) throw e;
      // the device does not exist in DB
      return dbClient
        .put({
          _id: id,
          name,
          url,
          protocol,
          port,
          topic,
          kind,
          username,
          password,
        })
        .then((r) => {
          // inserted successfully
          return { exist: false, inserted: true, payload: r };
        })
        .catch((e) => {
          // DB error
          const err = new Error(e.toString());
          err.payload = {
            exist: false,
            inserted: false,
            payload: e.toString(),
          };
          throw err;
        });
    });
};
