import { DatabaseSchema } from "../../models/register-modal.interface.js";

// inspire by https://github.com/hc-oss/use-indexeddb

export class IndexedDBConnector {
  
  
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
}

