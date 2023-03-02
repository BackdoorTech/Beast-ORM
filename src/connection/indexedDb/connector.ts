import { DatabaseSchema, TableSchema } from "../../models/register-modal.interface.js";
import { transaction } from './transaction.js';

// inspire by https://github.com/hc-oss/use-indexeddb

export class IndexedDB {

  static transactions: {[ key: string]:  {[ key: string]: {
    callback: Function,
    queryId: string
    mode: string
    config: DatabaseSchema
  }[]} } = {}

  static transactionsToCommit: {[ key: string]:  {[ key: string]: {
    callback: Function,
    queryId: string
    mode: string
    config: DatabaseSchema
  }[]} } = {}

  static dbInstance: {[dbName: string]: IDBDatabase} = {}
  static dbInstanceUsing: {[dbName: string]: {[store: string]: boolean}} = {}
  static txInstance: {[dbName: string]: {[store: string]: {[mode: string]: { 
    IDBTransaction: IDBTransaction,
    IDBTransactionMode: IDBTransactionMode,
    active: boolean
    }}
  }} = {}

  static txInstanceMode: {[dbName: string]: {[store: string]: object }} = {}
  static storeCache: {[dbName: string]: {[store: string]: object[] }} = {}
  static transactionOnCommit: {[dbName: string]: {[store: string]: {[queryId: string]: Object}}} = {}

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
      this.transactionOnCommit[config.databaseName] = {}
      this.transactionsToCommit[config.databaseName] = {}

      for( const storeName of config.stores) {
        if(!this.transactions[config.databaseName][storeName.name]) {
          this.transactions[config.databaseName][storeName.name] = []
          this.executingTransaction[config.databaseName][storeName.name] = false
          this.txInstance[config.databaseName][storeName.name] = {}
          this.txInstanceMode[config.databaseName][storeName.name] = {}
          this.transactionOnCommit[config.databaseName][storeName.name] = {}
          this.transactionsToCommit[config.databaseName][storeName.name] = []
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
    
    const {mode, callback, config} = this.transactions[databaseName][currentStore][0]
    this.txInstanceMode[databaseName][currentStore][mode] = true

    const done = async () => {
      const transaction = this.transactions[databaseName][currentStore].shift();
      this.transactionsToCommit[databaseName][currentStore].push(transaction)

      if(this.transactions[config.databaseName][currentStore].length == 0) {
        this.executingTransaction[databaseName][currentStore] = false;


        if(this.txInstanceMode[databaseName][currentStore]['readwrite']) {
          try {
            (this.txInstance[databaseName][currentStore]["readwrite"].IDBTransaction as any)?.commit?.();
            this.transactionsToCommit[databaseName][currentStore] = [];

            (async () => {
              for (let [queryId , value] of Object.entries(this.transactionOnCommit[databaseName][currentStore]) ) {
                postMessage({
                  run: 'callback',
                  queryId: queryId,
                  value: true
                })
              }
            })();

          } catch (error) {
            // no commit need 
          }
        }
        delete this.txInstance[databaseName][currentStore]["readwrite"]
        this.txInstanceMode[databaseName][currentStore] = {}
        
        
        delete this.dbInstanceUsing[config.databaseName][currentStore]
        if(Object.keys(this.dbInstanceUsing[config.databaseName]).length == 0) {
          this.dbInstance[config.databaseName].close()
          delete this.dbInstance[config.databaseName];
        }

                
      } else {
        this.executeTransaction(currentStore, databaseName)
      }
    }


    const doneButFailed = async() => {
      this.transactions[databaseName][currentStore].shift();
      if(this.transactions[config.databaseName][currentStore].length >= 1) {

        this.txInstance[config.databaseName][currentStore]["readwrite"].active = false;

        try {
          (this.txInstance[databaseName][currentStore]["readwrite"].IDBTransaction as any)?.commit?.();
        } catch (error) {} 
        
        const tx = this.createTransaction(
          this.dbInstance[config.databaseName],
          "readwrite",
          currentStore,
          (error) => { 
            //  
          },
          () => {},
          (onabort) => { 
            //  
            this.txInstance[config.databaseName][currentStore]["readwrite"].active = false
          }
        )

        this.txInstance[config.databaseName][currentStore] = {
          readwrite: {
            IDBTransaction: tx,
            active: true,
            IDBTransactionMode: "readwrite"
          }
        }

      
        this.executeTransaction(currentStore, databaseName)
      }
    }

    this.validateBeforeTransaction(this.dbInstance[config.databaseName], currentStore, (data) => {
      
    })

    const transactionInstance = new transaction({
      store: currentStore, 
      done, 
      doneButFailed,
      db: this.dbInstance[config.databaseName],
      tx: this.txInstance[databaseName][currentStore]["readwrite"].IDBTransaction
    })
    callback(transactionInstance)
    
  }
  
  static getOrCreateTransaction({currentStore, queryId, config}, mode: IDBTransactionMode, callback:  (transaction:transaction) => void) {
    this.transactions[config.databaseName][currentStore].push({config, queryId, mode, callback})
    if (this.executingTransaction[config.databaseName][currentStore] == false) {
      this.executingTransaction[config.databaseName][currentStore] = true
      this.connect(config).then(() => {

        
        const tx = this.createTransaction(
          this.dbInstance[config.databaseName],
          "readwrite",
          currentStore,
          (error) => { 
            // ;
          },
          () => {},
          (onabort) => { 
            //  
            this.txInstance[config.databaseName][currentStore]["readwrite"].active = false
          }
        )
        
        if(!this.txInstance[config.databaseName][currentStore]["readwrite"]) {
          this.txInstance[config.databaseName][currentStore] = {
            readwrite: {
              IDBTransaction: tx,
              active: true,
              IDBTransactionMode: "readwrite"
            }
          }
        }
        
        this.txInstance[config.databaseName][currentStore]["readwrite"].IDBTransaction = tx
        this.txInstance[config.databaseName][currentStore]["readwrite"].active = true

        this.dbInstanceUsing[config.databaseName][currentStore] = true
        this.executeTransaction(currentStore, config.databaseName)
      })
    } else {
      if(mode == 'readonly') {
        
      }
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

  private static validateBeforeTransaction(db, storeName: string, reject: Function) {
    if (!db) {
      reject("Queried before opening connection");
    }
    // if (!this.validateStore(db, storeName)) {
    //   reject(`Store ${storeName} not found`);
    // }
  }



  static transactionOnCommitSubscribe(TableSchema:TableSchema, config:DatabaseSchema, SubscriptionName) {
    this.transactionOnCommit[config.databaseName][TableSchema.name][SubscriptionName] = {}
    return {
      run: 'callback',
      subscription: true,
      queryId: SubscriptionName,
      value: true
    }
  }

  static transactionOnCommitUnSubscribe(TableSchema:TableSchema, config:DatabaseSchema, SubscriptionName) {
    delete this.transactionOnCommit[config.databaseName][TableSchema.name][SubscriptionName]
    return {
      run: 'callback',
      subscription: false,
      queryId: SubscriptionName,
      value: true
    }
  }
}

