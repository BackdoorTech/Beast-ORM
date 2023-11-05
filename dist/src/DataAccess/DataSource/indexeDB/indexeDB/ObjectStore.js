export class ObjectStore {
    constructor(tableSchema) {
        this.transactionQueue = [];
        this.isTransactionInProgress = false;
        this.schema = tableSchema;
    }
    async enqueueTransaction(transaction) {
        return new Promise((resolve, reject) => {
            transaction.finishRequest = (result) => {
                resolve(result);
            };
            this.transactionQueue.push(transaction);
            if (!this.isTransactionInProgress) {
                this.processTransactionQueue();
            }
        });
    }
    async processTransactionQueue() {
        if (this.isTransactionInProgress) {
            return;
        }
        this.isTransactionInProgress = true;
        const loop = async () => {
            const nextTransaction = this.transactionQueue.shift();
            if (nextTransaction) {
                try {
                    await this.executeTransaction(nextTransaction);
                }
                catch (error) {
                    // console.error('Transaction failed:', error);
                }
                finally {
                    await loop();
                }
            }
        };
        await loop();
        this.isTransactionInProgress = false;
        this.commitTransaction();
    }
    async executeTransaction(transaction) {
        const { operation, data, onsuccess, onerror, index, finishRequest } = transaction;
        this.txInstance.IDBTransaction = this.db.transaction(this.schema.name, "readwrite");
        const objectStore = this.txInstance.IDBTransaction.objectStore(this.schema.name);
        const request = objectStore[operation](data);
        return new Promise(async (resolve, reject) => {
            request.onsuccess = async () => {
                const data = { data: request.result, index };
                resolve(data);
                onsuccess(data);
                finishRequest(true);
            };
            request.onerror = (error) => {
                this.commitTransaction();
                this.createTransaction();
                reject(error);
                onerror();
                finishRequest(false);
            };
        });
    }
    commitTransaction() {
        try {
            this.txInstance.IDBTransaction.commit();
            return true;
        }
        catch (error) {
            return false;
        }
    }
    createTransaction() {
        this.txInstance = {};
        this.txInstance.IDBTransaction = this.db.transaction(this.schema.name, "readwrite");
    }
    closeTransaction() {
        delete this.txInstance.IDBTransaction;
    }
    hasActiveTransaction() {
        var _a;
        return (_a = this.txInstance) === null || _a === void 0 ? void 0 : _a.IDBTransaction;
    }
}
