import DB from './db';
import { connect, subscribe, disconnect } from './mqttService';
import { DEFAULT_PORT, DEFAULT_PROTOCOL } from './devicesOptions';

// Public Functions

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
      const dbClient = DB(deviceId);

      const _subscribe = (onSubscribe, onError) => {
        const unsubscribe = subscribe(
          mqttClient,
          topic,
          (payload) => {
            dbClient.put({ _id: Date.now().toString(), ...payload });
            onSubscribe(payload);
          },
          onError,
        );
        return unsubscribe;
      };

      const _disconnect = () => disconnect(mqttClient);

      const getAllData = () =>
        dbClient.getAll().then((res) => res.rows.map((i) => i.doc));

      const getLastData = () =>
        dbClient
          .getAll({ descending: true, limit: 1 })
          .then((res) => res.rows.map((i) => i.doc));

      const getPageData = (skip, limit) =>
        dbClient
          .getAll({ descending: true, skip: skip, limit: limit })
          .then((res) => res.rows.map((i) => i.doc));

      const getAllDataCount = () =>
        dbClient.getAll().then((res) => res.total_rows);

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

export const testDeviceConnection = ({
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
      const unsubscribe = subscribe(
        mqttClient,
        topic,
        (payload) => {
          unsubscribe();
          disconnect(mqttClient, () => resolve(payload));
        },
        reject,
      );
    } catch (e) {
      // connection error
      reject(e);
    }
  });

  return clientPromise;
};
