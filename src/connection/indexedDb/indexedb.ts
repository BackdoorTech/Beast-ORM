import { IndexedDBConnection } from "./connector.js";
import { DatabaseSchema, TableSchema } from "../../models/register-modal.interface.js";
import { Method } from "../../models/model.interface.js";
import { SqlObject } from "../../sql/sqlObject/sqlObject.js";

// inspire by https://github.com/hc-oss/use-indexeddb
class _indexedDB {
  
  private validateStore(db: IDBDatabase, storeName: string) {
    return db.objectStoreNames.contains(storeName);
  }
    
  private validateBeforeTransaction(db, storeName: string, reject: Function) {
    if (!db) {
      reject("Queried before opening connection");
    }
    if (!this.validateStore(db, storeName)) {
      reject(`Store ${storeName} not found`);
    }
  }

  private createTransaction(
    db: IDBDatabase,
    dbMode: IDBTransactionMode,
    currentStore: string,
    resolve,
    reject?,
    abort?
  ): IDBTransaction {
    let tx: IDBTransaction = db.transaction(currentStore, dbMode);
    tx.onerror = reject;
    tx.oncomplete = resolve;
    tx.onabort = abort;
    return tx;
  }
  
  migrate(config: DatabaseSchema) {
    return new IndexedDBConnection().migrate(config)
  }

  getConnection(config: DatabaseSchema): Promise<IDBDatabase> {
    return new IndexedDBConnection().connect(config)
  }
 
  
  getActions = (currentStore, config) => {
    return {
      getByID:(id: string | number) => {
        return new Promise<any>((resolve, reject) => {
          this.getConnection(config)
            .then(db => {
              this.validateBeforeTransaction(db, currentStore, reject);
              let tx = this.createTransaction(db, "readonly", currentStore, resolve, reject);
              let objectStore = tx.objectStore(currentStore);
              let request = objectStore.get(id);
              request.onsuccess = (e: any) => {
                resolve(e.target.result as any);
              };
            })
            .catch(reject);
        });
      },
      getOneByIndex:(keyPath: string, value: string | number) => {
        return new Promise< any | undefined>((resolve, reject) => {
          this.getConnection(config)
            .then(db => {
              this.validateBeforeTransaction(db, currentStore, reject);
              let tx = this.createTransaction(db, "readonly", currentStore, resolve, reject);
              let objectStore = tx.objectStore(currentStore);
              let index = objectStore.index(keyPath);
              let request = index.get(value);
              request.onsuccess = (e: any) => {
                resolve(e.target.result);
              };
            })
            .catch(reject);
        });
      },
      getManyByIndex:(keyPath: string, value: string | number) => {
        return new Promise<any[]>((resolve, reject) => {
          this.getConnection(config)
            .then(db => {
              this.validateBeforeTransaction(db, currentStore, reject);
              let tx = this.createTransaction(db, "readonly", currentStore, resolve, reject);
              let objectStore = tx.objectStore(currentStore);
              let index = objectStore.index(keyPath);
              let request = index.getAll(value);
              request.onsuccess = (e: any) => {
                resolve(e.target.result);
              };
            })
            .catch(reject);
        });
      },
      getAll:() => {
        return new Promise<any[]>((resolve, reject) => {
          this.getConnection(config).then(db => {
            this.validateBeforeTransaction(db, currentStore, reject);
            let tx = this.createTransaction(db, "readonly", currentStore, resolve, reject);
            let objectStore = tx.objectStore(currentStore);
            let request = objectStore.getAll();
            request.onsuccess = (e: any) => {
              resolve(e.target.result as any[]);
            };
          })
          .catch(reject);
        });
      },
      add:(value:Object, key?: any) => {
        return new Promise<number>((resolve, reject) => {
          this.getConnection(config).then(db => {
            this.validateBeforeTransaction(db, currentStore, reject);
            let tx = this.createTransaction(db, "readwrite", currentStore, resolve, reject);
            let objectStore = tx.objectStore(currentStore);

            let request = objectStore.add(value, key);
            request.onsuccess = (e: any) => {
              (tx as any)?.commit?.();
              resolve(e.target.result);
            };
          })
          .catch(reject);
        });
      },
      update:(value: any, key?: any) => {
        return new Promise<any>((resolve, reject) => {
          this.getConnection(config).then(db => {
            this.validateBeforeTransaction(db, currentStore, reject);
            let tx = this.createTransaction(db, "readwrite", currentStore, resolve, reject);
            let objectStore = tx.objectStore(currentStore);
            let request = objectStore.put(value, key);
            request.onsuccess = (e: any) => {
              (tx as any)?.commit?.();
              resolve(e.target.result);
            };
          })
          .catch(reject);
        });
      },
      deleteByID:(id: any) =>{
        return new Promise<any>((resolve, reject) => {
          this.getConnection(config).then(db => {
            this.validateBeforeTransaction(db, currentStore, reject);
            let tx = this.createTransaction(db, "readwrite", currentStore, resolve, reject);
            let objectStore = tx.objectStore(currentStore);
            let request = objectStore.delete(id);
            request.onsuccess = (e: any) => {
              (tx as any)?.commit?.();
              resolve(e);
            };
          })
          .catch(reject);
        });
      },
      deleteAll:() => {
        return new Promise<any>((resolve, reject) => {
          this.getConnection(config)
            .then(db => {
              this.validateBeforeTransaction(db, currentStore, reject);
              let tx = this.createTransaction(db, "readwrite", currentStore, resolve, reject);
              let objectStore = tx.objectStore(currentStore);
              objectStore.clear();
              tx.oncomplete = (e: any) => {
                (tx as any)?.commit?.();
                resolve(e);
              };
            })
            .catch(reject);
        });
      },
      openCursor:(cursorCallback, keyRange?: IDBKeyRange) => {
        return new Promise<IDBCursorWithValue | void>((resolve, reject) => {
          this.getConnection(config)
            .then(db => {
              this.validateBeforeTransaction(db, currentStore, reject);
              let tx = this.createTransaction(db, "readonly", currentStore, resolve, reject);
              let objectStore = tx.objectStore(currentStore);
              let request = objectStore.openCursor(keyRange);
              request.onsuccess = e => {
                cursorCallback(e);
                resolve();
              };
            })
            .catch(reject);
        });
      },
    }
  }

