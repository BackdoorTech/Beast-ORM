import { DatabaseConnector } from "./DatabaseConnector.js";
import { IDatabaseSchema } from './DatabaseService.type.js'
import { ObjectStore } from './ObjectStore.js'
export class DatabaseService {
  db:  IDBDatabase | null = null;
  transactionQueue = [];
  isTransactionInProgress = false;
  connector!:DatabaseConnector
  schema: IDatabaseSchema

  objectStore: {[storeName: string]: ObjectStore }  = {}
  executingTransaction : {[ key: string]: boolean } = {}

  constructor(schema: IDatabaseSchema) {
    this.schema = schema
    this.connector = new DatabaseConnector()


    for (let tableSchema of schema.table) {
      this.objectStore[tableSchema.name] = new ObjectStore(tableSchema)
    }
  }

  async connect() {
    this.db = await this.connector.openDatabase(this.schema);
  }

  async migrate() {
    await this.connector.migrate(this.schema);
  }

  hasConnectionToDatabase() {
    return this.db
  }

  async executeOnObjectStore(objectStoreName: string) {
    if(!this.hasConnectionToDatabase()) {
      await this.connect()
    }

    const objectStore = this.objectStore[objectStoreName]

    if(!objectStore.hasActiveTransaction()) {
      objectStore.db = this.db
      objectStore.createTransaction()
      console.log("create transaction")
    }

    console.log("objectStore", objectStore)
    this.executingTransaction[objectStoreName] = true

    return objectStore
  }

  transactionFinish = (TableName) => {
    delete this.executingTransaction[TableName]

    if(Object.keys(this.executingTransaction).length == 0) {
      this.db.close()
      delete this.db;
    }
  }

}
