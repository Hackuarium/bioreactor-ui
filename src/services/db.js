// Wrap Db interface in case of switching to another Db other than "PouchDb"
import PouchDB from 'pouchdb';

const db = new PouchDB('bioreactor-db');

const getInfo = () => {
  db.info().then(function (info) {
    console.log(info);
  });
};

const put = (doc) => {
  if (!('_id' in doc)) doc._id = Date.now().toString(16);
  return db.put(doc);
};

const get = (docId) => db.get(docId);

const getAll = () =>
  db.allDocs({
    include_docs: true,
  });

const update = (doc) => {
  if (!('_id' in doc)) return Promise.reject(new Error('doc must include _id'));
  return db.get(doc._id).then((res) => db.put({ ...doc, _rev: res._rev }));
};

const remove = (doc) => {
  if (!('_id' in doc)) return Promise.reject(new Error('doc must include _id'));
  return db.get(doc._id).then((res) => db.remove({ ...doc, _rev: res._rev }));
};

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  getInfo,
  put,
  get,
  getAll,
  update,
  remove,
};
