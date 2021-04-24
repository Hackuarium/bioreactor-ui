import mqtt from 'mqtt';
import { isFunction } from 'lodash';
import { parseCurrentSettings } from 'legoino-util';
import { DEFAULT_PORT, DEFAULT_PROTOCOL } from './devicesOptions';

// Private Functions
let client;

const getClientInstance = (
  url,
  protocol = DEFAULT_PROTOCOL,
  port = DEFAULT_PORT,
  username,
  password,
  onSuccess,
  onError,
) => {
  // if client is already connected
  console.log(protocol);
  console.log(port);
  if (client && client.connected && client.options.hostname === url)
    isFunction(onSuccess) && onSuccess(client);

  const brokerUrl = `${protocol}://${url}:${port}`;
  client = mqtt.connect(brokerUrl, {
    keepalive: 300,
    reconnectPeriod: 5000,
  });

  client.on('connect', () => {
    console.log(`connected to ${brokerUrl} : ${client.connected}`);
    isFunction(onSuccess) && onSuccess(client);
  });

  client.stream.on('error', (err) => {
    console.log(err);
    const error = new Error(`Couldn't connect to BROKER "${brokerUrl}"`);
    error.name = 'Mqtt Error';
    client.end();
    isFunction(onError) && onError(error);
  });
};

const parseToJson = (data) => {
  return parseCurrentSettings(data.toString(), {});
};

// Public Functions

export const connect = (url, protocol, port, username, password) => {
  const clientPromise = new Promise((resolve, reject) => {
    getClientInstance(
      url,
      protocol,
      port,
      username,
      password,
      (client) => resolve(client),
      (error) => reject(error),
    );
  });
  return clientPromise;
};

// TO DO: update function
export const subscribe = (url, topic, onSuccess, onError) => {
  const client = getClientInstance(url);
  client.subscribe(topic, { qos: 2 }, (err) => {
    err
      ? isFunction(onError) && onError(err)
      : client.on('message', (topic, payload) => {
          isFunction(onSuccess) && onSuccess(parseToJson(payload));
        });
  });

  // Functions to return

  const unsubscribe = (onError) => client.unsubscribe(topic, {}, onError);

  const disconnect = (callback) =>
    client.end(() => {
      console.log(`mqtt broker "${client.options.hostname}" disconnected`);
      isFunction(callback) && callback();
    });

  return { unsubscribe, disconnect };
};
