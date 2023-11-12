import { IDatabaseStrategy, IMigrations, IReturnObject } from "../../../DriverAdapters/DriverAdapter.type.js";
import { databaseManager } from "../indexeDB/DatabaseManager.js";
import { IQuery } from "../../../../BusinessLayer/_interface/Apresentation/queryBuilder.js"
import { CreateQueryReaderSelect } from "../../../QueryReader/queryReader.js";
import { SqlObject } from "../../../filter/sqlObject/sqlObject.js";
// IndexedDB strategy

const emptyCallBacks = {
  onsuccess: () => {},
  onerror: () => {},
  done: () => {}
}

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

      const idIndex = Object.values(condition)[0]
      await ObjectStore.enqueueTransaction({operation:"delete", data:idIndex, ...callbacks})

      callbacks.done()
    }
  }

  deleteMany(table: any, Query: IQuery): (returnObject: IReturnObject) => void {
    return async (callbacks: IReturnObject) => {
      const ObjectStore = await databaseManager.getDb(this.databaseName)
      .executeOnObjectStore(table)

      if (Query.where.length == 0) {

        await ObjectStore.enqueueTransaction({operation:"clear", ...callbacks})
      } else {

        const TableSchema = databaseManager.getTableSchema(this.databaseName, table)
        const result = await ObjectStore.enqueueTransaction({operation:"getAll", item: null, ...emptyCallBacks})
        const queryReader = CreateQueryReaderSelect(Query)

        let filteredRow = []
  
        if(result.isOk) {
          const rows = result.value.data
  
          const sqlObject =  new SqlObject(TableSchema, queryReader)
          filteredRow = await sqlObject.run(rows)

          for (const row of filteredRow) {

            const idFieldName = TableSchema.id.keyPath
            const id = row[idFieldName]

            ObjectStore.enqueueTransaction({operation:"delete", data:id, ...callbacks})
          }
  
          callbacks.done(filteredRow)
          return
  
        } else {
          callbacks.done(filteredRow)
        }
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
        delete item.userId
        await ObjectStore.enqueueTransaction({operation:"add",index, data:item, ...callbacks})
        index++
      }

      callbacks.done()
    }
  }

  insertMany(table: any, data: any): (returnObject: IReturnObject) => void {
    // Implement IndexedDB insert here
    return async (callbacks: IReturnObject) => {
      const ObjectStore = await databaseManager.getDb(this.databaseName)
      .executeOnObjectStore(table)

      let index = 0
      for (const item of data) {
        delete item.userId
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


  updateMany(table: any, Query: IQuery): (returnObject: IReturnObject) => void {

    // Implement IndexedDB insert here
    return async (callbacks: IReturnObject) => {
      const queryReader = CreateQueryReaderSelect(Query)
      const ObjectStore = await databaseManager.getDb(this.databaseName)
      .executeOnObjectStore(table)

      const TableSchema = databaseManager.getTableSchema(this.databaseName, table)
      const updateValues = Query.updateValues

      const result = await ObjectStore.enqueueTransaction({operation:"getAll", item: null, ...emptyCallBacks})

      let filteredRow = []

      if(result.isOk) {
        const rows = result.value.data

        const sqlObject =  new SqlObject(TableSchema, queryReader)
        filteredRow = await sqlObject.run(rows)
        //const lastElement = filteredRow.pop()

        for (const row of filteredRow) {
          const updatedValues = Object.assign(row, updateValues)
          ObjectStore.enqueueTransaction({operation:"put", data:updatedValues, ...callbacks})
        }

        callbacks.done(filteredRow)
        return

      } else {
        callbacks.done(filteredRow)
      }
    }
  }

  select(table, Query: IQuery) {

    // Implement IndexedDB select here
    return async ( callbacks: IReturnObject) => {
      const queryReader = CreateQueryReaderSelect(Query)
      const ObjectStore = await databaseManager.getDb(this.databaseName)
      .executeOnObjectStore(table)

      const TableSchema = databaseManager.getTableSchema(this.databaseName, table)
      const result = await ObjectStore.enqueueTransaction({operation:"getAll", item: null, ...emptyCallBacks})

      if(result.isOk) {
        const rows = result.value.data
        const sqlObject =  new SqlObject(TableSchema, queryReader)
        const filteredRow = await sqlObject.run(rows)
        callbacks.done(filteredRow)
        return
      }
      callbacks.done()

    }
  }

  selectMany(table: any, Query: IQuery) {

    // Implement IndexedDB select here
    return async ( callbacks: IReturnObject) => {

      const queryReader = CreateQueryReaderSelect(Query)
      const ObjectStore = await databaseManager.getDb(this.databaseName)
      .executeOnObjectStore(table)



      const TableSchema = databaseManager.getTableSchema(this.databaseName, table)

      if(queryReader.hasNoCondition) {
        await ObjectStore.enqueueTransaction({operation:"getAll", item: null, ...callbacks})
      } else {
        const result = await ObjectStore.enqueueTransaction({operation:"getAll", item: null, ...emptyCallBacks})

        let filteredRow = []
  
        if(result.isOk) {
          const rows = result.value.data
  
          const sqlObject =  new SqlObject(TableSchema, queryReader)
          filteredRow = await sqlObject.run(rows)

          callbacks.done(filteredRow)
          return
  
        } else {
          callbacks.done(filteredRow)
        }
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
