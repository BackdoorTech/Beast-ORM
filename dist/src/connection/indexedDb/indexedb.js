import { IndexedDB } from "./connector.js";
import { SqlObject } from "../../sql/sqlObject/sqlObject.js";
// inspire by https://github.com/hc-oss/use-indexeddb
class indexedDBInterface {
    constructor() {
        this.getActions = (currentStore, config, queryId) => {
            return {
                getByID: (id) => {
                    return new Promise((resolve, reject) => {
                        IndexedDB.getOrCreateTransaction({ currentStore, queryId, config }, 'readonly', (transaction) => {
                            let objectStore = transaction.objectStore(currentStore);
                            let request = objectStore.get({ id, config });
                            request.onsuccess = async (e) => {
                                resolve(e.target.result);
                            };
                        });
                    });
                },
                getOneByIndex: (keyPath, value) => {
                    return new Promise((resolve, reject) => {
                        IndexedDB.getOrCreateTransaction({ currentStore, queryId, config }, 'readonly', (transaction) => {
                            let objectStore = transaction.objectStore(currentStore);
                            let request = objectStore.index({ keyPath, value, config });
                            request.onsuccess = async (e) => {
                                resolve(e.target.result);
                            };
                        });
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
                        IndexedDB.getOrCreateTransaction({ currentStore, queryId, config }, 'readonly', (transaction) => {
                            let objectStore = transaction.objectStore(currentStore);
                            let request = objectStore.getAll(config);
                            request.onsuccess = async (e) => {
                                resolve(e.target.result);
                            };
                        });
                    });
                },
                add: ({ value, key, add, index }) => {
                    return new Promise((resolve, reject) => {
                        IndexedDB.getOrCreateTransaction({ currentStore, queryId, config }, 'readwrite', (transaction) => {
                            let objectStore = transaction.objectStore(currentStore);
                            let request = objectStore.add({ value });
                            request.onsuccess = async (e) => {
                                const id = e.target.result;
                                add(id, index);
                                resolve(true);
                            };
                            request.onerror = (e) => {
                                let data = {
                                    error: e.target['error']
                                };
                                resolve(true);
                            };
                        });
                    });
                },
                update: ({ value, key = undefined }) => {
                    return new Promise((resolve, reject) => {
                        IndexedDB.getOrCreateTransaction({ currentStore, queryId, config }, 'readwrite', (transaction) => {
                            let objectStore = transaction.objectStore(currentStore);
                            let request = objectStore.put({ value, key, config });
                            request.onsuccess = async (e) => {
                                resolve(e.target.result);
                            };
                            request.onerror = (e) => {
                                let data = {
                                    error: e.target['error']
                                };
                                resolve(data);
                            };
                        });
                    });
                },
                deleteByID: (id) => {
                    return new Promise((resolve, reject) => {
                        IndexedDB.getOrCreateTransaction({ currentStore, queryId, config }, 'readwrite', (transaction) => {
                            let objectStore = transaction.objectStore(currentStore);
                            let request = objectStore.delete({ id, config });
                            request.onsuccess = async (e) => {
                                resolve(e.target.result);
                            };
                            request.onerror = (e) => {
                                let data = {
                                    error: e.target['error']
                                };
                                resolve(data);
                            };
                        });
                    });
                },
                deleteAll: () => {
                    return new Promise((resolve, reject) => {
                        IndexedDB.getOrCreateTransaction({ currentStore, queryId, config }, 'readwrite', (transaction) => {
                            let objectStore = transaction.objectStore(currentStore);
                            let request = objectStore.clear({ config });
                            request.onsuccess = async (e) => {
                                resolve(e.target.result);
                            };
                        });
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
                                db.close();
                            };
                        })
                            .catch(reject);
                    });
                },
            };
        };
        this.requestHandler = (TableSchema, config, queryId) => {
            return {
                select: async (methods) => {
                    if (methods[0].methodName == 'all') {
                        postMessage({
                            run: 'callback',
                            queryId: queryId,
                            value: await this.getActions(TableSchema.name, config, queryId).getAll()
                        });
                    }
                    else if (methods[0].methodName == 'get') {
                        const args = methods[0].arguments;
                        if (Object.keys(args).length == 1) {
                            const key = Object.keys(args)[0];
                            const value = args[key];
                            if (TableSchema.id.keyPath == key) {
                                postMessage({
                                    run: 'callback',
                                    queryId: queryId,
                                    value: await this.getActions(TableSchema.name, config, queryId).getByID(value)
                                });
                            }
                            else {
                                postMessage({
                                    run: 'callback',
                                    queryId: queryId,
                                    value: await this.getActions(TableSchema.name, config, queryId).getOneByIndex(key, value)
                                });
                            }
                        }
                        else if (methods[0].arguments[TableSchema.id.keyPath]) {
                            postMessage({
                                run: 'callback',
                                queryId: queryId,
                                value: await this.getActions(TableSchema.name, config, queryId).getByID(args[TableSchema.id.keyPath])
                            });
                        }
                    }
                    else if (methods[methods.length - 1].methodName == 'execute') {
                        const sqlObject = new SqlObject(TableSchema, methods);
                        //await this.getActions(TableSchema.name, config, queryId).openCursor(async(event: any) => {
                        //var cursor = event.target.result;
                        //if(cursor) {
                        const rows = await this.getActions(TableSchema.name, config, queryId).getAll();
                        for (const row of rows) {
                            //const row = cursor.value
                            await sqlObject.runFirstMethod(row);
                            //cursor.continue();
                        }
                        //} else {
                        sqlObject.doneRunFirstMethod();
                        sqlObject.run();
                        postMessage({
                            run: 'callback',
                            queryId: queryId,
                            value: sqlObject.firstMethod.rows
                        });
                        //}
                        //})
                    }
                    else if (methods[methods.length - 1].methodName == 'first') {
                        return new Promise(async (resolve, reject) => {
                            const sqlObject = new SqlObject(TableSchema, methods);
                            await this.getActions(TableSchema.name, config, queryId).openCursor(async (event) => {
                                var cursor = event.target.result;
                                if (cursor) {
                                    const row = cursor.value;
                                    await sqlObject.runFirstMethod(row, resolve, 1);
                                    cursor.continue();
                                }
                                else {
                                    sqlObject.doneRunFirstMethod();
                                    sqlObject.run();
                                    postMessage({
                                        run: 'callback',
                                        queryId: queryId,
                                        value: sqlObject.firstMethod.rows
                                    });
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
                            await this.getActions(TableSchema.name, config, queryId).update({ value: args });
                        }
                        else {
                            await this.getActions(TableSchema.name, config, queryId).update({ value: args, key: idValue });
                        }
                        postMessage({
                            run: 'callback',
                            queryId,
                            value: true
                        });
                    }
                    else if (methods[0].methodName != 'update' && methods[methods.length - 1].methodName == 'update') {
                        const argsToUpdate = methods[methods.length - 1].arguments;
                        const customMethods = Object.create(methods);
                        customMethods[methods.length - 1].methodName = 'execute';
                        const result = await this.requestHandler(TableSchema, config, queryId).select(customMethods);
                        const rows = result.value;
                        for (let row of rows) {
                            const updateRow = Object.assign(row, argsToUpdate);
                            await this.getActions(TableSchema.name, config, queryId).update({ value: updateRow });
                        }
                        postMessage({
                            run: 'callback',
                            queryId,
                            value: true
                        });
                    }
                    else if (methods[0].methodName == 'update') {
                        const argsToUpdate = methods[0].arguments;
                        const idFieldName = TableSchema.id.keyPath;
                        //await this.getActions(TableSchema.name, config).update(argsToUpdate)
                        const idValue = argsToUpdate[idFieldName];
                        if (idValue) {
                            await this.getActions(TableSchema.name, config, queryId).update({ value: argsToUpdate });
                        }
                        else {
                            await this.getActions(TableSchema.name, config, queryId).update({ value: argsToUpdate, key: idValue });
                        }
                        postMessage({
                            run: 'callback',
                            queryId,
                            value: true
                        });
                    }
                },
                delete: async (methods) => {
                    if (methods[methods.length - 1].methodName == 'delete' &&
                        methods[methods.length - 1].arguments == null) {
                        const customMethods = Object.create(methods);
                        customMethods[methods.length - 1].methodName = 'execute';
                        const result = await this.requestHandler(TableSchema, config, queryId).select(customMethods);
                        const rows = result.value;
                        for (let row of rows) {
                            const id = row[TableSchema.id.keyPath];
                            await this.getActions(TableSchema.name, config, queryId).deleteByID(id);
                        }
                        postMessage({
                            run: 'callback',
                            queryId,
                            value: true
                        });
                    }
                    else if (methods[methods.length - 1].methodName == 'delete' &&
                        typeof methods[methods.length - 1].arguments == 'object') {
                        const IdInObject = methods[methods.length - 1].arguments;
                        const idValue = IdInObject[TableSchema.id.keyPath];
                        postMessage({
                            run: 'callback',
                            queryId: queryId,
                            value: await this.getActions(TableSchema.name, config, queryId).deleteByID(idValue)
                        });
                    }
                    else if (methods[methods.length - 1].methodName == 'delete' &&
                        methods[methods.length - 1].arguments == '*') {
                        postMessage({
                            run: 'callback',
                            queryId: queryId,
                            value: await this.getActions(TableSchema.name, config, queryId).deleteAll()
                        });
                    }
                },
                insert: async (methods) => {
                    const rows = methods[0].arguments;
                    const add = (id, index) => {
                        postMessage({
                            run: 'callback',
                            queryId: queryId,
                            value: { id, index }
                        });
                    };
                    for (let i = 0; i < rows.length; i++) {
                        const insert = rows[i];
                        this.getActions(TableSchema.name, config, queryId).add({ value: insert, key: null, index: i, add });
                    }
                    IndexedDB.getOrCreateTransaction({ currentStore: TableSchema.name, queryId, config }, 'readwrite', (transaction) => {
                        postMessage({
                            run: 'done',
                            queryId: queryId,
                            value: true
                        });
                        transaction.done();
                    });
                },
                migrate: async () => {
                    await IndexedDB.migrate(config);
                    await IndexedDB.run(config);
                    postMessage({
                        run: 'callback',
                        queryId: queryId,
                        value: true
                    });
                },
                trigger: async ({ type, subscribe }) => {
                    if (type == 'transactionOnCommit') {
                        if (subscribe) {
                            return await IndexedDB.transactionOnCommitSubscribe(TableSchema, config, queryId);
                        }
                        else {
                            return await IndexedDB.transactionOnCommitUnSubscribe(TableSchema, config, queryId);
                        }
                    }
                    else if (type == 'trigger') {
                    }
                    postMessage({
                        run: 'callback',
                        queryId: queryId,
                        value: true
                    });
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
        return IndexedDB.migrate(config);
    }
    getConnection(config) {
        return IndexedDB.connect(config);
    }
}
export const indexedDB = new indexedDBInterface();
