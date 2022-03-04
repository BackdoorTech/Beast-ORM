import { IndexedDBConnection } from "./connector.js";
// inspire by https://github.com/hc-oss/use-indexeddb
class _indexedDB {
    constructor() {
        this.getActions = (currentStore, config) => {
            return {
                getByID: (id) => {
                    return new Promise((resolve, reject) => {
                        this.getConnection(config)
                            .then(db => {
                            this.validateBeforeTransaction(db, currentStore, reject);
                            let tx = this.createTransaction(db, "readonly", currentStore, resolve, reject);
                            let objectStore = tx.objectStore(currentStore);
                            let request = objectStore.get(id);
                            request.onsuccess = (e) => {
                                resolve(e.target.result);
                            };
                        })
                            .catch(reject);
                    });
                },
                getOneByIndex: (keyPath, value) => {
                    return new Promise((resolve, reject) => {
                        this.getConnection(config)
                            .then(db => {
                            this.validateBeforeTransaction(db, currentStore, reject);
                            let tx = this.createTransaction(db, "readonly", currentStore, resolve, reject);
                            let objectStore = tx.objectStore(currentStore);
                            let index = objectStore.index(keyPath);
                            let request = index.get(value);
                            request.onsuccess = (e) => {
                                resolve(e.target.result);
                            };
                        })
                            .catch(reject);
                    });
                },
                getManyByIndex: (keyPath, value) => {
                    return new Promise((resolve, reject) => {
                        this.getConnection(config)
                            .then(db => {
                            this.validateBeforeTransaction(db, currentStore, reject);
                            let tx = this.createTransaction(db, "readonly", currentStore, resolve, reject);
                            let objectStore = tx.objectStore(currentStore);
                            let index = objectStore.index(keyPath);
                            let request = index.getAll(value);
                            request.onsuccess = (e) => {
                                resolve(e.target.result);
                            };
                        })
                            .catch(reject);
                    });
                },
                getAll: () => {
                    return new Promise((resolve, reject) => {
                        this.getConnection(config).then(db => {
                            this.validateBeforeTransaction(db, currentStore, reject);
                            let tx = this.createTransaction(db, "readonly", currentStore, resolve, reject);
                            let objectStore = tx.objectStore(currentStore);
                            let request = objectStore.getAll();
                            request.onsuccess = (e) => {
                                resolve(e.target.result);
                            };
                        })
                            .catch(reject);
                    });
                },
                add: (value, key) => {
                    return new Promise((resolve, reject) => {
                        this.getConnection(config).then(db => {
                            this.validateBeforeTransaction(db, currentStore, reject);
                            let tx = this.createTransaction(db, "readwrite", currentStore, resolve, reject);
                            let objectStore = tx.objectStore(currentStore);
                            let request = objectStore.add(value, key);
                            request.onsuccess = (e) => {
                                var _a, _b;
                                (_b = (_a = tx) === null || _a === void 0 ? void 0 : _a.commit) === null || _b === void 0 ? void 0 : _b.call(_a);
                                resolve(e.target.result);
                            };
                        })
                            .catch(reject);
                    });
                },
                update: (value, key) => {
                    return new Promise((resolve, reject) => {
                        this.getConnection(config).then(db => {
                            this.validateBeforeTransaction(db, currentStore, reject);
                            let tx = this.createTransaction(db, "readwrite", currentStore, resolve, reject);
                            let objectStore = tx.objectStore(currentStore);
                            let request = objectStore.put(value, key);
                            request.onsuccess = (e) => {
                                var _a, _b;
                                (_b = (_a = tx) === null || _a === void 0 ? void 0 : _a.commit) === null || _b === void 0 ? void 0 : _b.call(_a);
                                resolve(e.target.result);
                            };
                        })
                            .catch(reject);
                    });
                },
                deleteByID: (id) => {
                    return new Promise((resolve, reject) => {
                        this.getConnection(config).then(db => {
                            this.validateBeforeTransaction(db, currentStore, reject);
                            let tx = this.createTransaction(db, "readwrite", currentStore, resolve, reject);
                            let objectStore = tx.objectStore(currentStore);
                            let request = objectStore.delete(id);
                            request.onsuccess = (e) => {
                                var _a, _b;
                                (_b = (_a = tx) === null || _a === void 0 ? void 0 : _a.commit) === null || _b === void 0 ? void 0 : _b.call(_a);
                                resolve(e);
                            };
                        })
                            .catch(reject);
                    });
                },
                deleteAll: () => {
                    return new Promise((resolve, reject) => {
                        this.getConnection(config)
                            .then(db => {
                            this.validateBeforeTransaction(db, currentStore, reject);
                            let tx = this.createTransaction(db, "readwrite", currentStore, resolve, reject);
                            let objectStore = tx.objectStore(currentStore);
                            objectStore.clear();
                            tx.oncomplete = (e) => {
                                var _a, _b;
                                (_b = (_a = tx) === null || _a === void 0 ? void 0 : _a.commit) === null || _b === void 0 ? void 0 : _b.call(_a);
                                resolve(e);
                            };
                        })
                            .catch(reject);
                    });
                },
                openCursor: (cursorCallback, keyRange) => {
                    return new Promise((resolve, reject) => {
                        this.getConnection(config)
                            .then(db => {
                            this.validateBeforeTransaction(db, currentStore, reject);
                            let tx = this.createTransaction(db, "readonly", currentStore, resolve, reject);
                            let objectStore = tx.objectStore(currentStore);
                            let request = objectStore.openCursor(keyRange);
                            request.onsuccess = e => {
                                cursorCallback(e);
                                resolve();
                            };
                        })
                            .catch(reject);
                    });
                },
            };
        };
        this.requestHandler = (currentStore, config) => {
            return {
                select: () => {
                },
                update: () => { },
                delete: () => { },
                insert: async (...rows) => {
                    const createdObjKeys = [];
                    for (let insert of rows) {
                        const id = await this.getActions(currentStore, config).add(insert);
                        createdObjKeys.push(id);
                    }
                    // return first element
                    if (rows.length == 1) {
                        return await this.getActions(currentStore, config).getByID(createdObjKeys[0]);
                    }
                    else {
                    }
                }
            };
        };
    }
    validateStore(db, storeName) {
        return db.objectStoreNames.contains(storeName);
    }
    validateBeforeTransaction(db, storeName, reject) {
        if (!db) {
            reject("Queried before opening connection");
        }
        if (!this.validateStore(db, storeName)) {
            reject(`Store ${storeName} not found`);
        }
    }
    createTransaction(db, dbMode, currentStore, resolve, reject, abort) {
        let tx = db.transaction(currentStore, dbMode);
        tx.onerror = reject;
        tx.oncomplete = resolve;
        tx.onabort = abort;
        return tx;
    }
    migrate(config) {
        return new IndexedDBConnection().migrate(config);
    }
    getConnection(config) {
        return new IndexedDBConnection().connect(config);
    }
}
export const indexedDB = new _indexedDB();
