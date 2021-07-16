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

export const subscribe = (client, topic, onMessageReceived, onError) => {
  client.subscribe(topic, { qos: 2 }, (err) => {
    err
      ? isFunction(onError) && onError(err)
      : client.on('message', (topic, payload) => {
          isFunction(onMessageReceived) &&
            onMessageReceived(parseToJson(payload));
        });
  });

  const unsubscribe = (onError) => client.unsubscribe(topic, {}, onError);

  return unsubscribe;
};

export const disconnect = (client, callback) =>
  client.end(() => {
    console.log(`mqtt broker "${client.options.hostname}" disconnected`);
    isFunction(callback) && callback();
  });
