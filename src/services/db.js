import PouchDB from 'pouchdb';

// Wrap Db interface in case of switching to another Db other than "PouchDb"
let connectedDBs = {};

const DB = (dbName) => {
  const connect = () => {
    if (!(dbName in connectedDBs)) {
      connectedDBs[dbName] = new PouchDB(dbName, {
        revs_limit: 1,
        auto_compaction: true,
      });
    }
    return connectedDBs[dbName];
  };

  // DB operations to return

  const getInfo = () =>
    new Promise((resolve, reject) => {
      const db = connect();
      db.info()
        .then((res) => resolve(res))
        .catch((err) => reject(err));
    });

  const getAll = async (options) =>
    new Promise((resolve, reject) => {
      const db = connect();
      db.allDocs({
        include_docs: true,
        ...options,
      })
        .then((res) => resolve(res))
        .catch((err) => reject(err));
    });

  const get = (docId) =>
    new Promise((resolve, reject) => {
      const db = connect();
      docId
        ? db
            .get(docId)
            .then((res) => resolve(res))
            .catch((err) => reject(err))
        : reject(new Error('Doc fetch : docId is required'));
    });

  const put = (doc) =>
    new Promise((resolve, reject) => {
      const db = connect();
      !('_id' in doc)
        ? reject(new Error('Doc create : _id is required in doc'))
        : db
            .put(doc)
            .then((res) => resolve(res))
            .catch((err) => reject(err));
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
                .then((resPut) => resolve(resPut))
                .catch((errPut) => reject(errPut)),
            )
            .catch((err) => reject(err));
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
                .then((resRm) => resolve(resRm))
                .catch((errRm) => reject(errRm)),
            )
            .catch((err) => reject(err))
        : reject(new Error('Doc remove : docId is required'));
    });

  // const removeAll = () => {
  //   const db = connect();
  //   return db
  //     .allDocs()
  //     .then((result) =>
  //       Promise.all(result.rows.map((row) => db.remove(row.id, row.value.rev))),
  //     );
  // };

  const listenToChanges = (successCallback, errorCallBack, options) => {
    const db = connect();
    let unsubscribe = db
      .changes({
        since: 'now',
        live: true,
        include_docs: true,
        ...options,
      })
      .on('change', successCallback)
      // .on('complete', successCallback)
      .on('error', errorCallBack);
    return unsubscribe;
  };

  const close = () => {
    const db = connect();
    delete connectedDBs[dbName];
    return db.close();
  };
  const destroy = () => {
    const db = connect();
    delete connectedDBs[dbName];
    return db.destroy();
  };

  return {
    getInfo,
    getAll,
    get,
    put,
    update,
    remove,
    listenToChanges,
    close,
    destroy,
  };
};

export default DB;
