import legoinoDeviceInformation from 'legoino-device-information';
import DB from './db';
import { DEVICES_DB } from './devicesOptions';

// Private Functions

const throwDbError = (error, additionalMsg) => {
  console.log(error);
  const err = new Error(`${additionalMsg} \n${error?.message}`);
  err.name = 'DATABASE_ERROR';
  throw err;
};

export const concatDeviceId = (type, kind, id) => `${type}_${kind}_${id}`;

/**
 * Get device Kind from its ID
 */
export const getDeviceKind = (deviceId) => {
  try {
    if (deviceId) {
      const selectedDeviceKind = legoinoDeviceInformation.fromDeviceID(
        Number(deviceId),
      );
      return selectedDeviceKind;
    }
  } catch (e) {
    console.log(e);
    return undefined;
  }
};

export const mapParameters = (kind, params) =>
  kind && params
    ? legoinoDeviceInformation[kind]?.parameters?.map((p) => ({
        ...p,
        value: params[p.label],
      }))
    : undefined;

//
// Devices DB operations
//

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

export const addDevice = (device) =>
  DB(DEVICES_DB)
    .put(device)
    .catch((e) =>
      e.name === 'conflict'
        ? throwDbError(e, `Device name must be unique`)
        : throwDbError(e, `Insert device error`),
    );

//
// Device Data operations
//

export const saveDataRow = (deviceId, data) => {
  const dbClient = DB(deviceId);
  return dbClient.put({ _id: Date.now().toString(), ...data });
};

export const getSavedData = (deviceId) => {
  const dbClient = DB(deviceId);
  return dbClient
    .getAll({
      descending: true,
    })
    .then((res) => res.rows.map((d) => d.doc));
};

export const getSavedDataByPage = (deviceId, page, itemsByPage) => {
  const dbClient = DB(deviceId);
  return dbClient
    .getAll({
      descending: true,
      skip: (page - 1) * itemsByPage,
      limit: itemsByPage,
    })
    .then((res) => res.rows.map((d) => d.doc));
};

export const getSavedDataCount = (deviceId) => {
  const dbClient = DB(deviceId);
  return dbClient
    .getAll({
      include_docs: false,
    })
    .then((res) => res.total_rows);
};

export const getLastSavedData = (deviceId) => {
  const dbClient = DB(deviceId);
  return dbClient
    .getAll({
      descending: true,
      limit: 1,
    })
    .then((res) => res.rows.map((d) => d.doc));
};

export const clearSavedData = (deviceId) => {
  const dbClient = DB(deviceId);
  return dbClient.destroy();
};

// export const  = (deviceId) => {
//   const dbClient = DB(deviceId);
//   return dbClient.destroy();
// };

export const listenToDataChanges = (
  deviceId,
  successCallback,
  errorCallBack,
) => {
  const dbClient = DB(deviceId);
  return dbClient.listenToChanges(successCallback, errorCallBack);
};
