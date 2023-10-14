import { connectionManagerHelper } from "./connectionManagerHelper";
import { FieldSchema, IConfig } from "./type";

class IndexedDBManager {

  config: IConfig

  constructor(config) {
    this.config = config;
  }

  openDatabase(): Promise<IDBDatabase> {
    return new Promise((resolve, reject) => {
      const idbInstance = indexedDB || self.indexedDB || (self as any).mozIndexedDB || (self as any).webkitIndexedDB || (self as any).msIndexedDB;

      if (idbInstance) {
        const request: IDBOpenDBRequest = idbInstance.open(this.config.databaseName, this.config.version);

        request.onsuccess = () => {
          resolve(request.result);
        };

        request.onerror = (e: any) => {
          reject(e.target.error.name);
        };

        request.onupgradeneeded = async (e: any) => {
          await this.migrate(this.config)
        };

        request.onblocked = async (e: any) => {
          reject(e.target.error.name);
        }
      } else {
        reject("IDBDatabase not supported inside webworker");
      }
    });
  }

  migrate(config: IConfig): Promise<boolean> {
    return  new Promise<boolean>((resolve, reject) => {
      const idbInstance = indexedDB || self.indexedDB || (self as any).mozIndexedDB || (self as any).webkitIndexedDB || (self as any).msIndexedDB;

      if (idbInstance) {
        const request: IDBOpenDBRequest = idbInstance.open(config.databaseName, config.version);

        request.onsuccess = () => {
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

  private async runMigrations(db:IDBDatabase, config: IConfig) {
    for (const storeSchema of config.table) {
      if (!connectionManagerHelper.storeExist(db, storeSchema.name) ) {
        const ObjectStore = connectionManagerHelper.createObjectStore(db, storeSchema.id, storeSchema.name);
        for (const FieldSchema of storeSchema.fields) {
          connectionManagerHelper.createColumn(ObjectStore, FieldSchema);
        }

      }
    }
  }

  closeDatabase(db) {
    db.close();
  }

}