  requestHandler = (TableSchema:TableSchema, config:DatabaseSchema, queryId) => {
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
      update: async (methods: Method[]) => {

        if(methods[0].methodName == 'save') {
          
          const args = methods[0].arguments
          const idFieldName = TableSchema.id.keyPath
          const idValue = args[idFieldName]

          if(idValue) {
            await this.getActions(TableSchema.name, config).update(args)
          }  else {
            await this.getActions(TableSchema.name, config).update(args, idValue)
          }

          return {
            queryId
          }
      
        } else if(methods[0].methodName != 'update' && methods[methods.length - 1].methodName == 'update' ) {

          const argsToUpdate = methods[methods.length - 1].arguments

          const customMethods: Method[] = Object.create(methods)
          customMethods[methods.length - 1].methodName = 'execute'

          const result = await this.requestHandler(TableSchema, config, queryId).select(customMethods) as any
          const rows = result.value

          for(let row of rows) {
            const updateRow = Object.assign(row, argsToUpdate)
            await this.getActions(TableSchema.name, config).update(updateRow)
          }
          
          return {
            queryId
          }

        } else if (methods[0].methodName == 'update') {
          const argsToUpdate = methods[0].arguments

          await this.getActions(TableSchema.name, config).update(argsToUpdate)

          return {
            queryId
          }
          
        }
      },
      delete: async (methods: Method[]) => {

        if(methods[methods.length - 1].methodName == 'delete' && 
        methods[methods.length - 1].arguments == null) {

          const customMethods: Method[] = Object.create(methods)
          customMethods[methods.length - 1].methodName = 'execute'

          const result = await this.requestHandler(TableSchema, config, queryId).select(customMethods) as any
          const rows = result.value

          for(let row of rows) {

            const id = row[TableSchema.id.keyPath]
            await this.getActions(TableSchema.name, config).deleteByID(id)
          }

          return {
            queryId
          }

        } else if ( methods[methods.length - 1].methodName == 'delete' && 
        typeof methods[methods.length - 1].arguments == 'object') {

          const IdInObject = methods[methods.length - 1].arguments
          const idValue = IdInObject[TableSchema.id.keyPath]

          return {
            queryId: queryId,
            value: await this.getActions(TableSchema.name, config).deleteByID(idValue)
          }
        }
      },
      insert: async (methods: Method[]) => {

        // console.log(methods)

        const createdObjKeys = []
        const rows = methods[0].arguments

        for( let insert of rows) {
          const id = await this.getActions(TableSchema.name, config).add(insert)
          createdObjKeys.push(id)
        }

        // return first element
        if(rows.length == 1) {
          return {
            queryId: queryId,
            value: await this.getActions(TableSchema.name, config).getByID(createdObjKeys[0])
          }
        } else {
          return  {
            queryId: queryId,
            value: createdObjKeys
          }
        }

      }
    }
  }

}


export const indexedDB = new _indexedDB()