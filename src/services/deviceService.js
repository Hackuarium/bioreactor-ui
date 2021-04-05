import { parseToJson } from '../services/mqttService';
import db from './db';

export const deviceType = {
  broadcast: 'broadcast',
  interactive: 'interactive',
  local: 'local',
};

const tempData =
  '0004E030605C24DD00220012001D6F88453500000000000D000800040000005700010010006080000000000004D2DA';
const tempId = '1234';

export const saveDeviceData = (type, deviceData = tempData) => {
  const json = parseToJson(deviceData);
  const _id = `${type}:${json.deviceId}_${Date.now()}`;
  const doc = { _id, ...json };
  return db.put(doc);
};

export const getDeviceData = (type, deviceId = tempId) => {
  return db.getAll({
    startkey: `${type}:${deviceId}_`,
  });
};

export const removeDeviceData = (type, deviceId = tempId) => {
  return db
    .getAll({
      startkey: `${type}:${deviceId}_`,
    })
    .then((res) =>
      res.rows.map((row) =>
        db
          .remove(row.id)
          .then((res) => console.log(`remove: ${JSON.stringify(res)}`)),
      ),
    );
};
