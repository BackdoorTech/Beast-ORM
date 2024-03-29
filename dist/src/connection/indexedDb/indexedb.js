import { IndexedDB } from "./connector.js";
import { SqlObject } from "../../sql/sqlObject/sqlObject.js";
import { Tables } from "./config.js";
import { PostMessage as PostMessageWorker } from "./postMessage.js";
// inspire by https://github.com/hc-oss/use-indexeddb
class indexedDBInterface {
    constructor() {
        this.getActions = (TableName, DatabaseName, queryId) => {
            return {
                getByID: (id) => {
                    return new Promise((resolve, reject) => {
                        IndexedDB.getOrCreateTransaction({ TableName, queryId, DatabaseName }, 'readonly', (transaction) => {
                            let objectStore = transaction.objectStore(TableName);
                            let request = objectStore.get({ id });
                            request.onsuccess = async (e) => {
                                resolve(e.target.result);
                            };
                        });
                    });
                },
                getOneByIndex: (keyPath, value) => {
                    return new Promise((resolve, reject) => {
                        IndexedDB.getOrCreateTransaction({ TableName, queryId, DatabaseName }, 'readonly', (transaction) => {
                            let objectStore = transaction.objectStore(TableName);
                            let request = objectStore.index({ keyPath, value });
                            request.onsuccess = async (e) => {
                                resolve(e.target.result);
                            };
                        });
                    });
                },
                getManyByIndex: (keyPath, value) => {
                    return new Promise((resolve, reject) => {
                        this.getConnection(DatabaseName)
                            .then(db => {
                            this.validateBeforeTransaction(db, TableName, reject);
                            let tx = this.createTransaction(db, "readonly", TableName, resolve, reject);
                            let objectStore = tx.objectStore(TableName);
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
                        IndexedDB.getOrCreateTransaction({ TableName, queryId, DatabaseName }, 'readonly', (transaction) => {
                            let objectStore = transaction.objectStore(TableName);
                            let request = objectStore.getAll();
                            request.onsuccess = async (e) => {
                                resolve(e.target.result);
                            };
                        });
                    });
                },
                add: ({ value, key, add, index }) => {
                    return new Promise((resolve, reject) => {
                        IndexedDB.getOrCreateTransaction({ TableName, queryId, DatabaseName }, 'readwrite', (transaction) => {
                            let objectStore = transaction.objectStore(TableName);
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
                        IndexedDB.getOrCreateTransaction({ TableName, queryId, DatabaseName }, 'readwrite', (transaction) => {
                            let objectStore = transaction.objectStore(TableName);
                            let request = objectStore.put({ value, key });
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
                        IndexedDB.getOrCreateTransaction({ TableName, queryId, DatabaseName }, 'readwrite', (transaction) => {
                            let objectStore = transaction.objectStore(TableName);
                            let request = objectStore.delete({ id });
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
                        IndexedDB.getOrCreateTransaction({ TableName, queryId, DatabaseName }, 'readwrite', (transaction) => {
                            let objectStore = transaction.objectStore(TableName);
                            let request = objectStore.clear();
                            request.onsuccess = async (e) => {
                                resolve(e.target.result);
                            };
                        });
                    });
                },
                openCursor: (cursorCallback, keyRange) => {
                    return new Promise((resolve, reject) => {
                        this.getConnection(DatabaseName)
                            .then(db => {
                            this.validateBeforeTransaction(db, TableName, reject);
                            let tx = this.createTransaction(db, "readonly", TableName, resolve, reject);
                            let objectStore = tx.objectStore(TableName);
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
        this.requestHandler = (TableName, DatabaseName, queryId, PostMessage = PostMessageWorker) => {
            return {
                select: async (methods) => {
                    const TableSchema = Tables[DatabaseName][TableName];
                    if (methods[0].methodName == 'all') {
                        PostMessage({
                            run: 'callback',
                            queryId: queryId,
                            value: await this.getActions(TableName, DatabaseName, queryId).getAll()
                        });
                    }
                    else if (methods[0].methodName == 'get') {
                        const args = methods[0].arguments;
                        if (Object.keys(args).length == 1) {
                            const key = Object.keys(args)[0];
                            const value = args[key];
                            if (TableSchema.id.keyPath == key) {
                                PostMessage({
                                    run: 'callback',
                                    queryId: queryId,
                                    value: await this.getActions(TableName, DatabaseName, queryId).getByID(value)
                                });
                            }
                            else {
                                PostMessage({
                                    run: 'callback',
                                    queryId: queryId,
                                    value: await this.getActions(TableName, DatabaseName, queryId).getOneByIndex(key, value)
                                });
                            }
                        }
                        else if (methods[0].arguments[TableSchema.id.keyPath]) {
                            PostMessage({
                                run: 'callback',
                                queryId: queryId,
                                value: await this.getActions(TableSchema.name, DatabaseName, queryId).getByID(args[TableSchema.id.keyPath])
                            });
                        }
                    }
                    else if (methods[methods.length - 1].methodName == 'execute') {
                        const sqlObject = new SqlObject(TableSchema, methods);
                        //await this.getActions(TableSchema.name, config, queryId).openCursor(async(event: any) => {
                        //var cursor = event.target.result;
                        //if(cursor) {
                        const rows = await this.getActions(TableName, DatabaseName, queryId).getAll();
                        for (const row of rows) {
                            //const row = cursor.value
                            await sqlObject.runFirstMethod(row);
                            //cursor.continue();
                        }
                        //} else {
                        sqlObject.doneRunFirstMethod();
                        sqlObject.run();
                        PostMessage({
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
                            await this.getActions(TableSchema.name, DatabaseName, queryId).openCursor(async (event) => {
                                var cursor = event.target.result;
                                if (cursor) {
                                    const row = cursor.value;
                                    await sqlObject.runFirstMethod(row, resolve, 1);
                                    cursor.continue();
                                }
                                else {
                                    sqlObject.doneRunFirstMethod();
                                    sqlObject.run();
                                    PostMessage({
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
                    const TableSchema = Tables[DatabaseName][TableName];
                    if (methods[0].methodName == 'save') {
                        const args = methods[0].arguments;
                        const idFieldName = TableSchema.id.keyPath;
                        const idValue = args[idFieldName];
                        if (idValue) {
                            this.getActions(TableSchema.name, DatabaseName, queryId).update({ value: args });
                        }
                        else {
                            this.getActions(TableSchema.name, DatabaseName, queryId).update({ value: args, key: idValue });
                        }
                        IndexedDB.getOrCreateTransaction({ TableName: TableName, queryId, DatabaseName }, 'readwrite', (transaction) => {
                            PostMessage({
                                run: 'callback',
                                queryId: queryId,
                                value: true
                            });
                            transaction.done();
                        });
                    }
                    else if (methods[0].methodName != 'update' && methods[methods.length - 1].methodName == 'update') {
                        const argsToUpdate = methods[methods.length - 1].arguments;
                        const customMethods = Object.create(methods);
                        customMethods[methods.length - 1].methodName = 'execute';
                        await this.requestHandler(TableSchema.name, DatabaseName, queryId, ({ value }) => {
                            const rows = value;
                            for (let row of rows) {
                                const updateRow = Object.assign(row, argsToUpdate);
                                this.getActions(TableSchema.name, DatabaseName, queryId).update({ value: updateRow });
                            }
                            IndexedDB.getOrCreateTransaction({ TableName: TableName, queryId, DatabaseName }, 'readwrite', (transaction) => {
                                PostMessage({
                                    run: 'callback',
                                    queryId: queryId,
                                    value: true
                                });
                                transaction.done();
                            });
                        }).select(customMethods);
                    }
                    else if (methods[0].methodName == 'update') {
                        const argsToUpdate = methods[0].arguments;
                        const idFieldName = TableSchema.id.keyPath;
                        //await this.getActions(TableSchema.name, config).update(argsToUpdate)
                        const idValue = argsToUpdate[idFieldName];
                        if (idValue) {
                            this.getActions(TableSchema.name, DatabaseName, queryId).update({ value: argsToUpdate });
                        }
                        else {
                            this.getActions(TableSchema.name, DatabaseName, queryId).update({ value: argsToUpdate, key: idValue });
                        }
                        IndexedDB.getOrCreateTransaction({ TableName: TableSchema.name, queryId, DatabaseName }, 'readwrite', (transaction) => {
                            PostMessage({
                                run: 'callback',
                                queryId: queryId,
                                value: true
                            });
                            transaction.done();
                        });
                    }
                },
                delete: async (methods) => {
                    const TableSchema = Tables[DatabaseName][TableName];
                    if (methods[methods.length - 1].methodName == 'delete' &&
                        methods[methods.length - 1].arguments == null) {
                        const customMethods = Object.create(methods);
                        customMethods[methods.length - 1].methodName = 'execute';
                        await this.requestHandler(TableName, DatabaseName, queryId, ({ value }) => {
                            const rows = value;
                            for (let row of rows) {
                                const id = row[TableSchema.id.keyPath];
                                this.getActions(TableSchema.name, DatabaseName, queryId).deleteByID(id);
                            }
                            IndexedDB.getOrCreateTransaction({ TableName: TableName, queryId, DatabaseName }, 'readwrite', (transaction) => {
                                PostMessage({
                                    run: 'callback',
                                    queryId: queryId,
                                    value: rows.length
                                });
                                transaction.done();
                            });
                        }).select(customMethods);
                    }
                    else if (methods[methods.length - 1].methodName == 'delete' &&
                        typeof methods[methods.length - 1].arguments == 'object') {
                        const IdInObject = methods[methods.length - 1].arguments;
                        const idValue = IdInObject[TableSchema.id.keyPath];
                        PostMessage({
                            run: 'callback',
                            queryId: queryId,
                            value: await this.getActions(TableName, DatabaseName, queryId).deleteByID(idValue)
                        });
                    }
                    else if (methods[methods.length - 1].methodName == 'delete' &&
                        methods[methods.length - 1].arguments == '*') {
                        PostMessage({
                            run: 'callback',
                            queryId: queryId,
                            value: await this.getActions(TableName, DatabaseName, queryId).deleteAll()
                        });
                    }
                },
                insert: async (methods) => {
                    const rows = methods[0].arguments;
                    const add = (id, index) => {
                        PostMessage({
                            run: 'callback',
                            queryId: queryId,
                            value: { id, index }
                        });
                    };
                    for (let i = 0; i < rows.length; i++) {
                        const insert = rows[i];
                        this.getActions(TableName, DatabaseName, queryId).add({ value: insert, key: null, index: i, add });
                    }
                    IndexedDB.getOrCreateTransaction({ TableName: TableName, queryId, DatabaseName }, 'readwrite', (transaction) => {
                        PostMessage({
                            run: 'done',
                            queryId: queryId,
                            value: true
                        });
                        transaction.done();
                    });
                },
                migrate: async ({ DatabaseSchema, TableSchema }) => {
                    await IndexedDB.migrate(DatabaseSchema);
                    await IndexedDB.run(DatabaseSchema);
                    PostMessage({
                        run: 'callback',
                        queryId: queryId,
                        value: true
                    });
                },
                trigger: async ({ type, subscribe }) => {
                    if (type == 'transactionOnCommit') {
                        if (subscribe) {
                            PostMessage(IndexedDB.transactionOnCommitSubscribe(TableName, DatabaseName, queryId));
                        }
                        else {
                            PostMessage(IndexedDB.transactionOnCommitUnSubscribe(TableName, DatabaseName, queryId));
                        }
                    }
                    else if (type == 'trigger') {
                        PostMessage({
                            run: 'callback',
                            queryId: queryId,
                            value: true
                        });
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
    createTransaction(db, dbMode, TableName, resolve, reject, abort) {
        let tx = db.transaction(TableName, dbMode);
        tx.onerror = reject;
        tx.oncomplete = resolve;
        tx.onabort = abort;
        return tx;
    }
    migrate(config) {
        return IndexedDB.migrate(config);
    }
    getConnection(DatabaseName) {
        return IndexedDB.connect(DatabaseName);
    }
}
export const indexedDB = new indexedDBInterface();
