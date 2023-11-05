import { ITableSchema } from "../../../../BusinessLayer/_interface/interface";
import { Either, ok, error as err } from "../../../../Utility/Either/index.js";
import { ObjectStoreRequestResult } from "./ObjectStore.type";

export class ObjectStore {

  schema: ITableSchema
  transactionQueue = [];
  isTransactionInProgress = false;
  db:  IDBDatabase;

  txInstance: {
    IDBTransaction?: IDBTransaction,
    IDBTransactionMode?: IDBTransactionMode,
    active?: boolean
   };

  constructor(tableSchema: ITableSchema) {
    this.schema = tableSchema
  }

  async enqueueTransaction(transaction): Promise<Either<ObjectStoreRequestResult, false>> {
    return new Promise((resolve, reject) => {
      transaction.finishRequest = (result: Either<any, false>) => {
        resolve(result)
      }

      this.transactionQueue.push(transaction);
      if (!this.isTransactionInProgress) {
        this.processTransactionQueue();
      }
    })
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
          // console.error('Transaction failed:', error);
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
    const { operation, data, onsuccess, onerror, index, finishRequest } = transaction;
    this.txInstance.IDBTransaction = this.db.transaction(this.schema.name, "readwrite");
    const objectStore = this.txInstance.IDBTransaction.objectStore(this.schema.name);

    const request = objectStore[operation](data);

    return new Promise(async (resolve, reject) => {
      request.onsuccess = async () => {
        const data: ObjectStoreRequestResult = {data:request.result, index}
        resolve(data);
        onsuccess(data);
        finishRequest(ok(data))
      };

      request.onerror = (error) => {
        this.commitTransaction()
        this.createTransaction()
        reject(error);
        onerror()
        finishRequest(err(false))
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
