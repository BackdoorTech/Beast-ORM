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

  constructor() {}

  static connect(config: DatabaseSchema): Promise<IDBDatabase> {
    return new Promise<IDBDatabase>((resolve, reject) => {
      const idbInstance = indexedDB || self.indexedDB || (self as any).mozIndexedDB || (self as any).webkitIndexedDB || (self as any).msIndexedDB;
      
      if (idbInstance) {
        const request: IDBOpenDBRequest = idbInstance.open(config.databaseName, config.version);
  
        request.onsuccess = () => {
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


      
      // if(!this.transactions[config.databaseName]) {
      //   this.transactions[config.databaseName] = {}
      //   for( const storeName of config.stores) {
      //     if(!this.transactions[config.databaseName][storeName.name]) { 
      //       this.transactions[config.databaseName][storeName.name] = []
      //     }
      //   }
      // }

    });
  }
  static run (config) {
    if(!this.transactions[config.databaseName]) {
      this.transactions[config.databaseName] = {}
      for( const storeName of config.stores) {
        if(!this.transactions[config.databaseName][storeName.name]) { 
          this.transactions[config.databaseName][storeName.name] = []
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


  static executingTransaction = false

  static executeTransaction(currentStore, databaseName) {
    this.executingTransaction = true
    const {mode, callback, config} = this.transactions[databaseName][currentStore].shift()
    
    const done = () => {
      if(this.transactions[config.databaseName][currentStore].length == 0) {
        this.executingTransaction = false
      } else {
        // console.log('next')
        // console.log('left '+this.transactions[config.databaseName][currentStore].length)
        this.executeTransaction(currentStore, databaseName)
      }
    }

    const transactionInstance = new transaction({store: currentStore, done})
    // console.log('execute')
    callback(transactionInstance)
  }
  
  static getOrCreateTransaction({currentStore, queryId, config}, mode, callback:  (transaction:transaction) => void) {
    this.transactions[config.databaseName][currentStore].push({config, queryId, mode, callback})
    if (this.executingTransaction == false) {
      // console.log('start')
      this.executeTransaction(currentStore, config.databaseName)
    } else {
      // console.log('padding '+this.transactions[config.databaseName][currentStore].length)
    }
  }


}