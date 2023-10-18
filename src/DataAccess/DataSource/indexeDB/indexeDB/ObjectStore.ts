export class ObjectStore {
  db:  IDBDatabase

  async enqueueTransaction(transaction) {}

  async processTransactionQueue() {}

  async executeTransaction(transaction) {}

  commitTransaction() {}
  createTransaction() {}
  closeTransaction() {}
  closeConnection() {}
}
