import DB from './db';
import { DEVICES_DB, DEFAULT_PORT, DEFAULT_PROTOCOL } from './devicesOptions';

// Private Functions

const throwDbError = (error, additionalMsg) => {
  console.log(error);
  const err = new Error(`${additionalMsg} \n${error?.message}`);
  err.name = 'DATABASE_ERROR';
  throw err;
};

export const concatDeviceId = (type, kind, id) => `${type}_${kind}_${id}`;

export const getDevices = async (type) =>
  DB(DEVICES_DB)
    .getAll({ startkey: `${type}`, endkey: `${type}\uffff` })
    .then((res) => res.rows.map((i) => i.doc))
    .catch((e) => throwDbError(e, `Get locally saved devices error`));

export const getDevicesByKind = async (type, kind) =>
  DB(DEVICES_DB)
    .getAll({ startkey: `${type}_${kind}`, endkey: `${type}_${kind}\uffff` })
    .then((res) => res.rows)
    .catch((e) => throwDbError(e, `Get locally saved devices error`));

export const getDevice = async (deviceId) =>
  DB(DEVICES_DB)
    .get(deviceId)
    .catch((e) => throwDbError(e, `Get device error`));

export const updateDevice = async (deviceData) =>
  DB(DEVICES_DB)
    .update(deviceData)
    .catch((e) => throwDbError(e, `Update device error`));

export const deleteDevice = (deviceID) =>
  DB(DEVICES_DB)
    .remove(deviceID)
    .catch((e) => throwDbError(e, `Delete device error`));

// add device to devices DB

export const addDevice = (
  type,
  {
    kind,
    name,
    url,
    protocol = DEFAULT_PROTOCOL,
    port = DEFAULT_PORT,
    topic,
    username,
    password,
  },
) =>
  DB(DEVICES_DB)
    .put({
      _id: `${type}_${kind}_${name}`,
      name,
      url,
      protocol,
      port,
      topic,
      kind,
      username,
      password,
    })
    .catch((e) =>
      e.name === 'conflict'
        ? throwDbError(e, `Device name must be unique`)
        : throwDbError(e, `Insert device error`),
    );

export const addDevice2 = (device) =>
  DB(DEVICES_DB)
    .put(device)
    .catch((e) =>
      e.name === 'conflict'
        ? throwDbError(e, `Device name must be unique`)
        : throwDbError(e, `Insert device error`),
    );
