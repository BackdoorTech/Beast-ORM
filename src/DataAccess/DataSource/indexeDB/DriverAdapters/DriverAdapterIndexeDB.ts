import { IDatabaseStrategy, IMigrations, IReturnObject } from "../../../DriverAdapters/DriverAdapter.type.js";
import { databaseManager } from "../indexeDB/DatabaseManager.js";
import { IQuery } from "../../../../BusinessLayer/_interface/Apresentation/queryBuilder.js"
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

  delete(table, Query: IQuery) {
    // Implement IndexedDB insert here
    return async (callbacks: IReturnObject) => {
      const ObjectStore = await databaseManager.getDb(this.databaseName)
      .executeOnObjectStore(table)

      const condition = Query.where.shift()
      const limit = Query.limit
      const hasIndex = Query.hasIndex

      if(hasIndex) {
        if(limit == 1) {
          const idIndex = Object.values(condition)[0]
          const result = await ObjectStore.enqueueTransaction({operation:"delete", data:idIndex, ...callbacks})
        }
      } else {
      }
      callbacks.done()
    }
  }

  insert(table, data: any[]) {

    // Implement IndexedDB insert here
    return async (callbacks: IReturnObject) => {
      const ObjectStore = await databaseManager.getDb(this.databaseName)
      .executeOnObjectStore(table)

      let index = 0
      for (const item of data) {
        await ObjectStore.enqueueTransaction({operation:"add",index, data:item, ...callbacks})
        index++
      }

      callbacks.done()
    }
  }

  update(table, Query: IQuery) {

    // Implement IndexedDB insert here
    return async (callbacks: IReturnObject) => {
      const ObjectStore = await databaseManager.getDb(this.databaseName)
      .executeOnObjectStore(table)

      if(Query.hasIndex) {
        if(Query.isParamsArray == false) {

          const updateValues = Query.updateValues

          await ObjectStore.enqueueTransaction({operation:"put",updateValues, data:updateValues, ...callbacks})
        }
      }

      callbacks.done()
    }
  }

  select(table, Query: IQuery) {

    // Implement IndexedDB select here
    return async ( callbacks: IReturnObject) => {
      const ObjectStore = await databaseManager.getDb(this.databaseName)
      .executeOnObjectStore(table)

      if(Query.where.length == 0) {
        await ObjectStore.enqueueTransaction({operation:"getAll", item: null, ...callbacks})
      }

      callbacks.done()

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
