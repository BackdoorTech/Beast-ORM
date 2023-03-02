import { transaction } from './transaction.js';
import { Databases, Tables } from './config.js';
// inspire by https://github.com/hc-oss/use-indexeddb
export class IndexedDB {
    constructor() { }
    static connect(DatabaseName) {
        return new Promise((resolve, reject) => {
            const DatabaseSchema = Databases[DatabaseName];
            if (this.dbInstance[DatabaseSchema.databaseName]) {
                resolve(this.dbInstance[DatabaseSchema.databaseName]);
            }
            const idbInstance = indexedDB || self.indexedDB || self.mozIndexedDB || self.webkitIndexedDB || self.msIndexedDB;
            if (idbInstance) {
                const request = idbInstance.open(DatabaseSchema.databaseName, DatabaseSchema.version);
                request.onsuccess = () => {
                    this.dbInstance[DatabaseSchema.databaseName] = request.result;
                    resolve(request.result);
                };
                request.onerror = (e) => {
                    reject(e.target.error.name);
                };
                request.onupgradeneeded = async (e) => {
                    await this.migrate(DatabaseSchema);
                    return await this.connect(DatabaseSchema.databaseName);
                };
                // request.onblocked = async (e: any) => {
                //   reject(e.target.error.name);
                // }
            }
            else {
                reject("IDBDatabase not supported inside webworker");
            }
        });
    }
    static migrate(config) {
        return new Promise((resolve, reject) => {
            const idbInstance = indexedDB || self.indexedDB || self.mozIndexedDB || self.webkitIndexedDB || self.msIndexedDB;
            if (idbInstance) {
                const request = idbInstance.open(config.databaseName, config.version);
                request.onsuccess = () => {
                    // request.result.close()
                    resolve(false);
                };
                request.onerror = (e) => {
                    reject(e.target.error.name);
                };
                request.onupgradeneeded = async (e) => {
                    const db = e.target.result;
                    await this.runMigrations(db, config);
                    db.close();
                    resolve(true);
                };
            }
            else {
                reject("Failed to connect");
            }
        });
    }
    static run(config) {
        if (!this.transactions[config.databaseName]) {
            Databases[config.databaseName] = config;
            this.transactions[config.databaseName] = {};
            this.executingTransaction[config.databaseName] = {};
            this.txInstance[config.databaseName] = {};
            this.dbInstanceUsing[config.databaseName] = {};
            this.txInstanceMode[config.databaseName] = {};
            this.transactionOnCommit[config.databaseName] = {};
            this.transactionsToCommit[config.databaseName] = {};
            Tables[config.databaseName] = {};
            for (const store of config.stores) {
                if (!this.transactions[config.databaseName][store.name]) {
                    Tables[config.databaseName][store.name] = store;
                    this.transactions[config.databaseName][store.name] = [];
                    this.executingTransaction[config.databaseName][store.name] = false;
                    this.txInstance[config.databaseName][store.name] = {};
                    this.txInstanceMode[config.databaseName][store.name] = {};
                    this.transactionOnCommit[config.databaseName][store.name] = {};
                    this.transactionsToCommit[config.databaseName][store.name] = [];
                }
            }
        }
        return true;
    }
    static request({ queryId }, callback) {
    }
    static async runMigrations(db, config) {
        await config.stores.forEach(async (storeSchema) => {
            if (!db.objectStoreNames.contains(storeSchema.name)) {
                const ObjectStore = db.createObjectStore(storeSchema.name, storeSchema.id);
                storeSchema.fields.forEach(c => {
                    ObjectStore.createIndex(c.name, c.keyPath, c.options);
                });
            }
        });
    }
    static executeTransaction(currentStore, databaseName) {
        const { mode, callback, DatabaseName } = this.transactions[databaseName][currentStore][0];
        this.txInstanceMode[databaseName][currentStore][mode] = true;
        const done = async () => {
            var _a, _b;
            const transaction = this.transactions[databaseName][currentStore].shift();
            this.transactionsToCommit[databaseName][currentStore].push(transaction);
            if (this.transactions[DatabaseName][currentStore].length == 0) {
                this.executingTransaction[databaseName][currentStore] = false;
                if (this.txInstanceMode[databaseName][currentStore]['readwrite']) {
                    try {
                        (_b = (_a = this.txInstance[databaseName][currentStore]["readwrite"].IDBTransaction) === null || _a === void 0 ? void 0 : _a.commit) === null || _b === void 0 ? void 0 : _b.call(_a);
                        this.transactionsToCommit[databaseName][currentStore] = [];
                        (async () => {
                            for (let [queryId, value] of Object.entries(this.transactionOnCommit[databaseName][currentStore])) {
                                postMessage({
                                    run: 'callback',
                                    queryId: queryId,
                                    value: true
                                });
                            }
                        })();
                    }
                    catch (error) {
                        // no commit need 
                    }
                }
                delete this.txInstance[databaseName][currentStore]["readwrite"];
                this.txInstanceMode[databaseName][currentStore] = {};
                delete this.dbInstanceUsing[DatabaseName][currentStore];
                if (Object.keys(this.dbInstanceUsing[DatabaseName]).length == 0) {
                    this.dbInstance[DatabaseName].close();
                    delete this.dbInstance[DatabaseName];
                }
            }
            else {
                this.executeTransaction(currentStore, databaseName);
            }
        };
        const doneButFailed = async () => {
            var _a, _b;
            this.transactions[databaseName][currentStore].shift();
            if (this.transactions[DatabaseName][currentStore].length >= 1) {
                this.txInstance[DatabaseName][currentStore]["readwrite"].active = false;
                try {
                    (_b = (_a = this.txInstance[databaseName][currentStore]["readwrite"].IDBTransaction) === null || _a === void 0 ? void 0 : _a.commit) === null || _b === void 0 ? void 0 : _b.call(_a);
                }
                catch (error) { }
                const tx = this.createTransaction(this.dbInstance[DatabaseName], "readwrite", currentStore, (error) => {
                    //  
                }, () => { }, (onabort) => {
                    //  
                    this.txInstance[DatabaseName][currentStore]["readwrite"].active = false;
                });
                this.txInstance[DatabaseName][currentStore] = {
                    readwrite: {
                        IDBTransaction: tx,
                        active: true,
                        IDBTransactionMode: "readwrite"
                    }
                };
                this.executeTransaction(currentStore, databaseName);
            }
        };
        this.validateBeforeTransaction(this.dbInstance[DatabaseName], currentStore, (data) => {
        });
        const transactionInstance = new transaction({
            store: currentStore,
            done,
            doneButFailed,
            db: this.dbInstance[DatabaseName],
            tx: this.txInstance[databaseName][currentStore]["readwrite"].IDBTransaction
        });
        callback(transactionInstance);
    }
    static getOrCreateTransaction({ TableName, queryId, DatabaseName }, mode, callback) {
        this.transactions[DatabaseName][TableName].push({ DatabaseName, queryId, mode, callback });
        if (this.executingTransaction[DatabaseName][TableName] == false) {
            this.executingTransaction[DatabaseName][TableName] = true;
            this.connect(DatabaseName).then(() => {
                const tx = this.createTransaction(this.dbInstance[DatabaseName], "readwrite", TableName, (error) => {
                    // ;
                }, () => { }, (onabort) => {
                    //  
                    this.txInstance[DatabaseName][TableName]["readwrite"].active = false;
                });
                if (!this.txInstance[DatabaseName][TableName]["readwrite"]) {
                    this.txInstance[DatabaseName][TableName] = {
                        readwrite: {
                            IDBTransaction: tx,
                            active: true,
                            IDBTransactionMode: "readwrite"
                        }
                    };
                }
                this.txInstance[DatabaseName][TableName]["readwrite"].IDBTransaction = tx;
                this.txInstance[DatabaseName][TableName]["readwrite"].active = true;
                this.dbInstanceUsing[DatabaseName][TableName] = true;
                this.executeTransaction(TableName, DatabaseName);
            });
        }
        else {
            if (mode == 'readonly') {
            }
        }
    }
    static createTransaction(db, dbMode, currentStore, resolve, reject, abort) {
        let tx = db.transaction(currentStore, dbMode);
        tx.onerror = reject;
        tx.oncomplete = resolve;
        tx.onabort = abort;
        return tx;
    }
    static validateBeforeTransaction(db, storeName, reject) {
        if (!db) {
            reject("Queried before opening connection");
        }
        // if (!this.validateStore(db, storeName)) {
        //   reject(`Store ${storeName} not found`);
        // }
    }
    static transactionOnCommitSubscribe(TableName, DatabaseName, SubscriptionName) {
        this.transactionOnCommit[DatabaseName][TableName][SubscriptionName] = {};
        return {
            run: 'callback',
            subscription: true,
            queryId: SubscriptionName,
            value: true
        };
    }
    static transactionOnCommitUnSubscribe(TableName, DatabaseName, SubscriptionName) {
        delete this.transactionOnCommit[DatabaseName][TableName][SubscriptionName];
        return {
            run: 'callback',
            subscription: false,
            queryId: SubscriptionName,
            value: true
        };
    }
}
IndexedDB.transactions = {};
IndexedDB.transactionsToCommit = {};
IndexedDB.dbInstance = {};
IndexedDB.dbInstanceUsing = {};
IndexedDB.txInstance = {};
IndexedDB.txInstanceMode = {};
IndexedDB.storeCache = {};
IndexedDB.transactionOnCommit = {};
IndexedDB.executingTransaction = {};
