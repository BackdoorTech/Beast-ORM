import { DBEventsTrigger, IDatabaseSchema } from "../../../../BusinessLayer/_interface/interface.type.js";
import { IReturnTriggerObject } from "../../../DriverAdapters/DriverAdapter.type.js";
import { DatabaseConnector } from "./DatabaseConnector.js";
import { DatabaseTriggerService } from "./DatabaseTriggerService.js";
import { ObjectStore } from './ObjectStore.js'
export class DatabaseService {
  db:  IDBDatabase | null = null;
  transactionQueue = [];
  isTransactionInProgress = false;
  connector!:DatabaseConnector
  schema: IDatabaseSchema

  objectStore: {[storeName: string]: ObjectStore }  = {}

  executingTransaction : {[ ObjectStoreName: string]: Boolean } = {}

  tigers = new DatabaseTriggerService()

  constructor(schema: IDatabaseSchema) {
    this.schema = schema
    this.connector = new DatabaseConnector()

    for (let tableSchema of schema.table.concat(schema.middleTables)) {
      this.objectStore[tableSchema.name] = new ObjectStore(tableSchema)
      this.objectStore[tableSchema.name].transactionFinish = this.transactionFinish
    }
  }

  connect = async () => {

    this.db = await this.connector.openDatabase(this.schema);

    if(this.isSchemaHeathy() == false) {

      this.db.close()

      this.db.onclose = async () => {

        let currentVersion = this.db.version
        currentVersion++

        const newSchemaVersion = this.schema
        newSchemaVersion.version = currentVersion
        this.db = await this.connector.openDatabase(newSchemaVersion)
      }
    }
  }

  isSchemaHeathy() {

    for (const table of this.schema.table) {

      const found = this.db.objectStoreNames.contains(table.name)

      if(!found) {
        return false
      }
    }

    return true
  }

  async migrate() {
    await this.connector.migrate(this.schema);
  }

  hasConnectionToDatabase() {
    return this.db != null
  }

  async executeOnObjectStore(objectStoreName: string) {
    if(!this.hasConnectionToDatabase()) {
      await this.connect()
    }

    const objectStore = this.objectStore[objectStoreName]

    if(!objectStore.hasActiveTransaction()) {
      objectStore.setDbInstance(this.db)
    }

    this.executingTransaction[objectStoreName] = true

    return objectStore
  }

  transactionFinish = (TableName) => {
    delete this.executingTransaction[TableName]

    if(Object.keys(this.executingTransaction).length == 0) {
      // this.db.close()
      this.db = null;
    }
  }

  runTrigger (TableName, hasWriteTransaction:boolean) {
    this.tigers.executeTriggers(DBEventsTrigger.onCompleteReadTransaction, TableName)
  }

  registerTrigger(tableName, data,  callback: IReturnTriggerObject) {
    this.tigers.subscribe(DBEventsTrigger.onCompleteReadTransaction, tableName, callback)
  }

  UnRegisterTrigger(tableName, subscriptionId,  callback: IReturnTriggerObject) {
    this.tigers.unsubscribe(DBEventsTrigger.onCompleteReadTransaction, tableName, subscriptionId, callback)
  }
}
