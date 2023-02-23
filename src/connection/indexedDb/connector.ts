import { DatabaseSchema  } from '../../models/register-modal.interface.js'
import { transaction } from './transaction.js';

// inspire by https://github.com/hc-oss/use-indexeddb

export class IndexedDB {

  static transactions: {[ key: string]:  {[ key: string]: {
    callback: Function,
    queryId: string
    mode: string
    config: DatabaseSchema
  }[]} } = {}

  static dbInstance: {[dbName: string]: IDBDatabase} = {}
  static dbInstanceUsing: {[dbName: string]: {[store: string]: boolean}} = {}
  static txInstance: {[dbName: string]: {[store: string]: IDBTransaction}} = {}
  static txInstanceMode: {[dbName: string]: {[store: string]: object }} = {}
  static storeCache: {[dbName: string]: {[store: string]: object[] }} = {}

  constructor() {}

  static connect(config: DatabaseSchema): Promise<IDBDatabase> {

    return new Promise<IDBDatabase>((resolve, reject) => {

      if(this.dbInstance[config.databaseName]) {
        resolve(this.dbInstance[config.databaseName])
      }

      const idbInstance = indexedDB || self.indexedDB || (self as any).mozIndexedDB || (self as any).webkitIndexedDB || (self as any).msIndexedDB;
      
      if (idbInstance) {
        const request: IDBOpenDBRequest = idbInstance.open(config.databaseName, config.version);
  
        request.onsuccess = () => {
          this.dbInstance[config.databaseName] = request.result
          resolve(request.result as IDBDatabase);
        };
  
        request.onerror = (e: any) => {
          reject(e.target.error.name);
        };
  
        request.onupgradeneeded = async (e: any) => {
          console.log('need to migrate first')
          await this.migrate(config)
          return await this.connect(config)
        };

        // request.onblocked = async (e: any) => {
        //   reject(e.target.error.name);
        // }
      } else {
        reject("IDBDatabase not supported inside webworker");
      }
    });
  }

 static  migrate(config: DatabaseSchema): Promise<boolean> {
    return  new Promise<boolean>((resolve, reject) => {
      const idbInstance = indexedDB || self.indexedDB || (self as any).mozIndexedDB || (self as any).webkitIndexedDB || (self as any).msIndexedDB;
      
      if (idbInstance) {
        const request: IDBOpenDBRequest = idbInstance.open(config.databaseName, config.version);
  
        request.onsuccess = () => {
          // request.result.close()
          resolve(false);
        };
  
        request.onerror = (e: any) => {
          reject(e.target.error.name);
        };
  
        request.onupgradeneeded = async (e: any) => {
          const db:IDBDatabase = e.target.result;
          await this.runMigrations(db, config);
          db.close();
          resolve(true);
        };

      } else {
        reject("Failed to connect");
      }

    });
  }
  static run (config) {
    if(!this.transactions[config.databaseName]) {

      this.transactions[config.databaseName] = {}
      this.executingTransaction[config.databaseName] = {}
      this.txInstance[config.databaseName] = {}
      this.dbInstanceUsing[config.databaseName] = {}
      this.txInstanceMode[config.databaseName] = {}

      for( const storeName of config.stores) {
        if(!this.transactions[config.databaseName][storeName.name]) {
          this.transactions[config.databaseName][storeName.name] = []
          this.executingTransaction[config.databaseName][storeName.name] = false
          this.txInstance[config.databaseName][storeName.name] = null
          this.txInstanceMode[config.databaseName][storeName.name] = {}
        }
      }
    }
    
    return true
  }
  
  static request({queryId}, callback: Function) {

  }

  private static  async runMigrations(db:IDBDatabase, config: DatabaseSchema) {
    await config.stores.forEach( async (storeSchema) => {
      if (!db.objectStoreNames.contains(storeSchema.name)) {
        const ObjectStore = db.createObjectStore(storeSchema.name, storeSchema.id);
        storeSchema.fields.forEach(c => {
          ObjectStore.createIndex(c.name, c.keyPath, c.options);
        });
      }
    });
  }


  static executingTransaction : {[ key: string]:  {[ key: string]: boolean }} = {}

  static executeTransaction(currentStore, databaseName) {
    
    const {mode, callback, config} = this.transactions[databaseName][currentStore].shift()
    this.txInstanceMode[databaseName][currentStore][mode] = true

    const done = () => {
      if(this.transactions[config.databaseName][currentStore].length == 0) {
        this.executingTransaction[databaseName][currentStore] = false;


        if(this.txInstanceMode[databaseName][currentStore]['readwrite']) {
          try {
            (this.txInstance[databaseName][currentStore] as any)?.commit?.();
          } catch (error) {
            // no commit need 
          }
        }
        this.txInstanceMode[databaseName][currentStore] = {}
        
        
        this.dbInstance[config.databaseName].close()
        delete this.dbInstanceUsing[config.databaseName][currentStore]
        if(Object.keys(this.dbInstanceUsing[config.databaseName]).length == 0) {
          delete this.dbInstance[config.databaseName];
        }

                
      } else {
        this.executeTransaction(currentStore, databaseName)
      }
    }

    const transactionInstance = new transaction({
      store: currentStore, 
      done, 
      db: this.dbInstance[config.databaseName],
      tx: this.txInstance[databaseName][currentStore]
    })
    // console.log('execute')
    callback(transactionInstance)
  }
  
  static getOrCreateTransaction({currentStore, queryId, config}, mode, callback:  (transaction:transaction) => void) {
    this.transactions[config.databaseName][currentStore].push({config, queryId, mode, callback})
    if (this.executingTransaction[config.databaseName][currentStore] == false) {
      this.executingTransaction[config.databaseName][currentStore] = true
      // console.log('start')
      this.connect(config).then(() => {
        const tx = this.createTransaction(
          this.dbInstance[config.databaseName],
          "readwrite",
          currentStore,
          () => {}
        )
    
        this.txInstance[config.databaseName][currentStore] = tx
        this.dbInstanceUsing[config.databaseName][currentStore] = true
        this.executeTransaction(currentStore, config.databaseName)
      })
    }
  }


  private static createTransaction(
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
}