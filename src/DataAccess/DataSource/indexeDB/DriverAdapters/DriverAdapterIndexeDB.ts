import { IDatabaseStrategy, IMigrations, IReturnObject } from "../../../DriverAdapters/DriverAdapter.type.js";
import { databaseManager } from "../indexeDB/DatabaseManager.js";
// IndexedDB strategy
export class IndexedDBStrategy implements IDatabaseStrategy {

  databaseName: string
  tableName: string

  constructor(databaseName: string) {
    this.databaseName = databaseName
  }

  openDatabase() {
    return async (callbacks: IReturnObject) => {
      // return indexedDB.open(this.databaseName);
    }
  }


  delete(table, data: any[]) {

    // Implement IndexedDB insert here
    return async (callbacks: IReturnObject) => {
      const ObjectStore = await databaseManager.getDb(this.databaseName)
      .executeOnObjectStore(this.tableName)

      for (const item of data) {
        ObjectStore.enqueueTransaction({operation:"delete", item, ...callbacks})
      }

    }
  }

  insert(table, data: any[]) {

    console.log("insert",table, data, this.databaseName)

    // Implement IndexedDB insert here
    return async (callbacks: IReturnObject) => {
      const ObjectStore = await databaseManager.getDb(this.databaseName)
      .executeOnObjectStore(table)

      console.log("realeasewsdfsfsdf")

      for (const item of data) {
        ObjectStore.enqueueTransaction({operation:"add", data:item, ...callbacks})
      }

    }
  }

  select(table, data) {

    // Implement IndexedDB select here
    return async ( callbacks: IReturnObject) => {
      const ObjectStore = await databaseManager.getDb(this.databaseName)
      .executeOnObjectStore(this.tableName)

      const _callbacks = {
        onsuccess: (completeList: any[]) => {

        },
        onerror:  () => {}
      }

      ObjectStore.enqueueTransaction({operation:"all", item: null, callbacks:_callbacks})

    }
  }

  migrate(migrate: IMigrations) {
    return async ({onerror, onsuccess}: IReturnObject) => {
      databaseManager
      .getDb(migrate.databaseName)
      .migrate()
    }
  }

  prepare(migrate: IMigrations) {
    return async ({onerror, onsuccess, done}: IReturnObject) => {
      await databaseManager.prepare(migrate)
      done()
    }

  }
}
