import { IndexedDBConnection } from "./connector.js";
import { DatabaseSchema } from "../../models/register-modal.interface.js";

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
            
            console.log(value, key)

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

  requestHandler = (currentStore, config) => {
    return {
      select: () => {
        
      },
      update: () => {},
      delete: () => {},
      insert: async (rows: any[]) => {

        const createdObjKeys = []

        for( let insert of rows) {
          const id = await this.getActions(currentStore, config).add(insert)
          createdObjKeys.push(id)
        }

        // return first element
        if(rows.length == 1) {
          return await this.getActions(currentStore, config).getByID(createdObjKeys[0])
        } else {

        }

      }
    }
  }

}


export const indexedDB = new _indexedDB()