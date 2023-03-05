import { PostMessage } from "../indexedDb/postMessage.js";
import { Databases, Tables } from "./data.js";
import { transaction } from './transaction.js';
// inspire by https://github.com/hc-oss/use-indexeddb
export class IndexedDB {
    constructor() { }
    static connect(DatabaseName) {
        return new Promise((resolve, reject) => {
            resolve(true);
        });
    }
    static migrate(config) {
        return new Promise((resolve, reject) => {
            resolve(true);
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
    static async runMigrations(db, config) { }
    static executeTransaction(currentStore, databaseName) {
        const { mode, callback, DatabaseName } = this.transactions[databaseName][currentStore][0];
        this.txInstanceMode[databaseName][currentStore][mode] = true;
        const done = async () => {
            const transaction = this.transactions[databaseName][currentStore].shift();
            this.transactionsToCommit[databaseName][currentStore].push(transaction);
            if (this.transactions[DatabaseName][currentStore].length == 0) {
                this.executingTransaction[databaseName][currentStore] = false;
                if (this.txInstanceMode[databaseName][currentStore]['readwrite']) {
                    try {
                        // (this.txInstance[databaseName][currentStore]["readwrite"].IDBTransaction as any)?.commit?.();
                        this.transactionsToCommit[databaseName][currentStore] = [];
                        (async () => {
                            for (let [queryId, value] of Object.entries(this.transactionOnCommit[databaseName][currentStore])) {
                                PostMessage({
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
            this.transactions[databaseName][currentStore].shift();
            if (this.transactions[DatabaseName][currentStore].length >= 1) {
                this.txInstance[DatabaseName][currentStore]["readwrite"].active = false;
                (async () => {
                    for (let [queryId, value] of Object.entries(this.transactionOnCommit[databaseName][currentStore])) {
                        PostMessage({
                            run: 'callback',
                            queryId: queryId,
                            value: true
                        });
                    }
                })();
                this.txInstance[DatabaseName][currentStore] = {
                    readwrite: {
                        // IDBTransaction: tx,
                        active: true,
                        IDBTransactionMode: "readwrite"
                    }
                };
                this.txInstance[DatabaseName][currentStore]["readwrite"].active = true;
                this.executeTransaction(currentStore, databaseName);
            }
        };
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
                if (!this.txInstance[DatabaseName][TableName]["readwrite"]) {
                    this.txInstance[DatabaseName][TableName] = {
                        readwrite: {
                            // IDBTransaction: tx,
                            active: true,
                            IDBTransactionMode: "readwrite"
                        }
                    };
                }
                //this.txInstance[DatabaseName][TableName]["readwrite"].IDBTransaction = tx
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
