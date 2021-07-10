import db from './db';
import { isFunction } from 'lodash';
import { connect, subscribe, disconnect } from './mqttService';
import { DEVICES_DB, DEFAULT_PORT, DEFAULT_PROTOCOL } from './devicesOptions';

// Public Functions

export const getSavedDevices = async () => {
  const dbClient = db.connect(DEVICES_DB);
  const list = await dbClient.getAll();
  return list.map((item) => item.doc);
};

export const getDevice = async (deviceId) => {
  const dbClient = db.connect(DEVICES_DB);
  const device = await dbClient.get(deviceId);
  return device;
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

// add device to devices DB
export const addDevice = (props) => {
  const dbClient = db.connect(DEVICES_DB);
  const { kind, name, url, protocol, port, topic, username, password } = props;

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

//
// connect to broadcast device & return a client instance with {subscribe, disconnect, getAllData, getLastData}
export const connectDevice = ({
  _id,
  name,
  kind,
  deviceId = _id || `${kind}_${name}`,
  url,
  protocol = DEFAULT_PROTOCOL,
  port = DEFAULT_PORT,
  topic,
  username,
  password,
}) => {
  const clientPromise = new Promise(async (resolve, reject) => {
    try {
      const mqttClient = await connect(url, protocol, port, username, password);
      const dbClient = db.connect(deviceId);
      const _subscribe = (onSubscribe, onError) => {
        const unsubscribe = subscribe(
          mqttClient,
          topic,
          (payload) => {
            dbClient.put({ _id: Date.now().toString(), ...payload });
            isFunction(onSubscribe) && onSubscribe(payload);
          },
          onError,
        );
        return unsubscribe;
      };

      const _disconnect = () => disconnect(mqttClient, () => dbClient.close());
      const getAllData = () => dbClient.getAll();
      const getLastData = () => dbClient.getAll({ descending: true, limit: 1 });
      const getPageData = (skip, limit) =>
        dbClient.getAll({ descending: true, skip: skip, limit: limit });
      const getAllDataCount = () => dbClient.getAllCount();
      resolve({
        subscribe: _subscribe,
        disconnect: _disconnect,
        getAllData,
        getLastData,
        getPageData,
        getAllDataCount,
      });
    } catch (e) {
      // connection error
      reject(e);
    }
  });

  return clientPromise;
};
