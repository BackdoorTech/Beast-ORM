import { transaction } from './transaction.js';
import { data } from './data.js';
export class DatabaseMemory {
    static transaction(currentStore, dbMode) {
        return new transaction(DatabaseMemory.data[currentStore]);
    }
    executeTransaction() {
    }
    static createTransaction(currentStore, mode, callback) {
        DatabaseMemory.transactions.push({ currentStore, mode, callback });
        if (!DatabaseMemory.executingTransaction) {
        }
    }
}
DatabaseMemory.data = data;
DatabaseMemory.transactions = [];
DatabaseMemory.executingTransaction = false;
DatabaseMemory.objectStoreNames = {
    contains(name) {
        return true;
    }
};
