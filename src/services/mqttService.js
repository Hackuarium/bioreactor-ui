import mqtt from 'mqtt';
import { isFunction } from 'lodash';
import { parseCurrentSettings } from 'legoino-util';

// Private Functions

const BROKER_PROTOCOL = 'tcp';
const BROKER_PORT = 9001;
let client;

const getClientInstance = (url) => {
  if (client && client.connected && client.options.hostname === url)
    return client;

  const brokerUrl = `${BROKER_PROTOCOL}://${url}:${BROKER_PORT}`;
  client = mqtt.connect(brokerUrl, {
    port: BROKER_PORT,
    keepalive: 60,
  });

  client.stream.on('error', (err) => {
    console.log(`Error: couldn't connect to BROKER ` + brokerUrl);
    console.log(err);
    client.end();
  });

  client.on('connect', () => {
    console.log(`connected to ${brokerUrl} : ${client.connected}`);
  });

  return client;
};

const parseToJson = (data) => {
  return parseCurrentSettings(data.toString(), {});
};

// Public Functions

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
