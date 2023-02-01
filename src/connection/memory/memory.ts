import { MemoryConnector } from "./connector.js";
import { DatabaseSchema, TableSchema } from "../../models/register-modal.interface.js";
import { Method } from "../../models/model.interface.js";
import { SqlObject } from "../../sql/sqlObject/sqlObject.js";
import { DatabaseMemory } from './db.js'
import { transaction } from "./transaction.js";
// inspire by https://github.com/hc-oss/use-indexeddb
export class Memory {
  
  private static validateStore(db: DatabaseMemory, storeName: string) {
    return DatabaseMemory.objectStoreNames.contains(storeName);
  }
    
  private  static validateBeforeTransaction(db: DatabaseMemory, storeName: string, reject: Function) {
    if (!db) {
      reject("Queried before opening connection");
    }
    if (!this.validateStore(db, storeName)) {
      reject(`Store ${storeName} not found`);
    }
  }

  private static createTransaction(
    db: DatabaseMemory,
    dbMode: IDBTransactionMode,
    currentStore: string,
    resolve,
    reject?,
    abort?
  ): transaction {
    let tx: transaction = DatabaseMemory.transaction(currentStore, dbMode);
    tx.onerror = reject;
    tx.oncomplete = resolve;
    tx.onabort = abort;
    return tx;
  }
  
  static migrate(config: DatabaseSchema) {
    return new MemoryConnector().migrate(config)
  }

  static getConnection(config: DatabaseSchema): Promise<DatabaseMemory> {
    return new MemoryConnector().connect(config)
  }
 
  
  static getActions = (currentStore, config) => {
    return {
      getAll:() => {
        return new Promise<any[]>((resolve, reject) => {
          DatabaseMemory.createTransaction(currentStore, "readwrite", (transaction:transaction) => {
            let objectStore = transaction.objectStore(currentStore);

            let request = objectStore.getAll();
            request.onsuccess = (e: any) => {
              resolve(e.target.result);
            };
          })
        });
      },
      add:(value:Object, key?: any) => {
        return new Promise<number>((resolve, reject) => {
          
          DatabaseMemory.createTransaction(currentStore, "readwrite", (transaction:transaction) => {
            let objectStore = transaction.objectStore(currentStore);

            let request = objectStore.add(value, key);
            request.onsuccess = (e: any) => {
              resolve(e.target.result);
            };
          })

        });
      },
      getByID(id){},
      getOneByIndex(x, y){},
      openCursor(func){}
    }
  }

  static requestHandler = (TableSchema:TableSchema, config:DatabaseSchema, queryId) => {
    return {
      select: async (methods: Method[]) => {
        if(methods[0].methodName == 'all') {
          return {
            queryId: queryId,
            value: await this.getActions(TableSchema.name, config).getAll()
          }

        }
        else if(methods[0].methodName == 'get') {
          const args = methods[0].arguments
          
          if(Object.keys(args).length == 1) {
            const key = Object.keys(args)[0]
            const value = args[key]
            if(TableSchema.id.keyPath == key) {

              return {
                queryId: queryId,
                value: await this.getActions(TableSchema.name, config).getByID(value)
              }

            } else {

              return {
                queryId: queryId,
                value: await this.getActions(TableSchema.name, config).getOneByIndex(key, value)
              }
              
            }
          }
        } else if (methods[methods.length - 1].methodName == 'execute') {
          return new Promise(async(resolve, reject) => {
            const sqlObject =  new SqlObject(TableSchema, methods)
            await this.getActions(TableSchema.name, config).openCursor(async(event: any) => {
              var cursor = event.target.result;
              if(cursor) {
                const row = cursor.value
                await sqlObject.runFirstMethod(row)
                cursor.continue();
                
              } else {
                sqlObject.doneRunFirstMethod()
                sqlObject.run()
                resolve({
                  queryId: queryId,
                  value: sqlObject.firstMethod.rows
                })
              }
            })
          })
        } else if (methods[methods.length - 1].methodName == 'first') {
          return new Promise(async(resolve, reject) => {
            const sqlObject =  new SqlObject(TableSchema, methods)
            await this.getActions(TableSchema.name, config).openCursor(async(event: any) => {
              var cursor = event.target.result;
              if(cursor) {
                const row = cursor.value
                await sqlObject.runFirstMethod(row, resolve, 1)
                cursor.continue();
              } else {
                sqlObject.doneRunFirstMethod()
                sqlObject.run()
                
                resolve({
                  queryId: queryId,
                  value: sqlObject.firstMethod.rows
                })

              }
            })
          })
        }

      },
      insert: async (methods: Method[]) => {
        const createdObjKeys = []
        const rows = methods[0].arguments

        for( let insert of rows) {
          const id = await this.getActions(TableSchema.name, config).add(insert)
          insert[TableSchema.id.keyPath] = id
        }

        // return first element
        if(rows.length == 1) {
          return {
            queryId: queryId,
            value: rows
          }
        } else {
          return  {
            queryId: queryId,
            value: rows
          }
        }

      }
    }
  }

}
