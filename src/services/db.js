import PouchDB from 'pouchdb';

// Wrap Db interface in case of switching to another Db other than "PouchDb"

const DB = (dbName) => {
  const connect = () =>
    new PouchDB(dbName, { revs_limit: 1, auto_compaction: true });

  // DB operations to return

  const getInfo = () =>
    new Promise((resolve, reject) => {
      const db = connect();
      db.info()
        .then((res) => db.close(() => resolve(res)))
        .catch((err) => db.close(() => reject(err)));
    });

  const getAll = async (options) =>
    new Promise((resolve, reject) => {
      const db = connect();
      db.allDocs({
        include_docs: true,
        ...options,
      })
        .then((res) => db.close(() => resolve(res)))
        .catch((err) => db.close(() => reject(err)));
    });

  const get = (docId) =>
    new Promise((resolve, reject) => {
      const db = connect();
      docId
        ? db
            .get(docId)
            .then((res) => db.close(() => resolve(res)))
            .catch((err) => db.close(() => reject(err)))
        : reject(new Error('Doc fetch : docId is required'));
    });

  const put = (doc) =>
    new Promise((resolve, reject) => {
      const db = connect();
      !('_id' in doc)
        ? reject(new Error('Doc create : _id is required in doc'))
        : db
            .put(doc)
            .then((res) => db.close(() => resolve(res)))
            .catch((err) => db.close(() => reject(err)));
    });

  const update = (doc) =>
    new Promise((resolve, reject) => {
      const db = connect();
      !('_id' in doc)
        ? reject(new Error('Doc update : _id is required in doc'))
        : db
            .get(doc._id)
            .then((resGet) =>
              db
                .put({ ...doc, _rev: resGet._rev })
                .then((resPut) => db.close(() => resolve(resPut)))
                .catch((errPut) => reject(errPut)),
            )
            .catch((err) => db.close(() => reject(err)));
    });

  const remove = (docId) =>
    new Promise((resolve, reject) => {
      const db = connect();
      docId
        ? db
            .get(docId)
            .then((resGet) =>
              db
                .remove({ _id: docId, _rev: resGet._rev })
                .then((resRm) => db.close(() => resolve(resRm)))
                .catch((errRm) => reject(errRm)),
            )
            .catch((err) => db.close(() => reject(err)))
        : reject(new Error('Doc remove : docId is required'));
    });

  const destroy = () => {
    const db = connect();
    return db.destroy();
  };

  return {
    getInfo,
    getAll,
    get,
    put,
    update,
    remove,
    destroy,
  };
};

export default DB;
