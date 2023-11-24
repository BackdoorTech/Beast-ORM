import { IDatabaseStrategy, IMigrations, IReturnObject, IReturnSelectObject, IReturnTriggerObject } from "../../../DriverAdapters/DriverAdapter.type.js";
import { databaseManager } from "../indexeDB/DatabaseManager.js";
import { IQuery } from "../../../../BusinessLayer/_interface/Apresentation/queryBuilder.js"
import { CreateQueryReaderSelect } from "../../../QueryReader/queryReader.js";
import { SqlObject } from "../../../filter/sqlObject/sqlObject.js";
import { DeleteOperation } from "../indexeDB/DatabaseOperations.js";
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

  addTrigger(table, data): (returnObject: IReturnTriggerObject) => void {
    return async (callbacks: IReturnTriggerObject) => {
      const database = await databaseManager.getDb(this.databaseName)
      database.registerTrigger(table, data, callbacks)
    }
  }

  RemoveTrigger(table, subscriptionId): (returnObject: IReturnTriggerObject) => void {
    return async (callbacks: IReturnTriggerObject) => {

      const database = await databaseManager.getDb(this.databaseName)

      database.UnRegisterTrigger(table, subscriptionId, callbacks)

      callbacks.done()
    }
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

      const transaction = ObjectStore.findOrCreateNotDedicatedTransaction()
      const condition = Query.where.shift()
      transaction.writeTransactionFlag()

      const idIndex = Object.values(condition)[0]
      transaction.enqueueOperation({operation:"delete", data:idIndex, ...callbacks}).finally( () => {
        callbacks.done()
      })

      ObjectStore.processTransactionQueue()

    }
  }

  deleteMany(table: any, Query: IQuery): (returnObject: IReturnObject) => void {
    return async (callbacks: IReturnObject) => {
      const ObjectStore = await databaseManager.getDb(this.databaseName)
      .executeOnObjectStore(table)

      const transaction1 = ObjectStore.findOrCreateNotDedicatedTransaction()

      transaction1.writeTransactionFlag()

      if (Query.where.length == 0) {

        const operation = new DeleteOperation({callBacks:callbacks})
        transaction1.enqueueOperation(operation).finally( () => {
          callbacks.done()
        })

      } else {

        const TableSchema = databaseManager.getTableSchema(this.databaseName, table)
        transaction1.enqueueOperation({operation:"getAll", item: null, ...emptyCallBacks}).then( async (result)  => {
   
          const queryReader = CreateQueryReaderSelect(Query)
  
          let filteredRow = []
  
          if(result.isOk) {
            const rows = result.value.data
  
            const sqlObject =  new SqlObject(TableSchema, queryReader)
            filteredRow = await sqlObject.run(rows)
  
            const transaction2 = ObjectStore.findOrCreateNotDedicatedTransaction()

            for (const row of filteredRow) {
  
              const idFieldName = TableSchema.id.keyPath
              const id = row[idFieldName]
  
              transaction2.enqueueOperation({operation:"delete", data:id, ...callbacks})
            }
          }

          callbacks.done(filteredRow)
        })
      }

      ObjectStore.processTransactionQueue()
    }
  }

  insert(table, rows: any[]) {

    // Implement IndexedDB insert here
    return async (callbacks: IReturnObject) => {
      

      const ObjectStore = await databaseManager.getDb(this.databaseName)
      .executeOnObjectStore(table)

      const transaction = ObjectStore.findOrCreateNotDedicatedTransaction()

      transaction.writeTransactionFlag()

      let index = 0
      for (const item of rows) {
        delete item.userId
        transaction.enqueueOperation({operation:"add",index, data: item, ...callbacks})
      }

      ObjectStore.processTransactionQueue()

      transaction.onDone(()=> {
        callbacks.done()
      })
      
    }
  }

  insertMany(table: any, rows: any): (returnObject: IReturnObject) => void {
    // Implement IndexedDB insert here
    return async (callbacks: IReturnObject) => {
      const ObjectStore = await databaseManager.getDb(this.databaseName)
      .executeOnObjectStore(table)

      const transaction = ObjectStore.createDedicatedTransaction()
      transaction.writeTransactionFlag()

      let index = 0
      for (const item of rows) {
        delete item.userId
        transaction.enqueueOperation({operation:"add",index, data:item, ...callbacks})
      }

      transaction.onDone(() => {
        callbacks.done()
      })

      ObjectStore.addTransaction(transaction)
    }
  }

  update(table, Query: IQuery) {

    // Implement IndexedDB insert here
    return async (callbacks: IReturnObject) => {
      const ObjectStore = await databaseManager.getDb(this.databaseName)
      .executeOnObjectStore(table)

      const transaction = ObjectStore.findOrCreateNotDedicatedTransaction()

      transaction.writeTransactionFlag()
      if(Query.hasIndex) {
        if(Query.isParamsArray == false) {

          const updateValues = Query.updateValues

          transaction.enqueueOperation({operation:"put", data:updateValues, ...callbacks}).finally(() => {
            callbacks.done()
          }) 
        }
      }

      ObjectStore.processTransactionQueue()
      
    }
  }

  updateMany(table: any, Query: IQuery): (returnObject: IReturnObject) => void {

    // Implement IndexedDB insert here
    return async (callbacks: IReturnObject) => {
      const queryReader = CreateQueryReaderSelect(Query)
      const ObjectStore = await databaseManager.getDb(this.databaseName)
      .executeOnObjectStore(table)

      const transaction1 = ObjectStore.findOrCreateNotDedicatedTransaction()

      const TableSchema = databaseManager.getTableSchema(this.databaseName, table)
      const updateValues = Query.updateValues

      transaction1.enqueueOperation({operation:"getAll", item: null, ...emptyCallBacks}).then( async(result) => {
        let filteredRow = []

        if(result.isOk) {

          const rows = result.value.data
  
          const sqlObject =  new SqlObject(TableSchema, queryReader)
          filteredRow = await sqlObject.run(rows)
          //const lastElement = filteredRow.pop()
  
          const transaction2 = ObjectStore.findOrCreateNotDedicatedTransaction()
          transaction2.writeTransactionFlag()
          const allRequest = filteredRow.map(
            (row) => transaction2.enqueueOperation({operation:"put", data:Object.assign(row, updateValues), ...callbacks})  
          )
          let a = Promise.all(allRequest)

          ObjectStore.processTransactionQueue()
          await a 
        }
        callbacks.done(filteredRow)
        
      })

      ObjectStore.processTransactionQueue()

      

    }
  }

  select(table, Query: IQuery) {

    // Implement IndexedDB select here
    return async ( callbacks: IReturnSelectObject) => {
      const queryReader = CreateQueryReaderSelect(Query)
      const ObjectStore = await databaseManager.getDb(this.databaseName)
      .executeOnObjectStore(table)

      const transaction = ObjectStore.findOrCreateNotDedicatedTransaction()

      const TableSchema = databaseManager.getTableSchema(this.databaseName, table)
      transaction.enqueueOperation({operation:"getAll", item: null, ...emptyCallBacks}).then(async (result)=> {
        if(result.isOk) {
          const rows = result.value.data
          const sqlObject =  new SqlObject(TableSchema, queryReader)
          const filteredRow = await sqlObject.run(rows)
  
          if(filteredRow) {
            callbacks.done(filteredRow)
          } else {
            callbacks.notFound()
          }
          return
        }
      })

      ObjectStore.processTransactionQueue()
    }
  }

  selectMany(table: any, Query: IQuery) {

    // Implement IndexedDB select here
    return async ( callbacks: IReturnObject) => {

      const queryReader = CreateQueryReaderSelect(Query)
      const ObjectStore = await databaseManager.getDb(this.databaseName)
      .executeOnObjectStore(table)

      const transaction = ObjectStore.findOrCreateNotDedicatedTransaction()

      const TableSchema = databaseManager.getTableSchema(this.databaseName, table)

      if(queryReader.hasNoCondition) {

        transaction.enqueueOperation({operation:"getAll", item: null, ...emptyCallBacks}).then((result)=>{
          if(result.isOk) {
            callbacks.onsuccess(result.value.data)
          }

          callbacks.done()
        })

      } else {

        transaction.enqueueOperation({operation:"getAll", item: null, ...emptyCallBacks}).then(async (result)=> {
          let filteredRow = []

          if(result.isOk) {
            const rows = result.value.data
            const sqlObject =  new SqlObject(TableSchema, queryReader)
            filteredRow = await sqlObject.run(rows)
  
            callbacks.onsuccess(filteredRow)
            callbacks.done()
          }
        })

      }

      ObjectStore.processTransactionQueue()
      
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
