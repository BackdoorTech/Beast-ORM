import { IndexedDBConnection } from "./connector.js";
import { SqlObject } from "../../sql/sqlObject/sqlObject.js";
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
        this.requestHandler = (TableSchema, config) => {
            return {
                select: async (methods) => {
                    if (methods[0].methodName == 'all') {
                        return await this.getActions(TableSchema.name, config).getAll();
                    }
                    else if (methods[0].methodName == 'get') {
                        const args = methods[0].arguments;
                        if (Object.keys(args).length == 1) {
                            const key = Object.keys(args)[0];
                            const value = args[key];
                            if (TableSchema.id.keyPath == key) {
                                return await this.getActions(TableSchema.name, config).getByID(value);
                            }
                            else {
                                return await this.getActions(TableSchema.name, config).getOneByIndex(key, value);
                            }
                        }
                    }
                    else if (methods[methods.length - 1].methodName == 'execute') {
                        return new Promise(async (resolve, reject) => {
                            const sqlObject = new SqlObject(TableSchema, methods);
                            await this.getActions(TableSchema.name, config).openCursor(async (event) => {
                                var cursor = event.target.result;
                                if (cursor) {
                                    const row = cursor.value;
                                    await sqlObject.runFirstMethod(row);
                                    cursor.continue();
                                }
                                else {
                                    sqlObject.run();
                                    resolve(sqlObject.firstMethod.rows);
                                }
                            });
                        });
                    }
                    else if (methods[methods.length - 1].methodName == 'first') {
                        return new Promise(async (resolve, reject) => {
                            const sqlObject = new SqlObject(TableSchema, methods);
                            await this.getActions(TableSchema.name, config).openCursor(async (event) => {
                                var cursor = event.target.result;
                                if (cursor) {
                                    const row = cursor.value;
                                    await sqlObject.runFirstMethod(row, resolve, 1);
                                    cursor.continue();
                                }
                                else {
                                    sqlObject.run();
                                    resolve(sqlObject.firstMethod.rows);
                                }
                            });
                        });
                    }
                },
                update: async (methods) => {
                    if (methods[0].methodName == 'save') {
                        const args = methods[0].arguments;
                        const idFieldName = TableSchema.id.keyPath;
                        const idValue = args[idFieldName];
                        if (idValue) {
                            await this.getActions(TableSchema.name, config).update(args);
                        }
                        else {
                            await this.getActions(TableSchema.name, config).update(args, idValue);
                        }
                    }
                    else if (methods[0].methodName != 'update' && methods[methods.length - 1].methodName == 'update') {
                        const argsToUpdate = methods[methods.length - 1].arguments;
                        const customMethods = Object.create(methods);
                        customMethods[methods.length - 1].methodName = 'execute';
                        const rows = await this.requestHandler(TableSchema, config).select(customMethods);
                        for (let row of rows) {
                            const updateRow = Object.assign(row, argsToUpdate);
                            await this.getActions(TableSchema.name, config).update(updateRow);
                        }
                    }
                    else if (methods[0].methodName == 'update') {
                        const argsToUpdate = methods[0].arguments;
                        await this.getActions(TableSchema.name, config).update(argsToUpdate);
                    }
                },
                delete: async (methods) => {
                    if (methods[methods.length - 1].methodName == 'delete' &&
                        methods[methods.length - 1].arguments == null) {
                        const customMethods = Object.create(methods);
                        customMethods[methods.length - 1].methodName = 'execute';
                        const rows = await this.requestHandler(TableSchema, config).select(customMethods);
                        for (let row of rows) {
                            const id = row[TableSchema.id.keyPath];
                            await this.getActions(TableSchema.name, config).deleteByID(id);
                        }
                    }
                    else if (methods[methods.length - 1].methodName == 'delete' &&
                        typeof methods[methods.length - 1].arguments == 'object') {
                        const IdInObject = methods[methods.length - 1].arguments;
                        const idValue = IdInObject[TableSchema.id.keyPath];
                        await this.getActions(TableSchema.name, config).deleteByID(idValue);
                    }
                },
                insert: async (methods) => {
                    const createdObjKeys = [];
                    const rows = methods[0].arguments;
                    for (let insert of rows) {
                        const id = await this.getActions(TableSchema.name, config).add(insert);
                        createdObjKeys.push(id);
                    }
                    // return first element
                    if (rows.length == 1) {
                        return await this.getActions(TableSchema.name, config).getByID(createdObjKeys[0]);
                    }
                    else {
                        return createdObjKeys;
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
