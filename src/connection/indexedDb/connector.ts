import { DatabaseSchema } from "../../models/register-modal.interface.js";
import { transaction } from './transaction.js';
import { Databases, Tables} from './config.js' 
import { PostMessage } from "./postMessage.js";

// inspire by https://github.com/hc-oss/use-indexeddb

export class IndexedDB {

  static transactions: {[ key: string]:  {[ key: string]: {
    callback: Function,
    queryId: string
    mode: string
    DatabaseName: string
  }[]} } = {}

  static transactionsToCommit: {[ key: string]:  {[ key: string]: {
    callback: Function,
    queryId: string
    mode: string
    DatabaseName: string
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

  static connect(DatabaseName: string): Promise<IDBDatabase> {

    return new Promise<IDBDatabase>((resolve, reject) => {

      const DatabaseSchema =  Databases[DatabaseName]
      if(this.dbInstance[DatabaseSchema.databaseName]) {
        resolve(this.dbInstance[DatabaseSchema.databaseName])
      }

      const idbInstance = indexedDB || self.indexedDB || (self as any).mozIndexedDB || (self as any).webkitIndexedDB || (self as any).msIndexedDB;
      
      if (idbInstance) {
        const request: IDBOpenDBRequest = idbInstance.open(DatabaseSchema.databaseName, DatabaseSchema.version);
  
        request.onsuccess = () => {
          this.dbInstance[DatabaseSchema.databaseName] = request.result
          resolve(request.result as IDBDatabase);
        };
  
        request.onerror = (e: any) => {
          reject(e.target.error.name);
        };
  
        request.onupgradeneeded = async (e: any) => {
          await this.migrate(DatabaseSchema)
          return await this.connect(DatabaseSchema.databaseName)
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
  static run (config:DatabaseSchema) {

    
    if(!this.transactions[config.databaseName]) {
      Databases[config.databaseName] = config
      this.transactions[config.databaseName] = {}
      this.executingTransaction[config.databaseName] = {}
      this.txInstance[config.databaseName] = {}
      this.dbInstanceUsing[config.databaseName] = {}
      this.txInstanceMode[config.databaseName] = {}
      this.transactionOnCommit[config.databaseName] = {}
      this.transactionsToCommit[config.databaseName] = {}
      Tables[config.databaseName]= {}

      for( const store of config.stores) {
        if(!this.transactions[config.databaseName][store.name]) {
          Tables[config.databaseName][store.name]= store
          this.transactions[config.databaseName][store.name] = []
          this.executingTransaction[config.databaseName][store.name] = false
          this.txInstance[config.databaseName][store.name] = {}
          this.txInstanceMode[config.databaseName][store.name] = {}
          this.transactionOnCommit[config.databaseName][store.name] = {}
          this.transactionsToCommit[config.databaseName][store.name] = []
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
    
    const {mode, callback, DatabaseName} = this.transactions[databaseName][currentStore][0]
    this.txInstanceMode[databaseName][currentStore][mode] = true

    const done = async () => {
      const transaction = this.transactions[databaseName][currentStore].shift();
      this.transactionsToCommit[databaseName][currentStore].push(transaction)

      if(this.transactions[DatabaseName][currentStore].length == 0) {
        this.executingTransaction[databaseName][currentStore] = false;


        if(this.txInstanceMode[databaseName][currentStore]['readwrite']) {
          try {
            (this.txInstance[databaseName][currentStore]["readwrite"].IDBTransaction as any)?.commit?.();
            this.transactionsToCommit[databaseName][currentStore] = [];

            (async () => {
              for (let [queryId , value] of Object.entries(this.transactionOnCommit[databaseName][currentStore]) ) {
                PostMessage({
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
        
        
        delete this.dbInstanceUsing[DatabaseName][currentStore]
        if(Object.keys(this.dbInstanceUsing[DatabaseName]).length == 0) {
          this.dbInstance[DatabaseName].close()
          delete this.dbInstance[DatabaseName];
        }

                
      } else {
        this.executeTransaction(currentStore, databaseName)
      }
    }


    const doneButFailed = async() => {
      this.transactions[databaseName][currentStore].shift();
      if(this.transactions[DatabaseName][currentStore].length >= 1) {

        this.txInstance[DatabaseName][currentStore]["readwrite"].active = false;

        try {
          (this.txInstance[databaseName][currentStore]["readwrite"].IDBTransaction as any)?.commit?.();
        } catch (error) {} 
        
        const tx = this.createTransaction(
          this.dbInstance[DatabaseName],
          "readwrite",
          currentStore,
          (error) => { 
            //  
          },
          () => {},
          (onabort) => { 
            //  
            this.txInstance[DatabaseName][currentStore]["readwrite"].active = false
          }
        )

        this.txInstance[DatabaseName][currentStore] = {
          readwrite: {
            IDBTransaction: tx,
            active: true,
            IDBTransactionMode: "readwrite"
          }
        }

      
        this.executeTransaction(currentStore, databaseName)
      }
    }

    this.validateBeforeTransaction(this.dbInstance[DatabaseName], currentStore, (data) => {
      
    })

    const transactionInstance = new transaction({
      store: currentStore, 
      done, 
      doneButFailed,
      db: this.dbInstance[DatabaseName],
      tx: this.txInstance[databaseName][currentStore]["readwrite"].IDBTransaction
    })
    callback(transactionInstance)
    
  }
  
  static getOrCreateTransaction({TableName, queryId, DatabaseName}, mode: IDBTransactionMode, callback:  (transaction:transaction) => void) {

    this.transactions[DatabaseName][TableName].push({DatabaseName, queryId, mode, callback})
    if (this.executingTransaction[DatabaseName][TableName] == false) {
      this.executingTransaction[DatabaseName][TableName] = true
      this.connect(DatabaseName).then(() => {

        const tx = this.createTransaction(
          this.dbInstance[DatabaseName],
          "readwrite",
          TableName,
          (error) => { 
            // ;
          },
          () => {},
          (onabort) => { 
            //  
            this.txInstance[DatabaseName][TableName]["readwrite"].active = false
          }
        )
        
        if(!this.txInstance[DatabaseName][TableName]["readwrite"]) {
          this.txInstance[DatabaseName][TableName] = {
            readwrite: {
              IDBTransaction: tx,
              active: true,
              IDBTransactionMode: "readwrite"
            }
          }
        }
        
        this.txInstance[DatabaseName][TableName]["readwrite"].IDBTransaction = tx
        this.txInstance[DatabaseName][TableName]["readwrite"].active = true

        this.dbInstanceUsing[DatabaseName][TableName] = true
        this.executeTransaction(TableName, DatabaseName)
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



  static transactionOnCommitSubscribe(TableName: string , DatabaseName:string, SubscriptionName) {
    this.transactionOnCommit[DatabaseName][TableName][SubscriptionName] = {}
    return {
      run: 'callback',
      subscription: true,
      queryId: SubscriptionName,
      value: true
    }
  }

  static transactionOnCommitUnSubscribe(TableName, DatabaseName:string, SubscriptionName) {
    delete this.transactionOnCommit[DatabaseName][TableName][SubscriptionName]
    return {
      run: 'callback',
      subscription: false,
      queryId: SubscriptionName,
      value: true
    }
  }
}

