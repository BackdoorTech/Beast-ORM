import { transaction } from './transaction.js';
import { PostMessage } from "./postMessage.js";
// inspire by https://github.com/hc-oss/use-indexeddb
export class ObjectStore {
    constructor({ store }) {
        this.transactions = [];
        this.parallelTransactions = [];
        this.transactionsToCommit = [];
        this.executingTransaction = false;
        this.txInstanceMode = {};
        this.storeCache = {};
        this.transactionOnCommit = {};
        this.haveWriteSomeThing = false;
        this.name = '';
        this.transactionFinish = (TableName) => { };
        this.name = store.name;
        this.config = store;
    }
    async transactionTrigger() {
        var _a, _b;
        if (this.txInstanceMode['readwrite']) {
            try {
                (_b = (_a = this.txInstance.IDBTransaction) === null || _a === void 0 ? void 0 : _a.commit) === null || _b === void 0 ? void 0 : _b.call(_a);
                (async () => {
                    if (this.haveWriteSomeThing) {
                        for (let [queryId, value] of Object.entries(this.transactionOnCommit)) {
                            this.cleanTransaction();
                            PostMessage({
                                run: 'callback',
                                queryId: queryId,
                                value: true
                            });
                        }
                    }
                })();
            }
            catch (error) {
                // no commit need
                // console.log('not need to commit')
            }
        }
        else {
            // console.log("mode ", JSON.stringify(this.txInstanceMode))
        }
        this.txInstanceMode['readwrite'] = {};
        this.transactionsToCommit = [];
        this.haveWriteSomeThing = false;
        this.cleanTransaction();
    }
    cleanTransaction() {
        this.txInstanceMode = {};
    }
    executeTransaction() {
        const { mode, callback } = this.transactions[0];
        this.txInstanceMode[mode] = true;
        const done = async () => {
            const transaction = this.transactions.shift();
            this.transactionsToCommit.push(transaction);
            if (mode == 'readwrite') {
                this.haveWriteSomeThing = true;
            }
            if (this.transactions.length == 0) {
                this.executingTransaction = false;
                this.transactionTrigger();
                delete this.txInstance;
                this.transactionFinish(this.name);
                // console.log("finish")
            }
            else {
                this.executeTransaction();
            }
        };
        const doneButFailed = async () => {
            this.transactions.shift();
            this.txInstance.active = false;
            if (this.transactionsToCommit.length >= 1) {
                this.transactionTrigger();
            }
            if (this.transactions.length >= 1) {
                const tx = this.createTransaction(this.dbInstance, "readwrite", (onerror) => { }, (oncomplete) => { }, (onabort) => { });
                this.txInstance = {
                    IDBTransaction: tx,
                    active: true,
                    IDBTransactionMode: "readwrite"
                };
                this.executeTransaction();
            }
        };
        this.validateBeforeTransaction(this.dbInstance, (data) => {
        });
        const transactionInstance = new transaction({
            store: this.name,
            done,
            doneButFailed,
            db: this.dbInstance,
            tx: this.txInstance.IDBTransaction
        });
        callback(transactionInstance);
    }
    parallelExecuteTransaction() {
        const { mode, callback } = this.parallelTransactions.shift();
        this.txInstanceMode[mode] = true;
        const tx = this.createTransaction(this.dbInstance, "readonly", (onerror) => { }, (oncomplete) => { }, (onabort) => { });
        const done = async () => {
            if (this.parallelTransactions.length == 0) {
                this.txInstanceMode[mode] = false;
            }
        };
        const doneButFailed = async () => {
            if (this.parallelTransactions.length == 0) {
                this.txInstanceMode[mode] = false;
            }
        };
        const transactionInstance = new transaction({
            store: this.name,
            done,
            doneButFailed,
            db: this.dbInstance,
            tx: this.txInstance.IDBTransaction
        });
        callback(transactionInstance);
    }
    getOrCreateTransaction({ queryId, Database }, mode, callback) {
        //if(mode == 'readonly' && !this.txInstance) {
        //  this.parallelTransactions.push({DatabaseName, queryId, mode, callback})
        //  this.parallelExecuteTransaction(DatabaseName, TableName)
        //} else {
        this.transactions.push({ queryId, mode, callback });
        //}
        if (this.executingTransaction == false) {
            this.executingTransaction = true;
            const tx = this.createTransaction(Database, "readwrite", (onerror) => { }, (oncomplete) => { }, (onabort) => { });
            this.dbInstance = Database;
            if (!this.txInstance) {
                this.txInstance = {
                    IDBTransaction: tx,
                    active: true,
                    IDBTransactionMode: "readwrite"
                };
            }
            this.txInstance.IDBTransaction = tx;
            this.txInstance.active = true;
            // this.dbInstanceUsing = true
            this.executeTransaction();
        }
        else {
            if (mode == 'readonly') {
            }
        }
    }
    createTransaction(db, dbMode, onerror, oncomplete, onabort) {
        let tx = db.transaction(this.name, dbMode);
        tx.onerror = onerror;
        tx.oncomplete = oncomplete;
        tx.onabort = onabort;
        return tx;
    }
    validateBeforeTransaction(db, reject) {
        if (!db) {
            reject("Queried before opening connection");
        }
        // if (!this.validateStore(db, storeName)) {
        //   reject(`Store ${storeName} not found`);
        // }
    }
    transactionOnCommitSubscribe(TableName, DatabaseName, SubscriptionName) {
        this.transactionOnCommit[SubscriptionName] = {};
        return {
            run: 'callback',
            subscription: true,
            queryId: SubscriptionName,
            value: true
        };
    }
    transactionOnCommitUnSubscribe(TableName, DatabaseName, SubscriptionName) {
        delete this.transactionOnCommit[SubscriptionName];
        return {
            run: 'callback',
            subscription: false,
            queryId: SubscriptionName,
            value: true
        };
    }
}
