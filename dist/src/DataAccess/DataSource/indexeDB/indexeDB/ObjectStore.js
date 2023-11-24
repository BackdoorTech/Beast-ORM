import { DatabaseTransaction } from "./DatabaseTransaction.js";
export class ObjectStore {
    constructor(tableSchema) {
        this.isTransactionInProgress = false;
        this.transactions = [];
        this.transactionFinish = (tableName, hasWriteTransaction) => { };
        this.count = 0;
        this.schema = tableSchema;
    }
    setDbInstance(db) {
        this.db = db;
    }
    createDedicatedTransaction() {
        this.count++;
        const transaction = new DatabaseTransaction(this.schema, true, false);
        transaction.db = this.db;
        return transaction;
    }
    addTransaction(transaction) {
        this.transactions.push(transaction);
        this.processTransactionQueue();
    }
    findOrCreateNotDedicatedTransaction() {
        var _a;
        if (this.currentTransaction && ((_a = this.currentTransaction) === null || _a === void 0 ? void 0 : _a.dedicateTransaction) === false && this.currentTransaction.isTransactionInProgress) {
            return this.currentTransaction;
        }
        else {
            const findNotDedicateTransaction = this.transactions.find(e => e.dedicateTransaction === false);
            if (findNotDedicateTransaction) {
                return findNotDedicateTransaction;
            }
            else {
                this.count++;
                const newTransaction = new DatabaseTransaction(this.schema, false, true);
                newTransaction.db = this.db;
                this.transactions.push(newTransaction);
                return newTransaction;
            }
        }
    }
    async processTransactionQueue() {
        if (this.isTransactionInProgress) {
            return;
        }
        const loop = async () => {
            this.isTransactionInProgress = true;
            const transaction = this.transactions.shift();
            if (transaction) {
                this.currentTransaction = transaction;
                transaction.startExecution();
                await transaction.waitToFinish();
                await loop();
            }
            else {
                const lastTransaction = this.currentTransaction;
                this.currentTransaction = null;
                this.isTransactionInProgress = false;
                this.endProcessTransactionQueue(lastTransaction);
            }
        };
        await loop();
        //   // uncomment when  working in data access layer
        // if(this.transactions.length >= 1) {
        //   await loop()
        // } else {
        //   // uncomment when  working in data access layer
        //   console.log("Creating transaction to early")
        //   throw("Creating transaction to early")
        // }
    }
    endProcessTransactionQueue(lastTransaction) {
        const transactionResult = lastTransaction.transactionInto;
        let transactionHasChangeDb = false;
        if (transactionResult.isOk) {
            transactionHasChangeDb = transactionResult.value.hasChangeDb;
        }
        this.transactionFinish(this.schema.name, transactionHasChangeDb);
    }
    hasActiveTransaction() {
        return this.isTransactionInProgress;
    }
}
