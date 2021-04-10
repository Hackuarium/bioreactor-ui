import PouchDB from 'pouchdb';
import { isFunction } from 'lodash';

// Wrap Db interface in case of switching to another Db other than "PouchDb"

function DB() {
  let _db = null;
  let _dbInfo = {};

  const connect = (dbName) => {
    if (!_db || (_dbInfo && _dbInfo.db_name !== dbName)) {
      _db = new PouchDB(dbName);
      _db.info().then((res) => (_dbInfo = res));
      console.log(`connected to DB "${dbName}"`);
    }

    // DB operations to return

    const getInfo = () => _dbInfo;

    const put = (doc) => {
      if (!('_id' in doc))
        return Promise.reject(new Error('doc must include _id'));
      return _db.put(doc);
    };

    const get = (docId) => _db.get(docId);

    const getAll = async (options) => {
      const docs = await _db.allDocs({
        include_docs: true,
        ...options,
      });
      console.log(`get ${docs.total_rows} rows`);
      return docs.rows;
    };

    const update = (doc) => {
      if (!('_id' in doc))
        return Promise.reject(new Error('doc must include _id'));
      return _db
        .get(doc._id)
        .then((res) => _db.put({ ...doc, _rev: res._rev }));
    };

    const remove = (docId) => {
      return _db
        .get(docId)
        .then((res) => _db.remove({ _id: docId, _rev: res._rev }));
    };

    const removeAll = () =>
      _db.destroy().then((res) => {
        _db = null;
        console.log(`DB "${dbName}" destroyed : ` + JSON.stringify(res));
      });

    const close = (callback) =>
      _db.close(() => {
        _db = null;
        console.log(`DB "${dbName}" closed`);
        isFunction(callback) && callback();
      });

    return {
      getInfo,
      put,
      get,
      getAll,
      update,
      remove,
      removeAll,
      close,
    };
  };
  return { connect };
}

export default DB();
