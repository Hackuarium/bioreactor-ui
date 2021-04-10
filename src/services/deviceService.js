import db from './db';
import { subscribe } from './mqttService';
import { isFunction } from 'lodash';

export const DEVICE_TYPE = {
  broadcast: 'broadcast',
  interactive: 'interactive',
  local: 'local',
};

// Public Functions

export const connectDevice = (
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
