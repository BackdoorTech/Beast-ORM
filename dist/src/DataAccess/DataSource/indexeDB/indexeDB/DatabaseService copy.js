import { DatabaseConnector } from "./DatabaseConnector";
import { DatabaseOperations } from "./DatabaseOperations";
import { DatabaseTransaction } from "./DatabaseTransaction";
export class DatabaseService {
    constructor(dbName, version) {
        this.db = null;
        this.transactionQueue = [];
        this.isTransactionInProgress = false;
        this.connector = new DatabaseConnector(dbName, version);
        this.db = null;
        this.transactionQueue = [];
        this.isTransactionInProgress = false;
    }
    async connect() {
        this.db = await this.connector.connect();
    }
    hasConnectionToDatabase() {
        return this.db;
    }
    async enqueueTransaction(transaction) {
        if (!this.hasConnectionToDatabase()) {
            await this.connect();
        }
        this.transactionQueue.push(transaction);
        if (!this.isTransactionInProgress) {
            this.processTransactionQueue();
        }
    }
    async processTransactionQueue() {
        if (this.isTransactionInProgress || this.transactionQueue.length === 0) {
            return;
        }
        this.isTransactionInProgress = true;
        const nextTransaction = this.transactionQueue.shift();
        try {
            await this.executeTransaction(nextTransaction);
        }
        catch (error) {
            console.error('Transaction failed:', error);
        }
        finally {
            this.isTransactionInProgress = false;
            this.processTransactionQueue();
        }
    }
    async executeTransaction(transaction) {
        const { storeName, mode, operation, data, onsuccess, onerror } = transaction;
        const tx = this.db.transaction([storeName], mode);
        const objectStore = tx.objectStore(storeName);
        const request = objectStore[operation](data);
        return new Promise((resolve, reject) => {
            request.onsuccess = () => {
                resolve(request.result);
                onsuccess(request.result);
            };
            request.onerror = (error) => {
                reject(error);
                onerror();
            };
        });
    }
    commitTransaction() { }
    createTransaction() { }
    closeTransaction() { }
    closeConnection() { }
    operations() {
        return new DatabaseOperations(this.db);
    }
    transaction() {
        return new DatabaseTransaction(this.db);
    }
}
const dbName = 'MyDatabase';
const version = 1;
const databaseService = new DatabaseService(dbName, version);
// Insert data into the database within a transaction with error handling
const dataToInsert = { name: 'John', age: 30 };
databaseService.enqueueTransaction({
    storeName: 'myStore',
    mode: 'readwrite',
    operation: 'add',
    data: dataToInsert,
    onsuccess: () => { },
    onerror: () => { }
});