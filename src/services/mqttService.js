import mqtt from 'mqtt';
import { isFunction } from 'lodash';
import { parseCurrentSettings } from 'legoino-util';

// Private Functions
let client;

const getClientInstance = (
  url,
  protocol,
  port,
  username,
  password,
  onSuccess,
  onError,
) => {
  // if client is already connected
  if (client && client.connected && client.options.hostname === url)
    isFunction(onSuccess) && onSuccess(client);

  const brokerUrl = `${protocol}://${url}:${port}`;
  client = mqtt.connect(brokerUrl, {
    keepalive: 60,
  });

  client.stream.on('error', (err) => {
    const error = new Error(`couldn't connect to BROKER "${brokerUrl}"`);
    error.name = 'MQTT ERROR';
    client.end();
    isFunction(onError) && onError(error);
  });

  client.on('connect', () => {
    console.log(`connected to ${brokerUrl} : ${client.connected}`);
    isFunction(onSuccess) && onSuccess(client);
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
