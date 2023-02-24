import { transaction } from './transaction.js';
// inspire by https://github.com/hc-oss/use-indexeddb
export class IndexedDB {
    constructor() { }
    static connect(config) {
        return new Promise((resolve, reject) => {
            if (this.dbInstance[config.databaseName]) {
                resolve(this.dbInstance[config.databaseName]);
            }
            const idbInstance = indexedDB || self.indexedDB || self.mozIndexedDB || self.webkitIndexedDB || self.msIndexedDB;
            if (idbInstance) {
                const request = idbInstance.open(config.databaseName, config.version);
                request.onsuccess = () => {
                    this.dbInstance[config.databaseName] = request.result;
                    resolve(request.result);
                };
                request.onerror = (e) => {
                    reject(e.target.error.name);
                };
                request.onupgradeneeded = async (e) => {
                    console.log('need to migrate first');
                    await this.migrate(config);
                    return await this.connect(config);
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
            this.transactions[config.databaseName] = {};
            this.executingTransaction[config.databaseName] = {};
            this.txInstance[config.databaseName] = {};
            this.dbInstanceUsing[config.databaseName] = {};
            this.txInstanceMode[config.databaseName] = {};
            this.transactionOnCommit[config.databaseName] = {};
            for (const storeName of config.stores) {
                if (!this.transactions[config.databaseName][storeName.name]) {
                    this.transactions[config.databaseName][storeName.name] = [];
                    this.executingTransaction[config.databaseName][storeName.name] = false;
                    this.txInstance[config.databaseName][storeName.name] = null;
                    this.txInstanceMode[config.databaseName][storeName.name] = {};
                    this.transactionOnCommit[config.databaseName][storeName.name] = {};
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
        const { mode, callback, config } = this.transactions[databaseName][currentStore].shift();
        this.txInstanceMode[databaseName][currentStore][mode] = true;
        const done = async () => {
            var _a, _b;
            if (this.transactions[config.databaseName][currentStore].length == 0) {
                this.executingTransaction[databaseName][currentStore] = false;
                if (this.txInstanceMode[databaseName][currentStore]['readwrite']) {
                    try {
                        (_b = (_a = this.txInstance[databaseName][currentStore]) === null || _a === void 0 ? void 0 : _a.commit) === null || _b === void 0 ? void 0 : _b.call(_a);
                        for (let onTransaction of Object.entries(this.transactionOnCommit[databaseName][currentStore])) {
                            postMessage({
                                queryId: onTransaction,
                            });
                        }
                    }
                    catch (error) {
                        // no commit need 
                    }
                }
                this.txInstanceMode[databaseName][currentStore] = {};
                this.dbInstance[config.databaseName].close();
                delete this.dbInstanceUsing[config.databaseName][currentStore];
                if (Object.keys(this.dbInstanceUsing[config.databaseName]).length == 0) {
                    delete this.dbInstance[config.databaseName];
                }
            }
            else {
                this.executeTransaction(currentStore, databaseName);
            }
        };
        const transactionInstance = new transaction({
            store: currentStore,
            done,
            db: this.dbInstance[config.databaseName],
            tx: this.txInstance[databaseName][currentStore]
        });
        // console.log('execute')
        callback(transactionInstance);
    }
    static getOrCreateTransaction({ currentStore, queryId, config }, mode, callback) {
        this.transactions[config.databaseName][currentStore].push({ config, queryId, mode, callback });
        if (this.executingTransaction[config.databaseName][currentStore] == false) {
            this.executingTransaction[config.databaseName][currentStore] = true;
            // console.log('start')
            this.connect(config).then(() => {
                const tx = this.createTransaction(this.dbInstance[config.databaseName], "readwrite", currentStore, () => { });
                this.txInstance[config.databaseName][currentStore] = tx;
                this.dbInstanceUsing[config.databaseName][currentStore] = true;
                this.executeTransaction(currentStore, config.databaseName);
            });
        }
    }
    static createTransaction(db, dbMode, currentStore, resolve, reject, abort) {
        let tx = db.transaction(currentStore, dbMode);
        tx.onerror = reject;
        tx.oncomplete = resolve;
        tx.onabort = abort;
        return tx;
    }
    static transactionOnCommitSubscribe(TableSchema, config, SubscriptionName) {
        this.transactionOnCommit[config.databaseName][TableSchema.name][SubscriptionName] = {};
        return {
            subscription: true,
            queryId: SubscriptionName
        };
    }
    static transactionOnCommitUnSubscribe(TableSchema, config, SubscriptionName) {
        delete this.transactionOnCommit[config.databaseName][TableSchema.name][SubscriptionName];
        return {
            subscription: false,
            queryId: SubscriptionName
        };
    }
}
IndexedDB.transactions = {};
IndexedDB.dbInstance = {};
IndexedDB.dbInstanceUsing = {};
IndexedDB.txInstance = {};
IndexedDB.txInstanceMode = {};
IndexedDB.storeCache = {};
IndexedDB.transactionOnCommit = {};
IndexedDB.executingTransaction = {};
