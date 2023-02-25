var _a;
import { MemoryConnector } from "./connector.js";
import { SqlObject } from "../../sql/sqlObject/sqlObject.js";
import { DatabaseMemory } from './db.js';
// inspire by https://github.com/hc-oss/use-indexeddb
export class Memory {
    static validateStore(db, storeName) {
        return DatabaseMemory.objectStoreNames.contains(storeName);
    }
    static validateBeforeTransaction(db, storeName, reject) {
        if (!db) {
            reject("Queried before opening connection");
        }
        if (!this.validateStore(db, storeName)) {
            reject(`Store ${storeName} not found`);
        }
    }
    static migrate(config) {
        return new MemoryConnector().migrate(config);
    }
    static getConnection(config) {
        return new MemoryConnector().connect(config);
    }
}
_a = Memory;
Memory.getActions = (currentStore, config) => {
    return {
        getAll: () => {
            return new Promise((resolve, reject) => {
                DatabaseMemory.getOrCreateTransaction(currentStore, "readwrite", (transaction) => {
                    let objectStore = transaction.objectStore(currentStore);
                    let request = objectStore.getAll();
                    request.onsuccess = (e) => {
                        resolve(e.target.result);
                    };
                });
            });
        },
        add: (value, key) => {
            return new Promise((resolve, reject) => {
                DatabaseMemory.getOrCreateTransaction(currentStore, "readwrite", (transaction) => {
                    let objectStore = transaction.objectStore(currentStore);
                    let request = objectStore.add(value, key);
                    request.onsuccess = (e) => {
                        resolve(e.target.result);
                    };
                });
            });
        },
        getByID(id) { },
        getOneByIndex(x, y) { },
        openCursor(func) { }
    };
};
Memory.requestHandler = (TableSchema, config, queryId) => {
    return {
        select: async (methods) => {
            if (methods[0].methodName == 'all') {
                return {
                    queryId: queryId,
                    value: await _a.getActions(TableSchema.name, config).getAll()
                };
            }
            else if (methods[0].methodName == 'get') {
                const args = methods[0].arguments;
                if (Object.keys(args).length == 1) {
                    const key = Object.keys(args)[0];
                    const value = args[key];
                    if (TableSchema.id.keyPath == key) {
                        return {
                            queryId: queryId,
                            value: await _a.getActions(TableSchema.name, config).getByID(value)
                        };
                    }
                    else {
                        return {
                            queryId: queryId,
                            value: await _a.getActions(TableSchema.name, config).getOneByIndex(key, value)
                        };
                    }
                }
            }
            else if (methods[methods.length - 1].methodName == 'execute') {
                return new Promise(async (resolve, reject) => {
                    const sqlObject = new SqlObject(TableSchema, methods);
                    await _a.getActions(TableSchema.name, config).openCursor(async (event) => {
                        var cursor = event.target.result;
                        if (cursor) {
                            const row = cursor.value;
                            await sqlObject.runFirstMethod(row);
                            cursor.continue();
                        }
                        else {
                            sqlObject.doneRunFirstMethod();
                            sqlObject.run();
                            resolve({
                                queryId: queryId,
                                value: sqlObject.firstMethod.rows
                            });
                        }
                    });
                });
            }
            else if (methods[methods.length - 1].methodName == 'first') {
                return new Promise(async (resolve, reject) => {
                    const sqlObject = new SqlObject(TableSchema, methods);
                    await _a.getActions(TableSchema.name, config).openCursor(async (event) => {
                        var cursor = event.target.result;
                        if (cursor) {
                            const row = cursor.value;
                            await sqlObject.runFirstMethod(row, resolve, 1);
                            cursor.continue();
                        }
                        else {
                            sqlObject.doneRunFirstMethod();
                            sqlObject.run();
                            resolve({
                                queryId: queryId,
                                value: sqlObject.firstMethod.rows
                            });
                        }
                    });
                });
            }
        },
        insert: async (methods) => {
            const createdObjKeys = [];
            const rows = methods[0].arguments;
            for (let insert of rows) {
                const id = await _a.getActions(TableSchema.name, config).add(insert);
                insert[TableSchema.id.keyPath] = id;
            }
            // return first element
            if (rows.length == 1) {
                return {
                    queryId: queryId,
                    value: rows
                };
            }
            else {
                return {
                    queryId: queryId,
                    value: rows
                };
            }
        }
    };
};
