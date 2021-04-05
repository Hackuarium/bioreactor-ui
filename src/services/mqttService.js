import mqtt from 'mqtt';
import { isFunction } from 'lodash';
import { parseCurrentSettings } from 'legoino-util';

const BROKER_URL = 'tcp://mqtt.beemos.org';
const BROKER_PORT = 9001;
let client;

const getClientInstance = () => {
  if (client && client.connected) return client;
  client = mqtt.connect(BROKER_URL, {
    port: BROKER_PORT,
    keepalive: 60,
  });
  client.stream.on('error', (err) => {
    console.log(`Error: couldn't connect to BROKER`);
    console.log(err);
    client.end();
  });
  client.on('connect', () => {
    console.log('connected: ' + client.connected);
  });
  return client;
};

const parseToJson = (data) => {
  return parseCurrentSettings(data.toString(), {});
};

export const subscribe = (topic, onSuccess, onError) => {
  const client = getClientInstance();
  client.subscribe(topic, { qos: 2 }, (err) => {
    err
      ? isFunction(onError) && onError(err)
      : client.on('message', (topic, payload) => {
          isFunction(onSuccess) && onSuccess(parseToJson(payload));
        });
  });
};

export const disconnect = () => {
  const client = getClientInstance();
  return client?.end();
};

const modules = {
  subscribe,
  disconnect,
};

export default modules;
