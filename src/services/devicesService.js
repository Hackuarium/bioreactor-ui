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

// Public Functions

/**
 * return device _id
 */
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

/**
 * map parameters based on kind
 */
export const mapParameters = (kind, params) =>
  kind && params
    ? legoinoDeviceInformation[kind]?.parameters?.map((p) => ({
        ...p,
        value: params[p.label],
      }))
    : undefined;

//=====================================
/**
 * Devices DB operations
 */

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

//=====================================
/**
 * Device Data operations
 */

// Ps: don't forget to close Db connection in cleanup function

export const saveDataRow = (deviceId, data) =>
  DB(deviceId).put({ _id: Date.now().toString(), ...data });

export const getSavedData = (deviceId) =>
  DB(deviceId)
    .getAll({
      descending: true,
    })
    .then((res) => res.rows.map((d) => d.doc));

export const getSavedDataByPage = (deviceId, page, itemsByPage) =>
  DB(deviceId)
    .getAll({
      descending: true,
      skip: (page - 1) * itemsByPage,
      limit: itemsByPage,
    })
    .then((res) => res.rows.map((d) => d.doc));

export const getSavedDataCount = (deviceId) =>
  DB(deviceId)
    .getAll({
      include_docs: false,
    })
    .then((res) => res.total_rows);

export const getLastSavedData = (deviceId) =>
  DB(deviceId)
    .getAll({
      descending: true,
      limit: 1,
    })
    .then((res) => res.rows.map((d) => d.doc));

export const clearSavedData = (deviceId) => DB(deviceId).destroy();

export const listenToDataChanges = (deviceId, successCallback, errorCallBack) =>
  DB(deviceId).listenToChanges(successCallback, errorCallBack);

export const closeDbConnection = (dbName) => DB(dbName).close();
