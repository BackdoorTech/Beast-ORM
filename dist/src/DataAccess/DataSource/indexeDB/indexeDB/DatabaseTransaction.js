import { ok, error as err } from "../../../../Utility/Either/index.js";
import { ConstraintError, TransactionAbortion, TransactionInfo } from "../../../_interface/interface.type.js";
import { databaseManager } from "./DatabaseManager.js";
export class DatabaseTransaction {
    constructor(tableSchema, dedicateTransaction, errorPassive) {
        this.operationQueue = [];
        this.isTransactionInProgress = false;
        this.errorPassive = false;
        this.finishTransactionCallback = [];
        this.dead = false;
        this.hasWriteTransaction = false;
        this.dedicateTransaction = false;
        this.schema = tableSchema;
        this.dedicateTransaction = dedicateTransaction;
        this.errorPassive = errorPassive;
    }
    onDone(fn) {
        if (this.isTransactionInProgress) {
            this.finishTransactionCallback.push(fn);
        }
        else {
            this.finishTransactionCallback.push(fn);
        }
    }
    startExecution() {
        this.createTransaction();
        this.processOperationQueue();
        // if (!this.isTransactionInProgress) {
        //   this.createTransaction()
        //   this.processOperationQueue();
        // } else {
        //   // development porpuse only
        //   throw("Already running")
        // }
    }
    waitToFinish() {
        return new Promise((resolve, reject) => {
            if (this.isTransactionInProgress == false) {
                resolve(this.transactionInto);
            }
            else {
                this.onDone((result) => {
                    resolve(result);
                });
            }
        });
    }
    async enqueueOperation(transaction) {
        return new Promise((resolve, reject) => {
            transaction.finishRequest = (result) => {
                resolve(result);
            };
            this.operationQueue.push(transaction);
            //   // uncomment when  working in data access layer
            // if(this.dead) {
            //   throw("error")
            // }
        });
    }
    async processOperationQueue() {
        if (this.isTransactionInProgress) {
            return;
        }
        this.isTransactionInProgress = true;
        const loop = async () => {
            const nextTransaction = this.operationQueue.shift();
            if (nextTransaction) {
                try {
                    await this.executeOperation(nextTransaction);
                }
                catch (error) {
                    if (this.errorPassive) {
                        this.commitTransaction();
                        this.createTransaction();
                    }
                    else {
                        this.abortTransaction(new ConstraintError(error));
                        this.runDoneCallBack();
                    }
                }
                finally {
                    await loop();
                }
            }
        };
        await loop();
        this.finishWithSuccess();
    }
    finishWithSuccess() {
        this.isTransactionInProgress = false;
        this.commitTransaction();
        this.closeTransaction();
        this.clearVariables();
        if (!this.isTransactionInProgress && this.operationQueue.length >= 1) {
            this.processOperationQueue();
        }
        else {
            this.runDoneCallBack();
        }
        this.dead = true;
    }
    runDoneCallBack() {
        for (const fn of this.finishTransactionCallback) {
            fn(this.transactionInto);
        }
    }
    finishWithAbortion() {
    }
    executeOperation(transaction) {
        const { operation, data, onsuccess, onerror, index, finishRequest, retry } = transaction;
        // this.IDBTransaction = this.db.transaction(this.schema.name, "readwrite");
        const objectStore = this.IDBTransaction.objectStore(this.schema.name);
        let request;
        try {
            request = objectStore[operation](data);
        }
        catch (error) {
            console.error("retry", error);
            // if(transaction.retry != true) {
            //   transaction.retry = true
            //   //this.commitTransaction()
            //   // this.abortTransaction({} as any)
            //   this.createTransaction()
            //   return this.executeOperation(transaction);
            // }
        }
        return new Promise(async (resolve, reject) => {
            request.onsuccess = async () => {
                const data = { data: request.result, index };
                resolve(data);
                onsuccess(data);
                finishRequest(ok(data));
            };
            request.onerror = (error) => {
                reject(error);
                if (onerror) {
                    onerror(error.target["error"]);
                }
                finishRequest(err(false));
            };
        });
    }
    abortTransaction(cause) {
        const transactionAbortion = new TransactionAbortion();
        transactionAbortion.cause = cause;
        this.transactionInto = err(transactionAbortion);
        this.IDBTransaction.abort();
    }
    commitTransaction() {
        let transactionInfo = new TransactionInfo();
        try {
            this.IDBTransaction.commit();
            transactionInfo.hasChangeDb = true;
            this.executeTrigger();
        }
        catch (error) {
            transactionInfo.hasChangeDb = false;
        }
        this.setTransactionInfo(transactionInfo);
        return transactionInfo;
    }
    async executeTrigger() {
        const database = databaseManager.getDb(this.schema.databaseName);
        database.runTrigger(this.schema.name, true);
    }
    setTransactionInfo(TransactionInfo) {
        this.transactionInto = ok(TransactionInfo);
    }
    setTransactionErrorInfo(ConstraintError) {
        this.transactionInto = err(ConstraintError);
    }
    clearVariables() {
        this.hasWriteTransaction = false;
    }
    writeTransactionFlag() {
        this.hasWriteTransaction = true;
    }
    createTransaction() {
        this.IDBTransaction = this.db.transaction(this.schema.name, "readwrite");
    }
    closeTransaction() {
        delete this.IDBTransaction;
    }
}
