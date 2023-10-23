import { TableSchema } from "./resource/type";

export class ObjectStore {

  schema: TableSchema
  transactionQueue = [];
  isTransactionInProgress = false;
  db:  IDBDatabase;

  txInstance: {
    IDBTransaction?: IDBTransaction,
    IDBTransactionMode?: IDBTransactionMode,
    active?: boolean
   };

  constructor(tableSchema: TableSchema) {
    this.schema = tableSchema
  }

  async enqueueTransaction(transaction) {

    this.transactionQueue.push(transaction);
    if (!this.isTransactionInProgress) {
      this.processTransactionQueue();
    }
  }

  async processTransactionQueue() {
    if (this.isTransactionInProgress) {
      return;
    }

    this.isTransactionInProgress = true;

    const loop = async () => {

      const nextTransaction = this.transactionQueue.shift();

      if(nextTransaction) {
        try {
          await this.executeTransaction(nextTransaction);
        } catch (error) {
          console.error('Transaction failed:', error);
        } finally {

          await loop()
        }
      }
    }

    await loop()

    this.isTransactionInProgress = false;
    this.commitTransaction()
  }

  async executeTransaction(transaction) {
    const { operation, data, onsuccess, onerror } = transaction;
    this.txInstance.IDBTransaction = this.db.transaction(this.schema.name, "readwrite");
    const objectStore = this.txInstance.IDBTransaction.objectStore(this.schema.name);

    const request = objectStore[operation](data);

    return new Promise((resolve, reject) => {
      request.onsuccess = () => {
        resolve(request.result);
        onsuccess(request.result);
      };

      request.onerror = (error) => {
        this.commitTransaction()
        this.createTransaction()
        reject(error);
        onerror()
      };
    });
  }

  commitTransaction() {
    try {
      this.txInstance.IDBTransaction.commit();
      return true
    } catch (error) {
      return false
    }
  }
  createTransaction() {
    this.txInstance = {}
    this.txInstance.IDBTransaction = this.db.transaction(this.schema.name, "readwrite");
  }
  closeTransaction() {
    delete this.txInstance.IDBTransaction
  }

  hasActiveTransaction() {
    return this.txInstance?.IDBTransaction
  }
}
