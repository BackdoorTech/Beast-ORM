import { transaction } from './transaction.js';
export class DatabaseMemory {
    static executeTransaction(currentStore) {
        const { mode, callback } = this.transactions[currentStore].shift();
        if (mode.includes('write')) {
            const transactionInstance = new transaction({ store: currentStore });
            callback(transactionInstance);
            transactionInstance.request;
        }
        if (this.transactions[currentStore].length == 0) {
            this.executingTransaction = false;
        }
        else {
            this.executeTransaction(currentStore);
        }
    }
    static getOrCreateTransaction(currentStore, mode, callback) {
        this.transactions[currentStore].push({ mode, callback });
        if (this.transactions[currentStore].length == 1) {
            this.executingTransaction = true;
            this.executeTransaction(currentStore);
        }
        if (!DatabaseMemory.executingTransaction) {
        }
    }
}
DatabaseMemory.transactions = {};
DatabaseMemory.executingTransaction = false;
DatabaseMemory.objectStoreNames = {
    contains(name) {
        return true;
    }
};
